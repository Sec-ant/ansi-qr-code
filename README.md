# @sec-ant/ansi-qr-code

Make Qr Codes suited for the terminal.

## Install

```ts
npm i @sec-ant/ansi-qr-code
```

## Usage

```ts
import { makeAnsiQrCode } from "@sec-ant/ansi-qr-code";

const { value, size } = makeAnsiQrCode("Hello, world!");

console.log(value);
```

## License

MIT
