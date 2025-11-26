import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class SwalAlertService {

    constructor() { }

    showConfirmationDialog(title: string, label: string = 'Esta seguro de realizar esta acción ?'): Promise<any> {
        return Swal.fire({
            icon: 'question',
            title: `<b>${title}</b>`,
            text: label,
            showCancelButton: true,
            confirmButtonColor: "#57bd8d",
            cancelButtonColor: "#eb2f06",
            confirmButtonText: "Si",
            cancelButtonText: "Cancelar",
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
                const popup = document.querySelector('.swal2-container') as HTMLElement;
                if (popup) {
                    popup.style.zIndex = '2000';
                }
            }
        });
    }
}
