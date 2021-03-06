const express = require('express');
const app = express();

app.use(express.json());

const temas = [
    {id: 1, name: 'tema1'},
    {id: 2, name: 'tema2'},
    {id: 3, name: 'tema3'},
];


app.get('/', (req, res) =>{
    res.send('Hello World');
});

app.get('/api/v1/temas',(req, res) =>{
    res.send(temas);
    res.status(200);
});

app.post('/api/v1/temas',(req,res) =>{
    if(!req.body.name){
        // 400 BAD request
        res.status(400).send('Debe el nombre de un ingresar un tema');
        return;
    }

    const tema = {
        id: temas.length + 1,
        name: req.body.name
    };
    temas.push(tema);
    res.send(tema);
    res.status(201).send('El tema fue agregado con éxito');
});

app.put('/api/v1/temas/:id',(req,res)=>{
    //Si no exite retorno 404
    const tema = temas.find(c => c.id === parseInt(req.params.id));
    if(!tema) {
        res.status(404).send('El ID del tema no fue encontrado.');
        return;
    }
    //Se hace el update
    if(!req.body.name){
        // 400 BAD request
        res.status(400).send('Debe el nombre de un ingresar un tema');
        return;
    }
    tema.name = req.body.name;
    res.send(tema);  
    res.status(200);  
});

app.delete('/api/v1/temas/:id',(req,res)=>{
    //Si no exite retorno 404
    const tema = temas.find(c => c.id === parseInt(req.params.id));
    if(!tema) {
        res.status(404).send('El ID del tema no fue encontrado.');
        return;
    }

    //Se hace el update
    const index = temas.indexOf(tema);
    temas.splice(index,1);
    res.send(tema);    
});

app.get('/api/v1/temas/:id',(req, res) =>{
    const tema = temas.find(c => c.id === parseInt(req.params.id));
    if(!tema) {
        res.status(404).send('El ID del tema no fue encontrado.');
        return;
    }
    res.send(tema);
    res.status(200);
});

// port
const port = process.env.PORT || 3000;
app.listen(port, () =>console.log(`Listening on port ${port}...`));

