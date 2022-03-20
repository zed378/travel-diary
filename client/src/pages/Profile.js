// import package
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

// import component
import { UserContext } from "../context/UserContext";
import DiaryCard from "../component/card/DiaryCard";

// import assets
import nodiary from "../assets/img/nodiary.svg";
import edit from "../assets/img/edits.svg";
import cssModules from "../assets/css/Profile.module.css";

// import config
import { API } from "../config/api";

function Profile() {
  const [state] = useContext(UserContext);
  let navigate = useNavigate();

  const [user, setUser] = useState([]);
  const [diaries, setDiaries] = useState([]);

  const getUser = async () => {
    try {
      const response = await API.get(`/user/${state.user.id}`);

      setUser(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDiaries = async () => {
    try {
      const response = await API.get(`/userpost/${state.user.id}`);

      setDiaries(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    getDiaries();
  }, []);

  return (
    <div className={cssModules.profileContainer}>
      <h1>Profile</h1>

      <div className={cssModules.imgContainer}>
        <div className={cssModules.imgWrapper}>
          <img src={user.photo} alt="Profile" />
          <div
            className={cssModules.editBtn}
            onClick={() => navigate(`/profile-pic-edit/${user.id}`)}
          >
            <img src={edit} alt="Edit" />
            <p>Change Pic</p>
          </div>
        </div>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <button onClick={() => navigate(`/profile-info-edit/${user.id}`)}>
          Edit
        </button>
      </div>

      <h2>My Journey</h2>
      <div className={cssModules.cardContainer}>
        {/* card */}
        {diaries.length === 0 ? (
          <div className={cssModules.nodiary}>
            <h1>No Diary Found</h1>
            <img src={nodiary} alt={nodiary} />
          </div>
        ) : (
          <>
            {diaries?.map((item, index) => (
              <DiaryCard item={item} key={index} press={getDiaries} />
            ))}
          </>
        )}
        {/* end of card */}
      </div>
    </div>
  );
}

export default Profile;
