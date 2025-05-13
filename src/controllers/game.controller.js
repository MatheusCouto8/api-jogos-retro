import GameModel from "../models/game.model.js"

class GameController {
    async findAll (req, res) {
        try {
            const games = await GameModel.findAll();

            return res.status(200).json(games)
        } catch (error) {
            console.error("Error finding all games", error);
            return res.status(500).json({message: "Error finding all games", error})
        }
    }
    async create(req, res) {
        try {
            const { name, plataform } = req.body;

            //Validação Básica
            if(!name || !plataform) {
                return res.status(400).json({error: "Name and plataform fields are required!",})
            }

            const data = {
                name,
                plataform,
            }

            const  newGame = await GameModel.create(data);
            return res.status(201).json({message: "New Game successfully created!", game: newGame})

        } catch (error) {
            console.error("Error creating new game", error);
            res.status(500).json({message: "Error creating new game", error});
        }
    }
}

export default new GameController()