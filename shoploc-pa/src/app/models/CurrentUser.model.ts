/**
 * Objet pour représenter l'utilisateur connecté
 */
export class CurrentUser {

    constructor(
        public accessToken: string,
        public refreshToken: string,
        public username:string,
        public role:string
    ) {}
}