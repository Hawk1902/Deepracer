import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addScore } from "../redux/scoreSlice";

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
  return (
    <div className="score-container">
      <form className="score-form" onSubmit={handleSubmit}>
        <div className="score-form-header">Enter Score</div>
        <input placeholder="Name" ref={nameRef} />
        <input placeholder="Time in seconds" ref={timeRef} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ScoreEntry;
