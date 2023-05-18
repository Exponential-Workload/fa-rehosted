# FA Rehosted

FontAwesome is hosted by Cloudflare, which isn't known for it's privacy, nor for it's reliability or performance.

This repository contains a script to download the latest FontAwesome release using [Puppeteer](https://pptr.dev), intercept requests, and save them to files/ - Then, replace-urls.ts will replace the urls with ones pointing to your origin (set the `PREFIX` env to your url's `new` dir (with trailing `/`, without protocol) - ie `fa.astolfo.gay/new/`).

## Loading

You can load SelfhostableFA from <https://fa.astolfo.gay/fa.js> (copied from the new/ directory by [copy-file.ts](./copy-file.ts)) or by putting your own origin into [pptr.ts](pptr.ts) and running `pnpm build:pptr && pnpm build:rpl` (dependencies must be installed first; `pnpm i`), and hosting the `new` directory somewhere else. Make sure to set the PREFIX env as shown above!
