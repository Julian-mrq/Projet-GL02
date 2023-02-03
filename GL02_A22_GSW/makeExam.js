let fs = require('fs');
let compteurTest = fs.readFileSync("./data/index_nb_examens.txt");

//Cette fonction crée et rempli de question un fichier d'examen
function createExam(listeQuestion){
    let nomFichier = "fichier_examen_" + compteurTest +".gift";
    
    let nbQuestion = getRandomInt(15,21);
    let questionsInserees = [];
    let objetQuestion = [];
    //Génération et écriture du fichier et récupération des questions 
    for (let i = 0; i<nbQuestion; i++){
        let insertion = false;
        while(!insertion){
            let NumeroQuestion = getRandomInt(0,listeQuestion.length);
            let check = checkInsertionValable(questionsInserees, NumeroQuestion,listeQuestion[NumeroQuestion]);
            if(check){
                indexQuestion = i+1;
                fs.appendFileSync("\.\/fichier_examens\/" + nomFichier,listeQuestion[NumeroQuestion].location.text+"\n\n");
                objetQuestion[i] = (JSON.stringify(listeQuestion[NumeroQuestion].result[0]));
                questionsInserees.push(NumeroQuestion);
                insertion = true;
            }
        }
    }
    let index = 0;
    objetQuestion.forEach(element => {
        let nomObjet = "objet_examen_" + compteurTest + "_" + index + ".json"
        fs.writeFileSync("\.\/data\/objet_lies_examens\/" + nomObjet,element + "\n");
        index++;
    });
    index--;
    fs.writeFileSync("\.\/data\/objet_lies_examens\/" + compteurTest + ".txt", index + "\n");
    compteurTest++;
    compteurTest = compteurTest.toString();
    fs.writeFileSync("./data/index_nb_examens.txt",compteurTest);
    console.log("Fichier d'examen : " + nomFichier + "créé dans le dossier fichier_examens du logiciel");
}

//Cette fonction retourne un chiffre entre min et max-1
getRandomInt = (min, max) => {
    return min + Math.floor(Math.random() * (max-min));
}


//Vérification que les objets à insérer ne possède aucune erreur lors du parsing puis on retire les catégories, description et titres de questions qui sont seuls (sans réelles questions directement associées)
function checkInsertionValable(questionsInserees, numQuestion, objetQuestion){
    let insertionPossible = true
    let index = 0;
    if(objetQuestion.result[0] !== null){
        if(objetQuestion.result[0][0].type === "Category" || objetQuestion.result[0][0].type === "Description" || objetQuestion.result[0][0].type === "title"){
            insertionPossible = false;
        }
        else{
            while(index<=questionsInserees.length && insertionPossible){
                if(numQuestion===questionsInserees[index]){
                    insertionPossible = false;
                }
                index++;
            }
        }
    }
    else{
        insertionPossible = false;
    }
    return insertionPossible;
}
//Ci-dessous uniquement les exports 
module.exports.createExam = createExam;