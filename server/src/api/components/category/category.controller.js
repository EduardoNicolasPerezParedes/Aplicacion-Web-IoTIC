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
           let categories = await Category.find({}).populate('parent');

           res.status(200).send(categories);
       } catch (err) {
           res.status(500).send(err.message);
       }
   },
   /**
   * Elimina una categoría. 
   * 
   * @param {object} req - petición del cliente
   * @param {oobject} res - respuesta del servidor
   */
    async delete(req, res) {
        try {
            let id = req.params.id;

            let category = await Category.deleteOne({_id: id});
            
            res.status(200).send(category);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    /**
    * Obtiene una categoría. 
    * 
    * @param {object} req - petición del cliente
    * @param {oobject} res - respuesta del servidor
    */
    async get(req, res) {
        try {
            let id = req.params.id;

            let category = await Category.findOne({_id: id}).populate('parent').select('name available parent');
            
            res.status(200).send(category);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    /**
    * Actualiza una categoría. 
    * 
    * @param {object} req - petición del cliente
    * @param {oobject} res - respuesta del servidor
    */
    async update(req, res) {
        try {
            let id = req.params.id;
            let name = req.body.name;
            let available = req.body.available;
            let parent = req.body.parent;

            if (parent !== null) { parent = parent.id; }

            let category = await Category.findOne({_id: id});

            category.name = name;
            category.available = available;
            category.parent = parent;
            let cat_updated = await category.save();
            
            res.status(200).send(cat_updated);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    /**
    * Obtiene las categorías pertenecientes a una categoría. 
    * 
    * @param {object} req - petición del cliente
    * @param {oobject} res - respuesta del servidor
    */
    async get_by_parent(req, res) {
        try {
            let parent_id = req.params.parent_id;
            
            let categories = await Category.find({ parent: parent_id });

            res.status(200).send(categories);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}

module.exports = auth_controller;