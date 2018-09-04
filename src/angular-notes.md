## 58 video Binding Custom Events!
##pass data down with @Input decorator
@Input() element: {type: string, name: string}
#or with alias
@Input('srvEl') element: {type: string, name: string}
but element is used in the child component
#use in parent
<app-server-el *ngFor="let serverElement of serverElements" [element]="serverElement"></app-server-el>
#or with alias
<app-server-el *ngFor="let serverElement of serverElements" [srvEl]="serverElement"></app-server-el>

##pass data up with @Output decorator
#in the parent component
<app-cockpit (serverCreated)="doSomeFunc($event)"></app-cockpit>
#or
<app-cockpit (aliasEvent)="doSomeFunc($event)"></app-cockpit>
doSomeFunc(serverData: {name: string, content: string})
#in the child component
#1 create new properties, custom new events
@Output() serverCreated = new EventEmitter<{name: string, content: string}>(); // don't forget paranthesis at the end
#or
@Output('aliasEvent') serverCreated = new EventEmitter<{name: string, content: string}>(); 
newServername = '';
newServercontent = '';
#2 make event in the html
<button (click)="doSmthInChildComp()"></button>
#3 add func
doSmthInChildComp() {
  this.serverCreated.emit({{ame: this.newServername, content: this.newServercontent});
}


## view encapsulation
#After styles is written:
encapsulation: ViewEncapsulation.
  - Emulated (default, encapsulated) 
  - None (no encapsulation, styles will apply globally, can affect other components) 
  - Native (almost as None, but only for browsers which are supported) 

  
## local reference
  is #reference in html tag
  use in event like   (click)="someFunc(referece)"


## @VeiwChild
do some #reference
in the component: @VeiwChild('reference') someVar: ElementRef;
the type will be ElementRef
to accsess: this.somevar.nativeElement.value;

## ng-content directive
to add some html between open and close tag of the component
if you don't want to pass content through property binding
# in the parent component:
<div>
  <child-comp>
    <p>some text</p>
    <h1>{{parentel.name}}</h1>
  </child-comp>
</div>

# in the child component:
<ng-content></ng-content>


## 67-68 videos lifecycle hooks

## @ContentChild
it's part of the content
do some p with some content inside with #contentreferrence
in the component: @ContentChild('contentreferrence') contentElem: ElementRef;
to accsess: this.contentElem.nativeElement.value;


## Directives
to Create a directive:
1. @Directive({
  selector: '[newDirective]'
})
export class NewDirective implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.elementRef.nativeElement.style.background = 'green';
  }
}
2. add directive to ngModule declarations
3. use:
<p newDirective></p>

#Another way to create directive
1. ng g d newDirective
2. should import Renderer2 and in:
constructor(private elRef: ElementRef, private renderer: Renderer2){}
3. accssess
this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue', false, false)
4. use the same


## @HostListener
@HostListener('mouseenter') mouseover(eventData: Event){
  this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue', false, false)
}
@HostListener('mouseleave') mouseleave(eventData: Event){
  this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent', false, false)
}


## @HostBinding
@HostBinding('style.backgroundColor') backgroundColor: string = transparent;
@HostListener('mouseenter') mouseover(eventData: Event){
  this.backgroundColor = 'blue';
}
@HostListener('mouseleave') mouseleave(eventData: Event){
  this.backgroundColor = 'transparent';
}


## property binding  to Directives
in Directive:
@Input() defaultColor: string = 'transparent';
@Input() highlightColor: string = 'blue';
@HostListener('mouseenter') mouseover(eventData: Event){
  this.backgroundColor = this.hightlightColor;
}
<p newDirective [defaultColor]="'yellow'"></p>


## Structural directives
# * converts to ng-template
export class UnlessDirective {
  @Input() set appUnless(condition: boolean) {
    if (!condition) {
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear();
    }
  }

  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) {}

}
# use
<div *appUnless>


## @ng-Switch
<div [ngSwitch]="value">
  <p *ngSwitchCase="5">Value is 5</p>
  <p *ngSwitchCase="3">Value is 3</p>
  <p *ngSwitchDefault="10">Value is default</p>
</div>


### Services!!!!!!
# use to access to data and shared methods
after creating an instance, inject into component
1. Add it in a constructor:
constructor(private someService: SomeService) {}
2. Inform Angular about Service and get an instance => need to provide the service:
- add to ngModule providers or appcomponent or some @Component providers and specify the type of service(but better to inject into module):
prorivers: [SomeService]
3. After all that now service is accessed:
this.someService.someFunc(args);
# Inject service into another service
1. Before service class add and import:
@Injectable()
2. Add a constructor to the class as in p.1
# emit and subscribe
create new EventEmmiter in service, emit in 1 component and subscribe in 2
# to generate service in some folder recipes with the same name
ng g s ./recipes/recipes


## Router
1. create var appRoutes = [{path: '', component: HomeComponent }] in ngModule;
2. import RouterModule.forRoot(appRoutes) - allows to register routes for main app
3. change template with directive:
<router-outlet></router-outlet> - replace components tags in app component template
4. add special directive instead of href to links:
routerLink="/"
or
[routerLink]="['/users']"
# handling active path
routerLinkActive="active"
[routerLinkActiveOption]="{exact: true}" do it at '/'
# navigation in some component
- import Router
- inject router in constructor
private router: Router
- in some function:
this.router.navigate(['/somepath']);
# relative paths only with navigate
- import Router and ActivatedRoute
- inject router in constructor and route
private router: Router, private route: ActivatedRoute
- in some function, configure the navigation:
this.router.navigate(['somepath'], {relativeTo: this.route});
before it went to /somepath
with relativeTo: it goes to previouspath/somepath
# parameters
'users/:id/:name'
- to get parameters from path in some component:
import ActivatedRoute,
// get user info from url path
ngOnInit() {
  this.user = {
    id: this.route.snapshot.params['id'];
    name: this.route.snapshot.params['name'];
  }
  //observable - feature which alows you to work with async tasks
  // this if you need to rewrite data of your page with new url params;
  // like this.router.navigate(['/users', 2, 'Ana']
  this.route.params
    .subscribe(
      (params: Params) => {
        this.user.id = params['id'];
        this.user.name = params['name'];
      }
    );
}
# observable
Angular cleans subscription whatever is component destroyed
in OnDestroy hook it's possible to unsubscribe
# query parameters and fragments
[queryParams]="{allowEdit: '1'}" //key value pair: ?allowEdit=1
fragment="loading" // another prop: #loading 
or use it in function:
this.router.navigate(['/servers', id, 'edit'], {queryParams: {allowEdit: '1'}, fragment: 'loading'});
# to access them
this.route.snapshot.queryParams
this.route.snapshot.fragment
# nested routes:
{ path: 'servers', component: SrvsComponent, children: [
  { path: ':id', component: SrvComponent }...
]}
to use children, they should be added with a help of <router-outlet> in parent template
# handling query params
queryParamsHandling: 'merge' or 'preserve' => override prev behaviour
# redirectTo
** this means every path which is not specified and we don't know, should be the last path
{ path: 'not-found', component: PageNotFoundComponent },
{ path: '**', redirectTo: '/not-found' }
# app.routing.module.ts
separate routing from ngModule
add imports:  RouterModule.forRoot(appRoutes)
after add exports: [RouterModule]
# Guards, protection
using CanActivate in service
implements CanActivate
anActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean { return promise }
# Child protection
canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  return this.canActivate(route, state);
}
# prevent the user of using some route
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactiveate();
  }
}
implement interface in component and use CanDeactivate method with terms
# pass static data with the data prop
, data: {message: 'Page not found!'}
# pass dynamic data
Resolver in service to fetch some data
export class ServerResolver implements Resolve<Server>
resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server
to router-module add resolve prop:
resolve: {server: ServerResolved}
it's another way to fetch data, earlier it was with onInit, now with resolver. OnInit:
this.route.data.subscribe(
  (data: Data) => {
    this.server = data['server'];
});
# location, rarely used
RouterModule.forRoot(appRoutes, {useHash: true})
# path match
pathMatch: 'full'...


### Observable
1. Create observable
2. Subscribe; has 3 args callbacks for handling:
- normal data
- errors
- completion
# unsubscribe if is needed
- store observable to prop
- in ngOnDestroy hook:
this.prop.unsubscribe();
# operators
after creating observable add some operators with pipe(), can be chain
Observable.interval(1000).pipe(map(project(data: type) => data*2 ))
// interval... can be imported from rxjs directly
# Subject
ingredientsChanged = new Subject<Ingredient[]>(); // replaced EventEmitter
this.ingredientsChanged.next([...this.ingredients]); // instead emit
need to unsubscribe manually


### Forms
import FormsModule into imports of ngModule
# 2 approaches
- Template-driven
- Reactive
## Template-driven approach
# ngModel with name
- name should be added to inputs
ngModel
name="username"
# submit and reference on form elements
- don't do it on button
- do it in form:
1. approach
<form (ngSubmit)="onSubmit(formReference)" #formReference="ngForm">
onSubmit(form: NgForm) { console.log(form);}
2. approach
<form (ngSubmit)="onSubmit()" #formReference="ngForm">
@ViewChild('formReference') signupForm: NgForm
onSubmit() { console.log(this.signupForm);}

# validation
- email directive, there are others as well
[disabled]="!formReference.valid"
- styles for invalid input or whatever:
input.ng-invalid.ng-touched
- warning message
add reference to input and add it to ngIf
<input type="email" ngModel #email="ngModel">
<span *ngIf="!email.valid && email.touched">Please enter a valid email!</span>
# default values
[ngModel]="1(prop on the component) or 2(string => some@email.com)"
# 2way data binding
[(ngModel)]="answer"
<p>{{ answer }}</p>
create prop in the comp: answer = '';

# ngModel
1. ngModel - no binding, to just tell that input is in control
2. [ngModel] - one way binding, to give that control a default value
3. [(ngModel)] - two way binding, to instantly output it or to do smth with that value
# ngModelGroup directive
after form tag in div, access to the form elements and also can be used for showing span with warnings... 
<div ngModelGroup="userData" #userData="ngModelGroup">
<span *ngIf="!userData.valid && userData.touched">Please enter a valid email!</span>

# radio buttons
[value]="fromngForVal"
# set value to some input after click on button
1. overrides whole form
- @ViewChild('formReference') signupForm: NgForm
- in method in the comp:
this.referenceForm.setValue({
  userData: {
    username: 'name',
    email: ''
  },
  gender: 'male'
});
2. overrides parts of the form
this.referenceForm.form.patchValue({
  userData: {
    username: 'newName'
  }
});
# submitted data
to access: this.referenceForm.value.userData.email...
# reset
this.referenceForm.reset() or this.referenceForm.setValue({with specific values})

## Reactive approach
import ReactiveFormsModule to ngModule
import FormGroup, FormControl to component
signupForm: FormGroup;
- initialise the form in the component in onInit
this.signupForm = mew FormGroup({
  'username': new FormControl(null),
  'email': new FormControl(null),
  'gender': new FormControl('male')
});
- add it to tepmplate to synchronize it
<form [formGroup]="signupForm">
- formControlName directive to add values to needed inputs
formControlName="username"

# submit, don't need ref
(ngSubmit)="onSubmit()"
onSubmit(){console.log(this.signupForm)}
# validation
required doesn't work
do it in the comp:
- import Validators,
- 'username': new FormControl(null, Validators.required)
- 'username': new FormControl(null, [Validators.required, Validators.email])
# warning message
<span *ngIf="!signupForm.get('username').valid && signupForm.get('username').touched">Please enter a valid email!</span>
<span *ngIf="!signupForm.valid && signupForm.touched">Please enter a valid data!</span>
# grouping formControls
- nesting
this.signupForm = mew FormGroup({
  'userData': new FormGroup({
    'username': new FormControl(null),
    'email': new FormControl(null)
  }),
  'gender': new FormControl('male')
});
- adding extra div to template
<div formGroupName="userData">
- update get() method:
signupForm.get('userData.username')...
// 186v