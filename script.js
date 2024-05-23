<<<<<<< HEAD
// Sélectionner toutes les cartes et autres éléments DOM nécessaires
const cardsContainer = document.querySelector(".cartes");
const winnerScreen = document.getElementById('winner-screen');
const loseScreen = document.getElementById('lose-screen');
const backgroundMusic = document.getElementById('background-music');
const winSound = document.getElementById('win-sound');
const loseSound = document.getElementById('lose-sound');

// Initialiser les variables du jeu
let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;
let level = 1;
let timer;
let timeLeft = 60;

const levelDisplay = document.getElementById("level");
const timerDisplay = document.getElementById("timer");

// Définir les ensembles de cartes pour chaque niveau
const levels = {
    1: [1, 2, 3, 1, 2, 3], // 3 paires
    2: [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6], // 6 paires
    3: [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8], // 8 paires
    4: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] // 10 paires
};

// Fonction pour démarrer le minuteur
function startTimer() {
    clearInterval(timer);
    timeLeft = 60; // Définir le temps pour chaque niveau
    timerDisplay.textContent = `Temps : ${timeLeft}s`; // Mettre à jour l'affichage du minuteur
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Temps : ${timeLeft}s`; // Mettre à jour l'affichage du minuteur chaque seconde
        if (timeLeft === 0) {
            clearInterval(timer);
            loseSound.play(); // Jouer le son de défaite
            showLoseScreen(); // Afficher l'écran de défaite
        }
    }, 1000);
}

// Fonction pour réinitialiser le jeu à l'état initial
function resetGame() {
    level = 1;
    levelDisplay.textContent = `Niveau : ${level}`; // Mettre à jour l'affichage du niveau
    startTimer(); // Démarrer le minuteur
    shuffleCard(); // Mélanger les cartes
}

// Fonction pour gérer le retournement des cartes
function flipCard({target: clickedCard}) {
    if (cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add("flip"); // Retourner la carte
        if (!cardOne) {
            return cardOne = clickedCard; // Assigner la première carte
        }
        cardTwo = clickedCard; // Assigner la deuxième carte
        disableDeck = true; // Désactiver le plateau pour empêcher de retourner plus de deux cartes
        let cardOneImg = cardOne.querySelector(".carte-Vue-Dos img").src,
            cardTwoImg = cardTwo.querySelector(".carte-Vue-Dos img").src;
        matchCards(cardOneImg, cardTwoImg); // Vérifier si les cartes correspondent
    }
}

// Fonction pour vérifier si deux cartes correspondent
function matchCards(img1, img2) {
    if (img1 === img2) {
        matched++;
        let pairsCount = levels[level].length / 2;
        if (matched == pairsCount) {
            setTimeout(() => {
                winSound.play(); // Jouer le son de victoire
                showWinnerScreen(); // Afficher l'écran de victoire
            }, 1000);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false; // Réactiver le plateau
    }

    setTimeout(() => {
        cardOne.classList.add("shake"); // Ajouter l'animation de secousse si les cartes ne correspondent pas
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip"); // Retirer les classes de secousse et de retournement
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false; // Réactiver le plateau
    }, 1200);
}

// Fonction pour mélanger les cartes
function shuffleCard() {
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";
    let arr = levels[level]; // Obtenir les cartes pour le niveau actuel
    arr.sort(() => Math.random() > 0.5 ? 1 : -1); // Mélanger le tableau
    cardsContainer.innerHTML = ''; // Effacer les cartes existantes
    arr.forEach(num => {
        const card = document.createElement('li');
        card.classList.add('carte');
        card.innerHTML = `
            <div class="carte-Vue-Face">
                <img src="images_Memory/Question_mark.png" alt="icon">
            </div>
            <div class="carte-Vue-Dos">
                <img src="images_Memory/img-${num}.png" alt="card-img">
            </div>
        `;
        card.addEventListener("click", flipCard);
        cardsContainer.appendChild(card);
    });
}

// Fonction pour afficher l'écran de victoire
function showWinnerScreen() {
    winnerScreen.classList.remove('hidden');
    backgroundMusic.pause(); // Mettre la musique de fond en pause
}

// Fonction pour afficher l'écran de défaite
function showLoseScreen() {
    loseScreen.classList.remove('hidden');
    backgroundMusic.pause(); // Mettre la musique de fond en pause
}

// Fonction pour passer au niveau suivant
function nextLevel() {
    level++;
    if (level > 4) {
        level = 1; // Réinitialiser au niveau 1 après le dernier niveau
    }
    levelDisplay.textContent = `Niveau : ${level}`; // Mettre à jour l'affichage du niveau
    winnerScreen.classList.add('hidden'); // Masquer l'écran de victoire
    shuffleCard(); // Mélanger les cartes
    startTimer(); // Démarrer le minuteur
    backgroundMusic.play(); // Jouer la musique de fond
}

// Fonction pour rejouer le niveau actuel
function replay() {
    loseScreen.classList.add('hidden'); // Masquer l'écran de défaite
    resetGame(); // Réinitialiser le jeu
    backgroundMusic.play(); // Jouer la musique de fond
}

// Initialiser le jeu
shuffleCard(); // Mélanger les cartes
startTimer(); // Démarrer le minuteur
backgroundMusic.play(); // Jouer la musique de fond
=======
/**
 * 
 */



const cards = document.querySelectorAll(".card");

let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;

function flipCard({target: clickedCard}) {
    if(cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add("flip");
        if(!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

/**
 * 
 */


function matchCards(img1, img2) {
    if(img1 === img2) {
        matched++;
        if(matched == 8) {
            setTimeout(() => {
                return shuffleCard();
            }, 1000);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}


/**
 * 
 */
function shuffleCard() {
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `images/img-${arr[i]}.png`;
        card.addEventListener("click", flipCard);
    });
}


/**
 * 
 */
shuffleCard();
    
cards.forEach(card => {
    card.addEventListener("click", flipCard);
});
>>>>>>> 2ce8a083886fa1fb8bcf476849fb7aa58489347c
