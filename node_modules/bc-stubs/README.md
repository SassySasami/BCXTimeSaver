[![npm version](https://badge.fury.io/js/bc-stubs.svg)](https://badge.fury.io/js/bc-stubs)

# BC-stubs
Auto-generated .d.ts stub files for the Bondage Club game (https://gitgud.io/BondageProjects/Bondage-College).

# Installation
To install the package one must:

1. Install BC-Stubs either from npmjs (`npm install bc-stubs`) or directly from github (`npm install bananarama92/BC-stubs`). Pinning a tag is recommended in particular when installing directly from github.
2. Ensure that the package is specified in the `include` field of tsconfig.json:

```json
{
    "include": [
        "node_modules/bc-stubs/bc/**/*.d.ts"
    ]
}
```
