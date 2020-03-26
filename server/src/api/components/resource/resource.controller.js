const Resource = require('./resource.model');
const ERRORS = require('./resource.erros');

const resource_controller = {
    /**
     * Agrega un nuevo recurso. 
     * 
     * @param {object} req - petición del cliente
     * @param {oobject} res - respuesta del servidor
     */
    async create(req, res) {
        try {
            let name = req.body.name;
            let description = req.body.description;
            let quantity = req.body.quantity;
            let available = req.body.available;

            let category = req.body.category;
            if (category != null) { category = category.id; }

            if (!name) {
                // retorna error si el nombre del recurso no se encuentra
                res.status(422).send(ERRORS.INVALID_NAME);
                return;
            }
            if (!description) {
                // retorna error si la descripción del recurso no se encuentra
                res.status(422).send(ERRORS.INVALID_DESCRIPTION);
                return;
            }
            if (!quantity) {
                // retorna error si la cantidad no se encuentra
                res.status(422).send(ERRORS.INVALID_QUANTITY);
                return;
            }

            let created = await Resource.create({
                name: name,
                description: description,
                quantity: quantity,
                available: available,
                category: category
            });

            res.status(200).send(created);
        } catch (err) {
            console.log(err.message);
            res.status(500).send(err.message);
        }
    },
    /**
     * Lista todos los recursos registrados. 
     * 
     * @param {object} req - petición del cliente
     * @param {oobject} res - respuesta del servidor
     */
    async list(req, res) {
        try {
            let resources = await Resource.find({});

            res.status(200).send(resources);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    /**
     * Obtiene la información de un recurso. 
     * 
     * @param {object} req - petición del cliente
     * @param {oobject} res - respuesta del servidor
     */
    async get(req, res) {
        try {
            let id = req.params.id;
            let resource = await Resource.findOne({_id: id}).populate('category');

            res.status(200).send(resource);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    /**
     * Obtiene los recursos pertenecientes a una categoría. 
     * 
     * @param {object} req - petición del cliente
     * @param {oobject} res - respuesta del servidor
     */
    async get_by_category(req, res) {
        try {
            let category_id = req.params.category_id;
            let resources = await Resource.find({category: category_id});

            res.status(200).send(resources);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    /**
     * Actualiza un recurso. 
     * 
     * @param {object} req - petición del cliente
     * @param {oobject} res - respuesta del servidor
     */
    async update(req, res) {
        try {
            let id = req.params.id;
            let name = req.body.name;
            let description = req.body.description;
            let quantity = req.body.quantity;
            let available = req.body.available;

            let category = req.body.category;
            if (category != null) { category = category.id; }

            if (!name) {
                // retorna error si el nombre del recurso no se encuentra
                res.status(422).send(ERRORS.INVALID_NAME);
                return;
            }
            if (!description) {
                // retorna error si la descripción del recurso no se encuentra
                res.status(422).send(ERRORS.INVALID_DESCRIPTION);
                return;
            }
            if (!quantity) {
                // retorna error si la cantidad no se encuentra
                res.status(422).send(ERRORS.INVALID_QUANTITY);
                return;
            }

            let resource = await Resource.findById(id);
            resource.name = name;
            resource.description = description;
            resource.quantity = quantity;
            resource.available = available;
            resource.category = category;
            let updated = await resource.save();

            res.status(200).send(updated);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    /**
     * Elimina un recurso. 
     * 
     * @param {object} req - petición del cliente
     * @param {oobject} res - respuesta del servidor
     */
    async delete(req, res) {
        try {
            let id = req.params.id;
            let resource = await Resource.deleteOne({_id: id});

            res.status(200).send(resource);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}

module.exports = resource_controller;