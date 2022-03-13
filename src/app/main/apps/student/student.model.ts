// export class Student {
//     id: number;
//     first_name: string;
//     surname: string;
//     other_name: string;
//     createdAt: Date;
//     updatedAt: Date;
//     state_id: number;
//     state: State;
//     lga_id: number;
//     LGA: State;
//     photo_id: number;
//     photo: Photo;

import { Avatar } from "app/models/common.model";
import { StrapiSingleResponse } from "app/models/strapi-responses.model";
import { environment } from "environments/environment";
const APIPATH = environment.BASE_URL;

// }
export class Student {
    id: number;
    attributes: Attributes
}

export class Attributes {
    first_name: string;
    surname: string;
    other_name: string;
    state: State;
    photo: Photo;
}

export class Photo {
    data: PhotoData
}

export class PhotoData {
    id: number;
    attributes: PhotoAttributes;
}

export class PhotoAttributes {
    id: number;
    url: string;
}

export class State {
    data: StateData;
}

export class StateData {
    id: number;
    attributes: StateAttributes;
}

export class StateAttributes {
    name: string;
}

export class LGA {
    id: number;
    name: string;
}

