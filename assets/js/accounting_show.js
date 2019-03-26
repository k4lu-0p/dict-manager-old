// Boutton comptabilité du menu.
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

            // Montre la facture choisie
            showOneBill();


        })
        .catch(err => {
            if (err) {
                throw err;
            }
        })
}

function showOneBill() {

    const bills = document.querySelectorAll(".card-accounting");

    bills.forEach(oneBill => {

        oneBill.addEventListener('click', (e) => {

            // Container de rendu.
            let app = document.querySelector('#app');

            // Effacement du contenu existant.
            app.innerHTML = "";

            // Apparition du loader.
            let loader = document.querySelector('.container-fluid-loader');
            loader.style.display = "flex";

            let id = oneBill.getAttribute('data-id');
            fetch(`/app/accounting/show/${id}`)
                .then(res => {
                    return res.text();
                })
                .then(res => {

                    // Dès reception, disparition du loader.
                    loader.style.display = "none";

                    // Injecte le contenu receptionné dans le container.
                    app.innerHTML = res;

                    // Télécharge la facture au format pdf
                    downloadBill();

                })
                .catch(err => {
                    if (err) {
                        throw err;
                    }
                })
        });
    })
}

function downloadBill() {

    const downloadBill = document.querySelector('#download-bill');

    downloadBill.addEventListener('click', (e) => {
        e.preventDefault();

        // Container de rendu.
        let app = document.querySelector('#app');

        // Effacement du contenu existant.
        app.innerHTML = "";

        // Apparition du loader.
        let loader = document.querySelector('.container-fluid-loader');
        loader.style.display = "flex";

        let id = e.target.getAttribute('data-id');
        fetch(`/app/accounting/download/${id}`)
            .then(res => {
                return res.text();
            })
            .then(res => {

                // Dès reception, disparition du loader.
                loader.style.display = "none";

                showAccountingWithAjax()

            })
            .catch(err => {
                if (err) {
                    throw err;
                }
            })
    });
}