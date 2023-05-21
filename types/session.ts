export interface Session {
    user?: User;
    expires?: string;
    error?: string;
}

export interface User {
    name: string;
    email: string;
    image: string;
    accessToken: string;
    refreshToken: string;
    username: string;
}
