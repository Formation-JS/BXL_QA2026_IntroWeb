console.log("Jeu du pendu !");

//! Récuperation du formulaire dans le DOM de la page
const gameForm = document.getElementById('game-form');
const msgGameForm = document.getElementById('message-game-form');
const displayWord = document.getElementById('le-mot-à-trouver');
const displayLetters = document.getElementById('lettres-proposees');
const displayMaxTries = document.getElementById('nombre-vies');
const btnReplay = document.getElementById('btn-rejouer');

//! Constante globale
const MAX_TRIES = 6;
const WORDS = ['Soleil', 'Jupiter', 'Saturne', 'Uranus', 'Neptune', 'Terre', 'Venus', 'Mars', 'Ganymede', 'Titan', 'Mercure', 'Callisto', 'Io', 'Lune', 'Europa', 'Triton', 'Pluton', 'Titania', 'Rhea', 'Oberon', 'Japet', 'Charon', 'Umbriel', 'Ariel', 'Dione', 'Tethys', 'Ceres', 'Vesta', 'Pallas', 'Encelade', 'Miranda', 'Protee', 'Mimas', 'Hyperion', 'Iris', 'Phoebe', 'Janus', 'Epimethee', 'Lutece', 'Promethee', 'Pandore', 'Mathilde', 'Helene', 'Ida', 'Arrokoth', 'Phobos', 'Deimos', 'Tchourioumov-Guerassimenko', 'Hartley 2', 'Sagittarius A'];

//! Variable de stockage
const letterAlreadySubmit = [];
let mysteryWord;
let lettersFound;
let remainingTries;

//! Setup du jeu
function startGame() {
    // TODO Rendre aleatoire le choix de mot
    // mysteryWord = ['S', 'O', 'L', 'E', 'I', 'L'];
    mysteryWord = getRandomMysteryWord();
    console.log(mysteryWord);
    
    lettersFound = ['-', ' '];
    remainingTries = MAX_TRIES;
    // Reset des lettres envoyées
    letterAlreadySubmit.splice(0, letterAlreadySubmit.length);
    updateMaxTries();
    updateDisplayWord();
    updateDisplayLetters();
}
startGame();

//! Réaction à la validation du formulaire
gameForm.addEventListener('submit', function (event) {
    // Annulation du comportement par defaut => Refresh
    event.preventDefault();

    // Récuperer la valeur (depuis le form)
    // - La balise "input" via son "name"
    const userInput = gameForm['user-input'];
    // - On lit la valeur contenu
    const letter = userInput.value.toUpperCase();
    console.log(letter);

    // Traitement de la lettre
    if(letter.length !== 1) {
        msgGameForm.textContent = 'La lettre invalide';
    }
    else if(letterAlreadySubmit.includes(letter)) {
        msgGameForm.textContent = `La lettre ${letter} a déjà été proposé ! Boulet ♥`;
    }
    else {
        letterAlreadySubmit.push(letter);
        
        if(checkLetterIsValid(letter)) {
            msgGameForm.textContent = `La lettre ${letter} est dans le mot`;
            updateDisplayWord();
        }
        else {
            msgGameForm.textContent = `La lettre ${letter} n'est pas dans le mot`;
            remainingTries--;
            updateMaxTries();
            updateDisplayLetters();
        }
    }
    
    // Efface la valeur de l'input
    userInput.value = '';
    
    // On continue ?
    if(checkVictory()) {
        msgGameForm.textContent = 'Bravo, vous avez gagné';
    } 
    else if (checkDefeat()) {
        msgGameForm.textContent = 'Bouhou ! T\'es mauvais !';
        updateDisplayWord(true);
    }
});

function checkLetterIsValid(letter) {
    if(mysteryWord.includes(letter)) {
        lettersFound.push(letter);
        return true;
    }
    return false;
}

function updateDisplayWord(force = false) {
    displayWord.innerHTML = '';

    for(const letter of mysteryWord) {

        // Création d'un balise "span" en JS (Pas afficher)
        const span = document.createElement('span');

        // Moficiation du contenu du "span"
        if(force || lettersFound.includes(letter)) {
            span.textContent = letter;
        }
        else {
            span.textContent = '_';
        }

        // Ajoute la balise "span" à la balise "p"
        displayWord.append(span);
    }
}

function checkVictory() {
    // Les letters du mots (sans doublon)
    const mysteryWordSet = new Set(mysteryWord);
    const lettersFoundSet = new Set(lettersFound);

    return lettersFoundSet.isSupersetOf(mysteryWordSet);
}

function checkDefeat() {
    return remainingTries <= 0
}

function updateDisplayLetters(){
    const wrongLetters = [];

    for(const letter of letterAlreadySubmit){
        if(!mysteryWord.includes(letter)){
            wrongLetters.push(letter);
        }
    }
    displayLetters.textContent = wrongLetters.join(' - ');
}

function updateMaxTries(){
    displayMaxTries.textContent = remainingTries;
}

function getRandomMysteryWord(){
    const index = Math.floor(Math.random()* (WORDS.length ));
    const temp = WORDS[index]
    console.log(index,temp)
return temp.toUpperCase().split('')
}

btnReplay.addEventListener('click', function(){
    startGame()
})