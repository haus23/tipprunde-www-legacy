export function classes(...values: (string | boolean | undefined | null)[]) {
  return values.filter(Boolean).join(' ');
}
