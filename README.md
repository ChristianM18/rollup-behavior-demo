# Up & running

To get this running:

1. Install PNPM, which is the package manager for this monorepo:
   > npm i pnpm -g
1. Install the dependencies:
   > pnpm install
1. Build the lib and run the app:
   > pnpm build-libs  
   > pnpm start

# What seems to be wrong?

The following error appears when building the app:
```
bundles src/main.js → public/bundle.js...
[!] Error: Could not load C:\Projects\sandbox\node-resolve-arrays\libs\utils\dist\color.js (imported by src/main.js): ENOENT: no such file or directory, open 'C:\Projects\sandbox\node-resolve-arrays\libs\utils\dist\color.js'
Error: Could not load C:\Projects\sandbox\node-resolve-arrays\libs\utils\dist\color.js (imported by src/main.js): ENOENT: no such file or directory, open 'C:\Projects\sandbox\node-resolve-arrays\libs\utils\dist\color.js'   
```

This happens the `apps/rollup-starter-app/src/main.js` file:

```typescript
// Works fine, thanks to util's package.json exports "./*" first array entry
import {nameToRgb} from "utils/color/rgb";
console.log(nameToRgb("red"));

// Breaks, because of util's package.json exports "./*" second array entry somehow not being applied
import {sayFavoriteColor} from "utils/color";
console.log(sayFavoriteColor("yellow"));
```

I suppose the `@rollup/plugin-node-resolve` plugin does not take into the account the `util`'s `package.json` `exports` entry when it contains arrays:

```json
{
  "name": "utils",
  "version": "1.0.0",
  "type": "module",
  "files": [
    "dist"
  ],
  "types": "./dist/index.d.ts",
  "main": "./dist/index.js",
  "exports": {
    "./*": ["./dist/*.js", "./dist/*/index.js"] // <- index 1 not taken into account?
  }
}
```
