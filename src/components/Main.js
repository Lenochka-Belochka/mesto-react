import React from "react";
import { api } from "../../src/utils/Api";
import Card from "./Card";

function Main(props) {
  // стейт данных о пользователе
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");

  // стейт данных о карточках
  const [cards, setCards] = React.useState([]);

  // запрос в API за пользовательскими данными
  React.useEffect(() => {
    const promiseUser = api.getUserProfile();
    const promiseCards = api.getInitialCards();

    Promise.all([promiseUser, promiseCards])
      .then(([userData, cards]) => {
        // меняем состояние профиля пользователя
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        // карточки загружаем
        setCards(cards);
      })
      .catch((err) => {
        console.log(
          `Ошибка при запросе данных пользователя и карточек: ${err}!`
        );
      });
  }, []);

  return (
    <>
      {}
      <section className="profile">
        <div className="profile__avatar">
          <button
            className="profile__edit-avatar-button"
            type="button"
            aria-label="edit button"
            onClick={props.onEditAvatar}
          >
            <img className="profile__image" src={userAvatar} alt="Аватар" />
          </button>
        </div>
        <div className="profile__description">
          <h1 className="profile__name">{userName}</h1>
          <button
            className="profile__button profile__button_fact_edit"
            type="button"
            aria-label="Edit button"
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__caption">{userDescription}</p>
        </div>
        <button
          className="profile__button profile__button_fact_add"
          type="button"
          aria-label="Add button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      {}
      <section className="photo-grid">
        <ul className="photo-grid__list">
          {cards.map((item) => (
            <Card key={item._id} card={item} onCardClick={props.onCardClick} />
          ))}
        </ul>
      </section>
    </>
  );
}

export default Main;
