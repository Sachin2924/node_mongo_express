const express = require('express');
const app = express();
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const url = "mongodb://127.0.0.1:27017";
MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true})
  .then(client => {
    console.log("connection created")
    const db = client.db('users')
    const user = db.collection('usersData')
    user.insertOne({name:"sachin",last:"jadhav"})
    .then(result => {
      console.log(result)
    })
    .catch(error => console.error(error))
    app.use(/* ... */)
    app.get('/', (req, res) => {
     db.collection('user').find().toArray()
     .then(results => {
       console.log(results)
    })
    .catch(error => console.error(error))
      // ...
    })
    app.post('/addUser', (req, res) => {
     user.insertOne(req.body)
     .then(result => {
       console.log(result)
      })
      .catch(error => console.error(error))
    })

    app.put('/update', (req, res) => {
     user.findOneAndUpdate(/* ... */)
    .then(result => {
       console.log(result)
     })
      .catch(error => console.error(error))
    })
  
   app.delete('/delete', (req, res) => {
     user.deleteOne(/* ... */)
    .then(result => {
      if (result.deletedCount === 0) {
        return res.json('No User to delte')
      }
      res.json(`user deleted suceesfully`)
     })
    .catch(error => console.error(error))
    })

    app.listen(3000, function() {
      console.log('listening on 3000')
    })
  })
  .catch(console.error)
