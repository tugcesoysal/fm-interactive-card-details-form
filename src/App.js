import "./App.css";
import { useState } from "react";
import Card from "./Components/Card";
import Form from "./Components/Form";
import ThankYou from "./Components/ThankYou";

function App() {
  const [cardNumberValue, setCardNumberValue] = useState("");
  const [dateMM, setDateMM] = useState("");
  const [dateYY, setDateYY] = useState("");
  const [cvcValue, setCVCValue] = useState("");
  const [nameValue, setNameValue] = useState("");

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleFormSubmit = () => {
    setIsFormSubmitted(true);
  };

  return (
    <>
      <Card
        cardNumberValue={cardNumberValue}
        dateMM={dateMM}
        dateYY={dateYY}
        cvcValue={cvcValue}
        nameValue={nameValue}
      />
      {isFormSubmitted ? (
        <ThankYou />
      ) : (
        <Form
          onSubmit={handleFormSubmit}
          cardNumberValue={cardNumberValue}
          setCardNumberValue={setCardNumberValue}
          dateMM={dateMM}
          setDateMM={setDateMM}
          dateYY={dateYY}
          setDateYY={setDateYY}
          cvcValue={cvcValue}
          setCVCValue={setCVCValue}
          nameValue={nameValue}
          setNameValue={setNameValue}
        />
      )}
    </>
  );
}

export default App;
