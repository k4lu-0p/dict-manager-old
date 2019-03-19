// Regex sur formulaire de connexion
const regexMail = /^[-+.\w]{1,64}@[-.\w]{1,64}\.[-.\w]{2,6}$/;
const inputEmail = document.querySelector('.input-email');
const inputPassword = document.querySelector('.input-password');
const buttonConnexion = document.querySelector('.button-connexion');

if (buttonConnexion) {
    buttonConnexion.addEventListener('click', (e) => {
        let valueIn = inputEmail.value;

        if (!regexMail.test(valueIn)) {
            e.preventDefault();

            inputEmail.classList.add('input-email-error');
            
            window.setTimeout(() => {
                inputEmail.classList.remove('input-email-error');                
            }, 500)
        } 
    });    
}


