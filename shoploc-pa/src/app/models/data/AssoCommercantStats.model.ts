import { CommercantStats } from "./CommercantStats.model";

export class AssoCommercantStats {
    constructor(
        public nbClientCarteDeFidelite: number,
        public clientValues: CommercantStats[],
        public nbClientsVfp: number
    ){}
}