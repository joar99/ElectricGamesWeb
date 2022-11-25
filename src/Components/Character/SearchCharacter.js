import { useState } from "react";
import "../../Css/SearchItem.css";

export default function SearchChar({
  onSearchByName,
  onSearchCharById,
  onChange,
}) {
  const [searchName, setSearchName] = useState([]);
  const [searchCharId, setSearchCharId] = useState([]);

  const searchCharByName = () => {
    onSearchByName(searchName);
  };
  const searchCharById = () => {
    onSearchCharById(searchCharId);
  };

  return (
    <>
      <section className="search-container">
        <button className="show-all-btn" onClick={onChange}>
          Show All
        </button>
        <section>
          <h3 className="search-name">Search a Character by Name</h3>

          <div className="search-content">
            <input
              type="text"
              id="search-name"
              className="search-name"
              placeholder="Enter Character Name"
              onChange={(e) => setSearchName(e.target.value)}
            ></input>
            <button
              id="search-name-btn"
              className="search-name-btn"
              onClick={searchCharByName}
            >
              Search
            </button>
          </div>
        </section>
        <section>
          <h3 className="search-name">Search a character by ID</h3>
          <div className="search-content">
            <input
              type="text"
              id="search-id"
              className="search-id"
              placeholder="Enter character ID"
              onChange={(e) => setSearchCharId(e.target.value)}
            ></input>
            <button
              id="search-id-btn"
              className="search-id-btn"
              onClick={searchCharById}
            >
              Search
            </button>
          </div>
        </section>
      </section>
    </>
  );
}
