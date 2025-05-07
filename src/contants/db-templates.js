import sql from "../services/db.js"

const userModel = sql`CREATE TABLE IF NOT EXISTS "users" (
    id serial,
    code text not null unique,
    password text not null,
    created_at timestamp with time zone null default CURRENT_TIMESTAMP
);`

const notificationModel = sql`CREATE TABLE IF NOT EXISTS "notification" (
    id serial,
    title varchar(20) not null,
    description text,
    date date,
    time time,
    occurred boolean not null default false,
    created_at timestamp with time zone null default CURRENT_TIMESTAMP,
    authorCode text not null
);`

export default [userModel, notificationModel]