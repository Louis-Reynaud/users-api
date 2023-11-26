import { FastifyReply, FastifyRequest } from "fastify";
import { IUser } from "../interfaces";

import type * as s from "zapatos/schema";
import * as db from "zapatos/db";
import pool from "../db/pgPool";

const staticUsers: IUser[] = [
  {
    id: 1,
    name: "Joyce Byers",
  },
  {
    id: 2,
    name: "Jimmi Hopper",
  },
  {
    id: 3,
    name: "Mike Wheeler",
  },
  {
    id: 4,
    name: "Dustin Henderson",
  },
  {
    id: 5,
    name: "Lucas Sinclair",
  },
];

export const getUserById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const params: any = request.params;
  const userId = params["id"];
  console.log(userId);
  return db.sql<
    s.users.SQL,
    s.users.Selectable[]
  >`SELECT * FROM ${"users"} WHERE user_id = ${userId}`
    .run(pool)
    .then((user) => {
      console.log("coucou : ", user);
      if (user["data"]) {
        return { data: user };
      } else return { error: "404: user not found" };
    });
};

export const listUsers = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  return db.sql<s.users.SQL, s.users.Selectable[]>`SELECT * FROM ${"users"}`
    .run(pool)
    .then((users) => ({ data: users }));
  // Or .then((users) => reply.send({ data: users }))
};

export const addUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const params: any = request.params;
  const userName = params["name"];
  let namea: db.SQL = db.sql`${userName}`;

  return db.sql<
    s.users.SQL,
    s.users.Insertable[]
  >`INSERT INTO ${"users"} (name) VALUES ('${namea}')`
    .run(pool)
    .then((users) => ({ data: users }));
  // Or .then((users) => reply.send({ data: users }))
};
