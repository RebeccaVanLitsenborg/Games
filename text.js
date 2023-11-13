// Create a heading within the 'main' element
const main = document.querySelector('main');
const heading = document.createElement('h1');
heading.textContent = "Welcome to the Games Portal...Let's play a Game!";
main.appendChild(heading);

const gameCollection = [
    {
        name: 'Guessing Game',
        code: function (card) {
            // JavaScript code for Guessing Game
            const min = 1;
            const max = 26;
            let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

            card.innerHTML = `
                <h3>${this.name}</h3>
                <p>I'm thinking of a number between 1 and 10. Can you guess it?</p>
                <input type="number" id="guess" min="1" max="26">
                <button id="checkButton">Check</button>
                <p id="message"></p>
            `;

            const guessInput = card.querySelector('#guess');
            const message = card.querySelector('#message');
            const button = card.querySelector('#checkButton');

            button.onclick = function () {
                const userGuess = parseInt(guessInput.value, 10);

                if (userGuess > 26 || userGuess < 1) {
                    message.textContent = "Oh Dear...Do we need to practise our numbers between 1 and 26? You start...";
                } else {
                    if (userGuess === randomNumber) {
                        message.textContent = `Awesome! Your number ${guessInput.value} was correct. You can be named many things, hungry not being one of them.`;
                    } else if (userGuess === randomNumber + 1 || userGuess === randomNumber - 1) {
                        message.textContent = "So close! Try again!";
                    } else {
                        message.textContent = `Bummer... You guessed ${guessInput.value} and the secret number was ${randomNumber}`;
                    }
                }

                button.disabled = true;
                createPlayAgainButton();
            };

            function createPlayAgainButton() {
                const playAgainButton = document.createElement('button');
                playAgainButton.textContent = "Play Again";
                playAgainButton.onclick = () => {
                    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
                    guessInput.value = '';
                    message.textContent = '';
                    button.disabled = false;
                    playAgainButton.remove();
                };

                card.appendChild(playAgainButton);
            }
        },
    },
    {
        name: 'Rock Paper Scissors Lizard Spock',
        code: function (card) {
            // JavaScript code for Rock Paper Scissors Lizard Spock game
            const choices = ["Rock", "Paper", "Scissors", "Lizard", "Spock"];
            let gameStarted = false;

            card.innerHTML = `
                    <h3>${this.name}</h3>
                    <p>"It’s very simple. Look, scissors cuts paper. Paper covers rock. Rock crushes lizard. Lizard poisons Spock. Spock smashes scissors. Scissors decapitates lizard. Lizard eats paper. Paper disproves Spock. Spock vaporizes rock. And as it always has, rock crushes scissors.";</p>
                    <p id="message"></p>
                `;

            // Make a move and determine the winner
            function makeMove(userChoice) {
                if (gameStarted) return;
                gameStarted = true;
                playButton.style.display = 'none'; 

                const min = 0;
                const max = choices.length - 1;
                const computerChoice = choices[Math.floor(Math.random() * (max - min + 1)) + min];

                // Define the rules
                const rules = {
                    "Rock": ["Scissors", "Lizard"],
                    "Paper": ["Rock", "Spock"],
                    "Scissors": ["Paper", "Lizard"],
                    "Lizard": ["Spock", "Paper"],
                    "Spock": ["Rock", "Scissors"],
                };

                // Determine the winner based on the rules
                let resultMessage;
                if (userChoice === computerChoice) {
                    resultMessage = "It's a tie!";
                } else if (rules[userChoice].includes(computerChoice)) {
                    resultMessage = `You win! ${userChoice} beats ${computerChoice}.`;
                } else {
                    resultMessage = `Computer wins! ${computerChoice} beats ${userChoice}.`;
                }

                // Update the message
                message.textContent = `You chose ${userChoice}. The computer chose ${computerChoice}. ${resultMessage}`;

                // Display the "Play Again" button
                playAgainButton.style.display = 'block';
            }

            // Display game message
            const message = document.createElement('p');
            message.textContent = 'Choose Your Weapon'
            // Original "Play" button
            const playButton = document.createElement('button');
            playButton.textContent = 'Play';
            playButton.onclick = () => {
                playButton.style.display = 'none'; 
                choices.forEach((choice) => {
                    const button = document.createElement('button');
                    button.textContent = choice;
                    button.onclick = () => makeMove(choice);
                    choiceButtons.appendChild(button);
                });
                message.textContent = 'Choose Your Weapon'
            };

            // "Play Again" button
            const playAgainButton = document.createElement('button');
            playAgainButton.textContent = 'Play Again';
            playAgainButton.style.display = 'none'; 
            playAgainButton.onclick = () => {
                gameStarted = false;
                playButton.style.display = 'block'; 
                playAgainButton.style.display = 'none'; 
                message.textContent = "That's my Spot. You're in my Spot";
                choiceButtons.innerHTML = ''; 
            };

            // Create a container for choice buttons
            const choiceButtons = document.createElement('div');
            choiceButtons.className = 'choice-buttons';

            // Add choice buttons, message, original "Play" button, and "Play Again" button to the card
            card.appendChild(choiceButtons);
            card.appendChild(message);
            card.appendChild(playButton);
            card.appendChild(playAgainButton);
    }
    },
    
    {
        name: '21 Card Game',
        code: function (card) {
        const deck = [];
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        let playerHand = [];
        let dealerHand = [];
        let isGameOver = false;

        // Create a deck of cards
        for (const suit of suits) {
            for (const value of values) {
                deck.push({ suit, value });
            }
        }

        // Shuffle the deck
        function shuffleDeck(deck) {
            for (let i = deck.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [deck[i], deck[j]] = [deck[j], deck[i]];
            }
        }

        // Deal initial cards to the player and dealer
        function dealInitialCards() {
            playerHand.push(...deck.splice(0, 2));
            dealerHand.push(...deck.splice(0, 2));
        }

        // Calculate the score of a hand
        function calculateScore(hand) {
            return hand.reduce((score, card) => {
                const value = card.value;
                return value === 'A' ? score + 11 : value.charCodeAt(0) >= 50 && value.charCodeAt(0) <= 57 ? score + parseInt(value) : score + 10;
            }, 0);
        }

        // Check for a win condition
        function checkWinConditions() {
            const playerScore = calculateScore(playerHand);
            const dealerScore = calculateScore(dealerHand);

            if (playerScore > 21) {
                resultMessage("Bust! You lose.");
            } else if (dealerScore > 21 || playerScore === 21 || (dealerScore < 21 && playerScore > dealerScore)) {
                resultMessage("You win!");
            } else if (dealerScore === 21 || playerScore < dealerScore) {
                resultMessage("You lose.");
            } else if (playerScore === dealerScore) {
                resultMessage("It's a tie.");
            }
            isGameOver = true;
        }

        // Display the game result message
        function resultMessage(message) {
            const messageElement = document.createElement('p');
            messageElement.textContent = message;
            card.appendChild(messageElement);

            // Add a button to play again
            const playAgainButton = document.createElement('button');
            playAgainButton.textContent = 'Play Again';
            playAgainButton.onclick = () => {
                playerHand.length = 0;
                dealerHand.length = 0;
                isGameOver = false;
                card.innerHTML = '';
                startGame();
            };
            card.appendChild(playAgainButton);
        }

        // Start a new game
        function startGame() {
            shuffleDeck(deck);
            dealInitialCards();
            const playerScore = calculateScore(playerHand);

            // Display player/dealer hand and score
            const playerHandElement = document.createElement('p');
            playerHandElement.textContent = `Player's Hand: ${playerHand.map(card => card.value).join(', ')}`;
            card.appendChild(playerHandElement);

            const dealerHandElement = document.createElement('p');
            dealerHandElement.textContent = `Dealer's Hand: ${dealerHand.map(card => card.value).join(', ')}`;
            card.appendChild(dealerHandElement);

            const playerScoreElement = document.createElement('p');
            playerScoreElement.textContent = `Player's Score: ${playerScore}`;
            card.appendChild(playerScoreElement);

            // Add buttons to hit and stand
            const hitButton = document.createElement('button');
            hitButton.textContent = 'Hit';
            hitButton.onclick = () => {
                if (!isGameOver) {
                    playerHand.push(deck.pop());
                    const playerScore = calculateScore(playerHand);
                    playerScoreElement.textContent = `Player's Score: ${playerScore}`;

                    if (playerScore >= 21) {
                        checkWinConditions();
                    }
                }
            };
            card.appendChild(hitButton);

            const standButton = document.createElement('button');
            standButton.textContent = 'Stand';
            standButton.onclick = () => {
                if (!isGameOver) {
                    // Dealer's turn
                    while (calculateScore(dealerHand) < 17) {
                        dealerHand.push(deck.pop());
                    }
                    dealerHandElement.textContent = `Dealer's Hand: ${dealerHand.map(card => card.value).join(', ')}`;
                    checkWinConditions();
                }
            };
            card.appendChild(standButton);

            // Check for win conditions after initial deal
            if (playerScore === 21) {
                checkWinConditions();
            }
        }

        // Start the game
        startGame();
    },

    
    },
    {
        name: 'Memory Game',
        code: function () {
            // JavaScript code for Memory Game
            // You can include your game code here
        },
    },
    {
        name: 'Moving Block Game',
        code: function () {
            // JavaScript code for Moving Block Game
            // You can include your game code here
        },
    },
];

// Create game cards for each game and add them to the 'games' container
const gamesContainer = document.createElement('div');
gamesContainer.className = 'games-container';
main.appendChild(gamesContainer);

// Create game cards for each game and add them to the 'games' container
gameCollection.forEach((game) => {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.setAttribute('data-game-name', game.name); // Add the data-game-name attribute
    card.innerHTML = `
        <h3>${game.name}</h3>
        <button onclick="playGame(this)">Play</button>
    `;
    gamesContainer.appendChild(card); // Use `gamesContainer` to append the card
});

// Function to play a specific game
function playGame(button) {
    const card = button.parentNode;
    const gameName = card.getAttribute("data-game-name");
    const selectedGame = gameCollection.find((game) => game.name === gameName);
    if (selectedGame) {
        selectedGame.code(card); // Call the game's JavaScript code and pass the card element
    }
}