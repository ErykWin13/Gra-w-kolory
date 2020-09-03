const yourMoneyInfo = document.querySelector('.your-money h3 span');
const buttonAddMoney = document.querySelector('.your-money button');
const amountInput = document.querySelector('.amount');
const colorSelect = document.querySelector('.colors');
const gameColors = [...document.querySelectorAll('.game-color')];
const buttonStartGame = document.querySelector('.submit-button');
const liElement = document.querySelector('li');
const allGames = document.querySelector('.all-games span')
const winGames = document.querySelector('.wins span')
const lossGames = document.querySelector('.losses span')

let yourMoney = 0;
let winningColor = '';
let inputValue = '';
let colorSelectValue = '';
let index = 0;

const gameResults = {
    allChoices: 0,
    goodChoices: 0,
    badChoices: 0,
}



// ADD MONEY FUNCTION 

const addMoneyFunction = () => {
    yourMoney = yourMoney + 25;
    yourMoneyInfo.textContent = yourMoney;
}


// INPUT FUNCTION 

const inputFunction = (event) => {
    inputValue = event.target.value;
}


// SELECT COLOR FUNCTION 

const selectColorFunction = (event) => {
    colorSelectValue = event.target.value;
    gameColors.forEach((color) => {
        color.style.border = '2px solid gray'
    })
    if (colorSelectValue === 'czerwony') {
        gameColors[0].style.border = "5px solid gray";
    }
    if (colorSelectValue === 'czarny') {
        gameColors[1].style.border = "5px solid gray";
    }
    if (colorSelectValue === 'zielony') {
        gameColors[2].style.border = "5px solid gray";
    }
    if (colorSelectValue === 'niebieski') {
        gameColors[3].style.border = "5px solid gray";
    }
}


// ACCOUNT LOSS FUNCTION 

const accountLossFunction = () => {
    yourMoneyInfo.textContent = yourMoney - inputValue;
}


// COLOR ROLL FUCNTION 

const colorRollFunction = () => {
    index = Math.floor(Math.random() * gameColors.length);
    winningColor = gameColors[index].dataset.color;
}


// WINNER SELECT FUNCTION 

const winnerSelectFunction = () => {
    document.querySelector('.game h4 span').textContent = winningColor;
    gameColors.forEach((color) => {
        color.style.border = '2px solid gray';
    })
    gameColors[index].style.border = '5px solid goldenrod';
    if (winningColor === 'red' && colorSelectValue === 'czerwony') {
        yourMoney = yourMoney + inputValue / 1;
        gameResults.goodChoices++;
        gameResults.allChoices++;
        return 'Win';
    } else if (winningColor === 'black' && colorSelectValue === 'czarny') {
        yourMoney = yourMoney + inputValue / 1;
        gameResults.goodChoices++
        gameResults.allChoices++
        return 'Win';
    } else if (winningColor === 'green' && colorSelectValue === 'zielony') {
        yourMoney = yourMoney + inputValue / 1;
        gameResults.goodChoices++
        gameResults.allChoices++
        return 'Win';
    } else if (winningColor === 'blue' && colorSelectValue === 'niebieski') {
        yourMoney = yourMoney + inputValue / 1;
        gameResults.goodChoices++;
        gameResults.allChoices++;
        return 'Win';
    } else {
        yourMoney = yourMoney - inputValue / 1;
        gameResults.allChoices++;
        gameResults.badChoices++;
        return 'Loss';
    }
}


// YOUR MONEY FUNCTION 

const yourMoneyFunction = () => {
    yourMoneyInfo.textContent = yourMoney;
}

const ulFunction = (playGame) => {
    if (playGame === 'Win') {
        liElement.textContent = `Wygrałeś/aś ${inputValue} JSD!`;
        liElement.style.color = 'green';
    } else {
        liElement.textContent = `Przegrałeś/aś ${inputValue} JSD!`;
        liElement.style.color = 'red';
    }
}


// STATS FUNCTION 

const statsFunction = () => {
    allGames.textContent = gameResults.allChoices;
    winGames.textContent = gameResults.goodChoices;
    lossGames.textContent = gameResults.badChoices;
    if (gameResults.allChoices === 10) {
        gameResults.allChoices = 0;
        gameResults.goodChoices = 0;
        gameResults.badChoices = 0;
    }
}

// START GAME FUNCTION 

const startGameFunction = () => {
    colorRollFunction();
    const playGame = winnerSelectFunction();
    yourMoneyFunction();
    ulFunction(playGame);
    statsFunction();
}

// BUTTON START FUNCTION 

const buttonStartFunction = () => {
    if (inputValue === '') return alert('Wybierz kwotę!')
    if (colorSelectValue === '') return alert('Wybierz kolor!')
    if (inputValue < 5) return alert('Minimalna kwota za jaką możesz zagrać to 5 JSD!')
    if (yourMoney < inputValue) return alert('Nie masz wystarczającej ilości pieniędzy!')
    else {
        accountLossFunction()
        setTimeout(startGameFunction, 1500);
    }
}



// EVENT LISTENERS 

buttonAddMoney.addEventListener('click', addMoneyFunction);

colorSelect.addEventListener('change', selectColorFunction);

amountInput.addEventListener('input', inputFunction);

buttonStartGame.addEventListener('click', buttonStartFunction);