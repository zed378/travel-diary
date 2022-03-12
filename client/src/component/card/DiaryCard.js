// import package
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dateFormat, { masks } from "dateformat";
import DOMPurify from "dompurify";

// import assets
import bookmark from "../../assets/img/bookmark.svg";
import bookmarked from "../../assets/img/bookmarked.svg";
import edit from "../../assets/img/edit.svg";
import trash from "../../assets/img/trash.svg";
import cssModules from "../../assets/css/Home.module.css";
import { UserContext } from "../../context/UserContext";

// import config
import { API } from "../../config/api";

function DiaryCard({ item, press }) {
  let navigate = useNavigate();
  const logTrigger = () => {
    document.getElementById("loginbutton").click();
  };
  const [state] = useContext(UserContext);
  const [modal, setModal] = useState(null);

  const [marked, setMarked] = useState([]);

  const setMark = async (id) => {
    try {
      await API.get(`/mark/${id}`);

      getmark();
      press();
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

  const delModal = (id, name) => {
    const modal = (
      <div className={cssModules.delModal}>
        <div className={cssModules.modalCard}>
          <p>
            Are you sure to delete <strong>{name}</strong>?{" "}
          </p>
          <div className={cssModules.delModalBtn}>
            <button
              className={cssModules.delCancel}
              onClick={() => setModal(null)}
            >
              Cancel
            </button>
            <button className={cssModules.delYes} onClick={() => delPost(id)}>
              Delete
            </button>
          </div>
        </div>
      </div>
    );

    setModal(modal);
  };

  const delPost = async (id) => {
    try {
      await API.delete(`/post/${id}`);

      setModal(null);
      press();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getmark();
  }, []);

  return (
    <>
      {modal ? modal : <></>}

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
          {state.isLogin ? (
            <>
              {marked === null || marked.isMark === 0 ? (
                <img src={bookmark} alt="Bookmark" />
              ) : (
                <img src={bookmarked} alt="Bookmark" />
              )}
            </>
          ) : (
            <img src={bookmark} alt="Bookmark" />
          )}
        </div>

        {/* edit button */}
        {state.isLogin ? (
          <>
            {item.userId === state.user.id ? (
              <div className={cssModules.menuEdit}>
                <div
                  className={cssModules.menuImg}
                  onClick={() => navigate(`/write-edit/${item.id}`)}
                >
                  <img src={edit} alt="Edit" />
                </div>
                <div
                  className={cssModules.menuImg}
                  onClick={() => delModal(item.id, item.title)}
                >
                  <img src={trash} alt="Trash" />
                </div>
              </div>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}

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
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(item.content),
            }}
            className={cssModules.h4}
          ></div>
        </div>
      </div>
    </>
  );
}

export default DiaryCard;
