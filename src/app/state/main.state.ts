'use strict';

import { Component, Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Action, NgxsOnInit, Selector, State, StateContext, StateToken } from "@ngxs/store";
import { tap } from "rxjs";
import { CharacterDataContainer, CharacterDataWrapper, ComicsResultCharacter, PersonagensFilter } from "../model/comics.model";
import { MarvelService } from "../service/marvel.service";
import { addFavoriteCharacter, addHateCharacter, getFavoriteCharacter, getHateCharacter, removeFavoriteCharacter, removeHateCharacter, setFavoriteCharacter, setHateCharacter } from "./character.local.storage";
import { AddFavorite, AddHate, CarregarFavorite, CarregarHate, CarregarPersonagensMarvelApi, RemoveFavorite, RemoveHate } from "./main.actions";


export interface MainStateModel {
    dataCharacter: CharacterDataContainer | null;
    dataFilterCharacter: PersonagensFilter | null;
    favorite: Array<ComicsResultCharacter>;
    hate: Array<ComicsResultCharacter>
}

export class MainStateModel implements MainStateModel {
    constructor(
        dataCharacter?: CharacterDataContainer,
        dataFilterCharacter?: PersonagensFilter
    ) {
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
    @Selector() static dataFilterCharacter(state: MainStateModel) { return state.dataFilterCharacter }
    @Selector() static favorite(state: MainStateModel) { return state.favorite }
    @Selector() static hate(state: MainStateModel) { return state.hate }

    constructor(
        private _marvelService: MarvelService,
        private _snackBar: MatSnackBar
    ) { }

    ngxsOnInit(ctx?: StateContext<MainStateModel>) { }

    @Action(CarregarPersonagensMarvelApi)
    carregarPersonagensMarvelApi(ctx: StateContext<MainStateModel>, action: CarregarPersonagensMarvelApi) {
        const state: MainStateModel = { ...ctx.getState() } as MainStateModel;
        state.dataFilterCharacter = action?.dataFilterCharacter ? action?.dataFilterCharacter : ctx.getState().dataFilterCharacter;
        state.favorite = this.carregarFavorite(ctx, action);
        state.hate = this.carregarHate(ctx, action);
        return this._marvelService.getDataComicsPersonagens(action?.dataFilterCharacter)
            .pipe(
                tap((result: CharacterDataWrapper) => {
                    const stateResult = result?.data ? result.data : ctx.getState().dataCharacter;
                    state.dataCharacter = this.filterDataHateAndFavorite(stateResult as any, state.hate, state.favorite);
                    ctx.setState(state);
                })
            );
    }

    private filterDataHateAndFavorite(data: CharacterDataContainer, hate: ComicsResultCharacter[], favorite: ComicsResultCharacter[]) {
        if (data && data?.results && (hate || favorite)) {
            const newData = JSON.parse(JSON.stringify(data));
            for (var i = newData?.results.length - 1; i >= 0; i--) {
                newData.results[i].favorite = false;

                const character = newData?.results[i];
                if (hate.filter(value => {
                    return value.name === character?.name ? true : false;
                }).length > 0) {
                    newData.results.splice(i, 1);
                }

                if (favorite.filter(value => {
                    return value.name === character?.name ? true : false;
                }).length > 0) {
                    newData.results[i].favorite = true;
                }
            }
            return newData;
        }
        return data;
    }

    @Action(CarregarFavorite)
    carregarFavorite(ctx: StateContext<MainStateModel>, action: CarregarFavorite) {
        const favorite = [...getFavoriteCharacter()];
        ctx.patchState({ favorite });
        return favorite;
    }

    @Action(CarregarHate)
    carregarHate(ctx: StateContext<MainStateModel>, action: CarregarHate) {
        const hate = [...getHateCharacter()];
        ctx.patchState({ hate });
        return hate;
    }

    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action);
      }

    @Action(AddFavorite)
    addFavorite(ctx: StateContext<MainStateModel>, action: AddFavorite) {
        const state: MainStateModel = { ...ctx.getState() } as MainStateModel;
        if (getFavoriteCharacter().length >= 5) {
            this.openSnackBar('Já atingiu o limite de 5 favoritos, exclua 1 para incluir este!', 'OK');
        } else {
            const charatcter = JSON.parse(JSON.stringify(action?.character));
            charatcter.favorite = true;
            state.favorite = [...addFavoriteCharacter(charatcter)];
            state.hate = [...removeHateCharacter(charatcter)];
            state.dataCharacter = JSON.parse(JSON.stringify(this.filterDataHateAndFavorite(state.dataCharacter as any, state.hate, state.favorite)));
            ctx.setState(state);
        }
    }

    @Action(RemoveFavorite)
    removeFavorite(ctx: StateContext<MainStateModel>, action: RemoveFavorite) {
        const state: MainStateModel = { ...ctx.getState() } as MainStateModel;
        state.favorite = [...removeFavoriteCharacter(action?.character)];
        state.dataCharacter = Object.assign(this.filterDataHateAndFavorite(state.dataCharacter as any, state.hate, state.favorite));
        ctx.setState(state);
    }


    @Action(AddHate)
    addHate(ctx: StateContext<MainStateModel>, action: AddHate) {
        const state: MainStateModel = { ...ctx.getState() } as MainStateModel;
        state.hate = [...addHateCharacter(action?.character)];
        state.favorite = [...removeFavoriteCharacter(action?.character)];
        state.dataCharacter = JSON.parse(JSON.stringify(this.filterDataHateAndFavorite(state.dataCharacter as any, state.hate, state.favorite)));
        ctx.setState(state);
    }

    @Action(RemoveHate)
    removeHate(ctx: StateContext<MainStateModel>, action: RemoveHate) {
        const state: MainStateModel = { ...ctx.getState() } as MainStateModel;
        state.hate = [...removeHateCharacter(action?.character)];
        state.dataCharacter = JSON.parse(JSON.stringify(this.filterDataHateAndFavorite(state.dataCharacter as any, state.hate, state.favorite)));
        ctx.setState(state);
    }

}