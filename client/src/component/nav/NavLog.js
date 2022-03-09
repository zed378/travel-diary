// import package
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import component

// import assets
import logo1 from "../../assets/img/logo1.svg";
import profile from "../../assets/img/profile.jpg";
import cssModules from "../../assets/css/NavLog.module.css";

function NavLog() {
  let navigate = useNavigate();
  return (
    <div className={cssModules.navWrapper}>
      <img src={logo1} alt="Logo" onClick={() => navigate("/")} />
      <div className={cssModules.profileWrapper}>
        <img src={profile} alt="Profile" />
      </div>
    </div>
  );
}

export default NavLog;
