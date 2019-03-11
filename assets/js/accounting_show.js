// Boutton comptabilité du menu.
const buttonNavAccounting = document.querySelector('#nav-button-accounting');

// Evénement : 
if (buttonNavAccounting) {
    buttonNavAccounting.addEventListener('click', showAccountingWithAjax);
}

// Fonction(s) déclenchées lors de(s) événement(s) : 
// Affiche la page d'accueil de la gestion de comptabilité, en Ajax.

function showAccountingWithAjax() {

    // Container de rendu.
    let app = document.querySelector('#app');

    // Effacement du contenu existant.
    app.innerHTML = "";

    // Apparition du loader.
    let loader = document.querySelector('.lds-dual-ring');
    loader.style.display = "inline-block";

    fetch('/app/accounting/')
    .then(res => {
        return res.text();
    })
    .then(res => {

        // Dès reception, disparition du loader.
        loader.style.display = "none";

        // Injecte le contenu receptionné dans le container.
        app.innerHTML = res;
    })
    .catch(err => {
        if (err) {
            throw err;
        }
    })
}