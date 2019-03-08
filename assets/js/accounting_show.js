// Boutton comptabilité du menu.
const buttonNavAccounting = document.querySelector('#nav-button-accounting');

// Evénement : 
if (buttonNavAccounting) {
    buttonNavAccounting.addEventListener('click', showAccountingWithAjax);
}

// Fonction(s) déclenchées lors de(s) événement(s) : 
// Affiche la page d'accueil de la gestion de comptabilité, en Ajax.
function showAccountingWithAjax() {
    fetch('/app/accounting/show')
    .then(res => {
        return res.text();
    })
    .then(res => {

        // Container de rendu.
        let app = document.querySelector('#app');

        // Injecte le contenu receptionné dans le container.
        app.innerHTML = res;
    })
    .catch(err => {
        if (err) {
            throw err;
        }
    })
}