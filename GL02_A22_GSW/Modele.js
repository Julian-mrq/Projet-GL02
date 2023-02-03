const fs = require("fs");
var inquirer = require('inquirer');
var Parser = require("gift-parser-ide").default;

/**
 * interface between the CLI and the functions called by the user
 * when a function is called in CaporalCli.js, a Modele object is created and it calls the right function
 */
var Modele = function(){}

Modele.prototype.pass = function(exam_file) {
    fs.readFile(exam_file, (err, data) => {
        if (err) {
            console.log("Erreur : ", err);
        }
        const parser = new Parser();
        parser.update(data.toString());
        const result = parser.result();

        const filteredResults = result.filter(e => e.result[0] !== null);
        

        
        //create the question file
        let questions = []
        let count = 0

        filteredResults.forEach(e => {
            let choices = []
            let right_answer = []
            switch(e.result[0][0].type){
                case "Description":
                    questions.push({
                        name : `${count}`,
                        typeQuestion : 'Description',
                        titre : e.result[0][0].title,
                        message : e.result[0][0].stem.text,
                    });
                    count++;
                    break;
                
                case "MC":
                    e.result[0][0].choices.forEach(reponse => {
                        choices.push(reponse.text.text)
                        if(reponse.isCorrect===true){
                            right_answer.push(reponse.text.text)
                        }
                    })
                    questions.push({
                        type : 'checkbox',
                        typeQuestion : 'MC',
                        name : `${count}`,
                        titre : e.result[0][0].title,
                        message : e.result[0][0].stem.text,
                        choices: choices,
                        right_answer : right_answer
                    });
                    count++;
                    break;
                //todo
                /*case "Matching":
                    e.result[0][0].choices.forEach(reponse => {
                        choices.push(reponse.text.text)
                        if(reponse.isCorrect===true){
                            right_answer.push(reponse)
                        }
                    })
                    questions.push({
                        name : `${count}`,
                        type : '',
                        titre : e.result[0][0].title,
                        message : e.result[0][0].stem.text,
                        choices : "todo",
                        right_answer : right_answer
                    });
                    count++;
                    break;*/
                    
                case "TF":
                    choices.push(e.result[0][0].incorrectFeedback.text);
                    choices.push(e.result[0][0].correctFeedback.text);
                    questions.push({
                        type : 'list',
                        typeQuestion : 'TF',
                        name:`${count}`,
                        titre : e.result[0][0].title,
                        message : e.result[0][0].stem.text,
                        choices : choices,
                        right_answer : [e.result[0][0].correctFeedback.text]
                    });
                    count++;
                    break;
                
                case "Numerical":
                    questions.push({
                        titre : e.result[0][0].title,
                        typeQuestion : 'Numerical',
                        name : `${count}`,
                        message : e.result[0][0].stem.text,
                        right_answer : e.result[0][0].choices
                    });
                    count++;
                    break;
                
                case "Essay":
                    questions.push({
                        name:`${count}`,
                        typeQuestion : 'Essay',
                        titre : e.result[0][0].title,
                        message : e.result[0][0].stem.text
                    })
                    count++;
                    break;
                
                case "Short":
                    e.result[0][0].choices.forEach(reponse => {
                        if(reponse.isCorrect===true){
                            right_answer.push(reponse.text.text)
                        }
                    })
                    questions.push({
                        typeQuestion : 'Short',
                        name:`${count}`,
                        titre : e.result[0][0].title,
                        message : e.result[0][0].stem.text,
                        right_answer : right_answer
                    })
                    count++;
                    break;
            }
        })
        //console.log(questions)
        // start of inquirer
        inquirer
            .prompt(questions)
            .then(answers => {
                list_answers = Object.values(answers)
                for(let key of Object.keys(answers)){
                    let question = questions[key];
                    let answer = []
                    if(Array.isArray(list_answers[key])){
                        answer = list_answers[key];
                    }
                    else{
                        answer.push(list_answers[key])
                    }
                    switch(question.typeQuestion){
                        case "MC" :
                        case "TF" :
                        case "Short" :
                            console.log('\x1b[36m%s\x1b[0m', question.titre);
                            let responded_right_answer = [];
                            answer.forEach(e => {
                                if(question.right_answer.includes(e)){
                                    count++;
                                    responded_right_answer.push(e);
                                    console.log(e + " is a right answer.")
                                }
                                else{
                                    console.log(e + " is a wrong answer.")
                                    console.log( "\x1b[32m%s\x1b[0m","\nRight answer(s) : ")
                                    question.right_answer.forEach(answer => {
                                        console.log(answer + " was a right answer.")
                                    })
                                    console.log("\n")
                                } 
                            })
                            break;
                        case "Matching" :
                            break;
                        case "Numerical" :
                            break;
                        default :
                            break;
                    }
                }

            })
    })
}

module.exports = Modele
