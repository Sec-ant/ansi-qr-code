import { makeAnsiQrCode, Ecc } from "./src/index.js";

const { value: bigValue, size: bigSize } = makeAnsiQrCode("Hello, world!", {
  ecc: Ecc.HIGH,
  border: 1,
  variant: "half-block",
  blackModuleType: "background",
  blackModuleColor: "gray",
  whiteModuleType: "foreground",
  whiteModuleColor: "brightwhite",
});

console.log(bigValue, bigSize);
