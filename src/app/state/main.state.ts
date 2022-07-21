import { Injectable } from "@angular/core";
import { Action, NgxsOnInit, Selector, State, StateContext, StateToken } from "@ngxs/store";
import { tap } from "rxjs";
import { CharacterDataContainer, CharacterDataWrapper, ComicsResultCharacter, PersonagensFilter } from "../model/comics.model";
import { MarvelService } from "../service/marvel.service";
import { CarregarPersonagensMarvelApi } from "./main.actions";


export interface MainStateModel {
    dataCharacter: CharacterDataContainer | null;
    dataFilterCharacter: PersonagensFilter | null;
}

export class MainStateModel implements MainStateModel {
    constructor(dataCharacter?: CharacterDataContainer, dataFilterCharacter?: PersonagensFilter) {
        this.dataCharacter = dataCharacter ? dataCharacter : new CharacterDataContainer();
        this.dataFilterCharacter = dataFilterCharacter ? dataFilterCharacter : new PersonagensFilter();
    }
}

export const MAIN_STATE_DEFAULTS = new MainStateModel();
export const MAIN_STATE_TOKEN = new StateToken<MainStateModel>('Main');

@State({
    name: MAIN_STATE_TOKEN,
    defaults: MAIN_STATE_DEFAULTS
})
@Injectable()
export class MainState implements NgxsOnInit {

    @Selector() static dataCharacter(state: MainStateModel) { return state.dataCharacter }

    constructor(
        private _marvelService: MarvelService
    ) { }

    ngxsOnInit(ctx?: StateContext<MainStateModel>) { }

    @Action(CarregarPersonagensMarvelApi)
    carregarPersonagensMarvelApi(ctx: StateContext<MainStateModel>, action: CarregarPersonagensMarvelApi) {
        const state: MainStateModel = { ...ctx.getState() } as MainStateModel;
        state.dataFilterCharacter = action?.dataFilterCharacter ? action?.dataFilterCharacter : ctx.getState().dataFilterCharacter;
        return this._marvelService.getDataComicsPersonagens(action?.dataFilterCharacter)
            .pipe(
                tap((result: CharacterDataWrapper) => {
                    state.dataCharacter = result?.data ? result.data : ctx.getState().dataCharacter;

                    ctx.setState(state);
                })
            );
    }

}