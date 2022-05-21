import { StrapiImageModel } from "app/models/common.model";
import { StrapiSingleResponse } from "app/models/strapi-responses.model";

export class School {
    name: string;
    address: string;
    email: string;
    website: string;
    logo: StrapiSingleResponse<StrapiImageModel>;
    school_banner: StrapiImageModel;
}