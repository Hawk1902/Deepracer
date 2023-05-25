import { useState } from "react"; // Changed useRef to useState to make the inputs controlled
import { useDispatch } from "react-redux";
import { addScore } from "../redux/scoreSlice";
import { useSelector } from "react-redux";
import "../styles/scoreentry.scss";
import MapDrop from "./MapDrop";

function ScoreEntry() {
  const [name, setName] = useState(""); // Use state instead of ref
  const [time, setTime] = useState(""); // Use state instead of ref
  const [evalCSV, setEvalCSV] = useState();
  const [trainingCSV, setTrainingCSV] = useState();
  const [evalLog, setEvalLog] = useState();
  const [selectedMap, setSelectedMap] = useState("");

  // Added new state for error handling
  const [error, setError] = useState({
    name: "",
    time: "",
    evalCSV: "",
    trainingCSV: "",
    evalLog: "",
    selectedMap: "",
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
    if (e.target.files[0] && e.target.files[0].type !== "text/plain") {
      setError({
        ...error,
        evalLog: "Invalid file type. Please upload a log file.",
      });
    } else {
      setEvalLog(e.target.files[0]);
      setError({ ...error, evalLog: "" });
    }
  };

  const handleMapChange = (e) => {
    setSelectedMap(e.target.value);
    setError({ ...error, selectedMap: "" }); // Clear selectedMap error when a map is selected
  };

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Added validation check before form submission
    if (
      !name ||
      !time ||
      !evalCSV ||
      !trainingCSV ||
      !evalLog ||
      !selectedMap
    ) {
      // Display error if any of the required fields are missing
      setError({
        name: name ? "" : "Model name is required.",
        time: time ? "" : "Time is required.",
        evalCSV: evalCSV ? "" : "Evaluation CSV is required.",
        trainingCSV: trainingCSV ? "" : "Training CSV is required.",
        evalLog: evalLog ? "" : "Evaluation log is required.",
        selectedMap: selectedMap ? "" : "Map selection is required.",
      });
      return;
    }

    // Continue if no errors
    dispatch(addScore({ name, time }));
    const data = new FormData();
    data.append("modelname", name);
    data.append("evalcsv", evalCSV);
    data.append("trainingcsv", trainingCSV);
    data.append("evallog", evalLog);
    data.append("selectedMap", selectedMap);

    // Post the data to the server
    fetch("http://localhost:4000/api/csv", {
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

  const allScores = useSelector((state) => state.score.scores);
  console.log({ allScores });

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
          <MapDrop
            selectedMap={selectedMap}
            handleMapChange={handleMapChange}
            style={{ borderColor: error.selectedMap ? "red" : "" }}
          />
          {error.selectedMap && (
            <div className="error">{error.selectedMap}</div>
          )}
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default ScoreEntry;
