import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  showSuccessToast(title: string) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: 2500
    });
  }

  showErrorToast(title: string) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'error',
      title: title,
      showConfirmButton: false,
      timer: 2500
    });
  }
}
