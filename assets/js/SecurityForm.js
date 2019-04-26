class SecurityForm {
    
    constructor() {
        this.regFirstname = /^[a-zA-Z_\-]+$/;
        this.regLastname = /^[a-zA-Z_\-]+$/;
        this.regMail = /^[^\W][a-zA-Z0-9_\-]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/;
        this.regPhone = /^[0-9]*$/;
        this.errorBorderColor = '#e12768';
    }

    // Vérifie si le prénom est correct
    // @param value : Valeur (Prénom) contenu dans l'input
    // @param inputDOM : Element input du DOM de type text  
    firstnameIsCheck(value, inputDOM) {
        if (value) {
            if (this.regFirstname.test(value)) {
                return true;
            } else {
                this._errorHighlight(inputDOM);
                return false;
            }  
        } else {
            this._errorHighlight(inputDOM);
            return false;
        }
    }

    // Vérifie si le prénom est correct
    // @param value : Valeur (Nom) contenu dans l'input
    // @param inputDOM : Element input du DOM de type text  
    lastnameIsCheck(value, inputDOM) {
        if (value) {
            if (this.regLastname.test(value)) {
                return true;
            } else {
                this._errorHighlight(inputDOM);
                return false;
            }  
        } else {
            this._errorHighlight(inputDOM);
            return false;
        }
    }

    // Vérifie si l'adresse mail est correct
    // @param value : Valeur (Email) contenu dans l'input
    // @param inputDOM : Element input du DOM de type text  
    mailIsCheck(value, inputDOM) {
        if (value) {
            if (this.regMail.test(value)) {
                return true;
            } else {
                this._errorHighlight(inputDOM);
                return false;
            }  
        } else {
            this._errorHighlight(inputDOM);
            return false;
        }
    }

    // Vérifie si l'adresse mail est correct
    // @param value : Valeur (Email) contenu dans l'input
    // @param inputDOM : Element input du DOM de type text  
    mailIsCheck(value, inputDOM) {
        if (value) {
            if (this.regMail.test(value)) {
                return true;
            } else {
                this._errorHighlight(inputDOM);
                return false;
            }  
        } else {
            this._errorHighlight(inputDOM);
            return false;
        }
    }

    // Vérifie si le numéro de téléphone est correct
    // @param value : Valeur (Phone) contenu dans l'input
    // @param inputDOM : Element input du DOM de type text  
    phoneIsCheck(value, inputDOM) {
        if (value) {
            if (this.regPhone.test(value)) {
                return true;
            } else {
                this._errorHighlight(inputDOM);
                return false;
            }  
        } else {
            this._errorHighlight(inputDOM);
            return false;
        }
    }

    // PRIVATE FUNCTION
    // Met en surbrillance l'élément input du DOM
    // @param inputDOM : Element input du DOM
    _errorHighlight(inputDOM) {
        inputDOM.style.transition = "all 2s";
        inputDOM.style.borderColor = this.errorBorderColor;
    }

}

export default SecurityForm;