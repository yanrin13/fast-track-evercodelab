export function parseUserId(
  value: string | string[] | undefined,
): number | null {
  if (!value) {
    return null;
  }

  const userId = Number(value);

  if (!Number.isInteger(userId) || userId <= 0) {
    return null;
  }

  return userId;
}

export function parseCoinSymbol(
  value: string | string[] | undefined,
): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const symbol = value.trim();

  if (!isValidCoinSymbol(symbol)) {
    return null;
  }

  return symbol.toUpperCase();
}

export function isValidCoinSymbol(
  symbol: string | string[] | undefined,
): symbol is string {
  return (
    typeof symbol === "string" &&
    symbol.length > 0 &&
    /^[A-Za-z]+$/.test(symbol)
  );
}
