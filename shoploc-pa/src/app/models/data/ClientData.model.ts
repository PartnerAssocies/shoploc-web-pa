export class ClientData {
    constructor(
        public username : string,
        public password : string,
        public lieu : string,
        public role : string,
        public nom : string,
        public prenom : string,
        public argent : number,
        public estVfp : boolean,
        public pointsFidelites : number
    ){}
}