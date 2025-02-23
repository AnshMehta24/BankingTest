import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertCurrency, payBack, requestLoan, withdraw } from "./redux/slices/accountSlice";

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("INR");

  const dispatch = useDispatch();

  const currentLoan = useSelector(state => state.account.loan);


  function handleDeposit() {
    // dispatch(deposite(depositAmount))
    console.log(depositAmount)
    dispatch(convertCurrency({amount:depositAmount, currency}))
    setDepositAmount("")
  }

  function handleWithdrawal() {
    dispatch(withdraw(withdrawalAmount))
    setWithdrawalAmount("")
  }

  function handleRequestLoan() {
    dispatch(requestLoan({
      amount: loanAmount,
      purpose: loanPurpose
    }))

    setLoanAmount("");
    setLoanPurpose("")
  }

  function handlePayLoan() {
    dispatch(payBack())
   }


  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(+e.target.value)}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="INR">Indian Rupee</option>
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>

          <button onClick={handleDeposit}>Deposit {depositAmount}</button>
        </div>

        <div>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(+e.target.value)}
          />
          <button onClick={handleWithdrawal}>
            Withdraw {withdrawalAmount}
          </button>
        </div>

        <div>
          <label>Request loan</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(+e.target.value)}
            placeholder="Loan amount"
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder="Loan purpose"
          />
          <button onClick={handleRequestLoan}>Request loan</button>
        </div>

        <div>
          <span>Pay back ₹ {currentLoan} </span>
          <button onClick={handlePayLoan}>Pay loan</button>
        </div>
      </div>
    </div>
  );
}

export default AccountOperations;
