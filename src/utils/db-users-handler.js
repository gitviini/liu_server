import { execute } from "./utils";
import sql from "../services/db";

async function getUsers(
    userData = {
        code: String
    }
){
    return await execute(sql`
        SELECT * FROM "users" WHERE code = ${userData.code}
        `)
}

async function postUser(
    userData = {
        code: String,
        code_connected: String,
    }
){
    return await execute(sql`
        INSERT INTO "users" ${sql(userData, "code", "code_connected")}
        RETURNING code, code_connected
        `)
}

async function updateUser(
    userData = {
        code: String,
        code_connected: String,
    }
){
    return await execute(sql`
        UPDATE "users"
        SET ${userData, "code_connected"}
        WHERE code = ${userData.code}
        RETURNING code, code_connected
        `)
}

async function deleteUser(
    userData = {
        code: String
    }
){
    return await execute(sql`
        DELETE FROM "users"
        WHERE code = ${userData.code}
        RETURNING code, code_connected
        `)
}

export {getUsers, postUser, updateUser, deleteUser}