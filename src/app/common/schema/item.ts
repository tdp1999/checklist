export interface Item {
    _id: string;
    name: string;
    slug: string;
    categoryID: string;
    categoryName: string;
    content: string;
    isDone: boolean;
    _createdAt?: string;
    _updatedAt?: string;
}

export interface ItemPostInterface {
    name: string;
    slug: string;
    categoryID: string;
    content: string;
    isDone: boolean;
}
