// Premier affichage
if (document.querySelector('#app')) {
    window.addEventListener("onLoad", showChartsWithAjax());
}

// Boutton statistique du menu.
const buttonNavChart = document.querySelector('#nav-button-chart');

// Evénement : 
if (buttonNavChart) {
    buttonNavChart.addEventListener('click', showChartsWithAjax);
}

// Fonction(s) déclenchées lors de(s) événement(s) : 
// Affiche la page de statistiques, en Ajax.

function showChartsWithAjax() {

    // Container de rendu.
    let app = document.querySelector('#app');

    // Effacement du contenu existant.
    app.innerHTML = "";

    // Apparition du loader.
    let loader = document.querySelector('.container-fluid-loader');
    loader.style.display = "flex";

    fetch('/app/statistics/')
        .then(res => {
            return res.json();
        })
        .then(res => {

            // Dès reception, disparition du loader.
            loader.style.display = "none";

            // Injecte le contenu receptionné dans le container.
            app.innerHTML = res.render;

            var myLineChart = new Chart(document.querySelector('#test'), {
                type: 'line',
                data:  [{
                        x: 10,
                        y: 20
                    }, {
                        x: 15,
                        y: 10
                    }]
            });

        })
        .catch(err => {
            if (err) {
                throw err;
            }
        })
}