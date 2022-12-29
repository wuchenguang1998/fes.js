import { deepmerge } from '@fesjs/utils';

export function buildSwcOptions(targets, config, isJsx, isTs, isEsm) {
    if (config.swcLoader?.cjsPkg) {
        delete config.swcLoader.cjsPkg;
    }
    return deepmerge(
        {
            // sync: true,
            env: {
                targets,
                mode: 'usage',
                coreJs: '3',
            },
            jsc: {
                parser: {
                    syntax: isTs ? 'typescript' : 'ecmascript',
                    jsx: isJsx,
                },
                experimental: {
                    plugins: [['swc-plugin-vue-jsx', {}]],
                },
                // preserveAllComments: true,
            },
            module: {
                type: isEsm ? 'es6' : 'commonjs',
            },
            // minify: true,
        },
        config.swcLoader || {},
    );
}
