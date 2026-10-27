import { useState } from 'react'
import './App.css'

// Square：展示一个格子，无自身状态，值由 Board 通过 props 传入
function Square({ value, onSquareClick, isWinning }) {
  return (
    <button
      type="button"
      className={'square' + (isWinning ? ' winning' : '')}
      onClick={onSquareClick}
    >
      {value}
    </button>
  )
}

// Board：渲染九宫格，接收 squares 数组与点击回调
function Board({ squares, onSquareClick, winLine }) {
  const rows = []
  for (let r = 0; r < 3; r++) {
    const cols = []
    for (let c = 0; c < 3; c++) {
      const i = r * 3 + c
      cols.push(
        <Square
          key={i}
          value={squares[i]}
          isWinning={winLine ? winLine.includes(i) : false}
          onSquareClick={() => onSquareClick(i)}
        />,
      )
    }
    rows.push(
      <div key={r} className="board-row">
        {cols}
      </div>,
    )
  }
  return <div>{rows}</div>
}

// calculateWinner：返回胜者与获胜连线（或 null）
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (const line of lines) {
    const [a, b, c] = line
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line }
    }
  }
  return { winner: null, line: null }
}

// Game：顶层持有 history（棋盘快照数组），时间旅行靠 history[currentMove] 回退
function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]
  const { winner, line } = calculateWinner(currentSquares)

  function handleSquareClick(i) {
    // 已决出胜负或当前格已有棋子则忽略
    if (winner || currentSquares[i]) return
    // 不可变更新：复制当前快照，而不是修改原数组
    const nextSquares = currentSquares.slice()
    nextSquares[i] = xIsNext ? 'X' : 'O'
    // 从回退点继续下时，丢掉之后的旧历史
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(move) {
    setCurrentMove(move)
  }

  const isFull = currentSquares.every((v) => v !== null)
  const status = winner
    ? `胜者：${winner}`
    : isFull
      ? '平局'
      : `下一步：${xIsNext ? 'X' : 'O'}`

  // 历史按钮：回到第 n 步
  const moves = history.map((squares, move) => {
    const desc = move === 0 ? '回到开局' : `回到第 ${move} 步`
    return (
      <li key={move}>
        <button type="button" className="history-btn" onClick={() => jumpTo(move)}>
          {desc}
        </button>
      </li>
    )
  })

  return (
    <div className="game">
      <h1>井字棋</h1>
      <div className="game-board">
        <Board squares={currentSquares} onSquareClick={handleSquareClick} winLine={line} />
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

export default Game
