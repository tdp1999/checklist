"use strict";(self.webpackChunkchecklist=self.webpackChunkchecklist||[]).push([[592],{6909:(h,p,i)=>{i.d(p,{F:()=>t});var o=i(8784),g=i(4661),n=i(3184),u=i(4121),_=i(2201);let t=(()=>{class a{constructor(e,c){this._api=e,this._listPageService=c}getItemList(e){let c=new o.LE({fromObject:e});return this._api.get("item",{params:c})}retrieveItem(e){return this._api.get(`item/${e}`)}retrieveItemBySlug(e){return this._api.get(`item?slug=${e}`)}addItem(e){return this._api.post("item",e).pipe((0,g.x)(()=>{this._listPageService.calculateCompletePercentageOfACategory(e.categoryID)}))}updateItem(e){return this._api.put(`item/${e._id}`,e)}patchItem(e,c){return this._api.patch(`item/${e._id}`,e)}deleteItemByID(e,c){return this._api.delete(`item/${e}`).pipe((0,g.x)(()=>{this._listPageService.calculateCompletePercentageOfACategory(c)}))}}return a.\u0275fac=function(e){return new(e||a)(n.LFG(u.E),n.LFG(_.i))},a.\u0275prov=n.Yz7({token:a,factory:a.\u0275fac,providedIn:"root"}),a})()},2201:(h,p,i)=>{i.d(p,{i:()=>_});var o=i(3184),g=i(4121);let n=(()=>{class t{constructor(){this.toString=r=>(r.forEach(e=>e.value=encodeURIComponent(e.value.toString())),r.map(e=>`${e.key}=${e.value}`).join("&"))}}return t.\u0275fac=function(r){return new(r||t)},t.\u0275prov=o.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var u=i(7514);let _=(()=>{class t{constructor(r,e,c){this._apiHttpService=r,this._queryStringParamsService=e,this._categoryService=c,this.getContentByCategoryId=s=>this._apiHttpService.get(`item?categoryID=${s}`),this.calculateCompletePercentageOfACategory=s=>{this.getContentByCategoryId(s).subscribe(l=>{const m=l.length;let v=0;l.forEach(P=>{P.isDone&&v++});const y=Math.round(v/m*100);this._categoryService.patchCategory({_id:s,completePercentage:y}).subscribe()})},this.calculateCompletePercentageOfAllCategories=()=>{this._categoryService.getCategoryListNoPagination().subscribe(s=>{s.forEach(l=>{this.calculateCompletePercentageOfACategory(l._id)})})}}getCategoryItemByCategorySlug(r){return this._apiHttpService.get(`item?categorySlug=${r}`)}}return t.\u0275fac=function(r){return new(r||t)(o.LFG(g.E),o.LFG(n),o.LFG(u.o))},t.\u0275prov=o.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()}}]);
//# sourceMappingURL=common.837763d9160253b8.js.map