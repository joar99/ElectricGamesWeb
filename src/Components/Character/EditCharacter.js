import React, { useState, Component, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../../Css/PopupMessage.css";
import "../../Css/EditForm.css";

export default function Character() {
  //GETTING ID BASED ON URL
  let { id } = useParams();

  //STATE CONTROL FOR POPUP
  const [popup, setPopup] = useState(false);
  const handlePopupChange = () => {
    setPopup(true);
    setTimeout(() => {
      setPopup(false);
    }, 3000);
  };
  //BUTTON FOR POPUP
  const handleClick = (event) => {
    event.preventDefault();
    putChar();
    handlePopupChange();
  };

  //STATE CONTROL FOR GAME
  const [character, setCharacter] = useState({});
  const [characterUpdate, setCharacterUpdate] = useState(false);

  const characterControllerUrl = "https://localhost:7127/api/Characters";

  //GET GAME TO DISPLAY
  useEffect(() => {
    axios
      .get(`${characterControllerUrl}/${id}`)
      .then((response) => setCharacter(response.data))
      .catch((error) => console.log(error));
  }, [characterUpdate]);

  //CONTROL INPUT BOX STATE
  const [name, setName] = useState("");
  const [game, setGame] = useState("");
  const [weapon, setWeapon] = useState("");

  //STATE CONTROL FILE INPUT
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();

  //HANDLING CHANGE OF STATE FILE INPUT
  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  //SETTING NEW GAME TO BE PUT
  const newChar = {
    Name: name,
    Game: game,
    Image: fileName,
    Weapon: weapon,
  };

  //SETTING DEFAULT VALUES FOR GAME TO BE PUT
  useEffect(() => {
    setName(character.name);
    setGame(character.game);
    setFileName(character.image);
    setWeapon(character.weapon);
  }, [character]);

  //POSTING GAME TO DATABASE
  const putChar = () => {
    axios
      .put(`${characterControllerUrl}/${id}`, JSON.stringify(newChar), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setCharacterUpdate((prev) => !prev);
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

      <h1 className="main-title">Characters</h1>
      <section className="container">
        <div className="popup-container">
          <popup className="popup-message">
            {popup === true ? <h2>Character successfully updated.</h2> : <></>}
          </popup>
        </div>
        <div className="form">
          <CharacterPreview {...character} />
          <form className="form-input">
            <div>
              <label
                className="edit-label"
                type="text"
                name="edit-label"
              >
                Edit character name
              </label>
              <input
                className="edit-input"
                type="text"
                defaultValue={character.name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label
                className="edit-label"
                type="text"
                name="edit-label"
              >
                Edit character game
              </label>
              <input
                className="edit-input"
                type="text"
                defaultValue={character.game}
                onChange={(e) => setGame(e.target.value)}
              />
            </div>
            <div>
              <label
                className="edit-label"
                type="text"
                name="edit-label"
              >
                Edit character weapon
              </label>
              <input
                className="edit-input"
                type="text"
                defaultValue={character.weapon}
                onChange={(e) => setWeapon(e.target.value)}
              />
            </div>
            <div>
              <label
                className="edit-label"
                type="text"
                name="edit-label-select"
              >
                Select Image
              </label>
              <input className="edit-file" type="file" onChange={saveFile} />
            </div>
            <button className="update-button" onClick={handleClick}>
              Update Character
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

const CharacterPreview = (props) => {
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
          <ul class="small-card-overlay_list">
            <h1>{props.name}</h1>
            <li className="id">{props.id}</li>
            <li>Game: {props.game}</li>
            <li>Weapon: {props.weapon}</li>
          </ul>
        </div>
      </div>
    </>
  );
};
