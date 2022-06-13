import React from "react";

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <li className="element">
      <div className="element__picture">
        <button
          className="element__button_delete"
          type="button"
          aria-label="Trash button"
        ></button>
        <img
          src={props.card.link}
          alt={props.card.name}
          className="element__image"
          onClick={handleClick}
        />
      </div>
      <div className="element__item-description">
        <h2 className="element__item-title">{props.card.name}</h2>
        <div className="element__like-group">
          <button
            className="element__button"
            type="button"
            aria-label="Like button"
          ></button>
          <p className="element__likes-number">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
