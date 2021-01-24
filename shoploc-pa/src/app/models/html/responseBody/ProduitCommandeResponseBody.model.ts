export class ProduitCommandeResponseBody {
    constructor(
        private pid : number,
        private libelle : string,
        private quantite : number,
        private image : string,
        private fidelitePointsRequis : number
    ){}
}
