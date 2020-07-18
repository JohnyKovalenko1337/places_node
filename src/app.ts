const express = require('express');
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

app.use((req:any,res:any,next:any)=>{
    res.send('<h1>asda</h1>')
})


app.listen({ port: 8000 });