"use strict";(self.webpackChunkchecklist=self.webpackChunkchecklist||[]).push([[515],{9515:(N,x,r)=>{r.r(x),r.d(x,{ListModule:()=>Y});var u=r(6362),e=r(587),b=r(6352),l=r(4139),t=r(3184);let I=(()=>{class a{resolve(c,m){return(0,l.of)(c.params.item)}}return a.\u0275fac=function(c){return new(c||a)},a.\u0275prov=t.Yz7({token:a,factory:a.\u0275fac,providedIn:"root"}),a})();var f=r(2218),L=r(9095),E=r(5722),O=r(7418),R=r(2692),_=r(2201),D=r(7514),C=r(6909),T=r(2528),P=r(7240),v=r(1534),y=r(2466);const B=function(a){return{done:a}},Z=function(a){return["./",a]};function M(a,h){if(1&a){const c=t.EpF();t.TgZ(0,"div",5)(1,"mat-checkbox",6),t.NdJ("ngModelChange",function(p){const g=t.CHM(c).index;return t.oxw(3).itemCheckboxList[g].isDone=p})("ngModelChange",function(){const A=t.CHM(c).index,g=t.oxw(3);return g.onCheckboxChanges(g.itemCheckboxList[A])}),t.qZA(),t.TgZ(2,"a",7),t._uU(3),t.qZA()()}if(2&a){const c=h.$implicit,m=h.index,p=t.oxw(3);t.ekj("checked",c.isDone),t.xp6(1),t.Q6J("ngModel",p.itemCheckboxList[m].isDone),t.xp6(1),t.Q6J("ngClass",t.VKq(6,B,p.itemCheckboxList[m].isDone))("routerLink",t.VKq(8,Z,c.slug)),t.xp6(1),t.Oqu(c.name)}}function w(a,h){if(1&a&&(t.ynx(0),t.TgZ(1,"div",3),t.YNc(2,M,4,10,"div",4),t.qZA(),t.BQk()),2&a){const c=t.oxw().ngIf;t.xp6(2),t.Q6J("ngForOf",c)}}function o(a,h){if(1&a&&(t.ynx(0),t.YNc(1,w,3,1,"ng-container",0),t.BQk()),2&a){const c=h.ngIf;t.oxw();const m=t.MAs(5);t.xp6(1),t.Q6J("ngIf",c.length>0)("ngIfElse",m)}}function d(a,h){1&a&&(t.TgZ(0,"div"),t._uU(1,"error"),t.qZA())}function n(a,h){1&a&&t._UZ(0,"app-loading-spinner")}function i(a,h){if(1&a&&(t.YNc(0,d,2,0,"div",0),t.ALo(1,"async"),t.YNc(2,n,1,0,"ng-template",null,8,t.W1O)),2&a){const c=t.MAs(3),m=t.oxw();t.Q6J("ngIf",t.lcZ(1,2,m.loadingError$))("ngIfElse",c)}}function s(a,h){1&a&&t._uU(0," No data ")}const F=[{path:"",component:(()=>{class a{constructor(c,m,p,A,g,z,V){this._activatedRoute=c,this._apiPageListService=m,this._categoryService=p,this._itemService=A,this._router=g,this._snackbar=z,this._sidenavService=V,this.itemCheckboxList=[],this.loadingError$=new f.xQ}ngOnInit(){this.checkList$=this._activatedRoute.params.pipe((0,L.w)(c=>c.section?this._apiPageListService.getCategoryItemByCategorySlug(c.section).pipe((0,E.O)([]),(0,O.K)(m=>(console.error(m),this.loadingError$.next(!0),this._snackbar.open(m.message,"Dismiss",{duration:2e3}),this.onCategoryNotFound(),(0,l.of)([])))):(this.onCategoryNotFound(),(0,l.of)([]))),(0,R.b)(c=>{c||console.log("No item list"),this.itemCheckboxList=c.map(m=>({_id:m._id,isDone:m.isDone,categoryID:m.categoryID}))}))}ngOnDestroy(){}onCheckboxChanges(c){this._itemService.patchItem(c,c.categoryID).subscribe(()=>{this._sidenavService.remindToReloadCategory(),this._snackbar.open("Item updated","Dismiss",{duration:2e3})})}onCategoryNotFound(){this._categoryService.getCategoryListNoPagination().subscribe(c=>{this._router.navigate(["/checklist/",c[0].slug])})}}return a.\u0275fac=function(c){return new(c||a)(t.Y36(b.gz),t.Y36(_.i),t.Y36(D.o),t.Y36(C.F),t.Y36(b.F0),t.Y36(T.ux),t.Y36(P.Z))},a.\u0275cmp=t.Xpm({type:a,selectors:[["app-list"]],decls:6,vars:4,consts:[[4,"ngIf","ngIfElse"],["loadingOrError",""],["noData",""],[1,"divide-y"],["class","py-3 space-x-2 text-sky-500",3,"checked",4,"ngFor","ngForOf"],[1,"py-3","space-x-2","text-sky-500"],[3,"ngModel","ngModelChange"],[3,"ngClass","routerLink"],["loading",""]],template:function(c,m){if(1&c&&(t.YNc(0,o,2,2,"ng-container",0),t.ALo(1,"async"),t.YNc(2,i,4,4,"ng-template",null,1,t.W1O),t.YNc(4,s,1,0,"ng-template",null,2,t.W1O)),2&c){const p=t.MAs(3);t.Q6J("ngIf",t.lcZ(1,2,m.checkList$))("ngIfElse",p)}},directives:[u.O5,u.sg,v.oG,e.JJ,e.On,b.yS,u.mk,y.g],pipes:[u.Ov],styles:[".container[_ngcontent-%COMP%]{width:100%}@media (min-width: 640px){.container[_ngcontent-%COMP%]{max-width:640px}}@media (min-width: 768px){.container[_ngcontent-%COMP%]{max-width:768px}}@media (min-width: 1024px){.container[_ngcontent-%COMP%]{max-width:1024px}}@media (min-width: 1280px){.container[_ngcontent-%COMP%]{max-width:1280px}}@media (min-width: 1536px){.container[_ngcontent-%COMP%]{max-width:1536px}}a.done[_ngcontent-%COMP%]{-webkit-text-decoration-line:line-through;text-decoration-line:line-through}"],changeDetection:0}),a})()},{path:":item",loadChildren:()=>r.e(218).then(r.bind(r,9218)).then(a=>a.DetailModule),data:{breadcrumb:a=>a.item},resolve:{item:I}}];let S=(()=>{class a{}return a.\u0275fac=function(c){return new(c||a)},a.\u0275mod=t.oAB({type:a}),a.\u0275inj=t.cJS({imports:[[b.Bz.forChild(F)],b.Bz]}),a})();var U=r(3776);let Y=(()=>{class a{}return a.\u0275fac=function(c){return new(c||a)},a.\u0275mod=t.oAB({type:a}),a.\u0275inj=t.cJS({imports:[[u.ez,S,v.p9,e.UX,e.u5,U.z]]}),a})()},1534:(N,x,r)=>{r.d(x,{oG:()=>y,p9:()=>w});var u=r(6484),e=r(3184),b=r(587),l=r(1130),t=r(7481),I=r(4128),f=r(5837);const L=["input"],E=function(o){return{enterDuration:o}},O=["*"],R=new e.OlP("mat-checkbox-default-options",{providedIn:"root",factory:_});function _(){return{color:"accent",clickAction:"check-indeterminate"}}let D=0;const C=_(),T={provide:b.JU,useExisting:(0,e.Gpc)(()=>y),multi:!0};class P{}const v=(0,l.sb)((0,l.pj)((0,l.Kr)((0,l.Id)(class{constructor(o){this._elementRef=o}}))));let y=(()=>{class o extends v{constructor(n,i,s,k,F,S,U){super(n),this._changeDetectorRef=i,this._focusMonitor=s,this._ngZone=k,this._animationMode=S,this._options=U,this.ariaLabel="",this.ariaLabelledby=null,this._uniqueId="mat-checkbox-"+ ++D,this.id=this._uniqueId,this.labelPosition="after",this.name=null,this.change=new e.vpe,this.indeterminateChange=new e.vpe,this._onTouched=()=>{},this._currentAnimationClass="",this._currentCheckState=0,this._controlValueAccessorChangeFn=()=>{},this._checked=!1,this._disabled=!1,this._indeterminate=!1,this._options=this._options||C,this.color=this.defaultColor=this._options.color||C.color,this.tabIndex=parseInt(F)||0}get inputId(){return`${this.id||this._uniqueId}-input`}get required(){return this._required}set required(n){this._required=(0,u.Ig)(n)}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(n=>{n||Promise.resolve().then(()=>{this._onTouched(),this._changeDetectorRef.markForCheck()})}),this._syncIndeterminate(this._indeterminate)}ngAfterViewChecked(){}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}get checked(){return this._checked}set checked(n){n!=this.checked&&(this._checked=n,this._changeDetectorRef.markForCheck())}get disabled(){return this._disabled}set disabled(n){const i=(0,u.Ig)(n);i!==this.disabled&&(this._disabled=i,this._changeDetectorRef.markForCheck())}get indeterminate(){return this._indeterminate}set indeterminate(n){const i=n!=this._indeterminate;this._indeterminate=(0,u.Ig)(n),i&&(this._transitionCheckState(this._indeterminate?3:this.checked?1:2),this.indeterminateChange.emit(this._indeterminate)),this._syncIndeterminate(this._indeterminate)}_isRippleDisabled(){return this.disableRipple||this.disabled}_onLabelTextChange(){this._changeDetectorRef.detectChanges()}writeValue(n){this.checked=!!n}registerOnChange(n){this._controlValueAccessorChangeFn=n}registerOnTouched(n){this._onTouched=n}setDisabledState(n){this.disabled=n}_getAriaChecked(){return this.checked?"true":this.indeterminate?"mixed":"false"}_transitionCheckState(n){let i=this._currentCheckState,s=this._elementRef.nativeElement;if(i!==n&&(this._currentAnimationClass.length>0&&s.classList.remove(this._currentAnimationClass),this._currentAnimationClass=this._getAnimationClassForCheckStateTransition(i,n),this._currentCheckState=n,this._currentAnimationClass.length>0)){s.classList.add(this._currentAnimationClass);const k=this._currentAnimationClass;this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{s.classList.remove(k)},1e3)})}}_emitChangeEvent(){const n=new P;n.source=this,n.checked=this.checked,this._controlValueAccessorChangeFn(this.checked),this.change.emit(n),this._inputElement&&(this._inputElement.nativeElement.checked=this.checked)}toggle(){this.checked=!this.checked}_onInputClick(n){var i;const s=null===(i=this._options)||void 0===i?void 0:i.clickAction;n.stopPropagation(),this.disabled||"noop"===s?!this.disabled&&"noop"===s&&(this._inputElement.nativeElement.checked=this.checked,this._inputElement.nativeElement.indeterminate=this.indeterminate):(this.indeterminate&&"check"!==s&&Promise.resolve().then(()=>{this._indeterminate=!1,this.indeterminateChange.emit(this._indeterminate)}),this.toggle(),this._transitionCheckState(this._checked?1:2),this._emitChangeEvent())}focus(n,i){n?this._focusMonitor.focusVia(this._inputElement,n,i):this._inputElement.nativeElement.focus(i)}_onInteractionEvent(n){n.stopPropagation()}_getAnimationClassForCheckStateTransition(n,i){if("NoopAnimations"===this._animationMode)return"";let s="";switch(n){case 0:if(1===i)s="unchecked-checked";else{if(3!=i)return"";s="unchecked-indeterminate"}break;case 2:s=1===i?"unchecked-checked":"unchecked-indeterminate";break;case 1:s=2===i?"checked-unchecked":"checked-indeterminate";break;case 3:s=1===i?"indeterminate-checked":"indeterminate-unchecked"}return`mat-checkbox-anim-${s}`}_syncIndeterminate(n){const i=this._inputElement;i&&(i.nativeElement.indeterminate=n)}}return o.\u0275fac=function(n){return new(n||o)(e.Y36(e.SBq),e.Y36(e.sBO),e.Y36(I.tE),e.Y36(e.R0b),e.$8M("tabindex"),e.Y36(t.Qb,8),e.Y36(R,8))},o.\u0275cmp=e.Xpm({type:o,selectors:[["mat-checkbox"]],viewQuery:function(n,i){if(1&n&&(e.Gf(L,5),e.Gf(l.wG,5)),2&n){let s;e.iGM(s=e.CRH())&&(i._inputElement=s.first),e.iGM(s=e.CRH())&&(i.ripple=s.first)}},hostAttrs:[1,"mat-checkbox"],hostVars:14,hostBindings:function(n,i){2&n&&(e.Ikx("id",i.id),e.uIk("tabindex",null)("aria-label",null)("aria-labelledby",null),e.ekj("mat-checkbox-indeterminate",i.indeterminate)("mat-checkbox-checked",i.checked)("mat-checkbox-disabled",i.disabled)("mat-checkbox-label-before","before"==i.labelPosition)("_mat-animation-noopable","NoopAnimations"===i._animationMode))},inputs:{disableRipple:"disableRipple",color:"color",tabIndex:"tabIndex",ariaLabel:["aria-label","ariaLabel"],ariaLabelledby:["aria-labelledby","ariaLabelledby"],ariaDescribedby:["aria-describedby","ariaDescribedby"],id:"id",required:"required",labelPosition:"labelPosition",name:"name",value:"value",checked:"checked",disabled:"disabled",indeterminate:"indeterminate"},outputs:{change:"change",indeterminateChange:"indeterminateChange"},exportAs:["matCheckbox"],features:[e._Bn([T]),e.qOj],ngContentSelectors:O,decls:17,vars:21,consts:[[1,"mat-checkbox-layout"],["label",""],[1,"mat-checkbox-inner-container"],["type","checkbox",1,"mat-checkbox-input","cdk-visually-hidden",3,"id","required","checked","disabled","tabIndex","change","click"],["input",""],["matRipple","",1,"mat-checkbox-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled","matRippleRadius","matRippleCentered","matRippleAnimation"],[1,"mat-ripple-element","mat-checkbox-persistent-ripple"],[1,"mat-checkbox-frame"],[1,"mat-checkbox-background"],["version","1.1","focusable","false","viewBox","0 0 24 24",0,"xml","space","preserve","aria-hidden","true",1,"mat-checkbox-checkmark"],["fill","none","stroke","white","d","M4.1,12.7 9,17.6 20.3,6.3",1,"mat-checkbox-checkmark-path"],[1,"mat-checkbox-mixedmark"],[1,"mat-checkbox-label",3,"cdkObserveContent"],["checkboxLabel",""],[2,"display","none"]],template:function(n,i){if(1&n&&(e.F$t(),e.TgZ(0,"label",0,1)(2,"span",2)(3,"input",3,4),e.NdJ("change",function(k){return i._onInteractionEvent(k)})("click",function(k){return i._onInputClick(k)}),e.qZA(),e.TgZ(5,"span",5),e._UZ(6,"span",6),e.qZA(),e._UZ(7,"span",7),e.TgZ(8,"span",8),e.O4$(),e.TgZ(9,"svg",9),e._UZ(10,"path",10),e.qZA(),e.kcU(),e._UZ(11,"span",11),e.qZA()(),e.TgZ(12,"span",12,13),e.NdJ("cdkObserveContent",function(){return i._onLabelTextChange()}),e.TgZ(14,"span",14),e._uU(15,"\xa0"),e.qZA(),e.Hsn(16),e.qZA()()),2&n){const s=e.MAs(1),k=e.MAs(13);e.uIk("for",i.inputId),e.xp6(2),e.ekj("mat-checkbox-inner-container-no-side-margin",!k.textContent||!k.textContent.trim()),e.xp6(1),e.Q6J("id",i.inputId)("required",i.required)("checked",i.checked)("disabled",i.disabled)("tabIndex",i.tabIndex),e.uIk("value",i.value)("name",i.name)("aria-label",i.ariaLabel||null)("aria-labelledby",i.ariaLabelledby)("aria-checked",i._getAriaChecked())("aria-describedby",i.ariaDescribedby),e.xp6(2),e.Q6J("matRippleTrigger",s)("matRippleDisabled",i._isRippleDisabled())("matRippleRadius",20)("matRippleCentered",!0)("matRippleAnimation",e.VKq(19,E,"NoopAnimations"===i._animationMode?0:150))}},directives:[l.wG,f.wD],styles:["@keyframes mat-checkbox-fade-in-background{0%{opacity:0}50%{opacity:1}}@keyframes mat-checkbox-fade-out-background{0%,50%{opacity:1}100%{opacity:0}}@keyframes mat-checkbox-unchecked-checked-checkmark-path{0%,50%{stroke-dashoffset:22.910259}50%{animation-timing-function:cubic-bezier(0, 0, 0.2, 0.1)}100%{stroke-dashoffset:0}}@keyframes mat-checkbox-unchecked-indeterminate-mixedmark{0%,68.2%{transform:scaleX(0)}68.2%{animation-timing-function:cubic-bezier(0, 0, 0, 1)}100%{transform:scaleX(1)}}@keyframes mat-checkbox-checked-unchecked-checkmark-path{from{animation-timing-function:cubic-bezier(0.4, 0, 1, 1);stroke-dashoffset:0}to{stroke-dashoffset:-22.910259}}@keyframes mat-checkbox-checked-indeterminate-checkmark{from{animation-timing-function:cubic-bezier(0, 0, 0.2, 0.1);opacity:1;transform:rotate(0deg)}to{opacity:0;transform:rotate(45deg)}}@keyframes mat-checkbox-indeterminate-checked-checkmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);opacity:0;transform:rotate(45deg)}to{opacity:1;transform:rotate(360deg)}}@keyframes mat-checkbox-checked-indeterminate-mixedmark{from{animation-timing-function:cubic-bezier(0, 0, 0.2, 0.1);opacity:0;transform:rotate(-45deg)}to{opacity:1;transform:rotate(0deg)}}@keyframes mat-checkbox-indeterminate-checked-mixedmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);opacity:1;transform:rotate(0deg)}to{opacity:0;transform:rotate(315deg)}}@keyframes mat-checkbox-indeterminate-unchecked-mixedmark{0%{animation-timing-function:linear;opacity:1;transform:scaleX(1)}32.8%,100%{opacity:0;transform:scaleX(0)}}.mat-checkbox-background,.mat-checkbox-frame{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:2px;box-sizing:border-box;pointer-events:none}.mat-checkbox{display:inline-block;transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);cursor:pointer;-webkit-tap-highlight-color:transparent}._mat-animation-noopable.mat-checkbox{transition:none;animation:none}.mat-checkbox .mat-ripple-element:not(.mat-checkbox-persistent-ripple){opacity:.16}.mat-checkbox .mat-checkbox-ripple{position:absolute;left:calc(50% - 20px);top:calc(50% - 20px);height:40px;width:40px;z-index:1;pointer-events:none}.cdk-high-contrast-active .mat-checkbox.cdk-keyboard-focused .mat-checkbox-ripple{outline:solid 3px}.mat-checkbox-layout{-webkit-user-select:none;-moz-user-select:none;user-select:none;cursor:inherit;align-items:baseline;vertical-align:middle;display:inline-flex;white-space:nowrap}.mat-checkbox-label{-webkit-user-select:auto;-moz-user-select:auto;user-select:auto}.mat-checkbox-inner-container{display:inline-block;height:16px;line-height:0;margin:auto;margin-right:8px;order:0;position:relative;vertical-align:middle;white-space:nowrap;width:16px;flex-shrink:0}[dir=rtl] .mat-checkbox-inner-container{margin-left:8px;margin-right:auto}.mat-checkbox-inner-container-no-side-margin{margin-left:0;margin-right:0}.mat-checkbox-frame{background-color:transparent;transition:border-color 90ms cubic-bezier(0, 0, 0.2, 0.1);border-width:2px;border-style:solid}._mat-animation-noopable .mat-checkbox-frame{transition:none}.mat-checkbox-background{align-items:center;display:inline-flex;justify-content:center;transition:background-color 90ms cubic-bezier(0, 0, 0.2, 0.1),opacity 90ms cubic-bezier(0, 0, 0.2, 0.1);-webkit-print-color-adjust:exact;color-adjust:exact}._mat-animation-noopable .mat-checkbox-background{transition:none}.cdk-high-contrast-active .mat-checkbox .mat-checkbox-background{background:none}.mat-checkbox-persistent-ripple{display:block;width:100%;height:100%;transform:none}.mat-checkbox-inner-container:hover .mat-checkbox-persistent-ripple{opacity:.04}.mat-checkbox.cdk-keyboard-focused .mat-checkbox-persistent-ripple{opacity:.12}.mat-checkbox-persistent-ripple,.mat-checkbox.mat-checkbox-disabled .mat-checkbox-inner-container:hover .mat-checkbox-persistent-ripple{opacity:0}@media(hover: none){.mat-checkbox-inner-container:hover .mat-checkbox-persistent-ripple{display:none}}.mat-checkbox-checkmark{top:0;left:0;right:0;bottom:0;position:absolute;width:100%}.mat-checkbox-checkmark-path{stroke-dashoffset:22.910259;stroke-dasharray:22.910259;stroke-width:2.1333333333px}.cdk-high-contrast-black-on-white .mat-checkbox-checkmark-path{stroke:#000 !important}.mat-checkbox-mixedmark{width:calc(100% - 6px);height:2px;opacity:0;transform:scaleX(0) rotate(0deg);border-radius:2px}.cdk-high-contrast-active .mat-checkbox-mixedmark{height:0;border-top:solid 2px;margin-top:2px}.mat-checkbox-label-before .mat-checkbox-inner-container{order:1;margin-left:8px;margin-right:auto}[dir=rtl] .mat-checkbox-label-before .mat-checkbox-inner-container{margin-left:auto;margin-right:8px}.mat-checkbox-checked .mat-checkbox-checkmark{opacity:1}.mat-checkbox-checked .mat-checkbox-checkmark-path{stroke-dashoffset:0}.mat-checkbox-checked .mat-checkbox-mixedmark{transform:scaleX(1) rotate(-45deg)}.mat-checkbox-indeterminate .mat-checkbox-checkmark{opacity:0;transform:rotate(45deg)}.mat-checkbox-indeterminate .mat-checkbox-checkmark-path{stroke-dashoffset:0}.mat-checkbox-indeterminate .mat-checkbox-mixedmark{opacity:1;transform:scaleX(1) rotate(0deg)}.mat-checkbox-unchecked .mat-checkbox-background{background-color:transparent}.mat-checkbox-disabled{cursor:default}.cdk-high-contrast-active .mat-checkbox-disabled{opacity:.5}.mat-checkbox-anim-unchecked-checked .mat-checkbox-background{animation:180ms linear 0ms mat-checkbox-fade-in-background}.mat-checkbox-anim-unchecked-checked .mat-checkbox-checkmark-path{animation:180ms linear 0ms mat-checkbox-unchecked-checked-checkmark-path}.mat-checkbox-anim-unchecked-indeterminate .mat-checkbox-background{animation:180ms linear 0ms mat-checkbox-fade-in-background}.mat-checkbox-anim-unchecked-indeterminate .mat-checkbox-mixedmark{animation:90ms linear 0ms mat-checkbox-unchecked-indeterminate-mixedmark}.mat-checkbox-anim-checked-unchecked .mat-checkbox-background{animation:180ms linear 0ms mat-checkbox-fade-out-background}.mat-checkbox-anim-checked-unchecked .mat-checkbox-checkmark-path{animation:90ms linear 0ms mat-checkbox-checked-unchecked-checkmark-path}.mat-checkbox-anim-checked-indeterminate .mat-checkbox-checkmark{animation:90ms linear 0ms mat-checkbox-checked-indeterminate-checkmark}.mat-checkbox-anim-checked-indeterminate .mat-checkbox-mixedmark{animation:90ms linear 0ms mat-checkbox-checked-indeterminate-mixedmark}.mat-checkbox-anim-indeterminate-checked .mat-checkbox-checkmark{animation:500ms linear 0ms mat-checkbox-indeterminate-checked-checkmark}.mat-checkbox-anim-indeterminate-checked .mat-checkbox-mixedmark{animation:500ms linear 0ms mat-checkbox-indeterminate-checked-mixedmark}.mat-checkbox-anim-indeterminate-unchecked .mat-checkbox-background{animation:180ms linear 0ms mat-checkbox-fade-out-background}.mat-checkbox-anim-indeterminate-unchecked .mat-checkbox-mixedmark{animation:300ms linear 0ms mat-checkbox-indeterminate-unchecked-mixedmark}.mat-checkbox-input{bottom:0;left:50%}\n"],encapsulation:2,changeDetection:0}),o})(),M=(()=>{class o{}return o.\u0275fac=function(n){return new(n||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({}),o})(),w=(()=>{class o{}return o.\u0275fac=function(n){return new(n||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[[l.si,l.BQ,f.Q8,M],l.BQ,M]}),o})()}}]);
//# sourceMappingURL=515.e48cd8965c74883a.js.map