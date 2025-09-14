console.log("JS working!")

let cardData = []
let cards = []
let flippedCards = []
let matchedPairs = 0
let attempts = 0
let observationTimer = null
let remainingObservationTime = 30
let gameActive = false

//Download card data from a file:
fetch("./data/cards.json")
.then((response) => response.json())
.then((data) => {
cardData = data
startGame()
  })

//start Game:
const startGame() {
  const pairedCards = []
  cardData.forEach((cards) => {
  pairedCards.push({ ...cards })
  pairedCards.push({ ...cards })
  })
  cards = shuffle(pairedCards)
  createCards(cards)
  revealAllCards()
  gameActive = false
  matchedPairs = 0
  attempts = 0
  updateUI()
  startObservationPeriod()
}

//قلب البطاقات
const handleCardClick=>(cards) {
  if (!gameActive) return
  if (cards.classList.contains("flippedCard") || flippedCard.length === 2)
    return

  card.classList.add("flippedCard")
  flippedCard.push(cards)

  if (flippedCard.length === 2) {
    attempts++
    updateUI()
    setTimeout(checkMatch, 600)
  }
}
//End the game:
const endGame() {
  clearInterval(gameTimer)
  setTimeout(() => {
    alert(`Game Over! You found ${matchedPairs} pairs in ${attempts} attempts!`)
  }, 500)
  gameActive = false
  //return the game :
const resetGame() {
    if (observationTimer) {
      clearInterval(observationTimer)
    }
    const timerDisplay = document.querySelector(".observation-timer")
    if (timerDisplay) {
      timerDisplay.remove()
    }
    remainingObservationTime = 30
    startGame()
  }
  document.getElementById("restartBtn").addEventListener("click", resetGame)
}
