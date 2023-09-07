import "../index.css";

import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";

import PopupWithForm from "./PopupWithForm.jsx";
import ImagePopup from "./ImagePopup.jsx";

import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

import Login from "./Login.js";
import Register from "./Register.js";

import ProtectedRoute from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip.js";

import CurrentUserContext from "../contexts/CurrentUserContext.js";

import { api } from "../utils/api.js";
import { auth } from "../utils/auth.js";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSuccessInfoTooltipStatus, setIsSuccessInfoTooltipStatus] = useState(false);
  const [email, setEmail] = useState(" ");

  const navigate = useNavigate();

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function openInfoTooltip() {
    setIsInfoTooltipOpen(true);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipOpen(false);
  }

 useEffect(() => {
  if (isLoggedIn) {
    Promise.all([api.getUserInfo(), api.getItems()])
    .then(([currentUser, initialCards]) => {
      setCurrentUser(currentUser);
      setCards(initialCards);
    })
    .catch((error) => {
      console.log(`Не удалось получить данные ${error}`);
    });
  }
}, [isLoggedIn]);

useEffect(() => {
  handleTokenCheck();
}, []);

useEffect(()=> {
  if (isLoggedIn) {
    navigate("/")
  }
},[isLoggedIn, navigate]);

function handleSubmit(request) {
  setIsLoading(true);
  request()
    .then(closeAllPopups)
    .catch(console.error)
    .finally(() => setIsLoading(false));
}

function handleUpdateUser(data) {
  function makeRequest() {
    return api
      .setUserInfo({ name: data.name, about: data.about })
      .then(setCurrentUser);
  }
  handleSubmit(makeRequest);
}

function handleUpdateAvatar(data) {
  function makeRequest() {
    return api
      .setAvatar(data)
      .then(setCurrentUser);
  }
  handleSubmit(makeRequest);
}

function handleAddPlaceSubmit(data) {
  function makeRequest() {
    return api
      .addCard(data)
      .then((newCard) => {
      setCards([newCard, ...cards]);
    });
  }
  handleSubmit(makeRequest);
}

function handleCardLike(card) {
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  api
    .changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) =>
        state.map((c) => (c._id === card._id ? newCard : c))
      );
    })
    .catch((error) => console.log(`Возникла ошибка ${error}`));
}

function handleCardDelete(card) {
  api
    .deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    })
    .catch((error) => console.log(`Не удалось удалить карточку ${error}`));
}

function handleRegister(data) {
  return auth
    .register(data)
    .then((res) => {
      setIsSuccessInfoTooltipStatus(true);
      openInfoTooltip();
      navigate("/sign-in");
    })
    .catch((err) => {
      console.log(err);
      setIsSuccessInfoTooltipStatus(false);
      openInfoTooltip();
    })
}

function handleLogin(data) {
  return auth
    .login(data)
    .then((res) => {
      localStorage.setItem("jwt", res.token);
      setEmail(data.email)
      setIsLoggedIn(true);
      navigate("/");
    })
    .catch((err) => {
      console.log(err);
      setIsSuccessInfoTooltipStatus(false);
      openInfoTooltip();
    });
}

function handleTokenCheck() {
  const jwt = localStorage.getItem("jwt");
  if (!jwt) {
    return;
  }
  auth
    .checkToken(jwt)
    .then((res) => {
      setEmail(res.data.email);
      setIsLoggedIn(true);
      navigate("/")
    })
    .catch((err) => {
      console.log(err)
    })
}

function handleSignOut() {
  localStorage.removeItem("jwt");
  setIsLoggedIn(false);
  navigate("/sign-in");
}

const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard.link;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header loggedIn={isLoggedIn} email={email} onSignOut={handleSignOut}/>

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
                loggedIn={isLoggedIn}
              />
            }
          />

          <Route
            path="/sign-in"
            element={<Login onLogin={handleLogin} navigate={navigate} />}
          />

          <Route
            path="/sign-up"
            element={
              <Register onRegister={handleRegister} navigate={navigate} />
            }
          />

          <Route
            path="*"
            element={
              isLoggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
            }
          />
        </Routes>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onLoading={isLoading}
        />

        <PopupWithForm
          name="confirm"
          title="Вы уверены?"
          confirmation="Да"
          onClose={closeAllPopups}
          onLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onLoading={isLoading}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            isConfirmStatus={isSuccessInfoTooltipStatus}
          />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;