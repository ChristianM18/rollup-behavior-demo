import { globSync } from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
    input: Object.fromEntries(globSync('src/**/*.ts').map(file => [
        // This remove `src/` as well as the file extension from each
        // file, so e.g. src/nested/foo.js becomes nested/foo
        path.relative('src', file.slice(0, file.length - path.extname(file).length)),
        // This expands the relative paths to absolute paths, so e.g.
        // src/nested/foo becomes /project/src/nested/foo.js
        fileURLToPath(new URL(file, import.meta.url))
    ])),
    output: {
        format: "esm",
        dir: "./dist",
        sourcemap: true
    },
    plugins: [
        typescript({
            compilerOptions: {
                declaration: true,
                declarationDir: "./dist"
            }
        }),
        nodeResolve()
    ],
    external: ["lodash"]
}
