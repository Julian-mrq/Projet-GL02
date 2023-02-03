const fs = require('fs');
const Parser = require('gift-parser-ide').default;
const Modele = require("./Modele");

const cli = require("@caporal/core").default;

function extractListQuestion(){
	let questionList = [];
	let i = 0;
	let fileList = ["EM-U4-p32_33-Review.gift","EM-U5-p34-Gra-Expressions_of_quantity.gift","EM-U5-p34-Voc.gift","EM-U5-p35-Gra-Subject_verb_agreement.gift","EM-U5-p36_37-Reading.gift","EM-U5-p38-Passive.gift","EM-U6-p46_47-4.gift","EM-U42-Ultimate.gift","U1-p7-Adverbs.gift","U1-p8_9-Reading-Coachella.gift","U1-p10-Gra-Present_tenses_habits.gift","U2-p22-Gra-Ing_or_inf.gift","U3-p30-Reading.gift","U3-p31-Gra-ed_adjectives_prepositions.gift",
	"U3-p32-Gra-Present_perfect_simple_vs_continuous.gift","U3-p32-Gra-Present_perfect_simple_vs_continuous.gift","U3-p33-Gra-As_like.gift","U3-p33-UoE-Hygge.gift","U4-p39-Reading-xmen.gift","U4-p42_43-Listening.gift","U4-p47-Review.gift","U5-p49-GR1-Expressions_of_quantity.gift","U5-p49-Subject_verb_agreement.gift","U5-p50-Use_of_English.gift","U5-p52-Reading-The_death_of_cooking.gift","U5-p54-6-Passive.gift","U5-p54-GR4-Passive-reporting.gift",
"U5-p57-Review.gift","U6-p59-Vocabulary.gift","U6-p60-Listening.gift","U6-p61-5-Future-forms.gift","U6-p61-GR-Future_forms.gift","U6-p62_63-Reading.gift","U6-p64-Future-perfect-&-continuous.gift","U6-p65-Voc-Expressions_with_get.gift","U6-p67-Review.gift","U6-p68_69-ProgressTest2.gift","U7-p76_77-So,such,too,enough.gift","U7-p76-Relative_clauses.gift","U7-p77-6.gift","U7-p77-It is,there is.gift","U7-p79-Review-3.gift",
"U8-p84-Voc-Linking_words.gift","U9-p94-Listening.gift","U9-p95-Third_cond-4.gift","U10-p106-Reading.gift","U11-p114-Mixed_conditionals.gift"];
	fileList.forEach(file => {
		let data = fs.readFileSync("\.\/data\/Question_data\/" + file, 'utf8');
		const parser = new Parser();
        parser.update(data.toString());
        const parsedData = parser.result();
		questionList = questionList.concat(parsedData);
	});
	return questionList;
}

function clearFileSystem(){
	fs.writeFileSync("\.\/data\/index_nb_examens.txt",'0');
	fs.writeFileSync("\.\/data\/index_nb_visualisations.txt",'0');
	fs.rmSync('\.\/fichier_examens',{recursive : true,});
    fs.mkdirSync('\.\/fichier_examens');
    fs.rmSync('\.\/visualisations_examen',{recursive : true,});
    fs.mkdirSync('\.\/visualisations_examen');
	fs.rmSync('\.\/data\/objet_lies_examens\/',{recursive : true,});
    fs.mkdirSync('\.\/data\/objet_lies_examens\/');
	fs.rmSync('./vCards/',{recursive : true,});
	fs.mkdirSync('./vCards/');	
	fs.writeFileSync("\.\/fichier_examens\/GitPush.txt","fichier servant uniquement à git");
	fs.writeFileSync("\.\/visualisations_examen\/GitPush.txt","fichier servant uniquement à git");
	fs.writeFileSync("\.\/vCards/\/GitPush.txt","fichier servant uniquement à git");
	fs.writeFileSync("\.\/data\/objet_lies_examens\/GitPush.txt","fichier servant uniquement à git");
	console.log("Réinitialisation effectuée");
}

cli
	.version('Gift-parser-cli')
	.version('0.01')

	// check Gift
	.command('check', 'Check if <file> is a valid Gift file')
	.argument('<file>', 'The file to check with Gift parser')
	.option('-s, --showSymbols', 'log the analyzed symbol at each step', { validator : cli.BOOLEAN, default: false })
	.option('-t, --showTokenize', 'log the tokenization results', { validator: cli.BOOLEAN, default: false })
	.action(({args, options, logger}) => {
		
		fs.readFile(args.file, 'utf8', function (err,data) {
			if (err) {
				return logger.warn(err);
			}
			var parser = new Parser(options.showTokenize, options.showSymbols);
			var parsedData = parser.parse(data)
			if(parser.errorCount === 0){
				logger.info("The .Gift file is a valid Gift file".green);
			}else{
				logger.info("The .Gift file contains error".red);
			}
			
			logger.debug(parser.parsedPOI);
		});
	})
	
	.command('readme', 'display the text from README.md')
	.action(({ logger, args, options }) => {
		fs.readFile("./README.md", 'utf8', function(err, data){
			if(err){
				return logger.warn(err);
			}
			
			logger.info(data);
		});
	})

	.command('help', 'display all the commands possible')
	.action(({ logger, args, options }) => {
		// ...
	})

	.command('clear', 'remove all the precedently created files from the files system of the application')
	.action(({ logger, args, options }) => {
		clearFileSystem();
	})
	
	.command('makeExam', 'create a file containing a test on the gift format')
	.action(({ logger, args, options }) => {
		let makeExam = require('./makeExam.js');
		makeExam.createExam(extractListQuestion());
	})

	.command('visualisationExam', 'Give a visualisation of the profil of one test')
	.action(({ logger, args, options }) => {
		const visuExam = require('./visualisationExam.js');
		visuExam.visuExam();
	})

	.command('compareExam', 'Compare the profil of one test to multiple test using their files')
	.action(({ logger, args, options }) => {
		const compareExam = require('./compareExam.js');
		compareExam.preparationCompareExam();
	})
	//pass the test
    .command("pass", "simulate a test")
    .argument("<file>", "15 to 20 questions gift file")
    .action(({args, options, logger}) => {
        const modele = new Modele();
        modele.pass(args.file);
    })
	.command('contact', "creation d'une carte de contact de professeur au format vCards")
    .action(({ logger, args, options }) => {
        const contact = require('./contact.js');
        contact.contact();
    })

cli.run(process.argv.slice(2));