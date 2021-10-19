import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LangService {

  //Contient les langues de l'utilisateur
  lang: any[] = [
  ];
  
  lang$ = new Subject<any[]>();

  constructor() { }

  getLangByName(name: string) {
    const lang = this.lang.find(
      (Object: any) => {
        return Object.lang === name;
      }
    );
    return lang;
  } //retourne un objet du tableau

  removeLang(name: string) {
    const id = this.lang.findIndex(
      (Object: any) => {
        return Object.lang === name;
      }
    );
    this.lang.splice(id, 1);
    this.emitLang();
  } //supprime une langue du tableau

  getLangIndex(name: string) {
    const lang = this.lang.findIndex(
      (Object: any) => {
        return Object.lang === name;
      }
    );
    return lang;
  } //permet d'obtenir l'index d'une langue dans le tableau de langue

  emitLang() {
    this.lang$.next(this.lang);
  } //permet d'implémenter la variable lang$

  addLang(lang: any) {
    this.lang.push(lang);
    this.emitLang();
  } //permet d'ajouter une langue

  setLang(old: string, lang: any) {
    let id = this.getLangIndex(old);
    this.lang[id] = lang;
    this.emitLang();
  } //permet de modifier une langue
}
