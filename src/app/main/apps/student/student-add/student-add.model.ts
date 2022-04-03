export class NewStudentApiModel {
    data: StudentData = new StudentData();
}

export class StudentData {
    first_name: string;
    surname: string;
    other_name: string;
    date_of_birth: Date;
    gender: RelationField = new RelationField();
    state: RelationField = new RelationField();
    lga: RelationField = new RelationField();
    photo: RelationField = new RelationField();
    class_room: RelationField = new RelationField();
    parent: RelationField = new RelationField();
    house: RelationField = new RelationField();
    subjects: RelationField[] = [];
}

export class RelationField {
    id: number;
}

// export function runSomething() {
//     const someObject = <SomeInterface>{};
//     someObject.data.first_name = "John";
//     someObject.data.last_name = "John";
//     someObject.data.date_of_birth = new Date();
//     someObject.data.gender.id = 4;

//     console.log(someObject);
// }
