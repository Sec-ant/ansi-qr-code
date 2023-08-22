# @sec-ant/ansi-qr-code

Make Qr Codes suited for the terminal.

![Qr Code](https://github.com/Sec-ant/ansi-qr-code/assets/10386119/cea308cc-102e-4367-b24a-29d18604ef52)

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
