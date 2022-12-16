import characterData from "./data.js"
import Character from "./Character.js"

const charContainer = document.querySelector(".char-container")
const welcomeMessage = document.getElementById("welcome-message")
const heroEl = document.getElementById("hero")
const monsterEl = document.getElementById("monster")
const endGameEl = document.getElementById("end-game")
const attackBtn = document.getElementById("attack-btn")
const playAgainBtn = document.getElementById("play-again-btn")

let hero

function setChooseHeroCard() {
    charContainer.classList.add("choose-hero")
    let option1 = new Character(characterData.wizard)
    let option2 = new Character(characterData.fairy)

    welcomeMessage.style.display = "block"

    heroEl.innerHTML = option1.getCharacterHtml()
    monsterEl.innerHTML = option2.getCharacterHtml()

    document.getElementById("actions").style.display = "none"

    heroEl.addEventListener("click", createHero)
    monsterEl.addEventListener("click", createHero)
}

function createHero(e) {
    if (e.target.closest("#hero")) {
        hero = new Character(characterData.wizard)
    }
    else if (e.target.closest("#monster") ) {
        hero = new Character(characterData.fairy)
    }
    heroEl.removeEventListener("click", createHero)
    monsterEl.removeEventListener("click", createHero)
    charContainer.classList.remove("choose-hero")
    welcomeMessage.style.display = "none"
    document.getElementById("actions").style.display = "flex"
    renderGame()
}

setChooseHeroCard()


let monstersArray = ["orc", "demon", "goblin"]

const getNewMonster = () => {
    const currentMonsterData = characterData[monstersArray.shift()]
    return currentMonsterData ? new Character(currentMonsterData) : {}
}
let currentMonster = getNewMonster()


function renderGame() {
    heroEl.innerHTML = hero.getCharacterHtml()
    monsterEl.innerHTML = currentMonster.getCharacterHtml()
    attackBtn.style.display = "block"
    attackBtn.disabled = false
}

attackBtn.addEventListener("click", attack)

function attack() {
    hero.setDiceRollHtml()
    currentMonster.setDiceRollHtml()
    hero.takeDemage(currentMonster.currentDiceRollArray)
    currentMonster.takeDemage(hero.currentDiceRollArray)
    renderGame()
    
    if (hero.dead) {
        heroEl.style.background = "#420000"
        heroEl.style.transition = "background-color 1.25s"

        endGame()
    }
    if (currentMonster.dead) {
        monsterEl.style.background = "#420000"
        monsterEl.style.transition = "background-color 1.25s"

        if (monstersArray.length === 0) {
            endGame()
        }
        else {
            attackBtn.disabled = true
            setTimeout(() => {
                monsterEl.style.background = "#231D24"
                monsterEl.style.transition = "none"
                currentMonster = getNewMonster()
                renderGame()}
            , 1500)
            
        }
    }
}

function endGame() {
    attackBtn.disabled = true

    const endMessage = hero.dead && currentMonster.dead ?
        "No victors - all creatures are dead" :
        hero.dead ? "The monsters are Victorious" :
        "The Hero Wins"
    const endEmoji = hero.dead ? "☠️" : "🔮"
    
    setTimeout(() => {
        document.body.classList.add("body-game-over");
        heroEl.style.display = "none"
        monsterEl.style.display = "none"
        endGameEl.innerHTML = `
            <h2 id="game-over">Game Over</h2> 
            <h3 class="end-message">${endMessage}</h3>
            <p class="end-emoji">${endEmoji}</p>
        `
        endGameEl.style.display = "block"
        attackBtn.style.display = "none"
        playAgainBtn.style.display = "block"
        playAgainBtn.disabled = false
        charContainer.style.display = "none"
    }, 1500)
}

playAgainBtn.addEventListener("click", playAgain)

function playAgain() {
    document.body.classList.remove("body-game-over");
    playAgainBtn.style.display = "none"
    charContainer.style.display = ""
    endGameEl.style.display = "none"
    heroEl.style.background = "#231d24"
    heroEl.style.transition = "none"
    monsterEl.style.background = "#231d24"
    monsterEl.style.transition = "none"
    heroEl.style.display = ""
    monsterEl.style.display = ""
    hero = {}
    monstersArray = ["orc", "demon", "goblin"]
    currentMonster = getNewMonster()
    setChooseHeroCard()
}
