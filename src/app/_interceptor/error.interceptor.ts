import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  //CTOR
  constructor(private _router: Router, private _toaster: ToastrService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          switch (error.status) {
            case 400:
              // this error related model state errors
              // the result => [['password field is requirde'] , ['the username is required']]
              if (error.error.errors) {
                const modelStateErrors = [];
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    modelStateErrors.push(error.error.errors[key]);
                  }
                }
                // Flat() =>Returns a new array with all sub-array elements concatenated
                throw modelStateErrors.flat();
                //else throw a general error message
              } else {
                this._toaster.error(error.error, error.status.toString());
              }
              break;
            case 401:
              this._toaster.error('Unautorized', error.status.toString());
              break;
            case 404:
              this._router.navigateByUrl('/not-found');
              break;
            case 500:
              //? NavigationExtras is an interface that allows you to specify additional options when navigating using the Router service. These options provide more control over the navigation behavior and can enhance user experience or data handling during navigation.
              const navigationExtras: NavigationExtras = {
                state: { error: error.error },
              };
              this._router.navigateByUrl('/server-error', navigationExtras);
              break;
            default:
              this._toaster.error('Something unexpected went wrong');
              console.log(error);
              break;
          }
        }
        throw error;
      })
    );
  }
}

//! Understanding Error Interceptors:
//------------------------------------

//? 1=> Interceptors are a powerful feature in Angular that allows you to intercept HTTP requests and responses before they reach their destinations.

//? 2=> Error interceptors specifically focus on handling errors that occur during HTTP communication.

//? 3=> By implementing an error interceptor, you can centralize error handling logic and provide a consistent user experience across your application.

//The ErrorInterceptor class implements the HttpInterceptor interface.

//The intercept method is the main entry point for the interceptor. It takes the request (HttpRequest) and a handler function (HttpHandler) as arguments.

// The next.handle(request) line forwards the request to the next handler in the chain (usually the HttpClient).

//!The pipe method applies the catchError operator.

//?The catchError operator intercepts any errors that occur during the request or response handling.
