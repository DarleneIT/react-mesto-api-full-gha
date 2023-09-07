import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup image ${card.link ? "popup_opened" : ""}`}>
      <div className="image__container">
        <button
          className="image__close popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <img className="image__photo" alt={card.name} src={card.link} />
        <h3 className="image__title">{card.name}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;