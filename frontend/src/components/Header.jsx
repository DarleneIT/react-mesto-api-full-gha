import logoMesto from "../images/logo.svg";
import { Routes, Route, Link } from "react-router-dom";

function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <img className="header__logo" src={logoMesto} alt="Логотип сайта" />

      <Routes>
        <Route
          path="/signin"
          element={
            <Link to="/signup" className="header__into">
              Регистрация
            </Link>
          }
        />

        <Route
          path="/signup"
          element={
            <Link to="/signin" className="header__into">
              Войти
            </Link>
          }
        />

        <Route
          path="/"
          element={
            <nav>
              <span className="header__email">{email}</span>
              <button
                className="header__out"
                onClick={onSignOut}
                type="button"
              >
                Выйти
              </button>
            </nav>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;