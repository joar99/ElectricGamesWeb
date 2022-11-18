import React from "react";
import { useState } from "react";
import axios from "axios";
import GameCard from "./GameCard";
import "../../Css/Default.css";
import "../../Css/Game/AddGame.css";


export default function AddGame() {
    const [isAdded, setIsAdded] = useState(false);
    const [addedGame, setAddedGame] = useState({});

    const gameControllerUrl = "https://localhost:7127/api/Games"

    const [title, setTitle] = useState("")
    const [releaseDate, setReleaseDate] = useState("")
    const [platform, setPlatform] = useState("")
    const [developer, setDeveloper] = useState("")
    const [rating, setRating] = useState("")

    const [file, setFile] = useState();
    const [fileName, setFileName] = useState();

    const handleChangeTitle = event => setTitle(event.target.value);
    const handleChangeReleaseDate = event => setReleaseDate(event.target.value)
    const handleChangePlatform = event => setPlatform(event.target.value)
    const handleChangeDeveloper = event => setDeveloper(event.target.value)
    const handleChangeRating = event => setRating(event.target.value)

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name)
    }

    const game = {
        id: null,
        Title: title,
        ReleaseDate: releaseDate,
        Image: fileName,
        Platform: platform,
        Developer: developer,
        ESRB: rating
    }

    const postGame = async () => {
        await axios.post(gameControllerUrl,
            JSON.stringify(game),
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
        <h1 className="main-title">Games</h1>
        <section className="card-container">

                <div className="form-container">
                    <form className="form-input">
                        <div>
                            <label className="add-game-label" type="text" name="game-title">Enter title</label>
                            <input className="add-game-input" type="text" onChange={handleChangeTitle}></input>
                        </div>
                        <div>
                            <label className="add-game-label" type="text" name="release-date">Enter release date</label>
                            <input className="add-game-input" type="text" onChange={handleChangeReleaseDate}></input>
                        </div>
                        <div>
                            <label className="add-game-label" type="text" name="game-platform">Enter platform</label>
                            <input className="add-game-input" type="text" onChange={handleChangePlatform}></input>
                        </div>
                        <div>
                            <label className="add-game-label" type="text" name="game-developer">Enter developer</label>
                            <input className="add-game-input" type="text" onChange={handleChangeDeveloper}></input>
                        </div>
                        <label className="add-game-label" type="text" name="game-rating">Enter age rating</label>
                        <input className="add-game-input" type="text" onChange={handleChangeRating}></input>
                        <div>
                        <label className="add-game-label" type="text" name="select-image">Select Image</label>
                            <input type="file" onChange={saveFile}></input>
                            <button className="add-game-button" onClick={postGame}>Create Game</button>
                        </div>
                    </form>
                </div>
                </section>
        </>
    )
}

/*const AddedGame = (gameTitle) => {

    const gameControllerUrl = "https://localhost:7127/api/Games"

    const [game, setGame] = useState({})

    const getGame = () => {
        axios.get(`${gameControllerUrl}/${gameTitle}`)
        .then(response=>setGame(response.data))
        .catch(error=>console.log(error))
    }

    return (
        <>
        <h1>Successfully Added Game To Database</h1>
        <GameCard {...game}/>
        </>
    )

}*/