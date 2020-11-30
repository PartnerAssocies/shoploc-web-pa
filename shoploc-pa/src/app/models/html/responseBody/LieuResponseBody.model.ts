/**
 * Objet pour représenter un lieu (entité)
 */
export class LieuResponseBody {

    constructor(
        public lid: number,
        public adresse: string,
        public ville: string,
        public coordx: number,
        public coordy: number,
    ) {}
}