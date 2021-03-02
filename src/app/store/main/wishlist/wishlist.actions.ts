export class AddToWishlist {
    static type = '[Search] Add To Wishlist';
    constructor(public item: any) {}
}

export class RemoveFromWishlist {
    static type = '[Search] Remove From Wishlist';
    constructor(public item: any) {}
}
