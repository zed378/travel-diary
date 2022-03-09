// import package
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import component
import DropMenu from "../card/DropMenu";

// import assets
import logo1 from "../../assets/img/logo1.svg";
import profile from "../../assets/img/profile.jpg";
import cssModules from "../../assets/css/NavLog.module.css";

function NavLog() {
  const [dropModal, setDropModal] = useState(false);

  let navigate = useNavigate();

  return (
    <>
      {dropModal ? <DropMenu close={() => setDropModal(false)} /> : <></>}

      <div className={cssModules.navWrapper}>
        <img src={logo1} alt="Logo" onClick={() => navigate("/")} />
        <div
          className={cssModules.profileWrapper}
          onClick={() => setDropModal(true)}
        >
          <img src={profile} alt="Profile" />
        </div>
      </div>
    </>
  );
}

export default NavLog;
