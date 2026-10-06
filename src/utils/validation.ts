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
  if (!value || typeof value !== "string") {
    return null;
  }

  const symbol = value.trim().toUpperCase();

  if (!symbol) {
    return null;
  }

  return symbol;
}
