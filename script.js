console.log("JS working!")

const cardSymbols = ["./data"]
let cards = []
let flippedCard = []
let matched = 0
let attempts = 0
let observationTimer = null
let remainingObservationTime = 30
let gameActive = false

//start Game:
function startGame() {
  cards = shuffle([...cardSymbols, ...cardSymbols])
  createCards(cards)
  revealAllCards()
  gameStarted = false
  matched = []
  attempts = 0
}
