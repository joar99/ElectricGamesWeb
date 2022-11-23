import React from "react";
import { useState } from "react";
import axios from "axios";
import "../../Css/Background.css";
import "../../Css/Character/AddCharacter.css";
import "../../Css/PopupMessage.css";


export default function AddCharacter() {
    const [isAdded, setIsAdded] = useState(false);
    const [addedChar, setAddedChar] = useState({});

    const charControllerUrl = "https://localhost:7127/api/Characters"

    const [name, setName] = useState("")
    const [game, setGame] = useState("")
    const [weapon, setWeapon] = useState("")

    const [file, setFile] = useState();
    const [fileName, setFileName] = useState();

    const handleChangeName = event => setName(event.target.value);
    const handleChangeGame = event => setGame(event.target.value)
    const handleChangeWeapon = event => setWeapon(event.target.value)

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name)
    }

    const character = {
        id: null,
        Name: name,
        Game: game,
        Image: fileName,
        Weapon: weapon
    }

    const [popup, setPopup] = useState(false);
    const handlePopupChange = () => {
        setPopup(true)
        setTimeout(() => {
            setPopup(false)
        }, 3000)
    }

    const handleClick = event => {
        event.preventDefault();
        postCharacter();
        handlePopupChange();
    }
 

    const postCharacter = async () => {
        await axios.post(charControllerUrl,
            JSON.stringify(character),
            {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                console.log(response)
            })
            .catch(error => console.log(error));

        const formData = new FormData();
        formData.append("formFile", file)
        formData.append("fileName", fileName)

        try {
            const res = axios.post("https://localhost:7127/api/file", formData);
        } catch (ex) {
            console.log(ex)
        }
    }

    return (
        <>
            <div className="overlay">
                <div className="popup-container">
                    <popup className="popup-message">
                        {popup === true ? <h2>Character successfully added.</h2> : <></>}
                    </popup>
                </div>
            </div> 


            <h1 className="main-title">Characters</h1>
            <section className="container">

                <div className="form">
                    <form className="form-input">
                        <div>
                            <label className="character-label" type="text" name="character-name">Enter character name</label>
                            <input className="character-input" type="text" onChange={handleChangeName}></input>
                        </div>
                        <div>
                            <label className="character-label" type="text" name="character-game">Enter game character appears in</label>
                            <input className="character-input" type="text" onChange={handleChangeGame}></input>
                        </div>
                        <div>
                            <label className="character-label" type="text" name="weapon">Enter weapon of character</label>
                            <input className="character-input" type="text" onChange={handleChangeWeapon}></input>
                        </div>
                        <div>
                            <label className="character-label-select" type="button" name="select-image">Select image</label>
                            <input className="save-file" type="file" onChange={saveFile}></input>

                            <button className="create-character-btn" onClick={handleClick}>Create character</button>
                        </div>

                    </form>
                </div>
            </section>

        </>
    )
}