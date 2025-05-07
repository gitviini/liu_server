import sql from "../services/db.js";
import { execute } from "./utils.js";

async function getNotifications(authorCode = "") {
    const {data, error} = await execute(sql`SELECT * FROM "notification" WHERE author_code = ${authorCode};`)
    return {data, error}
}

async function postNotification(
    notificationData = {
        title: String,
        description: String,
        date: String,
        time: String,
        occurred: Boolean,
        authorCode: String,
    }) {

    const {data, error} = await execute(sql`INSERT INTO IF NOT EXISTS "notification"
        ${sql(notificationData, "title", "description", "date", "time", "occurred", "author_code")}
        `)
    return {data, error}
}

export {getNotifications, postNotification}