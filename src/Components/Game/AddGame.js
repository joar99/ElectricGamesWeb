import React from "react";
import { useState } from "react";
import axios from "axios";
import "../../Css/Background.css";
import "../../Css/AddForm.css";
import "../../Css/Card.css";
import "../../Css/PopupMessage.css";
import { Link } from "react-router-dom";

export default function AddGame() {
  const gameControllerUrl = "https://localhost:7127/api/Games";

  const [title, setTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [platform, setPlatform] = useState("");
  const [developer, setDeveloper] = useState("");
  const [rating, setRating] = useState("");

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();

  const handleChangeTitle = (event) => setTitle(event.target.value);
  const handleChangeReleaseDate = (event) => setReleaseDate(event.target.value);
  const handleChangePlatform = (event) => setPlatform(event.target.value);
  const handleChangeDeveloper = (event) => setDeveloper(event.target.value);
  const handleChangeRating = (event) => setRating(event.target.value);

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const game = {
    id: null,
    Title: title,
    ReleaseDate: releaseDate,
    Image: fileName,
    Platform: platform,
    Developer: developer,
    ESRB: rating,
  };

  const [popup, setPopup] = useState(false);
  const handlePopupChange = () => {
    setPopup(true);
    setTimeout(() => {
      setPopup(false);
    }, 3000);
  };

  const handleClick = (event) => {
    event.preventDefault();
    postGame();
    handlePopupChange();
  };

  const postGame = async () => {
    await axios
      .post(gameControllerUrl, JSON.stringify(game), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
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
      <Link className="go-back-btn" to="/games">
        <button></button>
      </Link>
      <div className="overlay">
        <div className="popup-container">
          <popup className="popup-message">
            {popup === true ? <h2>Game successfully added.</h2> : <></>}
          </popup>
        </div>
      </div>

      <h1 className="main-title">Games</h1>
      <section className="container">
        <div className="form">
          <form className="form-input">
            <div>
              <label className="add-label" type="text" name="game-title">
                Enter title
              </label>
              <input
                className="add-input"
                type="text"
                onChange={handleChangeTitle}
              ></input>
            </div>
            <div>
              <label className="add-label" type="text" name="release-date">
                Enter release date
              </label>
              <input
                className="add-input"
                type="text"
                onChange={handleChangeReleaseDate}
              ></input>
            </div>
            <div>
              <label className="add-label" type="text" name="game-platform">
                Enter platform
              </label>
              <input
                className="add-input"
                type="text"
                onChange={handleChangePlatform}
              ></input>
            </div>
            <div>
              <label className="add-label" type="text" name="game-developer">
                Enter developer
              </label>
              <input
                className="add-input"
                type="text"
                onChange={handleChangeDeveloper}
              ></input>
            </div>
            <label className="add-label" type="text" name="game-rating">
              Enter age rating
            </label>
            <input
              className="add-input"
              type="text"
              onChange={handleChangeRating}
            ></input>
            <div>
              <label className="add-label" type="text" name="select-image">
                Select Image
              </label>
              <input
                className="save-file"
                type="file"
                onChange={saveFile}
              ></input>
              <button className="create-button" onClick={handleClick}>
                Create Game
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
