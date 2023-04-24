import Parser from "../utils/parser.js";
import Scraper from "../utils/scraper.js";
import googleSearchController from "./googleSearchController.js";
import Question from "../models/question.js";
import Answer from "../models/answer.js";
/**
 * Returns the content of a StackOverflow question and its answers
 * @async
 * @param {string} url - URL of the StackOverflow question
 * @param {string} query - Query to search in google 
 * @returns {object} - Object with the title, question and answers
 */

async function getContent(url, query) {
    const scraper = new Scraper();
    await scraper.init();
    const html = await scraper.getPageContent(url);
    const parser = new Parser(html);
    if(!query){
        query = "undefined";
    } // para que no de error si no se pone nada en el buscador

    const title = parser.getTitle();
    const question = parser.getQuestion(); 
    const answers = parser.getAnswers();
    const questionModel = new Question({
        query,
        title,
        content: question.question,
        date: question.date,
        user: question.user,
        votes: question.votes, 
        answersQuantity: question.answerQuantity,
        paragraphs: question.paragraphs
    });

    await questionModel.save(); 

    answers.forEach(async (answer) => {
        const answerModel = new Answer({
            question: questionModel._id,
            content: answer.answer,
            date: answer.date,
            user: answer.user,
            votes: answer.votes,
        });
        await answerModel.save();
    });

    await scraper.close();


    return {
        title,
        question,
        answers
    }
}

async function getStackLinks(query) {
    const googleLinks = await googleSearchController.searchLinks("stackoverflow " + query);
    return googleLinks.filter(link => link.includes("stackoverflow.com/questions"))
}

/**
 * @async
 * @param {string} query 
 * @returns {object[]} - Array with the content of the StackOverflow questions
 */
async function getMultipleStackContent(query) {
    const links = await getStackLinks(query);
    const contents = await Promise.all(links.map((link) => getContent(link, query)));
    return contents;
}

export default { 
    getContent,
    getMultipleStackContent

}