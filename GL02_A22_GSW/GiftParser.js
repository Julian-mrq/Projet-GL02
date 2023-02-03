var Gift = require('./Gift')

const { contains } = require("vega-lite");

class GiftParser {

	constructor(sTokenize, sParsedSymb) {
		// The list of gift parsed from the input file.
		this.parsedGift = [];
		this.symb = ["//", "{"];
		this.showTokenize = sTokenize;
		this.showParsedSymbols = sParsedSymb;
		this.errorCount = 0;
	}

	// Parser procedure
	/**return a list of questions in string format from the index of listOfQuestionIndex. If listOfQuestionIndex = null => select all */ 
	getListQuestion(data, listOfQuestionIndex) {
		var listQuestions = data.split("\n\n");
		listQuestions = listQuestions.filter(e => e.substring(0, 2) !== '//');
		// remove empty strings
		listQuestions = listQuestions.filter(e => e);;
		let listSelectedQuestion = [];

		if (listOfQuestionIndex != null) {
			listOfQuestionIndex = listOfQuestionIndex.sort(function (a, b) {
				return a - b;
			});
			for (let i = 0; i < listOfQuestionIndex.length; i++) {
				listSelectedQuestion.push(listQuestions[listOfQuestionIndex[i]]);
			};
		} else {
			for (let i = 0; i < listQuestions.length; i++) {
				listSelectedQuestion.push(listQuestions[i]);
			};
		}
		return listSelectedQuestion;
	}
	
	getFormat(QuestionString) {
		if (QuestionString.includes('[html]')) {
			//QuestionStringOut.replace('[html]', '');
			return { data: QuestionString, format: 'html' };
		} else if (QuestionString.includes('[markdown]')) {
			//QuestionStringOut.replace('[html]', '');
			return { data: QuestionString, format: 'markdown' };
		} else {
			return { data: QuestionString, format: 'plain' };
		}
	}
	TranformBrackets(question) {
		const regex = /\{((.|\n)*?)\}|\{\n(.*?)\n\}/g;
		let sub = [...question.data.matchAll(regex)];
		question['brackets'] = sub;
	}

	/**
	 * tokenise the string into an object with this format :
	 * {
	 * 	data: ___,
	 * 	format : ___,
	 * 	brackets : ___
	 * }.
	 * brackets is an array that contains all the information between brackets
	 * for example with {=eats}
	 * we will have [{=eats}, =eats, index]
	 * @param {Gift file in string format} questions 
	 * @returns a list of questions created
	 */
	tokenize(questions) {
		let listQuestions = this.getListQuestion(questions);
		var listOut = listQuestions.map(q => {
			const out = this.getFormat(q);
			this.TranformBrackets(out);
			return out;
		});
		return listOut;
	}

	/**
	 * add an object Gift in parsedGift array.
	 * @param {Gift} gift 
	 */
	addGift(gift){
		this.parsedGift.push(gift);
	}

	/**
	 * Convert a list of question object from tokenize into Gift Object.
	 * @param tokenizedOutput
	 * @returns void	 
	*/ 
	convertTokenisedOutputInGiftList(tokenisedOutput){
		tokenisedOutput.forEach(e => {
			
		})
	}
}

module.exports = GiftParser;



/* utilisation du parser
var data = '// ex 7: Vocabulary / Collocations\n\n::U5 p52 7.0 Reading/Vocab collocations::Decide whether both or only one of the verbs in italics collocates with the noun. If necessary, check the meaning in a dictionary.\n\n::U5 p52 7.1 Collocations::Their crop of soya beans has ______ in size.{\n  ~%50%doubled\n  ~%50%expanded\n}\n'
var parser = new GiftParser(false, false)
listTokens = parser.tokenize(data)

pour acceder à la string du nième objet : listTokens[n].data
pour acceder au format du nième objet : listTokens[n].format
pour acceder à ce qu'il y a entre les p ième crochets du n ième objet : listTokens[n].brackets[p][0]
pour la meme chose sans les croches dans la string : listTokens[n].brackets[p][1]
*/