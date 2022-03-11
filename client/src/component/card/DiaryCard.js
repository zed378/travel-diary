// import package
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dateFormat, { masks } from "dateformat";
import DOMPurify from "dompurify";

// import assets
import bookmark from "../../assets/img/bookmark.svg";
import bookmarked from "../../assets/img/bookmarked.svg";
import cssModules from "../../assets/css/Home.module.css";
import { UserContext } from "../../context/UserContext";

// import config
import { API } from "../../config/api";

function DiaryCard({ item, click }) {
  let navigate = useNavigate();
  const logTrigger = () => {
    document.getElementById("loginbutton").click();
  };
  const [state] = useContext(UserContext);

  const [marked, setMarked] = useState([]);

  const setMark = async (id) => {
    try {
      await API.get(`/mark/${id}`);

      getmark();
      click();
    } catch (error) {
      console.log(error);
    }
  };

  const getmark = async () => {
    try {
      const response = await API.get(`/getmark/${state.user.id}/${item.id}`);

      setMarked(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getmark();
  }, []);

  return (
    <div className={cssModules.cardContent}>
      <div
        className={cssModules.bookmark}
        onClick={() => {
          if (state.isLogin) {
            setMark(item.id);
          } else {
            logTrigger();
          }
        }}
      >
        {marked === null || marked.isMark === 0 ? (
          <img src={bookmark} alt="Bookmark" />
        ) : marked !== null || marked.isMark === 1 ? (
          <img src={bookmarked} alt="Bookmark" />
        ) : (
          <img src={bookmark} alt="Bookmark" />
        )}
      </div>

      <div
        className={cssModules.thumbnail}
        onClick={() => navigate(`/detail-diary/${item.id}`)}
      >
        <img src={item.thumbnail} alt="Preview" />
      </div>

      <div
        className={cssModules.cardDesc}
        onClick={() => navigate(`/detail-diary/${item.id}`)}
      >
        <h2>{item.title}</h2>
        <p>
          {dateFormat(item.createdAt, "dddd, d mmmm, yyyy")}, {item.user.name}
        </p>

        <div
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.content) }}
          className={cssModules.h4}
        ></div>
      </div>
    </div>
  );
}

export default DiaryCard;
