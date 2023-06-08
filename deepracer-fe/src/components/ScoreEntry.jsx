import { useRef, useState } from "react";
import { toast } from 'react-toastify';

import "../styles/scoreentry.scss";

function ScoreEntry() {
  const nameRef = useRef();
  const timeRef = useRef();

  const [evalCSV, setEvalCSV] = useState();
  const [trainingCSV, setTrainingCSV] = useState();
  const [evalLog, setEvalLog] = useState();

  const handleEvalCSVChange = (e) => {
    setEvalCSV(e.target.files[0]);
  }
  const handleTrainingCSVChange = (e) => {
    setTrainingCSV(e.target.files[0]);
  }
  const handleEvalLogChange = (e) => {
    setEvalLog(e.target.files[0]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const data = new FormData();
    // if (nameRef.current.value) 
    data.append("modelname", nameRef.current.value);

    data.append("laptime", timeRef.current.value);
    // if (evalCSV)
    data.append("evalcsv", evalCSV);
    // if (trainingCSV)
    data.append("trainingcsv", trainingCSV);

    data.append("evallog", evalLog);
    
    fetch("http://localhost:4000/api/csv", {
      method: "POST",
      body: data,
    })
    .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
    
    nameRef.current.value = "";
    timeRef.current.value = "";
  };

  const handleResetLeaderboard = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/api/score", {
      method: "DELETE",
    })
    .then((res) => res.json())
      .then((data) => toast.success("Leaderboard reset successful"))
      .catch((err) => toast.error(err.message));
  }

  return (
    <>
      <div className="score-container">
        <form className="score-form" onSubmit={handleSubmit}>
          <div className="score-form-header">Enter Score</div>
          <input placeholder="Model Name" ref={nameRef} />
          <input placeholder="Time in seconds" ref={timeRef} />
          <div className="score-form-input">
            <label>Evaluation CSV</label>
            <input type="file" onChange={handleEvalCSVChange} />
          </div>
          <div className="score-form-input">
            <label>Training CSV</label>
            <input type="file" onChange={handleTrainingCSVChange} />
          </div>
          <div className="score-form-input">
            <label>Evaluation Log</label>
            <input type="file" onChange={handleEvalLogChange} />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="score-container reset-container">
        <button className="reset-button" onClick={handleResetLeaderboard}>Reset Leaderboard</button>
      </div>
    </>
  );
}

export default ScoreEntry;
