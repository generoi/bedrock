/*
 * Copyright (c) 2023 яαvoroηα
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy of
 *  this software and associated documentation files (the "Software"), to deal in
 *  the Software without restriction, including without limitation the rights to
 *  use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 *  the Software, and to permit persons to whom the Software is furnished to do so,
 *  subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 *  FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 *  COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 *  IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 *  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { unlink } from 'fs'
import * as path from 'path'
import copy from 'rollup-plugin-copy'
import fs from 'fs/promises';
import wpResolve from 'rollup-plugin-wp-resolve'
import multiInput from 'rollup-plugin-multi-input'
import outputManifest from 'rollup-plugin-output-manifest'
import { defineConfig, loadEnv } from 'vite'
import crypto from "node:crypto";

const generateFileHash = (contents) => crypto.createHash("md5").update(contents).digest("hex");
const generatePhpAssetFile = (dependencies = [], hash = "") => {
	return `<?php return ["dependencies" => ${JSON.stringify(Array.from(dependencies))}, "version" => "${hash}"];`;
};
function generateBundle(options, bundle) {
  for (const file of Object.values(bundle)) {
    if (!file.code) {
      continue;
    }
    const hash = generateFileHash(file.code);
    const imports = file.imports.reduce((acc, i) => {
      i = i.replace(/^@wordpress\//, "wp-");
      acc.push(i);
      return acc;
    }, []);

    this.emitFile({
      type: 'asset',
      fileName: `${file.name}.asset.php`,
      source: generatePhpAssetFile(imports, hash),
    });
  }
}

const publicDir = 'public'
const manifestFile = 'manifest.json'
const assets = {
    base: 'resources',
    scripts: 'resources/scripts',
    styles: 'resources/styles',
    images: 'resources/images',
    fonts: 'resources/fonts',
    components: 'resources/components',
    blocks: 'resources/blocks',
}

const formatName = (name) => name.replace(`${assets.scripts}/`, '').replace(/.css$/gm, '')

export default defineConfig(({ mode }) => {
    const devServerConfig = loadEnv(mode, process.cwd(), 'HMR')
    const dev = mode === 'development'
    const config =  {
        appType: 'custom',
        publicDir: false,
        base: './',
        resolve: {
            alias: {
                '@': path.resolve(__dirname, assets.styles),
                '~': path.resolve(__dirname, assets.scripts),
                '@scripts': path.resolve(__dirname, assets.scripts),
                '@styles': path.resolve(__dirname, assets.styles),
                '@fonts': path.resolve(__dirname, assets.fonts),
                '@images': path.resolve(__dirname, assets.images),
                '@blocks': path.resolve(__dirname, assets.blocks),
                '@components': path.resolve(__dirname, assets.components),
            }
        },
        css: {
            devSourcemap: true
        },
        build: {
            sourcemap: 'inline',
            manifest: false,
            outDir: publicDir,
            assetsDir: '',
            rollupOptions: {
                input: [
                  path.resolve(__dirname, `${assets.styles}/*.scss`),
                  path.resolve(__dirname, `${assets.styles}/blocks/*.scss`),
                  path.resolve(__dirname, `${assets.scripts}/*.{js,jsx}`),
                  path.resolve(__dirname, `${assets.blocks}/**/*.{js,jsx,scss}`),
                ],
                output: {
                  assetFileNames: "[name][extname]",
                  chunkFileNames: "[name].js",
                  entryFileNames: "[name].js",
                },
                plugins: [
                    multiInput({ relative: assets.base }),
                    wpResolve(),
                    {
                      name: 'foobar',
                      generateBundle,
                    },
                    // {
                    //   name: 'lol',
                    //   apply: 'serve',
                    //   configResolved: async config => {
                    //       console.log('asdf');
                    //       config.logger.info('Writing contents of public folder to disk', {timestamp: true});
                    //       console.log(config.publicDir);
                    //       console.log(config.build.outDir);
                    //       await fs.cp(config.publicDir, config.build.outDir, {recursive: true});
                    //   },
                    //   handleHotUpdate: async ({file, server: {config, ws}, read}) => {
                    //       console.log('foobar');
                    //       if (path.dirname(file).startsWith(config.publicDir)) {
                    //           const destPath = path.join(config.build.outDir, path.relative(config.publicDir, file));
                    //           config.logger.info(`Writing contents of ${file} to disk`, {timestamp: true});
                    //           await fs.access(path.dirname(destPath)).catch(() => fs.mkdir(path.dirname(destPath), {recursive: true}));
                    //           await fs.writeFile(destPath, await read());
                    //       }
                    //   },
                    // },
                    outputManifest({
                        fileName: manifestFile,
                        generate:
                            (keyValueDecorator, seed, opt) => chunks =>
                                chunks.reduce((manifest, bundle) => {
                                    const { name, fileName } = bundle;
                                    const hash = generateFileHash(bundle.source || bundle.code) || '';
                                    return name
                                        ? {
                                              ...manifest,
                                              [fileName]: `${fileName}?${hash}`,
                                          }
                                        : manifest
                                }, seed)
                    }),
                    outputManifest({
                        fileName: 'entrypoints.json',
                        nameWithExt: true,
                        generate: (_, seed) => chunks =>
                            chunks.reduce((manifest, { name, fileName }) => {
                                const formatedName = name && formatName(name)
                                const output = {}
                                const js =
                                    formatedName && manifest[formatedName]?.js?.length ? manifest[formatedName].js : []
                                const css =
                                    formatedName && manifest[formatedName]?.css?.length
                                        ? manifest[formatedName].css
                                        : []
                                const dependencies =
                                    formatedName && manifest[formatedName] ? manifest[formatedName].dependencies : []
                                const inject = { js, css, dependencies }

                                fileName.match(/.js$/gm) && js.push(fileName)
                                fileName.match(/.css$/gm) && css.push(fileName)

                                name && (output[formatedName] = inject)

                                return {
                                    ...manifest,
                                    ...output
                                }
                            }, seed)
                    }),
                    copy({
                        copyOnce: true,
                        hook: 'writeBundle',
                        flatten: false,
                        targets: [
                            {
                                src: `${assets.base}/blocks/**/*.json`,
                                dest: publicDir,
                            },
                            {
                                src: `${assets.base}/{images,fonts}/**/*`,
                                dest: publicDir,
                            },
                        ]
                    }),
                    copy({
                      copyOnce: true,
                      hook: 'writeBundle',
                      flatten: true,
                      targets: [
                          {
                              src: 'node_modules/jquery/dist/jquery.min.js',
                              dest: publicDir,
                          },
                          {
                              src: 'node_modules/@fortawesome/fontawesome-pro/svgs/*',
                              dest: `${publicDir}/icons`,
                          },
                      ]
                    }),
                ]
            }
        }
    }

    if (dev) {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        let host = 'localhost'
        let port = 5173
        const protocol = 'http'
        const https = !!(devServerConfig.HMR_HTTPS_KEY && devServerConfig.HMR_HTTPS_CERT)

        // unlink(`${publicDir}/${manifestFile}`, error =>
        //     console.log(`🧹 Wipe ${manifestFile} :`, error ? `No ${manifestFile} in the public directory` : '✅')
        // )

        devServerConfig.HMR_HOST && (host = devServerConfig.HMR_HOST)
        devServerConfig.HMR_PORT && (port = parseInt(devServerConfig.HMR_PORT))

        https &&
            (config.server.https = {
                key: devServerConfig.HMR_HTTPS_KEY,
                cert: devServerConfig.HMR_HTTPS_CERT
            })

        config.server = {
            host,
            port,
            https,
            strictPort: true,
            origin: `${protocol}://${host}:${port}`,
            //origin: 'https://gdsbedrock.ddev.site',
            proxy: {
              '/': {
                target: 'https://gdsbedrock.ddev.site/',
                changeOrigin: true,
                secure: false,
              },
            },
            fs: {
                strict: true,
                allow: ['node_modules', assets.base]
            },
            hmr: {
              protocol: 'wws',
              host: 'https://gdsbedrock.ddev.site',
            },

            /***
             * For Windows user with files system watching not working
             * https://vitejs.dev/config/server-options.html#server-watch
             */

            watch: {
                usePolling: true,
                interval: 1000
            }
        }
    }

    return config
})
