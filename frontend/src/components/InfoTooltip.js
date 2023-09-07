import yes from "../images/yes.svg";
import no from "../images/no.svg";

function InfoTooltip({ isOpen, onClose, isConfirmStatus }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close popup__close-button"
          type="button"
          onClick={onClose}
        />
        <img
          className="popup__status-picture"
          src={isConfirmStatus ? yes : no}
          alt={`Статус регистрации`}
        />
        <h3 className="popup__status-title">
          {isConfirmStatus
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте еще раз."}
        </h3>
      </div>
    </div>
  );
}

export default InfoTooltip;
