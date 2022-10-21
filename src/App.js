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
	LEFT: 'ArrowLeft',
	RIGHT: 'ArrowRight',
	UP: 'ArrowUp',
	DOWN: 'ArrowDown',
}

const INITIAL_CELL = [1, 1]

const INITIAL_SNAKE = {
	position: [INITIAL_CELL],
	head: INITIAL_CELL,
	direction: DIRECTIONS.RIGHT,
}

function moveSnake(snake) {
	if (snake === null) throw 'snake is required, actual type: ' + typeof snake

	const lastSnakeValue = snake.position[snake.position.length - 1]
	let newHeadPositon

	if (snake.direction === DIRECTIONS.UP)
		newHeadPositon = [snake.head[0] - 1, snake.head[1]]
	else if (snake.direction === DIRECTIONS.RIGHT)
		newHeadPositon = [snake.head[0], snake.head[1] + 1]
	else if (snake.direction === DIRECTIONS.DOWN)
		newHeadPositon = [snake.head[0] + 1, snake.head[1]]
	else if (snake.direction === DIRECTIONS.LEFT)
		newHeadPositon = [snake.head[0], snake.head[1] - 1]

	let newPosition = snake.position.filter(
		(coords) => coords[0] !== lastSnakeValue[0] && coords !== lastSnakeValue[1]
	)
	newPosition = [newHeadPositon, ...newPosition]

	let newSnake = {
		...snake,
		head: newHeadPositon,
		position: newPosition,
	}
	return newSnake
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

  console.log(snake)

	React.useEffect(() => {
		document.addEventListener('keydown', (event) => {
			const keyCode = event.code

			if (
				!(
					keyCode === DIRECTIONS.UP ||
					keyCode === DIRECTIONS.RIGHT ||
					keyCode === DIRECTIONS.DOWN ||
					keyCode === DIRECTIONS.LEFT
				)
			)
				return

			setSnake(last => ({ ...last, direction: keyCode }))
		})
	}, [])

	const mBoard = createBoard(DEFAULT_DIMENSIONS)

	const manualMove = () => {
		setSnake(moveSnake(snake))
	}

	return (
		<>
			<button type="button" onClick={manualMove}>
				Manual move
			</button>
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
		</>
	)
}

function App() {
	return <Board />
}

export default App
