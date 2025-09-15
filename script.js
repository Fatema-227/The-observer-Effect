console.log("JS working!")

let cardData = []
let cards = []
let flippedCards = []
let matchedPairs = 0
let attempts = 0
let observationTimer = null
let remainingObservationTime = 30
let gameActive = false

//show pages
const showPage = (pageId) => {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active")
  })
  document.getElementById(pageId).classList.add("active")

  if (pageId === "game") {
    startGame()
  }
}

//Toggle dark mode
const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode")
  const themeToggle = document.querySelector(".theme-toggle")
  themeToggle.textContent = document.body.classList.contains("dark-mode")
    ? "☀️"
    : "🌙"
  localStorage.setItem(
    "darkMode",
    document.body.classList.contains("dark-mode")
  )
}
// Start Game
const startGame = () => {
  if (cardData.length === 0) {
    fetch("./data/cards.json")
      .then((response) => response.json())
      .then((data) => {
        cardData = data
        setupGame()
      })
  } else {
    setupGame()
  }
}

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

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

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

const revealAllCards = () => {
  document.querySelectorAll(".card").forEach((card) => {
    card.classList.add("flipped")
  })
}

const updateUI = () => {
  document.getElementById("attempts").textContent = attempts
  document.getElementById("pairs").textContent = matchedPairs
  document.getElementById("timer").textContent = remainingObservationTime
}

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

const endObservationPeriod = () => {
  document.querySelectorAll(".card").forEach((card) => {
    card.classList.remove("flipped")
  })
  gameActive = true
  document.querySelector(".observation-mode").style.display = "none"
}

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

const endGame = () => {
  setTimeout(() => {
    alert(
      `🎉 Game Over! You found ${matchedPairs} pairs in ${attempts} attempts!`
    )
  }, 500)
  gameActive = false
}

const resetGame = () => {
  if (observationTimer) {
    clearInterval(observationTimer)
  }
  remainingObservationTime = 30
  startGame()
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("restartBtn").addEventListener("click", resetGame)
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode")
    document.querySelector(".theme-toggle").textContent = "☀️"
  }
})
