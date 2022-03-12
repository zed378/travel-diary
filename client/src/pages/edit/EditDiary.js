// import package
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";

// import component
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// import assets
import "../../assets/css/ckeditor.css";
import cssModules from "../../assets/css/AddDiary.module.css";

// import config
import { API } from "../../config/api";

function EditDiary() {
  const navigate = useNavigate();
  const pic = () => {
    document.getElementById("thumbnail").click();
  };

  const { idPost } = useParams();

  // alert
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  // store data
  const [form, setForm] = useState({
    title: "",
    content: "",
    thumbnail: "",
  });

  const [diary, setDiary] = useState([]);

  // get data from previous diary
  const getDiary = async () => {
    try {
      const response = await API.get(`/post/${idPost}`);

      setPreview(response.data.data.thumbnail);
      setForm({
        ...form,
        title: response.data.data.title,
        content: response.data.data.content,
      });

      setDiary({
        id: response.data.data.id,
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

  // set preview image
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Store form data as object
      const formData = new FormData();
      formData.set("title", form.title);
      formData.set("content", form.content);
      formData.set("thumbnail", form.thumbnail[0], form.thumbnail[0].name);

      const response = await API.patch(`/post/${diary.id}`, formData, config);

      if (response.data.status === "Success") {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate("/");
        }, 1500);
      } else if (response.data.status === "Failed") {
        setFail(true);
        setTimeout(() => {
          setFail(false);
        }, 3000);
      }
    } catch (error) {
      setFail(true);
      setTimeout(() => {
        setFail(false);
      }, 3000);
    }
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setForm({ ...form, content: data });
    console.log(form.content);
  };

  useEffect(() => {
    getDiary();
  }, []);

  return (
    <div className={cssModules.writeContainer}>
      <h1>New Journey</h1>
      <div className={cssModules.imgPreview}>
        <div className={cssModules.imgWrapper} onClick={pic}>
          {!preview ? (
            <div className={cssModules.textPreview}>
              <h1>Add Image</h1>
            </div>
          ) : (
            <>{preview && <img src={preview} alt="Preview" />}</>
          )}
        </div>
      </div>

      <div className={cssModules.formContainer}>
        <form className={cssModules.formContent} onSubmit={handleSubmit}>
          {success ? (
            <h3
              style={{
                color: "green",
                background: "#c5fce5",
                textAlign: "center",
                padding: "0.5rem 0",
                fontSize: "1.15rem",
                fontFamily: "avenirs",
              }}
            >
              Add Journey Success
            </h3>
          ) : (
            <></>
          )}

          {fail ? (
            <h3
              style={{
                color: "red",
                background: "#e0cecc",
                textAlign: "center",
                padding: "0.5rem 0",
                fontSize: "1.15rem",
                fontFamily: "avenirs",
              }}
            >
              Add Journey Failed
            </h3>
          ) : (
            <></>
          )}

          <input
            type="file"
            name="thumbnail"
            id="thumbnail"
            hidden
            onChange={handleChange}
          />
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            placeholder="Input Title"
            onChange={handleChange}
          />

          <CKEditor
            editor={ClassicEditor}
            data={diary.content}
            config={{
              placeholder:
                "Type something here & make sure you only add thumbnail using that big box.",
            }}
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!", editor);
            }}
            onChange={handleEditorChange}
          />

          <button type="submit">SUBMIT</button>
        </form>
      </div>
    </div>
  );
}

export default EditDiary;
