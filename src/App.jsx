import { useState } from "react";
import "./App.css";

function App() {
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [rate, setRate] = useState("");
  const [type, setType] = useState("repayment");
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);

  const calculateRepayments = () => {
    if (!amount || !term || !rate) {
      alert("Please fill out all fields");
      return;
    }

    const principal = Number(amount);
    const years = Number(term);
    const interestRate = Number(rate) / 100 / 12;
    const totalMonths = years * 12;

    if (type === "repayment") {
      const monthly =
        (principal * interestRate * Math.pow(1 + interestRate, totalMonths)) /
        (Math.pow(1 + interestRate, totalMonths) - 1);
      const total = monthly * totalMonths;

      setMonthlyPayment(Math.round(monthly));
      setTotalPayment(Math.round(total));
    } else {
      const monthly = principal * (Number(rate) / 100) / 12;
      const total = monthly * totalMonths;

      setMonthlyPayment(Math.round(monthly));
      setTotalPayment(Math.round(total));
    }
  };

  return (
    <div className="container">
      <div className="calculator">
        <div className="enterance">
          <h2>Mortgage Calculator</h2>
          <a href="#" className="clear-link" onClick={() => window.location.reload()}>
            Clear All
          </a>
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="amount">Mortgage Amount</label>
            <input
              type="number"
              id="amount"
              placeholder="£"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="term">Mortgage Term</label>
            <input
              type="number"
              id="term"
              placeholder="years"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="rate">Interest Rate</label>
            <input
              type="number"
              id="rate"
              placeholder="%"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Mortgage Type</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="type"
                  value="repayment"
                  checked={type === "repayment"}
                  onChange={(e) => setType(e.target.value)}
                />{" "}
                Repayment
              </label>
              <label>
                <input
                  type="radio"
                  name="type"
                  value="interest"
                  checked={type === "interest"}
                  onChange={(e) => setType(e.target.value)}
                />{" "}
                Interest Only
              </label>
            </div>
          </div>
          <button
            type="button"
            className="calculate-btn"
            onClick={calculateRepayments}
          >
            Calculate Repayments
          </button>
        </form>
      </div>
      <div className="results">
        <h2>Your results</h2>
        <p>
          Your results are shown below based on the information you provided. To
          adjust the results, edit the form and click "calculate repayments"
          again.
        </p>
        {monthlyPayment && (
          <div className="monthly">
            <h3>Your monthly repayments</h3>
            <p className="amount">£{monthlyPayment}</p>
          </div>
        )}
        {totalPayment && (
          <div className="total">
            <h3>Total you'll repay over the term</h3>
            <p className="amount">£{totalPayment}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
