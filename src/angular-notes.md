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
in the component: @VeiwChild('reference') someVar;
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

