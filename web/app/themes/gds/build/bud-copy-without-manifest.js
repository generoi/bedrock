import {Extension} from '@roots/bud-framework/extension';
import {cp} from 'node:fs/promises';

export default class BudCopyWithoutManifest extends Extension {
  tasks = [];

  constructor(...args) {
    super(...args);
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

  /**
   * @type {import('@roots/bud').Config}
   */
  async register(bud) {
    const copy = async () => {
      await Promise.all(this.tasks.map((args) => cp(...args)));
    };

    bud.hooks.action('compiler.before', copy);

    if (bud.isProduction) {
      bud.hooks.action('compiler.done', copy);
    }
  }
}
