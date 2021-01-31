import { ProduitCommandeResponseBody } from "./ProduitCommandeResponseBody.model";

export class ContenuCommandeResponseBody {
    constructor(
        public produits : ProduitCommandeResponseBody[],
        public cid : number    
    ){}
}
