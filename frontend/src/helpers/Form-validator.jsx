import { validateCity } from "./ValidateCity"

export const validateInputField = (label, type, value) => {
    
    if (!value || value === "") {
        return `Le champ ${label} est vide ou invalide!`
    }
    
    value = typeof value === 'string' ? value.trim() : String(value).trim()


    switch (type) {
        
        case "name":
            if (value.length > 50) {
                return `Le champ ${label} ne peut excéder 50 caractères!`
            }
            if (!/^[A-Za-zÀ-ÖØ-öø-ÿ \-']+$/.test(value)) {
                return `Le champ ${label} contient des caractères invalides!`
            }
            break
            
            
        case "firstname":
            if (value.length > 50) {
                return `Le champ ${label} ne peut excéder 50 caractères!`
            }
            if (value.length < 2) {
                return `Le champ ${label} doit contenir au moins 2 caractères!`
            }
            if (!/^[A-Za-zÀ-ÖØ-öø-ÿ \-']+$/.test(value)) {
                return `Le champ ${label} contient des caractères invalides!`
            }
            break
  
            
        case "project name":
            if (value.length > 141) {
                return `Le champ ${label} est trop long!`
            }
            if (!/^[A-Za-zÀ-ÖØ-öø-ÿ _\-'+]+$/.test(value)) {
                return `Le champ ${label} contient des caractères invalides!`
            }
            break


        case "email":
            const regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (regexMail.test(value) === false) {
                return `Le champ ${label} n'est pas valide!`
            }
            break


        case "password":
            const regexPswd = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
            if (regexPswd.test(value) === false) {
                return `Le champ ${label} doit contenir 8 caractères minimum dont au moins un chiffre, une lettre minuscule, une lettre majuscule et un caractère spécial!`
            }
            break


        case "address":
            if (value.length > 150) {
                return `Le champ ${label} contient trop de caractères!`
            } else if(value.length < 10){
                return `Le champ ${label} ne possède pas assez de caractères!`
            }
            break


        case "zipcode":
            const regexZipcode = /^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/;
            if (regexZipcode.test(value) === false) {
                return `Le champ ${label} doit contenir 5 chiffres!`
            }
            break
            

        case "city":
            return validateCity(label, value, 50);
            
            
        case "project city":
            return validateCity(label, value, 141);
            
 
        case "phone":
            const digits = value.replace(/\D+/g, "")
            if (digits.length !== 10) {
                return `Le champ ${label} doit contenir exactement 10 chiffres!`
            }
            break           
           
            
        case "xcoord":
            const regexXCoord = /^[-+]?((1[0-7]\d|0?\d{1,2})\.\d{1,5}|180\.0{1,5})$/;
            if (regexXCoord.test(value) === false) {
                return `Le champ ${label} doit contenir un nombre décimal (-180 à 180) avec au moins 1 chiffre après la virgule (5 maximum)!`
            }
            break
            
            
        case "ycoord":
            const regexYCoord = /^[-+]?([0-8]?\d\.\d{1,5}|90\.0{1,5})$/;
            if (regexYCoord.test(value) === false) {
                return `Le champ ${label} doit contenir un nombre décimal (-90 à 90) avec au moins 1 chiffre après la virgule (5 maximum)!`
            }
            break
            
            
        case "area":
            const regexArea = /^\d+(\.\d+)?$/;
            if (regexArea.test(value) === false) {
                return `Le champ ${label} doit contenir un nombre positif !`
            }
            break        
            
            
        case "comment":
            if (value.length > 255) {
                return `Le champ ${label} doit contenir 255 caractères max !`
            }
            break
            

        case "type_project":
            if (value.length > 20) {
                return `Le champ ${label} ne peut excéder 20 caractères!`
            }
            if (value.length < 2) {
                return `Le champ ${label} doit contenir au moins 2 caractères!`
            }
            if (!/^[A-Za-zÀ-ÖØ-öø-ÿ \-']+$/.test(value)) {
                return `Le champ ${label} contient des caractères invalides!`
            }
            break
   
            
        case "developer":
            if (value.length > 100) {
                return `Le champ ${label} ne peut excéder 100 caractères!`
            }
            if (value.length < 2) {
                return `Le champ ${label} doit contenir au moins 2 caractères!`
            }
            if (/^[A-Za-zÀ-ÖØ-öø-ÿ0-9 .\-']+$]+$/.test(value)) {
                return `Le champ ${label} contient des caractères invalides!`
            }
            break
            

        case "wind_model":
            if (value.length > 50) {
                return `Le champ ${label} ne peut excéder 50 caractères!`
            }
            if (value.length < 2) {
                return `Le champ ${label} doit contenir au moins 2 caractères!`
            }
            if (/^[A-Za-zÀ-ÖØ-öø-ÿ0-9 .\-']+$]+$/.test(value)) {
                return `Le champ ${label} contient des caractères invalides!`
            }
            break
            
            
        case "status_project":
            if (value.length > 20) {
                return `Le champ ${label} ne peut excéder 20 caractères!`
            }
            if (value.length < 5) {
                return `Le champ ${label} doit contenir au moins 5 caractères!`
            }
            if (!/^[A-Za-zÀ-ÖØ-öø-ÿ \-']+$/.test(value)) {
                return `Le champ ${label} contient des caractères invalides!`
            }
            break
            
    }

    return true

}
