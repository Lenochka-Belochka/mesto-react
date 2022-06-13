import React from "react";
import logo from "../../src/images/header/logo.svg";
import avatar from "../../src/images/profile/Avatar.png";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  // переменная состояния (большая картинка)
  const [selectedCard, setSelectedCard] = React.useState({});

  // нажатие на карточку
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  //видимость попапов
  const [popups, setPopups] = React.useState({
    isEditProfilePopupOpen: false,
    isAddPlacePopupOpen: false,
    isEditAvatarPopupOpen: false,
  });

  // нажатие на кнопки
  function handleEditAvatarClick(evt) {
    setPopups({
      ...popups, 
      isEditAvatarPopupOpen: true, 
    });
  }

  function handleEditProfileClick(evt) {
    setPopups({
      ...popups, 
      isEditProfilePopupOpen: true, 
    });
  }

  function handleAddPlaceClick(evt) {
    setPopups({
      ...popups, 
      isAddPlacePopupOpen: true, 
    });
  }

  // закрытие попапов
  function closeAllPopups(evt) {
    setPopups({
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
    });

    setSelectedCard({});
  }

  return (
    <div className="page">
      <Header logo={logo} />

      <Main
        avatar={avatar}
        name="Жак-Ив Кусто"
        about="Исследователь океана"
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />

      <Footer />

      {/* popups */}
      <PopupWithForm
        name="edit-profile"
        title="Редактировать профиль"
        buttonSubmitText="Cохранить"
        isOpen={popups.isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <fieldset className="form__fieldset">
          <input
            className="form__input form__input_type_name"
            type="text"
            id="profileName"
            name="name"
            aria-label="имя"
            placeholder="Имя"
            required
            minLength="2"
            maxLength="40"
          />
          <span className="popup__error profileName-error"></span>
          <input
            className="form__input form__input_type_caption"
            type="text"
            id="profileCaption"
            name="about"
            aria-label="Подпись"
            placeholder="О себе"
            required
            minLength="2"
            maxLength="200"
          />
          <span className="popup__error profileCaption-error"></span>
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        name="add-place"
        title="Новое место"
        buttonSubmitText="Cоздать"
        isOpen={popups.isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <fieldset className="form__fieldset">
          <input
            className="form__input form__input_type_place"
            type="text"
            id="photoName"
            name="name"
            aria-label="имя"
            placeholder="Название"
            required
            minLength="2"
            maxLength="30"
          />
          <span className="popup__error photoName-error"></span>
          <input
            className="form__input form__input_type_link"
            type="url"
            id="photoLink"
            aria-label="ссылка"
            placeholder="Ссылка на картинку"
            name="link"
            required
          />
          <span className="popup__error photoLink-error"></span>
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        name="edit-avatar"
        title="Обновить аватар"
        buttonSubmitText="Cохранить"
        isOpen={popups.isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <fieldset className="form__fieldset">
          <input
            id="avatar-link-input"
            className="form__input form__input_field_link"
            value=""
            name="link"
            placeholder="Сcылка на аватар"
            type="url"
            required
          />
          <span className="popup__error avatar-link-input-error"></span>
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        name="confirm-delete"
        title="Вы уверены?"
        buttonSubmitText="Да"
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
