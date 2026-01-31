export default function ToDollarsFunction({ value }: { value: number }) {
  const TradingVolumToDollar = value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
  return TradingVolumToDollar;
}
