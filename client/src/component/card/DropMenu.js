// import package
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

// import assets
import user from "../../assets/img/user.svg";
import logout from "../../assets/img/logout.svg";
import triangle from "../../assets/img/triangle.svg";
import cssModules from "../../assets/css/DropMenu.module.css";
import { UserContext } from "../../context/UserContext";

function DropMenu(props) {
  const { close } = props;

  const [state, dispatch] = useContext(UserContext);

  let navigate = useNavigate();

  const LogOut = () => {
    navigate("/");
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <>
      <div className={cssModules.dropWrapper} onClick={close}></div>
      <div className={cssModules.dropdown}>
        <img src={triangle} alt="triangle" className={cssModules.triangle} />
        <div
          className={cssModules.menuOption}
          onClick={() => navigate("/profile")}
        >
          <img src={user} alt="User" />
          <p>Profile</p>
        </div>
        <hr />
        <div className={cssModules.menuOption} onClick={LogOut}>
          <img src={logout} alt="Log Out" />
          <p>Log Out</p>
        </div>
      </div>
    </>
  );
}

export default DropMenu;
