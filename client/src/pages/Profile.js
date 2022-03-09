// import package

// import component
import DiaryCard from "../component/card/DiaryCard";

// import assets
import profile from "../assets/img/profile.jpg";
import cssModules from "../assets/css/Profile.module.css";

function Profile() {
  return (
    <div className={cssModules.profileContainer}>
      <h1>Profile</h1>

      <div className={cssModules.imgContainer}>
        <div className={cssModules.imgWrapper}>
          <img src={profile} alt="Profile" />
        </div>
        <h2>Zed Trueblood</h2>
        <p>zed@mail.com</p>
      </div>

      <h2>My Journey</h2>
      <div className={cssModules.cardContainer}>
        {/* card */}
        <DiaryCard />
        <DiaryCard />
        <DiaryCard />
        <DiaryCard />
        <DiaryCard />
        <DiaryCard />
        {/* end of card */}
      </div>
    </div>
  );
}

export default Profile;
