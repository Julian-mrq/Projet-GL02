class Gift {

    constructor(id, commentaire, numeroQuestion, numeroPage, typeQuestion, format, texte, reponseVrai, reponseFausse){
        this.id = id;
        //this.commentaire = commentaire;
        //this.numeroPage = numeroPage;
        this.typeQuestion = typeQuestion;
        this.format = format;
        this.texte = texte;
        this.reponseVrai = reponseVrai;
        this.reponseFausse = reponseFausse;
    }
    /**
     * Opération ternaire qui retourne vrai si l'argument de type Gift est identique à l'objet Gift dont la méthode est appelé
     * @param Gift gift 
     * @returns Boolean vrai/faux si l'objet est le même ou non
     */
    equal(gift){
        return (
            this.id === gift.id &&
            this.commentaire === gift.commentaire && 
            this.numeroQuestion === gift.numeroQuestion &&  
            this.numeroPage === gift.numeroPage &&  
            this.typeQuestion === gift.typeQuestion &&  
            this.texte === gift.texte &&  
            this.reponseVrai === gift.reponseVrai && 
            this.reponseFausse === gift.reponseFausse 
            ? true : false
        )
    }
    /**
     * Affiche l'énoncé de la question et les bonnes et mauvaises réponses
     */
    print(){
        console.log("id de la question : " + this.id);
        console.log("Question : " + this.texte);
        console.log("Bonne réponse : " + this.reponseVrai);
        console.log("Mauvaise réponse : " + this.reponseFausse);
    }
}

module.exports = Gift;