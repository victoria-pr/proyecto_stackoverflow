import express from "express";
import stackoverflowController from "./controllers/stackoverflowController.js";
import path from "path";
/**
 * @description - Main file of the application
 * @module index 
 * @requires express - to create the server
 * @requires stackoverflowController - to get the content of the stackoverflow question
 * @requires path - to get the path of the file
 */

const app = express(); 

/**
 * @description - Endpoint to get the content of a stackoverflow question
 * @name get/
 * @function 
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 * @returns {string} - HTML with the content of the question and its answers
 * @throws {Error} - If there is an error
 * @example - http://localhost:3000/?q=javascript+async+await
 */

app.get("/", async (req, res) => {
    try {
        const _dirname = path.resolve();
        res.sendFile(_dirname + "/index.html");
    }
    catch (error) {
        res.send("Ha habido un herror");
    }
});

app.get("/search", async (req, res) => {
        const query= req.query.q;
        const response = await stackoverflowController.getMultipleStackContent(query);
        const {title, question, answers} = response[0];
        res.send(`
        <link rel="stylesheet" type="text/css" href="https://cdn.sstatic.net/Shared/stacks.css?v=83d4b324173a">
        <link rel="stylesheet" type="text/css" href="https://cdn.sstatic.net/Sites/stackoverflow/primary.css?v=5e2d45054eda">
        <a href="/" class="s-btn s-btn__primary">Inicio</a>
        <h1>${title}</h1>
        <div>${question.question}</div>
        <div>${question.date}</div>
        <div>${question.user}</div>
        <div>${question.votes}</div>
        <div>${question.answerQuantity}</div>
        <div>${answers.map((answer) => `
            <div>${answer.answer}</div>
            <div>${answer.date}</div>
            <div>${answer.user}</div>
            <div>${answer.votes}</div>
            `).join("")}</div>))` //join para que no salga la coma entre cada respuesta
    );
 
}); 

/* 
FORMATO API
app.get("/", async (req, res) => {
    try{
        const query = req.query.q;
        const content = await stackoverflowController.getContent(query);
        res.send(content);
    } 
    catch (error) {
        //throw new Error(error); para que salga el error en la consola
        res.status(500).send("Ha habido un error")
    }
}); */

app.listen(3000, () => console.log("Listening on port 3000"));