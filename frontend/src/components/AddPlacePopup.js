import PopupWithForm from "./PopupWithForm";
import { useEffect } from "react";
import useForm from "../utils/useForm.js";


function AddPlacePopup({ isOpen, onClose, onAddPlace, onLoading }) {
  const { values, handleChange, setValues } = useForm({});

  function handleSubmit(event) {
    event.preventDefault();
    onAddPlace({
      name: values.title,
      link: values.link,
    });
  }

  useEffect(() => {
    setValues({
      title: (''),
      link: ('')
    })
  }, [isOpen]);

  return (
    <PopupWithForm
      name="item"
      title="Новое место"
      confirmation="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={onLoading ? 'Создание...' : 'Создать'}
    >
      <input
        className="popup__field popup__field_type_title"
        value={values.title || ''}
        onChange={handleChange}
        type="text"
        placeholder="Название"
        name="title"
        id="type-title"
        minLength={2}
        maxLength={30}
        required
      />
      <span className="type-title-error popup__error" />
      <input
        className="popup__field popup__field_type_link"
        value={values.link || ''}
        onChange={handleChange}
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        id="type-link"
        required
      />
      <span className="type-link-error popup__error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;