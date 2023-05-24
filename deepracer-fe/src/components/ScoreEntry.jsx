import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addScore } from "../redux/scoreSlice";

import { useSelector } from "react-redux";

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

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addScore({ name: nameRef.current.value, time: timeRef.current.value })
    );
    
    const data = new FormData();
    // if (nameRef.current.value) 
    data.append("modelname", nameRef.current.value);
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

  const allScores = useSelector((state) => state.score.scores);
  console.log({allScores});

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
    </>
  );
}

export default ScoreEntry;
