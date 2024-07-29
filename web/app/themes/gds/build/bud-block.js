import {bind} from '@roots/bud-framework/extension/decorators'
import {label} from '@roots/bud-framework/extension/decorators'
import {Extension} from '@roots/bud-framework/extension'
import {readFile, realpath} from 'node:fs/promises'
import {relative, resolve, dirname, parse as parsePath} from 'node:path'


export default class BudBlock extends Extension {
  constructor(...args) {
    super(...args)
    this.app['block'] = this.block.bind(this);
  }

  async block(path) {
    const file = `${this.app.path('@src')}/${path}`;
    const blockJson = await readFile(file)
    const data = JSON.parse(blockJson);
    const directory = dirname(file);

    const {style, script, editorStyle, editorScript} = data;
    const assets = [style, script, editorStyle, editorScript].filter(Boolean).flat()
      .map((file) => this.resolvePathPlaceholder(file, directory))
      .map((path) => this.app.entry(
        path,
        [path]
      ));

    return [
      this.app.copyFile(path),
      ...assets,
    ]
  }

  resolvePathPlaceholder(path, root) {
    if (!path.startsWith('file:')) {
      return path;
    }
    path = resolve(`${root}/${path.replace('file:', '')}`);
    path = relative(this.app.path('@src'), path);
    const {dir, name} = parsePath(path.replace('file:', ''));
    return `${dir}/${name}`;
  }

  async register(bud) {
    bud.hooks.on('build.output.filename', '[name].js?v=[contenthash:6]');
    bud.hooks.on('build.output.assetModuleFilename', '[path][name].[ext][query]')
    bud.hooks.async('build.plugins', async (plugins) => {
      return plugins.map((plugin) => {
        if (plugin.constructor.name === 'MiniCssExtractPlugin') {
          plugin.options.filename = '[name].css?v=[contenthash:6]';
        }
        if (plugin.constructor.name === 'CopyPlugin') {
          plugin.patterns = plugin.patterns.map((pattern) => {
            const to = `${pattern.to.replace('.[contenthash:6]', '')}?v=[contenthash:6]`;
            return {
              ...pattern,
              to,
            };
          })
        }
        return plugin;
      });
    });
  }
}
