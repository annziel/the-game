import characterData from "./data.js"

class Character {
    constructor(data) {
        Object.assign(this, data)
        this.diceRollHtml = getDicePlaceholders(this.diceCount)
    }

    setDiceRollHtml() {
        this.diceRollArray = getDiceRollArray(this.diceCount)
        this.diceRollHtml = this.diceRollArray.map( (num) => 
            `<div class="dice">${num}</div>` ).join("")
        return this.diceRollHtml
    }

    getCharacterCardHtml() {
        return `
            <h3 class="char-name">${this.name}</h3>
            <img class="char-avatar" src="${this.avatar}" alt="picture of ${this.name}">
            <p class="health">health: <strong>${this.health}</strong></p>
            <div class="health-bar-outer">
                <div class="health-bar-inner">
                </div>
            </div>
            <div class="dice-container">
            ${this.diceRollHtml}
            </div>
        `
    }
}

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
    render()
}

function render() {
    document.getElementById("hero").innerHTML = hero.getCharacterCardHtml()
    document.getElementById("monster").innerHTML = currentMonster.getCharacterCardHtml()
}

render()

document.getElementById("attack-btn").addEventListener("click", attack)
