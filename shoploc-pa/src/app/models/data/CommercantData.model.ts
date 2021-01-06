import { LieuData } from './LieuData.model';

export class CommercantData { 
    constructor(
        public username : string,
        public password : string,
        public role : string,
        public lieu : LieuData,
        public libelleMagasin : string,
        public image : string,
        public description : string,
        public siret: string
    ){}
} 