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
function startGame() {
  const pairedCards = []
  cardData.forEach((cards) => {
    pairedCards.push({ ...cards })
    pairedCards.push({ ...cards })
  })
  cards = shuffle(pairedCards)
  createCards(cards)
  revealAllCards()
  gameActive = false
  matched = []
  attempts = 0
  updateUI()
}

//قلب البطاقات
function handleCardClick(cards) {
  if (!gameStarted) return
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
