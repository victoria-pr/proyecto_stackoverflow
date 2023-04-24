import jsdom from "jsdom";

/**
 * Class in charge of parsing the HTML of a StackOverflow question
 * @class
 */
class Parser { 
    /**
     * Constructor of the class
     * @param {string} html - HTML of the StackOverflow question
     */
    constructor(html){
        /**
         * @property {string} html - HTML of the StackOverflow question
         * @private 
         */
        this.html = html;
        this.loadDocument();
    }
    /**
     * Load the HTML of the StackOverflow question into a DOM
     * @method
     * @private
     * @returns {void}
     */
    loadDocument(){
        const JSDOM = jsdom.JSDOM;
        const dom = new JSDOM(this.html);
        this.document = dom.window.document; 
    }
    /**
     * Returns the title of the page
     * @returns {string} 
     */
    getTitle() {
        return this.document.querySelector("h1").textContent.trim();
      }
    /**
     * Returns the question in DOM format
     * @method
     * @returns {object} - Question in DOM format
     * */
    getQuestionAsDOM() {
        return this.document.querySelector(".question");
    }
    /**
     * Returns the content of the question: title, paragraphs, votes, username, date and the question in HTML format
     * @method 
     * @returns {object} - Object with the content of the question
     */
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
        /**
         * Returns the votes of a question or answer
         * @method
         * @param {*} element - question or answer in DOM format
         * @returns {number} - Number of votes
         */
        getVote(element) {
            const votes = element.querySelector(".js-vote-count").textContent;
            return parseInt(votes);
        }
        /**
         * Returns the username of the person who asked the question or answered it
         * @method
         * @param {*} element - question or answer in DOM format
         * @returns {href} - Username
         */
        getUsername(element) {
            const users = Array.from(element.querySelectorAll(".user-details a"));
            if (users.length == 0)
                return "" ;   
            if (users.length == 1) 
                return users[0].href;
            return users[users.length - 1].href;
        }
        /**
         * Returns the paragraphs of the question
         * @method
         * @param {*} element - question in DOM format
         * @returns {string} - Paragraphs of the question
         */
        getparagraphs(element) {
            const paragraphs = element.querySelector("p").textContent;
            return paragraphs;
        }
        /**
         * Returns the number of answers of the question
         * @method 
         * @returns {number} - Number of answers
         */
        getQuantityAnswers() {
            const answers = this.getAnswersAsDOM();
            return answers.length;
        }
    /**
     * Returns the answers in DOM format
     * @method
     * @returns {object} - Answers in DOM format
     * */
    getAnswersAsDOM() {
        return Array.from(this.document.querySelectorAll(".answer"));
    }
    /**
     * Returns the content of the answers: votes, username, links, date and the answer in HTML format
     * @method 
     * @returns {object} - Object with the content of the answers
     */
    getAnswers() {
        const answer= this.getAnswersAsDOM();
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
        /**
         * Returns the date of the question or answer
         * @method
         * @param {*} element - question or answer in DOM format
         * @returns {string[]} - Array with the date of edition and the date of creation of the question or answer
         */
        getDate(element) {
            const date = Array.from(element.querySelectorAll(".user-action-time span"));
            if (date.length == 0)
                return "" ;
            if (date.length == 1)
                return date[0].textContent;
            return date[date.length - 1].textContent;
    }
        /**
         * Returns the links of the answer
         * @method
         * @returns {href[]} - Array with the links of the answer 
         */
        getAnswerLinks() {
            const links = Array.from(this.document.querySelectorAll(".answercell p a"));
            return links.map((link) => link.href);
        }

        getLinks() {
            const links = Array.from(this.document.querySelectorAll("#search a"));
            return links.map((link) => link.href);
    }
}

export default Parser;


/*Ejemplo de cómo conseguir una cosa concreta (como el autor de la pregunta)

     getAuthor() {
        return this.document.querySelector("div.post-signature.owner .user-details a").href;
    } */