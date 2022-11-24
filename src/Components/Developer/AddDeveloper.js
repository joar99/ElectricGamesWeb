import React from "react";
import { useState } from "react";
import axios from "axios";
import "../../Css/AddForm.css";

export default function AddDev() {
    const [isAdded, setIsAdded] = useState(false);
    const [addedDev, setAddedDev] = useState({});

    const devControllerUrl = "https://localhost:7127/api/Developers"

    const [name, setName] = useState("")
    const [location, setLocation] = useState("")

    const [file, setFile] = useState();
    const [fileName, setFileName] = useState();

    const handleChangeName = event => setName(event.target.value);
    const handleChangeLocation = event => setLocation(event.target.value)

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name)
    }

    const dev = {
        id: null,
        Image: fileName,
        Name: name,
        Location: location
    }

    const postDev = async () => {
        await axios.post(devControllerUrl,
            JSON.stringify(dev),
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

    const [popup, setPopup] = useState(false);
    const handlePopupChange = () => {
        setPopup(true)
        setTimeout(() => {
            setPopup(false)
        }, 3000)
    }

    const handleClick = event => {
        event.preventDefault();
        postDev();
        handlePopupChange();
    }

    return (
        <>

        <div className="overlay">
            <div className="popup-container">
                <popup className="popup-message">
             {popup === true ? <h2>Developer successfully added.</h2> : <></>}
            </popup>    
         </div>
        </div>

            <h1 className="main-title">Developers</h1>
            <section className="container">
                <div className="form">
                    <form className="form-input">
                        <div>
                            <label className="add-label" type="text" name="dev-name">Enter Developer Name</label>
                            <input className="add-input" type="text" onChange={handleChangeName}/>
                        </div>
                        <div>
                            <label className="add-label" type="text" name="dev-location">Enter Developer Location</label>
                            <input className="add-input" type="text" onChange={handleChangeLocation}/>
                        </div>
                        <div>
                            <input className="save-file" type="file" onChange={saveFile} />
                            <button className="create-button" onClick={handleClick}>Create Developer</button>
                        </div>
                    </form>

                </div>
            </section>
        </>
    )
}