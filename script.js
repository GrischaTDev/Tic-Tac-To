let fields = Array(9).fill(null); // Initialisiere ein leeres Spielfeld
let currentPlayer = 'cross'; // Spieler 1 startet mit dem Kreuz

function render() {
    const board = document.getElementById('ticTacToeBoard');
    board.innerHTML = '';

    // Anzeige des aktuellen Spielers
    const currentPlayerDisplay = document.getElementById('current-player');
    currentPlayerDisplay.innerHTML = `Aktueller Spieler: ${currentPlayer === 'cross' ? 'Grischa (Kreuz)' : 'Max (Kreis)'}`;

    for (let i = 0; i < 3; i++) {
        const row = document.createElement('tr');
        
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            const cell = document.createElement('td');
            cell.classList.add('cell');

            if (fields[index] === 'circle') {
                const svgCode = `
                    <svg class="svg-container" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="50" r="40" fill="rgb(253, 204, 113)" stroke="rgb(253, 204, 113)" stroke-width="5" />
                    </svg>
                `;
                cell.innerHTML = svgCode;
            } else if (fields[index] === 'cross') {
                const svgCode = `
                    <svg class="svg-container" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <line x1="10" y1="10" x2="90" y2="90" stroke="rgb(253, 204, 113)" stroke-width="5" />
                        <line x1="90" y1="10" x2="10" y2="90" stroke="rgb(253, 204, 113)" stroke-width="5" />
                    </svg>
                `;
                cell.innerHTML = svgCode;
            }

            // Füge einen Event Listener hinzu, um auf Klicks zu reagieren
            cell.addEventListener('click', () => onCellClick(index));

            row.appendChild(cell);
        }

        board.appendChild(row);
    }

    checkWinnerAndDisplay();
}

function onCellClick(index) {
    // Überprüfe, ob die Zelle bereits belegt ist
    if (fields[index] === null) {
        // Setze den Wert in `fields` basierend auf dem aktuellen Spieler
        fields[index] = currentPlayer;

        // Wechsle den Spieler
        currentPlayer = currentPlayer === 'cross' ? 'circle' : 'cross';

        // Rufe die `render()` Funktion erneut auf, um das aktualisierte Spielfeld anzuzeigen
        render();
    }
}

function startGame() {

    // Verstecke den "Start"-Button
    const startButton = document.querySelector('button');
    startButton.style.display = 'none';

    // Zeige das Spielfeld an
    const board = document.getElementById('ticTacToeBoard');
    board.style.display = 'grid';

    // Zeige die Anzeige des aktuellen Spielers an
    const currentPlayerDisplay = document.getElementById('current-player');
    currentPlayerDisplay.classList.remove('hidden');

    // Initial render beim Spielstart
    render();
}

function checkWinnerAndDisplay() {
    if (checkWinner()) {
        const winnerText = currentPlayer === 'cross' ? 'Spieler 1 (Kreuz)' : 'Spieler 2 (Kreis)';
        document.getElementById('winnerText').innerText = `Gewonnen: ${winnerText}`;
        document.getElementById('winnerModal').style.display = 'flex';
    }
}

function resetGame() {
    // Logik für das Zurücksetzen des Spiels
    fields = Array(9).fill(null); // Setze das Spielfeld zurück
    currentPlayer = 'cross'; // Setze den Spieler zurück auf Spieler 1

    // Verstecke das Modal
    document.getElementById('winnerModal').style.display = 'none';

    // Rufe die `render()` Funktion erneut auf, um das zurückgesetzte Spielfeld anzuzeigen
    render();
}




function checkWinner() {
    // Überprüfe horizontale Linien
    for (let i = 0; i < 3; i++) {
        if (
            fields[i * 3] === currentPlayer &&
            fields[i * 3 + 1] === currentPlayer &&
            fields[i * 3 + 2] === currentPlayer
        ) {
            return true;
        }
    }

    // Überprüfe vertikale Linien
    for (let i = 0; i < 3; i++) {
        if (
            fields[i] === currentPlayer &&
            fields[i + 3] === currentPlayer &&
            fields[i + 6] === currentPlayer
        ) {
            return true;
        }
    }

    // Überprüfe diagonale Linien
    if (
        fields[0] === currentPlayer &&
        fields[4] === currentPlayer &&
        fields[8] === currentPlayer
    ) {
        return true;
    }

    if (
        fields[2] === currentPlayer &&
        fields[4] === currentPlayer &&
        fields[6] === currentPlayer
    ) {
        return true;
    }

    // Kein Gewinner
    return false;
}
