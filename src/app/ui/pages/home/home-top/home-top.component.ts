import { ScrollDispatcher, ViewportRuler } from '@angular/cdk/scrolling';
import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { ActivatedRoute, Router } from '@angular/router';
import { ENTER_SCALE, TRANSITION_TEXT, TRANSITION_TEXT_ENTER } from 'src/app/ui/animations/transitions/transitions.constants';

@Component({
  selector: 'app-home-top',
  templateUrl: './home-top.component.html',
  styleUrls: ['./home-top.component.scss'],
  animations: [
    TRANSITION_TEXT,
    TRANSITION_TEXT_ENTER,
    ENTER_SCALE
  ]
})
export class HomeTopComponent implements OnInit {

  _mAnimTextEnded = false;
  currentLanguage: string = 'en'; // Idioma padrão
  welcomeMessage: string = '';
  passionText: string = '';
  detailsText: string = '';

  // Textos em inglês
  englishTexts = {
    welcomeMessage: "Hi, I'm José Rui",
    passionText: "Web and mobile developer",
    detailsText: `I'm a seasoned developer proficient in Web and mobile development. 
                  My expertise lies in crafting robust system architectures, ensuring the seamless integration 
                  of various components. While my primary focus is on backend development, I bring a comprehensive 
                  skill set that encompasses the entire software development lifecycle. My proficiency in building 
                  scalable and efficient systems reflects not only my technical prowess but also a deep understanding 
                  of architecture. Currently, I'm leveraging my skills to contribute to impactful projects and further 
                  enhance my expertise in backend technologies.`
  };

  // Textos em português
  portugueseTexts = {
    welcomeMessage: "Olá, eu sou José Rui",
    passionText: "Desenvolvedor web e mobile",
    detailsText: `Sou um desenvolvedor experiente, proficiente em desenvolvimento web e mobile. 
                  Minha especialidade está em criar arquiteturas de sistema robustas, garantindo a integração 
                  perfeita de vários componentes. Embora meu foco principal seja o desenvolvimento backend, 
                  possuo um conjunto de habilidades abrangente que abrange todo o ciclo de vida do desenvolvimento 
                  de software. Minha proficiência em construir sistemas escaláveis e eficientes reflete não apenas 
                  minha competência técnica, mas também um profundo entendimento de arquitetura. Atualmente, estou 
                  utilizando minhas habilidades para contribuir em projetos impactantes e aprimorar ainda mais minha 
                  experiência em tecnologias de backend.`
  };

  constructor(
    public el: ElementRef,
    private _ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    public mediaObserver: MediaObserver,
    private scroll: ScrollDispatcher,
    private viewPortRuler: ViewportRuler,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Pega o parâmetro de idioma da URL
    this.route.queryParams.subscribe(params => {
      this.currentLanguage = params['lang'] || 'en'; // Define o idioma padrão como inglês
      this.updateTexts();
    });
  }

  switchLanguage(language: string): void {
    this.currentLanguage = language;
    // Atualiza a URL com o novo parâmetro de idioma
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { lang: this.currentLanguage },
      queryParamsHandling: 'merge',
    });
    this.updateTexts();
  }

  updateTexts(): void {
    if (this.currentLanguage === 'pt') {
      this.welcomeMessage = this.portugueseTexts.welcomeMessage;
      this.passionText = this.portugueseTexts.passionText;
      this.detailsText = this.portugueseTexts.detailsText;
    } else {
      this.welcomeMessage = this.englishTexts.welcomeMessage;
      this.passionText = this.englishTexts.passionText;
      this.detailsText = this.englishTexts.detailsText;
    }
  }

  _onTextAnimationEnd($event: any): void {
    if ($event['toState'] === "in") {
      this._mAnimTextEnded = true;
    }
  }
}
