import useForm from "../utils/useForm.js";

/** компонент авторизации */
function Login({ onLogin }) {
  const { values, handleChange } = useForm({ email: "", password: "" });

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values);
  }

  /** разметка jsx */
  return (
    <section className="auth">
      <div className="auth__container">
        <h3 className="auth__title">Вход</h3>
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
            minLength={2}
            maxLength={30}
          />

          <input
            onChange={handleChange}
            value={values.password || ""}
            className="auth__field"
            type="password"
            name="password"
            placeholder="Пароль"
            autoComplete="off"
          />

          <button 
            to="/sign-up" 
            className="auth__submit" 
            type="submit">
              Войти
          </button>
        </form>
        
      </div>
    </section>
  );
}

export default Login;