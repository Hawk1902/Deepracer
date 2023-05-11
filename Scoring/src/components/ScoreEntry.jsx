import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addScore } from "../redux/scoreSlice";

import { useSelector } from "react-redux";

import "../styles/scoreentry.scss";

function ScoreEntry() {
  const nameRef = useRef();
  const timeRef = useRef();

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addScore({ name: nameRef.current.value, time: timeRef.current.value })
    );
    nameRef.current.value = "";
    timeRef.current.value = "";
  };

  const allScores = useSelector((state) => state.score.scores);
  console.log({ allScores });

  const handleCSVDownload = () => {
    const blob = new Blob(allScores, { type: "text/json" });
    const a = document.createElement("a");
    a.download = "scores.json";
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };
  return (
    <>
      <div className="score-container">
        <form className="score-form" onSubmit={handleSubmit}>
          <div className="score-form-header">Enter Score</div>
          <input placeholder="Name" ref={nameRef} />
          <input placeholder="Time in seconds" ref={timeRef} />
          <button type="submit">Submit</button>
        </form>
      </div>
      {allScores.length !== 0 && (
        <div className="download-container">
          <button onClick={handleCSVDownload}>Download</button>
        </div>
      )}
    </>
  );
}

export default ScoreEntry;
