// Bouton clients du menu.
const buttonNavCustomers = document.querySelector('#nav-button-customers');

// Evénement :
if (buttonNavCustomers) {
    buttonNavCustomers.addEventListener('click', showAllCustomersWithAjax);
}
window.addEventListener('click', (e) => {
    if ((e.target.getAttribute("data-id") != null && e.target.getAttribute("data-id") != undefined && e.target.getAttribute("data-id") != "")&&(e.target.getAttribute("data-action") === "show" || e.target.getAttribute("data-action") === "edit" || e.target.getAttribute("data-action") === "delete")) {
        actionCustomerWithAjax(e.target.getAttribute("data-id"), e.target.getAttribute("data-action"));
    }
});


// Fonction(s) déclenchées lors de(s) événement(s) : 
// Affiche la liste des clients, en Ajax.
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

function actionCustomerWithAjax(id, action) {
    fetch(`/app/customers/${action}/${id}`)
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