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
let locations = [{
    id : 1,
    name : "Location 1",
    address : "Address 1"
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
    events = events.push(objToInsert)
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

//PARTICIPANTS API
app.get("/participants", (req,res)=>{
    res.json({
        status:"Success",
        data: participant
        })
})

app.get("/participants/:id", (req,res)=>{
    let id = req.params.id
    for([index,item] of participant.entries()){
        if(item.id == id){
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

app.post("/participants", (req,res)=>{
    let objToInsert = [{
        id:req.params.id,
        name:req.body.name,
        email:req.body.email
    }]
    participant.push(objToInsert)
    res.json({
        status:"Success",
        data:"Object inserted successfully"
    })
})

app.put("/participants/:id", (req,res)=>{
    let id = req.params.id
    for([index,item] of participant.entries()){
        if(item.id == id){
            //Ho aggiunto questa piccola gestione delle eccezioni, fa sì che se si sta provando a modificare l'id, manda un errore
            if(req.body.id) res.json({status:"Error", data:"You can't modify ID field"})
            item.name = req.body.name ? req.body.name : item.name
            item.email = req.body.email ? req.body.email : item.email
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


app.delete("/participants/:id", (req,res)=>{
    let id = req.params.id
    for([index,item] of participant.entries()){
        if(item.id == id){
            participant.splice(index,1)
        }
    }
})

//API LOCATIONS
app.get("/locations", (req,res)=>{
    res.json({
        status:"Success",
        data:locations
        })
})

app.get("/locations/:id", (req,res)=>{
    let id = req.params.id
    for([index,item] of locations.entries()){
        if(item.id == id){
            res.json({
                status:"Success",
                data:item
                })
        }
    }
    res.json({
        status:"Error",
        data: "No entries found with this id"
        })
})

app.post("/locations", (req,res)=>{
    let objToInsert = [{
        id: req.body.id,
        name: req.body.name,
        address: req.body.address
    }]
    //Aggiunta ricerca per gestione di eccezioni, se l'id è già presente all'interno dei mocks, restituisce un errore
    for([index,item] of locations.entries()){
        if(objToInsert.id == item.id){
            res.json({
                status:"Error",
                data: "Entry already exists with this id"
                })
        }
    }

/*  ho aggiunto l'operatore di spread, ovvero "...", l'operatore fa sì che inserisce tanti oggetti 
    quanti sono quelli inseriti nel body durante l'operazione. */ 
    locations.push (...objToInsert)
    res.json({
        status:"Success",
        data: "Entry added successfully"
        })
})

app.put("/locations/:id", (req,res)=>{
    let id = req.params.id
    for([index,item] of locations.entries()){
        if(item.id == id){
            if(req.body.id){res.json({status:"Error", data:"You can't modify ID"})}
            item.name = req.body.name
            item.address = req.body.address
            res.json({
                status:"Success",
                data: "Entry updated successfully"
                })
        }
    }
    res.json({
        status:"Error",
        data: "No entries found with this id"
        })
})
app.delete("/locations/:id", (req,res)=>{
    let id = req.params.id
    for([index,item] of locations.entries()){
        if(item.id == id){
            locations.splice(index,1)
            res.json({
                status:"Success",
                data: "Entry deleted successfully"
                })
        }
    }
    res.json({
        status:"Error",
        data: "No entries found with this id"
        })
})