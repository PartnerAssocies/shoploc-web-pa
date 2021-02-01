export class CommandeResponseBody {
    constructor(
        public cid : number,
        public date : Date,
        public total : number,
        public etat : string,
        public note : number,
        public estPayeEnFidelite : boolean,
        public creeParClickAndCollect : boolean,
        public client : string,
        public commercant : string,
        public totalPointsFidelite : number
    ){}
}