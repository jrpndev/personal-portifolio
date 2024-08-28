import { ScrollDispatcher, ViewportRuler } from '@angular/cdk/scrolling';
import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { ActivatedRoute } from '@angular/router'; // Importar ActivatedRoute
import { takeUntil, startWith, map, scan, distinctUntilChanged, takeWhile, switchMap, Observable, ReplaySubject } from 'rxjs';
import { ENTER_SCALE, TRANSITION_AREA_SLIDE, TRANSITION_IMAGE_SCALE, TRANSITION_TEXT } from 'src/app/ui/animations/transitions/transitions.constants';
import { UiUtilsView } from 'src/app/ui/utils/views.utils';

@Component({
  selector: 'app-home-about',
  templateUrl: './home-about.component.html',
  styleUrls: ['./home-about.component.scss'],
  animations: [
    TRANSITION_TEXT,
    TRANSITION_AREA_SLIDE,
    TRANSITION_IMAGE_SCALE,
    ENTER_SCALE
  ]
})
export class HomeAboutComponent implements OnInit {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  mOnceAnimated = false;
  
  _mTriggerAnim?= 'false';
  _mTriggerImage?= 'false';
  _mThreshold = 0.2;
  
  @ViewChild('animRefView') vAnimRefView?: ElementRef<HTMLElement>;
  
  language: string = 'en'; // Idioma padrão
  translations: any; // Armazena as traduções

  constructor(
    public el: ElementRef,
    private _ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    public mediaObserver: MediaObserver,
    private scroll: ScrollDispatcher, 
    private viewPortRuler: ViewportRuler,
    private route: ActivatedRoute // Injeta o ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Inicializa as traduções
    this.route.queryParams.subscribe(params => {
      this.language = params['lang'] || 'en';
      this.setTranslations();
    });
  }

  setTranslations() {
    this.translations = {
      en: {
        aboutMe: "About Me.",
        paragraph1: "In 2020, I successfully completed a technical course in informatics at IFAM, where I actively participated in projects focusing on clean architecture, clean code, and Test-Driven Development (TDD). This experience sparked my interest in software development. Subsequently, I delved into the realm of Web Apps, Mobile Apps, and well-structured backend system development. Emphasizing the importance of design patterns and project design, I've been dedicated to crafting robust and efficient solutions ever since.",
        paragraph2: "My objective is to make development as easy as possible with simple and beautiful designs and organised code patterns.",
        yearsExperience: "Years of Experience",
        projectsCompleted: "Projects Completed",
        downloadCV: "Download CV.",
        link : "https://drive.google.com/file/d/1e0P1fYkvYwfxJYPPGErP_TBmGq9d-DZ4/view?usp=sharing",
      },
      pt: {
        aboutMe: "Sobre Mim.",
        paragraph1: "Em 2020, concluí com êxito um curso técnico em informática no IFAM, onde participei ativamente de projetos com foco em arquitetura limpa, código limpo e Desenvolvimento Orientado a Testes (TDD). Essa experiência despertou meu interesse pelo desenvolvimento de software. Posteriormente, mergulhei no desenvolvimento de Aplicativos Web, Aplicativos Móveis e sistemas backend bem estruturados. Enfatizando a importância dos padrões de design e do projeto de sistemas, tenho me dedicado a criar soluções robustas e eficientes desde então.",
        paragraph2: "Meu objetivo é tornar o desenvolvimento o mais fácil possível com designs simples e bonitos e padrões de código organizados.",
        yearsExperience: "Anos de Experiência",
        projectsCompleted: "Projetos Concluídos",
        downloadCV: "Baixar CV.",
        link : 'https://drive.google.com/file/d/1KWUHi6wpOsL7p7ANqGoHjpKTyHTovnu6/view?usp=sharing'
      }
    };
  }

  ngAfterViewInit(): void {
    this.setupAnimation();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  public setupAnimation() {
    if (!this.vAnimRefView) return;

    // console.info("home products setupAnimation: " )
    this.scroll.ancestorScrolled(this.vAnimRefView, 100).pipe(
      // Makes sure to dispose on destroy
      takeUntil(this.destroyed$),
      startWith(0),
      map(() => {
        if (this.vAnimRefView != null) {
          var visibility = UiUtilsView.getVisibility(this.vAnimRefView, this.viewPortRuler)
          // console.log("product app-item UiUtilsView visibility: ", visibility)
          return visibility;
        }
        return 0;

      }),
      scan<number, boolean>((acc: number | boolean, val: number) => (val >= this._mThreshold || (acc ? val > 0 : false))),
      // Distincts the resulting triggers 
      distinctUntilChanged(),
      // Stop taking the first on trigger when aosOnce is set
      takeWhile(trigger => {
        // console.info("app-item  !trigger || !this.mOnceAnimated",
        //   !trigger || !this.mOnceAnimated)

        return !trigger || !this.mOnceAnimated
      }, true),
      switchMap(trigger => new Observable<number | boolean>(observer => this._ngZone.run(() => observer.next(trigger))))
    ).subscribe(val => {


      // console.log("home-item setupAnimation ancestorScrolled: ", val)

      if (this.mOnceAnimated) {
        return;
      }

      if (val) {
        // console.log("HomeProductsComponent setupAnimation setupAnimation ancestorScrolled: ", val)

        this.mOnceAnimated = true
        this._mTriggerAnim = 'true'
        this.cdr.detectChanges()
      }
      // if (this.vImageArea != null) {
      //   var visibility = UiUtilsView.getVisibility(this.vImageArea, this.viewPortRuler)
      //   console.log("UiUtilsView visibility: ", visibility)
      // }
    }

    )
  }

}