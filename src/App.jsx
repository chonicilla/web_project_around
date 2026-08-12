import { useEffect, useState } from "react";
import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx";
import Footer from "./components/Footer/Footer.jsx";
import EditProfile from "./components/EditProfile/EditProfile.jsx";
import EditAvatar from "./components/EditAvatar/EditAvatar.jsx";
import AddPlace from "./components/AddPlace/AddPlace.jsx";
import PopupWithConfirmation from "./components/PopupWithConfirmation/PopupWithConfirmation.jsx";
import api from "./utils/api.js";
import CurrentUserContext from "./contexts/CurrentUserContext.js";

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
    _id: "",
  });

  const [cards, setCards] = useState([]);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] =
    useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);

  const [isLoadingEditProfile, setIsLoadingEditProfile] = useState(false);
  const [isLoadingEditAvatar, setIsLoadingEditAvatar] = useState(false);
  const [isLoadingAddPlace, setIsLoadingAddPlace] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  useEffect(() => {
    (async () => {
      await api.getUserInfo().then((data) => {
        setCurrentUser(data);
      });
    })();

    (async () => {
      await api.getCardList().then((data) => {
        setCards(data);
      });
    })();
  }, []);

  const handleUpdateUser = (data, onSuccess) => {
    setIsLoadingEditProfile(true);
    (async () => {
      await api
        .setUserInfo(data)
        .then((newData) => {
          setCurrentUser(newData);
          handleClosePopup();
          if (onSuccess) onSuccess();
        })
        .catch((error) => console.error(error))
        .finally(() => setIsLoadingEditProfile(false));
    })();
  };

  const handleUpdateAvatar = (data, onSuccess) => {
    setIsLoadingEditAvatar(true);
    (async () => {
      await api
        .setUserAvatar(data.avatar)
        .then((newData) => {
          setCurrentUser(newData);
          handleClosePopup();
          if (onSuccess) onSuccess();
        })
        .catch((error) => console.error(error))
        .finally(() => setIsLoadingEditAvatar(false));
    })();
  };

  async function handleCardLike(card) {
    const isLiked = card.isLiked;

    await api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard,
          ),
        );
      })
      .catch((error) => console.error(error));
  }

  const handleCardDeleteClick = (card) => {
    setCardToDelete(card);
    setIsDeleteConfirmPopupOpen(true);
  };

  async function handleConfirmDeleteCard() {
    if (!cardToDelete) return;
    setIsLoadingDelete(true);
    await api
      .deleteCard(cardToDelete._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== cardToDelete._id),
        );
        handleClosePopup();
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoadingDelete(false));
  }

  const handleAddPlaceSubmit = (data, onSuccess) => {
    setIsLoadingAddPlace(true);
    (async () => {
      await api
        .addCard(data)
        .then((newCard) => {
          setCards([newCard, ...cards]);
          handleClosePopup();
          if (onSuccess) onSuccess();
        })
        .catch((error) => console.error(error))
        .finally(() => setIsLoadingAddPlace(false));
    })();
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleClosePopup = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeleteConfirmPopupOpen(false);
    setSelectedCard(null);
    setCardToDelete(null);
  };

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
    >
      <div className="page__content">
        <Header />
        <Main
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDeleteClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          selectedCard={selectedCard}
          onClosePopup={handleClosePopup}
          isEditProfilePopupOpen={isEditProfilePopupOpen}
          isAddPlacePopupOpen={isAddPlacePopupOpen}
          isEditAvatarPopupOpen={isEditAvatarPopupOpen}
          isDeleteConfirmPopupOpen={isDeleteConfirmPopupOpen}
          onAddPlaceSubmit={handleAddPlaceSubmit}
          isLoadingEditProfile={isLoadingEditProfile}
          isLoadingEditAvatar={isLoadingEditAvatar}
          isLoadingAddPlace={isLoadingAddPlace}
          isLoadingDelete={isLoadingDelete}
          onConfirmDeleteCard={handleConfirmDeleteCard}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
