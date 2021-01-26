import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommandeData } from '../models/data/CommandeData.model';
import { ContenuCommandeResponseBody } from '../models/html/responseBody/ContenuCommandeResponseBody.model';

/**
 * Service pour gérer les commandes.
 */
@Injectable()
export class CommandeService {

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };

    constructor(private http: HttpClient){ }

    /**
     * Retourne un observable contenant les commandes de l'utilisateur dont le username est passé en paramètre
     * @param username : string 
     */
    getCommandesOfUser(username : string) : Observable<CommandeData[]> {
        const url = environment.shopLocApiURL
            .concat('/commande/findAllUserCommande/')
            .concat(username);
        return this.http.get<CommandeData[]>(url);    
    }

    /**
     * Initialise une commande entre un client et un commercant
     * @param usernameClient : string
     * @param usernameCommercant : string
     */
    createCommandeForUserAndCommercant(usernameClient : string, usernameCommercant : string) : Observable<CommandeData> {
        const url = environment.shopLocApiURL
            .concat('/commande/create/')
            .concat(usernameClient)
            .concat('/')
            .concat(usernameCommercant);
        return this.http.post<CommandeData>(url,null);    
    }

    /**
     * Ajoute un produit à une commande 
     * @param commandeId : number
     * @param productId : number
     * @param quantite : number
     */
    addProductToCommande(commandeId : number, productId : number, quantite : number) : Observable<CommandeData>{
        const url = environment.shopLocApiURL
            .concat('/commande/')
            .concat(commandeId.toString())
            .concat('/addProduct/')
            .concat(productId.toString())
            .concat('/')
            .concat(quantite.toString());
        return this.http.post<CommandeData>(url,null);
    }

    /**
     * Confirme une commande et passe son état à "EN ATTENTE DE PAIEMENT"
     * @param commandeId : number
     */
    confirmCommande(commandeId : number) : Observable<CommandeData>{
        const url = environment.shopLocApiURL
            .concat("/commande/confirmCommande/")
            .concat(commandeId.toString());
        return this.http.post<CommandeData>(url,null);
    }

    /**
     * Récupère le contenu d'une commande
     * @param commandeId : number
     */
    getCommandeContenu(commandeId : number) : Observable<ContenuCommandeResponseBody>{
        const url = environment.shopLocApiURL
            .concat("/commande/")
            .concat(commandeId.toString())
            .concat("/viewContentCommande");
        return this.http.get<ContenuCommandeResponseBody>(url);
    }

    /**
     * Récupère une commande via son id
     * @param commandeId : number
     */
    /*getCommande(commandeId : number) : Observable<CommandeData>{
        const url = environment.shopLocApiURL
            .concat("");
        return this.http.get<CommandeData>(url);
    }*/

}