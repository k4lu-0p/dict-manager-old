// Boutton comptabilité du menu.
const buttonNavNewsletter = document.querySelector('#nav-button-newsletter');

// Evénement : 
if (buttonNavNewsletter) {
    buttonNavNewsletter.addEventListener('click', showFormNewsletterWithAjax);
}

// Fonction(s) déclenchées lors de(s) événement(s) : 
// Affiche la page d'accueil de la gestion de comptabilité, en Ajax.
function showFormNewsletterWithAjax() {
    fetch('/app/newsletter/create')
    .then(res => {
        return res.text();
    })
    .then(res => {

        // Container de rendu.
        let app = document.querySelector('#app');

        // Injecte le contenu receptionné dans le container.
        app.innerHTML = res;
    })
    .catch(err => {
        if (err) {
            throw err;
        }
    })
}