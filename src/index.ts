import { Ecc, QrCode } from "@sec-ant/qr-code-generator";
export * from "./ansi-escape-codes.js";
import {
  FgColor,
  BgColor,
  Reset,
  RESET,
  BG_BLACK,
  BG_BRIGHT_WHITE,
  FG_BLACK,
} from "./ansi-escape-codes.js";

export { Ecc };

export interface AnsiQrCodeOptions {
  ecc?: Ecc;
  border?: number;
  blackModuleColor?: BgColor | Reset;
  whiteModuleColor?: BgColor | Reset;
}

const DEFAULT_ANSI_QR_CODE_OPTIONS: Required<AnsiQrCodeOptions> = {
  ecc: Ecc.LOW,
  border: 4,
  blackModuleColor: BG_BLACK,
  whiteModuleColor: BG_BRIGHT_WHITE,
};

export interface AnsiQrCodeResult {
  value: string;
  size: number;
}

const PLAIN_BLOCK = "　";

export function makeAnsiQrCode(
  value: string,
  {
    ecc = DEFAULT_ANSI_QR_CODE_OPTIONS.ecc,
    border = DEFAULT_ANSI_QR_CODE_OPTIONS.border,
    blackModuleColor = DEFAULT_ANSI_QR_CODE_OPTIONS.blackModuleColor,
    whiteModuleColor = DEFAULT_ANSI_QR_CODE_OPTIONS.whiteModuleColor,
  }: AnsiQrCodeOptions = DEFAULT_ANSI_QR_CODE_OPTIONS,
): AnsiQrCodeResult {
  const qr = QrCode.encodeText(value, ecc);
  const qrSizeWithBorders = qr.size + 2 * border;
  let qrCode = "";
  const blackBlock = blackModuleColor + PLAIN_BLOCK;
  const whiteBlock = whiteModuleColor + PLAIN_BLOCK;
  for (let y = 0; y < qrSizeWithBorders; ++y) {
    let previous: boolean | undefined = undefined;
    for (let x = 0; x < qrSizeWithBorders; ++x) {
      const current = qr.getModule(x - border, y - border);
      if (current === previous || blackModuleColor === whiteModuleColor) {
        qrCode += PLAIN_BLOCK;
      } else {
        qrCode += current ? blackBlock : whiteBlock;
      }
      previous = current;
    }
    qrCode += `${RESET}\n`;
  }
  return {
    value: qrCode,
    size: qrSizeWithBorders,
  };
}

export interface SmallAnsiQrCodeOptionsNormal {
  ecc?: Ecc;
  border?: number;
  blackModuleColor?: FgColor | Reset;
  whiteModuleColor?: BgColor | Reset;
}

export interface SmallAnsiQrCodeOptionsInverted {
  ecc?: Ecc;
  border?: number;
  blackModuleColor?: BgColor | Reset;
  whiteModuleColor?: FgColor | Reset;
}

export type SmallAnsiQrCodeOptions =
  | SmallAnsiQrCodeOptionsNormal
  | SmallAnsiQrCodeOptionsInverted;

const DEFAULT_SMALL_ANSI_QR_CODE_OPTIONS: Required<SmallAnsiQrCodeOptions> = {
  ecc: Ecc.LOW,
  border: 4,
  blackModuleColor: FG_BLACK,
  whiteModuleColor: BG_BRIGHT_WHITE,
};

export interface SmallAnsiQrCodeResult {
  value: string;
  size: number;
}

const quadrublocks = [
  "  ",
  " ▄",
  "▄ ",
  "▄▄",
  " ▀",
  " █",
  "▄▀",
  "▄█",
  "▀ ",
  "▀▄",
  "█ ",
  "█▄",
  "▀▀",
  "▀█",
  "█▀",
  "██",
];

export function makeSmallAnsiQrCode(
  value: string,
  {
    ecc = DEFAULT_SMALL_ANSI_QR_CODE_OPTIONS.ecc,
    border = DEFAULT_SMALL_ANSI_QR_CODE_OPTIONS.border,
    blackModuleColor = DEFAULT_SMALL_ANSI_QR_CODE_OPTIONS.blackModuleColor,
    whiteModuleColor = DEFAULT_SMALL_ANSI_QR_CODE_OPTIONS.whiteModuleColor,
  }: SmallAnsiQrCodeOptions = DEFAULT_SMALL_ANSI_QR_CODE_OPTIONS,
): AnsiQrCodeResult {
  const qr = QrCode.encodeText(value, ecc);
  const qrSizeWithBorders = qr.size + 2 * border;
  let qrCode = "";
  const inverted = isBgColor(blackModuleColor) || isFgColor(whiteModuleColor);
  const start =
    (blackModuleColor === RESET ? "" : blackModuleColor) +
    (whiteModuleColor === RESET ? "" : whiteModuleColor);
  for (let y = 0; y < qrSizeWithBorders; y += 2) {
    qrCode += start;
    for (let x = 0; x < qrSizeWithBorders; x += 2) {
      const blockShape =
        (+qr.getModule(x - border, y - border) << 3) +
        (+qr.getModule(x - border + 1, y - border) << 2) +
        (+qr.getModule(x - border, y - border + 1) << 1) +
        (+qr.getModule(x - border + 1, y - border + 1) << 0);
      qrCode += quadrublocks[inverted ? 15 - blockShape : blockShape];
    }
    qrCode += (start ? RESET : "") + "\n";
  }
  return { value: qrCode, size: qrSizeWithBorders / 2 };
}

function isFgColor(color: FgColor | BgColor | Reset): color is FgColor {
  // eslint-disable-next-line no-control-regex
  return /^\x1b\[(?:3|9)[0-7]m$/.test(color);
}

function isBgColor(color: FgColor | BgColor | Reset): color is BgColor {
  // eslint-disable-next-line no-control-regex
  return /^\x1b\[(?:4|10)[0-7]m$/.test(color);
}
