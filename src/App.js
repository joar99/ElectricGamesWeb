import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Nav from "./Components/Nav";
import Home from "./Components/Home";
import Error from "./Components/Error";
import Game from "./Components/Game/Game"
import Games from "./Components/Game/Games"
import AddGame from "./Components/Game/AddGame";
import Developer from "./Components/Developer/Developer";
import Developers from "./Components/Developer/Developers";
import AddDev from "./Components/Developer/AddDev";

function App() {

  return (
    <div className="App">

<Router>
    <div className="App">
        <Nav/>
        <Routes>
        <Route path="/" exact element={<Home/>}/>

        {/*ROUTES FOR GAMES*/}
        <Route path="/games" element={<Games/>}/>
        <Route path="games/:id" element={<Game/>}/>
        <Route path="games/addgame" element={<AddGame/>}/>

        {/*ROUTES FOR DEVELOPERS*/}
        <Route path="/developers" element={<Developers/>}/>
        <Route path="developers/:id" element={<Developer/>}/>
        <Route path="developers/adddeveloper" element={<AddDev/>}/>

        {/*ROUTES FOR CHARACTERS*/}
        {/*<Route path="/developers" element={<></>}/>
        <Route path="/developers/:id" element={<></>}/>

        {/*ROUTES FOR ERROR INCASE PATH IS INCORRECT */}
        <Route path="*" element={<Error />}/>
        </Routes>
    </div>
</Router>
      
    </div>
  );
}

export default App;


