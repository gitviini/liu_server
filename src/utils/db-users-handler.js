import { execute } from "./utils.js";
import sql from "../services/db.js";

async function getUser(
    userData = {
        code: String
    }
) {
    return await execute(sql`
        SELECT * FROM "users"
        WHERE code = ${userData.code}
        `)
}

async function postUser(
    userData = {
        type: String,
        code: String,
        code_connected: String,
    }
) {
    return await execute(sql`
        INSERT INTO "users" ${sql(userData, "type", "code", "code_connected")}
        RETURNING code, code_connected
        `)
}

async function updateUser(
    userData = {
        type: String,
        code: String,
        code_connected: String,
    }
) {
    return await execute(sql`
        UPDATE "users"
        SET ${sql(userData, "type", "code_connected")}
        WHERE code = ${userData.code}
        RETURNING type, code, code_connected
        `)
}

async function deleteUser(
    userData = {
        code: String
    }
) {
    return await execute(sql`
        DELETE FROM "users"
        WHERE code = ${userData.code}
        RETURNING id, type, code, code_connected
        `)
}

export { getUser, postUser, updateUser, deleteUser }