// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  marvel: {
    privateKey: "b5ac8f9ded34c7923a4dd7dc68e20ef3da604ea9",
    publicKey: "87d635f6d5c70e5132faecd8193e37e6",
    basePath: "http://gateway.marvel.com/v1/public",
    storeFavorite: "comicsFavorite",
    storeHate: "comicsHate"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
