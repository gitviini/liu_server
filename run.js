import { runListCommands } from "./src/utils/utils.js"
import * as handlerDbNotification from "./src/utils/db-notification-handler.js"
import * as handlerDbUser from "./src/utils/db-users-handler.js"
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

app.get("/users/", async (req, res) => {
	const userData = req.body

    console.log(userData)

	const {data, error} = await handlerDbUser.getUserByNeighborhood(userData)

	let response = { message: data.message, code: 200, content: { data: data.content } }
	if (error.message) {
		response = { message: error.message, code: 500, content: { data: error.content } }
	}
	res.json(response)
})

// crud user by email/code
app.route("/user/:code")
    .get(async (req, res) => {
        const code = (req.params.code.includes("@") ? encodeHash(req.params.code) : req.params.code)

        const { data, error } = await handlerDbUser.getUser({ code: code })

        let response = { message: data.message, code: 200, content: { data: data.content } }
        if (error.message) {
            response = { message: error.message, code: 500, content: { data: error.content } }
        }
        res.json(response)
    })
    .post(async (req, res) => {
        const code = encodeHash(req.params.code)
        const userData = req.body
        userData.code = code

        const { data, error } = await handlerDbUser.postUser(userData)
        let response = { message: data.message, code: 200, content: { data: data.content } }
        if (error.message) {
            response = { message: error.message, code: 500, content: { data: error.content } }
        }
        res.json(response)
    })
    .put(async (req, res) => {
        const code = req.params.code
        const userData = req.body
        userData.code = code

        const { data, error } = await handlerDbUser.updateUser(userData)
        let response = { message: data.message, code: 200, content: { data: data.content } }
        if (error.message) {
            response = { message: error.message, code: 500, content: { data: error.content } }
        }
        res.json(response)
    })
    .delete(async (req, res) => {
        const code = req.params.code

        const { data, error } = await handlerDbUser.deleteUser({ code: code })
        let response = { message: data.message, code: 200, content: { data: data.content } }
        if (error.message) {
            response = { message: error.message, code: 500, content: { data: error.content } }
        }
        res.json(response)
    })

// crud notification
app.route("/notification/:code")
    .get(async (req, res) => {
        const code = encodeHash(req.params.code)

        const { data, error } = await handlerDbNotification.getNotifications(code)

        let response = { message: data.message, code: 200, content: { data: data.content } }
        if (error.message) {
            response = { message: error.message, code: 500, content: { data: error.content } }
        }
        res.json(response)
    })
    .post(async (req, res) => {
        /* 
        notificationData = {
            title: String,
            description: String,
            date: String,
            time: String,
            occurred: Boolean,
            type: String,
            author_code: String,
        } */
        const code = encodeHash(req.params.code)
        const notificationData = req.body
        notificationData.author_code = code
        console.log(notificationData)

        const { data, error } = await handlerDbNotification.postNotification(notificationData)

        console.log(error)

        let response = { message: data.message, code: 200, content: { data: data.content } }
        if (error.message) {
            response = { message: error.message, code: 500, content: { data: error.content } }
        }
        res.json(response)
    })
    .put(async (req, res) => {
        const notificationData = req.body

        const { data, error } = await handlerDbNotification.uploadNotification(notificationData)

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

        const { data, error } = await handlerDbNotification.deleteNotification(notificationData)
        let response = { message: data.message, code: 200, content: { data: data.content } }
        if (error.message) {
            response = { message: error.message, code: 500, content: { data: error.content } }
        }
        res.json(response)
    })

app.listen(port, () => {
    console.log(`\x1b[35m App is run:\x1b[m \x1b[4mhttp://localhost:${port}\x1b[m\n`)
})
