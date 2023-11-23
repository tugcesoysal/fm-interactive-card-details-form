import { useState } from "react";

export default function Card({
  cardNumberValue,
  dateMM,
  dateYY,
  cvcValue,
  nameValue,
}) {
  const handleName = (value) => {
    if (value) {
      return value;
    }
    return "Tugce Soysal";
  };

  const handleCardNumber = (value) => {
    if (value) {
      return value;
    }
    return "0000 0000 0000 0000";
  };

  const handleDate = (mm, yy) => {
    if (mm && yy) {
      return `${mm}/${yy}`;
    }
    return "00/00";
  };

  const handleCVC = (value) => {
    if (value) {
      return value;
    }
    return "000";
  };

  return (
    <div className="card_section">
      <div className="card_front">
        <img
          alt="card-logo"
          className="card__logo"
          src="/images/card-logo.svg"
        ></img>
        <p className="card__number">{handleCardNumber(cardNumberValue)}</p>
        <p className="card__name">{handleName(nameValue)}</p>
        <p className="card__date">{handleDate(dateMM, dateYY)}</p>
      </div>
      <div className="card_back">
        <p className="card__cvc">{handleCVC(cvcValue)}</p>
      </div>
    </div>
  );
}
