// import package
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// import assets
import cssModules from "../../assets/css/EditProfile.module.css";

// import config
import { API } from "../../config/api";

function EditProfilePic() {
  const { id } = useParams();
  const pic = () => {
    document.getElementById("thumb").click();
  };
  let navigate = useNavigate();

  // store data
  const [form, setForm] = useState({
    photo: null,
  });

  const [user, setUser] = useState([]);

  // alert
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  const getUser = async () => {
    try {
      const response = await API.get(`/user/${id}`);

      setPreview(response.data.data.photo);
      setUser(response.data.data);
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
      formData.set("photo", form.photo[0], form.photo[0].name);

      const response = await API.patch(`/user/${user.id}`, formData, config);

      if (response.data.status === "Success") {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate("/");
          document.location.reload(true);
        }, 1500);
      }
    } catch (error) {
      setFail(true);
      setTimeout(() => {
        setFail(false);
      }, 3000);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className={cssModules.editContainer}>
      <div className={cssModules.formContainer}>
        <form className={cssModules.editForm} onSubmit={handleSubmit}>
          <h1>Edit Profile Pic</h1>

          {success ? (
            <h3
              style={{
                width: "100%",
                color: "green",
                background: "#c5fce5",
                textAlign: "center",
                padding: "0.5rem 0",
                fontSize: "1.15rem",
                fontFamily: "avenirs",
              }}
            >
              Update Profile Picture Success
            </h3>
          ) : (
            <></>
          )}

          {fail ? (
            <h3
              style={{
                width: "100%",
                color: "red",
                background: "#e0cecc",
                textAlign: "center",
                padding: "0.5rem 0",
                fontSize: "1.15rem",
                fontFamily: "avenirs",
              }}
            >
              Update Profile Picture Failed
            </h3>
          ) : (
            <></>
          )}

          <div className={cssModules.imgContainer} onClick={pic}>
            {preview && <img src={preview} alt="Preview" />}
            <div className={cssModules.addText}>
              <h1>Add Image Here</h1>
            </div>
          </div>

          <input
            type="file"
            name="photo"
            id="thumb"
            onChange={handleChange}
            hidden
          />
          <div className={cssModules.btnWrapper}>
            <button
              className={cssModules.backBtn}
              onClick={() => navigate("/profile")}
            >
              CANCEL
            </button>
            <button type="submit" className={cssModules.saveBtn}>
              SAVE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfilePic;
