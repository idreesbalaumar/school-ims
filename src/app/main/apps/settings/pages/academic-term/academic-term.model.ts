import { AcademicSessionData } from "../academic-session/academic-session.model";

export class SessionTerm {
    data: SessionTermData;
}

export class SessionTermData {
    id: number;
    attributes: SessionTermAttributes;
}

export class SessionTermAttributes {
    start_date: Date;
    end_date: Date;
    is_completed: boolean;
    session: AcademicSessionData
    term: AcademicSessionData
}

export class SessionTermPostModel {
    SessionTermID: number;
    start_date: Date;
    end_date: Date;
    is_completed: boolean;
    session: AcademicSessionData = new AcademicSessionData();
    term: TermData = new TermData();
}

// Terms
export class Term {
    data: TermData;
}

export class TermData {
    id: number;
    attributes: TermAttributes;
}

export class TermAttributes {
    name: string;
    is_active: boolean;
    sort_code: number;
}

export class TermPostModel {
    TermID: number;
    name: string;
    is_active: boolean;
    sort_code: number;
}