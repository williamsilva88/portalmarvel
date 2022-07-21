import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngxs/store";
import { catchError, EMPTY } from "rxjs";
import { CarregarPersonagensMarvelApi } from "src/app/state/main.actions";

@Injectable({ providedIn: 'root' })
export class MainResolver implements Resolve<any>{

    constructor(private _store: Store) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this._store.dispatch(new CarregarPersonagensMarvelApi())
            .pipe(
                catchError((err: Error) => {
                    return EMPTY;
                })
            );
    }

}