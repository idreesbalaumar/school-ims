export class Subject {
    data: SubjectData;
}

export class SubjectData {
    id: number;
    attributes: SubjectAttributes;
}

export class SubjectAttributes {
    name: string;
}

export class SubjectPostModel {
    SubjectID: number;
    name: string;
}