export class AcademicSession {
    data: AcademicSessionData;
}

export class AcademicSessionData {
    id: number;
    attributes: AcademicSessionAttributes;
}

export class AcademicSessionAttributes {
    name: string;
    from: Date;
    to: Date;
    is_active: boolean;
}

export class AcademicSessionPostModel {
    AcademicSessionID: number;
    name: string;
    from: Date;
    to: Date;
    is_active: boolean;
}

export class NewSessionPostModel {
    AcademicSessionID: number;
    name: string;
    from: Date;
    to: Date;
    is_active: boolean;
}