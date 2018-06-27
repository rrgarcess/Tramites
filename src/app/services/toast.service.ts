import { Injectable } from '@angular/core';
import { ToastOptions, ToastyService, ToastyConfig } from 'ng2-toasty';

@Injectable()
export class ToastService {

    constructor(private toastyService:ToastyService,
        private toastyConfig: ToastyConfig) { }

    default(options: ToastOptions){

    }

    info(options: ToastOptions){
    }

    success(){
        let toastOptions: ToastOptions = {
            title: 'Usuario agregado',
            msg: `El usuario usuario fue agregado correctamente`,
            showClose: true,
            timeout: 5000,
            theme: 'bootstrap'
        };

        this.toastyService.success(toastOptions);
    }

    wait(options: ToastOptions){
    }

    error(options: ToastOptions){
    }

    warning(options: ToastOptions){
    }

}
