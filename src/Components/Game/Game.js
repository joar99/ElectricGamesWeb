import React, {useState, Component, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";





export default function Game() {
    
    //GETTING ID BASED ON URL
    let {id} = useParams()

    //STATE CONTROL FOR GAME
    const [game, setGame] = useState({})
    const [gameUpdate, setGameUpdate] = useState(false)

    const gameControllerUrl = "https://localhost:7127/api/Games";

    //GET GAME TO DISPLAY
    useEffect(() => {
        axios.get(`${gameControllerUrl}/${id}`)
        .then(response=>setGame(response.data))
        .catch(error=>console.log(error))
    },[gameUpdate])
    
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
        .then((response)=>{
            setGameUpdate(prev=>!prev)
        })
        .catch(error=>console.log(error));
        
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
        <h1>{game.title}</h1>
        <p>{game.id}</p>
        <img src={`https://localhost:7127/images/${encodeURIComponent(game.image)}`} alt={`https://localhost:7127/images/placeholder.png`} ></img>
        
        

        <p>Edit Title</p>
        <input type="text/css" defaultValue={game.title} onChange={(e)=>setTitle(e.target.value)}></input> 
        <p>Edit Release Date</p>
        <input type="text/css" defaultValue={game.releaseDate} onChange={(e)=>setReleaseDate(e.target.value)}></input>
        <p>Edit Platform</p>
        <input type="text/css" defaultValue={game.platform} onChange={(e)=>setPlatform(e.target.value)}></input>
        <p>Edit Developer</p>
        <input type="text/css" defaultValue={game.developer} onChange={(e)=>setDeveloper(e.target.value)}></input>
        <p>Edit Rating</p>
        <input type="text/css" defaultValue={game.esrb} onChange={(e)=>setRating(e.target.value)}></input>
        <p>Edit Image</p>
        <input type="file" onChange={saveFile}></input>
        <button onClick={putGame}>Update Game</button>
        </>
    )

}