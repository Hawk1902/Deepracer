import { useState } from "react";
import { toast } from 'react-toastify';
import config from "../config/env";

import "../styles/scoreentry.scss";

function ScoreEntry() {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [evalCSV, setEvalCSV] = useState();
  const [trainingCSV, setTrainingCSV] = useState();
  const [evalLog, setEvalLog] = useState();

  // Added new state for error handling
  const [error, setError] = useState({
    name: "",
    time: "",
    evalCSV: "",
    trainingCSV: "",
    evalLog: "",
  });

  const handleEvalCSVChange = (e) => {
    // Added file type check for csv files
    if (e.target.files[0] && e.target.files[0].type !== "text/csv") {
      setError({
        ...error,
        evalCSV: "Invalid file type. Please upload a csv file.",
      });
    } else {
      setEvalCSV(e.target.files[0]);
      setError({ ...error, evalCSV: "" });
    }
  };

  const handleTrainingCSVChange = (e) => {
    // Added file type check for csv files
    if (e.target.files[0] && e.target.files[0].type !== "text/csv") {
      setError({
        ...error,
        trainingCSV: "Invalid file type. Please upload a csv file.",
      });
    } else {
      setTrainingCSV(e.target.files[0]);
      setError({ ...error, trainingCSV: "" });
    }
  };

  const handleEvalLogChange = (e) => {
    // Added file type check for log files
    if (e.target.files[0] && e.target.files[0].type === "text/plain") {
      setError({
        ...error,
        evalLog: "Invalid file type. Please upload a log file.",
      });
    } else {
      setEvalLog(e.target.files[0]);
      setError({ ...error, evalLog: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // validate before form submission
    if (
      !name ||
      !time ||
      !evalCSV ||
      !trainingCSV ||
      !evalLog
    ) {
      // Display error if any of the required fields are missing
      setError({
        name: name ? "" : "Model name is required.",
        time: time ? "" : "Time is required.",
        evalCSV: evalCSV ? "" : "Evaluation CSV is required.",
        trainingCSV: trainingCSV ? "" : "Training CSV is required.",
        evalLog: evalLog ? "" : "Evaluation log is required.",
      });
      return;
    }

    // Continue if no errors
    const data = new FormData();
    data.append("modelname", name);
    data.append("laptime", time);
    data.append("evalcsv", evalCSV);
    data.append("trainingcsv", trainingCSV);
    data.append("evallog", evalLog);

    // Post the data to the server
    fetch(`${config.local_ip_addr}/api/csv`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));

    // Reset the form fields
    setName("");
    setTime("");
  };

  const handleResetLeaderboard = (e) => {
    e.preventDefault();
    fetch(`${config.local_ip_addr}/api/score`, {
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
          <input
            placeholder="Model Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ borderColor: error.name ? "red" : "" }}
          />
          {error.name && <div className="error">{error.name}</div>}
          <input
            placeholder="Time in seconds"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            style={{ borderColor: error.time ? "red" : "" }}
          />
          {error.time && <div className="error">{error.time}</div>}
          <div className="score-form-input">
            <label>Evaluation CSV</label>
            <input
              type="file"
              onChange={handleEvalCSVChange}
              style={{ borderColor: error.evalCSV ? "red" : "" }}
            />
            {error.evalCSV && <div className="error">{error.evalCSV}</div>}
          </div>
          <div className="score-form-input">
            <label>Training CSV</label>
            <input
              type="file"
              onChange={handleTrainingCSVChange}
              style={{ borderColor: error.trainingCSV ? "red" : "" }}
            />
            {error.trainingCSV && (
              <div className="error">{error.trainingCSV}</div>
            )}
          </div>
          <div className="score-form-input">
            <label>Evaluation Log</label>
            <input
              type="file"
              onChange={handleEvalLogChange}
              style={{ borderColor: error.evalLog ? "red" : "" }}
            />
            {error.evalLog && <div className="error">{error.evalLog}</div>}
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
