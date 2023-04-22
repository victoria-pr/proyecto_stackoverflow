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

    getTitle() {
        return this.document.querySelector("h1").textContent.trim();
      }
  
    getQuestionAsDOM() {
        return this.document.querySelector(".question");
    }

    getQuestion() {
        const question = this.getQuestionAsDOM();
        const votes = this.getVote(question);
        const user = this.getUsername(question);
        const paragraphs = this.getparagraphs(question);
        const answerQuantity = this.getQuantityAnswers();
        const date = this.getDate(question);
        return {
            votes,
            user,
            paragraphs,
            answerQuantity,
            date,
            question: question.outerHTML
        };
    }

        /*getTitle(element) {
            const title = element.querySelector("h1").textContent;
            return title;
        }*/

        getVote(element) {
            const votes = element.querySelector(".js-vote-count").textContent;
            return parseInt(votes);
        }
        
        getUsername(element) {
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

        getQuantityAnswers() {
            const answers = this.getAnswersAsDOM();
            return answers.length;
        }

    getAnswersAsDOM() {
        return Array.from(this.document.querySelectorAll(".answer"));
    }

    getAnswers() {
        const answer= this.getAnswerAsDOM();
            return answer.map((answer) => {
            const votes = this.getVote(answer);
            const user = this.getUsername(answer);
            const links = this.getLinks(answer);
            const date = this.getDate(answer);
                return {
            votes,
            user,
            links,
            date,
            answer: answer.outerHTML
        }
    });
    }    

        getDate(element) {
            const date = Array.from(element.querySelectorAll(".user-action-time span"));
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