import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [words, setWords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWords = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://192.168.56.101:5555/");
      setWords(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching words:", error);
      setError("Error downloading words");
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Слова, що закінчуються на "во"</h1>
      <button className="button" onClick={fetchWords}>
        Найти
      </button>
      {isLoading && <div>Загрузка...</div>}
      {error && <div>{error}</div>}
      {!isLoading && words.length > 0 && (
        <ul>
          {words.map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;