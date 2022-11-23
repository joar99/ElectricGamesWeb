import React, { useCallback, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import useStorage from "../../Hooks/useStorage"
import "../../Css/MemoryGame.css"
import { findByLabelText } from "@testing-library/react";



export default function MemoryGame() {

    const [memoryStatus, setMemoryStatus] = useState(false);
    const handleChangeStatus = useCallback(() => setMemoryStatus(prev=>!prev))

    return (
        <>
        {memoryStatus ? (
        <PlayMemory onChange={handleChangeStatus}/>
        ) : (
        <StartMemory onChange={handleChangeStatus}/>)}
        </>
    )
        
}

const StartMemory = ({onChange}) => {

    const [value, setValue] = useStorage("0", "HighScore");

    return (
        <>
            <section className="start-information">
                <h1>Play Memory Game!</h1>
                <h3>Current High Score: {value}</h3>
                <button className="start-btn" onClick={onChange}>Start Game</button>
            </section>
        </>
    )
}

const PlayMemory = ({onChange}) => {

    const [value, setValue] = useStorage("0", "HighScore");

    const [points, setPoints] = useState(0);
    const handleChangePoints = () => setPoints(prev => prev + 1);

    const [memory, setMemory] = useState([]);

    const [answer, setAnswer] = useState("");
    const handleChangeAnswer = event => {
        setAnswer(event.target.value);
        
    }
    const [correctAnswer, setCorrectAnswer] = useState({});

    const [lives, setLives] = useState(10);
    const handleChangeLives = () => setLives(prev => prev -1)

    const [memoryIsActive, setMemoryIsActive] = useState(true);
 
    const characterRandomUrl = "https://localhost:7127/api/Characters/randomizefour";

    useEffect(() => {
        axios.get(characterRandomUrl)
        .then(response=> {
            setMemory(response.data)
            const rand = Math.floor(Math.random() * response.data.length)
            const correct = response.data[rand]
            setCorrectAnswer(correct)
        })
        .catch(error=>console.log(error))
    },[points, lives])

    useEffect(() => {
        if (lives <= 0) {
            checkHighScore();
            setMemoryIsActive(false);
        }
    },[handleChangeLives])

    const checkHighScore = () => {
        if (points > parseInt(value)) {
            setValue(points.toString())
        }
    }

    const submitAnswer = () => {
        
        if (answer.toLowerCase() === correctAnswer.name.toLowerCase()) {
            handlePopupChange(1);
            handleChangePoints();
            setAnswer("");
        } else {
            handlePopupChange(2);
            handleChangeLives();
            setAnswer("");
        }

    }

    const [popup, setPopup] = useState(0);
    const handlePopupChange = (integer) => {
        setPopup(integer)
        setTimeout(() => {
            setPopup(0)
        }, 1500)
    }

    return (
        <>
        {memoryIsActive === true ? (
            <>
                <section className="memory-game-container">
                <div className="memory-img-container">
                    <CorrectCharacter  {...correctAnswer}/>
                </div>
                <div className="information-container"> 
                    <div className="display-information">
                    <h1>Current Score: {points}</h1>
                    <h1>{lives} Tries Left</h1>
                    <h1>Pending Answer: {answer}</h1>
                    <PopUp popup={popup}/>
                    </div>
                <div className="characater-choice-container"> 
                    {memory.map(memory =>{
                        return(
                            <button className="character-memory-btn" 
                            onClick={handleChangeAnswer} 
                            value={memory.name}
                            >{memory.name}</button>
                        )
                    })}
               
                    </div>
                    <div className="btn-container">  
                    <button className="submit-btn" onClick={submitAnswer}>Submit Answer</button>
                    <button className="end-btn" onClick={onChange}>End Game</button>
                    </div>
                    </div>
                </section>
            </>
        ) : (
        <>
        <div className="end-game-container">
        <h1>You Ran Out Of Lives</h1>
        <h1>Your Total Score: {points}</h1>
        <h1>Would You Like To Play Again?</h1>
        <button className="end-game-btn" onClick={onChange}>Yes!</button>
        </div>
        </>
        )}
        </>
    )
        
}

const CorrectCharacter = (props) => {
    return (
        <img src={`https://localhost:7127/images/${encodeURIComponent(props.image)}`} alt={`https://localhost:7127/images/placeholder.png`} className={"character-img"}></img>
    )
}

const PopUp = ({popup}) => {

    const correct = {color: "green", fontSize: "20px", fontWeight: "bold", padding: "10px"}
    const incorrect = {color: "red", fontSize: "20px", fontWeight: "bold", padding: "10px"}

    if (popup === 1) {
        return (<h3 style={correct}>Correct!</h3>)
    } else if (popup === 2) {
        return (<h3 style={incorrect}>Incorrect!</h3>)
    } else {
        return (<></>)
    }

}