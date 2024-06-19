const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({extended : false}))

const host = "127.0.0.1"
const port = 4000

app.listen(port , ()=> console.log('> Server is up and running on port : ' + port))

//Mocks
let events = [{
    locationId: 1,
    name : "Event 1",
    description : "This is event 1",
    date : "2022-01-01",
}]

let participant = [{
    id : "1",
    name : "Participant 1",
    email : "participant1@example.com"
}]

//EVENTS API
app.get("/events", (req,res)=>{
    res.json(events)
})

app.get("/events/:id", (req,res)=>{
    let id = req.params.id
    for([index,item] of events.entries()){
        if(item.locationId == id){
            res.json({
                status:"Success",
                data: item
            })
        }

    }
    res.json({
        status:"Error",
        data: "No entries found with this id"
    })
})

app.post("/events", (req,res)=>{
    let objToInsert = [{
        locationId : req.body.locationId,
        name : req.body.name,
        description : req.body.description,
        date : req.body.date
    }]
    events = events.concat(objToInsert)
    res.json({
        status:"Success",
        data:"Objected inserted successfully"
    })
})

app.put("/events/:id", (req,res)=>{
    let id = req.params.id
    for([index,item] of events.entries()){
        if(item.locationId == id){
            item.name = req.body.name ? req.body.name : item.name
            item.description = req.body.description ? req.body.description : item.description
            item.date = req.body.date ? req.body.date : item.date
            res.json({
                status:"Success",
                data:"Object updated successfully"
            })
        }
    }
    res.json({
        status:"Error",
        data: "No entries found with this id"
        })
})
app.delete("/events/:id", (req,res)=>{
    let id = req.params.id
    for([index,item] of events.entries()){
        if(item.locationId == id){
            events.splice(index,1)
            res.json({
                status:"Success",
                data:"Object deleted successfully"
            })
        }
    }
    res.json({
        status:"Error",
        data: "No entries found with this id"
        })
})