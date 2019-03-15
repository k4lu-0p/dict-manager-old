// Bouton clients du menu.
const buttonNavCustomers = document.querySelector('#nav-button-customers');
const navbar = document.querySelector('.navbar');
let buttonPrevious;
let buttonConfirmDelete;
let containerConfirm;
let buttonAddCustomer;

// Evénement :
// Lorsque je clique sur l'icone Client du menu :
navbar.addEventListener('click', (e) => {
    if (e.target != null && e.target != undefined) {
        // Affichage de tous les clients
        if (e.target.id == "nav-button-customers" || e.target.parentElement.id == "nav-button-customers") {
            showAllCustomersWithAjax();
        }
    }
});

// Action sur les customers.
window.addEventListener('click', (e) => {



    let id = e.target.getAttribute('data-id') ? e.target.getAttribute('data-id') : undefined;

    switch (e.target.getAttribute('data-action')) {
        case 'show':
            showOneCustomer(id);
            break;
        case 'previous':
            showAllCustomersWithAjax();
            break;
        case 'delete':
            deleteOneCustomer(id);
            break;
        case 'yes':
            deleteConfirmCustomer(id);
            break;
        case 'no':
            deleteCancelCustomer();
            break;
        case 'new':
            showFormNewCustomer();
            break;
        case 'add':
            addOneCustomer(e);
            break;
        default:
            break;
    }

})

// Button add Customer :
function addOneCustomer(e) {

    e.preventDefault();

    // Formulaire à envoyer en POST.
    let formData = new FormData();

    let firstname = document.querySelector("#customer_firstname").value;
    let lastname = document.querySelector("#customer_lastname").value;
    let phone = document.querySelector("#customer_phone").value;
    let email = document.querySelector("#customer_email").value;
    let makani = document.querySelector("#customer_addressNumber").value;
    let streetNumber = document.querySelector("#customer_streetNumber").value;
    let streetName = document.querySelector("#customer_streetName").value;
    let city = document.querySelector("#customer_city").value;
    let postalCode = document.querySelector("#customer_pc").value;
    let country = document.querySelector("#customer_country").value;
    let building = document.querySelector("#customer_building").value;
    let picture = document.querySelector("#customer_picture").value;
    let newsletter = document.querySelector("#customer_newsletter").value;
    let token = document.querySelector("#customer__token").value;

    // Ajout des valeurs dans l'objet formulaire.
    formData.append('customer[firstname]', firstname);
    formData.append('customer[lastname]', lastname);
    formData.append('customer[phone]', phone);
    formData.append('customer[email]', email);
    formData.append('customer[addressNumber]', makani);
    formData.append('customer[streetNumber]', streetNumber);
    formData.append('customer[streetName]', streetName);
    formData.append('customer[city]', city);
    formData.append('customer[pc]', postalCode);
    formData.append('customer[country]', country);
    formData.append('customer[building]', building);
    formData.append('customer[picture]', picture);
    formData.append('customer[newsletter]', newsletter);
    formData.append('customer[_token]', token);

    // Effacement du contenu existant.
    app.innerHTML = "";

    // Apparition du loader.
    let loader = document.querySelector('.container-fluid-loader');
    loader.style.display = "flex";

    // Requête AJAX :
    fetch('/app/customers/add', {
            method: "POST",
            body: formData
        })
        .then(res => {

            return res.text();

        })
        .then(res => {

            // Dès reception, disparition du loader.
            loader.style.display = "none";

        })
        .catch(err => {
            if (err) {
                throw err;
            }
        })
}


// Button new Customer :
function showFormNewCustomer() {

    // Container de rendu.
    let app = document.querySelector('#app');

    // Effacement du contenu existant.
    app.innerHTML = "";

    // Apparition du loader.
    let loader = document.querySelector('.container-fluid-loader');
    loader.style.display = "flex";

    // Requête AJAX :
    fetch("/app/customers/add", {
            method: 'GET'
        })
        .then(res => {
            return res.text();
        })
        .then(res => {

            // Dès reception, disparition du loader.
            loader.style.display = "none";

            // Injecte le contenu receptionné dans le container.
            app.innerHTML = res;

            // Boutton d'envois du formulaire.
            buttonAddCustomer = document.querySelector('#add-button-customer');
        })
        .catch(err => {
            if (err) {
                throw err;
            }
        })

}

// Button Supprimé :
function deleteOneCustomer(id) {

    let inputHiddenFirstname = document.querySelector(`#customer-firstname-${id}`);
    let inputHiddenLastname = document.querySelector(`#customer-lastname-${id}`);
    let spanFirstnameLastname = document.querySelector("#confirm-delete-customer-fullname");

    spanFirstnameLastname.innerHTML = `${inputHiddenFirstname.value} ${inputHiddenLastname.value}`;

    containerConfirm = document.querySelector(".container-warning");
    buttonConfirmDelete = document.querySelector("#confirm-delete-customer-yes");

    buttonConfirmDelete.setAttribute('data-id', id);

    containerConfirm.style.display = "flex";

}

// Button Yes Confirm to Delete :
function deleteConfirmCustomer(id) {
    // Container de rendu.
    let app = document.querySelector('#app');

    // Effacement du contenu existant.
    app.innerHTML = "";

    // Apparition du loader.
    let loader = document.querySelector('.container-fluid-loader');
    loader.style.display = "flex";

    fetch(`/app/customers/delete/${id}`, {
            method: 'DELETE'
        })
        .then(res => {
            return res.text();
        })
        .then(res => {

            // Dès reception, disparition du loader.
            loader.style.display = "none";

            // Injecte le contenu receptionné dans le container.
            app.innerHTML = res;
        })
}

// Button No Confirm to Delete :
function deleteCancelCustomer() {
    containerConfirm = document.querySelector(".container-warning");
    containerConfirm.style.display = "none";
}

// Button Détail :
function showOneCustomer(id) {

    // Container de rendu.
    let app = document.querySelector('#app');

    // Effacement du contenu existant.
    app.innerHTML = "";

    // Apparition du loader.
    let loader = document.querySelector('.container-fluid-loader');
    loader.style.display = "flex";

    fetch(`/app/customers/show/${id}`, {
            method: 'GET'
        })
        .then(res => {
            return res.text();
        })
        .then(res => {

            // Dès reception, disparition du loader.
            loader.style.display = "none";

            // Injecte le contenu receptionné dans le container.
            app.innerHTML = res;
        })
}

// Boutton Précédent sur un client + Button navbar 
function showAllCustomersWithAjax() {

    // Container de rendu.
    let app = document.querySelector('#app');

    // Effacement du contenu existant.
    app.innerHTML = "";

    // Apparition du loader.
    let loader = document.querySelector('.container-fluid-loader');
    loader.style.display = "flex";

    fetch("/app/customers/show/all")
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