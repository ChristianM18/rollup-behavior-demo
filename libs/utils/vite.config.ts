import {defineConfig} from "vite";
import dts from "vite-plugin-dts";
import { globSync } from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export default defineConfig(({mode}) => {
    return {
        root: ".",
        build: {
            outDir: "dist",
            lib: {
                entry: "src/index.ts",
                fileName: "[name]",
                formats: ["es"]
            },
            rollupOptions: {
                input: Object.fromEntries(
                    globSync('src/**/*.ts').map(file => [
                        // This remove `src/` as well as the file extension from each
                        // file, so e.g. src/nested/foo.js becomes nested/foo
                        path.relative(
                            'src',
                            file.slice(0, file.length - path.extname(file).length)
                        ),
                        // This expands the relative paths to absolute paths, so e.g.
                        // src/nested/foo becomes /project/src/nested/foo.js
                        fileURLToPath(new URL(file, import.meta.url))
                    ])
                ),
                output: {
                    format: "es",
                    dir: "dist",
                    exports: "named"
                }
            },
            minify: true,
            sourcemap: true
        },
        plugins: [
            dts({
                outDir: "dist",
                entryRoot: "src",
                include: "**/*.ts"
            })
        ]
    }
});
