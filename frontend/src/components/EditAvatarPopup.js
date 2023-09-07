import PopupWithForm from "./PopupWithForm";
import { useContext, useEffect, useRef } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, onLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const avatarRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(() => {
    if (!isOpen) {
      avatarRef.current.value = currentUser.avatar;
    } else {
      avatarRef.current.value = "";
    }
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={onLoading ? 'Сохранение...' : 'Сохранить'}
    >
      <input
        ref={avatarRef}
        className="popup__field popup__field_type_link"
        type="url"
        placeholder="Ссылка на аватар"
        name="avatar"
        id="avatar-link"
        required
      />
      <span className="avatar-link-error popup__error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
