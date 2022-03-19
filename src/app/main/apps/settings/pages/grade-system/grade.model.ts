export class Grade {
    data: GradeData;
}

export class GradeData {
    id: number;
    attributes: GradeAttributes;
}

export class GradeAttributes {
    name: string;
    upper: string;
    lower: string;
}

export class GradePostModel {
    GradeID: number;
    name: string;
    upper: string;
    lower: string;
}