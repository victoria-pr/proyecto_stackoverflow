import Parser from "../utils/parser.js";
import Scraper from "../utils/scraper.js";

async function searchLinks(query){
    const encodedQuery = encodeURIComponent(query);
    const url = `https://www.google.com/search?q=${encodedQuery}`;
    console.log(url)
    
    //scraper
    const scraper = new Scraper();
    await scraper.init();
    const html = await scraper.getPageContent(url);

    //parser
    const parser = new Parser(html);
    const links = parser.getLinks();

    scraper.close();
    return links;
}

export default {
    searchLinks,
}