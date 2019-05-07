import React from 'react';


function Score(props) {
  var title = Object.keys(props.score);
  var { scoreToShow , score , player} = props;
  var playerName = player === scoreToShow+1 ? "Your score:" : "Opponent score:";
  return (
    <div className="score">
      <h3 className="score-name">
        {playerName}
      </h3>
      <div className="score-result">
        {score[title[scoreToShow]]}
      </div>
    </div>
  )
}

export default Score;