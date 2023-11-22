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

// export const listUsers = async (
//   request: FastifyRequest,
//   reply: FastifyReply
// ) => {
//   console.log("listUsers");
//   Promise.resolve(staticUsers).then((users) => {
//     reply.send({ data: users });
//   });
// };

export const getUserById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const params: any = request.params;
  const userId = params["id"];
  console.log(userId);
  Promise.resolve(staticUsers).then((users) => {
    const filteredUsers = users.filter((user: any) => {
      return user["id"] == userId;
    });
    console.log("coucou", filteredUsers);
    if (filteredUsers) {
      reply.send({ data: filteredUsers[0] });
    } else {
      reply.send({ error: "404, not found" });
    }
  });
};

// export const addUser = async (request: FastifyRequest, reply: FastifyReply) => {
//   const params: any = request.params;
//   const userName = params["name"];
//   return Promise.resolve(staticUsers).then((users) => {
//     const list: number[] = users.map((user) => user.id);
//     const user = {
//       id: Math.max(...list) + 1,
//       name: userName,
//     };
//     if (params) {
//       staticUsers.push(user);
//     } else {
//       reply.send({ error: "404, not found" });
//     }
//   });
// };

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
  return db.sql<
    s.users.SQL,
    s.users.Insertable[]
  >`INSERT INTO ${"users"} (${"email"}, password) VALUES ('example@example.com', 'motdepasse123')`
    .run(pool)
    .then((users) => ({ data: users }));
  // Or .then((users) => reply.send({ data: users }))
};
