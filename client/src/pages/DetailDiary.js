// import package
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dateFormat, { masks } from "dateformat";
import DOMPurify from "dompurify";

// import assets
import cssModules from "../assets/css/DetailDiary.module.css";

// import config
import { API } from "../config/api";

function DetailDiary() {
  let navigate = useNavigate();
  const { id } = useParams();
  const [diary, setDiary] = useState([]);

  const getDiary = async () => {
    try {
      const response = await API.get(`/post/${id}`);

      // setDiary(response.data.data);
      setDiary({
        title: response.data.data.title,
        thumbnail: response.data.data.thumbnail,
        content: response.data.data.content,
        createdAt: response.data.data.createdAt,
        name: response.data.data.user.name,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDiary();
    console.log(diary);
  }, []);

  return (
    <div className={cssModules.diaryContainer}>
      <h1>{diary.title}</h1>
      <div className={cssModules.info}>
        <p className={cssModules.infoDate}>
          {" "}
          {dateFormat(diary.createdAt, "dddd, d mmmm, yyyy")}
        </p>
        <p className={cssModules.infoUser}>{diary.name}</p>
      </div>
      <div className={cssModules.imgContainer}>
        <img src={diary.thumbnail} alt="Thumbnail" />
      </div>
      <div
        className={cssModules.contentText}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(diary.content) }}
      ></div>
      <button className={cssModules.backBtn} onClick={() => navigate("/")}>
        {" "}
        &larr; Back
      </button>
    </div>
  );
}

export default DetailDiary;
