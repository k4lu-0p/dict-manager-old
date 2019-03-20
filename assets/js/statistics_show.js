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

    fetch('/app/statistics/', {
            method: 'GET'
        })
        .then(res => {
            return res.json();
        })
        .then(res => {

            console.log(res.sessions)

            // BIENTOT   Tri par semaine des sessions

            // week = [];
            // weeks = [];
            // for (let j = 0; j < res.sessions.length; j++) {
            //     let weekNumber = getWeekNumber(new Date(res.sessions[j][0]["date"]))[1];
            //     weeks[weekNumber] += res.sessions[j][0]["date"];
            // }
            // console.log(weeks)

            let result = getWeekNumber(new Date(res.dateTest["date"]));
            let monday = getMonday(new Date(res.dateTest["date"]));
            console.log("Numéro jour de la semaine : " + new Date(res.dateTest["date"]).getDay());
            console.log("Lundi de la semaine : " + monday);
            console.log('week : ' + result[1] + ' of ' + result[0]);

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

function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    // Return array of year and week number
    return [d.getUTCFullYear(), weekNo];
}

function getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
}