// bouton comptabilité du menu.
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
    let loader = document.querySelector('.container-fluid-loader');
    loader.style.display = "flex";

    fetch('/app/accounting/')
        .then(res => {
            return res.text();
        })
        .then(res => {

            // Dès reception, disparition du loader.
            loader.style.display = "none";

            // Injecte le contenu receptionné dans le container.
            app.innerHTML = res;

            // Compte du nombre de facture
            let countBill = document.querySelectorAll(".card-accounting").length;
            let countWrapper = document.querySelector("#count-bill");
            countWrapper.textContent = countBill;

        })
        .catch(err => {
            if (err) {
                throw err;
            }
        })
}

// Action sur les bills.
window.addEventListener('click', (e) => {
    let id = e.target.getAttribute('data-id') ? e.target.getAttribute('data-id') : undefined;

    switch (e.target.getAttribute('data-action')) {
        case "showBill":
            showOneBill(id);
            break;
        case "downloadBill":
            downloadBill(id);
            break;
        case "showOptions":
            showOptions(id, e.target);
            break;
        case "previousBill":
            showAccountingWithAjax();
            break;

        default:
            break;
    }
});


function showOneBill(id) {

    // Container de rendu.
    let app = document.querySelector('#app');

    // Effacement du contenu existant.
    app.innerHTML = "";

    // Apparition du loader.
    let loader = document.querySelector('.container-fluid-loader');
    loader.style.display = "flex";


    fetch(`/app/accounting/show/${id}`)
        .then(res => {
            return res.text();
        })
        .then(res => {

            // Dès reception, disparition du loader.
            loader.style.display = "none";
            // Injecte le contenu receptionné dans le container.
            app.innerHTML = res;

            defineActionPreviousButton("previousBill");
        })
        .catch(err => {
            if (err) {
                throw err;
            }
        })

}

function downloadBill(id) {

    // DEBUG
    let app = document.querySelector('#app');

    // Apparition du loader.
    let loader = document.querySelector('.container-fluid-loader');
    loader.style.display = "flex";

    fetch(`/app/accounting/download/${id}`)
        .then(res => {
            return res.text();
        })
        .then(res => {
            // // DEBUG
            // app.innerHTML = res;
            // Dès reception, disparition du loader.
            loader.style.display = "none";

        })
        .catch(err => {
            if (err) {
                throw err;
            }
        })
}

// Affichage les boutons details et download des factures + change la couleur des trois points
function showOptions(id, clicked) {

    const allOptionsBills = document.querySelectorAll('.iSelectedColor');
    const card = document.querySelectorAll('.card-accounting');

    card.forEach(el => {
        let test = Array.from(el.children);
        test.forEach(child => {
            // Photo
            if (child.classList.contains('bill-customer-picture')) {
                child.style.visibility = "visible";
                child.style.opacity = 1.0;
            }

            // Info
            if (child.classList.contains('bill-infos')) {
                child.style.visibility = "visible";
                child.style.opacity = 1.0;
            }

            // Nom
            if (child.classList.contains('bill-customer-name')) {
                child.style.left = "28%";
            }

            // Bouton details download
            if (child.classList.contains('bill-options')) {
                child.style.visibility = "hidden";
                child.style.opacity = 0;
                child.style.right = "-10%";
            }

        });
    });

    let divOptions = document.querySelector('.bill-options-' + id);
    let customerPicture = document.querySelector('.bill-customer-picture-' + id);
    let infos = document.querySelector('.bill-infos-' + id);
    let customerNameCenter = document.querySelector('.bill-customer-name-' + id);

    // Eteind si click sur l'element deja actif
    if (clicked.classList.contains('iSelectedColor')) {
        
        // On éteint tous les boutons déjà allumés.
        allOptionsBills.forEach(options => {
            options.classList.replace('iSelectedColor', 'iNormalColor')
        });

        divOptions.style.visibility = "hidden";
        divOptions.style.opacity = 0;
        divOptions.style.right = "-10%";

        customerPicture.style.visibility = "visible";
        customerPicture.style.opacity = 1.0;

        infos.style.visibility = "visible";
        infos.style.opacity = 1.0;

    } else {
        // Allume le bouton sélectionné.

        // On éteint tous les boutons déjà allumés.
        allOptionsBills.forEach(options => {
                options.classList.replace('iSelectedColor', 'iNormalColor')
        });

        clicked.classList.replace('iNormalColor', 'iSelectedColor');

        customerNameCenter.style.left = (50 - (((customerNameCenter.offsetWidth * 100) / customerNameCenter.parentElement.offsetWidth) / 2)) + "%";

        divOptions.style.visibility = "visible";
        divOptions.style.opacity = 1.0;
        divOptions.style.right = "17.5%";

        customerPicture.style.visibility = "hidden";
        customerPicture.style.opacity = 0;

        infos.style.visibility = "hidden";
        infos.style.opacity = 0;
    }
}

// Définir le role du bouton précédent en fonction de là ou on se trouve.
function defineActionPreviousButton(dataAction, id) {

    let buttonNavPrevious = document.querySelector('#nav-button-back');

    if (buttonNavPrevious) {
        buttonNavPrevious.setAttribute('data-action', dataAction);

        if (id) {
            buttonNavPrevious.setAttribute('data-id', id);
        }
    }
}

// Affiche/Referme la barre de recherche quand on clique sur la loupe.
function displaySearchBar() {
    let containerSearchBar = document.querySelector(".container-search-bar");
    let buttonSearch = document.querySelector("#button-search-customer");

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