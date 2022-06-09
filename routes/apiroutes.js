const router = require ("express").Router()

let db = require ("../db/db.json")
const fs = require ("fs")

router.get("/api/notes",(req,res)=>{
    db = JSON.parse(fs.readFileSync('db/db.json'))||[]
 res.json(db)   
})

router.post("/api/notes",(req,res)=>{
    const newData = {...req.body,id:Math.floor(Math.random()*1000)}
    db.push(newData)

    fs.writeFileSync('db/db.json', JSON.stringify(db),function(er){
        if(err)throw err
    })
 res.json(db)   
})

router.delete("/api/notes/:id",(req,res)=>{
    const newData = db.filter(note => note.id!=req.params.id)
       db =newData

    fs.writeFileSync('db/db.json', JSON.stringify(db),function(er){
        if(err)throw err
    })
 res.json(db)   
})

module.exports = router