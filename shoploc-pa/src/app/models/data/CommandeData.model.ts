import { CommercantData } from './CommercantData.model';
import { ClientData } from './ClientData.model';
import { ProduitData } from './ProduitData.model';

export class CommandeData {
    constructor(
        public cid : number,
        public etat : string,
        public date : Date,
        public total : number,
        public note : number,
        public estPayeEnFidelite : boolean,
        public creeParClickAndCollect : boolean,
        public commercant : CommercantData,
        public client : ClientData    
    ){}
}