export class ProduitData { 
    constructor(
        public libelle : string,
        public prix : number,
        public stock : number,
        public fidelitePointsRequis : number,
        public image : string,
        public commercantId : string
    ){}
} 