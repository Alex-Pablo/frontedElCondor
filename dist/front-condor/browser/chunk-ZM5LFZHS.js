import{b as M}from"./chunk-SSM3X36A.js";import{a as O,b as v,c as S,d as w,e as D,f as E,g as T,h as y,i as I,j as k,k as R}from"./chunk-3XHLV4H2.js";import{ea as u}from"./chunk-JMO4GQE3.js";import{k as P}from"./chunk-7UPJZXFQ.js";import{$b as b,Ab as m,Bb as c,Gb as h,Pa as f,Ta as r,Tb as i,Ua as x,Ub as s,da as g,mb as d,ob as p,xb as o,yb as n,zb as l}from"./chunk-2KSHIZ5A.js";import"./chunk-EQDQRRRY.js";function $(t,e){t&1&&(o(0,"th",36),i(1,"ID"),n())}function z(t,e){if(t&1&&(o(0,"td",37),i(1),n()),t&2){let a=e.$implicit;r(),s(a.id)}}function A(t,e){t&1&&(o(0,"th",36),i(1,"Imagen"),n())}function H(t,e){if(t&1&&(o(0,"td",37),l(1,"img",38),n()),t&2){let a=e.$implicit;r(),p("src",a.img,f)}}function j(t,e){t&1&&(o(0,"th",36),i(1,"Nombre"),n())}function F(t,e){if(t&1&&(o(0,"td",37),i(1),n()),t&2){let a=e.$implicit;r(),s(a.nombre)}}function U(t,e){t&1&&(o(0,"th",36),i(1,"Categoria"),n())}function N(t,e){if(t&1&&(o(0,"td",37),i(1),n()),t&2){let a=e.$implicit;r(),s(a.categoria)}}function B(t,e){t&1&&(o(0,"th",36),i(1,"Estado"),n())}function V(t,e){if(t&1&&(o(0,"td",37),i(1),n()),t&2){let a=e.$implicit;r(),s(a.estado)}}function J(t,e){t&1&&(o(0,"th",36),i(1,"Unidades"),n())}function L(t,e){if(t&1&&(o(0,"td",37),i(1),n()),t&2){let a=e.$implicit;r(),s(a.unidad)}}function X(t,e){t&1&&(o(0,"th",36),i(1,"Precio Compra"),n())}function Y(t,e){if(t&1&&(o(0,"td",37),i(1),n()),t&2){let a=e.$implicit;r(),s(a.compra)}}function Z(t,e){t&1&&(o(0,"th",36),i(1,"Proveedor"),n())}function q(t,e){if(t&1&&(o(0,"td",37),i(1),n()),t&2){let a=e.$implicit;r(),s(a.proveedor)}}function G(t,e){t&1&&l(0,"tr",39)}function K(t,e){t&1&&l(0,"tr",40)}function Q(t,e){t&1&&(o(0,"th",36),i(1,"ID"),n())}function W(t,e){if(t&1&&(o(0,"td",37),i(1),n()),t&2){let a=e.$implicit;r(),s(a.id)}}function tt(t,e){t&1&&(o(0,"th",36),i(1,"Nombre"),n())}function et(t,e){if(t&1&&(o(0,"td",37),i(1),n()),t&2){let a=e.$implicit;r(),s(a.nombre)}}function nt(t,e){t&1&&(o(0,"th",36),i(1,"Categoria"),n())}function ot(t,e){if(t&1&&(o(0,"td",37),i(1),n()),t&2){let a=e.$implicit;r(),s(a.categoria)}}function it(t,e){t&1&&(o(0,"th",36),i(1,"Estado"),n())}function at(t,e){if(t&1&&(o(0,"td",37),i(1),n()),t&2){let a=e.$implicit;r(),s(a.estado)}}function rt(t,e){t&1&&(o(0,"th",36),i(1,"Unidades"),n())}function dt(t,e){if(t&1&&(o(0,"td",37),i(1),n()),t&2){let a=e.$implicit;r(),s(a.unidad)}}function lt(t,e){t&1&&(o(0,"th",36),i(1,"Precio Compra"),n())}function mt(t,e){if(t&1&&(o(0,"td",37),i(1),n()),t&2){let a=e.$implicit;r(),s(a.compra)}}function ct(t,e){t&1&&(o(0,"th",36),i(1,"Proveedor"),n())}function st(t,e){if(t&1&&(o(0,"td",37),i(1),n()),t&2){let a=e.$implicit;r(),s(a.proveedor)}}function pt(t,e){t&1&&l(0,"tr",39)}function _t(t,e){t&1&&l(0,"tr",40)}var C=class t{constructor(e,a){this.sTitle=e;this.router=a;this.sTitle.setTitle("Dashboard")}displayedColumns=["id","nombre","categoria","estado","unidad","compra","proveedor"];dataSource=[];displayedColumnsProductos=["id","img","nombre","categoria","estado","unidad","compra","proveedor"];dataSourceProductos=[];ngOnInit(){this.getAllProveedores(),this.getAllCatalogo()}getAllProveedores(){this.dataSource=[{id:1,nombre:"Ferreter\xEDa El Tornillo",categoria:"Ferreter\xEDa",estado:"Activo",unidad:50,compra:100,proveedor:"Proveedor A"},{id:2,nombre:"Materiales y M\xE1s",categoria:"Construcci\xF3n",estado:"Inactivo",unidad:30,compra:200,proveedor:"Proveedor B"},{id:4,nombre:"Ferreter\xEDa San Jos\xE9",categoria:"Herramientas",estado:"Activo",unidad:40,compra:300,proveedor:"Proveedor D"}]}getAllCatalogo(){this.dataSourceProductos=[{id:3,nombre:"Construrama",categoria:"Materiales",estado:"Activo",unidad:20,compra:150,proveedor:"Proveedor C"},{id:1,img:"assets/img/product1.jpg",nombre:"Martillo",categoria:"Herramientas",estado:"Activo",unidad:"Piezas",compra:"$5.00",proveedor:"Proveedor ABC"},{id:2,img:"assets/img/product2.jpg",nombre:"Tornillo de acero",categoria:"Materiales",estado:"Fuera de Stock",unidad:"Cajas",compra:"$0.10",proveedor:"Proveedor XYZ"}]}navigateToProduct(){this.router.navigate(["catalogo/pages/product"])}static \u0275fac=function(a){return new(a||t)(x(u),x(P))};static \u0275cmp=g({type:t,selectors:[["app-dashboard"]],standalone:!0,features:[b],decls:103,vars:6,consts:[[1,"home-content"],[1,"overview-boxes"],[1,"box"],[1,"right-side"],[1,"box-topic"],[1,"number"],[1,"indicator"],[1,"bx","bx-up-arrow-alt"],[1,"bx","bx-cart-alt","cart"],[1,"bx","bxs-cart-add","cart","two"],[1,"bx","bx-down-arrow-alt","down"],[1,"bx","bxs-cart-download","cart","four"],[1,"sales-boxes","flex","flex-col"],[1,"recent-sales","box"],[1,"title"],[1,"sales-details"],[1,"example-container","mat-elevation-z8"],[1,"example-table-container"],["mat-table","","matSort","","matSortActive","created","matSortDisableClear","","matSortDirection","desc",1,"example-table",3,"dataSource"],["matColumnDef","id"],["class","itemHeader","mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","img"],["matColumnDef","nombre"],["matColumnDef","categoria"],["matColumnDef","estado"],["matColumnDef","unidad"],["matColumnDef","compra"],["matColumnDef","proveedor"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],[1,"button"],[3,"click"],[1,"sales-boxes"],["mat-table","","matSort","",1,"example-table",3,"dataSource"],["href","#"],["mat-header-cell","",1,"itemHeader"],["mat-cell",""],["alt","",1,"imgFoto",3,"src"],["mat-header-row",""],["mat-row",""]],template:function(a,_){a&1&&(o(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4),i(5,"Usuarios"),n(),o(6,"div",5),i(7,"5"),n(),o(8,"div",6),l(9,"i",7),n()(),l(10,"i",8),n(),o(11,"div",2)(12,"div",3)(13,"div",4),i(14,"Ventas"),n(),o(15,"div",5),i(16,"7"),n(),o(17,"div",6),l(18,"i",7),n()(),l(19,"i",9),n(),o(20,"div",2)(21,"div",3)(22,"div",4),i(23,"Productos"),n(),o(24,"div",5),i(25,"15"),n(),o(26,"div",6),l(27,"i",10),n()(),l(28,"i",11),n()(),o(29,"div",12)(30,"div",13)(31,"div",14),i(32,"Productos"),n(),l(33,"br"),o(34,"div",15)(35,"div",16)(36,"div",17)(37,"table",18),m(38,19),d(39,$,2,0,"th",20)(40,z,2,1,"td",21),c(),m(41,22),d(42,A,2,0,"th",20)(43,H,2,1,"td",21),c(),m(44,23),d(45,j,2,0,"th",20)(46,F,2,1,"td",21),c(),m(47,24),d(48,U,2,0,"th",20)(49,N,2,1,"td",21),c(),m(50,25),d(51,B,2,0,"th",20)(52,V,2,1,"td",21),c(),m(53,26),d(54,J,2,0,"th",20)(55,L,2,1,"td",21),c(),m(56,27),d(57,X,2,0,"th",20)(58,Y,2,1,"td",21),c(),m(59,28),d(60,Z,2,0,"th",20)(61,q,2,1,"td",21),c(),d(62,G,1,0,"tr",29)(63,K,1,0,"tr",30),n(),o(64,"div",31)(65,"a",32),h("click",function(){return _.navigateToProduct()}),i(66,"Ver M\xE1s"),n()()()()(),l(67,"br"),n(),l(68,"br"),o(69,"div",33)(70,"div",13)(71,"div",14),i(72,"Proveedores"),n(),l(73,"br"),o(74,"div",16)(75,"div",17)(76,"table",34),m(77,19),d(78,Q,2,0,"th",20)(79,W,2,1,"td",21),c(),m(80,23),d(81,tt,2,0,"th",20)(82,et,2,1,"td",21),c(),m(83,24),d(84,nt,2,0,"th",20)(85,ot,2,1,"td",21),c(),m(86,25),d(87,it,2,0,"th",20)(88,at,2,1,"td",21),c(),m(89,26),d(90,rt,2,0,"th",20)(91,dt,2,1,"td",21),c(),m(92,27),d(93,lt,2,0,"th",20)(94,mt,2,1,"td",21),c(),m(95,28),d(96,ct,2,0,"th",20)(97,st,2,1,"td",21),c(),d(98,pt,1,0,"tr",29)(99,_t,1,0,"tr",30),n()(),o(100,"div",31)(101,"a",35),i(102,"Ver Mas"),n()()()()()()()),a&2&&(r(37),p("dataSource",_.dataSourceProductos),r(25),p("matHeaderRowDef",_.displayedColumnsProductos),r(),p("matRowDefColumns",_.displayedColumnsProductos),r(13),p("dataSource",_.dataSource),r(22),p("matHeaderRowDef",_.displayedColumns),r(),p("matRowDefColumns",_.displayedColumns))},dependencies:[M,R,O,S,T,w,v,y,D,E,I,k],styles:[".home-section[_ngcontent-%COMP%]   .home-content[_ngcontent-%COMP%]{position:relative;padding-top:104px}.home-content[_ngcontent-%COMP%]   .overview-boxes[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;padding:0 20px;margin-bottom:26px}.overview-boxes[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;width:calc(25% - 15px);background:#fff;padding:15px 14px;border-radius:12px;box-shadow:0 5px 10px #0000001a}.overview-boxes[_ngcontent-%COMP%]   .box-topic[_ngcontent-%COMP%]{font-size:20px;font-weight:500}.home-content[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]   .number[_ngcontent-%COMP%]{display:inline-block;font-size:35px;margin-top:-1px;font-weight:500}.home-content[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]   .indicator[_ngcontent-%COMP%]{display:flex;align-items:center}.home-content[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]   .indicator[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{height:20px;width:20px;background:#8fdacb;line-height:20px;text-align:center;border-radius:50%;color:#fff;font-size:20px;margin-right:5px}.box[_ngcontent-%COMP%]   .indicator[_ngcontent-%COMP%]   i.down[_ngcontent-%COMP%]{background:#e87d88}.home-content[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]   .indicator[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]{font-size:12px}.home-content[_ngcontent-%COMP%]   .bx[_ngcontent-%COMP%]   .cart[_ngcontent-%COMP%]{display:inline-block;font-size:32px;height:50px;width:50px;background:#cce5ff;line-height:50px;text-align:center;color:#66b0ff;border-radius:12px;margin:-15px 0 0 6px}.home-content[_ngcontent-%COMP%]   .bx[_ngcontent-%COMP%]   .cart.two[_ngcontent-%COMP%]{color:#2bd47d;background:#c0d2d8}.home-content[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]   .cart.three[_ngcontent-%COMP%]{color:#ffc233;background:#ffe8b3}.home-content[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]   .cart.four[_ngcontent-%COMP%]{color:#e05260;background:#f7d4d7}.home-content[_ngcontent-%COMP%]   .total-order[_ngcontent-%COMP%]{font-size:20px;font-weight:500}.home-content[_ngcontent-%COMP%]   .sales-boxes[_ngcontent-%COMP%]{flex-wrap:wrap;display:flex;justify-content:space-between;width:100%}.home-content[_ngcontent-%COMP%]   .sales-boxes[_ngcontent-%COMP%]   .recent-sales[_ngcontent-%COMP%]{width:65%;background:#fff;padding:20px 30px;margin:0 20px;border-radius:12px;box-shadow:0 5px 10px #0000001a}.home-content[_ngcontent-%COMP%]   .sales-boxes[_ngcontent-%COMP%]   .sales-details[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-around}.sales-boxes[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{font-size:24px;font-weight:500}.sales-boxes[_ngcontent-%COMP%]   .sales-details[_ngcontent-%COMP%]   li.topic[_ngcontent-%COMP%]{font-size:20px;font-weight:500}.sales-boxes[_ngcontent-%COMP%]   .sales-details[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{list-style:none;margin:8px 0}.sales-boxes[_ngcontent-%COMP%]   .sales-details[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{font-size:18px;color:#333;font-weight:400;text-decoration:none}.sales-boxes[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:flex-end}.sales-boxes[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#fff;background:#0a2558;padding:4px 12px;font-size:15px;font-weight:400;border-radius:4px;text-decoration:none;transition:all .3s ease}.sales-boxes[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{background:#0d3073}.home-content[_ngcontent-%COMP%]   .sales-boxes[_ngcontent-%COMP%]   .top-sales[_ngcontent-%COMP%]{width:35%;background:#fff;padding:20px 30px;margin:0 20px 0 0;border:12px;box-shadow:0 5px 10px #0000001a}.sales-boxes[_ngcontent-%COMP%]   .top-sales[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;margin:10px 0}.sales-boxes[_ngcontent-%COMP%]   .top-sales[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:40px;width:40px;object-fit:cover;border-radius:12px;margin-right:10px;background:#333}.sales-boxes[_ngcontent-%COMP%]   .top-sales[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:flex;align-items:center;text-align:none}.sales-boxes[_ngcontent-%COMP%]   .top-sales[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .product[_ngcontent-%COMP%], .price[_ngcontent-%COMP%]{font-size:17px;font-weight:400;color:#333}@media (max-width: 1240px){.home-section[_ngcontent-%COMP%]{width:calc(100% - 60px);left:60px}.home-section[_ngcontent-%COMP%]{overflow:hidden;left:220px}.home-section[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]{width:calc(100% - 60px);left:60px}.sidebar.active[_ngcontent-%COMP%] ~ .home-section[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]{width:calc(100% - 220px);left:220px}}@media (max-width: 1150px){.home-content[_ngcontent-%COMP%]   .sales-boxes[_ngcontent-%COMP%]{flex-direction:column}.home-content[_ngcontent-%COMP%]   .sales-boxes[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]{width:100%;overflow-x:scroll;margin-bottom:30px}.home-content[_ngcontent-%COMP%]   .sales-boxes[_ngcontent-%COMP%]   .top-sales[_ngcontent-%COMP%]{margin:0}}@media (max-width: 1000px){.overview-boxes[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]{width:calc(50% - 15px);margin-bottom:15px}}@media (max-width: 700px){nav[_ngcontent-%COMP%]   .sidebar-button[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%], nav[_ngcontent-%COMP%]   .profile-details[_ngcontent-%COMP%]   .admin_name[_ngcontent-%COMP%], nav[_ngcontent-%COMP%]   .profile-details[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{display:none}.home-section[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]   .profile-details[_ngcontent-%COMP%]{height:50px;min-width:40px}.home-content[_ngcontent-%COMP%]   .sales-boxes[_ngcontent-%COMP%]   .sales-details[_ngcontent-%COMP%]{width:560px}}@media (max-width: 550px){.overview-boxes[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]{width:100%;margin-bottom:15px}}@media (max-width: 400px){.home-section[_ngcontent-%COMP%]{width:100%;left:0}.sidebar.active[_ngcontent-%COMP%] ~ .home-section[_ngcontent-%COMP%]{left:60px;width:calc(100% - 60px)}.home-section[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]{width:100%;left:0}}"]})};var vt=[{path:"",component:C}];export{vt as DASHBOARD_ROUTES};
