import React, { useState, Component, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../../Css/EditForm.css";
import "../../Css/PopupMessage.css";

export default function Developer() {
  //GETTING ID BASED ON URL
  let { id } = useParams();

  //STATE CONTROL FOR GAME
  const [dev, setDev] = useState({});
  const [devUpdate, setDevUpdate] = useState(false);

  const devControllerUrl = "https://localhost:7127/api/Developers";

  //GET DEV TO DISPLAY
  useEffect(() => {
    axios
      .get(`${devControllerUrl}/${id}`)
      .then((response) => setDev(response.data))
      .catch((error) => console.log(error));
  }, [devUpdate]);

  //CONTROL INPUT BOX STATE
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  //STATE CONTROL FILE INPUT
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();

  //HANDLING CHANGE OF STATE FILE INPUT
  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  // HANDLING POPUP MESSAGE WHEN SUBMITTING CHANGES
  const [popup, setPopup] = useState(false);
  const handlePopupChange = () => {
    setPopup(true);
    setTimeout(() => {
      setPopup(false);
    }, 3000);
  };

  const handleClick = (event) => {
    event.preventDefault();
    putDev();
    handlePopupChange();
  };

  //SETTING NEW GAME TO BE PUT
  const newDev = {
    Name: name,
    Location: location,
    Image: fileName,
  };

  //SETTING DEFAULT VALUES FOR GAME TO BE PUT
  useEffect(() => {
    setName(dev.name);
    setLocation(dev.location);
    setFileName(dev.image);
  }, [dev]);

  //POSTING GAME TO DATABASE
  const putDev = () => {
    axios
      .put(`${devControllerUrl}/${id}`, JSON.stringify(newDev), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setDevUpdate((prev) => !prev);
      })
      .catch((error) => console.log(error));

    const formData = new FormData();
    formData.append("formFile", file);
    formData.append("fileName", fileName);

    try {
      const res = axios.post("https://localhost:7127/api/file", formData);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <>
      <Link className="go-back-btn" to="/developers">
        <button></button>
      </Link>

      <div className="overlay">
        <div className="popup-container">
          <popup className="popup-message">
            {popup === true ? <h2>Developer successfully updated.</h2> : <></>}
          </popup>
        </div>
      </div>

      <h1 className="main-title">Developers</h1>
      <section className="edit-container">
        <div className="edit-form">
          <form className="form-input">
            <div>
              <label className="edit-label" type="text" name="edit-dev-label">
                Edit developer name
              </label>
              <input
                className="edit-input"
                type="text"
                defaultValue={dev.name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="edit-label" type="text" name="edit-dev-label">
                Edit developer location
              </label>
              <input
                className="edit-input"
                type="text"
                defaultValue={dev.location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div>
              <label className="edit-label" type="text" name="edit-dev-label">
                Edit developer image
              </label>
              <input className="edit-file" type="file" onChange={saveFile} />
            </div>
            <button className="update-button" onClick={handleClick}>
              Update Developer
            </button>
          </form>
          <DeveloperPreview {...dev} />
        </div>
      </section>
    </>
  );
}

const DeveloperPreview = (props) => {
  const backgroundLink = `https://localhost:7127/images/${encodeURIComponent(
    props.image
  )}`;

  return (
    <>
      <div
        className="small-card"
        style={{ backgroundImage: `url(${backgroundLink})` }}
      >
        <div className="small-card-overlay">
          <ul className="small-card-overlay_list">
            <h1>{props.name}</h1>
            <li className="id">{props.id}</li>
            <li>{props.location}</li>
          </ul>
        </div>
      </div>
    </>
  );
};
