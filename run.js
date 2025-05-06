import { execute, runListCommands } from "./src/utils/utils.js"
import encodeHash from "./src/utils/code-parser.js"
import preCommands from "./src/contants/db-templates.js"
import express from "express"
import bodyParser from "body-parser"
const app = express()
const port = 3000

//* setup db tables and rules
runListCommands(preCommands)

app.use(bodyParser.json())

app.route("/notification/:email")
    .get((req, res) => {
        const code = encodeHash(req.params.email)
        res.json({ message: "success", content : {code: code}})
    })
    .post((req, res) => {
        res.json({ message: "success" })
    })
    .put((req, res) =>{
        res.json({ message: "success", content: {}})
    })
    .delete((req, res) => {
        res.json({ message: "success", content: {}})
    })

app.listen(port, () => {
    console.log(`\x1b[32m App is run:\x1b[m http://localhost:${port}`)
})