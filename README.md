To see the error run the following commands (make sure you have `pnpm` installed)

```
pnpm install
pnpm build
```

`domain-db` fails to build because of the following error

```
domain-db:build: src/index.ts(4,7): error TS2742: The inferred type of 'databaseClient' cannot be named without a reference to '../firestore-zod/node_modules/zod/lib'. This is likely not portable. A type annotation is necessary.
```