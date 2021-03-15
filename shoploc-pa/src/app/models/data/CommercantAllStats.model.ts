import { ItemHisto } from "./ItemHisto.model";

export class CommercantAllStats {
    constructor(
        public nbDeClients: number,
        public montantClicAndCollect: number,
        public pointsFideliteObtenus: number,
        public pointsFideliteDepenses: number,
        public histoVentes: ItemHisto[] 
    ){}
}