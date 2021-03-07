import { ItemHisto } from "./ItemHisto.model";

export class ClientStats {
    constructor(
        public soldeFidelite: number,
        public totalFidelite: number,
        public jourVfpRestant: number,
        public histoAchats: ItemHisto[],
        public histoClickAndCollect: ItemHisto[]
    ){}
}