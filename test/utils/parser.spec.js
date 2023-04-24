import Parser from "../../utils/parser.js";
import fs from "fs";

describe("Parser", () => {
    let parser;

    beforeAll(() => {
        const html = fs.readFileSync("./test/test.html", "utf8");
        parser = new Parser(html);
    });

    it("Debería devolver el título de la pregunta", () => {
        const title = parser.getTitle();
        expect(title).toContain("How do I undo 'git add' before commit?");
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
        const user = parser.getUsername(question);
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
        const user = parser.getUsername(answer[0]);
        expect(user).toEqual("/users/39933/genehack");
    });

    it ("Debería devolver el número de respuestas", () => {
        const answers = parser.getAnswersAsDOM();
        const quantityAnswers = parser.getQuantityAnswers(answers);
        expect(quantityAnswers).toBe(30);
    });

    it ("Debería devolver la fecha de la pregunta", () => {
        const answer = parser.getAnswersAsDOM();
        const date = parser.getDate(answer[0]);
        expect(date).toContain("Dec 7, 2008 at 22:30")
    });

    it ("Debería devolver la fecha de la pregunta", () => {
        const question = parser.getQuestionAsDOM();
        const date = parser.getDate(question);
        expect(date).toContain("Dec 7, 2008 at 21:57")
    });

    it ("Debería devolver los links de la pregunta", () => {
        const answer = parser.getAnswersAsDOM();
        const links = parser.getAnswerLinks(answer);
        expect(links).toContain("https://git-scm.com/book/en/v2/Git-Tools-Interactive-Staging")
    });

});


/*it("Debería devolver el título de una pregunta", () => {
        const question = parser.getQuestionAsDOM();
        const title = parser.getTitle(question);
        expect(title).toContain("How do I undo 'git add' before commit?");
    });*/