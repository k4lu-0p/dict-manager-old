import {
    Calendar,
    formatDate
  } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

let today = new Date();
let currentMonth = today.getMonth();
let currentDay = today.getDay() >= 7 ? 0 : today.getDay();
let globalCalendar;
let globalCalendarContainer;
let e;
let containerStatistics;
let colorsCustomer = [
    "#e12768",
    "#92a2bc",
    "#424C61",
    "#e12768",
    "#92a2bc",
    "#424C61",
    "#e12768",
    "#92a2bc",
    "#424C61"
  ];
  let loader;
  let timeOutMonthTextByDefault;

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

window.addEventListener('click', (e) => {
    if (e.target.getAttribute('aria-label') === "next" || e.target.getAttribute('aria-label') === "prev") {
        $('.nav-top-title-stats').clearQueue();
        $('.nav-top-title-stats').stop();
        $('.nav-top-title-stats').text(document.querySelector('.fc-center > h2').textContent);

    } else if (e.target.classList.contains('fc-icon-chevron-right') || e.target.classList.contains('fc-icon-chevron-left')) {
        $('.nav-top-title-stats').clearQueue();
        $('.nav-top-title-stats').stop();
        $('.nav-top-title-stats').text(document.querySelector('.fc-center > h2').textContent);
    }
})

// Fonction(s) déclenchées lors de(s) événement(s) : 
// Affiche la page de statistiques, en Ajax.

function showChartsWithAjax() {

    // Container de rendu.
    let app = document.querySelector('#app');

    // Effacement du contenu existant.
    app.innerHTML = "";

    // Apparition du loader.
    loader = document.querySelector('.container-fluid-loader');
    loader.style.display = "flex";

    fetch('/app/statistics/', {
            method: 'GET'
        })
        .then(res => {
            return res.json();
        })
        .then(res => {
            // console.log(res)
            // app.innerHTML = res;
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
            let totalSessionThisWeek = 0;

            data.forEach(element => {
                e = Number.parseInt(element);
                totalSessionThisWeek += e;
            });

            $('.chart-carousel').slick({
                infinite: false,
                dots: true,
                arrows: false  
            });

            
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

            // CONFIG CHART 1
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


            // CONFIG CHART 2
            let xMonth = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
            // let xMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
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

            let data2 = {
                // Axe X
                labels: xMonth,
                datasets: [{
                    // Valeur à afficher
                    data: dataMonth,
                    backgroundColor: "#e12768",
                    fill: false,
                    borderColor: '#e12768',
                    pointBorderColor: '#EAFFFE',
                    pointBorderWidth: 1,
                    pointRadius: 7
                }]
            };

            let options2 = {

                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: false,
                            fontColor: '#EAFFFE',
                            stepValue: 1,
                            stepSize: 5
                        },
                        gridLines: {
                            display: true,
                            color: "#343D49"
                        }
                    }],
                    xAxes: [{

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
                    text: 'Current year'
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

            let chart2 = {
                type: 'line',
                data: data2,
                options: options2
            }

            let ctx1 = document.getElementById("day-chart").getContext("2d");
            new Chart(ctx1, chart1);

            let ctx2 = document.getElementById("year-chart").getContext("2d");
            new Chart(ctx2, chart2);


            // cases inférieures nombre clients
            // document.querySelector('#nbCustomers').textContent = res.nbCustomers;
            document.querySelector('#nbSessionsThisMonth').textContent = dataMonth[currentMonth];
            document.querySelector('#nbSessionsThisDay').textContent = data[currentDay];
            document.querySelector('#nbSessionsThisWeek').textContent = totalSessionThisWeek;
            // document.querySelector('#nbFlatRates').textContent = res.nbFlatRates;
            document.querySelector('#nbSessionsThisYear').textContent = res.nbSessions;

            showGeneralCalendar();
            renderAllSessionToEvent();

            containerStatistics = document.querySelector('.container-statistics');
            $('.nav-top-title-stats').text(document.querySelector('.fc-center > h2').textContent); 

            // On swipe event
            $('.chart-carousel').on('swipe', function (event, slick, direction) {

                $('.nav-top-title-stats').stop();
                clearTimeout(timeOutMonthTextByDefault);

                if (slick.currentSlide == 1) {
                    $('.nav-top-title-stats').fadeOut();
                    containerStatistics.style.height = "80vh";
                    setTimeout(() => {
                        $('.nav-top-title-stats').text('Sessions this year');
                        $('.nav-top-title-stats').fadeIn();
                    }, 500)

                } else if (slick.currentSlide == 2) {
                    $('.nav-top-title-stats').fadeOut();
                    containerStatistics.style.height = "80vh";
                    setTimeout(() => {
                        $('.nav-top-title-stats').text('Sessions this week');
                        $('.nav-top-title-stats').fadeIn();
                    }, 500)

                } else if (slick.currentSlide == 0) {
                    $('.nav-top-title-stats').fadeOut();
                    containerStatistics.style.height = "";
                    setTimeout(() => {
                        $('.nav-top-title-stats').text(document.querySelector('.fc-center > h2').textContent);
                        $('.nav-top-title-stats').fadeIn();
                    }, 500)
                }
            });
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

// Affiche le calendrier montrant toute les sessions
function showGeneralCalendar() {

    globalCalendarContainer = document.querySelector('#global-calendar');
    
    if( globalCalendarContainer ) {
        globalCalendar = new Calendar(globalCalendarContainer, {
            plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
            height: 625,
            selectable: false,
            droppable: false,
            editable: false,
            header: {
              left: "prev,next",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay"
            },
            dateClick: info => {
            },
            eventClick: info => {
                showInfoEventOnHeader(info);
            },
            eventDrop: info => {
            },
            eventResizeStop: info => {
            }
          });

          globalCalendar.render();
          document.querySelector('.fc-center > h2').style.visibility = "hidden";
    }
    
}

function getAllSessionsForCalendar() {

    // Apparition du loader
    loader.style.display = "flex";


    return fetch(`/app/calendar/session/all`, { method : 'GET' })
    .then(res => { return res.json(); })
    .catch(err => console.log(err))
}

function renderAllSessionToEvent() {

    let i = -1;

    getAllSessionsForCalendar().then(data => {
        // console.log(data);
        // DEBUG
        // globalCalendarContainer.innerHTML = data;

        // Disparition du loader
        loader.style.display = "none";

        if (data) {
            data.forEach(customer => {
    
                i++;
                
                customer.forEach(session => {
                    // console.log(session);
                    globalCalendar.addEvent({
                        id: session.id.toString(),
                        title: `${session.firstname} ${session.lastname}`,
                        start: new Date(session.start.date),
                        end: new Date(session.end.date),
                        editable: false,
                        eventResizableFromStart: false,
                        eventStartEditable: false,
                        backgroundColor: colorsCustomer[i],
                        borderColor: colorsCustomer[i],
                        textColor: "EAFFFE"
                    });
                });
            });

        }


    })
}

// Affiche le détail de l'événement dans le header (nav top)
function showInfoEventOnHeader(info) {
    clearTimeout(timeOutMonthTextByDefault);
    $('.nav-top-title-stats').fadeOut(() => {
        $('.nav-top-title-stats').text(info.el.innerText);
        $('.nav-top-title-stats').fadeIn(() => {
            timeOutMonthTextByDefault = setTimeout(() => {
                $('.nav-top-title-stats').fadeOut(() => {
                    $('.nav-top-title-stats').text(document.querySelector('.fc-center > h2').textContent);
                    $('.nav-top-title-stats').fadeIn();
                })
            }, 2000)
        });
    });

}
