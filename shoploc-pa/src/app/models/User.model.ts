/**
 * Objet pour représenter un utilisateur
 */
export class User {

    constructor(
        public username: string,
        public password: string,
        public role: string,
        public lieu: number,
        public nom: string,
        public prenom: string
    ) {}
}