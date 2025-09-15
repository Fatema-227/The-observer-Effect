// Card data
const cardData = [
  { symbol: "🌟" },
  { symbol: "🚀" },
  { symbol: "🐱" },
  { symbol: "🐶" },
  { symbol: "🍎" },
  { symbol: "🍕" },
  { symbol: "⚽" },
  { symbol: "🎸" },
]

let cards = []
let flippedCards = []
let matchedPairs = 0
let attempts = 0
let observationTimer = null
let remainingObservationTime = 30
let gameActive = false

// Start the game
const startGame = () => {
  setupGame()
}

// Setup the game
const setupGame = () => {
  const pairedCards = []
  cardData.forEach((card) => {
    pairedCards.push({ ...card })
    pairedCards.push({ ...card })
  })

  cards = shuffle(pairedCards)
  createCards(cards)
  revealAllCards()
  gameActive = false
  matchedPairs = 0
  attempts = 0
  remainingObservationTime = 30
  flippedCards = []
  document.querySelector(".observation-mode").style.display = "block"
  updateUI()
  startObservationPeriod()
}

// Shuffle cards
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

// Create cards
const createCards = (cards) => {
  const gameBoard = document.getElementById("gameBoard")
  gameBoard.innerHTML = ""
  cards.forEach((card, index) => {
    const cardElement = document.createElement("div")
    cardElement.className = "card"
    cardElement.innerHTML = `
            <div class="front">${card.symbol}</div>
            <div class="back">${index + 1}</div>
        `
    cardElement.dataset.symbol = card.symbol
    cardElement.addEventListener("click", () => handleCardClick(cardElement))
    gameBoard.appendChild(cardElement)
  })
}

// Reveal all cards
const revealAllCards = () => {
  document.querySelectorAll(".card").forEach((card) => {
    card.classList.add("flipped")
  })
}

// Update UI
const updateUI = () => {
  document.getElementById("attempts").textContent = attempts
  document.getElementById("pairs").textContent = matchedPairs
  document.getElementById("timer").textContent = remainingObservationTime
}

// Start observation period
const startObservationPeriod = () => {
  observationTimer = setInterval(() => {
    remainingObservationTime--
    updateUI()
    if (remainingObservationTime <= 0) {
      clearInterval(observationTimer)
      endObservationPeriod()
    }
  }, 1000)
}

// End observation period
const endObservationPeriod = () => {
  document.querySelectorAll(".card").forEach((card) => {
    card.classList.remove("flipped")
  })
  gameActive = true
  document.querySelector(".observation-mode").style.display = "none"
}

// Handle card click
const handleCardClick = (card) => {
  if (
    !gameActive ||
    card.classList.contains("flipped") ||
    flippedCards.length === 2
  )
    return

  card.classList.add("flipped")
  flippedCards.push(card)

  if (flippedCards.length === 2) {
    attempts++
    updateUI()
    setTimeout(checkMatch, 600)
  }
}

// Check for match
const checkMatch = () => {
  const [card1, card2] = flippedCards

  if (card1.dataset.symbol === card2.dataset.symbol) {
    card1.classList.add("matched")
    card2.classList.add("matched")
    matchedPairs++
    updateUI()

    if (matchedPairs === cardData.length) {
      endGame()
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped")
      card2.classList.remove("flipped")
    }, 1000)
  }
  flippedCards = []
}

// End the game
const endGame = () => {
  setTimeout(() => {
    alert(
      `🎉 Game Over! You found ${matchedPairs} pairs in ${attempts} attempts!`
    )
  }, 500)
  gameActive = false
}

// Reset the game
const resetGame = () => {
  if (observationTimer) {
    clearInterval(observationTimer)
  }
  remainingObservationTime = 30
  startGame()
}

// Initialize events when page loads
document.addEventListener("DOMContentLoaded", function () {
  const restartBtn = document.getElementById("restartBtn")
  if (restartBtn) {
    restartBtn.addEventListener("click", resetGame)
  }
})
