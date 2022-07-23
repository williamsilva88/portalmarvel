export interface CharacterDataWrapper {
    code?: number | null;
    status?: string | null;
    copyright?: string | null;
    attributionText?: string | null;
    attributionHTML?: string | null;
    etag?: string | null;
    data?: CharacterDataContainer | null;
}

export class CharacterDataWrapper implements CharacterDataWrapper {
    constructor(
        code?: number | null,
        status?: string | null,
        copyright?: string | null,
        attributionText?: string | null,
        attributionHTML?: string | null,
        etag?: string | null,
        data?: CharacterDataContainer | null
    ) {
        this.code = code ? code : null;
        this.status = status ? status : null;
        this.copyright = copyright ? copyright : null;
        this.attributionText = attributionText ? attributionText : null;
        this.attributionHTML = attributionHTML ? attributionHTML : null;
        this.etag = etag ? etag : null;
        this.data = data ? data : new CharacterDataContainer();
    }
}

export interface CharacterDataContainer {
    offset: number | null;
    limit: number | null;
    total: number | null;
    count: number | null;
    results: Array<ComicsResultCharacter> | null
}

export class CharacterDataContainer implements CharacterDataContainer {
    constructor(
        offset?: number,
        limit?: number,
        total?: number,
        count?: number,
        results?: Array<ComicsResultCharacter>
    ) {
        this.offset = offset ? offset : null;
        this.limit = limit ? limit : null;
        this.total = total ? total : null;
        this.count = count ? count : null;
        this.results = results ? results : [];
    }
}

// export interface ComicsResult {
//     id?: number | null;
//     digitalId?: number | null;
//     title?: string | null;
//     issueNumber?: number | null;
//     variantDescription?: string | null;
//     description?: string | null;
//     modified?: string | null;
//     isbn?: string | null;
//     upc?: string | null;
//     diamondCode?: string | null;
//     ean?: string | null;
//     issn?: string | null;
//     format?: string | null;
//     pageCount?: number | null;
//     textObjects?: Array<any> | null;
//     resourceURI?: string | null;
//     urls?: Array<ComicsResultUrls> | null;
//     series?: ComicsResultSeries | null;
//     variants?: Array<ComicsResultVariants> | null;
//     collections?: Array<any> | null;
//     collectedIssues?: Array<any> | null;
//     dates?: Array<ComicsResultDates> | null;
//     prices?: Array<ComicsResultPrice> | null;
//     thumbnail?: ComicsResultThumbnail | null;
//     images?: Array<any> | null;
//     creators?: ComicsResultInfo | null;
//     characters?: ComicsResultInfo | null;
//     stories?: ComicsResultInfo | null;
//     events?: ComicsResultInfo | null;
// }

// export class ComicsResult implements ComicsResult {
//     constructor(
//         id?: number | null,
//         digitalId?: number | null,
//         title?: string | null,
//         issueNumber?: number | null,
//         variantDescription?: string | null,
//         description?: string | null,
//         modified?: string | null,
//         isbn?: string | null,
//         upc?: string | null,
//         diamondCode?: string | null,
//         ean?: string | null,
//         issn?: string | null,
//         format?: string | null,
//         pageCount?: number | null,
//         textObjects?: Array<any> | null,
//         resourceURI?: string | null,
//         urls?: Array<ComicsResultUrls> | null,
//         series?: ComicsResultSeries | null,
//         variants?: Array<ComicsResultVariants> | null,
//         collections?: Array<any> | null,
//         collectedIssues?: Array<any> | null,
//         dates?: Array<ComicsResultDates> | null,
//         prices?: Array<ComicsResultPrice> | null,
//         thumbnail?: ComicsResultThumbnail | null,
//         images?: Array<any> | null,
//         creators?: ComicsResultInfo | null,
//         characters?: ComicsResultInfo | null,
//         stories?: ComicsResultInfo | null,
//         events?: ComicsResultInfo | null
//     ) {
//         this.id = id ? id : null;
//         this.digitalId = digitalId ? digitalId : null;
//         this.title = title ? title : null;
//         this.issueNumber = issueNumber ? issueNumber : null;
//         this.variantDescription = variantDescription ? variantDescription : null;
//         this.description = description ? description : null;
//         this.modified = modified ? modified : null;
//         this.isbn = isbn ? isbn : null;
//         this.upc = upc ? upc : null;
//         this.diamondCode = diamondCode ? diamondCode : null;
//         this.ean = ean ? ean : null;
//         this.issn = issn ? issn : null;
//         this.format = format ? format : null;
//         this.pageCount = pageCount ? pageCount : null;
//         this.textObjects = textObjects ? textObjects : [];
//         this.resourceURI = resourceURI ? resourceURI : null;
//         this.urls = urls ? urls : [];
//         this.series = series ? series : new ComicsResultSeries;
//         this.variants = variants ? variants : [];
//         this.collections = collections ? collections : [];
//         this.collectedIssues = collectedIssues ? collectedIssues : [];
//         this.dates = dates ? dates : [];
//         this.prices = prices ? prices : [];
//         this.thumbnail = thumbnail ? thumbnail : new ComicsResultThumbnail();
//         this.images = images ? images : [];
//         this.creators = creators ? creators : new ComicsResultInfo();
//         this.characters = characters ? characters : new ComicsResultInfo();
//         this.stories = stories ? stories : new ComicsResultInfo();
//         this.events = events ? events : new ComicsResultInfo();
//     }
// }

export interface ComicsResultCharacter {
    id?: number | null;
    name?: string | null;
    description?: string | null;
    modified?: string | null;
    thumbnail?: ComicsResultThumbnail | null;
    resourceURI?: string | null;
    comics?: ComicsResultInfo | null;
    series?: ComicsResultInfo | null;
    stories?: ComicsResultInfo | null;
    events?: ComicsResultInfo | null;
    urls?: Array<ComicsResultUrls> | null;
    favorite?: boolean;
}

export class ComicsResultCharacter implements ComicsResultCharacter {
    constructor(
        id?: number | null,
        name?: string | null,
        description?: string | null,
        modified?: string | null,
        thumbnail?: ComicsResultThumbnail | null,
        resourceURI?: string | null,
        comics?: ComicsResultInfo | null,
        series?: ComicsResultInfo | null,
        stories?: ComicsResultInfo | null,
        events?: ComicsResultInfo | null,
        urls?: Array<ComicsResultUrls> | null,
        favorite?: boolean
    ) {
        this.id = id ? id : null;
        this.name = name ? name : null;
        this.description = description ? description : null;
        this.modified = modified ? modified : null;
        this.resourceURI = resourceURI ? resourceURI : null;
        this.comics = comics ? comics : new ComicsResultInfo();
        this.urls = urls ? urls : [];
        this.series = series ? series : new ComicsResultInfo();
        this.thumbnail = thumbnail ? thumbnail : new ComicsResultThumbnail();
        this.stories = stories ? stories : new ComicsResultInfo();
        this.events = events ? events : new ComicsResultInfo();
        this.favorite = favorite ? favorite : false;
    }
}

export interface ComicsResultUrls {
    type: string | null;
    url: string | null;
}

export class ComicsResultUrls implements ComicsResultUrls {
    constructor(type?: string, url?: string) {
        this.type = type ? type : null;
        this.url = url ? url : null;
    }
}

export interface ComicsResultVariants {
    resourceURI: string | null;
    name: string | null;
}

export class ComicsResultVariants implements ComicsResultVariants {
    constructor(resourceURI?: string, name?: string) {
        this.resourceURI = resourceURI ? resourceURI : null;
        this.name = name ? name : null;
    }
}

export interface ComicsResultDates {
    type: string | null;
    date: string | null;
}

export class ComicsResultDates implements ComicsResultDates {
    constructor(type?: string, date?: string) {
        this.type = type ? type : null;
        this.date = date ? date : null;
    }
}

export interface ComicsResultPrice {
    type: string | null;
    price: number | null;
}

export class ComicsResultPrice implements ComicsResultPrice {
    constructor(type?: string, price?: number) {
        this.type = type ? type : null;
        this.price = price ? price : null;
    }
}

export interface ComicsResultThumbnail {
    path: string | null;
    extension: string | null;
}

export class ComicsResultThumbnail implements ComicsResultThumbnail {
    constructor(path?: string, extension?: string) {
        this.path = path ? path : null;
        this.extension = extension ? extension : null;
    }
}

export interface ComicsResultInfo {
    available: number | null;
    collectionURI: string | null;
    items: Array<ComicsResultCreatorsItems> | null;
    returned: number | null;
}

export class ComicsResultInfo implements ComicsResultInfo {
    constructor(available?: number, collectionURI?: string, items?: Array<ComicsResultCreatorsItems>, returned?: number) {
        this.available = available ? available : null;
        this.collectionURI = collectionURI ? collectionURI : null;
        this.items = items ? items : [];
        this.returned = returned ? returned : null;
    }
}

export interface ComicsResultCreatorsItems {
    resourceURI: string | null;
    name: string | null;
    role: string | null;
    type: string | null;
}

export class ComicsResultCreatorsItems implements ComicsResultCreatorsItems {
    constructor(resourceURI?: string, name?: string, role?: string, type?: string) {
        this.resourceURI = resourceURI ? resourceURI : null;
        this.name = name ? name : null;
        this.role = role ? role : null;
        this.type = type ? type : null;
    }
}

export interface PersonagensFilter {
    /** Return only characters matching the specified full character name (e.g. Spider-Man). */
    name?: string | null;
    /** Return characters with names that begin with the specified string (e.g. Sp). */
    nameStartsWith?: string | null;
    /** Return only characters which have been modified since the specified date. */
    modifiedSince?: Date | null;
    /** Return only characters which appear in the specified comics (accepts a comma-separated list of ids). */
    comics?: number | null;
    /** Return only characters which appear the specified series (accepts a comma-separated list of ids). */
    series?: number | null;
    /** Return only characters which appear in the specified events (accepts a comma-separated list of ids). */
    events?: number | null;
    /** Return only characters which appear the specified stories (accepts a comma-separated list of ids). */
    stories?: number | null;
    /** 
     * Order the result set by a field or fields. Add a "-" to the value sort in descending order. 
     * Multiple values are given priority in the order in which they are passed. 
     * Example asc: name, modified, Example desc: -name, -modified
     **/
    orderBy?: string | null;
    /** Limit the result set to the specified number of resources. */
    limit?: number | null;
    /** Skip the specified number of resources in the result set. */
    offset?: number | null;
}

export class PersonagensFilter implements PersonagensFilter {
    constructor(
        name?: string,
        nameStartsWith?: string,
        modifiedSince?: Date,
        comics?: number,
        series?: number,
        events?: number,
        stories?: number,
        orderBy?: string,
        limit?: number,
        offset?: number
    ) {
        this.name = name ? name : null;
        this.nameStartsWith = nameStartsWith ? nameStartsWith : null;
        this.modifiedSince = modifiedSince ? modifiedSince : null;
        this.comics = comics ? comics : null;
        this.series = series ? series : null;
        this.events = events ? events : null;
        this.stories = stories ? stories : null;
        this.orderBy = orderBy ? orderBy : null;
        this.limit = limit ? limit : null;
        this.offset = offset ? offset : null;
    }

    generateFilters() {
        let params = '';
        try {
            const keys: string[] = Object.keys(new PersonagensFilter());
            keys.forEach(key => {
                const value = ({ ...this } as any)[key];
                if (value) {
                    params = params ? params + '&' + key + '=' + value : key + '=' + value;
                }

            });
        } catch (error: any) { }
        return params ? params : '';
    }
}