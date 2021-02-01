import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommandeData } from '../models/data/CommandeData.model';
import { ContenuCommandeResponseBody } from '../models/http/responseBody/ContenuCommandeResponseBody.model';
import { CommandeResponseBody } from '../models/http/responseBody/CommandeResponseBody.model';

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
    getCommandesOfUser(username : string) : Observable<CommandeResponseBody[]> {
        const url = environment.shopLocApiURL
            .concat('/commande/findAllUserCommande/')
            .concat(username);
        return this.http.get<CommandeResponseBody[]>(url);    
    }

    /**
     * Initialise une commande entre un client et un commercant
     * @param usernameClient : string
     * @param usernameCommercant : string
     */
    createCommandeForUserAndCommercant(usernameClient : string, usernameCommercant : string) : Observable<CommandeResponseBody> {
        const url = environment.shopLocApiURL
            .concat('/commande/create/')
            .concat(usernameClient)
            .concat('/')
            .concat(usernameCommercant);
        return this.http.post<CommandeResponseBody>(url,null);    
    }

    /**
     * Ajoute un produit à une commande 
     * @param commandeId : number
     * @param productId : number
     * @param quantite : number
     */
    addProductToCommande(commandeId : number, productId : number, quantite : number) : Observable<CommandeResponseBody>{
        const url = environment.shopLocApiURL
            .concat('/commande/')
            .concat(commandeId.toString())
            .concat('/addProduct/')
            .concat(productId.toString())
            .concat('/')
            .concat(quantite.toString());
        return this.http.post<CommandeResponseBody>(url,null);
    }

    /**
     * Confirme une commande et passe son état à "EN ATTENTE DE PAIEMENT"
     * @param commandeId : number
     */
    confirmCommande(commandeId : number) : Observable<CommandeResponseBody>{
        const url = environment.shopLocApiURL
            .concat("/commande/confirmCommande/")
            .concat(commandeId.toString());
        return this.http.post<CommandeResponseBody>(url,null);
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
     * 
     * @param clientUsername : string
     * @param commandeId : number
     */
    payerCommande(clientUsername : string, commandeId : number) : Observable<CommandeResponseBody> {
        const url = environment.shopLocApiURL
            .concat("/commande/paiementCommande/")
            .concat(clientUsername)
            .concat("/")
            .concat(commandeId.toString());
        return this.http.post<CommandeResponseBody>(url,null);
    }

    /**
     * Récupère une commande par son id
     * @param commandeId : number
     */
    getCommande(commandeId : number) : Observable<CommandeResponseBody> {
        const url = environment.shopLocApiURL
            .concat("/commande/")
            .concat(commandeId.toString());
        return this.http.get<CommandeResponseBody>(url);
    }

    /**
     * Change l'état d'une commande pour passer vers "A_RECUPEREE"
     * @param commandeId 
     */
    passerCommandeAARecuperee(commandeId : number) : Observable<CommandeResponseBody> {
        const url = environment.shopLocApiURL
            .concat("/commande/aRecuperer/")
            .concat(commandeId.toString());
        return this.http.post<CommandeResponseBody>(url,null);
    }

    /**
     * Change l'état d'une commande pour passer vers "RECUPEREE"
     * @param commandeId 
     */
    passerCommandeARecuperee(commandeId : number) : Observable<CommandeResponseBody> {
        const url = environment.shopLocApiURL
            .concat("/commande/recupere/")
            .concat(commandeId.toString());
        return this.http.post<CommandeResponseBody>(url,null);
    }

    /**
     * Récupère la liste des commandes d'un commerçant en fonction de son etat
     * @param username : string
     * @param etat : string
     */
    getCommandeByEtatAndCommercant(username : string, etat : string) : Observable<CommandeResponseBody[]> {
        const url = environment.shopLocApiURL
            .concat("/commande/findCommandesByEtatAndCommercant/")
            .concat(username)
            .concat("/")
            .concat(etat);
        return this.http.get<CommandeResponseBody[]>(url);
    }
}