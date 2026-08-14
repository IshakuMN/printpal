export const formatMoney = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);

export const formatDate = (ts: number) =>
  new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(ts);

export const makeOrderReference = () => {
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `INK-${rand}`;
};

export const uid = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export const plural = (n: number, label: string) =>
  `${n} ${label}${n === 1 ? "" : "s"}`;
