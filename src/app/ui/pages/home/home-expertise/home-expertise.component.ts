import { ScrollDispatcher, ViewportRuler } from '@angular/cdk/scrolling';
import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { ReplaySubject, takeUntil, startWith, map, scan, distinctUntilChanged, takeWhile, switchMap, Observable } from 'rxjs';
import { TRANSITION_IMAGE_SCALE, TRANSITION_TEXT } from 'src/app/ui/animations/transitions/transitions.constants';
import { UiUtilsView } from 'src/app/ui/utils/views.utils';

@Component({
  selector: 'app-home-expertise',
  templateUrl: './home-expertise.component.html',
  styleUrls: ['./home-expertise.component.scss'],
  animations: [
    TRANSITION_TEXT,
    TRANSITION_IMAGE_SCALE
  ]
})
export class HomeExpertiseComponent implements OnInit {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  mOnceAnimated = false

  /* ********************************************************************************************
    *                anims
    */
  _mTriggerAnim?= 'false'

  _mTriggerImage?= 'false'


  _mThreshold = 0.2


  @ViewChild('animRefView') vAnimRefView?: ElementRef<HTMLElement>;

  constructor(public el: ElementRef,
    private _ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    public mediaObserver: MediaObserver,
    private scroll: ScrollDispatcher, private viewPortRuler: ViewportRuler) { }

  ngOnInit(): void {
  }



  ngAfterViewInit(): void {
    this.setupAnimation();
  }

  ngOnDestroy(): void {

    this.destroyed$.next(true)
    this.destroyed$.complete()
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

  _mTools = [

    // design
    {
      "id": "5131",
      "name": "Figma",
      "logo": "assets/img/tools/figma.svg",
      "link": "https://www.figma.com/",
      "tab": "design"
    },

    // android
    {
      "id": "9110",
      "name": "Android",
      "logo": "assets/img/tools/android.svg",
      "link": "https://developer.android.com/",
      "tab": "android",
      "color": "#3DDC84"
    },
    {
      "id": "9115",
      "name": "Architecture Components",
      "logo": "assets/img/tools/pic_architecture_components.png",
      "link": "https://developer.android.com/topic/architecture",
      "tab": "android"
    },
    {
      "id": "9116",
      "name": "Kotlin",
      "logo": "assets/img/tools/kotlin-logo.png",
      "link": "https://kotlinlang.org/",
      "tab": "android"
    },

    // cross
{
      "id": "4101",
      "name": "Flutter",
      "logo": "assets/img/tools/flutter_logo.svg",
      "link": "https://flutter.dev/",
      "tab": "Cross",
      "color": "#42A5F5"
    },

    {
      "id": "8103",
      "name": "WebComponents",
      "logo": "assets/img/tools/web-component-logo.png",
      "link": "https://www.webcomponents.org/",
      "tab": "web"
    },

    {
      "id": "8101",
      "name": "Angular",
      "logo": "assets/img/tools/angular.png",
      "link": "https://angular.io/",
      "tab": "web",
      "color": "#FF4369"
    },

    // backend

    {
      "id": "7121",
      "name": "Express",
      "logo": "assets/img/tools/express.png",
      "link": "https://expressjs.com/",
      "tab": "back-end"
    },
    {
      "id": "7164",
      "name": "Docker",
      "logo": "assets/img/tools/docker-logo.png",
      "link": "https://docker.com",
      "tab": "back-end"
    },
    {
      "id": "7122",
      "name": "Sequelize",
      "logo": "assets/img/tools/sequelize.png",
      "link": "http://docs.sequelizejs.com/",
      "tab": "back-end"
    },

    {
      "id": "7126",
      "name": "NodeJs",
      "logo": "assets/img/tools/nodejs.png",
      "link": "https://nodejs.org/en/",
      "tab": "back-end"
    },

    {
      "id": "7478",
      "name": "ASP.NET MVC",
      "logo": "assets/img/tools/aspnet-logo.png",
      "link": "https://dotnet.microsoft.com/pt-br/apps/aspnet",
      "tab": "back-end"
    },

    // cloud

    {
      "id": "6121",
      "name": "Firebase",
      "logo": "assets/img/tools/firebase.svg",
      "link": "https://firebase.google.com/",
      "tab": "cloud"
    },

    {
      "id": "6123",
      "name": "Azure",
      "logo": "assets/img/tools/azure.png",
      "link": "https://azure.microsoft.com",
      "tab": "cloud"
    },

    {
      "id": "6124",
      "name": "Google cloud",
      "logo": "assets/img/tools/google-cloud.png",
      "link": "https://cloud.google.com/",
      "tab": "cloud"
    },


  ]

}
