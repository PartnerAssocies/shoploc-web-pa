import { CommercantData } from "./CommercantData.model";
export class ProduitData { 
    constructor(
        public pid : number,
        public libelle: string,
        public prix: number,
        public stock: number,
        public fidelitePointsRequis: number,
        public image: string,
        public cid: CommercantData
    ){}
} 