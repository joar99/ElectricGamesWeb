import React from "react";
import { useState } from "react";
import axios from "axios";
import "../../Css/Background.css";


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
            <div>
                <label type="text" name="character-name">Enter Character Name</label>
                <input className="character-name-input" type="text" onChange={handleChangeName}></input>
            </div>
            <div>
                <label type="text" name="character-game">Enter Game Character Appears In</label>
                <input className="character-game-input" type="text" onChange={handleChangeGame}></input>
            </div>
            <div>
                <label type="text" name="weapon">Enter Weapon of Character</label>
                <input className="character-weapon-input" type="text" onChange={handleChangeWeapon}></input>
            </div>
            <div>
                <label type="button" name="select-image">Select Image</label>
                <input type="file" onChange={saveFile}></input>
            </div>
            <button onClick={postCharacter}>Create Character</button>
        </>
    )
}