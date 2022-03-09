// import package
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

// import assets
import profile from "../../assets/img/profile.svg";
import write from "../../assets/img/write.svg";
import bookmark from "../../assets/img/bookmark.svg";
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
          <div className={cssModules.imgWrapper}>
            <img src={profile} alt="User" />
          </div>
          <p>Profile</p>
        </div>

        <div
          className={cssModules.menuOption}
          onClick={() => navigate("/write")}
        >
          <div className={cssModules.imgWrapper}>
            <img src={write} alt="Write" />
          </div>
          <p>New Journey</p>
        </div>

        <div
          className={cssModules.menuOption}
          onClick={() => navigate("/bookmark")}
        >
          <div className={cssModules.imgWrapper}>
            <img src={bookmark} alt="bookmark" />
          </div>
          <p>Bookmark</p>
        </div>

        <hr />

        <div className={cssModules.menuOption} onClick={LogOut}>
          <div className={cssModules.imgWrapper}>
            <img src={logout} alt="Log Out" />
          </div>
          <p>Log Out</p>
        </div>
      </div>
    </>
  );
}

export default DropMenu;
