import{a as $}from"./chunk-EFQSSQBD.js";import{a as Z,b as Q,c as J}from"./chunk-GG2PNM2J.js";import{a as z}from"./chunk-ZDGXBWHY.js";import{d as j,e as b,g as R,h as B,l as D,o as q,p as H,u as V,v as U,x as G}from"./chunk-AVVPDZJM.js";import{k}from"./chunk-MTNE5NEP.js";import{Ab as c,Eb as A,Hb as _,Jb as C,Jc as N,Oc as T,Qa as h,Ra as L,Ua as l,Ub as i,Va as P,Vb as p,Wb as x,aa as w,ac as f,ea as g,ma as I,na as F,nb as u,pb as s,wb as S,xb as E,yb as t,zb as e}from"./chunk-X4DW4WN7.js";import{e as Y}from"./chunk-EQDQRRRY.js";var K=(r,a)=>a.id;function ee(r,a){if(r&1){let n=A();t(0,"button",10),_("click",function(){let m=I(n).$implicit,d=C();return F(d.selectCategory(m.id))}),i(1),e()}if(r&2){let n=a.$implicit;l(),x(" ",n.name," ")}}function te(r,a){if(r&1&&(t(0,"div",13)(1,"div",14),c(2,"img",15),e(),t(3,"h2",16),i(4),e(),t(5,"p",17),i(6),e(),t(7,"p",18),i(8,"Disponible: "),t(9,"span"),i(10),e()(),t(11,"p",18),i(12,"C\xF3digo: "),t(13,"span"),i(14),e()(),t(15,"p",18),i(16,"Clave: "),t(17,"span"),i(18),e()()()),r&2){let n=a.$implicit;l(2),s("src",n.img,h),l(2),p(n.productName),l(2),x("Q",n.salePrice,""),l(4),p(n.quantityInStock),l(4),p(n.code),l(4),p(n.key)}}var O=class r{NombreEmpresa="EL CONDOR";imageUrl="img/Cuchara.jpg";Titulo="Cuchara para alba\xF1il.";Precio="Q23";Disponible=34;Codigo="#323435";_sSweetAlet=w(Q);_BaseApi=w(J);productos=[];aItemsCategory;categorias=[{id:1,name:"Carpinteria"},{id:2,name:"Construccion"}];ngOnInit(){this._BaseApi.getItems("category").subscribe(a=>{a.isSuccess&&(this.aItemsCategory=a.value,console.log(a.value))}),this.selectCategory("all")}selectCategory(a){this._sSweetAlet.showLoading(),this._BaseApi.getItemsById("inventory/category",a).subscribe(n=>{n.isSuccess?(this.productos=n.value,console.log(n.value),this._sSweetAlet.closeLoading()):this._sSweetAlet.showError("Error")})}static \u0275fac=function(n){return new(n||r)};static \u0275cmp=g({type:r,selectors:[["app-home"]],standalone:!0,features:[f],decls:26,vars:1,consts:[[1,"container-principal"],[1,"container-info"],[1,"DescripcionP"],[1,"container-imgPrincipal"],["src","img/image.png","alt",""],[1,"Lista_de_productos"],[1,"SubtituloL"],[1,"wrapperProducto"],[1,"Categorias"],[1,"font-bold","text-lg"],["type","button",1,"mb-4","text-left","hover:font-medium",3,"click"],["type","button",1,"mb-4","text-left","hover:font-medium"],[1,"product-container"],[1,"product-card"],[1,"wrapperImg"],["alt","Herramienta",1,"imagenProducto",3,"src"],[1,"Titulo"],[1,"-mb-8"],[1,""]],template:function(n,o){n&1&&(t(0,"div")(1,"div",0)(2,"div",1)(3,"h1"),i(4),e(),t(5,"p",2),i(6," Todo lo que necesitas para construir tus sue\xF1os, con herramientas de confianza de la mas alta calidad. "),e(),t(7,"button"),i(8,"Ver productos"),e()(),t(9,"div",3),c(10,"img",4),e()(),t(11,"section",5)(12,"h2",6),i(13,"Lista de productos"),e(),c(14,"br"),t(15,"div",7)(16,"div",8)(17,"p",9),i(18,"Categorias"),e(),t(19,"button",10),_("click",function(){return o.selectCategory("all")}),i(20,"Todos"),e(),S(21,ee,2,1,"button",11,K),e(),t(23,"div",12),S(24,te,19,6,"div",13,K),e()()()()),n&2&&(l(4),p(o.NombreEmpresa),l(17),E(o.aItemsCategory),l(3),E(o.productos))},styles:[".container-principal[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-between;height:100vh;padding:7% 5% 4% 4%}.container-principal[_ngcontent-%COMP%]   .container-info[_ngcontent-%COMP%]{background-color:var(--primary-color);font-size:25px;width:40%;color:var(--white-color);padding:50px;display:flex;justify-content:center;flex-direction:column}.container-principal[_ngcontent-%COMP%]   .container-info[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-family:PoppinsBold;font-size:3rem}.container-principal[_ngcontent-%COMP%]   .container-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#fff;font-size:20px}.container-principal[_ngcontent-%COMP%]   .container-info[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{color:var(--bg-second-color);height:50px;background-color:var(--white-color);border:none;width:200px;font-size:20px;font-weight:700}.container-principal[_ngcontent-%COMP%]   .container-imgPrincipal[_ngcontent-%COMP%]{padding:20px;display:jflex;justify-content:center}.Lista_de_productos[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{color:var(--txt-blue-color);text-align:center;font-family:PoppinsBold}.Lista_de_productos[_ngcontent-%COMP%]   .SubtituloL[_ngcontent-%COMP%]{font-size:2rem}.Lista_de_productos[_ngcontent-%COMP%]   .wrapperProducto[_ngcontent-%COMP%]{min-height:80vh;gap:10px;display:grid;grid-template-columns:200px 1fr}.Lista_de_productos[_ngcontent-%COMP%]   .wrapperProducto[_ngcontent-%COMP%]   .Categorias[_ngcontent-%COMP%]{padding:20px 50px}.Lista_de_productos[_ngcontent-%COMP%]   .wrapperProducto[_ngcontent-%COMP%]   .Categorias[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:1rem}.Lista_de_productos[_ngcontent-%COMP%]   .wrapperProducto[_ngcontent-%COMP%]   .product-container[_ngcontent-%COMP%]{gap:20px;flex-wrap:wrap;text-align:left;padding:10px 2px;display:flex;justify-content:start}.Lista_de_productos[_ngcontent-%COMP%]   .wrapperProducto[_ngcontent-%COMP%]   .product-container[_ngcontent-%COMP%]   .product-card[_ngcontent-%COMP%]{width:260px;height:370px;background-color:var(--white-color);padding:10px;border:solid 1px;border-color:var(--white-color);box-shadow:0 2px 8px #0000001a}.Lista_de_productos[_ngcontent-%COMP%]   .wrapperProducto[_ngcontent-%COMP%]   .product-container[_ngcontent-%COMP%]   .product-card[_ngcontent-%COMP%]   .wrapperImg[_ngcontent-%COMP%]{height:auto;width:100%;display:flex;justify-content:center}.Lista_de_productos[_ngcontent-%COMP%]   .wrapperProducto[_ngcontent-%COMP%]   .product-container[_ngcontent-%COMP%]   .product-card[_ngcontent-%COMP%]   .wrapperImg[_ngcontent-%COMP%]   .imagenProducto[_ngcontent-%COMP%]{height:auto;width:100px}.Lista_de_productos[_ngcontent-%COMP%]   .wrapperProducto[_ngcontent-%COMP%]   .product-container[_ngcontent-%COMP%]   .product-card[_ngcontent-%COMP%]   .Titulo[_ngcontent-%COMP%]{font-size:1rem}"]})};var M=class r{empresael="EL";empresac="CONDOR";direccion="Solol\xE1. 6ta ave 4-55 zona 2 Barrio El Calvario";tel="+502 31588772";correo="elcondor2114@gmail.com";empresa=null;static \u0275fac=function(n){return new(n||r)};static \u0275cmp=g({type:r,selectors:[["app-contact"]],standalone:!0,features:[f],decls:28,vars:5,consts:[[1,"contenedorpadre"],[1,"contenedorinformacion"],[1,"contenedor"],[1,"contenedor1"],[1,"contenedoritem"],["src","/icon/mdi_location.png","alt"," ",1,"icon-location"],["src","/icon/fluent_call-24-filled.png","alt"," ",1,"icon-call"],["src","/icon/bxl_gmail.png","alt"," ",1,"icon-gmail"],[1,"contenedor2"],["src","/icon/logos_facebook.png","alt"," ",1,"facebook"],["src","/icon/logos_whatsapp-icon.png","alt"," ",1,"whatsap"],[1,"map-container"],["src",L`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d341.75252224549365!2d-91.18372883453088!3d14.774575254161174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85894d0066e73e73%3A0x62f69d88123fdf6f!2sEL%20CONDOR!5e0!3m2!1ses!2sgt!4v1724903010877!5m2!1ses!2sgt`,"width","650","height","450","allowfullscreen","","loading","lazy","referrerpolicy","no-referrer-when-downgrade",2,"border","0"]],template:function(n,o){n&1&&(t(0,"div",0)(1,"div",1)(2,"div",2),c(3,"br"),t(4,"p"),i(5),e(),c(6,"br"),t(7,"p"),i(8),e(),c(9,"br"),e(),t(10,"div",3)(11,"div",4)(12,"p"),i(13),e(),c(14,"img",5),e(),t(15,"div",4)(16,"p"),i(17),e(),c(18,"img",6),e(),t(19,"div",4)(20,"p"),i(21),e(),c(22,"img",7),e()(),t(23,"div",8),c(24,"img",9)(25,"img",10),e()(),t(26,"div",11),c(27,"iframe",12),e()()),n&2&&(l(5),x(" \xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0",o.empresael," "),l(3),p(o.empresac),l(5),p(o.direccion),l(4),p(o.tel),l(4),p(o.correo))},styles:[".contenedorpadre[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;flex-direction:row;height:100vh}.contenedor[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:end;padding:10px}.contenedoritem[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;gap:20px;padding:10px}.contenedor[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:var(--txt-orange-color);font-family:PoppinsBold;font-size:50px;margin:0}.contenedor1[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{left:10%;display:flex;color:var(--third-txt-color);font-family:PoppinsMedium;font-size:15px}.icon-location[_ngcontent-%COMP%], .icon-call[_ngcontent-%COMP%]{width:30px;height:30px}.icon-gmail[_ngcontent-%COMP%]{width:25px;height:25px}.contenedor2[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;gap:20px;padding:10px}.map-container[_ngcontent-%COMP%]{width:600px;height:400px;box-shadow:0 4px 8px #0000001a}"]})};var v=Y(Z());function ne(r,a){r&1&&(t(0,"div",13)(1,"small"),i(2,"Es necesario llenar todos los campos correctamente."),e()())}function oe(r,a){r&1&&(t(0,"small"),i(1,"El username es obligatorio."),e())}function ie(r,a){r&1&&(t(0,"small"),i(1,"El formato del username no es v\xE1lido."),e())}function re(r,a){if(r&1&&(t(0,"div",14),u(1,oe,2,0,"small",15)(2,ie,2,0,"small",15),e()),r&2){let n,o,m=C();l(),s("ngIf",(n=m.loginForm.get("username"))==null||n.errors==null?null:n.errors.required),l(),s("ngIf",(o=m.loginForm.get("username"))==null||o.errors==null?null:o.errors.username)}}function ae(r,a){r&1&&(t(0,"small"),i(1,"La contrase\xF1a es obligatoria."),e())}function le(r,a){r&1&&(t(0,"small"),i(1,"La contrase\xF1a debe tener al menos 6 caracteres."),e())}function ce(r,a){if(r&1&&(t(0,"div",14),u(1,ae,2,0,"small",15)(2,le,2,0,"small",15),e()),r&2){let n,o,m=C();l(),s("ngIf",(n=m.loginForm.get("password"))==null||n.errors==null?null:n.errors.required),l(),s("ngIf",(o=m.loginForm.get("password"))==null||o.errors==null?null:o.errors.minlength)}}var y=class r{constructor(a,n,o){this.fb=a;this.router=n;this.auth=o;this.loginForm=this.fb.group({username:["",[b.required]],password:["",[b.required,b.minLength(6)]]})}loginForm;imagePath="/img/prueba.png";isLoading=!1;formSubmitted=!1;onSubmit(){if(this.formSubmitted=!0,this.loginForm.valid){v.default.fire({title:"Iniciando Sesi\xF3n",text:"Espere por favor....",showConfirmButton:!1,allowOutsideClick:!1}),v.default.showLoading();let a=this.loginForm.value.username,n=this.loginForm.value.password;this.auth.login(a,n).subscribe({next:o=>{o.isSuccess?v.default.fire({icon:"success",title:"Acceso concedido",text:"Accediendo al sistema",timer:1e3,showConfirmButton:!1}).then(()=>{this.router.navigate(["/venta/venta"])}):v.default.fire({icon:"error",title:"Error",text:o.error,timer:3e3,showConfirmButton:!1})},error:o=>{}})}else console.log("Form is not valid")}static \u0275fac=function(n){return new(n||r)(P(U),P(k),P(z))};static \u0275cmp=g({type:r,selectors:[["app-login"]],standalone:!0,features:[f],decls:21,vars:5,consts:[[1,"login-container"],[1,"login-form"],["class","general-error-message",4,"ngIf"],[3,"ngSubmit","formGroup"],[1,"form-group"],["for","username"],["type","username","id","username","formControlName","username","placeholder","Nombre de usuario","required",""],["class","error-message",4,"ngIf"],["for","password"],["type","password","id","password","formControlName","password","placeholder","Ingrese la contrase\xF1a","required",""],["type","submit",1,"btn-enter"],[1,"image-container"],["alt","Imagen de prueba",3,"src"],[1,"general-error-message"],[1,"error-message"],[4,"ngIf"]],template:function(n,o){if(n&1&&(t(0,"div",0)(1,"main")(2,"div",1)(3,"h2"),i(4,"Iniciar Sesi\xF3n"),e(),u(5,ne,3,0,"div",2),t(6,"form",3),_("ngSubmit",function(){return o.onSubmit()}),t(7,"div",4)(8,"label",5),i(9,"Usuario:"),e(),c(10,"input",6),u(11,re,3,2,"div",7),e(),t(12,"div",4)(13,"label",8),i(14,"Contrase\xF1a:"),e(),c(15,"input",9),u(16,ce,3,2,"div",7),e(),t(17,"button",10),i(18,"Entrar"),e()()(),t(19,"div",11),c(20,"img",12),e()()()),n&2){let m,d;l(5),s("ngIf",o.formSubmitted&&o.loginForm.invalid),l(),s("formGroup",o.loginForm),l(5),s("ngIf",((m=o.loginForm.get("username"))==null?null:m.touched)&&((m=o.loginForm.get("username"))==null?null:m.invalid)),l(5),s("ngIf",((d=o.loginForm.get("password"))==null?null:d.touched)&&((d=o.loginForm.get("password"))==null?null:d.invalid)),l(4),s("src",o.imagePath,h)}},dependencies:[G,D,j,R,B,V,q,H,T,N],styles:[".login-container[_ngcontent-%COMP%]{font-family:PoppinsExtraBold;color:var(--contrast-blue-color);display:flex;flex-direction:row;justify-content:center;align-items:center;height:100vh}main[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center;width:100%;justify-content:center}.login-form[_ngcontent-%COMP%]{width:60%;flex:1}.login-form[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{color:var(--contrast-blue-color);font-size:30px;text-align:center}.login-form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]{margin-bottom:15px;margin-left:10%}.login-form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{color:var(--fourth-txt-color);display:block;margin-bottom:5px}.login-form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:90%;padding:10px;border:1px solid #ccc;font-size:16px}.login-form[_ngcontent-%COMP%]   .btn-enter[_ngcontent-%COMP%]{background-color:var(--txt-blue-color);color:#fff;padding:12px 24px;border:none;cursor:pointer;font-weight:700;width:30%;font-size:16px;display:block;margin:0 auto}.general-error-message[_ngcontent-%COMP%]{color:red;font-size:16px;margin-bottom:15px;text-align:center}.image-container[_ngcontent-%COMP%]{flex:1;display:flex;justify-content:center;align-items:center;background-color:var(--primary-color);height:100vh}.image-container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:100%;max-height:100%;height:auto;width:auto}.error-message[_ngcontent-%COMP%]{color:red;font-size:14px;margin-top:5px}"]})};var Ie=[{path:"",component:$,children:[{path:"",component:O},{path:"contacto",component:M},{path:"iniciarSesion",component:y}]}];export{Ie as PUBLIC_ROUTES};