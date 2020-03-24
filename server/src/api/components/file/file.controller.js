const IncomingForm = require('formidable').IncomingForm;
const crypto = require('crypto');
const fs = require('fs');

const ERRORS = require('./file.errors');
const Resource = require('../resource/resource.model');
const Event = require('../event/event.model');
const Course = require('../course/course.model');
const News = require('../news/news.model');

const file_controller = {
    /**
     * Sube un archivo al servidor.
     * @param {object} req - petición del cliente
     * @param {object} res - respuesta del servidor
     */
    async upload(req, res) {
        let form = new IncomingForm();
        /**
         * Representa al modelo en donde será guardado el archivo.
         * Valores permitidos:
         *      0: Información del semillero
         *      1: Eventos
         *      2: Curso
         *      3: Noticias
         *      4: Recursos
         *      5: Prestamos - Recursos
         *      6: Prestamos - Recibido
         */
        let model = req.query.m;
        /**
         * Identificador del modelo
         */
        let id = req.query.id;
        
        form.on('fileBegin', (name, file) => {
            // Se obtiene la extensión del archivo
            let ext = file.name.split('.').pop();
            // Se genera un token aleatorio
            let token = crypto.randomBytes(64).toString('hex');
            // Se actualiza la ruta
            file.path = `uploads/${token}.${ext}`;
        });
        
        form.on('file', async (field, file) => {
            // ¡El archivo ya fue guardado!
            let file_name = file.path.split('/')[1];
            switch (model) {
                case "1":
                    let event = await Event.findById({_id: id});
                    event.image_link = "http://localhost:3000/api/file/" + file_name;
                    await event.save();
                    break;
                case "2":
                    let course = await Course.findById({_id: id});
                    course.image_link = "http://localhost:3000/api/file/" + file_name;
                    await course.save();
                    break;
                case "3":
                    let news = await News.findById({_id: id});
                    news.image_link = "http://localhost:3000/api/file/" + file_name;
                    await news.save();
                    break;
                case "4":
                    let resource = await Resource.findById({_id: id});
                    resource.image_link = "http://localhost:3000/api/file/" + file_name;
                    await resource.save();
                    break;
            }
        })
        form.on('end', () => {
            res.status(200).send('OK!');
        })
        form.parse(req);
    },
    /**
     * Retorna un archivo.
     * @param {object} req - petición del cliente
     * @param {object} res - respuesta del servidor
     */
    async get(req, res) {
        let token = req.params.token;
        let format = req.query.fm;
        let path = `uploads/${token}`;

        if (fs.existsSync(path)) {
            res.writeHead(200, {
                "Content-Type": `image/${format}`,
                "Content-Disposition": "attachment; filename=" + token
              });
            fs.createReadStream(path).pipe(res);
        } else {
            res.status(404).send(ERRORS.FILE_NOT_FOUND);
        }
    }
}

module.exports = file_controller;