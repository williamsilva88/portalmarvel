import { ComicsResultCharacter, PersonagensFilter } from "../model/comics.model";

export class CarregarPersonagensMarvelApi {
    static type = '[Main] CarregarPersonagensMarvelApi';
    constructor(public dataFilterCharacter?: PersonagensFilter) { }
}

export class AddFavorite {
    static type = '[Main] AddFavorite';
    constructor(public character: ComicsResultCharacter) { }
}

export class RemoveFavorite {
    static type = '[Main] RemoveFavorite';
    constructor(public character: ComicsResultCharacter) { }
}

export class AddHate {
    static type = '[Main] AddHate';
    constructor(public character: ComicsResultCharacter) { }
}

export class RemoveHate {
    static type = '[Main] RemoveHate';
    constructor(public character: ComicsResultCharacter) { }
}

export class CarregarFavorite {
    static type = '[Main] CarregarFavorite';
    constructor() { }
}

export class CarregarHate {
    static type = '[Main] CarregarHate';
    constructor() { }
}