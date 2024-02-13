import { Request, Response } from "express";
import prisma from "../prisma/prisma";
import { error } from "console";
import { Exercices, Seances } from "@prisma/client";
import { equal } from "assert";
var express = require('express');
var router = express.Router();

/* GET Collection */
router.get("/", async (req: Request, res: Response) => {
    try {
        const seances: Seances[] = await prisma.seances.findMany()
        res.json(seances)
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        })
    }
})

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const seances: Seances[] = await prisma.seances.findMany(
            {
                where: {
                    id: {
                        equals: +id
                    }
                }
            }
        )
        res.json(seances)
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        })
    }
})

router.post("/:id", async (req: Request, res: Response) => {
    try {
        const { nom, userId, exercicesId, nbSerie } = req.body

        const newUser = await prisma.seances.create({
            data: {
                Nom: nom,
                userId: userId
            }
        })
        res.status(201).json(newUser)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error,
        })
    }
})

router.patch("/:id", async(req: Request, res: Response) => {
    try {
        const { nom, exercicesId, nbSerie } = req.body
        const { id } = req.params
        const patch = await prisma.seances.update({
            where: {
                id: Number(id)
            },
            data: {
                Nom: nom,
                exercices: {
                    create: {
                        nbSerie: nbSerie,
                        exercicesId: exercicesId
                    }
                }
            } 
        })
        res.status(200).json(patch);
    } catch(error) {
        res.status(500).json({message:error})
    }
})

router.get("/:id/exercices", async(req: Request, res: Response) => {
    try {
        const { id } = req.params
        const seances = await prisma.seances.findUnique({
            where: {
                id: Number(id),
            },
            include: {
                exercices: {
                    include: {
                        exercice: true,
                    },
                },
            }
        })
        res.status(200).json(seances);
    } catch(error) {
        res.status(500).json({message:error})
    }
})


module.exports = router;