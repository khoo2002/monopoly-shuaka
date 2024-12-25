let players = {};
let currentPlayer = '';

const setupModal = document.getElementById("setupModal");
const moneyModal = document.getElementById("moneyModal");
const startBtn = document.getElementById("startGame");
const setupCloseBtn = setupModal.getElementsByClassName("close")[0];
const moneyCloseBtn = moneyModal.getElementsByClassName("close")[0];
const setupGameBtn = document.getElementById("setupGame");

startBtn.onclick = function() {
    setupModal.style.display = "block";
}

setupCloseBtn.onclick = function() {
    setupModal.style.display = "none";
}

moneyCloseBtn.onclick = function() {
    moneyModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == setupModal) {
        setupModal.style.display = "none";
    } else if (event.target == moneyModal) {
        moneyModal.style.display = "none";
    }
}

setupGameBtn.onclick = function() {
    const numPlayers = document.getElementById("numPlayers").value;
    const initialFund = document.getElementById("initialFund").value;

    if (numPlayers && initialFund) {
        initializeGame(parseInt(numPlayers), parseInt(initialFund));
        setupModal.style.display = "none";
    }
}

function initializeGame(numPlayers, initialFund) {
    players = {};
    const playersDiv = document.getElementById('players');
    playersDiv.innerHTML = ''; // Clear existing players

    for (let i = 1; i <= numPlayers; i++) {
        const playerId = `player${i}`;
        players[playerId] = initialFund;

        const playerDiv = document.createElement('div');
        playerDiv.className = 'player player-span';
        playerDiv.id = playerId;

        const playerLabel = document.createElement('span');
        playerLabel.innerText = `Player ${i}: `;

        const playerMoneySpan = document.createElement('span');
        playerMoneySpan.id = `${playerId}Money`;
	playerMoneySpan.className = 'player-money-span';
        playerMoneySpan.innerText = initialFund;

	const adjustButton = document.createElement('button');
        adjustButton.className = 'adjust-button';
        adjustButton.innerText = 'Adjust Money';
        adjustButton.onclick = () => openMoneyModal(playerId, i);


        playerDiv.appendChild(playerLabel);
        playerDiv.appendChild(playerMoneySpan);
        playerDiv.appendChild(adjustButton);

        playersDiv.appendChild(playerDiv);
    }
}

function openMoneyModal(playerId, playerNumber) {
    currentPlayer = playerId;
    document.getElementById('playerNumber').innerText = `Player ${playerNumber}`;
    document.getElementById('originalValue').innerText = `Original Value: ${players[playerId]}`;
    document.getElementById('adjustmentAmount').value = '';
    moneyModal.style.display = "block";
}

function appendNumber(number) {
    const input = document.getElementById('adjustmentAmount');
    input.value = input.value + number;
}

function clearInput() {
    document.getElementById('adjustmentAmount').value = '';
}

function submitAdjustment(operation) {
    const amount = parseInt(document.getElementById('adjustmentAmount').value);
    if (!isNaN(amount)) {
        if (operation === 'add') {
            adjustMoney(currentPlayer, amount);
        } else if (operation === 'subtract') {
            adjustMoney(currentPlayer, -amount);
        }
        moneyModal.style.display = "none";
    }
}

function adjustMoney(player, amount) {
    if (players[player] !== undefined) {
        players[player] += amount;
        updateDisplay();
    }
}

function updateDisplay() {
    for (let player in players) {
        document.getElementById(`${player}Money`).innerText = players[player];
    }
}
