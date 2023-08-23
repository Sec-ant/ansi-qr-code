# @sec-ant/ansi-qr-code

Make Qr Codes suited for the terminal.

![ansi-qr-code-demo](https://github.com/Sec-ant/ansi-qr-code/assets/10386119/b3c7aa16-c178-4722-adc3-6a6f9f7ce1f6)

## Install

```bash
npm i @sec-ant/ansi-qr-code
```

## Usage

```ts
import {
  makeAnsiQrCode,
  makeSmallAnsiQrCode,
  Ecc,
  BG_BRIGHT_GREEN,
  BG_BLUE,
  FG_RED,
  RESET,
} from "@sec-ant/ansi-qr-code";

const { value: bigValue, size: bigSize } = makeAnsiQrCode("Hello, world!", {
  ecc: Ecc.LOW,
  border: 1,
  blackModuleColor: BG_BLUE,
  whiteModuleColor: BG_BRIGHT_GREEN,
});

console.log(bigValue, bigSize);

const { value: smallValue, size: smallSize } = makeSmallAnsiQrCode(
  "Hello, world!",
  {
    ecc: Ecc.HIGH,
    border: 4,
    blackModuleColor: FG_RED,
    whiteModuleColor: RESET,
  },
);

console.log(smallValue, smallSize);
```

## License

MIT
