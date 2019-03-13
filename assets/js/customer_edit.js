// Evenement
window.addEventListener('click', (e) => {
    if (e.target.id == "add-customer" || e.target.id == "edit-customer") {
        // Désactive le comportement par défaut du bouton d'envois de formulaire.
        e.preventDefault();

        // Envoi le formulaire en Ajax
        if (e.target.id == "edit-customer") {
            sendFormCustomerEditWithAjax("edit/" + e.target.getAttribute("data-id"));
        } else if (e.target.id == "add-customer") {
            sendFormCustomerEditWithAjax("add");            
        }
    }
});

// Fonction(s) déclenchées lors du click sur le bouton d'envois du formulaire de la newsletter : 
// Envois les informations saisis à Symfony afin d'envoyer un ou plusieurs mails avec comme contenu,
// les champs précédement remplis.
function sendFormCustomerEditWithAjax(url) {

    // Formulaire à envoyer en POST.
    let formData = new FormData();

    // Valeurs dans les champs.
    let firstname = document.querySelector('#customer_firstname').value;
    let lastname = document.querySelector('#customer_lastname').value;
    let phone = document.querySelector('#customer_phone').value;
    let email = document.querySelector('#customer_email').value;
    let address_number = document.querySelector('#customer_address_number').value;
    let street_number = document.querySelector('#customer_street_number').value;
    let street_name = document.querySelector('#customer_street_name').value;
    let city = document.querySelector('#customer_city').value;
    let pc = document.querySelector('#customer_pc').value;
    let country = document.querySelector('#customer_country').value;
    let building = document.querySelector('#customer_building').value;
    let picture = document.querySelector('#customer_picture').value;

    // element.checked pour le booléen
    let newsletter = document.querySelector('#customer_newsletter').checked;
    
    let token = document.querySelector('#customer__token').value;

    // Ajout des valeurs dans l'objet formulaire.
    formData.append('customer[firstname]', firstname);
    formData.append('customer[lastname]', lastname);
    formData.append('customer[phone]', phone);
    formData.append('customer[email]', email);
    formData.append('customer[address_number]', address_number);
    formData.append('customer[street_number]', street_number);
    formData.append('customer[street_name]', street_name);
    formData.append('customer[city]', city);
    formData.append('customer[pc]', pc);
    formData.append('customer[country]', country);
    formData.append('customer[building]', building);
    formData.append('customer[picture]', picture);
    formData.append('customer[newsletter]', newsletter);
    formData.append('customer[_token]', token);

    // Effacement du contenu existant.
    app.innerHTML = "";

    // Apparition du loader.
    let loader = document.querySelector('.lds-dual-ring');
    loader.style.display = "inline-block";

    // Requête AJAX :
    fetch(`/app/customers/${url}`, {
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