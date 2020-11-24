import { Injectable } from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';

/**
 * Service pour gérer le hashage des mots de passe
 * le hashage est gérer avec MD5
 */
@Injectable({
    providedIn: 'root'
  })
  export class HashService {
  
    constructor() { }
  
    /**
     * Hash la chaîne de caractère passé en paramètre avec l'algorithme MD5 et retourne la chaîne hashé
     * @param String password 
     */
    hashPassword(password:string):string{
      const hashedString = new Md5().appendStr(password).end().toString();
      return hashedString.concat(hashedString.substring(0,5));
    }
}