const express = require("express");
const app = express();
const port = 8080;
const cors = require('cors');

const { Client } = require("pg")
const client = new Client({
  password: "root",
  user: "root",
  host: "postgres"
})

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static("public"));

app.get("/tags", async(req, res) => {
  const results = await client.query("SELECT * FROM cards")
    .then( (data) => { 
      return data.rows;
    })
    .catch( (err) => {console.log(err)});
  res.setHeader("Content-Type", "application/json")
  res.status(200)
  res.send( JSON.stringify(results) )
})

app.post("/add", async(req, res) => {
  console.log("🚀 ~ file: server.js ~ line 26 ~ app.post ~ req.body", req.body)

  try {
    const { title } = req.body;
    const { body } = req.body;

    const results = await client.query("INSERT INTO cards (title, body) VALUES ($1, $2)", [ title, body ])
      .catch( (err) => {console.log(err)});
    res.setHeader("Content-Type", "application/json")
    res.status(200)
    res.send( JSON.stringify(results) )
    
  } catch (error) {
    console.log(error);
  }
})

app.delete("/delete", async(req, res) => {
  const { id } = req.body;

  const results = await client.query("DELETE FROM cards WHERE id = $1", [ id ])
    .catch( (err) => {console.log(err)});
  res.setHeader("Content-Type", "application/json")
  res.status(200)
  res.send( JSON.stringify(results) )
})

;( async() => {
  await client.connect();
  app.listen(port, console.log("Server in port: " + port))
})();