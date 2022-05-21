import { StrapiImageModel } from "app/models/common.model";
import { StrapiSingleResponse } from "app/models/strapi-responses.model";
import { AcademicSessionData } from "./settings/pages/academic-session/academic-session.model";
import { TermData } from "./settings/pages/academic-term/academic-term.model";

export class School {
    name: string;
    address: string;
    email: string;
    website: string;
    logo: StrapiSingleResponse<StrapiImageModel>;
    school_banner: StrapiImageModel;
    session: StrapiSingleResponse<AcademicSessionData>;
    term: StrapiSingleResponse<TermData>;
}