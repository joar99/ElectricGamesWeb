import React, { useState, Component, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../Css/Game/EditGame.css";
import "../../Css/Default.css";



export default function Game() {

    //GETTING ID BASED ON URL
    let { id } = useParams()

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

    //EVENT HANDLERS
    const [title, setTitle] = useState("");

    const handleChange = event => {
        setTitle(event.target.value);
    }
    const handleClick = event => {
        event.preventDefault();
        setTitle(title);
        putGame();
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
                <section className="form-container">
                    <form className="form-input">
                        <div>
                            <label type="text" name="game-title">Enter Game Title</label>
                            <input
                                className="game-input"
                                type="text"
                                name="title"
                                onChange={handleChange}
                                value={title}
                            />
                        </div>
                        <div>
                            <label type="text" name="release-date">Enter Game Release Date</label>
                            <input 
                                className="game-input"
                                type="text" value={releaseDate}
                                name="releaseDate"
                                onChange={e => setReleaseDate(e.target.value)}
                            />
                        </div>
                        <label type="text" name="release-date">Enter Game Platform</label>
                        <input 
                                className="game-input"
                                type="text"
                                value={platform}
                                name="platform"
                                onChange={e => setPlatform(e.target.value)} 
                            />
                        <div>
                            <label type="text"name="release-date">Enter Game Release Date</label>
                            <input 
                                className="game-input"
                                type="text" value={releaseDate}
                                name="release" onChange={e => setReleaseDate(e.target.value)}
                            />
                        </div>
                        <div>
                            <label type="text" name="developer">Enter Game Developer</label>
                            <input 
                                className="game-input" 
                                type="text" value={developer}
                                name="developer" onChange={e => setDeveloper(e.target.value)}
                            />
                        </div>
                        <div>
                            <label type="text" name="rating">Enter Game Age Rating</label>
                            <input 
                            className="game-input"
                            type="text" value={rating}
                            name="rating" onChange={e => setRating(e.target.value)}
                         />
                        </div>
                        <div>
                            <label type="text" name="select-image">Select Image</label>
                            <input 
                                className="select-button"
                                type="file" onChange={saveFile}>
                            
                            </input>
                        </div>
                        <button className="edit-game" onClick={handleClick}>Edit Game</button>
                    </form>
                </section>
        </>
    )

} 