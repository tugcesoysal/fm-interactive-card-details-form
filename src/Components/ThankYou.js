export default function ThankYou() {
  return (
    <div className="submitPage">
      <img
        src="/images/icon-complete.svg"
        alt="completed icon"
        width={80}
      ></img>
      <h1 className="thankyou_header">Thank You!</h1>
      <p className="thankyou_parag">We've added your card details</p>
      <button className="continueButton">Continue</button>
    </div>
  );
}
