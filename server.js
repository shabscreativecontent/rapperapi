const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const PORT = 2002


app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


let db, 
    rapCollection, 
    dbConnectionStr = "mongodb+srv://shabsCreativeContent:7GlOQWriWthvktqT@cluster0.rabvdwq.mongodb.net/"

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }).then(client => {
   console.log("Connected to Database");
   db = client.db('Rappers')
   rapCollection = db.collection('rap')
}).catch(error => console.error(error))

// // 7GlOQWriWthvktqT
app.get('/', (request, response) => {
   // response.sendFile(__dirname + "/index.html")

   rapCollection.find().sort({likes: -1}).toArray().then(data => {
      response.render("index.ejs", { rapperInfo: data })
   })
})

app.post('/addRapper', (request, response) => {
   rapCollection.insertOne({name: request.body.name, food: request.body.food, likes: 0, completed: false}).then(result => {
      console.log('Rapper Added')
      response.redirect('/')
   }).catch(error => console.error(error))
})

app.put('/updateLike', (request, response) => {
   rapCollection.updateOne({name: request.body.rapNameS, food: request.body.rapFoodS, likes: request.body.rapLikeS},{
      $set: {
         likes:request.body.rapLikeS + 1
      }
   },{
      sort: {_id: -1}
      // upsert: true
   }).then(result => {
      console.log("Added One Like");
      response.json("Like Added")
   }).catch(error => console.error(error))
})

app.delete('/deleteRapper', (request, response) => {
   rapCollection.deleteOne({food: request.body.rapFoodS}).then(result => {
      console.log('Rapper Deleted');
      response.json("Rapper Deleted")
   }).catch(error = console.error(error))
})

app.listen(process.env.PORT || PORT, ()=>{
   console.log(`server is live on port ${PORT}`);
})