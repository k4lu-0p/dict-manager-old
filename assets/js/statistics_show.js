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
            console.log(res)

            // Fonction de Jules
            Date.prototype.dayOfTheYear = function () {
                let year = this.getFullYear();
                let month = this.getMonth();
                let day = this.getDate();

                let offset = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];

                // Vérifie les années bissextile
                let bissextile = (month < 2) ? 0 : (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0));

                return parseInt(day + pffset[month] + bissextile);
            }

            // res.sessionsByFlatRate[0][0][1]["date"]
            // [0]       =  [Numero du forfait]
            // [0]       =  [Numero de la session]
            // [1]       =  [Object date]
            // ["date"]  =  [Date Année/Mois/Jour Heure/Minute/Seconde]
            console.log(res.sessionsByFlatRate[0][0][1]["date"]);

            // let weeks = [];
            // res.sessions.forEach(forfait => {
            //     forfait.forEach(session => {
            //         let weekNumber = getWeekNumber(new Date(session[1]["date"]))[1];
            //         weeks.push(weekNumber);
            //         weeks[weekNumber].push(new Date(session[1]["date"]));
            //     });
            // });

            // console.log(weeks);

            // week = [];
            // weeks = [];
            // for (let j = 0; j < res.sessions.length; j++) {
            //     let weekNumber = getWeekNumber(new Date(res.sessions[j][0]["date"]))[1];
            //     weeks[weekNumber] += res.sessions[j][0]["date"];
            // }
            // console.log(weeks)

            // Donne le numero de semaine actuelle
            let actualWeekNumber = getWeekNumber(new Date);
            console.log(actualWeekNumber);

            // let result = getWeekNumber(new Date(res.dateTest["date"]));
            // let monday = getMonday(new Date(res.dateTest["date"]));
            // console.log("Numéro jour de la semaine : " + new Date(res.dateTest["date"]).getDay());
            // console.log("Lundi de la semaine : " + monday);
            // console.log('week : ' + result[1] + ' of ' + result[0]);

            // Dès reception, disparition du loader.
            loader.style.display = "none";

            // Injecte le contenu receptionné dans le container.
            app.innerHTML = res.render;

            // GRAPHIQUE BAR ===== Graphique en bar sessions par jour dans une semaine =====

            let sunday = 0;
            let monday = 0;
            let tuesday = 0;
            let wednesday = 0;
            let thursday = 0;
            let friday = 0;
            let saturday = 0;

            res.currentWeek.forEach(day => {
                if (day["day"] == "Sunday") {
                    sunday = day["session"];
                }
                if (day["day"] == "Monday") {
                    monday = day["session"];
                }
                if (day["day"] == "Tuesday") {
                    tuesday = day["session"];
                }
                if (day["day"] == "Wednesday") {
                    wednesday = day["session"];
                }
                if (day["day"] == "Thursday") {
                    thursday = day["session"];
                }
                if (day["day"] == "Friday") {
                    friday = day["session"];
                }
                if (day["day"] == "Saturday") {
                    saturday = day["session"];
                }
            });

            let x = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            let data = [sunday, monday, tuesday, wednesday, thursday, friday, saturday];

            console.log(data)

            new Chart(document.getElementById("day-chart"), {
                type: 'bar',
                data: {
                    // Axe X
                    labels: x,
                    datasets: [{
                        // Valeur à afficher
                        data: data,
                        label: "Sessions per day",
                        backgroundColor: "#e12768",
                        fill: false
                    }]
                },
                options: {
                    title: {
                        display: true,
                        // Titre du graphique
                        text: 'Current week'
                    }
                }
            });


            // GRAPHIQUE LINE ===== Graphique en courbe sessions par semaine dans un mois =====

            // new Chart(document.getElementById("month-chart"), {
            //     type: 'line',
            //     data: {
            //         // Axe X
            //         labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            //         datasets: [{
            //             // Valeur à afficher
            //             data: [90, 25, 35, 23, 132, 70, 100],
            //             label: "Sessions per week",
            //             borderColor: "#e12768",
            //             fill: false
            //         }]
            //     },
            //     options: {
            //         title: {
            //             display: true,
            //             // Titre du graphique
            //             text: 'Current month'
            //         }
            //     }
            // });

            // GRAPHIQUE LINE ===== Graphique en courbe sessions par mois dans une année =====

            let month1 = 0; // january
            let month2 = 0; // february
            let month3 = 0; // march
            let month4 = 0; // april
            let month5 = 0; // may
            let month6 = 0; // june
            let month7 = 0; // july
            let month8 = 0; // august
            let month9 = 0; // september
            let month10 = 0; // october
            let month11 = 0; // november
            let month12 = 0; // december

            for (let m = 0; m < res.currentYear.length; m++) {
                for (let n = 1; n < res.currentYear.length + 1; n++) {
                    if (m + 1 == n) {
                        month = res.currentYear[m][session]
                    }
                }
            }

            let xMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "Novelber", "December"];
            let dataMonth = [month1, month2, month3, month4, month5, month6, month7, month8, month9, month10, month11, month12];

            new Chart(document.getElementById("year-chart"), {
                type: 'line',
                data: {
                    // Axe X
                    labels: xMonth,
                    datasets: [{
                        // Valeur à afficher
                        data: dataMonth,
                        label: "Sessions per month",
                        borderColor: "#e12768",
                        fill: false
                    }]
                },
                options: {
                    title: {
                        display: true,
                        // Titre du graphique
                        text: 'Current year'
                    }
                }
            });

            // cases inférieures nombre clients
            document.querySelector('#nbCustomers').textContent = "Number of customer : " + res.nbCustomers;
            document.querySelector('#nbFlatRates').textContent = "Number of flat rate : " + res.nbFlatRates;
            document.querySelector('#nbSessionsThisYear').textContent = "Number of session : " + res.nbSessions;
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