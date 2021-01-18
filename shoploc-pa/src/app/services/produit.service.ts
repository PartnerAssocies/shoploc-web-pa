import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ProduitData } from "../models/data/ProduitData.model";
import { AddStockProduitRequestBody } from "../models/html/requestBody/AddStockProduitRequestBody.model";
import { ProduitResponseBody } from "../models/html/responseBody/ProduitResponseBody.model";

@Injectable()
export class ProduitService {

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };

    constructor(private http: HttpClient){ }

    addProduit(produit: ProduitData): Observable<ProduitResponseBody> {
        return this.http.post<ProduitResponseBody>(environment.shopLocApiURL.concat("/produit/addProduit"), produit, this.httpOptions);
    }

    addStock(produit: AddStockProduitRequestBody): Observable<ProduitResponseBody> {
        return this.http.post<ProduitResponseBody>(environment.shopLocApiURL.concat("/produit/addStock"), produit, this.httpOptions);
    }

    getListProduits(cid: string): Observable<ProduitResponseBody[]>{
        const url = environment.shopLocApiURL
            .concat("/produit/listProduitsFromCommercant");
        let params = new HttpParams().append('cid',cid);
        console.log(params);
        return this.http.get<ProduitResponseBody[]>(url, {params: params});
    }

    deleteProduit(pid: number) {
        let httpOptionsProduit = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            body : pid
        };
        return this.http.delete(environment.shopLocApiURL.concat("/produit/deleteProduit"), httpOptionsProduit);
    }

}
