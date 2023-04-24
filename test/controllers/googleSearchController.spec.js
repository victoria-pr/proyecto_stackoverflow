import googleSearchController from "../../controllers/googleSearchController.js"

describe("Google Search Controller", () => {

    it("Debería devolver un array con los links de resultados de Google", async () => {
        const query = "stackoverflow";
        const links = await googleSearchController.searchLinks(query);
        expect(links).toContain("https://stackoverflow.com/");
    },10000);
});