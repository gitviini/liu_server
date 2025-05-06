import { execute } from "./src/utils/utils.js"
import express from "express"
const app = express()
const port = 3000

app.route("/")
    .get((req, res) => {
        res.json({name: "vinicius"})
    })

app.route("/user/:id")
    .get((req, res) => {
        console.log('Time:', Date.now())
    })
    .post((req, res) => {
        res.send("")
    })
    .put((req, res) => {

    })
    .delete((req, res) => {
        res.send("")
    })

app.listen(port, () => {
    console.log(`\x1b[32m App is run:\x1b[m http://localhost:${port}`)
})