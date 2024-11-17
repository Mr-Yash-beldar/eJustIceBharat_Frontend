const esbuild = require('esbuild');

esbuild.build({
    entryPoints: ['./src/index.js'],
    bundle: true,
    outfile: 'dist/bundle.js',
    loader: {
        '.js': 'jsx', // Add this to process JSX in .js files
        '.ts': 'ts',
        '.tsx': 'tsx'
    },
}).catch(() => process.exit(1));
