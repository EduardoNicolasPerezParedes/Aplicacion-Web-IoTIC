const Category = require('./category.model');

const auth_controller = {
    /**
     * Registra una nueva categoría. 
     * 
     * @param {object} req - petición del cliente
     * @param {oobject} res - respuesta del servidor
     */
    async create(req, res) {
        try {
            let name = req.body.name;
            let available = req.body.available;
            let parent = req.body.parent;

            if (parent !== null) { parent = parent.id; }

            let category = await Category.create({
                name: name,
                available: available,
                parent: parent
            });
            
            res.status(200).send(category);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    /**
    * Lista las cateogrías registradas. 
    * 
    * @param {object} req - petición del cliente
    * @param {oobject} res - respuesta del servidor
    */
   async list(req, res) {
       try {
           let categories = await Category.find({});
           
           res.status(200).send(categories);
       } catch (err) {
           res.status(500).send(err.message);
       }
   }
}

module.exports = auth_controller;