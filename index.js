import express from "express";
import stackoverflowController from "./controllers/stackoverflowController.js";
import path from "path";


const app = express(); 

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
    try {
        const  query= req.query.q;
        const { title, question, answers } = await stackoverflowController.getContent(query);
        res.send(`
        <link rel="stylesheet" type="text/css" href="https://cdn.sstatic.net/Shared/stacks.css?v=83d4b324173a">
        <link rel="stylesheet" type="text/css" href="https://cdn.sstatic.net/Sites/stackoverflow/primary.css?v=5e2d45054eda">
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
    }
    catch (error) {
        res.send("Ha habido un herror");
    }
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