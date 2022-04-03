import { Teacher } from "app/main/apps/teacher/teacher.model";

// classroom
export class ClassRoom {
    data: ClassRoomData;
}

export class ClassRoomData {
    id: number;
    attributes: ClassRoomAttributes;
}

export class ClassRoomAttributes {
    name: string;
    form_master: Teacher;
    class: Class;
}

export class ClassRoomPostModel {
    ClassRoomID: number;
    name: string;
    class: ClassData = new ClassData();
    form_master: ClassRoomData = new ClassRoomData();
}

// class
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

export class ClassPostModel {
    ClassID: number;
    name: string;
}