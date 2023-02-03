//importation des fonctionnalités nécessaires
const vCardsJS = require("vcards-js");
let fs = require("fs");
let prompt = require("prompt");

//fonction contact
const contact = () => {
    console.log("\n-------------- Création de la fiche du professeur --------------\n");
    console.log("Veuillez rentrer les informations demandées :\n")
    prompt.start(); //utilisation du prompt pour récupérer les informations de l'utilisateur

    const noDigit = /^[a-zA-Zéè'-]+$/;
    const verifTel = /^0[1-9](?:[\s.-]*\d{2}){4}$/;
    const verifId = /[0-9]{1,3}/;
    const verifAdresse = /[0-9]{0,4} [a-zA-Z]{1,10} [a-zA-Z0-9 -_]*/;
    const verifPaysVille = /[a-zA-Z _-]*/

    prompt.get(
        [
            {
                name: "Nom",
                required: true,
                pattern : noDigit,
                message : "Il n'y a pas de chiffre dans un Nom de Famille"
            },
            {
                name: "Prenom",
                required: true,
                pattern : noDigit,
                message : "Il n'y a pas de chiffre dans un Prénom"
            },
            {
                name: "Telephone",
                required: true,
                pattern : verifTel,
                message: 'Le numéro doit avoir 10 chiffres (et commencer par 0 + un chiffre)'
            },
            {
                name: "Email",
                required: true,
                format: 'email',
                message : 'mauvais format de mail'
            },
            {
                name: "Id",
                required: true,
                pattern : verifId,
                message : "Votre ID est un nombre entre 1 et 3 chiffres"
            },
            {
                name: "Adresse",
                required: true,
                pattern : verifAdresse,
                message: "Mauvais format"
            },
            {
                name: "Ville",
                required: true,
                pattern : verifPaysVille,
                message: "Il n'y a pas de chiffre dans le nom d'une ville"
            },
            {
                name: "Pays",
                required: true,
                pattern : verifPaysVille,
                message: "Il n'y a pas de chiffre dans le nom d'un pays"
            },
            {
                name: "Poste",
                required: true,
            }
        ],
        function (err,resultat) {
            //paramètrage de la Vcard
            var vCard = vCardsJS();
            vCard.lastName = resultat.Nom;
            vCard.firstName = resultat.Prenom;
            vCard.homePhone = resultat.Telephone;
            vCard.uid = resultat.Id
            vCard.email = resultat.Email;
            vCard.homeAddress.street = resultat.Rue;
            vCard.homeAddress.city = resultat.Ville;
            vCard.homeAddress.countryRegion = resultat.Pays;
            vCard.title = resultat.Poste;

            //enregistrement le vcard dans un dossier spécifique vCards
            vCard.saveToFile("./vCards/" + "vcard-" + resultat.Prenom + "-" + resultat.Nom + ".vcf");
            // message de fin
            console.log("\nLe fichier VCard de " + vCard.firstName + " " +  vCard.lastName + " a bien été créé.\n")
            console.log("----------------------------------------------------------------\n");
        }
    );
};
//exportation

module.exports.contact = contact;
