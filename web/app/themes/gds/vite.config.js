import * as path from 'path'
import copy from 'rollup-plugin-copy'
import multiInput from 'rollup-plugin-multi-input'
import externalGlobals from "rollup-plugin-external-globals";
import outputManifest from 'rollup-plugin-output-manifest'
import { defineConfig, loadEnv } from 'vite'
import { createHash } from "node:crypto";
import {
  defaultRequestToExternal,
  defaultRequestToHandle
} from '@wordpress/dependency-extraction-webpack-plugin/lib/util.js'

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

const generateFileHash = (code) => createHash('sha1').update(code).digest('hex').slice(0, 20);
const externalize = (request) =>  !!defaultRequestToExternal(request);
const globalize = (request) => {
  const globalName = defaultRequestToExternal(request);
  return Array.isArray(globalName) ? globalName.join('.') : globalName;
}

function assetize() {
  return {
    name: 'assetize',
    generateBundle(options, bundle) {
      Object.entries(bundle).forEach(([fileName, fileInfo]) => {
        if (!fileInfo.isAsset) {
          const { imports, code } = fileInfo;
          if (!imports) {
            return;
          }
          const dependencies = imports.map(defaultRequestToHandle).filter(o => o != null);
          const hash = generateFileHash(code);
          this.emitFile( {
            type: 'asset',
            fileName: fileInfo.fileName.replace(/\.js$/, '.asset.php' ),
            source: `<?php return ["dependencies" => ${JSON.stringify(Array.from(dependencies))}, "version" => "${hash}"];`
          });
        }
      });
    }
  }
}

function generateManifest() {
  return outputManifest({
    fileName: manifestFile,
    generate: (keyValueDecorator, seed, opt) => (chunks) => {
      return chunks.reduce((manifest, bundle) => {
        const { name, fileName } = bundle;
        const hash = generateFileHash(bundle.source || bundle.code) || '';
        return name ? {
          ...manifest,
          [fileName]: `${fileName}?${hash}`,
        } : manifest
      }, seed);
    }
  });
}

export default defineConfig(({ mode }) => {
  const devServerConfig = loadEnv(mode, process.cwd(), 'HMR')
  const dev = mode === 'development'
  const config = {
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
        external: externalize,
        plugins: [
          multiInput({ relative: assets.base }),
          assetize(),
          externalGlobals(globalize),
          generateManifest(),
          copy({
            copyOnce: true,
            hook: 'writeBundle',
            flatten: false,
            targets: [
              { src: `${assets.base}/blocks/**/*.json`, dest: publicDir },
              { src: `${assets.base}/{images,fonts}/**/*`, dest: publicDir },
            ]
          }),
          copy({
            copyOnce: true,
            hook: 'writeBundle',
            flatten: true,
            targets: [
              { src: 'node_modules/jquery/dist/jquery.min.js', dest: publicDir },
              { src: 'node_modules/@fortawesome/fontawesome-pro/svgs/*', dest: `${publicDir}/icons` },
            ]
          }),
        ]
      }
    }
  };

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

    if (https) {
      config.server.https = {
        key: devServerConfig.HMR_HTTPS_KEY,
        cert: devServerConfig.HMR_HTTPS_CERT
      }
    }

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

      watch: {
        usePolling: true,
        interval: 1000
      }
    }
  };

  return config;
});
