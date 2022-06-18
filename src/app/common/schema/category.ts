export interface Category {
    _id: string;
    name: string;
    slug: string;
    completePercentage: number | null;
    description: string;
    _createdAt: string;
}

export interface CategoryPostInterface {
    name: string;
    slug: string;
    description: string;
}
