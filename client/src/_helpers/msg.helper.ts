import Swal from 'sweetalert2';

export class MsgHelper {
    
    private toast;

    private confirmDialog;

    constructor() {
        this.toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000
        }); 

        this.confirmDialog = Swal.mixin({
            customClass: {
                cancelButton: 'btn btn-light shadow-sm mr-5 rounded-pill',
                confirmButton: 'btn btn-danger shadow-sm rounded-pill',
                title: 'text-dark',
            },
            width: 300,
            buttonsStyling: false
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
    public showError(err: string): void {
        this.toast.fire({
            type: 'error',
            title: err
        });
    }

    public async showConfirmDialog(title: string, question: string) {
        return this.confirmDialog.fire({
            title: title,
            text: question,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        });
    }
}