import characterData from "./data.js"
import Character from "./Character.js"

export {getDicePlaceholders, getDiceRollArray}

function getDicePlaceholders(diceCount) {
    const dicePlaceholders = new Array(diceCount).fill(0).map( 
        () => `<div class="dice-placeholder"></div>` ).join("")
    return dicePlaceholders
}

const getDiceRollArray = (diceCount) => {
    let diceRollArray = []
    for (let i = 1; i <= diceCount; i++) {
        diceRollArray.push(diceRoll())
    }
    return diceRollArray
}

const diceRoll = () => Math.floor(Math.random() * 6 ) + 1


const hero = new Character(characterData.hero)
const monstersArray = ["orc", "demon", "goblin"]

const getNewMonster = () => {
    const currentMonsterData = characterData[monstersArray.shift()]
    return currentMonsterData ? new Character(currentMonsterData) : {}
}
const currentMonster = getNewMonster()

function attack() {
    hero.setDiceRollHtml()
    currentMonster.setDiceRollHtml()
    hero.takeDemage(currentMonster.currentDiceRollArray)
    currentMonster.takeDemage(hero.currentDiceRollArray)
    render()
}

function render() {
    document.getElementById("hero").innerHTML = hero.getCharacterCardHtml()
    document.getElementById("monster").innerHTML = currentMonster.getCharacterCardHtml()
}

render()

document.getElementById("attack-btn").addEventListener("click", attack)
