import React, { useState, Component, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../Css/Game/EditGame.css";
import "../../Css/Background.css";
import GameCard from "./GameCard";



export default function Game() {

    //GETTING ID BASED ON URL
    let { id } = useParams()

    //STATE CONTROL FOR POPUP
    const [popup, setPopup] = useState(false);
    const handlePopupChange = () => {
        setPopup(true)
        setTimeout(() => {
            setPopup(false)
        }, 3000)
    }

    //STATE CONTROL FOR GAME
    const [game, setGame] = useState({})
    const [gameUpdate, setGameUpdate] = useState(false)

    const gameControllerUrl = "https://localhost:7127/api/Games";

    //GET GAME TO DISPLAY
    useEffect(() => {
        axios.get(`${gameControllerUrl}/${id}`)
            .then(response => setGame(response.data))
            .catch(error => console.log(error))
    }, [gameUpdate])

    //CONTROL INPUT BOX STATE

    const [title, setTitle] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [platform, setPlatform] = useState("");
    const [developer, setDeveloper] = useState("");
    const [rating, setRating] = useState("");

    //STATE CONTROL FILE INPUT
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState();

    //HANDLING CHANGE OF STATE FILE INPUT
    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name)
    }
    
    const handleClick = event => {
        event.preventDefault();
        putGame();
        handlePopupChange();
    }

    //SETTING NEW GAME TO BE PUT
    const newGame = {
        Title: title,
        ReleaseDate: releaseDate,
        Image: fileName,
        Platform: platform,
        Developer: developer,
        ESRB: rating
    }

    //SETTING DEFAULT VALUES FOR GAME TO BE PUT
    useEffect(() => {
        setTitle(game.title);
        setReleaseDate(game.releaseDate);
        setFileName(game.image)
        setPlatform(game.platform);
        setDeveloper(game.developer);
        setRating(game.esrb);
    }, [game]);


    //POSTING GAME TO DATABASE
    const putGame = () => {
        axios.put(`${gameControllerUrl}/${id}`,
            JSON.stringify(newGame),
            {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                setGameUpdate(prev => !prev)
            })
            .catch(error => console.log(error));

        const formData = new FormData();
        formData.append("formFile", file)
        formData.append("fileName", fileName)

        try {
            const res = axios.post("https://localhost:7127/api/file", JSON.stringify(Object.fromEntries(formData)));
        } catch (ex) {
            console.log(ex)
        }
    }




    return (

        <>
            <h1 className="main-title">Games</h1>
            <section className="container">
                {popup === true ? <h1>Game Successfully Updated</h1> : <></>}
                <div className="form">
                    <form className="form-input">
                        <div>
                            <label className="edit-game-label" type="text" name="edit-game-label">Enter game title</label>
                            <input className="edit-game-input" type="text" name="title" value={title} onChange={e => setTitle(e.target.value)}/>
                        </div>
                        <div>
                            <label className="edit-game-label" type="text" name="edit-release-date">Enter Game Release Date</label>
                            <input className="edit-game-input" type="text" value={releaseDate} name="releaseDate" onChange={e => setReleaseDate(e.target.value)}/>
                        </div>
                        <div>
                        <label className="edit-game-label" type="text" name="edit-platform">Enter Game Platform</label>
                        <input className="edit-game-input" type="text" value={platform} name="platform" onChange={e => setPlatform(e.target.value)}/>
                        </div>
                        <div>
                            <label className="edit-game-label" type="text" name="edit-developer">Enter Game Developer</label>
                            <input className="edit-game-input" type="text" value={developer} name="developer" onChange={e => setDeveloper(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="edit-game-label" type="text" name="edit-rating">Enter Game Age Rating</label>
                            <input className="edit-game-input" type="text" value={rating} name="rating" onChange={e => setRating(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="edit-game-label" type="text" name="edit-game-label-select">Select Image</label>
                            <input className="edit-file" type="file" onChange={saveFile}/>
                        </div>
                        <button className="update-game-button" onClick={handleClick}>Edit Game</button>
                    </form>
                    <GamePreview {...game}/>
                </div>
            </section>
            
        </>
    )

} 

const GamePreview = (props) => {
    return (
        <>
             <div className="card">
                <div className="card-image">
                    <img src={`https://localhost:7127/images/${encodeURIComponent(props.image)}`} alt={`https://localhost:7127/images/placeholder.png`} ></img>
                </div>
                <div className="card-overlay">
                    <ul class="card-overlay_list">
                        <h1>{props.title}</h1>
                        <li className="id">{props.id}</li>
                        <li>Release Date: {props.releaseDate}</li>
                        <li>Age Limit: {props.esrb}</li>
                        <li>Platform: {props.platform}</li>
                        <li>Developer: {props.developer}</li>
                    </ul>
                </div>
            </div>
        </>
    )
}