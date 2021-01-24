import { ProduitCommandeResponseBody } from "./ProduitCommandeResponseBody.model";

export class ContenuCommandeResponseBody {
    constructor(
        private produits : ProduitCommandeResponseBody[],
        private cid : number    
    ){}
}
