import { Teacher } from "app/main/apps/teacher/teacher.model";

export class House {
    data: HouseData;
}

export class HouseData {
    id: number;
    attributes: HouseAttributes;
}

export class HouseAttributes {
    name: string;
    house_master: Teacher;
    color: string;
}

export class HousePostModel {
    HouseID: number;
    name: string;
    house_master: HouseData = new HouseData();
    color: string;
}