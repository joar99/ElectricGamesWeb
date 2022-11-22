import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Nav from "./Components/Nav/Nav";
import Home from "./Components/Home";
import Error from "./Components/Error";
import Game from "./Components/Game/EditGame"
import Games from "./Components/Game/Games"
import AddGame from "./Components/Game/AddGame";
import Developer from "./Components/Developer/EditDeveloper";
import Developers from "./Components/Developer/Developers";
import AddDev from "./Components/Developer/AddDev";
import Character from "./Components/Character/EditCharacter";
import Characters from "./Components/Character/Characters";
import AddCharacter from "./Components/Character/AddCharacter";




function App() {

  return (


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
        <Route path="/characters" element={<Characters/>}/>
        <Route path="/characters/:id" element={<Character/>}/>
        <Route path="characters/addcharacter" element={<AddCharacter/>}/>

        {/*ROUTES FOR ERROR INCASE PATH IS INCORRECT */}
        <Route path="*" element={<Error />}/>
        </Routes>
    </div>
</Router>
      
  
  );
}

export default App;


