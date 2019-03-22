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

            let xWeek = ["S", "M", "T", "W", "T", "F", "S"];
            let data = [sunday, monday, tuesday, wednesday, thursday, friday, saturday];

            $('.chart-carousel').slick({
                dots: true,
                arrows: false
            });

            // On swipe event
            $('.chart-carousel').on('swipe', function (event, slick, direction) {
                if (direction == "left") {
                    $('.nav-top-title-stats').fadeOut();

                    setTimeout(() => {
                        $('.nav-top-title-stats').text('Sessions this year');
                        $('.nav-top-title-stats').fadeIn();
                    }, 500)

                } else {
                    $('.nav-top-title-stats').fadeOut();

                    setTimeout(() => {
                        $('.nav-top-title-stats').text('Sessions this week');
                        $('.nav-top-title-stats').fadeIn();
                    }, 500)

                }
            });

            // let ctx = document.getElementById("day-chart");
            // ctx.height = 500;

            Chart.defaults.global.legend.display = false;
            Chart.pluginService.register({
                beforeDraw: function (chart, easing) {
                    if (chart.config.options.chartArea) {
                        let ctx = chart.chart.ctx;
                        let chartArea = chart.chartArea;
                        let source = document.getElementById('source');

                        ctx.save();
                        ctx.fillStyle = chart.config.options.chartArea.backgroundColor;
                        ctx.drawImage(source, chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);

                        ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
                        ctx.restore();
                    }
                }
            });

            let data1 = {
                // Axe X
                labels: xWeek,

                datasets: [{
                    // Valeur à afficher
                    data: data,
                    backgroundColor: "#e12768",
                    fill: false
                }]
            };

            let options1 = {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontColor: '#EAFFFE',
                            stepValue: 1,
                            stepSize: 1
                        },
                        gridLines: {
                            display: true,
                            color: "#343D49"
                        }
                    }],
                    xAxes: [{
                        barPercentage: 0.1,
                        ticks: {
                            beginAtZero: true,
                            fontColor: '#EAFFFE'
                        },
                        gridLines: {
                            display: true,
                            color: "#343D49"
                        }
                    }],
                    legend: {

                        labels: {

                            fontColor: '#EAFFFE'
                        }
                    }
                },
                title: {
                    display: false,
                    // Titre du graphique
                    text: 'Current week'
                },
                chartArea: {
                    backgroundColor: 'transparent'
                }
            }

            let chart1 = {
                type: 'bar',
                data: data1,
                options: options1
            }

            let ctx = document.getElementById("day-chart").getContext("2d");
            new Chart(ctx, chart1);




            let xMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let dataMonth = [
                res.currentYear.January,
                res.currentYear.February,
                res.currentYear.March,
                res.currentYear.April,
                res.currentYear.May,
                res.currentYear.June,
                res.currentYear.July,
                res.currentYear.August,
                res.currentYear.September,
                res.currentYear.October,
                res.currentYear.November,
                res.currentYear.December
            ];

            new Chart(document.getElementById("year-chart"), {
                type: 'line',
                data: {
                    // Axe X
                    labels: xMonth,

                    datasets: [{
                        // Valeur à afficher
                        data: dataMonth,

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
            document.querySelector('#nbCustomers').textContent = res.nbCustomers;
            document.querySelector('#nbFlatRates').textContent = res.nbFlatRates;
            document.querySelector('#nbSessionsThisYear').textContent = res.nbSessions;
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