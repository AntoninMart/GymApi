import { Request, Response } from "express";
import { User } from "@prisma/client";
import prisma from "../prisma/prisma";
import { equal } from "assert";
import { error } from "console";
var express = require('express');
var router = express.Router();

/* GET Collection */
router.get("/", async (req: Request, res: Response) => {
  try {
    const users: User[] = await prisma.user.findMany()
    res.json(users)
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    })
  }
})

/* GET user */
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const users: User[] = await prisma.user.findMany(
      {
        where: {
          id: {
            equals: +id
          }
        }
      }
    )
    res.json(users)
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    })
  }
})

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body

    const newUser = await prisma.user.create({
      data: {
        pseudo: name
      }
    })

    res.json(newUser)

  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
})

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body
    const { id } = req.params;

    const users: User[] = await prisma.user.findMany({
      where: {
        id: {
          equals: Number(id)
        }
      }
    })
    if (users.length == 0) {
      res.status(403).json({ message: "L'utilisateur n'existe pas" });
      return;
    }

    const update = await prisma.user.update({
      where: { id: Number(id) },
      data: { pseudo: name }
    })
    res.status(200).json(update)
  } catch {
    res.status(500).json({ message: error })
  }
})

module.exports = router;
