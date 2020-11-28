export class CommercantRequestBody {
    constructor(
        public username: string,
        public password: string,
        public libelleMagasin: string,
        public role: string,
        public lieuId: number,
        public siret: number,
        public description : string
    ){}
}