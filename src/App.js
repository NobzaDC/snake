import React from 'react'

import './App.css'

const DEFAULT_DIMENSIONS = 10

function createBoard(size) {
	let board = []

	for (let index = 0; index < size; index++) {
		let row = []
		for (let index = 0; index < size; index++) {
			row.push(0)
		}
		board.push(row)
	}

	return board
}

const DIRECTIONS = {
	LEFT: 'LEFT',
	RIGHT: 'RIGHT',
	UP: 'UP',
	DOWN: 'DOWN',
}

const INITIAL_CELL = [1, 1]

const INITIAL_SNAKE = {
	position: [INITIAL_CELL],
	head: INITIAL_CELL,
	direction: DIRECTIONS.RIGHT,
}

function moveSnake(snake) {

}

// if position contains x and y return true
function validateSquare(snake, x, y) { 
	const validation =
		snake.position.filter((coords) => coords[0] === x && coords[1] === y)
			.length >= 1
	return validation
}

function Board() {
	const [snake, setSnake] = React.useState(INITIAL_SNAKE)

	const mBoard = createBoard(DEFAULT_DIMENSIONS)

	console.log(mBoard)

	return (
		<div className="board_container">
			{mBoard.map((rowInfo, rowIndex) => {
				return (
					<div className="row" key={Math.random()}>
						{rowInfo.map((x, squareIndex) => {
							const isSnake = validateSquare(
								snake,
								Number(rowIndex),
								Number(squareIndex)
							)
							return (
								<div
									className={`square ${isSnake ? 'is-snake' : ''}`}
									key={Math.random()}
								></div>
							)
						})}
					</div>
				)
			})}
		</div>
	)
}

function App() {
	return <Board />
}

export default App
