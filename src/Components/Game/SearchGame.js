import {useState} from "react"

export default function SearchGame({onSearchByTitle}) {
    
    const [searchTitle, setSearchTitle] = useState([]);   

    const searchGameByTitle = () => {
        onSearchByTitle(searchTitle);
    }
    

    return(
        <>
            <h3>Search a Game by Title</h3>
            <div>                
                <input type="text" id="search-book-name" placeholder="Enter Game Title" onChange={(e)=>setSearchTitle(e.target.value)}></input>
             </div>
            <button id="search-book-name-btn" onClick={searchGameByTitle}>Search</button>
        </>
    )
}