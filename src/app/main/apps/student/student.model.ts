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
    lga: LGA;
    gender: Gender;
    class: Class;
    classCategory: ClassCategory;
    classRoom: ClassRoom;
    house: House;
    parent: Parent;
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
    data: LGAData;
}

export class LGAData {
    id: number;
    attributes: LGAAttributes;
}

export class LGAAttributes {
    name: string;
}

export class Gender {
    data: GenderData;
}

export class GenderData {
    id: number;
    attributes: GenderAttributes;
}

export class GenderAttributes {
    name: string;
}

export class Class {
    data: ClassData;
}

export class ClassData {
    id: number;
    attributes: ClassAttributes;
}

export class ClassAttributes {
    name: string;
}

export class ClassRoom {
    data: ClassRoomData;
}

export class ClassRoomData {
    id: number;
    attributes: ClassRoomAttributes;
}

export class ClassRoomAttributes {
    name: string;
}

export class ClassCategory {
    data: ClassCategoryData;
}

export class ClassCategoryData {
    id: number;
    attributes: ClassCategoryAttributes;
}

export class ClassCategoryAttributes {
    name: string;
}

export class House {
    data: HouseData;
}

export class HouseData {
    id: number;
    attributes: HouseAttributes;
}

export class HouseAttributes {
    name: string;
}

export class Parent {
    data: ParentData;
}

export class ParentData {
    id: number;
    attributes: ParentAttributes;
}

export class ParentAttributes {
    full_name: string;
}

