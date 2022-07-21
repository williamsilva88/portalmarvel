import { PersonagensFilter } from "../model/comics.model";

export class CarregarPersonagensMarvelApi {
    static type = '[Main] CarregarPersonagensMarvelApi';
    constructor(public dataFilterCharacter?: PersonagensFilter) { }
}