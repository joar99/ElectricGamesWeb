import React, {useState, Component, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";





export default function Character() {
    
    //GETTING ID BASED ON URL
    let {id} = useParams()

    //STATE CONTROL FOR GAME
    const [character, setCharacter] = useState({})
    const [characterUpdate, setCharacterUpdate] = useState(false)

    const characterControllerUrl = "https://localhost:7127/api/Characters";

    //GET GAME TO DISPLAY
    useEffect(() => {
        axios.get(`${characterControllerUrl}/${id}`)
        .then(response=>setCharacter(response.data))
        .catch(error=>console.log(error))
    },[characterUpdate])
    
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
        setFileName(e.target.files[0].name)
    }
    
    //SETTING NEW GAME TO BE PUT
    const newChar = {
        Name: name,
        Game: game,
        Image: fileName,
        Weapon: weapon
    }

    //SETTING DEFAULT VALUES FOR GAME TO BE PUT
    useEffect(() => {
        setName(character.name);
        setGame(character.game);
        setFileName(character.image)
        setWeapon(character.weapon);
      }, [character]);

      
      //POSTING GAME TO DATABASE
      const putChar = () => {
    
        axios.put(`${characterControllerUrl}/${id}`,
        JSON.stringify(newChar),
        {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response)=>{
            setCharacterUpdate(prev=>!prev)
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
        <h1>{character.name}</h1>
        <p>{character.id}</p>
        <img src={`https://localhost:7127/images/${encodeURIComponent(character.image)}`} alt={`https://localhost:7127/images/placeholder.png`} ></img>
        
        

        <p>Edit Name</p>
        <input type="text/css" defaultValue={character.name} onChange={(e)=>setName(e.target.value)}></input> 
        <p>Edit Game</p>
        <input type="text/css" defaultValue={character.game} onChange={(e)=>setGame(e.target.value)}></input>
        <p>Edit Weapon</p>
        <input type="text/css" defaultValue={character.weapon} onChange={(e)=>setWeapon(e.target.value)}></input>
        <p>Edit Image</p>
        <input type="file" onChange={saveFile}></input>
        <button onClick={putChar}>Update Character</button>
        </>
    )

}