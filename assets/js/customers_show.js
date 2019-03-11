// Bouton clients du menu.
const buttonNavCustomers = document.querySelector('#nav-button-customers');

// Evénement :
buttonNavCustomers.addEventListener("click", actionsCustomerWithAjax("all", "show"));

window.addEventListener('click', (e) => {
    if(e.target.getAttribute("data-id") != null && e.target.getAttribute("data-id") != undefined && e.target.getAttribute("data-id") != ""){
        if (e.target.getAttribute("data-action") === "show" || e.target.getAttribute("data-action") === "edit" || e.target.getAttribute("data-action") === "delete") {
            actionCustomerWithAjax(e.target.getAttribute("data-id"), e.target.getAttribute("data-action"));
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

    fetch(`/app/customers/${action}/${id}`)
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