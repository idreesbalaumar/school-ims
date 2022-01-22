import { User } from ".";

export interface AuthLoginResponse {
    accessToken: string;
    user: User;
}