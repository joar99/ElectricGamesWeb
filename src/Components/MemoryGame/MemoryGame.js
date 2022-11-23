import React, { useCallback, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import useStorage from "../../Hooks/useStorage"

export default function MemoryGame() {

    const [quizStatus, setQuizStatus] = useState(false);
    const handleChangeStatus = useCallback(() => setQuizStatus(prev=>!prev))

    return (
        <>
        {quizStatus ? (
        <PlayQuiz onChange={handleChangeStatus}/>
        ) : (
        <StartQuiz onChange={handleChangeStatus}/>)}
        </>
    )
        
}

const StartQuiz = ({onChange}) => {

    const [value, setValue] = useStorage("0", "HighScore");

    return (
        <>
            <section>
                <h1>Start Quiz</h1>
                <h3>Current High Score: {value}</h3>
                <button onClick={onChange}>Start Quiz</button>
            </section>
        </>
    )
}

const PlayQuiz = ({onChange}) => {

    const [value, setValue] = useStorage("0", "HighScore");

    const [points, setPoints] = useState(0);
    const handleChangePoints = () => setPoints(prev => prev + 1);

    const [quiz, setQuiz] = useState([]);

    const [answer, setAnswer] = useState("");
    const handleChangeAnswer = event => {
        setAnswer(event.target.value);
        
    }
    const [correctAnswer, setCorrectAnswer] = useState({});

    const [lives, setLives] = useState(10);
    const handleChangeLives = () => setLives(prev => prev -1)

    const [quizIsActive, setQuizIsActive] = useState(true);
 
    const characterRandomUrl = "https://localhost:7127/api/Characters/randomizefour";

    useEffect(() => {
        axios.get(characterRandomUrl)
        .then(response=> {
            setQuiz(response.data)
            const rand = Math.floor(Math.random() * response.data.length)
            const correct = response.data[rand]
            setCorrectAnswer(correct)
        })
        .catch(error=>console.log(error))
    },[points, lives])

    useEffect(() => {
        if (lives <= 0) {
            checkHighScore();
            setQuizIsActive(false);
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
        {quizIsActive === true ? (
            <>
                <section className="card-container">
                <div className="card-image">
                    <CorrectCharacter {...correctAnswer}/>
                </div>
                <div className="card-cont-stuff">
                    <div className="answer-buttons-container">
                    <h1>Current Score: {points}</h1>
                    <h1>{lives} Tries Left</h1>
                    <h1>Pending Answer: {answer}</h1>
                    </div>
                <div className="answer-buttons-container"> 
                    {quiz.map(quiz =>{
                        return(
                            <button className="submit-quiz-btn" 
                            onClick={handleChangeAnswer} 
                            value={quiz.name}
                            >{quiz.name}</button>
                        )
                    })}
                </div>
                    </div>
                    <div className="answer-buttons-containers">  
                    <button className="jonas-btn-sub" onClick={submitAnswer}>Submit Answer</button>
                    <button className="jonas-btn-canc" onClick={onChange}>End Quiz</button>
                
                    <PopUp popup={popup}/>
                    </div>
                </section>
            </>
        ) : (
        <>
        <h1>You Ran Out Of Lives</h1>
        <h1>Your Total Score: {points}</h1>
        <h1>Would You Like To Play Again?</h1>
        <button onClick={onChange}>Yes!</button>
        </>
        )}
        </>
    )
        
}

const CorrectCharacter = (props) => {
    return (
        <img src={`https://localhost:7127/images/${encodeURIComponent(props.image)}`} alt={`https://localhost:7127/images/placeholder.png`} ></img>
    )
}

const PopUp = ({popup}) => {

    if (popup === 1) {
        return (<h1>Correct!</h1>)
    } else if (popup === 2) {
        return (<h1>Incorrect!</h1>)
    } else {
        return (<></>)
    }

}