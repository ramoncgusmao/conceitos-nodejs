const express = require("express");
const cors = require("cors");
const { uuid} = require('uuidv4');


const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
 return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {url, title, techs } = request.body;
  const repository = {id: uuid(), title, url, techs, likes: 0};
  console.log(repository);
  repositories.push(repository);

  return  response.json(repository);

});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {url, title, techs} = request.body;
  const index = findIndex(id);

  if(index === -1) return response.status(400).json({message : "id não encontrado"});
 

  const repository =  repositories[index];

  repository.url = url ? url : repository.url;
  repository.title = title ? title : repository.title;
  repository.techs = techs ? techs : repository.techs;

  
  return  response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const index = findIndex(id);

  if(index === -1) return response.status(400).json({message : "id não encontrado"});
 
  repositories.splice(index, 1);

  
  return  response.status(204).json();

});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  
  const index = findIndex(id);

  if(index === -1) return response.status(400).json({message : "id não encontrado"});
 

  const repository =  repositories[index];
  repository.likes += 1;

  return  response.json(repository);
});

function findIndex(id) {
  return repositories.findIndex(repository => repository.id === id);
}

module.exports = app;

