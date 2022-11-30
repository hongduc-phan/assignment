export interface IAppState {
    appData: object,
    isErrorFetching: boolean,
    authorized: boolean
}

export interface IGameItem {
    imageURL: string,
    title: string
}

export interface IGameList {
    title: string,
    gameIDs: Array<string>,
    games: Array<any>,
    authorized: boolean,
    authorizedCategoryID: string
}

export interface ICategory {
    id: string,
    title: string
}
