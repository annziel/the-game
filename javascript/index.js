import characterData from "./data.js"

class Character {
    constructor(data) {
        Object.assign(this, data)
    }

    getCharacterCardHtml() {
        return `
            <div class="character-card">
                <h3 class="char-name">${this.name}</h3>
                <img class="char-avatar" src="${this.avatar}" alt="picture of ${this.name}">
                <p class="health">health: <strong>${this.health}</strong></p>
                <div class="health-bar-outer">
                    <div class="health-bar-inner">
                    </div>
                </div>
                <div class="dice-container">
                </div>
            </div>
        `
    }
}


const hero = new Character(characterData.hero)
const monstersArray = ["orc", "demon", "goblin"]

const getNewMonster = () => {
    const currentMonsterData = characterData[monstersArray.shift()]
    return currentMonsterData ? new Character(currentMonsterData) : {}
}
const currentMonster = getNewMonster()

function render() {
    document.getElementById("hero").innerHTML = hero.getCharacterCardHtml()
    document.getElementById("monster").innerHTML = currentMonster.getCharacterCardHtml()
}

render()