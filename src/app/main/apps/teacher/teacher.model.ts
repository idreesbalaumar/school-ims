export class Teacher {
    data: TeacherData;
}

export class TeacherData {
    id: number;
    attributes: TeacherAttributes;
}

export class TeacherAttributes {
    name: string;
}

export class TeacherPostModel {
    TeacherID: number;
    name: string;
}