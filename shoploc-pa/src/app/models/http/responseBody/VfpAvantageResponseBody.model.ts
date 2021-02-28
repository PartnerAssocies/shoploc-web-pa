export class VfpAvantageResponseBody {
    constructor(
        public idAvantage: number,
        public libelle: string,
        public description: string,
        public username: string,
        public valeurContrainte: string
    ){}
}