// Boutton comptabilité du menu.
const buttonNavCustomers = document.querySelector('#nav-button-customers');

// Evénement : 
if (buttonNavCustomers) {
    buttonNavCustomers.addEventListener('click', showAllCustomersWithAjax);
}

// Fonction(s) déclenchées lors de(s) événement(s) : 
// Affiche la page d'accueil de la gestion de comptabilité, en Ajax.
function showAllCustomersWithAjax() {
    fetch('/app/customers/show/all')
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