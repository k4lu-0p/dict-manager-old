// Boutton comptabilité du menu.
const buttonNavNewsletter = document.querySelector('#nav-button-newsletter');

// Evénement : 
if (buttonNavNewsletter) {
    buttonNavNewsletter.addEventListener('click', showFormNewsletterWithAjax);
}

// Fonction(s) déclenchées lors de(s) événement(s) : 
// Affiche la page d'accueil de la gestion de comptabilité, en Ajax.
function showFormNewsletterWithAjax() {

    // Apparition du loader.
    let loader = document.querySelector('.lds-dual-ring');
    loader.style.display = "inline-block";

    fetch('/app/newsletter/create')
    .then(res => {
        return res.text();
    })
    .then(res => {

        // Container de rendu.
        let app = document.querySelector('#app');

        // Dès reception, disparition du loader.
        loader.style.display = "none";

        // Injecte le contenu receptionné dans le container.
        app.innerHTML = res;
    })
    .catch(err => {
        if (err) {
            throw err;
        }
    })
}