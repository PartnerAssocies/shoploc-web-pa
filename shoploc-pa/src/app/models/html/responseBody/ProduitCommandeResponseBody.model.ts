export class ProduitCommandeResponseBody {
    constructor(
        public pid : number,
        public libelle : string,
        public quantite : number,
        public image : string,
        public fidelitePointsRequis : number
    ){}
}
