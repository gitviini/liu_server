import sql from "../services/db.js";
import { execute } from "./utils.js";

async function getNotifications(authorCode = "") {
    return await execute(sql`SELECT * FROM "notification" WHERE author_code = ${authorCode}`)
}

async function postNotification(
    notificationData = {
        title: String,
        description: String,
        date: String,
        time: String,
        occurred: Boolean,
        author_code: String,
    }) {

    return await execute(sql`INSERT INTO "notification"
        ${sql(notificationData, "title", "description", "date", "time", "occurred", "author_code")}
        `)
}

async function uploadNotification(
    notificationData = {
        id: String,
        title: String,
        description: String,
        date: String,
        time: String,
        occurred: Boolean,
        author_code: String,
    }) {

    return await execute(sql`UPDATE`)
}

async function deleteNotification(
    notificationData = {
        id: Number,
        author_code: String
    }) {

    return await execute(sql`
        DELETE FROM "notification"
        WHERE id = ${notificationData.id}
        and author_code = ${notificationData.author_code}
        RETURNING id, author_code
        `)
}

export { getNotifications, postNotification, uploadNotification, deleteNotification }