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
  console.log({allScores});


  return (
    <>
      <div className="score-container">
        <form className="score-form" onSubmit={handleSubmit}>
          <div className="score-form-header">Enter Score</div>
          <input placeholder="Model Name" ref={nameRef} />
          <input placeholder="Time in seconds" ref={timeRef} />
          <div className="score-form-input">
            <label for="">Evaluation CSV</label>
            <input type="file" onChange={() => console.log("afsas")} />
          </div>
          <div className="score-form-input">
            <label for="">Training CSV</label>
            <input type="file" onChange={() => console.log("afsas")} />
          </div>
          <div className="score-form-input">
            <label for="">Evaluation Logs</label>
            <input type="file" onChange={() => console.log("afsas")} />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default ScoreEntry;
