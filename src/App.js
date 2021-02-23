import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import scrollDown from "./assets/scrollDown.png";

import AutoComplete from "./AutoComplete";

function App() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [interestKeyword, setinterestKeyword] = useState("");
  const [interests, setinterests] = useState([]);

  const myRef = useRef(null);

  const scrollToForm = () => {
    myRef.current.scrollIntoView();
  };

  const addInterest = (val) => {
    if (interests.length < 3) {
      if (interests.indexOf(val) === -1) {
        setinterests([...interests, val]);
      }
    }
  };

  const removeInterest = (val) => {
    setinterests((prevState) => prevState.filter((_val) => _val !== val));
  };

  const registerUser = (e) => {
    e.preventDefault();

    const body = {
      name,
      email,
      interests,
    };

    const url = "https://testpostapi1.p.rapidapi.com";

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "x-rapidapi-host": "webit-keyword-search.p.rapidapi.com",
        "x-rapidapi-key": "28728db04dmsh34d3f140dd059fap1c388ejsn7288577afcf7",
        // accept: "success",
      },
    };

    axios
      .post(url, body, config)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <div className="app__hero">
        <h1>Take your hobbies to the next level</h1>
        <button onClick={scrollToForm}>REGISTER NOW</button>
        <img src={scrollDown} />
      </div>
      <form className="app__form">
        <h3>Start Your Journey</h3>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <input
          placeholder="Interest"
          value={interestKeyword}
          onChange={(e) => setinterestKeyword(e.target.value)}
          className="noMargin"
        />
        <AutoComplete
          interestKeyword={interestKeyword}
          addInterest={addInterest}
        />
        <div className="app__form__interests" ref={myRef}>
          {interests.map((val) => {
            return (
              <div
                key={val}
                className="app__form__interest__tag"
                onClick={() => removeInterest(val)}
              >
                <p>{val}</p>
              </div>
            );
          })}
        </div>
        <button onClick={registerUser}>REGISTER</button>
      </form>
      <div className="app__footer">
        <p>© 2020 Company All rights reserved</p>
      </div>
    </div>
  );
}

export default App;
