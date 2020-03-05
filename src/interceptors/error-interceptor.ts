import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { StorageService } from '../services/storageservice';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor (public storage : StorageService) {

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

            console.log("ERROR!!!!");
            console.log(errorObj.status);


            switch(errorObj.status) {
                case 403:
                    this.handle403();
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
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};