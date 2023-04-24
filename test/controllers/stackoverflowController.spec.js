import stackoverflowController from "../../controllers/stackoverflowController.js";

describe("Stackoverflow controller", ()=>{

    it("Debería conseguir el contenido de una página de Stackoverflow", async ()=>{
        const query = "How do I undo 'git add' before commit?";
        const {title, question, answer} = await stackoverflowController.getContent(query);
        expect(title).toBe("How do I undo 'git add' before commit?");
        expect(question.question).toContain("I mistakenly added files to Git using the command");
        expect(question.date).toContain("Dec 7, 2008 at 21:57");
        expect(question.user).toContain("oz10");
        expect(question.votes).toContain(10989);
        expect(question.answerQuantity).toBe(30);
        expect(question.paragraphs).toContain("How do I undo this so that these changes will not be included in the commit?");
        expect(answer[0].answer).toContain("In old versions of Git, the above commands are equivalent to")
        expect(answer[0].date).toContain("Dec 7, 2008 at 22:30");
        expect(answer[0].user).toEqual("/users/39933/genehack");
        expect(answer[0].votes).toBe(13090);
        
    }, 21000);
});
