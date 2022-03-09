// import package
import { useContext, useState } from "react";

// import assets
import cssModules from "../../assets/css/Login.module.css";
import { UserContext } from "../../context/UserContext";

// import config
import { API } from "../../config/api";

function Login(props) {
  const { close, regCard } = props;

  // alert
  const [failed, setFailed] = useState(false);
  const [registered, setRegistered] = useState(false);

  // store data
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [state, dispatch] = useContext(UserContext);

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(form);

      const response = await API.post("/login", body, config);

      console.log(response);

      if (response.data.status === "404") {
        setRegistered(true);
        setTimeout(() => {
          setRegistered(false);
        }, 4000);
      } else if (response.data.status === "Success") {
        dispatch({
          type: "LOGIN",
          payload: response.data.data,
        });
      }
    } catch (error) {
      setFailed(true);
      setTimeout(() => {
        setFailed(false);
      }, 4000);
    }
  };

  return (
    <>
      <div className={cssModules.clickArea} onClick={close}></div>
      <div className={cssModules.loginCard} id="card">
        <h1>Login</h1>

        {failed ? (
          <h3
            style={{
              color: "red",
              background: "#e0cecc",
              textAlign: "center",
              padding: "0.5rem 0",
              fontSize: "1rem",
              fontFamily: "avenirs",
            }}
          >
            Password or Email doesn't match
          </h3>
        ) : (
          <></>
        )}

        {registered ? (
          <h3
            style={{
              color: "red",
              background: "#e0cecc",
              textAlign: "center",
              padding: "0.5rem 0",
              fontSize: "1rem",
              fontFamily: "avenirs",
            }}
          >
            You're not registered
          </h3>
        ) : (
          <></>
        )}

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p onClick={regCard}>
          Don't have an account? Click <strong>Here</strong>
        </p>
      </div>
    </>
  );
}

export default Login;
