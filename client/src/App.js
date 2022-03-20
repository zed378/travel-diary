// import package
import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import assets
import "./assets/css/App.css";

// import component
import Nav from "./component/nav/Nav";
import NavLog from "./component/nav/NavLog";

// import pages
import {
  Home,
  Profile,
  EditProfilePic,
  EditProfileInfo,
  Bookmark,
  DetailDiary,
  AddDiary,
  EditDiaryPic,
  EditDiary,
} from "./pages/";
import PrivateRoute from "./context/PrivateRoute";

// import config
import { UserContext } from "./context/UserContext";
import { API, setAuthToken } from "./config/api";

// init token on axios every time the app is refreshed
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const [state, dispatch] = useContext(UserContext);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      if (response.status === 404) {
        return dispatch({
          type: "ERROR",
        });
      }

      let payload = response.data.data.user;
      payload.token = localStorage.token;

      if (response.data.status === "Success") {
        dispatch({
          type: "SUCCESS",
          payload,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <Router>
      {state.isLogin ? <NavLog /> : <Nav />}

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/detail-diary/:id" element={<DetailDiary />} />
        <Route
          exact
          path="/profile-pic-edit/:id"
          element={<EditProfilePic />}
        />
        <Route
          exact
          path="/profile-info-edit/:id"
          element={<EditProfileInfo />}
        />
        <Route exact path="/" element={<PrivateRoute />}>
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/bookmark" element={<Bookmark />} />
          <Route exact path="/write" element={<AddDiary />} />
          <Route exact path="/write-edit/:idPost" element={<EditDiary />} />
          <Route
            exact
            path="/write-pic-edit/:idPost"
            element={<EditDiaryPic />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
