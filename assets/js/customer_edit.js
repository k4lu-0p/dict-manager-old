// Evenement
window.addEventListener('click', (e) => {
    if (e.target.id == "add-customer" || e.target.id == "edit-customer") {
        // Désactive le comportement par défaut du bouton d'envois de formulaire.
        e.preventDefault();

        // Envoi le formulaire en Ajax
        sendFormCustomerEditWithAjax();

    }
});

// Fonction(s) déclenchées lors du click sur le bouton d'envois du formulaire de la newsletter : 
// Envois les informations saisis à Symfony afin d'envoyer un ou plusieurs mails avec comme contenu,
// les champs précédement remplis.
function sendFormCustomerEditWithAjax() {

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