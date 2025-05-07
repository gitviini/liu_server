import { runListCommands } from "./src/utils/utils.js"
import * as handlers from "./src/utils/db-handler.js"
import encodeHash from "./src/utils/code-parser.js"
import preCommands from "./src/contants/db-templates.js"
import express from "express"
import bodyParser from "body-parser"
import morgan from "morgan"
const app = express()
const port = 3000

//* setup db tables and rules
runListCommands(preCommands)

// middlewares
app.use(morgan("tiny"))
app.use(bodyParser.json())

// crud user by email/code
app.route("/user/:code")
    .get((req, res) => {

    })
    .post((req, res) => {

    })
    .put((req, res) => {

    })
    .delete((req, res) => {

    })

// crud notification
app.route("/notification/:code")
    .get(async (req, res) => {
        const code = encodeHash(req.params.code)
        const { data, error } = await handlers.getNotifications(code)
        
        let response = { message: data.message, code: 200, content: { code: code, data: data.content.data } }
        if (error.message) {
            response = { message: error.message, code: 500, content: { data: error } }
        }
        res.json(response)
    })
    .post(async (req, res) => {
        const code = encodeHash(req.params.code)
        const notificationData = req.body
        notificationData.authorCode = code
        console.log(notificationData)
        const { data, error } = await handlers.postNotification(notificationData)

        let response = { message: data.message, code: 200, content: { code: code, data: data.content.data } }
        if (error.message) {
            response = { message: error.message, code: 500, content: { data: error } }
        }
        res.json(response)
    })
    .put((req, res) => {
        res.json({ message: "success", content: {} })
    })
    .delete((req, res) => {
        res.json({ message: "success", content: {} })
    })

app.listen(port, () => {
    console.log(`\x1b[35m App is run:\x1b[m http://localhost:${port}\n`)
})