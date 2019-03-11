// Bouton clients du menu.
const buttonNavCustomers = document.querySelector('#nav-button-customers');

// Evénement :
window.addEventListener('click', (e) => {

    // Affichage de tous les clients
    if (e.target != null && e.target != undefined) {
        if (e.target.id == "nav-button-customers" || e.target.parentElement.id == "nav-button-customers") {
            actionsCustomerWithAjax("all", "show");
        }
    }
    // show/edit/delete    Affichage, modification et suppression client
    if (e.target.getAttribute("data-action") === "show" || e.target.getAttribute("data-action") === "edit" || e.target.getAttribute("data-action") === "delete" || e.target.getAttribute("data-action") === "add") {
        if (e.target.getAttribute("data-id") != null && e.target.getAttribute("data-id") != undefined && e.target.getAttribute("data-id") != "") {
            actionsCustomerWithAjax(e.target.getAttribute("data-id"), e.target.getAttribute("data-action"));
        } else {
            // add    Ajout d'un client
            actionsCustomerWithAjax(null, e.target.getAttribute("data-action"));
        }
    }
});

// Fonction AJAX redirection
function actionsCustomerWithAjax(id, action) {

    // Container de rendu.
    let app = document.querySelector('#app');

    // Effacement du contenu existant.
    app.innerHTML = "";

    // Apparition du loader.
    let loader = document.querySelector('.lds-dual-ring');
    loader.style.display = "inline-block";
    if (id == null && id == undefined) {
        $url = `/app/customers/${action}`;
    } else {
        $url = `/app/customers/${action}/${id}`;
    }
    fetch($url)
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