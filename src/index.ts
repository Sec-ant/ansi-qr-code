import { Ecc, QrCode } from "@sec-ant/qr-code-generator";

export { Ecc };

export interface AnsiQrCodeOptions {
  ecc?: Ecc;
  border?: number;
  invertColors?: boolean;
  transparentWhite?: boolean;
  transparentBlack?: boolean;
}

const DEFAULT_ANSI_QR_CODE_OPTIONS: Required<AnsiQrCodeOptions> = {
  ecc: Ecc.LOW,
  border: 4,
  invertColors: false,
  transparentWhite: false,
  transparentBlack: false,
};

export function makeAnsiQrCode(
  value: string,
  {
    ecc = DEFAULT_ANSI_QR_CODE_OPTIONS.ecc,
    border = DEFAULT_ANSI_QR_CODE_OPTIONS.border,
    invertColors = DEFAULT_ANSI_QR_CODE_OPTIONS.invertColors,
    transparentWhite = DEFAULT_ANSI_QR_CODE_OPTIONS.transparentWhite,
    transparentBlack = DEFAULT_ANSI_QR_CODE_OPTIONS.transparentBlack,
  }: AnsiQrCodeOptions = DEFAULT_ANSI_QR_CODE_OPTIONS
): [string, number] {
  const qr = QrCode.encodeText(value, ecc);
  let qrCode = "";
  const blackBlock = transparentBlack ? "\x1b[0m　" : "\x1b[40m　";
  const whiteBlock = transparentWhite ? "\x1b[0m　" : "\x1b[47m　";
  for (let y = 0; y < qr.size + 2 * border; ++y) {
    for (let x = 0; x < qr.size + 2 * border; ++x) {
      if (
        x < border ||
        y < border ||
        x >= qr.size + border ||
        y >= qr.size + border
      ) {
        qrCode += invertColors ? blackBlock : whiteBlock;
      } else {
        qrCode +=
          qr.getModule(x - border, y - border) !== invertColors
            ? blackBlock
            : whiteBlock;
      }
    }
    qrCode += "\x1b[0m\n";
  }
  qrCode += "\x1b[0m";
  return [qrCode, qr.size + 2 * border];
}
