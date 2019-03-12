// TODO: Disparation de la navbar au scroll down, 
// TODO: Réaparition de la navbar au scroll up
const navbar = document.querySelector('.navbar');
const buttonsMenu = document.querySelectorAll('.buttons-menu > i');
const buttonByDefaultActivated = document.querySelector('#nav-button-chart > i');

// Allume le boutton par défaut (la page sur laquelle on se trouve juste après la connexion)
window.addEventListener("DOMContentLoad", activeButton(buttonByDefaultActivated));

// Ecoute le clique sur tout les boutons du menu.
navbar.addEventListener('click', (e) => {
    if (e.target.classList.contains('buttons-menu') || e.target.parentNode.classList.contains('buttons-menu')) {

        activeButton(e.target);
    }
})

// Fonction chargé d'allumé le boutton de la page sur laquelle on se trouve.
function activeButton(buttonSelected) {

    // On éteint tout les boutons déjà allumés.
    buttonsMenu.forEach(button => {
        button.style.color = "#92A2BC";
        console.log(button);
    });

    // Allume le boutton sélectionné.
    buttonSelected.style.color = "#EAFFFE";

}