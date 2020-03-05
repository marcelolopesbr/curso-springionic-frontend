import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { StorageService } from '../services/storageservice';
import { AlertController } from 'ionic-angular';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor (public storage : StorageService, public alertCtr: AlertController) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
        .catch((error, caught) => {

            let errorObj = error;

            if (errorObj.error) {
                errorObj = errorObj.error;
            }

            if (!errorObj.status) {
                errorObj = JSON.parse(errorObj);
            }

            switch(errorObj.status) {
                case 403:
                    this.handle403();
                    break;
                case 401:
                    this.handle401();
                    break;
                default:
                    this.handleDefault(errorObj);
                    break;
            }


            console.log("Erro interceptado pelo ErrorInterceptor");
            console.log(errorObj);
            return Observable.throw(errorObj);
        }) as any;
    }

    handle403() {
        this.storage.setLocalUser(null);
    }

    handle401() {
        this.storage.setLocalUser(null);
        let alert = this.alertCtr.create({
            title: 'Erro 401',
            message: 'Usuário ou senha incorretos',
            enableBackdropDismiss : false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();
    }

    handleDefault(errorObj) {
        let alert = this.alertCtr.create({
            title: 'Erro' + errorObj.status + ' : ' + errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss : false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();
    }


}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};