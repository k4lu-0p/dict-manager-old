// Boutton comptabilité du menu.
const buttonNavNewsletter = document.querySelector('#nav-button-newsletter');

// Boutton d'envois du formulaire.
let buttonSendNewsletter;

// Evénement : 
if (buttonNavNewsletter) {
    buttonNavNewsletter.addEventListener('click', showFormNewsletterWithAjax);
}

// Désactive le comportement de base d'une validation de formulaire par navigateur.
window.addEventListener('submit', (e) => {
    e.preventDefault();
});

// Ecoute le click sur le boutton d'envois du formulaire.
window.addEventListener('click', (e) => {
    if (e.target.getAttribute("id") == "send-button-newsletter") {
        sendFormNewsletterWithAjax();
    }
})

// Fonction(s) déclenchées lors du click sur le boutton Newsletter du menu de navigation : 
// Affiche la page d'accueil de l'envois d'une newsletter.
function showFormNewsletterWithAjax() {

    // Container de rendu.
    let app = document.querySelector('#app');

    // Effacement du contenu existant.
    app.innerHTML = "";

    // Apparition du loader.
    let loader = document.querySelector('.lds-dual-ring');
    loader.style.display = "inline-block";

    // Requête AJAX :
    fetch('/app/newsletter/new')
        .then(res => {
            return res.text();
        })
        .then(res => {

            // Dès reception, disparition du loader.
            loader.style.display = "none";

            // Injecte le contenu receptionné dans le container.
            app.innerHTML = res;

            // Boutton d'envois du formulaire.
            buttonSendNewsletter = document.querySelector('#send-button-newsletter');
        })
        .catch(err => {
            if (err) {
                throw err;
            }
        })
}

function sendFormNewsletterWithAjax() {

    // Formulaire à envoyer en POST.
    let formData = new FormData();

    // Valeurs dans les champs.
    let subject = document.querySelector('#newsletter_subject').value;
    let content = document.querySelector('#newsletter_content').value;
    let picture = document.querySelector('#newsletter_picture').value;
    let token = document.querySelector('#newsletter__token').value;

    // Ajout des valeurs dans l'objet formulaire.
    formData.append('newsletter[subject]', subject);
    formData.append('newsletter[content]', content);
    formData.append('newsletter[picture]', picture);
    formData.append('newsletter[_token]', token);

    // Effacement du contenu existant.
    app.innerHTML = "";

    // Apparition du loader.
    let loader = document.querySelector('.lds-dual-ring');
    loader.style.display = "inline-block";

    // Requête AJAX :
    fetch('/app/newsletter/new', {
            method: "POST",
            body: formData
        })
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