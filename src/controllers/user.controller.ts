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
  let name = (request.params as any)["name"] as db.SQL;
  return db.sql<
    s.users.SQL,
    s.users.Insertable[]
  >`INSERT INTO ${"users"} (name, score) VALUES ('${name}', '34')`
    .run(pool)
    .then((users) => ({ data: users }));
  // Or .then((users) => reply.send({ data: users }))
};

export const updateUser = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  let user_id = (request.params as any)["id"] as db.SQL;
  let new_name = (request.body as any)["name"] as db.SQL;
  console.log("coucou", new_name);
  let new_score = (request.body as any)["score"] as db.SQL;
  console.log("coucou 2", new_score as Number);
  return db.sql<
    s.users.SQL,
    s.users.Updatable[]
  >`UPDATE ${"users"} SET name = '${new_name}', score = 12 WHERE user_id = 1`
    .run(pool)
    .then((users) => ({ data: users }));
  // Or .then((users) => reply.send({ data: users }))
};
