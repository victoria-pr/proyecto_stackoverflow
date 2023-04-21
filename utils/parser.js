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
        const user = this.getUser(question);
        const paragraphs = this.getparagraphs(question);
        const answerQuantity = this.getQuantityAnswers();
        return {
            votes,
            user,
            paragraphs,
            answerQuantity,
            question: question.outerHTML
        };
    }

        getVote(element) {
            const votes = element.querySelector(".js-vote-count").textContent;
            return parseInt(votes);
        }

        getUser(element) {
            const user = element.querySelector(".post-signature.owner .user-details a").href;
            return user;
        }
        
        getAnswerUser(element) {
            const users = Array.from(element.querySelectorAll(".user-details a"));
            if (users.length == 0)
                return "" ;   
            if (users.length == 1) 
                return users[0].href;
            return users[users.length - 1].href;
        }

    
        getparagraphs(element) {
            const paragraphs = element.querySelector("p").textContent;
            return paragraphs;
        }

    getAnswersAsDOM() {
        return Array.from(this.document.querySelectorAll(".answer"));
    }

    getAnswers() {
        const answer= this.getAnswerAsDOM();
            return answer.map((answer) => {
            const votes = this.getVote(answer);
            const user = this.getAnswerUser(answer);
            const links = this.getLinks(answer);
                return {
            votes,
            user,
            links,
            answer: answer.outerHTML
        }
    });
    }
    
        getQuantityAnswers() {
            const answers = this.getAnswersAsDOM();
            return answers.length;
        }

        getDate() {
            const date = Array.from(this.document.querySelectorAll(".user-action-time span"));
            if (date.length == 0)
                return "" ;
            if (date.length == 1)
                return date[0].textContent;
            return date[date.length - 1].textContent;
    }

        getLinks() {
            const links = Array.from(this.document.querySelectorAll(".answercell p a"));
            return links.map((link) => link.href);
        }

    }


export default Parser;


/*Ejemplo de cómo conseguir una cosa concreta (como el autor de la pregunta)

     getAuthor() {
        return this.document.querySelector("div.post-signature.owner .user-details a").href;
    } */