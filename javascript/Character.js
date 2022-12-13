import {getDicePlaceholders, getDiceRollArray} from "./index.js"

class Character {
    constructor(data) {
        Object.assign(this, data)
        this.diceRollHtml = getDicePlaceholders(this.diceCount)
        this.maxHealth = this.health
    }

    setDiceRollHtml() {
        this.currentDiceRollArray = getDiceRollArray(this.diceCount)
        this.diceRollHtml = this.currentDiceRollArray.map( (num) => 
            `<div class="dice">${num}</div>` ).join("")
        return this.diceRollHtml
    }

    takeDemage(scoreArray) {
        this.demage = scoreArray.reduce( (total, dice) => total + dice)
        this.health -= this.demage
        if (this.health <= 0) {
            this.death = true
            this.health = 0
        }
    }

    getHealthBar() {
        this.lifePercentage = this.health / this.maxHealth * 100
        this.ifDanger = this.lifePercentage <= 25 ? "danger" : ""
        this.healthBarHtml = `
            <div class="health-bar-inner ${this.ifDanger}" 
                style="width:${this.lifePercentage}%;">
            </div>
        `
        return this.healthBarHtml
    }

    getCharacterCardHtml() {
        return `
            <h3 class="char-name">${this.name}</h3>
            <img class="char-avatar" src="${this.avatar}" alt="picture of ${this.name}">
            <p class="health">health: <strong>${this.health}</strong></p>
            <div class="health-bar-outer">
                ${this.getHealthBar()}
            </div>
            <div class="dice-container">
            ${this.diceRollHtml}
            </div>
        `
    }
}

export default Character