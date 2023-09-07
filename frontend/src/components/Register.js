import { Link } from "react-router-dom";
import useForm from "../utils/useForm.js";

function Register({ onRegister }) {
  const { values, handleChange } = useForm({ email: "", password: "" });

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values);
  }

  return (
    <section className="auth">
      <div className="auth__container">
        <h3 className="auth__title">Регистрация</h3>
        <form
         onSubmit={handleSubmit}
         className="auth__form"
         name="auth-login"
        >
          <input
            onChange={handleChange}
            value={values.email || ""}
            className="auth__field"
            type="email"
            name="email"
            placeholder="Email"
            minLength={5}
            maxLength={40}
            autoComplete="off"
          />

          <input
            onChange={handleChange}
            value={values.password || ""}
            className="auth__field"
            type="password"
            name="password"
            placeholder="Пароль"
            minLength={8}
            maxLength={15}
          />

          <button
            className="auth__submit"
            type="submit"
          >
            Зарегистрироваться
          </button>
          </form>

          <div className="auth__entry">
            <Link to="/sign-in" className="auth__link" style={{ textDecoration: "none", color: "white" }}>
              Уже зарегистрированы? Войти
            </Link>
          </div>
       
      </div>
    </section>
  );
}

export default Register;