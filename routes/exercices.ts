import { Request, Response } from "express";
import prisma from "../prisma/prisma";
import { error } from "console";
import { Exercices } from "@prisma/client";
var express = require('express');
var router = express.Router();

/* GET Collection */
router.get("/", async (req: Request, res: Response) => {
    try {
        const exercices: Exercices[] = await prisma.exercices.findMany()
        res.status(200).json(exercices)
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        })
    }
})

/* GET exercices by id */
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const exercices: Exercices[] = await prisma.exercices.findMany(
            {
                where: {
                    id: {
                        equals: +id
                    }
                }
            }
        )
        res.json(exercices)
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        })
    }
})

module.exports = router;