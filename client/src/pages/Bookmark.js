// import package
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

// import component
import BookmarkCard from "../component/card/BookmarkCard";
import { UserContext } from "../context/UserContext";

// import assets
import cssModules from "../assets/css/Bookmark.module.css";

import { API } from "../config/api";

function Bookmark() {
  const [state] = useContext(UserContext);

  const [marked, setMarked] = useState([]);
  const getMarked = async () => {
    try {
      const response = await API.get(`/marks/${state.user.id}`);

      setMarked(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMarked();
  }, []);

  return (
    <div className={cssModules.bookmarkContainer}>
      <h1>Bookmark</h1>

      <div className={cssModules.cardContainer}>
        {/* card */}
        {marked?.map((item, index) => (
          <BookmarkCard item={item} key={index} press={getMarked} />
        ))}
        {/* end of card */}
      </div>
    </div>
  );
}

export default Bookmark;
