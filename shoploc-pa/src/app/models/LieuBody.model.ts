/**
 * Objet pour représenter un lieu (envoyé au server)
 */
export class LieuBody {

    constructor(
        public adresse: string,
        public coordx: number,
        public coordy: number,
        public ville: string
    ) {}
}