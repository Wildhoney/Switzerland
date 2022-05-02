const { build } = require('esbuild');
const glob = require('glob');

async function run() {
    try {
        await build({
            entryPoints: glob.sync('./example/nodes/*/index.{ts,tsx}'),
            // minify: true,
            bundle: true,
            splitting: true,
            outdir: './example',
            outbase: './example',
            format: 'esm',
            plugins: [
                {
                    name: 'add-mjs',
                    setup(build) {
                        build.onResolve({ filter: /\.\.\/*/ }, (args) => {
                            if (args.importer && !args.path.endsWith('utils'))
                                return { path: args.path + '/index.js', external: true };
                        });
                    },
                },
            ],
        });
    } catch {
        process.exit(1);
    }
}

run();
