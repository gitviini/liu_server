import sql from "../services/db.js"

const userModel = sql`
CREATE TABLE IF NOT EXISTS "users" (
    id serial,
    type text not null,
    dcnt text,
    code text not null unique,
    code_connected text,
    cep text not null,
    neighborhood text not null,
    created_at timestamp default CURRENT_TIMESTAMP,
    constraint users_pkey primary key (code),
    constraint users_code_key unique (code)
);`

const notificationModel = sql`
CREATE TABLE IF NOT EXISTS "notification" (
    id serial,
    title varchar(20) not null,
    description text,
    date date,
    time time,
    type varchar(20) not null,
    priority varchar(20) not null default 'Toque de Bem-estar'::text,
    occurred boolean not null default false,
    created_at timestamp with time zone null default CURRENT_TIMESTAMP,
    author_code text not null,
    constraint notification_pkey primary key (id)
);`

export default [userModel, notificationModel]