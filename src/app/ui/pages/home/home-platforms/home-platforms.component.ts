import { ScrollDispatcher, ViewportRuler } from '@angular/cdk/scrolling';
import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, startWith, map, scan, distinctUntilChanged, takeWhile, switchMap, Observable, ReplaySubject } from 'rxjs';
import { TRANSITION_TEXT } from 'src/app/ui/animations/transitions/transitions.constants';
import { UiUtilsView } from 'src/app/ui/utils/views.utils';

@Component({
  selector: 'app-home-platforms',
  templateUrl: './home-platforms.component.html',
  styleUrls: ['./home-platforms.component.scss'],
  animations: [
    TRANSITION_TEXT
  ]
})
export class HomePlatformsComponent implements OnInit {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  mOnceAnimated = false;

  /* ********************************************************************************************
    *                anims
    */
  _mTriggerAnim?= 'false';
  _mTriggerImage?= 'false';
  _mThreshold = 0.2;

  @ViewChild('animRefView') vAnimRefView?: ElementRef<HTMLElement>;

  translations: any = {};
  language: string = 'en';

  constructor(
    public el: ElementRef,
    private _ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    public mediaObserver: MediaObserver,
    private scroll: ScrollDispatcher,
    private viewPortRuler: ViewportRuler,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.language = params['lang'] || 'en'; // Define o idioma padrão como inglês
    });
    this.loadTranslations();
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

    this.scroll.ancestorScrolled(this.vAnimRefView, 100).pipe(
      takeUntil(this.destroyed$),
      startWith(0),
      map(() => {
        if (this.vAnimRefView != null) {
          var visibility = UiUtilsView.getVisibility(this.vAnimRefView, this.viewPortRuler);
          return visibility;
        }
        return 0;
      }),
      scan<number, boolean>((acc: number | boolean, val: number) => (val >= this._mThreshold || (acc ? val > 0 : false))),
      distinctUntilChanged(),
      takeWhile(trigger => !trigger || !this.mOnceAnimated, true),
      switchMap(trigger => new Observable<number | boolean>(observer => this._ngZone.run(() => observer.next(trigger))))
    ).subscribe(val => {
      if (this.mOnceAnimated) {
        return;
      }

      if (val) {
        this.mOnceAnimated = true;
        this._mTriggerAnim = 'true';
        this.cdr.detectChanges();
      }
    });
  }

  private loadTranslations() {
    this.translations = {
      en: {
        platformsTitle: 'My Platforms.',
        openSource: 'Open Source',
        azureDevopsTitle: 'Azure Devops',
        azureDevopsDetail: 'An Open Source Initiative to manage software projects and development tools.',
        exploreNow: 'Explore Now.',
        gitTitle: 'Git',
        gitDetail: 'GitHub is a code hosting platform for version control and collaboration. It lets you and others work together on projects from anywhere.'
      },
      pt: {
        platformsTitle: 'Minhas Plataformas.',
        openSource: 'Código Aberto',
        azureDevopsTitle: 'Azure Devops',
        azureDevopsDetail: 'Uma Iniciativa de Código Aberto para gerenciar projetos de software e ferramentas de desenvolvimento.',
        exploreNow: 'Explore Agora.',
        gitTitle: 'Git',
        gitDetail: 'GitHub é uma plataforma de hospedagem de código para controle de versão e colaboração. Permite que você e outros trabalhem juntos em projetos de qualquer lugar.'
      }
    };
  }
}
