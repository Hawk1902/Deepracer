import deepracer from "../assets/deepracer.png";
import rmit from "../assets/rmit.png";
import car from "../assets/car.png";
import "../styles/leaderboard.scss";

function Leaderboard() {
  return (
    <div className="leaderboard-container">
      <div className="leaderboard-title">
        <img src={deepracer} alt="deepracer logo" />
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
          <div className="leaderboard-row first">
            <div>#1</div>
            <div>Mario</div>
            <div>00:09:090</div>
            <div>-</div>
          </div>
          <div className="leaderboard-row second">
            <div>#2</div>
            <div>Will</div>
            <div>00:10:200</div>
            <div>+00:00:020</div>
          </div>
          <div className="leaderboard-row third">
            <div>#3</div>
            <div>Elenor</div>
            <div>00:11:350</div>
            <div>+00:00:020</div>
          </div>
          <div className="leaderboard-row participant">
            <div>#4</div>
            <div>Vito</div>
            <div>00:14:200</div>
            <div>+00:00:020</div>
          </div>
          <div className="leaderboard-row participant">
            <div>#5</div>
            <div>Noah</div>
            <div>00:15:789</div>
            <div>+00:00:020</div>
          </div>
          <div className="leaderboard-row participant">
            <div>#6</div>
            <div>Foo</div>
            <div>00:17:180</div>
            <div>+00:00:020</div>
          </div>
          <div className="leaderboard-row participant">
            <div>#7</div>
            <div>Qwerty</div>
            <div>00:18:470</div>
            <div>+00:00:020</div>
          </div>
          <div className="leaderboard-row participant">
            <div>#8</div>
            <div>Slowbro</div>
            <div>00:20:980</div>
            <div>+00:00:020</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
