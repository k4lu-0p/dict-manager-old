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

            // Graphique courbe
            new Chart(document.getElementById("test"), {
                type: 'line',
                data: {
                    // Axe X
                    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    datasets: [{
                        // Valeur à afficher
                        data: [90, 25, 35, 23, 132, 70, 100],
                        label: "Something",
                        borderColor: "#e12768",
                        fill: false
                    }]
                },
                options: {
                    title: {
                        display: true,
                        // Titre du graphique
                        text: 'A chart about something'
                    }
                }
            });

            // cases inférieures nombre clients
            document.querySelector('#nbCustomers').textContent = "Number of customer : " + res.nbCustomers;
            document.querySelector('#nbFlatRates').textContent = "Number of flat rate : " + res.nbFlatRates;
            document.querySelector('#nbSessions').textContent = "Number of session : " + res.nbSessions;
        })
        .catch(err => {
            if (err) {
                throw err;
            }
        })
}