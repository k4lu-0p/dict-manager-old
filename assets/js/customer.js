import {
  Calendar,
  formatDate
} from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import SecurityForm  from "./SecurityForm.js";

const SF = new SecurityForm();

// Bouton clients du menu.
const buttonNavCustomers = document.querySelector("#nav-button-customers");
const navbar = document.querySelector(".navbar");

// 2019-12-01 01:01 pm
const regexDateStart = /^\d{4}\/(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])\s\b((1[0-2]|0?[1-9]):([0-5][0-9]) ([AaPp][Mm]))$/;
const regexDateEnd = /^\d{4}\/(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])\s\b((1[0-2]|0?[1-9]):([0-5][0-9]) ([AaPp][Mm]))$/;
// 01-12-2019 01:01 pm
const regexDateStart2 = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/\d{4}\s\b((1[0-2]|0?[1-9]):([0-5][0-9]) ([AaPp][Mm]))$/;
const regexDateEnd2 = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/\d{4}\s\b((1[0-2]|0?[1-9]):([0-5][0-9]) ([AaPp][Mm]))$/;

let buttonPrevious;
let buttonConfirmDelete;
let containerConfirm;
let containerSessionAdd;
let buttonAddCustomer;
let onFilterAlphabetics;
let toggleDisplaySearchBar;
let valueInputSearch;
let loadSearch;
let map = null;
let marker;
let calendarContainerForOne;
let calendarForOne;
let colorsFlatrates = [
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
let x = 0;
let toggleBtnAddSession = false;
let toggleEventClick = false;
let loader;
let firstnameCheck;
let lastnameCheck;
let phoneCheck;
let mailCheck;

// Evénements :
// Faire disparaître le menu quand on affiche le clavier smartphone
window.onresize = e => {
  if (e.path[0].innerHeight < 500) {
    navbar.style.display = "none";
  } else {
    navbar.style.display = "block";
  }
};

if (navbar) {
  // Lorsque je clique sur l'icone Client du menu :
  navbar.addEventListener("click", e => {
    if (e.target != null && e.target != undefined) {
      // Affichage de tous les clients
      if (
        e.target.id == "nav-button-customers" ||
        e.target.parentElement.id == "nav-button-customers"
      ) {
        showCustomers();
      }
    }
  });
}


// A chaque touche pressées :
window.addEventListener("keyup", e => {
  clearTimeout(loadSearch);

  loadSearch = setTimeout(() => {
    searchCustomer();
  }, 200);
});

// Action sur les customers.
window.addEventListener("touchstart", e => {

  displayNameCustomerOnChangeViewCalendar(e.target);

  let id = e.target.getAttribute("data-id") ?
    e.target.getAttribute("data-id") :
    undefined;

  switch (e.target.getAttribute("data-action")) {
    case "show":
      showOneCustomer(id);
      break;
    case "ajax":
      showAllCustomers();
      break;
    case "previous":
      showCustomers();
      break;
    case "delete":
      deleteOneCustomer(id);
      break;
    case "yes":
      deleteConfirmCustomer(id);
      break;
    case "no":
      deleteCancelCustomer();
      break;
    case "cancel-session-add":
      sessionAddCancel();
      break;  
    case "new":
      showFormNewCustomer();
      break;
    case "add":
      addOneCustomer(e);
      break;
    case "edit":
      showFormEditCustomer(id);
      break;
    case "update":
      updateOneCustomer(e, id);
      break;
    case "alphabetics":
      showByAlphabeticCustomer(e);
      break;
    case "recent":
      showByRecentCustomer(e);
      break;
    case "toggle":
      displaySearchBar();
      break;
    case "show-calendar":
      showCalendarOfOneCustomer(id);
      break;
    case "save-new-session":
      saveNewSessionCalendar(id);
      break;
    case "save-update-session":
      saveUpdateSessionCalendar(id);
      break;
    case "delete-session":
      deleteSession(id);
    default:
      break;
  }
});

function showCalendarOfOneCustomer(idCustomer) {
  // Container de rendu.
  let app = document.querySelector("#app");

  // Effacement du contenu existant.
  app.innerHTML = "";

  // Apparition du loader.
   loader = document.querySelector(".container-fluid-loader");
  loader.style.display = "flex";

  // Requête AJAX :
  fetch(`/app/calendar/session/customer/${idCustomer}`, {
      method: "GET"
    })
    .then(res => {
      return res.json();
    })
    .then(res => {
      // Dès reception, disparition du loader.
      loader.style.display = "none";

      // Injecte le contenu receptionné dans le container.
      app.innerHTML = res.render;

      // Revenir sur la page info client
      defineActionPreviousButton("show", idCustomer);

      // Boutton d'envois du formulaire.
      // buttonUpdateCustomer = document.querySelector('#update-button-customer');

      // Selection de la div contenant le calendrier
      calendarContainerForOne = document.getElementById("calendar-add-session");

      // Instanciation et configuration du calendrier
      calendarForOne = new Calendar(calendarContainerForOne, {
        plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
        height: 625,
        longPressDelay: 500,
        selectable: true,
        customButtons: {
          myCustomButton: {
            text: "+",
            click: function (event) {
              if (toggleBtnAddSession == false) {
                toggleBtnAddSession = true;
                loader.style.display = "flex";
                showFormNewSessionCalendar(idCustomer);
              }
            }
          }
        },
        header: {
          // Définir les boutons ainsi que leurs positions dans le header.
          left: "prev,next, myCustomButton",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay"
        },
        dateClick: function (info) {
          // Déclenche la fonction suivante au clique d'un jour.
          // console.log(info);
         
        },
        eventClick: function (info) {
          if (toggleEventClick == false ) {
            toggleEventClick = true;
            showFormUpdateDeleteSession(info.event.id, idCustomer);
          }
        },
        eventDrop: info => {
          saveEventDropResize(info);
        },
        eventResizeStop: info => {
          saveEventDropResize(info);
        }
      });

      if (res.flatrates) {
        // Ajoute les sessions du forfait du client au calendrier
        addExistingDateToCalendar(res.flatrates);
      }

      calendarForOne.render(); // Faire le rendu du calendrier.
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });
}

// Rechercher un customer dynamiquement.
function searchCustomer() {
  if (document.querySelector("#input-search")) {
    // Valeur dans le champ
    valueInputSearch = document.querySelector("#input-search").value;

    if (valueInputSearch.length >= 2) {
      // Formulaire à envoyer en POST.
      let formData = new FormData();
      formData.append("search", valueInputSearch);

      // Container de rendu.
      let containerCustomer = document.querySelector(".container-customers");

      // Effacement du contenu existant.
      containerCustomer.innerHTML = "";

      // Apparition du loader.
       loader = document.querySelector(".container-fluid-loader");
      loader.style.display = "flex";

      fetch("/app/customers/search", {
          method: "POST",
          body: formData
        })
        .then(res => {
          return res.text();
        })
        .then(res => {
          // Dès reception, disparition du loader.
          loader.style.display = "none";

          // Injecte le contenu receptionné dans le container.
          containerCustomer.style.display = "grid";
          containerCustomer.innerHTML = res;

          // // Revenir sur la page principal
          defineActionPreviousButton("previous");

          // Compte le nombre de client
          let countCustomers = document.querySelectorAll(".card-customers")
            .length;
          let countWrapper = document.querySelector("#count-customer");
          countWrapper.textContent = countCustomers;

          if (countCustomers == 0) {
            containerCustomer.style.display = "block";
            containerCustomer.innerHTML =
              "<h1 class='no-result text-center'> No result found </h1>";
          }
        })
        .catch(err => {
          if (err) {
            throw err;
          }
        });
    } else if (valueInputSearch.length == 0) {
      showAllCustomers();
    }
  }
}

// Affiche/Referme la barre de recherche quand on clique sur la loupe.
function displaySearchBar() {
  let containerSearchBar = document.querySelector(".container-search-bar");
  let buttonSearch = document.querySelector("#button-search-customer");

  if (toggleDisplaySearchBar) {
    toggleDisplaySearchBar = false;
    buttonSearch.style.color = "#92a2bc";
    containerSearchBar.style.visibility = "hidden";
    containerSearchBar.style.top = "-70px";
  } else {
    toggleDisplaySearchBar = true;
    buttonSearch.style.color = "#EAFFFE";
    containerSearchBar.style.visibility = "visible";
    containerSearchBar.style.top = "70px";
  }
}

// Montre tout les clients en raffraichissant toute la page.
function showCustomers() {
  onFilterAlphabetics = true;
  toggleDisplaySearchBar = false;

  // Container de rendu.
  let app = document.querySelector("#app");

  // Effacement du contenu existant.
  app.innerHTML = "";

  // Apparition du loader.
   loader = document.querySelector(".container-fluid-loader");
  loader.style.display = "flex";

  fetch("/app/customers/show/all")
    .then(res => {
      return res.text();
    })
    .then(res => {
      // Dès reception, disparition du loader.
      loader.style.display = "none";

      // Injecte le contenu receptionné dans le container.
      app.innerHTML = res;

      // Compte le nombre de client
      let countCustomers = document.querySelectorAll(".card-customers").length;
      let countWrapper = document.querySelector("#count-customer");
      countWrapper.textContent = countCustomers;
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });
}

// Boutton Précédent sur un client + Button navbar + Filtre alphabetics
function showByAlphabeticCustomer(e) {
  if (!onFilterAlphabetics) {
    onFilterAlphabetics = true;

    if (
      document.querySelector(".filter-az") &&
      document.querySelector(".filter-recent")
    ) {
      document.querySelector(".filter-az").classList.add("filter-is-focus");
      document
        .querySelector(".filter-recent")
        .classList.remove("filter-is-focus");
    }

    // Container de rendu.
    let containerCustomer = document.querySelector(".container-customers");

    // Effacement du contenu existant.
    containerCustomer.innerHTML = "";

    // Apparition du loader.
     loader = document.querySelector(".container-fluid-loader");
    loader.style.display = "flex";

    fetch("/app/customers/show/alphabetics")
      .then(res => {
        return res.text();
      })
      .then(res => {
        // Dès reception, disparition du loader.
        loader.style.display = "none";

        // Injecte le contenu receptionné dans le container.
        containerCustomer.innerHTML = res;
        containerCustomer.style.display = "grid";

        // Compte le nombre de client
        let countCustomers = document.querySelectorAll(".card-customers")
          .length;
        let countWrapper = document.querySelector("#count-customer");
        countWrapper.textContent = countCustomers;
      })
      .catch(err => {
        if (err) {
          throw err;
        }
      });
  }
}

// Filtre par la plus recente inscription.
function showByRecentCustomer(e) {
  if (onFilterAlphabetics) {
    onFilterAlphabetics = false;

    if (
      document.querySelector(".filter-az") &&
      document.querySelector(".filter-recent")
    ) {
      document.querySelector(".filter-az").classList.remove("filter-is-focus");
      document.querySelector(".filter-recent").classList.add("filter-is-focus");
    }

    // Container de rendu.
    let containerCustomer = document.querySelector(".container-customers");

    // Effacement du contenu existant.
    containerCustomer.innerHTML = "";

    // Apparition du loader.
     loader = document.querySelector(".container-fluid-loader");
    loader.style.display = "flex";

    fetch("/app/customers/show/recent")
      .then(res => {
        return res.text();
      })
      .then(res => {
        // Dès reception, disparition du loader.
        loader.style.display = "none";

        // Injecte le contenu receptionné dans le container.
        containerCustomer.innerHTML = res;

        // Compte le nombre de client
        let countCustomers = document.querySelectorAll(".card-customers")
          .length;
        let countWrapper = document.querySelector("#count-customer");
        countWrapper.textContent = countCustomers;
      })
      .catch(err => {
        if (err) {
          throw err;
        }
      });
  }
}

// Met à jour en BDD les données d'un client.
function updateOneCustomer(e, id) {
  e.preventDefault();

  // Formulaire à envoyer en POST.
  let formData = new FormData();

  let firstname = document.querySelector("#customer_firstname").value;
  let lastname = document.querySelector("#customer_lastname").value;
  let phone = document.querySelector("#customer_phone").value;
  let email = document.querySelector("#customer_email").value;
  let makani = document.querySelector("#customer_addressNumber").value;
  let streetNumber = document.querySelector("#customer_streetNumber").value;
  let streetName = document.querySelector("#customer_streetName").value;
  let city = document.querySelector("#customer_city").value;
  let postalCode = document.querySelector("#customer_pc").value;
  let country = document.querySelector("#customer_country").value;
  let building = document.querySelector("#customer_building").value;
  let picture = document.querySelector("#customer_picture").files[0];
  let newsletter = document.querySelector("#customer_newsletter").value;
  let token = document.querySelector("#customer__token").value;

  // Ajout des valeurs dans l'objet formulaire.
  formData.append("customer[firstname]", firstname);
  formData.append("customer[lastname]", lastname);
  formData.append("customer[phone]", phone);
  formData.append("customer[email]", email);
  formData.append("customer[addressNumber]", makani);
  formData.append("customer[streetNumber]", streetNumber);
  formData.append("customer[streetName]", streetName);
  formData.append("customer[city]", city);
  formData.append("customer[pc]", postalCode);
  formData.append("customer[country]", country);
  formData.append("customer[building]", building);
  formData.append("customer[picture]", picture);
  formData.append("customer[newsletter]", newsletter);
  formData.append("customer[_token]", token);

  firstnameCheck = SF.firstnameIsCheck(firstname, document.querySelector("#customer_firstname"));
  lastnameCheck = SF.lastnameIsCheck(lastname, document.querySelector("#customer_lastname"));
  phoneCheck = SF.phoneIsCheck(phone, document.querySelector("#customer_phone"));
  mailCheck = SF.mailIsCheck(email, document.querySelector("#customer_email"));

  if (firstnameCheck && lastnameCheck && phoneCheck && mailCheck) {

    // Effacement du contenu existant.
    app.innerHTML = "";
  
    // Apparition du loader.
     loader = document.querySelector(".container-fluid-loader");
    loader.style.display = "flex";
  
    // Requête AJAX :
    fetch(`/app/customers/edit/${id}`, {
        method: "POST",
        body: formData
      })
      .then(res => {
        return res.text();
      })
      .then(res => {
        // Dès reception, disparition du loader.
        loader.style.display = "none";
  
        // Injecte le contenu receptionné dans le container.
        app.innerHTML = res;
  
        onFilterAlphabetics = true;
      })
      .catch(err => {
        if (err) {
          throw err;
        }
      });

  }
}

// Button edit Customer:
function showFormEditCustomer(id) {
  // Container de rendu.
  let app = document.querySelector("#app");

  // Effacement du contenu existant.
  app.innerHTML = "";

  // Apparition du loader.
   loader = document.querySelector(".container-fluid-loader");
  loader.style.display = "flex";

  // Requête AJAX :
  fetch(`/app/customers/edit/${id}`, {
      method: "GET"
    })
    .then(res => {
      return res.text();
    })
    .then(res => {
      // Dès reception, disparition du loader.
      loader.style.display = "none";

      // Injecte le contenu receptionné dans le container.
      app.innerHTML = res;

      // Revenir sur la page info client
      defineActionPreviousButton("show", id);

      // Boutton d'envois du formulaire.
      let buttonUpdateCustomer = document.querySelector("#update-button-customer");
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });
}

// Button add Customer :
function addOneCustomer(e) {
  e.preventDefault();

  // Formulaire à envoyer en POST.
  let formData = new FormData();

  let firstname = document.querySelector("#customer_firstname").value;
  let lastname = document.querySelector("#customer_lastname").value;
  let phone = document.querySelector("#customer_phone").value;
  let email = document.querySelector("#customer_email").value;
  let makani = document.querySelector("#customer_addressNumber").value;
  let streetNumber = document.querySelector("#customer_streetNumber").value;
  let streetName = document.querySelector("#customer_streetName").value;
  let city = document.querySelector("#customer_city").value;
  let postalCode = document.querySelector("#customer_pc").value;
  let country = document.querySelector("#customer_country").value;
  let building = document.querySelector("#customer_building").value;
  let picture = document.querySelector("#customer_picture").files[0];

  let newsletter = document.querySelector("#customer_newsletter").value;
  let token = document.querySelector("#customer__token").value;

  // Ajout des valeurs dans l'objet formulaire.
  formData.append("customer[firstname]", firstname);
  formData.append("customer[lastname]", lastname);
  formData.append("customer[phone]", phone);
  formData.append("customer[email]", email);
  formData.append("customer[addressNumber]", makani);
  formData.append("customer[streetNumber]", streetNumber);
  formData.append("customer[streetName]", streetName);
  formData.append("customer[city]", city);
  formData.append("customer[pc]", postalCode);
  formData.append("customer[country]", country);
  formData.append("customer[building]", building);
  formData.append("customer[picture]", picture);
  formData.append("customer[newsletter]", newsletter);
  formData.append("customer[_token]", token);

  firstnameCheck = SF.firstnameIsCheck(firstname, document.querySelector("#customer_firstname"));
  lastnameCheck = SF.lastnameIsCheck(lastname, document.querySelector("#customer_lastname"));
  phoneCheck = SF.phoneIsCheck(phone, document.querySelector("#customer_phone"));
  mailCheck = SF.mailIsCheck(email, document.querySelector("#customer_email"));

  if (firstnameCheck && lastnameCheck && phoneCheck && mailCheck) {

    // Effacement du contenu existant.
    app.innerHTML = "";
  
    // Apparition du loader.
     loader = document.querySelector(".container-fluid-loader");
    loader.style.display = "flex";
  
    // Requête AJAX :
    fetch("/app/customers/add", {
        method: "POST",
        body: formData
      })
      .then(res => {
        return res.text();
      })
      .then(res => {
        // Dès reception, disparition du loader.
        loader.style.display = "none";
  
        // Injecte le contenu receptionné dans le container.
        app.innerHTML = res;
  
        onFilterAlphabetics = true;
      })
      .catch(err => {
        if (err) {
          throw err;
        }
      });

  }

}

// Button new Customer :
function showFormNewCustomer() {
  // Container de rendu.
  let app = document.querySelector("#app");

  // Effacement du contenu existant.
  app.innerHTML = "";

  // Apparition du loader.
   loader = document.querySelector(".container-fluid-loader");
  loader.style.display = "flex";

  // Requête AJAX :
  fetch("/app/customers/add", {
      method: "GET"
    })
    .then(res => {
      return res.text();
    })
    .then(res => {
      // Dès reception, disparition du loader.
      loader.style.display = "none";

      // Injecte le contenu receptionné dans le container.
      app.innerHTML = res;

      defineActionPreviousButton("previous");

      // Boutton d'envois du formulaire.
      buttonAddCustomer = document.querySelector("#add-button-customer");
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });
}

// Button Supprimé :
function deleteOneCustomer(id) {
  let spanFirstnameLastname = document.querySelector(
    "#confirm-delete-customer-fullname"
  );

  // spanFirstnameLastname.innerHTML = `${inputHiddenFirstname.value} ${inputHiddenLastname.value}`;

  containerConfirm = document.querySelector(".container-warning");
  buttonConfirmDelete = document.querySelector("#confirm-delete-customer-yes");

  buttonConfirmDelete.setAttribute("data-id", id);

  containerConfirm.style.visibility = "visible";
  containerConfirm.style.opacity = 1.0;
}

// Button Yes Confirm to Delete :
function deleteConfirmCustomer(id) {
  // Container de rendu.
  let app = document.querySelector("#app");

  // Effacement du contenu existant.
  app.innerHTML = "";

  // Apparition du loader.
   loader = document.querySelector(".container-fluid-loader");
  loader.style.display = "flex";

  fetch(`/app/customers/delete/${id}`, {
      method: "DELETE"
    })
    .then(res => {
      return res.text();
    })
    .then(res => {
      // Dès reception, disparition du loader.
      loader.style.display = "none";

      // Injecte le contenu receptionné dans le container.
      app.innerHTML = res;
    });
}

// Button No Confirm to Delete :
function deleteCancelCustomer() {
  containerConfirm = document.querySelector(".container-warning");
  containerConfirm.style.visibility = "hidden";
  containerConfirm.style.opacity = 0;
}

// Button No Confirm to add Session :
function sessionAddCancel() {
  containerSessionAdd = document.querySelector(".wrapper-form-calendar-add-session");
  containerSessionAdd.style.visibility = "hidden";
  containerSessionAdd.style.opacity = 0;
  document.querySelector("#session_free").checked = false;
  document.querySelector("#session_dateStart").value = "";
  document.querySelector("#session_dateEnd").value = "";
}

// Button Détail :
function showOneCustomer(id) {
  // Container de rendu.
  let app = document.querySelector("#app");

  // Effacement du contenu existant.
  app.innerHTML = "";

  // Apparition du loader.
   loader = document.querySelector(".container-fluid-loader");
  loader.style.display = "flex";

  fetch(`/app/customers/show/${id}`, {
      method: "GET"
    })
    .then(res => {
      return res.text();
    })
    .then(res => {
      // Dès reception, disparition du loader.
      loader.style.display = "none";

      // Injecte le contenu receptionné dans le container.
      app.innerHTML = res;

      // Revenir sur la page principal
      defineActionPreviousButton("previous");

      // Carousel
      $(".customer-carousel").slick({
        infinite: false,
        dots: true,
        arrows: false
      });

      // Capte les coordonnées des champs cachées
      if (document.querySelector("#lat") && document.querySelector("#lng")) {
        let myLatLng = {
          lat: parseFloat(document.querySelector("#lat").value),
          lng: parseFloat(document.querySelector("#lng").value)
        };

        // Affiche la map
        let mapProp = {
          center: new google.maps.LatLng(25.2, 55.27),
          zoom: 10,
          streetViewControl: false
        };

        map = new google.maps.Map(
          document.getElementById("googleMap"),
          mapProp
        );

        let infowindow = new google.maps.InfoWindow({
          content: `<a class="btn-infobulle-map p-3" href="https://map.google.com/?q=${
            myLatLng.lat
          },${myLatLng.lng}">View path</a>`
        });

        marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: "Hello World!"
        });

        marker.addListener("click", function () {
          infowindow.open(map, marker);
        });
      } else {

        // Affiche la map
        let mapProp = {
          center: new google.maps.LatLng(25.2, 55.27),
          zoom: 10,
          streetViewControl: false
        };

        map = new google.maps.Map(
          document.getElementById("googleMap"),
          mapProp
        );

        
      }
    });
}

// Montre tout les clients directement dans le container client.
function showAllCustomers() {
  onFilterAlphabetics = true;
  toggleDisplaySearchBar = false;

  // Container de rendu.
  let containerCustomer = document.querySelector(".container-customers");

  // Effacement du contenu existant.
  containerCustomer.innerHTML = "";

  // Apparition du loader.
   loader = document.querySelector(".container-fluid-loader");
  loader.style.display = "flex";

  fetch("/app/customers/show/ajax")
    .then(res => {
      return res.text();
    })
    .then(res => {
      // Dès reception, disparition du loader.
      loader.style.display = "none";

      // Injecte le contenu receptionné dans le container.
      containerCustomer.innerHTML = res;
      containerCustomer.style.display = "grid";

      // Compte le nombre de client
      let countCustomers = document.querySelectorAll(".card-customers").length;
      let countWrapper = document.querySelector("#count-customer");
      countWrapper.textContent = countCustomers;
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });
}

// Définir le role du boutton précédent en fonction de là ou on se trouve.
function defineActionPreviousButton(dataAction, id) {
  let buttonNavPrevious = document.querySelector("#nav-button-back");

  if (buttonNavPrevious) {
    buttonNavPrevious.setAttribute("data-action", dataAction);

    if (id) {
      buttonNavPrevious.setAttribute("data-id", id);
    }
  }
}

// Instancie la carte Google Map
function myMap() {
  let mapProp = {
    center: new google.maps.LatLng(51.508742, -0.12085),
    zoom: 5
  };
}

// Permet de faire le rendu des sessions existante dans le calendrier.
function addExistingDateToCalendar(flatratesArrays) {
  let i = -1;

  flatratesArrays.forEach(datesArrays => {
    i++;
    datesArrays.forEach(array => {
      calendarForOne.addEvent({
        id: array.id.toString(),
        title: `Forfait n°${i + 1}`,
        start: new Date(array.start.date),
        end: new Date(array.end.date),
        editable: true,
        eventResizableFromStart: true,
        eventStartEditable: true,
        backgroundColor: colorsFlatrates[i],
        borderColor: colorsFlatrates[i],
        textColor: "EAFFFE"
      });
    });
  });
}

// Sauvegarde le déplacement d'une session via Drag'n Drop.
function saveEventDropResize(info) {
  let dateStart = info.event.start;
  let dateEnd = info.event.end;

  let idSession = info.event.id;
  let formDataMove = new FormData();

  formDataMove.append("dateStart", dateStart);
  formDataMove.append("dateEnd", dateEnd);

  fetch(`/app/calendar/session/update/${idSession}`, {
      method: "POST",
      body: formDataMove
    })
    .then(res => {
      return res.json();
    })
    .then(res => {
      // // DEBUG
      // let wrapperForm = document.querySelector(
      //   ".wrapper-form-calendar-add-session"
      // );
      // wrapperForm.innerHTML = res;
      // console.log(res);
    })
    .catch(err => {
      if (err) {
        console.log(err);
      }
    });
}

// Montre le formulaire de création d'une session (forfait) pour un client.
function showFormNewSessionCalendar(idCustomer) {
  fetch(`/app/calendar/sessions/create/${idCustomer}`)
    .then(res => {
      return res.json();
    })
    .then(res => {
      let wrapperForm = document.querySelector(
        ".wrapper-form-calendar-add-session"
      );

      wrapperForm.style.opacity = 1.0;  
      wrapperForm.style.visibility = 'visible';  

      wrapperForm.innerHTML = res.render;

      $("#session_dateEnd").datepicker({
        language: "en",
        timepicker: true,
        dateFormat: "dd/mm/yyyy",
        timeFormat: "hh:ii AA"
      });

      $("#session_dateStart").datepicker({
        language: "en",
        timepicker: true,
        dateFormat: "dd/mm/yyyy",
        timeFormat: "hh:ii AA"
      });

      loader.style.display = "none";
      toggleBtnAddSession = false;

    })
    .catch(err => console.log(err));
}


// Déclencher lorsqu'on valide le formulaire de création d'une session pour un client.
function saveNewSessionCalendar(idCustomer) {
  let wrapperForm = document.querySelector(
    ".wrapper-form-calendar-add-session"
  );

  let isFree = document.querySelector("#session_free").checked;
  let dateStartChoose = document.querySelector("#session_dateStart").value;
  let dateEndChoose = document.querySelector("#session_dateEnd").value;
  let tokenSessionForm = document.querySelector("#session__token").value;

  if (dateStartChoose != "" && dateEndChoose != "") {
    if (regexDateStart2.test(dateStartChoose) && regexDateEnd2.test(dateEndChoose)) {

      let formDataSession = new FormData();

      formDataSession.append("session[free]", isFree);
      formDataSession.append("session[dateStart]", dateStartChoose);
      formDataSession.append("session[dateEnd]", dateEndChoose);
      formDataSession.append("session[_token]", tokenSessionForm);

      // document.querySelector("#session_free").checked = false;
      // document.querySelector("#session_dateStart").value = "";
      // document.querySelector("#session_dateEnd").value = "";
      sessionAddCancel();
      loader.style.display = "flex";

      fetch(`/app/calendar/sessions/create/${idCustomer}`, {
          method: "POST",
          body: formDataSession
        })
        .then(res => {
          return res.json();
        })
        .then(res => {

          // DEBUG
          // console.log(res.sessionId);
          // wrapperForm.innerHTML = res;
          // console.log(res);

          let newEvent = {
            id: res.sessionId,
            title: res.numberFlatrate > 0 ?
              `Forfait n°${res.numberFlatrate}` : `Forfait n°1`,
            start: createFormatDate(dateStartChoose),
            end: createFormatDate(dateEndChoose),
            editable: true,
            eventResizableFromStart: true,
            eventStartEditable: true,
            backgroundColor: colorsFlatrates[res.numberFlatrate - 1] ?
              colorsFlatrates[res.numberFlatrate - 1] : colorsFlatrates[0],
            borderColor: colorsFlatrates[res.numberFlatrate - 1] ?
              colorsFlatrates[res.numberFlatrate - 1] : colorsFlatrates[0],
            textColor: "EAFFFE"
          };

          loader.style.display = "none";
          calendarForOne.addEvent(newEvent);

        })

        .catch(err => console.log(err));

    } else {
      // DATES INCORRECT
    }
  }

}

// Montre le formulaire de modification d'une session (forfait) pour un client.
function showFormUpdateDeleteSession(idSession, idCustomer) {

  loader.style.display = "flex";

  fetch(`/app/calendar/sessions/modify/${idSession}`)
    .then(res => {
      return res.json();
    })
    .then(res => {
      let wrapperForm = document.querySelector(
        ".wrapper-form-calendar-add-session"
      );

      wrapperForm.style.opacity = 1.0;  
      wrapperForm.style.visibility = 'visible';  

      wrapperForm.innerHTML = res.render;
      document.querySelector('#hiddenCustomerId').value = idCustomer;

      $("#session_dateEnd").datepicker({
        language: "en",
        timepicker: true,
        dateFormat: "dd/mm/yyyy",
        timeFormat: "hh:ii aa"
      });

      $("#session_dateStart").datepicker({
        language: "en",
        timepicker: true,
        dateFormat: "dd/mm/yyyy",
        timeFormat: "hh:ii aa"
      });

      loader.style.display = "none";
      toggleEventClick = false;

    })
    .catch(err => console.log(err));
  // TODO: afficher le formulaire.
}

// Déclencher lorsqu'on valide le formulaire de modification d'une session pour un client.
function saveUpdateSessionCalendar(idSession) {
  let wrapperForm = document.querySelector(
    ".wrapper-form-calendar-add-session"
  );

  let hiddenCustomerId = document.querySelector("#hiddenCustomerId").value;

  let isFree = document.querySelector("#session_free").checked;
  let dateStartChoose = document.querySelector("#session_dateStart").value;
  let dateEndChoose = document.querySelector("#session_dateEnd").value;
  let tokenSessionForm = document.querySelector("#session__token").value;

  if (dateStartChoose != "" && dateEndChoose != "") {
    if (regexDateStart2.test(dateStartChoose) && regexDateEnd2.test(dateEndChoose)) {

      let formDataSession = new FormData();

      formDataSession.append("session[free]", isFree);
      formDataSession.append("session[dateStart]", dateStartChoose);
      formDataSession.append("session[dateEnd]", dateEndChoose);
      formDataSession.append("session[_token]", tokenSessionForm);

      // document.querySelector("#session_free").checked = false;
      // document.querySelector("#session_dateStart").value = "";
      // document.querySelector("#session_dateEnd").value = "";

      sessionAddCancel();
      loader.style.display = "flex";

      fetch(`/app/calendar/sessions/modify/${idSession}`, {
          method: "POST",
          body: formDataSession
        })
        .then(res => {
          return res.json();
        })
        .then(res => {
          // DEBUG
          // console.log(res.sessionId);
          // app.innerHTML = res;
          // console.log(res);
          loader.style.display = "none";
          showCalendarOfOneCustomer(hiddenCustomerId);


        })

        .catch(err => console.log(err));

    } else {
      // DATES INCORRECT
    }
  }
}

// Permet de formatter une date SQL dans le format accepté par Full Calendar
function createFormatDate(dateStr) {
  let array = dateStr.split("/");
  return new Date(`${array[1]}/${array[0]}/${array[2]}`);

}
// Effacer une session depuis le formulaire de modification de la session concerné.
function deleteSession(id) {
  sessionAddCancel();
  calendarForOne.getEventById(id).remove();
  // let wrapperForm = document.querySelector(
  //   ".wrapper-form-calendar-add-session"
  // )

  fetch(`app/calendar/sessions/delete/${id}`)
    .then(res => {
      return res.json();
    })
    .then(res => {
      //  console.log(res.status);
      //  wrapperForm.innerHTML = res;
      //  calendarForOne.getEventById(id).setProp('backgroundColor', 'red');
    })
    .catch(err => {
      console.log(err);
    })
}

function displayNameCustomerOnChangeViewCalendar(target) {

  if (target.classList.contains('fc-timeGridWeek-button') || target.classList.contains('fc-timeGridDay-button') ) {
    if (document.querySelector('.title-name-calendar')) {
      document.querySelector('.title-name-calendar').style.color =  'transparent';
    }
  } else if (target.classList.contains('fc-dayGridMonth-button')) {
    if (document.querySelector('.title-name-calendar')) {
      document.querySelector('.title-name-calendar').style.color =  '#92a2bc';

    }
  }
}
