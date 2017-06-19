# Include site specific configurations
DEV_HOST ?= <example-project>.dev
PRODUCTION_HOST ?= <example-project>.fi
LOCAL_HOST ?= localhost:3000
STAGING_HOST ?= <example-project>.web.staging.minasithil.genero.fi

PRODUCTION_REMOTE_HOST ?= deploy@go2-1.multi.fi:/home/www/<example-project>
STAGING_REMOTE_HOST ?= deploy@minasithil.genero.fi:/var/www/staging/<example-project>

WP_CLI_HOST ?= dev
DATABASE_EXPORT ?= database.sql

DEV_PLUGINS ?= debug-bar kint-debugger
PROD_PLUGINS ?= wp-mail-smtp

SSH_ARGS ?= -o ForwardAgent=yes -o "ProxyCommand ssh deploy@minasithil.genero.fi nc %h %p 2> /dev/null"
RSYNC_ARGS ?= --chmod=ug=rwX

all:

.env: .env.example
	cp $< $@

confirm-action:
	@read -r -n 1 -p "Are you sure you want to proceed? [y/N]" REPLY && \
	[[ $$REPLY =~ ^[Yy]$$ ]] || exit 1;

.PHONY: all confirm-action

# Database --------------------------------------------------------------------
#
# To get a dump from the VM run `make database.sql`

$(DATABASE_EXPORT):
	wp @$(WP_CLI_HOST) db export - >| $(DATABASE_EXPORT)

wp-search-replace:
	wp @$(TARGET) search-replace --recurse-objects --network '$(STAGING_HOST)' '$(TARGET_HOST)'
	wp @$(TARGET) search-replace --recurse-objects --network '$(LOCAL_HOST)' '$(TARGET_HOST)'
	wp @$(TARGET) search-replace --recurse-objects --network '$(DEV_HOST)' '$(TARGET_HOST)'
	wp @$(TARGET) search-replace --recurse-objects --network '$(PRODUCTION_HOST)' '$(TARGET_HOST)'

wp-pull-db: .env
	make db-clean WP_CLI_HOST=$(SOURCE) $(DATABASE_EXPORT)
	cat $(DATABASE_EXPORT) | wp @$(TARGET) db cli
	make $(TARGET)-db-search-replace db-clean
	wp @$(TARGET) cache flush

wp-push-db: $(DATABASE_EXPORT)
	cat $(DATABASE_EXPORT) | wp @$(TARGET) db cli
	make $(TARGET)-db-search-replace db-clean
	wp @$(TARGET) cache flush

db-clean:
	rm -f $(DATABASE_EXPORT)

.PHONY: wp-search-replace wp-pull-db wp-push-db db-clean

# Files -----------------------------------------------------------------------

# Fetches the dev environments files to the local filesystem
wp-fetch-files:
	vagrant ssh-config --host default > /tmp/vagrant-ssh-config
	rsync -r $(RSYNC_ARGS) -e 'ssh -F /tmp/vagrant-ssh-config' default:/var/www/wordpress/web/app/uploads/ web/app/uploads/
	rm -f /tmp/vagrant-ssh-config

# Pulls the remote files first into the local filesystem and then to the dev filesystem
wp-pull-files:
	rsync -v -r $(RSYNC_ARGS) -e 'ssh $(RSYNC_SSH)' $(SOURCE) $(TARGET)
	vagrant ssh-config --host default >| /tmp/vagrant-ssh-config
	rsync -v -r $(RSYNC_ARGS) --no-perms --no-owner --no-group --verbose -e 'ssh -F /tmp/vagrant-ssh-config' $(TARGET) default:/var/www/wordpress/$(TARGET)

# Push the files in the dev environment to the remote filesystem
wp-push-files: wp-fetch-files
	rsync -v -r $(RSYNC_ARGS) --no-perms --no-owner --no-group -e 'ssh $(RSYNC_SSH)' $(SOURCE) $(TARGET)

# Production tasks ------------------------------------------------------------

production-db-search-replace: TARGET_HOST=$(PRODUCTION_HOST)
production-db-search-replace: TARGET=production
production-db-search-replace: wp-search-replace

production-pull-db: SOURCE=production
production-pull-db: TARGET=dev
production-pull-db: wp-pull-db
production-pull-db: dev-plugins

production-push-db: SOURCE=dev
production-push-db: TARGET=production
production-push-db: confirm-action
production-push-db: wp-push-db

production-pull-files: RSYNC_SSH=$(SSH_ARGS)
production-pull-files: RSYNC_ARGS=--chmod=ugo=rwX
production-pull-files: SOURCE=$(PRODUCTION_REMOTE_HOST)/deploy/current/web/app/uploads/
production-pull-files: TARGET=web/app/uploads/
production-pull-files: wp-pull-files

production-push-files: RSYNC_SSH=$(SSH_ARGS)
production-push-files: SOURCE=web/app/uploads/
production-push-files: TARGET=$(PRODUCTION_REMOTE_HOST)/deploy/current/web/app/uploads/
production-push-files: wp-push-files

# Staging tasks ---------------------------------------------------------------

staging-db-search-replace: TARGET_HOST=$(STAGING_HOST)
staging-db-search-replace: TARGET=staging
staging-db-search-replace: wp-search-replace

staging-pull-db: SOURCE=staging
staging-pull-db: TARGET=dev
staging-pull-db: wp-pull-db
staging-pull-db: dev-plugins

staging-push-db: SOURCE=dev
staging-push-db: TARGET=staging
staging-push-db: confirm-action
staging-push-db: wp-push-db

staging-pull-files: RSYNC_SSH=-o ForwardAgent=yes
staging-pull-files: RSYNC_ARGS=--chmod=ugo=rwX
staging-pull-files: SOURCE=$(STAGING_REMOTE_HOST)/current/web/app/uploads/
staging-pull-files: TARGET=web/app/uploads/
staging-pull-files: wp-pull-files

staging-push-files: RSYNC_SSH=-o ForwardAgent=yes
staging-push-files: SOURCE=web/app/uploads/
staging-push-files: TARGET=$(STAGING_REMOTE_HOST)/current/web/app/uploads/
staging-push-files: wp-push-files

# Dev tasks -------------------------------------------------------------------

dev-db-search-replace: TARGET_HOST=$(DEV_HOST)
dev-db-search-replace: TARGET=dev
dev-db-search-replace: wp-search-replace

dev-plugins:
	wp @dev plugin activate $(DEV_PLUGINS)
	wp @dev plugin deactivate $(PROD_PLUGINS)

# Plugins setup ---------------------------------------------------------------

.PHONY: all vm-fetch-files
