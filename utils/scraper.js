import puppeteer from "puppeteer";

/**
 * Class in charge of scraping the HTML of a StackOverflow question
 * @class
 */
class Scraper{
    /**
     * Constructor of the class
     * @constructor 
     */
    constructor(){
        this.browser = null;
        this.page = null;
    }
    /**
     * Initialize the browser and the page
     * @method 
     * @async
     * @returns {void}
     */
    async init(){ 
        this.browser = await puppeteer.launch({
                headless:true,
                ignoreDefaultArgs: ['--disable-extensions'],
                args: ["--no-sandbox", "--disable-setuid-sandbox"]
            });
        this.page = await this.browser.newPage();
    }
    /**
     * Navigate to the URL and return the HTML of the page
     * @method
     * @param {*} url - URL of the page to scrape 
     * @returns {string} - HTML of the page
     */
    async getPageContent(url){
        await this.page.goto(url);
        return await this.page.content();
    }
    /**
     * Close the browser and the page 
     * @method
     * @async
     * @returns {void}
     */
    async close(){
        await this.browser.close();
    }
}
export default Scraper;