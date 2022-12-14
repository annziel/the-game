import characterData from "./data.js"
import Character from "./Character.js"

const main = document.querySelector("main")
const welcomeMessage = document.getElementById("welcome-message")
const heroEl = document.getElementById("hero")
const monsterEl = document.getElementById("monster")
const endGameEl = document.getElementById("end-game")
const attackBtn = document.getElementById("attack-btn")
const playAgainBtn = document.getElementById("play-again-btn")

let hero

function setChooseHeroCard() {
    main.classList = "choose-hero"
    let option1 = new Character(characterData.wizard)
    let option2 = new Character(characterData.fairy)

    welcomeMessage.style.display = "block"

    heroEl.innerHTML = `<div class="hero-option" id="option1">${option1.getCharacterHtml()}</div>`
    monsterEl.innerHTML = `<div class="hero-option" id="option2">${option2.getCharacterHtml()}</div>`

    attackBtn.style.display = "none"

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
    welcomeMessage.style.display = "none"
    main.classList.remove("choose-hero")
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
        heroEl.style.transition = "background-color 1.75s"

        endGame()
    }
    if (currentMonster.dead) {
        monsterEl.style.background = "#420000"
        monsterEl.style.transition = "background-color 1.75s"

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
            , 2000)
            
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
        heroEl.style.display = "none"
        monsterEl.style.display = "none"
        endGameEl.innerHTML = `
            <h2>Game Over</h2> 
            <h3 class="end-message">${endMessage}</h3>
            <p class="end-emoji">${endEmoji}</p>
        `
        endGameEl.style.display = "block"
        attackBtn.style.display = "none"
        playAgainBtn.style.display = "block"
        playAgainBtn.disabled = false
    }, 2000)

}

playAgainBtn.addEventListener("click", playAgain)

function playAgain() {
    playAgainBtn.style.display = "none"
    endGameEl.style.display = "none"
    heroEl.style.background = "#231d24"
    monsterEl.style.background = "#231d24"
    heroEl.style.display = "block"
    monsterEl.style.display = "block"
    hero = {}
    monstersArray = ["orc", "demon", "goblin"]
    currentMonster = getNewMonster()
    setChooseHeroCard()
}
