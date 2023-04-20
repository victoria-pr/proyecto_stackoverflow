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
        expect(user).t
});




/* getVote(element) {
    const votes = element.querySelector(".js-vote-count").textContent;
    return parseInt(votes);
} */