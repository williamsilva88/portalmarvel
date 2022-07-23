import { environment } from "src/environments/environment";
import { ComicsResultCharacter } from "../model/comics.model";

export function addFavoriteCharacter(character: ComicsResultCharacter) {
    let storeFavorite = getFavoriteCharacter();
    if (storeFavorite.filter(value => { value?.name === character?.name }).length === 0) {
        storeFavorite.push(character);
    }
    setFavoriteCharacter(storeFavorite);
    return storeFavorite;
}

export function removeFavoriteCharacter(character: ComicsResultCharacter) {
    let storeFavorite: Array<ComicsResultCharacter> = getFavoriteCharacter();
    for (let i = 0; i < storeFavorite.length; i++) {
        if (storeFavorite[i].name === character.name) {
            storeFavorite.splice(i, 1);
            break;
        }
    }
    setFavoriteCharacter(storeFavorite);
    return storeFavorite;
}

export function addHateCharacter(character: ComicsResultCharacter) {
    let storeHate = getHateCharacter();
    if (storeHate.filter(value => { value?.name === character?.name }).length === 0) {
        storeHate.push(character);
    }
    setHateCharacter(storeHate);
    return storeHate;
}

export function removeHateCharacter(character: ComicsResultCharacter) {
    let storeHate: Array<ComicsResultCharacter> = getHateCharacter();
    for (let i = 0; i < storeHate.length; i++) {
        if (storeHate[i].name === character.name) {
            storeHate.splice(i, 1);
            break;
        }
    }
    setHateCharacter(storeHate);
    return storeHate;
}

export function getFavoriteCharacter(): Array<ComicsResultCharacter> {
    let storeFavorite = localStorage.getItem(environment.marvel.storeFavorite);
    return storeFavorite ? JSON.parse(storeFavorite) : [];
}

export function setFavoriteCharacter(param: Array<ComicsResultCharacter> = []) {
    const character = JSON.parse(JSON.stringify(param));
    character.forEach((value:any)=>{
        value.favorite = true;
    });
    localStorage.setItem(environment.marvel.storeFavorite, JSON.stringify(character));
}

export function getHateCharacter(): Array<ComicsResultCharacter> {
    let storeHate = localStorage.getItem(environment.marvel.storeHate);
    return storeHate ? JSON.parse(storeHate) : [];
}

export function setHateCharacter(param: Array<ComicsResultCharacter> = []) {
    localStorage.setItem(environment.marvel.storeHate, JSON.stringify(param));
}