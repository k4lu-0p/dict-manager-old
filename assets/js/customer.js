// Bouton clients du menu.
const buttonNavCustomers = document.querySelector('#nav-button-customers');
const navbar = document.querySelector('.navbar');
let buttonPrevious;
let buttonConfirmDelete;
let containerConfirm;
let buttonAddCustomer;
let onFilterAlphabetics;
let toggleDisplaySearchBar;
let valueInputSearch;


// Evénements :

// Faire disparaître le menu quand on affiche le clavier smartphone
window.onresize = (e) => {
    if (e.path[0].innerHeight < 500) {
        navbar.style.display = "none";
    } else {
        navbar.style.display = "block";
    }
};

// Lorsque je clique sur l'icone Client du menu :
navbar.addEventListener('click', (e) => {
    if (e.target != null && e.target != undefined) {
        // Affichage de tous les clients
        if (e.target.id == "nav-button-customers" || e.target.parentElement.id == "nav-button-customers") {
            showCustomers();
        }
    }
});

// A chaque touche pressées :
window.addEventListener('keyup', (e) => {
    setTimeout(() => {
        searchCustomer();
    }, 200)

})

// Action sur les customers.
window.addEventListener('click', (e) => {

    let id = e.target.getAttribute('data-id') ? e.target.getAttribute('data-id') : undefined;

    switch (e.target.getAttribute('data-action')) {
        case 'show':
            showOneCustomer(id);
            break;
        case 'previous':
            showCustomers();
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
        case 'edit':
            showFormEditCustomer(id);
            break;
        case 'update':
            updateOneCustomer(e, id);
            break;
        case 'alphabetics':
            showByAlphabeticCustomer(e);
            break;
        case 'recent':
            showByRecentCustomer(e);
            break;
        case 'toggle':
            displaySearchBar();
            break;
            // case 'search':
            //     searchCustomer();
            //     break;
        default:
            break;
    }

})

// Rechercher un customer dynamiquement.
function searchCustomer() {

    // Valeur dans le champ
    valueInputSearch = document.querySelector('#input-search').value;

    if (valueInputSearch.length >= 3) {

        // Formulaire à envoyer en POST.
        let formData = new FormData();
        formData.append('search', valueInputSearch);

        // Container de rendu.
        let containerCustomer = document.querySelector('.container-customers');

        // Effacement du contenu existant.
        containerCustomer.innerHTML = "";

        // Apparition du loader.
        let loader = document.querySelector('.container-fluid-loader');
        loader.style.display = "flex";

        fetch("/app/customers/search", {
                method: 'POST',
                body: formData
            })
            .then(res => {
                return res.text();
            })
            .then(res => {

                // Dès reception, disparition du loader.
                loader.style.display = "none";

                // Injecte le contenu receptionné dans le container.
                containerCustomer.style.display = "grid";
                containerCustomer.innerHTML = res;

                // Compte le nombre de client
                let countCustomers = document.querySelectorAll('.card-customers').length;
                let countWrapper = document.querySelector('#count-customer');
                countWrapper.textContent = countCustomers;

                if (countCustomers == 0) {
                    containerCustomer.style.display = "block";
                    containerCustomer.innerHTML = "<h1 class='no-result text-center'> No result found </h1>";
                }

            })
            .catch(err => {
                if (err) {
                    throw err;
                }
            })

    } else if (valueInputSearch.length == 0) {
        showAllCustomers();
    }


}

// Affiche/Referme la barre de recherche quand on clique sur la loupe.
function displaySearchBar() {

    let containerSearchBar = document.querySelector('.container-search-bar');
    let buttonSearch = document.querySelector('#button-search-customer');

    if (toggleDisplaySearchBar) {
        toggleDisplaySearchBar = false;
        buttonSearch.style.color = "#92a2bc";
        containerSearchBar.style.visibility = "hidden";
        containerSearchBar.style.top = "-70px";
    } else {
        toggleDisplaySearchBar = true;
        buttonSearch.style.color = "#EAFFFE";
        containerSearchBar.style.visibility = "visible";
        containerSearchBar.style.top = "70px";
    }
}

// Montre tout les clients en raffraichissant toute la page.
function showCustomers() {

    onFilterAlphabetics = true;
    toggleDisplaySearchBar = false;

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

            // Compte le nombre de client
            let countCustomers = document.querySelectorAll('.card-customers').length;
            let countWrapper = document.querySelector('#count-customer');
            countWrapper.textContent = countCustomers;


        })
        .catch(err => {
            if (err) {
                throw err;
            }
        })

}

// Boutton Précédent sur un client + Button navbar + Filtre alphabetics
function showByAlphabeticCustomer(e) {

    if (!onFilterAlphabetics) {

        onFilterAlphabetics = true;

        if (document.querySelector('.filter-az') && document.querySelector('.filter-recent')) {
            document.querySelector('.filter-az').classList.add('filter-is-focus');
            document.querySelector('.filter-recent').classList.remove('filter-is-focus');
        }

        // Container de rendu.
        let containerCustomer = document.querySelector('.container-customers');

        // Effacement du contenu existant.
        containerCustomer.innerHTML = "";

        // Apparition du loader.
        let loader = document.querySelector('.container-fluid-loader');
        loader.style.display = "flex";

        fetch("/app/customers/show/alphabetics")
            .then(res => {
                return res.text();
            })
            .then(res => {

                // Dès reception, disparition du loader.
                loader.style.display = "none";

                // Injecte le contenu receptionné dans le container.
                containerCustomer.innerHTML = res;

                // Compte le nombre de client
                let countCustomers = document.querySelectorAll('.card-customers').length;
                let countWrapper = document.querySelector('#count-customer');
                countWrapper.textContent = countCustomers;

            })
            .catch(err => {
                if (err) {
                    throw err;
                }
            })
    }


}

// Filtre par la plus recente inscription.
function showByRecentCustomer(e) {

    if (onFilterAlphabetics) {

        onFilterAlphabetics = false;

        if (document.querySelector('.filter-az') && document.querySelector('.filter-recent')) {
            document.querySelector('.filter-az').classList.remove('filter-is-focus');
            document.querySelector('.filter-recent').classList.add('filter-is-focus');
        }

        // Container de rendu.
        let containerCustomer = document.querySelector('.container-customers');

        // Effacement du contenu existant.
        containerCustomer.innerHTML = "";

        // Apparition du loader.
        let loader = document.querySelector('.container-fluid-loader');
        loader.style.display = "flex";

        fetch("/app/customers/show/recent")
            .then(res => {
                return res.text();
            })
            .then(res => {

                // Dès reception, disparition du loader.
                loader.style.display = "none";

                // Injecte le contenu receptionné dans le container.
                containerCustomer.innerHTML = res;

                // Compte le nombre de client
                let countCustomers = document.querySelectorAll('.card-customers').length;
                let countWrapper = document.querySelector('#count-customer');
                countWrapper.textContent = countCustomers;


            })
            .catch(err => {
                if (err) {
                    throw err;
                }
            })
    }

}


// Met à jour en BDD les données d'un client.
function updateOneCustomer(e, id) {

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
    fetch(`/app/customers/edit/${id}`, {
            method: "POST",
            body: formData
        })
        .then(res => {

            return res.text();

        })
        .then(res => {

            // Dès reception, disparition du loader.
            loader.style.display = "none";

            // Injecte le contenu receptionné dans le container.
            app.innerHTML = res;

            onFilterAlphabetics = true;

        })
        .catch(err => {
            if (err) {
                throw err;
            }
        })
}


// Button edit Customer:
function showFormEditCustomer(id) {

    // Container de rendu.
    let app = document.querySelector('#app');

    // Effacement du contenu existant.
    app.innerHTML = "";

    // Apparition du loader.
    let loader = document.querySelector('.container-fluid-loader');
    loader.style.display = "flex";

    // Requête AJAX :
    fetch(`/app/customers/edit/${id}`, {
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
            buttonUpdateCustomer = document.querySelector('#update-button-customer');
        })
        .catch(err => {
            if (err) {
                throw err;
            }
        })
}


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

            // Injecte le contenu receptionné dans le container.
            app.innerHTML = res;

            onFilterAlphabetics = true;

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


    let spanFirstnameLastname = document.querySelector("#confirm-delete-customer-fullname");

    // spanFirstnameLastname.innerHTML = `${inputHiddenFirstname.value} ${inputHiddenLastname.value}`;

    containerConfirm = document.querySelector(".container-warning");
    buttonConfirmDelete = document.querySelector("#confirm-delete-customer-yes");

    buttonConfirmDelete.setAttribute('data-id', id);

    containerConfirm.style.visibility = "visible";
    containerConfirm.style.opacity = 1.0;
    console.log(containerConfirm.style.opacity);

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
    containerConfirm.style.visibility = "hidden";
    containerConfirm.style.opacity = 0;
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

// Montre tout les clients directement dans le container client.
function showAllCustomers() {

    onFilterAlphabetics = true;
    toggleDisplaySearchBar = false;

    // Container de rendu.
    let containerCustomer = document.querySelector('.container-customers');

    // Effacement du contenu existant.
    containerCustomer.innerHTML = "";

    // Apparition du loader.
    let loader = document.querySelector('.container-fluid-loader');
    loader.style.display = "flex";

    fetch("/app/customers/show/ajax")
        .then(res => {
            return res.text();
        })
        .then(res => {

            // Dès reception, disparition du loader.
            loader.style.display = "none";

            // Injecte le contenu receptionné dans le container.
            containerCustomer.innerHTML = res;

            // Compte le nombre de client
            let countCustomers = document.querySelectorAll('.card-customers').length;
            let countWrapper = document.querySelector('#count-customer');
            countWrapper.textContent = countCustomers;


        })
        .catch(err => {
            if (err) {
                throw err;
            }
        })

}