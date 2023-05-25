import TimeFormat from "hh-mm-ss";

import deepracer from "../assets/deepracer.png";
import rmit from "../assets/rmit.png";
import car from "../assets/car.png";
import "../styles/leaderboard.scss";
import { useSelector } from "react-redux";

function Leaderboard() {
  const allScores = useSelector((state) => state.score.scores);

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-title">
        <img src={deepracer} alt="deepracer logo" className="deepracerLogo" />
        <img src={rmit} alt="rmit logo" className="leaderboard-rmit-logo" />
        <img src={car} alt="deepracer car" />
      </div>
      <div className="leaderboard-table">
        <div className="leaderboard-header">
          <div>Position</div>
          <div>Racer</div>
          <div>Time</div>
          <div>Gap to 1st</div>
        </div>
        <div className="leaderboard-ranking">
          {allScores.map(({ name, time }, i) => {
            return (
              <div className="leaderboard-row" key={i}>
                <div>{`#${i + 1}`}</div>
                <div>{name}</div>
                <div>{TimeFormat.fromMs(Number(time * 1000), "mm:ss.sss")}</div>
                <div>-</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
