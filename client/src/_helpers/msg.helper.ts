import Swal from 'sweetalert2';

export class MsgHelper {
    
    private toast;

    constructor() {
        this.toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
        }); 
    }

    /**
     * Muestra un mensaje de exito al usuario.
     * 
     * @param msg mensaje de exito a ser mostrado.
     */
    public showSuccess(msg: string): void {
        this.toast.fire({
            type: 'success',
            title: msg
        });
    }

    /**
     * Muestra un error al usuario.
     * 
     * @param err error a ser mostrado.
     */
    public showError(err: string): void{
        this.toast.fire({
            type: 'error',
            title: err
        });
    }
}