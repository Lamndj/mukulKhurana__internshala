import React, { useEffect, useState } from "react";
import axios from "axios";

function AutoComplete({ interestKeyword, addInterest }) {
  const [interests, setInterests] = useState([]);
  const [filteredInterests, setfilteredInterests] = useState([]);

  useEffect(() => {
    const url =
      "https://webit-keyword-search.p.rapidapi.com/autosuggest?q=paint&language=en";

    const config = {
      headers: {
        "x-rapidapi-host": "webit-keyword-search.p.rapidapi.com",
        "x-rapidapi-key": "28728db04dmsh34d3f140dd059fap1c388ejsn7288577afcf7",
      },
    };

    axios
      .get(url, config)
      .then((res) => {
        setInterests(...interests, res.data.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (interests.length > 0) {
      if (interestKeyword !== "") {
        let filterList = interests.filter((val) =>
          val
            .toString()
            .toLowerCase()
            .includes(interestKeyword.toString().toLowerCase())
        );
        setfilteredInterests(filterList);
      } else {
        setfilteredInterests([]);
      }
    }
  }, [interestKeyword, interests]);

  return (
    <div className="autoComplete">
      {filteredInterests.map((interest) => {
        return (
          <div
            className="autoComplete__card"
            onClick={() => addInterest(interest)}
            key={interest}
          >
            {interest}
          </div>
        );
      })}
    </div>
  );
}

export default AutoComplete;
