// import package
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dateFormat, { masks } from "dateformat";
import DOMPurify from "dompurify";

// import assets
import love from "../assets/img/love.svg";
import comment from "../assets/img/comment.svg";
import dots from "../assets/img/dots.svg";
import edit from "../assets/img/editg.svg";
import trash from "../assets/img/trash.svg";
import cssModules from "../assets/css/DetailDiary.module.css";

// import config
import { API } from "../config/api";
import { UserContext } from "../context/UserContext";
const path = "http://localhost:5000/uploads/profile/";

function DetailDiary() {
  let navigate = useNavigate();
  const [state] = useContext(UserContext);

  const { id } = useParams();
  const [diary, setDiary] = useState([]);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);

  const [form, setForm] = useState({
    comment: "",
  });

  const getDiary = async () => {
    try {
      const response = await API.get(`/post/${id}`);

      setDiary({
        id: response.data.data.id,
        userId: response.data.data.userId,
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

  const getLikes = async () => {
    try {
      const response = await API.get(`/get-like/${id}`);

      setLikes(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getComments = async () => {
    try {
      const response = await API.get(`/comments/${id}`);

      setComments(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(form);

      await API.post(`/comment/${state.user.id}/${diary.id}`, body, config);

      getComments();
      setForm({ comment: "" });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDiary();
    getLikes();
    getComments();
  }, []);

  return (
    <>
      <div className={cssModules.diaryContainer}>
        <button className={cssModules.backBtn} onClick={() => navigate("/")}>
          {" "}
          &larr; Back
        </button>

        <h1>{diary.title}</h1>
        <div className={cssModules.info}>
          <p className={cssModules.infoDate}>
            {" "}
            {dateFormat(diary.createdAt, "dddd, d mmmm, yyyy")}
          </p>
          <p className={cssModules.infoUser}>{diary.name}</p>
        </div>

        <div className={cssModules.sumAll}>
          <img src={love} alt={love} />
          <p>{likes.length} Likes</p>
          <img src={comment} alt={comment} />
          <p>{comments.length} Comments</p>
        </div>

        <div className={cssModules.imgContainer}>
          <img src={diary.thumbnail} alt="Thumbnail" />
        </div>
        <div
          className={cssModules.contentText}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(diary.content),
          }}
        ></div>
        <button className={cssModules.backBtn} onClick={() => navigate("/")}>
          {" "}
          &larr; Back
        </button>
      </div>

      <div className={cssModules.commentSection}>
        <h1>All Comments</h1>
        <form onSubmit={handleSubmit} className={cssModules.commentPost}>
          <textarea
            name="comment"
            placeholder="Tell me your feeling about my diary"
            onChange={handleChange}
            value={form.comment}
          ></textarea>
          <button type="submit">Post Comment</button>
        </form>

        <div className={cssModules.commentContainer}>
          {comments.map((item) => (
            <div className={cssModules.commentData}>
              <div className={cssModules.commentUserPic}>
                <img src={path + item.user.photo} alt={item.user.photo} />
              </div>

              <div className={cssModules.commentUserInfo}>
                <h4>
                  {item.user.name} <img src={dots} alt={dots} />
                </h4>
                <h6>
                  {dateFormat(item.createdAt, "dddd, d mmmm, yyyy, HH:MM")} WIB
                </h6>
                <p>{item.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default DetailDiary;
