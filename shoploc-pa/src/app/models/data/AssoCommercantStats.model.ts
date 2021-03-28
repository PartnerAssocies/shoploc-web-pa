
interface AssoCommerceItem {
    magasin?: string,
    montant?: string
  }

export class AssoCommercantStats {
    constructor(
        public nbClientCarteDeFidelite: number,
        public clientValues: AssoCommerceItem[],
        public nbClientsVfp: number
    ){}
}