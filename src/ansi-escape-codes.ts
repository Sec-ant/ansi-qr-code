export const FG_BLACK = "\x1b[30m";
export type FgBlack = typeof FG_BLACK;
export const FG_RED = "\x1b[31m";
export type FgRed = typeof FG_RED;
export const FG_GREEN = "\x1b[32m";
export type FgGreen = typeof FG_GREEN;
export const FG_YELLOW = "\x1b[33m";
export type FgYellow = typeof FG_YELLOW;
export const FG_BLUE = "\x1b[34m";
export type FgBlue = typeof FG_BLUE;
export const FG_MAGENTA = "\x1b[35m";
export type FgMagenta = typeof FG_MAGENTA;
export const FG_CYAN = "\x1b[36m";
export type FgCyan = typeof FG_CYAN;
export const FG_WHITE = "\x1b[37m";
export type FgWhite = typeof FG_WHITE;
export const FG_GRAY = "\x1b[90m";
export type FgGray = typeof FG_GRAY;
export const FG_BRIGHT_RED = "\x1b[91m";
export type FgBrightRed = typeof FG_BRIGHT_RED;
export const FG_BRIGHT_GREEN = "\x1b[92m";
export type FgBrightGreen = typeof FG_BRIGHT_GREEN;
export const FG_BRIGHT_YELLOW = "\x1b[93m";
export type FgBrightYellow = typeof FG_BRIGHT_YELLOW;
export const FG_BRIGHT_BLUE = "\x1b[94m";
export type FgBrightBlue = typeof FG_BRIGHT_BLUE;
export const FG_BRIGHT_MAGENTA = "\x1b[95m";
export type FgBrightMagenta = typeof FG_BRIGHT_MAGENTA;
export const FG_BRIGHT_CYAN = "\x1b[96m";
export type FgBrightCyan = typeof FG_BRIGHT_CYAN;
export const FG_BRIGHT_WHITE = "\x1b[97m";
export type FgBrightWhite = typeof FG_BRIGHT_WHITE;
export const BG_BLACK = "\x1b[40m";
export type BgBlack = typeof BG_BLACK;
export const BG_RED = "\x1b[41m";
export type BgRed = typeof BG_RED;
export const BG_GREEN = "\x1b[42m";
export type BgGreen = typeof BG_GREEN;
export const BG_YELLOW = "\x1b[43m";
export type BgYellow = typeof BG_YELLOW;
export const BG_BLUE = "\x1b[44m";
export type BgBlue = typeof BG_BLUE;
export const BG_MAGENTA = "\x1b[45m";
export type BgMagenta = typeof BG_MAGENTA;
export const BG_CYAN = "\x1b[46m";
export type BgCyan = typeof BG_CYAN;
export const BG_WHITE = "\x1b[47m";
export type BgWhite = typeof BG_WHITE;
export const BG_GRAY = "\x1b[100m";
export type BgGray = typeof BG_GRAY;
export const BG_BRIGHT_RED = "\x1b[101m";
export type BgBrightRed = typeof BG_BRIGHT_RED;
export const BG_BRIGHT_GREEN = "\x1b[102m";
export type BgBrightGreen = typeof BG_BRIGHT_GREEN;
export const BG_BRIGHT_YELLOW = "\x1b[103m";
export type BgBrightYellow = typeof BG_BRIGHT_YELLOW;
export const BG_BRIGHT_BLUE = "\x1b[104m";
export type BgBrightBlue = typeof BG_BRIGHT_BLUE;
export const BG_BRIGHT_MAGENTA = "\x1b[105m";
export type BgBrightMagenta = typeof BG_BRIGHT_MAGENTA;
export const BG_BRIGHT_CYAN = "\x1b[106m";
export type BgBrightCyan = typeof BG_BRIGHT_CYAN;
export const BG_BRIGHT_WHITE = "\x1b[107m";
export type BgBrightWhite = typeof BG_BRIGHT_WHITE;

export type FgColor =
  | FgBlack
  | FgRed
  | FgGreen
  | FgYellow
  | FgBlue
  | FgMagenta
  | FgCyan
  | FgWhite
  | FgGray
  | FgBrightRed
  | FgBrightGreen
  | FgBrightYellow
  | FgBrightBlue
  | FgBrightMagenta
  | FgBrightCyan
  | FgBrightWhite;

export type BgColor =
  | BgBlack
  | BgRed
  | BgGreen
  | BgYellow
  | BgBlue
  | BgMagenta
  | BgCyan
  | BgWhite
  | BgGray
  | BgBrightRed
  | BgBrightGreen
  | BgBrightYellow
  | BgBrightBlue
  | BgBrightMagenta
  | BgBrightCyan
  | BgBrightWhite;

export type Color = FgColor | BgColor;

export const RESET = "\x1b[0m";

export type Reset = typeof RESET;

export type AnsiEscapeCode = Color | Reset;
