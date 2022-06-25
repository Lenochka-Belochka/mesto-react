import React from "react";
import logo from "../../src/images/header/logo.svg";
import avatar from "../../src/images/profile/Avatar.png";
import { CurrentUserContext } from "../../src/contexts/CurrentUserContext";
import { api } from "../../src/utils/Api";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  // данные текущего пользователя
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    about: "",
    avatar: "",
    _id: "",
  });

  // запрос в API за профилем пользователя
  React.useEffect(() => {
    api
      .getUserProfile()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(`Ошибка запроса данных пользователя: ${err}!`);
      });
  }, []);

  // стейт данных о карточках
  const [cards, setCards] = React.useState([]);

  //  лайк
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    //запрос в API, получение обновлённых данных карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка обновления данных карточки: ${err}!`);
      });
  }

  // обработчик удаления карточки
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(`Ошибка удаления карточки: ${err}!`);
      });
  }

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(`Ошибка запроса карточек: ${err}!`);
      });
  }, []);

  // переменная состояния (большая картинка)
  const [selectedCard, setSelectedCard] = React.useState({});

  // нажатие на карточку
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  const [isEditProfilePopupOpen, setEditProfilePopupState] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] =
    React.useState(false);

  // нажатие на кнопки
  function handleEditAvatarClick() {
    setEditAvatarPopupState(true);
  }
  function handleEditProfileClick() {
    setEditProfilePopupState(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupState(true);
  }

  // закрытие попапов
  function closeAllPopups(evt) {
    setEditAvatarPopupState(false);
    setEditProfilePopupState(false);
    setAddPlacePopupState(false);
    setSelectedCard({});
  }

  // обработчик  профиля пользователя
  function handleUpdateUser(newProfile) {
    api
      .saveNewProfile(newProfile)
      .then((userData) => {
        setCurrentUser({
          ...currentUser,
          name: userData.name,
          about: userData.about,
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка сохранения данных пользователя: ${err}!`);
      });
  }

  // обработчик изменения аватара
  function handleUpdateAvatar(newAvatar) {
    api
      .updateAvatar(newAvatar)
      .then((userData) => {
        setCurrentUser({
          ...currentUser,
          avatar: userData.avatar,
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка сохранения аватара пользователя: ${err}!`);
      });
  }

  // обработчик добавления  карточки
  function handleAddPlaceSubmit(cardData) {
    api
      .addCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка сохранения новой карточки: ${err}!`);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />

        <Footer />

        {/* popups */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm
          name="confirm-delete"
          title="Вы уверены?"
          buttonSubmitText="Да"
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
