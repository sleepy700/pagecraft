export function formatMoney(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

export function formatMoneyExact(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(cents / 100);
}

export const FREE_SHIPPING_THRESHOLD = 3500;
export const FLAT_SHIPPING = 495;

export const PROMO_CODES: Record<string, { type: "percent"; value: number; label: string }> = {
  WELCOME10: { type: "percent", value: 10, label: "10% off your order" },
};
