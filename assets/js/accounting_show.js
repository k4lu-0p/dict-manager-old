

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
    const allButtonOptions = document.querySelectorAll('.bill-options');
    const fadeAways = document.querySelectorAll('.fade-away');
    const customerName = document.querySelectorAll('.bill-customer-name');

    customerName.forEach(element => {
        element.style.left = "28%";
    });

    fadeAways.forEach(el => {
        el.style.visibility = "visible";
        el.style.opacity = 1.0;
    });
    allButtonOptions.forEach(buttonOption => {
        buttonOption.style.visibility = "hidden";
        buttonOption.style.opacity = 0;
        buttonOption.style.right = "-10%";
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

        let divOptions = document.querySelector('.bill-options-' + id);
        let divFadeAway = document.querySelectorAll('.fade-away-' + id);
        let customerNameCenter = document.querySelector('.bill-customer-name-' + id);

        // Donne en % la largeur de customerNameCenter par rapport à son parent     ( (parent * 100) / enfant )
        // Donne en % le milieu de l'element enfant                                 ( (parent * 100) / enfant ) / 2
        // Donne en % la valeur en % du placement gauche pour affichage centrer     50 - ( ( (parent * 100) / enfant ) / 2 )
        // Permet de déduire le placement du nom lors de l'apparition des boutons options
        customerNameCenter.style.left = (50 - (((customerNameCenter.offsetWidth * 100) / customerNameCenter.parentElement.offsetWidth) / 2)) + "%";

        divOptions.style.visibility = "visible";
        divOptions.style.opacity = 1.0;
        divOptions.style.right = "17.5%";

        divFadeAway.forEach(el => {
            el.style.visibility = "hidden";
            el.style.opacity = 0;
        });

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