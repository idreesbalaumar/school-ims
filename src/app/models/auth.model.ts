import { Role } from "app/auth/models";

export class StrapiAuthLoginResponse {
    jwt: string;
    user: User;
}

export class User {
    id: number;
    email: string;
    username: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    role: Role = Role.User;
    accessToken: string;
    avatar: string = '';
    createdAt: Date;
    updatedAt: Date;
}