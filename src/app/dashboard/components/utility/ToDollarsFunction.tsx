export default function ToDollarsFunction({ value }: { value: number }) {
  const TradingVolumToDollar = value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return TradingVolumToDollar;
}
