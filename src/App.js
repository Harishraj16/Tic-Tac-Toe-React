import React, { useState } from 'react';
import './App.css';

function App() {
  const size = 3;

  const [arr, setArr] = useState(Array(size).fill().map(() => Array(size).fill(' ')));
  const [turn, setTurn] = useState(1); // 1 for X's turn, 0 for O's turn
  const [win, setWin] = useState(-1);  // -1 for no winner, 1 for X, 2 for O

  function changevalue(x, y) {
    if (arr[x][y] !== ' ' || win !== -1) return; // Don't allow move if cell is filled or game is over
    const newArr = [...arr];
    newArr[x][y] = turn === 1 ? 'X' : 'O';
    setArr(newArr);
    setTurn(turn === 1 ? 0 : 1);
    checkwin(newArr);
  }

  function checkwin(newArr) {
    let sum = Array(size + 1).fill().map(() => Array(2).fill(0));

    // Calculate row and column sums
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        let val = (newArr[i][j] === 'X' ? 7 : (newArr[i][j] === 'O' ? 11 : 0));
        sum[i][0] += val; // Row sum
        sum[j][1] += val; // Column sum
        if (i === j) sum[size][0] += val; // Diagonal
        if (i + j === size - 1) sum[size][1] += val; // Anti-diagonal
      }
    }
    console.table(sum);
    // Check for winner
    for (let i = 0; i < size + 1; i++) {
      for (let j = 0; j < 2; j++) {
        if (sum[i][j] === size*7) {
          setWin(1); // X wins
          return;
        } else if (sum[i][j] === size * 11) {
          setWin(2); // O wins
          return;
        }
      }
    }
  }

  return (
    <div className="outer">
      <div className="turn">{win === -1 ? (turn === 1 ? "X's Turn" : "O's Turn") : <h3 style={{color: "green"}}>Winner: {win === 1 ? 'X' : 'O'}</h3>}</div>
      <div className="inner">
        <button onClick={() => changevalue(0, 0)}>{arr[0][0]}</button>
        <button onClick={() => changevalue(0, 1)}>{arr[0][1]}</button>
        <button onClick={() => changevalue(0, 2)}>{arr[0][2]}</button>
      </div>
      <div className="inner">
        <button onClick={() => changevalue(1, 0)}>{arr[1][0]}</button>
        <button onClick={() => changevalue(1, 1)}>{arr[1][1]}</button>
        <button onClick={() => changevalue(1, 2)}>{arr[1][2]}</button>
      </div>
      <div className="inner">
        <button onClick={() => changevalue(2, 0)}>{arr[2][0]}</button>
        <button onClick={() => changevalue(2, 1)}>{arr[2][1]}</button>
        <button onClick={() => changevalue(2, 2)}>{arr[2][2]}</button>
      </div>
    </div>
  );
}

export default App;
