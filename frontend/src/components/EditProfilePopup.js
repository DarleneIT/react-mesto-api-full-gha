import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { useContext, useState, useEffect } from 'react';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, onLoading }) {
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name); 
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function changeName(event) {
    setName(event.target.value);
  }

  function changeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  } 

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      name="profile-popup"
      title="Редактировать профиль"
      buttonText={onLoading ? 'Сохранение...' : 'Сохранить'}
    >
      <input
        onChange={changeName}
        value={`${name}`}
        className="popup__field popup__field_type_name"
        type="text"
        name="username"
        placeholder="Ваше имя"
        id="type-name"
        minLength={2}
        maxLength={40}
        autoComplete="off"
        required
      />
      <span className="type-name-error popup__error" />
      <input
        onChange={changeDescription}
        value={`${description}`}
        className="popup__field popup__field_type_job"
        type="text"
        placeholder="Ваше призвание"
        name="job"
        id="type-job"
        minLength={2}
        maxLength={200}
        autoComplete="off"
        required
      />
      <span className="type-job-error popup__error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;