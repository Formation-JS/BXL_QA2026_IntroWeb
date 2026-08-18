console.log("Jeu du pendu !");

//! Récuperation du formulaire dans le DOM de la page
const gameForm = document.getElementById('game-form');
const msgGameForm = document.getElementById('message-game-form');

//! Variable de stockage
const letterAlreadySubmit = [];

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
        msgGameForm.textContent = `La lettre selectionnée est ${letter}`;

        // TODO...
    }

    // Efface la valeur de l'input
    userInput.value = '';
});