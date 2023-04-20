import jsdom from "jsdom";

class Parser { 

    constructor(html){
        this.html = html;
        this.loadDocument();
    }
 
    loadDocument(){
        const JSDOM = jsdom.JSDOM;
        const dom = new JSDOM(this.html);
        this.document = dom.window.document; 
    }
  
    getQuestionAsDOM() {
        return this.document.querySelector(".question");
    }

    getQuestion() {
        const question = this.getQuestionAsDOM();
        const votes = this.getVote(question);
        const user = this.getUser();
        return {
            votes,
            user
        };
    }

        getVote(element) {
            const votes = element.querySelector(".js-vote-count").textContent;
            return parseInt(votes);
        }

        getUser(element) {
            const user = element.querySelector(".post-signature owner .user-details a").href;
    }

   /*Ejemplo de cómo conseguir una cosa concreta (como el autor de la pregunta)

     getAuthor() {
        return this.document.querySelector("div.post-signature.owner .user-details a").href;
    } */
    

   /*  getAnswers() {
        const answers = Array.from(this.document.querySelectorAll("div.answercell.post-layout--right"));
        return answers.map((answer) => {
            const votes = this.getVote(answer);
            const user = this.getUser(answer);
           return {
                votes,
                user
            }
        });
    }
    
    getDivVotes(answer) {
        return answer.querySelector(".js-vote-count").textContent;
    }
}

    getparagraphs(answer) {
        return answer.querySelector(".post-text").textContent.trim();
    }
} */

export default Parser;
