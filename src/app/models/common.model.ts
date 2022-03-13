import { User } from "./auth.model";
import { StrapiSingleResponse } from "./strapi-responses.model";

export interface StrapiImageModel {
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    url: string;
}

export interface Avatar {
    avatar: StrapiSingleResponse<StrapiImageModel>;
    user: StrapiSingleResponse<User>;
    // user: any;
}