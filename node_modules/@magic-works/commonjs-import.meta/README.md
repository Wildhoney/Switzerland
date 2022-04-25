# `import.meta` => `__filename`

## Usage

```bash
npm i -D @magic-works/commonjs-import.meta ttypescript typescript ts-node
yarn add -D @magic-works/commonjs-import.meta ttypescript typescript ts-node
pnpm i -D @magic-works/commonjs-import.meta ttypescript typescript ts-node
```

This package works with [ttypescript](https://github.com/cevek/ttypescript).

Add the following to your `tsconfig.json`.

```json
{
    "compilerOptions": {
        "plugins": [{ "transform": "@magic-works/commonjs-import.meta" }]
    }
}
```

### Use with [ts-node](https://github.com/TypeStrong/ts-node/) in tsconfig.json

```jsonc
{
    "ts-node": {
        "compilerOptions": {
            "module": "CommonJS",
            "plugins": [{ "transform": "@magic-works/commonjs-import.meta" }]
        },
        "compiler": "ttypescript",
        // One of:
        "ignoreDiagnostics": [1343],
        // Or:
        "transpileOnly": true
        // To mute The 'import.meta' meta-property is only allowed when the '--module' option is 'esnext' or 'system'.ts(1343)
    }
}
```

## Transformation

This transformer did the following thing:

Add the following code to every file:

```ts
const __meta = { url: require('url').pathToFileURL(__filename).href }
Object.setPrototypeOf(__meta, null)
```

And it replace every `import.meta` into `__meta`.
