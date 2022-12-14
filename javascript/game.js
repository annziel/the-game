import characterData from "./data.js"
import Character from "./Character.js"


const attackBtn = document.getElementById("attack-btn")
const playAgainBtn = document.getElementById("play-again-btn")




let hero = new Character(characterData.wizard)
let monstersArray = ["orc", "demon", "goblin"]

const getNewMonster = () => {
    const currentMonsterData = characterData[monstersArray.shift()]
    return currentMonsterData ? new Character(currentMonsterData) : {}
}
let currentMonster = getNewMonster()

function renderGame() {
    document.getElementById("hero").innerHTML = hero.getCharacterHtml()
    document.getElementById("monster").innerHTML = currentMonster.getCharacterHtml()
    attackBtn.disabled = false
}

renderGame()


attackBtn.addEventListener("click", attack)

function attack() {
    hero.setDiceRollHtml()
    currentMonster.setDiceRollHtml()
    hero.takeDemage(currentMonster.currentDiceRollArray)
    currentMonster.takeDemage(hero.currentDiceRollArray)
    renderGame()
    
    if (hero.dead) {
        document.getElementById("hero").style.background = "#420000"
        document.getElementById("hero").style.transition = "background-color 1.75s"

        endGame()
    }
    if (currentMonster.dead) {
        document.getElementById("monster").style.background = "#420000"
        document.getElementById("monster").style.transition = "background-color 1.75s"

        if (monstersArray.length === 0) {
            endGame()
        }
        else {
            attackBtn.disabled = true
            setTimeout(() => {
                document.getElementById("monster").style.background = "#231D24"
                document.getElementById("monster").style.transition = "none"
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
        document.querySelector("main").innerHTML = `
            <div class="end-game">
                <h2>Game Over</h2> 
                <h3 class="end-message">${endMessage}</h3>
                <p class="end-emoji">${endEmoji}</p>
            </div>
        `
        attackBtn.style.display = "none"
        playAgainBtn.style.display = "block"
        playAgainBtn.disabled = false

    }, 2000)

}

playAgainBtn.addEventListener("click", playAgain)

function playAgain() {
    document.getElementById("play-again-btn").style.display = "none"
    attackBtn.style.display = "block"
    document.querySelector("main").innerHTML = `
        <div id="hero"></div>
        <div id="monster"></div>
    `
    hero = new Character(characterData.wizard)
    monstersArray = ["orc", "demon", "goblin"]
    currentMonster = getNewMonster()
    renderGame()
}