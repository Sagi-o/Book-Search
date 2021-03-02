export class Search {
    static type = '[Search] Search';
    constructor(public query: string, public startIndex = 0) {}
}

export class NextPage {
    static type = '[Search] Next Page';
}

export class PreviousPage {
    static type = '[Search] Previous Page';
}
