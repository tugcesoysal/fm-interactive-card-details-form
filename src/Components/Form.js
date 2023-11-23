import { useState } from "react";

export default function Form({
  onSubmit,
  cardNumberValue,
  setCardNumberValue,
  dateMM,
  setDateMM,
  dateYY,
  setDateYY,
  cvcValue,
  setCVCValue,
  nameValue,
  setNameValue,
}) {
  const [cardNumberError, setCardNumberError] = useState(false);
  const [blankDateError, setBlankDateError] = useState(false);
  const [currentDateError, setCurrentDateError] = useState(false);
  const [cvcError, setCvcError] = useState(false);

  const isCardNumberValid = () =>
    cardNumberValue.replace(/\s/g, "").match(/^\d{16}$/);

  const formatCardNumber = (input) => {
    const cleanedInput = input.replace(/\D/g, "").slice(0, 16);
    const formattedInput = cleanedInput.replace(/(\d{4})/g, "$1 ");
    return formattedInput.trim();
  };

  const isAfterCurrentDate = () => {
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    const enteredYear = parseInt(dateYY, 10);
    const enteredMonth = parseInt(dateMM, 10);

    return (
      enteredYear > currentYear ||
      (enteredYear === currentYear && enteredMonth >= currentMonth)
    );
  };

  const handleButtonClick = (e) => {
    e.preventDefault();

    const isCardValid = isCardNumberValid();
    const isDateValid = isAfterCurrentDate();
    const isCVCValid = cvcValue.match(/^\d{3}$/);

    setCardNumberValue(formatCardNumber(cardNumberValue));

    setCardNumberError(!isCardValid);
    setBlankDateError(dateMM === "" || dateYY === "");
    setCurrentDateError(!isDateValid);
    setCvcError(!isCVCValid);

    if (!isCardValid || !isDateValid || !isCVCValid || blankDateError) {
      return;
    }

    onSubmit();
  };

  return (
    <form className="form_section">
      {/* Cardholder Name */}
      <label htmlFor="name">Cardholder Name</label>
      <input
        name="name"
        type="text"
        placeholder="e.g. Tugce Soysal"
        value={nameValue}
        onChange={(e) => setNameValue(e.target.value)}
      ></input>

      {/* Card Number */}
      <label htmlFor="number">Card Number</label>
      <input
        name="number"
        type="text"
        placeholder="e.g. 1234 5678 9123 0000"
        value={formatCardNumber(cardNumberValue)}
        onChange={(e) => setCardNumberValue(formatCardNumber(e.target.value))}
      ></input>
      {cardNumberError && <p className="error">Wrong format, numbers only</p>}

      {/* Expiry Date and CVC */}
      <label className="date_cvc_label" htmlFor="date">
        Exp. Date (MM/YY) <span className="cvc_label">CVC</span>
      </label>
      <div className="date_cvc_inputs">
        {/* Month */}
        <input
          className="date_input"
          name="date"
          type="number"
          placeholder="MM"
          value={dateMM}
          onChange={(e) =>
            setDateMM(Math.max(1, Math.min(12, parseInt(e.target.value, 10))))
          }
        ></input>

        {/* Year */}
        <input
          className="date_input"
          name="date"
          type="number"
          placeholder="YY"
          value={dateYY}
          onChange={(e) => {
            setDateYY(
              Math.max(0, parseInt(e.target.value, 10)).toString().slice(0, 2),
            );
          }}
        ></input>

        {/* CVC */}
        <input
          className="cvc_input"
          htmlFor="cvc"
          type="number"
          placeholder="e.g. 123"
          value={cvcValue}
          onChange={(e) =>
            setCVCValue(
              Math.max(0, parseInt(e.target.value, 10)).toString().slice(0, 3),
            )
          }
        ></input>
      </div>

      {/* Error Messages */}
      <div className="errorDiv">
        {blankDateError && <p className="error error_date">Can't be blank</p>}
        {cvcError && <p className="error error_cvc">Can't be blank</p>}
      </div>
      {currentDateError && !blankDateError && (
        <p className="error">MM/YY should be a future date.</p>
      )}

      {/* Submit Button */}
      <button onClick={handleButtonClick}>Confirm</button>
    </form>
  );
}
