import {
  makeAnsiQrCode,
  makeSmallAnsiQrCode,
  Ecc,
  BG_BRIGHT_GREEN,
  BG_BLUE,
  FG_RED,
  RESET,
} from "./src/index.js";

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
