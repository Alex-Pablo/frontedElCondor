import{a as x,b as _}from"./chunk-IEQECBUB.js";import"./chunk-UZQ2FFVI.js";import{b as te}from"./chunk-LCRFK72W.js";import{a as ee}from"./chunk-ZWHC7VKH.js";import{a as V}from"./chunk-ZDGXBWHY.js";import{d as W,g as H,h as z,i as J,k as Y,l as K,m as X,w as Z}from"./chunk-AVVPDZJM.js";import{a as ae}from"./chunk-QMQTSFHS.js";import"./chunk-FK6H3RFT.js";import{k as $}from"./chunk-MTNE5NEP.js";import{Ab as T,Eb as B,Hb as b,Ic as R,Jb as F,Lc as L,Nc as G,Oc as U,Ua as a,Ub as n,Va as D,Vb as p,Wb as j,Xb as k,Yb as N,Zb as q,_b as Q,aa as c,ac as y,ea as C,ec as d,gc as E,ic as u,ma as P,na as w,nb as M,pb as S,yb as e,zb as t}from"./chunk-X4DW4WN7.js";import{e as re}from"./chunk-EQDQRRRY.js";var v=class l{logocondor="/img/logo.png";userInfor;saldoInicial=1e3;_BaseApi=c(_);_SweetAlert=c(x);onSubmit(){this._SweetAlert.showLoading();let o={openingAmount:this.saldoInicial};this._BaseApi.addItem("cashSession",o).subscribe(i=>{i.isSuccess?this._SweetAlert.showSuccess("Apertura Correcta"):this._SweetAlert.showError(i.error||"Error al registrar la apertura.")})}static \u0275fac=function(i){return new(i||l)};static \u0275cmp=C({type:l,selectors:[["app-apertura"]],standalone:!0,features:[y],decls:10,vars:1,consts:[[1,"apertura-caja"],[3,"ngSubmit"],["for","saldoInicial"],["type","number","id","saldoInicial","name","saldoInicial",3,"ngModelChange","ngModel"],["type","submit",1,"btn","btn-primary","btn-lg"]],template:function(i,r){i&1&&(e(0,"div",0)(1,"h2"),n(2,"Apertura de Caja"),t(),e(3,"form",1),b("ngSubmit",function(){return r.onSubmit()}),e(4,"div")(5,"label",2),n(6,"Saldo Inicial:"),t(),e(7,"input",3),Q("ngModelChange",function(m){return q(r.saldoInicial,m)||(r.saldoInicial=m),m}),t()(),e(8,"button",4),n(9,"Registrar Apertura"),t()()()),i&2&&(a(7),N("ngModel",r.saldoInicial))},dependencies:[Z,K,W,X,H,z,Y,J],styles:[".apertura-caja[_ngcontent-%COMP%]{max-width:600px;margin:auto;padding:20px;border:1px solid #ccc;border-radius:8px;box-shadow:0 2px 5px #0000001a;background-color:#f9f9f9}h2[_ngcontent-%COMP%]{text-align:center;color:#333}div[_ngcontent-%COMP%]{margin-bottom:15px}label[_ngcontent-%COMP%]{display:block;margin-bottom:5px;font-weight:700}input[_ngcontent-%COMP%]{width:100%;padding:8px;border:1px solid #ccc;border-radius:4px;transition:border-color .3s}input[_ngcontent-%COMP%]:focus{border-color:#007bff;outline:none}.btn[_ngcontent-%COMP%]{width:100%;padding:10px;font-size:16px;border:none;border-radius:4px;transition:background-color .3s}.btn-primary[_ngcontent-%COMP%]{background-color:#007bff;color:#fff}.btn-primary[_ngcontent-%COMP%]:hover{background-color:#0056b3}"]})};var ne=re(ae());function pe(l,o){if(l&1){let i=B();e(0,"tr")(1,"td"),n(2),t(),e(3,"td")(4,"input",11),b("input",function(s){let m=P(i).$implicit,h=F();return w(h.updateSubtotal(m,s))}),t()(),e(5,"td"),n(6),d(7,"currency"),t()()}if(l&2){let i=o.$implicit;a(2),p(i.label),a(2),S("value",i.quantity),a(2),p(u(7,3,i.subtotal,"GTQ","symbol","1.2-2"))}}function ce(l,o){if(l&1&&(e(0,"tr")(1,"td"),n(2),t(),e(3,"td"),n(4),d(5,"currency"),t(),e(6,"td"),n(7),d(8,"currency"),t(),e(9,"td"),n(10),d(11,"currency"),t(),e(12,"td"),n(13),d(14,"currency"),t()()),l&2){let i=o.$implicit;a(2),p(i.descripcion),a(2),p(u(5,5,i.saldoAnterior,"GTQ","symbol","1.2-2")),a(3),p(u(8,10,i.entradas,"GTQ","symbol","1.2-2")),a(3),p(u(11,15,i.salidas,"GTQ","symbol","1.2-2")),a(3),p(u(14,20,i.total,"GTQ","symbol","1.2-2"))}}var I=class l{constructor(o){this.authService=o}logocondor="/img/logo.png";userInfor;currentDate=new Date;totalAmount=0;_BaseApi=c(_);_SweetAlert=c(x);baseOpenCash=0;dateOpenCash=0;intervalId;denominations=[{label:"Billetes de Q5.00",value:5,quantity:0,subtotal:0},{label:"Billetes de Q10.00",value:10,quantity:0,subtotal:0},{label:"Billetes de Q20.00",value:20,quantity:0,subtotal:0},{label:"Billetes de Q50.00",value:50,quantity:0,subtotal:0},{label:"Billetes de Q100.00",value:100,quantity:0,subtotal:0},{label:"Billetes de Q200.00",value:200,quantity:0,subtotal:0},{label:"Monedas de Q1.00",value:1,quantity:0,subtotal:0},{label:"Monedas de Q0.50",value:.5,quantity:0,subtotal:0},{label:"Monedas de Q0.25",value:.25,quantity:0,subtotal:0}];importes=[{descripcion:"Total Ventas",saldoAnterior:0,entradas:0,salidas:0,total:0}];user;ngOnInit(){this.authService.getProfile().subscribe(o=>{o.isSuccess&&(this.userInfor=o.value)}),this._BaseApi.getItems("cashSession").subscribe(o=>{o.isSuccess&&(this.baseOpenCash=o.value.openingAmount,this.dateOpenCash=o.value.openDate)}),this.intervalId=setInterval(()=>{this.currentDate=new Date},1e3)}onCloseCashSession(){let o={reportedClosingAmount:this.totalAmount};this._BaseApi.closeCashSession(o).subscribe(i=>{i.isSuccess?this._SweetAlert.showSuccess("La sesi\xF3n de caja se cerr\xF3 con \xE9xito"):this._SweetAlert.showError(i.error||"No hay una sesi\xF3n de caja iniciada")})}ngOnDestroy(){clearInterval(this.intervalId)}get total(){return this.totalAmount=this.denominations.reduce((o,i)=>o+i.subtotal,0),this.totalAmount}updateSubtotal(o,i){let r=i.target,s=parseInt(r.value,10);o.quantity=isNaN(s)?0:s,o.subtotal=o.value*o.quantity}exportToPDF(){let o=document.getElementById("reportContent"),i=new te("p","mm","a4");if(!o){console.error('El contenedor con ID "reportContent" no se encontr\xF3.');return}let r=new Date,s=r.toLocaleDateString("es-GT"),m=r.toLocaleTimeString("es-GT"),h=document.getElementById("reportDate"),A=document.getElementById("reportMonth"),O=document.getElementById("reportUser");h&&(h.textContent=` ${s}, ${m}`),A&&(A.textContent=` ${r.toLocaleString("default",{month:"long"})} ${r.getFullYear()}`),O&&(O.textContent=` ${this.userInfor?.firstname} ${this.userInfor?.lastname}`);let f=document.querySelector(".action-buttons");f&&(f.style.display="none"),(0,ne.default)(o,{useCORS:!0,allowTaint:!0}).then(g=>{let ie=g.height*208/g.width,oe=g.toDataURL("image/png");i.addImage(oe,"PNG",0,0,208,ie),i.save(`reporte-usuarios-${s}-${m}.pdf`),f&&(f.style.display="flex")}).catch(g=>{console.error("Error al generar el PDF:",g),f&&(f.style.display="flex")})}static \u0275fac=function(i){return new(i||l)(D(V))};static \u0275cmp=C({type:l,selectors:[["app-cierre"]],standalone:!0,features:[y],decls:75,vars:19,consts:[["id","reportContent",1,"report-container"],[1,"header-info"],[1,"main-content"],[1,"denominations"],[1,"table-container"],[4,"ngFor","ngForOf"],[1,"total"],[1,"importes"],[1,"action-buttons"],[3,"click"],["type","button",1,"btn","btn-primary","btn-lg",3,"click"],["type","number","min","0",3,"input","value"]],template:function(i,r){i&1&&(e(0,"div",0)(1,"header")(2,"h1"),n(3,"Cierre de Caja"),t(),e(4,"div",1)(5,"div")(6,"label"),n(7,"Nombre del Usuario/Cajero:"),t(),e(8,"span"),n(9),t()(),e(10,"div")(11,"label"),n(12,"Caja:"),t(),e(13,"span"),n(14,"001"),t()(),e(15,"div")(16,"label"),n(17,"Fecha de Apertura:"),t(),e(18,"span"),n(19),d(20,"date"),t()(),e(21,"div")(22,"label"),n(23,"Fecha de Cierre:"),t(),e(24,"span"),n(25),d(26,"date"),t()(),e(27,"div")(28,"label"),n(29,"Base en caja:"),t(),e(30,"span"),n(31),t()()()(),e(32,"div",2)(33,"section",3)(34,"h2"),n(35,"Denominaciones"),t(),e(36,"div",4)(37,"table")(38,"thead")(39,"tr")(40,"th"),n(41,"Denominaci\xF3n"),t(),e(42,"th"),n(43,"Cantidad"),t(),e(44,"th"),n(45,"Subtotal"),t()()(),e(46,"tbody"),M(47,pe,8,8,"tr",5),t()()(),T(48,"br"),e(49,"p",6),n(50),d(51,"currency"),t()(),e(52,"section",7)(53,"h2"),n(54,"Importes de Caja"),t(),e(55,"table")(56,"thead")(57,"tr")(58,"th"),n(59,"Descripci\xF3n"),t(),e(60,"th"),n(61,"Saldo Anterior"),t(),e(62,"th"),n(63,"Entradas/Cobros"),t(),e(64,"th"),n(65,"Salida/Pagos"),t(),e(66,"th"),n(67,"Total"),t()()(),e(68,"tbody"),M(69,ce,15,25,"tr",5),t()()()(),e(70,"div",8)(71,"button",9),b("click",function(){return r.exportToPDF()}),n(72,"Exportar a PDF"),t(),e(73,"button",10),b("click",function(){return r.onCloseCashSession()}),n(74,"Cerrar Caja"),t()()()),i&2&&(a(9),k("",r.userInfor==null?null:r.userInfor.firstname," ",r.userInfor==null?null:r.userInfor.lastname,""),a(10),p(E(20,8,r.dateOpenCash,"dd/MM/yyyy")),a(6),p(E(26,11,r.currentDate,"dd/MM/yyyy")),a(6),p(r.baseOpenCash),a(16),S("ngForOf",r.denominations),a(3),j("Total Efectivo: ",u(51,14,r.total,"GTQ","symbol","1.2-2"),""),a(19),S("ngForOf",r.importes))},dependencies:[U,R,G,L],styles:["body[_ngcontent-%COMP%]{font-family:Arial,sans-serif;background-color:#f4f4f4;padding:20px}.report-container[_ngcontent-%COMP%]{margin:auto;background-color:#fff;padding:20px;border-radius:10px;box-shadow:0 0 10px #0000001a}header[_ngcontent-%COMP%]{text-align:center;margin-bottom:20px}h1[_ngcontent-%COMP%]{font-size:54px;color:#ff9f43}.header-info[_ngcontent-%COMP%]{display:flex;justify-content:space-around;margin-top:20px}.header-info[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{margin:10px 0}label[_ngcontent-%COMP%]{font-weight:700;color:#333}section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{background-color:#ff9f43;color:#fff;padding:10px;margin-top:20px}table[_ngcontent-%COMP%]{width:100%;border-collapse:collapse;margin-top:10px}table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:10px;border:1px solid #ccc;text-align:left}thead[_ngcontent-%COMP%]{background-color:#ff9f43;color:#fff}tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(2n){background-color:#f9f9f9}tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(odd){background-color:#fff}.action-buttons[_ngcontent-%COMP%]{margin-top:20px;display:flex;justify-content:space-between}button[_ngcontent-%COMP%]{padding:10px 20px;background-color:#ff9f43;color:#fff;border:none;border-radius:5px;cursor:pointer}button[_ngcontent-%COMP%]:hover{background-color:#048600}"]})};var ke=[{path:"apertura",component:v,canActivate:[()=>c(ee).isTokenExpired()?(c($).navigate(["/iniciarSesion"]),!1):!0]},{path:"cierre",component:I},{path:"",redirectTo:"apertura",pathMatch:"full"}];export{ke as CAJA_ROUTES};
