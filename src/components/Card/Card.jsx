import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function Card({ card, onCardLike, onCardDelete, onCardClick }) {
  const { currentUser } = useContext(CurrentUserContext);

  const ownerId = typeof card.owner === "object" ? card.owner._id : card.owner;
  const isOwn = ownerId === currentUser._id;
  const isLiked =
    card.isLiked === true ||
    (Array.isArray(card.likes) &&
      card.likes.some((u) => {
        const uid = typeof u === "object" ? u._id : u;
        return uid === currentUser._id;
      }));

  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_is-active" : ""
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="gallery__container">
      <img
        className="gallery__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      {isOwn && (
        <button className="trash-button" onClick={handleDeleteClick}>
          <svg
            className="trash-icon"
            width="18"
            height="20"
            viewBox="0 0 18 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.45787 18.1422C2.51882 18.8126 3.06735 19.3002 3.73778 19.3002H14.2615C14.9319 19.3002 15.4804 18.7923 15.5414 18.1422L16.7197 5.79004H1.27954L2.45787 18.1422Z"
              fill="white"
            />
            <path
              d="M16.7201 1.93002H11.5801V1.27991C11.5801 0.568849 11.0113 0 10.3002 0H7.72009C7.00903 0 6.44018 0.568849 6.44018 1.27991V1.93002H1.27991C0.568849 1.93002 0 2.49887 0 3.20993C0 3.92099 0.568849 4.48984 1.27991 4.48984H16.7201C17.4312 4.48984 18 3.92099 18 3.20993C18 2.49887 17.4312 1.93002 16.7201 1.93002Z"
              fill="white"
            />
          </svg>
        </button>
      )}
      <div className="gallery__info">
        <h3 className="gallery__place-name">{card.name}</h3>
        <button className={cardLikeButtonClassName} onClick={handleLikeClick}>
          <svg
            className="heart-icon"
            width="21"
            height="19"
            viewBox="0 0 21 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.5 18.5L9.57945 17.618C4.50742 12.7214 1 9.3879 1 5.375C1 2.96699 2.96699 1 5.375 1C7.03901 1 8.63412 1.83855 9.57945 3.01891L10.5 4.16892L11.4205 3.01891C12.3659 1.83855 13.961 1 15.625 1C18.033 1 20 2.96699 20 5.375C20 9.3879 16.4926 12.7214 11.4205 17.618L10.5 18.5Z"
              stroke="black"
              strokeWidth="2"
            />
          </svg>
          <span className="card__like-count">
            {card.likes ? card.likes.length : 0}
          </span>
        </button>
      </div>
    </div>
  );
}

export default Card;
