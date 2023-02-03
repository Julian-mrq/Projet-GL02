const vg = require('vega');
const vegalite = require('vega-lite');
const fs = require('fs');
const scan = require("scanf");
const express = require('express');
const open = require('open');
var app = express();


function creationVisualisationExamen(compteurEssay,compteurMatching,compteurMC,compteurShort,compteurNumerical,compteurTF){
//Compilation des données en format vegalite
let indexNbVisualisation = fs.readFileSync("\.\/data\/index_nb_visualisations.txt");
const myVisu = vegalite.compile({
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "description": "A simple bar chart with embedded data.",
    "height":"600",
    "width": "900",
    "data": {
      "values": [
        {"Type question": "Choix multiples", "Occurence": compteurMC}, {"Type question": "Vrai-Faux", "Occurence": compteurTF}, 
        {"Type question": "Correspondance", "Occurence": compteurMatching},{"Type question": "Mot manquant", "Occurence": compteurShort},
        {"Type question": "Numerique", "Occurence": compteurNumerical}, {"Type question": "Question ouvertes", "Occurence": compteurEssay}
      ]
    },
    "mark": "bar",
    "encoding": {
      "x": {"field": "Type question", "type": "nominal", "axis": {"labelAngle": 0}},
      "y": {"field": "Occurence", "type": "quantitative"},
      "color": {"field": "Type question"}
    }
  }).spec;

  //Creation du fichier html avec le rendu
  var runtime = vg.parse(myVisu);
			var view = new vg.View(runtime).renderer('svg').run();
			var mySvg = view.toSVG();
			mySvg.then(function(svg){
				fs.writeFileSync("\.\/visualisations_examen\/examen_visualisation_"+ indexNbVisualisation +".html", svg);
				view.finalize();
        app.get('/', function(req, res){
          res.send(svg);
        });
        // open it on a server at http://127.0.0.1:3000/ so that it will open on your browser
        app.listen(3000,"127.0.0.1",()=> {
            open("http://127.0.0.1:3000/");
            console.log("ctrl+C to finish");
        });
        
			});
    indexNbVisualisation++;
    indexNbVisualisation = indexNbVisualisation.toString();
    fs.writeFileSync("\.\/data\/index_nb_visualisations.txt", indexNbVisualisation);
    console.log("Fichier html créé");



}


//Recupération des données depuis les fichiers JSON dans la variable listeQuestion pour ensuite incrémenter des compteurs correspondant à chaque type de question puis appelle de la fonction creationVisualisationExam en passant tous les compteurs en paramètres 
function visuExam(){
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
      creationVisualisationExamen(compteurEssay,compteurMatching,compteurMC,compteurShort,compteurNumerical,compteurTF);
    }
}

module.exports.visuExam = visuExam;
module.exports.creationVisualisationExamen = creationVisualisationExamen;