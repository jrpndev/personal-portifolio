import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef, NgZone } from '@angular/core';
import { ScrollDispatcher, ViewportRuler } from '@angular/cdk/scrolling';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { FormBuilder } from '@angular/forms';
import { ReplaySubject, Observable, startWith, map, scan, distinctUntilChanged, takeUntil, takeWhile, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TRANSITION_TEXT, TRANSITION_IMAGE_SCALE } from 'src/app/ui/animations/transitions/transitions.constants';
import { UiUtilsView } from 'src/app/ui/utils/views.utils';

@Component({
  selector: 'app-client-apps',
  templateUrl: './client-apps.component.html',
  styleUrls: ['./client-apps.component.scss'],
  animations: [
    TRANSITION_TEXT,
    TRANSITION_IMAGE_SCALE
  ]
})
export class ClientAppsComponent implements OnInit, OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  mOnceAnimated = false;
  _mTriggerAnim?= 'false';
  _mThreshold = 0.4;
  translations: any;
  language: string = 'en';

  @ViewChild('animRefView') vAnimRefView?: ElementRef<HTMLElement>;

  _mClientApps = [
    {
      "id": "5131",
      "name": "iBook App",
      "image": "assets/img/clients/ibook-app-icon.png",
      "link": "https://play.google.com/store/apps/details?id=com.application.ibook",
      "tab": "Android",
      "color": "#FFFFFF"
    },
    {
      "id": "5132",
      "name": "iBook Website",
      "image": "assets/img/clients/ibook-page.png",
      "link": "https://ibook-orcin.vercel.app/login",
      "tab": "Angular",
      "color": "#FFFFFF"
    },
    {
      "id": "5132",
      "name": "Sneakers Store",
      "image": "assets/img/clients/product-next-app.png",
      "link": "https://github.com/jrpndev/product-listing",
      "tab": "Next",
      "color": "#FFFFFF"
    }
  ];

  constructor(
    public el: ElementRef,
    private _ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    public mediaObserver: MediaObserver,
    private scroll: ScrollDispatcher,
    private viewPortRuler: ViewportRuler,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    // Load translations based on language
    this.loadTranslations();
  }

  ngOnInit(): void {
    // Subscribe to route parameters to get the language
    this.route.queryParams.subscribe(params => {
      this.language = params['lang'] || 'en'; // Define o idioma padrão como inglês
    });
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
        recentClientAppsTitle: 'Recent Client Apps.',
        linkText: 'thedroid.io'
      },
      pt: {
        recentClientAppsTitle: 'Aplicativos Recentes dos Clientes.',
        linkText: 'thedroid.io'
      }
    };
  }
}
