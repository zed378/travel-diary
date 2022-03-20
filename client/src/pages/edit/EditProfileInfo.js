// import package
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// import assets
import cssModules from "../../assets/css/EditProfile.module.css";

// import config
import { API } from "../../config/api";

function EditProfile() {
  const { id } = useParams();

  let navigate = useNavigate();

  // store data
  const [form, setForm] = useState({
    name: "",
    phone: "",
  });

  const { name, phone } = form;

  const [user, setUser] = useState([]);

  // alert
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  const getUser = async () => {
    try {
      const response = await API.get(`/user/${id}`);

      setForm({
        name: response.data.data.name,
        phone: response.data.data.phone,
      });

      setUser(response.data.data);
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

  const onSubmitted = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(form);

      const response = await API.patch(`/user-edit/${user.id}`, body, config);

      if (response.data.status === "Success") {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate("/profile");
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
        <form className={cssModules.editForm} onSubmit={onSubmitted}>
          <h1>Edit Profile Info</h1>

          {success ? (
            <h3
              style={{
                color: "green",
                background: "#c5fce5",
                textAlign: "center",
                padding: "0.5rem 0",
                fontSize: "1.15rem",
                fontFamily: "avenirs",
                width: "100%",
              }}
            >
              Edit Profile Success
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
                width: "100%",
              }}
            >
              Edit Profile Failed
            </h3>
          ) : (
            <></>
          )}

          <label htmlFor="name">Name</label>
          <input type="text" name="name" onChange={handleChange} value={name} />
          <label htmlFor="phone">Phone</label>
          <input
            type="number"
            name="phone"
            onChange={handleChange}
            value={phone}
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

export default EditProfile;
