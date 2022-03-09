// import package

// import component
import DiaryCard from "../component/card/DiaryCard";

// import assets
import cssModules from "../assets/css/Bookmark.module.css";

function Bookmark() {
  return (
    <div className={cssModules.bookmarkContainer}>
      <h1>Bookmark</h1>

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

export default Bookmark;
