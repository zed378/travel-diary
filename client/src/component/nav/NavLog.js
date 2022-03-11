// import package
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

// import component
import DropMenu from "../card/DropMenu";

// import assets
import logo1 from "../../assets/img/logo1.svg";
import cssModules from "../../assets/css/NavLog.module.css";

// import config
import { UserContext } from "../../context/UserContext";
import { API } from "../../config/api";

function NavLog() {
  const [state] = useContext(UserContext);
  const [user, setUser] = useState([]);
  const [dropModal, setDropModal] = useState(false);

  let navigate = useNavigate();

  const getUser = async () => {
    try {
      const response = await API.get(`/user/${state.user.id}`);
      setUser(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {dropModal ? <DropMenu close={() => setDropModal(false)} /> : <></>}

      <div className={cssModules.navWrapper}>
        <img src={logo1} alt="Logo" onClick={() => navigate("/")} />
        <div
          className={cssModules.profileWrapper}
          onClick={() => setDropModal(true)}
        >
          <img src={user.photo} alt="Profile" />
        </div>
      </div>
    </>
  );
}

export default NavLog;
