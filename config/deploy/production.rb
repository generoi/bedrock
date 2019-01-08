require 'socket'
require 'net/ssh/proxy/command'

set :stage,   :production
set :app_url, 'https://www.<example-project>.fi'
set :user,    'deploy'
set :group,   'apache'

# Simple Role Syntax
# ==================
# Supports bulk-adding hosts to roles, the primary
# server in each group is considered to be the first
# unless any hosts have the primary property set.
role :app, %w[deploy@go2-1.multi.fi]
role :web, %w[deploy@go2-1.multi.fi]
role :db,  %w[deploy@go2-1.multi.fi]

set :ssh_options, forward_agent: true

if Socket.gethostname != 'minasithil'
  set :ssh_options, fetch(:ssh_options).merge(
    proxy: Net::SSH::Proxy::Command.new('ssh deploy@minasithil.genero.fi nc %h %p 2> /dev/null')
  )
end
