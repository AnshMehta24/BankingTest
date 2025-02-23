import { useSelector } from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "INR",
  }).format(value);
}

// api  https://api.frankfurter.app/latest?amount=200&from=usd&to=inr

function BalanceDisplay() {

  const balance = useSelector(state => state.account.balance)

  return <div className="balance">{formatCurrency(balance)}</div>;
}

export default BalanceDisplay;
