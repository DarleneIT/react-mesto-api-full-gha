import logoMesto from "../images/logo.svg";
import { Routes, Route, Link } from "react-router-dom";

function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <img className="header__logo" src={logoMesto} alt="Логотип сайта" />

      <Routes>
        <Route
          path="/sign-in"
          element={
            <Link to="/sign-up" className="header__into">
              Регистрация
            </Link>
          }
        />

        <Route
          path="/sign-up"
          element={
            <Link to="/sign-in" className="header__into">
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