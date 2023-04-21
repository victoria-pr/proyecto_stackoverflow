import Parser from "../../utils/parser.js";
import fs from "fs";

describe("Parser", () => {
    let parser;

    beforeAll(() => {
        const html = fs.readFileSync("./test/test.html", "utf8");
        parser = new Parser(html);
    });

    it("Debería devolver una pregunta en formato DOM", () => {
        const question = parser.getQuestionAsDOM();
        expect(question.innerHTML).toContain("How do I undo this so that these changes will not be included in the commit?");
    });

    it("Debería devolver el número de votos de una pregunta", () => {
        const question = parser.getQuestionAsDOM();
        const votes = parser.getVote(question);
        expect(votes).toBe(10989);
    });

    it("Debería devolver el usuario de una pregunta", () => {
        const question = parser.getQuestionAsDOM();
        const user = parser.getUser(question);
        expect(user).toContain("oz10");
    });

    it("Debería devolver un parrafo de la pregunta", () => {    
        const question = parser.getQuestionAsDOM();
        const paragraphs = parser.getparagraphs(question);
        expect(paragraphs).toContain("I mistakenly added files to Git using the command");
    });

    it("Debería devolver un array de respuestas en formato DOM", () => {
        const answers = parser.getAnswersAsDOM();
        expect(answers[0].innerHTML).toContain("(because you haven't yet made any commits in your repository) or ambiguous (because you created a branch called");
    });

    it("Debería devolver el número de votos de la primera respuesta", () => {
        const answer = parser.getAnswersAsDOM();
        const votes = parser.getVote(answer[0]);
        expect(votes).toBe(13090);
    });

    it("Debería devolver el usuario de la primera respuesta", () => {
        const answer = parser.getAnswersAsDOM();
        const user = parser.getAnswerUser(answer[0]);
        expect(user).toEqual("/users/14069/oz10");
    });

    it ("Debería devolver el número de respuestas", () => {
        const answers = parser.getAnswersAsDOM();
        const quantityAnswers = parser.getQuantityAnswers(answers);
        expect(quantityAnswers).toBe(30);
    });

    it ("Debería devolver la fecha de la pregunta", () => {
        const answer = parser.getAnswersAsDOM();
        const date = parser.getDate(answer[0]);
        expect(date).toContain("Dec 7, 2008 at 21:57")
    });

    it ("Debería devolver los links de la pregunta", () => {
        const answer = parser.getAnswersAsDOM();
        const links = parser.getLinks(answer);
        expect(links).toContain("https://git-scm.com/book/en/v2/Git-Tools-Interactive-Staging")
    });

});
/* getVote(element) {
    const votes = element.querySelector(".js-vote-count").textContent;
    return parseInt(votes);
} */