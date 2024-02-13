import prisma from "./prisma";
import * as fs from 'fs';

async function remplissage(nom: string, image: string, description: string, groupeMusculaireId: string) {

    let groupe = await prisma.groupeMusculaire.findFirst({
        where: {
            nom: {
                equals: groupeMusculaireId,
            }
          }
    })
    
    // ATTENDRE QUE CETTE REQUETE SOIT SUR LA BASE AVANT D'EXECUTRE LA PROCHAINE
    if (groupe == null) {
        groupe = await prisma.groupeMusculaire.create({
            data: {
                nom: groupeMusculaireId,
            }
        })
    }

    try {
        await prisma.exercices.create({
            data: {
                nom: nom,
                image: image,
                description: description,
                groupeMusculaireId: groupe.id,
            }
        })
    } catch (error) {
        console.log(error);
    }
    
    console.log("truc ajouter " + nom )

}

async function main() {
    let rawData = fs.readFileSync('./json/data.json', 'utf8');
    let jsonData = JSON.parse(rawData);
    for (const element of jsonData) {
        await remplissage(element.nom, element.image, element.desc, element.groupe);
    }
}

main()