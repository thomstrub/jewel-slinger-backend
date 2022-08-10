export interface IUser {
    googleId?: string;
    twitterId?: string;
    githubId?: string;
    username: string;
}

export interface IMongoDBUser {
    googleId?: string;
    twitterId?: string;
    githubId?: string;
    username: string;
    _v: number;
    _id: string;
    items?: {
        name: String,
        price?: String,
        quantity?: Number,
        photo?: String,
        description?: String,
        size?: String
    }[]
}

export interface IItem {
    name: String,
    price?: String,
    quantity?: Number,
    photo?: String,
    description?: String,
    size?: String
}