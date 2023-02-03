const fs = require('fs');
const scan = require('scanf');
const colors = require('colors');

function nbQuestionExamUnique(){
    console.log("Entrez le numéro de l'examen dont vous souhaitez voir le profil");
    let num = scan('%d')-1;
    let compteurTest = fs.readFileSync(".\/data\/index_nb_examens.txt");
    if(num>compteurTest){
        console.log("Numéro de test invalide");
    }
    else{
        let index = fs.readFileSync("\.\/data\/objet_lies_examens\/" + num + ".txt");
        let compteurShort = 0;
        let compteurMC = 0;
        let compteurMatching = 0;
        let compteurEssay = 0;
        let compteurNumerical = 0;
        let compteurTF = 0;
        for(let i=0; i<=index;i++){
          let listeQuestion = fs.readFileSync("\.\/data\/objet_lies_examens\/objet_examen_" + num + "_" + i + ".json");
          listeQuestion = JSON.parse(listeQuestion);
          if(listeQuestion[0].type==='MC'){
            compteurMC++;
          }
          else if(listeQuestion[0].type==="Short"){
            compteurShort++;
          }
          else if(listeQuestion[0].type==="Matching"){
            compteurMatching++;
          }
          else if(listeQuestion[0].type==="Essay"){
            compteurEssay++;
          }
          else if(listeQuestion[0].type==="Numerical"){
            compteurNumerical++;
          }
          else if(listeQuestion[0].type==="TF"){
            compteurTF++;
          }
        }
        return array = [compteurMC,compteurShort,compteurMatching,compteurEssay,compteurNumerical,compteurShort];
    }
}

function preparationCompareExam(){
    let compteurs1 = nbQuestionExamUnique();
    let compteurs2 = averageNbQuestionExam();
    compareExam(compteurs1,compteurs2);
}

function averageNbQuestionExam(){
    let nbExam = getRandomInt(0,fs.readFileSync(".\/data\/index_nb_examens.txt"));
    let compteurShort = 0;
    let compteurMC = 0;
    let compteurMatching = 0;
    let compteurEssay = 0;
    let compteurNumerical = 0;
    let compteurTF = 0;
    let compteurTest = fs.readFileSync(".\/data\/index_nb_examens.txt");
    for(let i=0;i<=nbExam;i++){
        let num = getRandomInt(0,nbExam+1);
        if(num>compteurTest){
            console.log("Numéro de test invalide");
        }
        else{
            let index = fs.readFileSync("\.\/data\/objet_lies_examens\/" + num + ".txt");
            
            for(let i=0; i<=index;i++){
            let listeQuestion = fs.readFileSync("\.\/data\/objet_lies_examens\/objet_examen_" + num + "_" + i + ".json");
            listeQuestion = JSON.parse(listeQuestion);
            if(listeQuestion[0].type==='MC'){
                compteurMC++;
            }
            else if(listeQuestion[0].type==="Short"){
                compteurShort++;
            }
            else if(listeQuestion[0].type==="Matching"){
                compteurMatching++;
            }
            else if(listeQuestion[0].type==="Essay"){
                compteurEssay++;
            }
            else if(listeQuestion[0].type==="Numerical"){
                compteurNumerical++;
            }
            else if(listeQuestion[0].type==="TF"){
                compteurTF++;
            }
            }
        }
    }
    compteurShort = Math.floor(compteurShort/nbExam);
    compteurMC = Math.floor(compteurMC/nbExam);
    compteurMatching = Math.floor(compteurMatching/nbExam);
    compteurEssay = Math.floor(compteurEssay/nbExam);
    compteurNumerical = Math.floor(compteurNumerical/nbExam);
    compteurTF = Math.floor(compteurTF/nbExam);
    return array = [compteurMC,compteurShort,compteurMatching,compteurEssay,compteurNumerical,compteurShort];
}

//Cette fonction retourne un chiffre entre min et max-1
getRandomInt = (min, max) => {
    return min + Math.floor(Math.random() * (max-min));
}

type = ["Mot manquant", "Choix multiples", "Correspondance", "Question ouverte", "Numérique", "Vrai/faux"]
function compareExam(compteur1, compteur2){
    console.log("Examen :")
    for (let i = 0; i < compteur1.length; i++) {
        if (compteur1[i] < compteur2[i]) {
            console.log(type[i] + "(" + compteur1[i] + ")" + colors.red("<") + type[i] + "(" + compteur2[i] + ")");
        }else if(compteur1[i] > compteur2[i]){
            console.log(type[i] + "(" + compteur1[i] + ")" + colors.green(">") + type[i] + "(" + compteur2[i] + ")");
        }else{
            console.log(type[i] + "(" + compteur1[i] + ") = " + type[i] + "(" + compteur2[i] + ")");
        }
    }
}

module.exports.preparationCompareExam = preparationCompareExam;