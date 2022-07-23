import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Md5 } from 'ts-md5';
import { CharacterDataWrapper, PersonagensFilter } from '../model/comics.model';

interface MarvelKeys {
  ts?: string;
  publicKey?: string;
  hash?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MarvelService {

  constructor(
    private http: HttpClient
  ) { }

  private generateTsKey() {
    return Number(new Date());
  }

  private getPublicKey() {
    return environment?.marvel?.publicKey;
  }

  private getPrivateKey() {
    return environment?.marvel?.privateKey;
  }

  private generateHashKey(ts?: string) {
    const md5 = new Md5();
    return md5.appendStr(`${ts}${this.getPrivateKey()}${this.getPublicKey()}`).end();
  }

  private getKeys(): MarvelKeys {
    const keys: MarvelKeys = {
      ts: this.generateTsKey().toString(),
      publicKey: this.getPublicKey()
    };
    keys.hash = this.generateHashKey(keys?.ts).toString();
    return keys;
  }

  /**
   * Busca dados da marvel comics
   */
  public getDataComics(): Observable<CharacterDataWrapper> {
    const keys: MarvelKeys = this.getKeys();
    return this.http.get<CharacterDataWrapper>(`${environment?.marvel?.basePath}/comics?ts=${keys?.ts}&apikey=${keys?.publicKey}&hash=${keys?.hash}`);
  }

  /**
   * Busca dados da marvel comics
   */
  public getDataComicsPersonagens(filter?: PersonagensFilter): Observable<CharacterDataWrapper> {
    const keys: MarvelKeys = this.getKeys();
    const filters = filter?.generateFilters();
    return this.http.get<CharacterDataWrapper>(`${environment?.marvel?.basePath}/characters?ts=${keys?.ts}&apikey=${keys?.publicKey}&hash=${keys?.hash}${filters ? '&' + filters : ''}`);
  }

}
