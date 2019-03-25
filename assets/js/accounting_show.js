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

            const downloadBills = document.querySelectorAll('.download-bill');

            downloadBills.forEach(downloadBill => {

                downloadBill.addEventListener('click', (e) => {
                    e.preventDefault();
                    let id = e.target.getAttribute('data-id');
                    fetch(`/app/accounting/download/${id}`)
                        .then(res => {
                            return res.text();
                        })
                        .then(res => {

                            console.log(res)
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
            })
        })
        .catch(err => {
            if (err) {
                throw err;
            }
        })
}