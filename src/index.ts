import { Ecc, QrCode } from "@sec-ant/qr-code-generator";

const RESET = "\x1b[0m";

export { Ecc };

export interface AnsiQrCodeResult {
  value: string;
  size: number;
}

interface AnsiQrCodeOptionsBase {
  ecc?: Ecc;
  border?: number;
}

const colors = [
  "black",
  "red",
  "green",
  "yellow",
  "blue",
  "magenta",
  "cyan",
  "white",
] as const;

type ModuleColor =
  | (typeof colors)[number]
  | `bright${(typeof colors)[number]}`
  | "gray"
  | "grey"
  | "unset";

type ModuleType = "foreground" | "background";

interface ModuleTypeAndColor<B extends ModuleType, W extends ModuleType> {
  blackModuleType?: B;
  blackModuleColor?: ModuleColor;
  whiteModuleType?: W;
  whiteModuleColor?: ModuleColor;
}

export interface AnsiQrCodeOptionsIdeographicSpace
  extends AnsiQrCodeOptionsBase,
    ModuleTypeAndColor<"background", "background"> {
  variant?: "ideographic-space";
}

interface AnsiQrCodeOptionsFullBlockBase extends AnsiQrCodeOptionsBase {
  variant?: "full-block";
}

export type AnsiQrCodeOptionsFullBlock =
  | (AnsiQrCodeOptionsFullBlockBase &
      ModuleTypeAndColor<"background", "background">)
  | (AnsiQrCodeOptionsFullBlockBase &
      ModuleTypeAndColor<"background", "foreground">)
  | (AnsiQrCodeOptionsFullBlockBase &
      ModuleTypeAndColor<"foreground", "background">)
  | (AnsiQrCodeOptionsFullBlockBase &
      ModuleTypeAndColor<"foreground", "foreground">);

interface AnsiQrCodeOptionsHalfBlockBase extends AnsiQrCodeOptionsBase {
  variant?: "half-block";
}

export type AnsiQrCodeOptionsHalfBlock =
  | (AnsiQrCodeOptionsHalfBlockBase &
      ModuleTypeAndColor<"background", "foreground">)
  | (AnsiQrCodeOptionsHalfBlockBase &
      ModuleTypeAndColor<"foreground", "background">);

interface AnsiQrCodeOptionsQuadrantBlockBase extends AnsiQrCodeOptionsBase {
  variant?: "quadrant-block";
}

export type AnsiQrCodeOptionsQuadrantBlock =
  | (AnsiQrCodeOptionsQuadrantBlockBase &
      ModuleTypeAndColor<"background", "foreground">)
  | (AnsiQrCodeOptionsQuadrantBlockBase &
      ModuleTypeAndColor<"foreground", "background">);

export type AnsiQrCodeOptions =
  | AnsiQrCodeOptionsIdeographicSpace
  | AnsiQrCodeOptionsFullBlock
  | AnsiQrCodeOptionsHalfBlock
  | AnsiQrCodeOptionsQuadrantBlock;

// defaults

const DEFAULT_ANSI_QR_CODE_OPTIONS_BASE: Required<AnsiQrCodeOptionsBase> = {
  ecc: Ecc.LOW,
  border: 4,
} as const;

const DEFAULT_MODULE_TYPE_AND_COLOR_IDEOGRAPHIC_SPACE: Required<
  ModuleTypeAndColor<"background", "background">
> = {
  blackModuleType: "background",
  blackModuleColor: "black",
  whiteModuleType: "background",
  whiteModuleColor: "brightwhite",
} as const;

const DEFAULT_MODULE_TYPE_AND_COLOR_BLOCK: Required<
  ModuleTypeAndColor<"foreground", "background">
> = {
  blackModuleType: "foreground",
  blackModuleColor: "black",
  whiteModuleType: "background",
  whiteModuleColor: "brightwhite",
} as const;

const DEFAULT_ANSI_QR_CODE_OPTIONS: Required<AnsiQrCodeOptions> = {
  ...DEFAULT_ANSI_QR_CODE_OPTIONS_BASE,
  ...DEFAULT_MODULE_TYPE_AND_COLOR_BLOCK,
  variant: "full-block",
} as const;

const IDEOGRAPHIC_SPACE_MODULE = "　";
const FULL_BLOCK_MODULES = ["  ", "██"];
const HALF_BLOCK_QUADRUPLE_MODULES = [
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
const QUADRANT_BLOCK_QUADRUPLE_MODULES = [
  " ",
  "▗",
  "▖",
  "▄",
  "▝",
  "▐",
  "▞",
  "▟",
  "▘",
  "▚",
  "▌",
  "▙",
  "▀",
  "▜",
  "▛",
  "█",
];

export function makeAnsiQrCode(
  value: string,
  {
    ecc = DEFAULT_ANSI_QR_CODE_OPTIONS.ecc,
    border = DEFAULT_ANSI_QR_CODE_OPTIONS.border,
    variant = DEFAULT_ANSI_QR_CODE_OPTIONS.variant,
    blackModuleType,
    blackModuleColor,
    whiteModuleType,
    whiteModuleColor,
  }: AnsiQrCodeOptions = DEFAULT_ANSI_QR_CODE_OPTIONS,
): AnsiQrCodeResult {
  if (!isEcc(ecc)) {
    throw new TypeError("Invalid ecc value.");
  }
  const qr = QrCode.encodeText(value, ecc);
  const qrSizeWithBorders = qr.size + 2 * border;
  let qrCode = "";
  // ideographic space
  if (variant === "ideographic-space") {
    blackModuleType ??=
      DEFAULT_MODULE_TYPE_AND_COLOR_IDEOGRAPHIC_SPACE.blackModuleType;
    whiteModuleType ??=
      DEFAULT_MODULE_TYPE_AND_COLOR_IDEOGRAPHIC_SPACE.whiteModuleType;
    if (blackModuleType !== "background" || whiteModuleType !== "background") {
      throw new TypeError(
        "Only background module type can be used in ideographic-space variant.",
      );
    }
    blackModuleColor ??=
      DEFAULT_MODULE_TYPE_AND_COLOR_IDEOGRAPHIC_SPACE.blackModuleColor;
    whiteModuleColor ??=
      DEFAULT_MODULE_TYPE_AND_COLOR_IDEOGRAPHIC_SPACE.whiteModuleColor;
    if (!isModuleColor(blackModuleColor) || !isModuleColor(whiteModuleColor)) {
      throw new TypeError("Unsupported module color.");
    }
    const blackModuleColorCode = getModuleColorCode(
      blackModuleColor,
      blackModuleType,
    );
    const whiteModuleColorCode = getModuleColorCode(
      whiteModuleColor,
      whiteModuleType,
    );
    const blackModule = blackModuleColorCode + IDEOGRAPHIC_SPACE_MODULE;
    const whiteModule = whiteModuleColorCode + IDEOGRAPHIC_SPACE_MODULE;
    for (let y = 0; y < qrSizeWithBorders; ++y) {
      let previous: boolean | undefined = undefined;
      for (let x = 0; x < qrSizeWithBorders; ++x) {
        const current = qr.getModule(x - border, y - border);
        if (
          current === previous ||
          (x > 0 && blackModuleColorCode === whiteModuleColorCode)
        ) {
          qrCode += IDEOGRAPHIC_SPACE_MODULE;
        } else {
          qrCode += current ? blackModule : whiteModule;
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
  blackModuleType ??= DEFAULT_MODULE_TYPE_AND_COLOR_BLOCK.blackModuleType;
  whiteModuleType ??= DEFAULT_MODULE_TYPE_AND_COLOR_BLOCK.whiteModuleType;
  if (!isModuleType(blackModuleType) || !isModuleType(whiteModuleType)) {
    throw new TypeError("Invalid module type.");
  }
  blackModuleColor ??= DEFAULT_MODULE_TYPE_AND_COLOR_BLOCK.blackModuleColor;
  whiteModuleColor ??= DEFAULT_MODULE_TYPE_AND_COLOR_BLOCK.whiteModuleColor;
  if (!isModuleColor(blackModuleColor) || !isModuleColor(whiteModuleColor)) {
    throw new TypeError("Unsupported module color.");
  }
  const blackModuleColorCode = getModuleColorCode(
    blackModuleColor,
    blackModuleType,
  );
  const whiteModuleColorCode = getModuleColorCode(
    whiteModuleColor,
    whiteModuleType,
  );
  // full block
  if (variant === "full-block") {
    if (blackModuleType !== whiteModuleType) {
      const inverted = blackModuleType === "background";
      const lineStartCode =
        (blackModuleColor === "unset" ? "" : blackModuleColorCode) +
        (whiteModuleColor === "unset" ? "" : whiteModuleColorCode);
      for (let y = 0; y < qrSizeWithBorders; ++y) {
        qrCode += lineStartCode;
        for (let x = 0; x < qrSizeWithBorders; ++x) {
          const moduleIndex = +qr.getModule(x - border, y - border);
          qrCode +=
            FULL_BLOCK_MODULES[inverted ? 1 - moduleIndex : moduleIndex];
        }
        qrCode += (lineStartCode ? RESET : "") + "\n";
      }
      return {
        value: qrCode,
        size: qrSizeWithBorders,
      };
    }
    const module =
      blackModuleType === "foreground"
        ? FULL_BLOCK_MODULES[1]
        : FULL_BLOCK_MODULES[0];
    const blackModule = blackModuleColorCode + module;
    const whiteModule = whiteModuleColorCode + module;
    for (let y = 0; y < qrSizeWithBorders; ++y) {
      let previous: boolean | undefined = undefined;
      for (let x = 0; x < qrSizeWithBorders; ++x) {
        const current = qr.getModule(x - border, y - border);
        if (
          current === previous ||
          (x > 0 && blackModuleColorCode === whiteModuleColorCode)
        ) {
          qrCode += module;
        } else {
          qrCode += current ? blackModule : whiteModule;
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
  // half or quadrant block
  if (variant === "half-block" || variant === "quadrant-block") {
    if (blackModuleType === whiteModuleType) {
      throw new TypeError(
        `Module types cannot be both foreground or background in ${variant} variant.`,
      );
    }
    const inverted = blackModuleType === "background";
    const lineStartCode =
      (blackModuleColor === "unset" ? "" : blackModuleColorCode) +
      (whiteModuleColor === "unset" ? "" : whiteModuleColorCode);
    const modules =
      variant === "half-block"
        ? HALF_BLOCK_QUADRUPLE_MODULES
        : QUADRANT_BLOCK_QUADRUPLE_MODULES;
    for (let y = 0; y < qrSizeWithBorders; y += 2) {
      qrCode += lineStartCode;
      for (let x = 0; x < qrSizeWithBorders; x += 2) {
        const moduleIndex =
          (+qr.getModule(x - border, y - border) << 3) +
          (+qr.getModule(x - border + 1, y - border) << 2) +
          (+qr.getModule(x - border, y - border + 1) << 1) +
          (+qr.getModule(x - border + 1, y - border + 1) << 0);
        qrCode += modules[inverted ? 15 - moduleIndex : moduleIndex];
      }
      qrCode += (lineStartCode ? RESET : "") + "\n";
    }
    return { value: qrCode, size: qrSizeWithBorders };
  }
  throw new TypeError(`Unrecognized variant type: ${variant satisfies never}`);
}

function isModuleColor(color: unknown): color is ModuleColor {
  try {
    return color === "gray" || color === "grey" || color === "unset"
      ? true
      : (color as string).startsWith("bright")
      ? (colors as readonly unknown[]).includes(
          (color as string).slice(6) as ModuleColor,
        )
      : (colors as readonly unknown[]).includes(color);
  } catch {
    return false;
  }
}

function isModuleType(type: unknown): type is ModuleType {
  return (
    (type as ModuleType) === "foreground" ||
    (type as ModuleType) === "background"
  );
}

function isEcc(ecc: unknown): ecc is Ecc {
  try {
    return ecc instanceof Ecc;
  } catch {
    return false;
  }
}

function getModuleColorCode(color: ModuleColor, type: ModuleType) {
  if (color === "unset") {
    return RESET;
  }
  if (color === "gray" || color === "grey") {
    color = "brightblack";
  }
  if (color.startsWith("bright")) {
    return `\x1b[${type === "foreground" ? "9" : "10"}${colors.indexOf(
      color.slice(6) as (typeof colors)[number],
    )}m`;
  }
  return `\x1b[${type === "foreground" ? "3" : "4"}${colors.indexOf(
    color as (typeof colors)[number],
  )}m`;
}
