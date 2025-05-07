import { runListCommands } from "./src/utils/utils.js"
import * as handlerDataBase from "./src/utils/db-notification-handler.js"
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
        const code = req.params.code

        
    })
    .put((req, res) => {

    })
    .delete((req, res) => {

    })

// crud notification
app.route("/notification/:code")
    .get(async (req, res) => {
        const code = encodeHash(req.params.code)

        const { data, error } = await handlerDataBase.getNotifications(code)
        
        let response = { message: data.message, code: 200, content: { data: data.content } }
        if (error.message) {
            response = { message: error.message, code: 500, content: { data: error.content } }
        }
        res.json(response)
    })
    .post(async (req, res) => {
        /* {
            "title": "oi",
            "description": "foda",
            "date": "2020",
            "time": "22",
            "occurred": false,
            "author_code": ""
        } */
        const code = encodeHash(req.params.code)
        const notificationData = req.body
        notificationData.author_code = code
        console.log(notificationData)

        const { data, error } = await handlerDataBase.postNotification(notificationData)

        let response = { message: data.message, code: 200, content: { data: data.content } }
        if (error.message) {
            response = { message: error.message, code: 500, content: { data: error.content } }
        }
        res.json(response)
    })
    .put(async (req, res) => {
        const notificationData = req.body
        
        const {data, error} = await handlerDataBase.uploadNotification(notificationData)

        let response = { message: data.message, code: 200, content: { data: data.content } }
        if (error.message) {
            response = { message: error.message, code: 500, content: { data: error.content } }
        }
        res.json(response)
    })
    .delete(async (req, res) => {
        /* {
            "id": ""
            "author_code": ""
        } */

        const code = encodeHash(req.params.code)
        const notificationData = req.body

        const { data, error } = await handlerDataBase.deleteNotification(notificationData)
        let response = { message: data.message, code: 200, content: { data: data.content } }
        if (error.message) {
            response = { message: error.message, code: 500, content: { data: error.content } }
        }
        res.json(response)
    })

app.listen(port, () => {
    console.log(`\x1b[35m App is run:\x1b[m \x1b[4mhttp://localhost:${port}\x1b[m\n`)
})