import {Extension} from '@roots/bud-framework/extension'
import {cp} from 'node:fs/promises'

export default class BudCopyWithoutManifest extends Extension {
  tasks = [];

  constructor(...args) {
    super(...args)
    this.app['copyWithoutManifest'] = this.copy.bind(this);
  }

  async copy(request, context) {
    if (!context) {
      context = this.app.path('@src');
    }

    const source = `${context}/${request}`;
    const target = `${this.app.path('@dist')}/${request}`;
    this.tasks.push([source, target, {recursive: true}]);
    return this.app;
  }

  async register(bud) {
    bud.hooks.action('compiler.before', async () => {
      await Promise.all(this.tasks.map((args) => cp(...args)));
    });
  }
}
