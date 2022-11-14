import React, {useState, Component, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Developer() {
    
    //GETTING ID BASED ON URL
    let {id} = useParams()

    //STATE CONTROL FOR GAME
    const [dev, setDev] = useState({})
    const [devUpdate, setDevUpdate] = useState(false)

    const devControllerUrl = "https://localhost:7127/api/Developers";

    //GET DEV TO DISPLAY
    useEffect(() => {
        axios.get(`${devControllerUrl}/${id}`)
        .then(response=>setDev(response.data))
        .catch(error=>console.log(error))
    },[devUpdate])
    
    //CONTROL INPUT BOX STATE
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");

    //STATE CONTROL FILE INPUT
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState();
    
    //HANDLING CHANGE OF STATE FILE INPUT
    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name)
    }
    
    //SETTING NEW GAME TO BE PUT
    const newDev = {
        Name: name,
        Location: location,
        Image: fileName
    }

    //SETTING DEFAULT VALUES FOR GAME TO BE PUT
    useEffect(() => {
        setName(dev.name);
        setLocation(dev.location);
        setFileName(dev.image)
      }, [dev]);

      
      //POSTING GAME TO DATABASE
      const putDev = () => {
    
        axios.put(`${devControllerUrl}/${id}`,
        JSON.stringify(newDev),
        {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response)=>{
            setDevUpdate(prev=>!prev)
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
        <h1>{dev.name}</h1>
        <p>{dev.id}</p>
        <img src={`https://localhost:7127/images/${encodeURIComponent(dev.image)}`} alt={`https://localhost:7127/images/placeholder.png`} ></img>
        
        

        <p>Edit Name</p>
        <input type="text/css" defaultValue={dev.name} onChange={(e)=>setName(e.target.value)}></input> 
        <p>Edit Location</p>
        <input type="text/css" defaultValue={dev.location} onChange={(e)=>setLocation(e.target.value)}></input>
        <p>Edit Image</p>
        <input type="file" onChange={saveFile}></input>
        <button onClick={putDev}>Update Developer</button>
        </>
    )

}