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
