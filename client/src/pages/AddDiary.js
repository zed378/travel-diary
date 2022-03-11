// import package
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";

// import component
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// import assets
import "../assets/css/ckeditor.css";
import cssModules from "../assets/css/AddDiary.module.css";

// import config
import { API } from "../config/api";

function AddDiary() {
  const navigate = useNavigate();
  const pic = () => {
    document.getElementById("thumbnail").click();
  };

  // alert
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  // store data
  const [form, setForm] = useState({
    title: "",
    content: "",
    thumbnail: "",
  });

  // set preview image
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    console.log(form.title);

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

      const response = await API.post("/post", formData, config);

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
        <form className={cssModules.formContent}>
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
            placeholder="Input Title"
            onChange={handleChange}
          />

          <CKEditor
            editor={ClassicEditor}
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

          <button type="submit" onClick={handleSubmit}>
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddDiary;
