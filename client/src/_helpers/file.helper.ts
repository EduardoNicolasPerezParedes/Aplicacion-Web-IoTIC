import { FileService } from 'src/_services/file.service';
import { Injectable } from '@angular/core';

@Injectable()
export class FileHelper {
    /**
     * Contiene el archivo a subir
     */
    private _file: File;

    constructor(private fileService: FileService) { this._file = null; }

    get file() { return this._file; }

    /**
     * Invocada al seleccionar un archivo.
     * @param element Contiene el archivo
     */
    public fileChange(element: any) {
        this._file = element.target.files[0];
    }

    /**
     * Sube un archivo
     * @param model Modelo al que pertenece el archivo
     * @param id Identificador del registro
     */
    public async upload(model: number, id: string) {
        let formData = new FormData();
        formData.append("uploads[]", this._file, this._file.name);
        let res = await this.fileService.upload(formData, model, id).toPromise();
    }
}