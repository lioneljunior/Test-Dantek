import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LangService } from './services/lang.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'test';

  langForm: FormGroup;

  //Langues
  Lang = [
    'fr', 'en', 'all', 'esp'
  ];

  //Niveaux
  Level = [
    '1', '2', '3', '4', '5'
  ];

  langSubscription: Subscription;
  //Liste des langues choisit a afficher
  LangList: any[];
  //Langue dont on veut avoir les details
  selectedLang: any = {};

  error: string;
  //Etat de la modal
  modalState: boolean = false; 
  //langue courante
  currentLang: string; 

  //Appel des differents services et ressources
  constructor(private fb: FormBuilder, 
              private langService: LangService, 
              private translate: TranslateService ) { 
    translate.setDefaultLang(this.translate.getBrowserLang()); //la langue par défaut est celle du naviguateur
    this.currentLang = this.translate.getBrowserLang();
  }

  ngOnInit() {

    //création du formulaire
    this.langForm = this.fb.group({
      lang: ['', Validators.required],
      writeLevel: ['', Validators.required],
      speakLevel: ['', Validators.required],
      understand: ['', Validators.required],
    });

    //souscription au service
    this.langSubscription = this.langService.lang$.subscribe(
      (lang: any[]) => {
        this.LangList = lang;
      }
    );
    this.langService.emitLang();

  }

  //change la langue de la page
  useLanguage(language: string): void {
    this.translate.use(language);
    this.currentLang = this.translate.currentLang;
  } 

  //obtenir les details sur une langue
  getLang(lang: string) {
    this.selectedLang = this.langService.getLangByName(lang);
    this.langForm.setValue(this.selectedLang);
    this.changeState();
  }

  //supprimer une langue
  deleteLang(lang: string) {
    this.langService.removeLang(lang);
  }

  //change l'état de la modal
  changeState() {
    this.modalState = !this.modalState;
    this.error = '';
  }

  //Modifie une langue
  update() {
    if(this.langForm.valid) {
      let lang = this.langForm.value; //Recuperation des infos du formulaire
      this.changeState();
      this.langService.getLangByName(lang.lang) === undefined || lang.lang === this.selectedLang.lang ? this.langService.setLang(this.selectedLang.lang, lang) : this.error = 'erreur';
    } else {
      this.error = "nonValide";
    }
  }

  //Enregistre une langue
  save() {
    if(this.langForm.valid) {
      let lang = this.langForm.value; //recupere les infos du formulaire
      this.error = "";
      this.langService.getLangByName(lang.lang) === undefined ? this.langService.addLang(this.langForm.value) : this.error = 'erreur';
    } else {
      this.error = "nonValide";
    }
  }
  
}
