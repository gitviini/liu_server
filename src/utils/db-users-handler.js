import { execute } from "./utils.js";
import sql from "../services/db.js";

async function getUserByNeighborhood(
    userData = {
        neighborhood: String
    }
) {
    return await execute(sql`
        SELECT * FROM "users"
        WHERE neighborhood = ${userData.neighborhood} and type = 'Paciente'
        `)
}

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
        cep: String,
        dcnt: String,
        neighborhood: String
    }
) {
    return await execute(sql`
        INSERT INTO "users" ${sql(userData, "type", "code", "code_connected", "cep", "dcnt", "neighborhood")}
        RETURNING code, code_connected, cep, dcnt, neighborhood
        `)
}

async function updateUser(
    userData = {
        type: String,
        code: String,
        code_connected: String,
        cep: String,
        dcnt: String,
        neighborhood: String,
    }
) {
    return await execute(sql`
        UPDATE "users"
        SET ${sql(userData, "type", "code_connected", "cep", "dcnt", "neighborhood")}
        WHERE code = ${userData.code}
        RETURNING type, code, code_connected, cep, dcnt, neighborhood
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
        RETURNING id, type, code, code_connected, cep, dcnt, neighborhood
        `)
}

export { getUserByNeighborhood, getUser, postUser, updateUser, deleteUser }
