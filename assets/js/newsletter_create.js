// Boutton comptabilité du menu.
const buttonNavNewsletter = document.querySelector('#nav-button-newsletter');

// Boutton d'envois du formulaire.
let buttonSendNewsletter;

// Evénement : 
if (buttonNavNewsletter) {
    buttonNavNewsletter.addEventListener('touchstart', showFormNewsletterWithAjax);
}

// Ecoute le click sur le boutton d'envois du formulaire.
window.addEventListener('touchstart', (e) => {
    if (e.target.id == "send-button-newsletter") {

        // Désactive le comportement par défaut du bouton d'envois de formulaire.
        e.preventDefault();

        // Envois le formulaire en Ajax.
        sendFormNewsletterWithAjax();
    }
})

// Fonction(s) déclenchées lors du click sur le bouton Newsletter du menu de navigation : 
// Affiche la page d'accueil de l'envois d'une newsletter.
function showFormNewsletterWithAjax() {

    // Container de rendu.
    let app = document.querySelector('#app');

    // Effacement du contenu existant.
    app.innerHTML = "";

    // Apparition du loader.
    let loader = document.querySelector('.container-fluid-loader');
    loader.style.display = "flex";

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

// Fonction(s) déclenchées lors du click sur le bouton d'envois du formulaire de la newsletter : 
// Envois les informations saisis à Symfony afin d'envoyer un ou plusieurs mails avec comme contenu,
// les champs précédement remplis.
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
    let loader = document.querySelector('.container-fluid-loader');
    loader.style.display = "flex";

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