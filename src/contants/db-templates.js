import sql from "../services/db.js"

const userModel = sql`CREATE TABLE IF NOT EXISTS "users" (
    id serial,
    name varchar(20) not null,
    email text not null,
    password text not null,
    code varchar(16),
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
    authorId int not null
);`

export {userModel, notificationModel}