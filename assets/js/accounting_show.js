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

    // Apparition du loader.
    let loader = document.querySelector('.container-fluid-loader');
    loader.style.display = "flex";

    fetch(`/app/accounting/download/${id}`)
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

// Affichage les boutons details et download des factures + change la couleur des trois points
function showOptions(id, clicked) {

    const allOptionsBills = document.querySelectorAll('.options');
    let allButtonOptions = document.querySelectorAll('.bill-options');

    allButtonOptions.forEach(buttonOption => {
        buttonOption.style.visibility = "hidden";
        buttonOption.style.opacity = 0;
    });
    if (clicked.classList.contains('iSelectedColor')) {
        // On éteint tout les boutons déjà allumés.
        allOptionsBills.forEach(options => {
            if (options.classList.contains('iSelectedColor')) {
                options.classList.replace('iSelectedColor', 'iNormalColor')
            }
        });

        // Allume le bouton sélectionné.
    } else {
        allOptionsBills.forEach(options => {
            if (options.classList.contains('iSelectedColor')) {
                options.classList.replace('iSelectedColor', 'iNormalColor')
            }
        });
        clicked.classList.replace('iNormalColor', 'iSelectedColor');

        let divOptions = document.querySelector('.bill-options-' + clicked.getAttribute('data-id'))
        divOptions.style.visibility = "visible";
        divOptions.style.opacity = 1.0;

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

// // Fonction chargé d'allumé le bouton de la facture choisie.
// function activeOptionsBills(optionsBillsSelected) {

//     const allOptionsBills = document.querySelectorAll('.options');

//     if (optionsBillsSelected.classList.contains('iSelectedColor')) {
//         // On éteint tout les boutons déjà allumés.
//         allOptionsBills.forEach(options => {
//             if (options.classList.contains('iSelectedColor')) {
//                 options.classList.replace('iSelectedColor', 'iNormalColor')
//             }
//         });

//         // Allume le bouton sélectionné.
//     } else {
//         allOptionsBills.forEach(options => {
//             if (options.classList.contains('iSelectedColor')) {
//                 options.classList.replace('iSelectedColor', 'iNormalColor')
//             }
//         });
//         optionsBillsSelected.classList.replace('iNormalColor', 'iSelectedColor');
//     }

// }