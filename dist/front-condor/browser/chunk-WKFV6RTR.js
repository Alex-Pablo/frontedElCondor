import{b as l}from"./chunk-AQA36TAA.js";import{$ as a,V as c}from"./chunk-2KSHIZ5A.js";var r=class extends Error{};r.prototype.name="InvalidTokenError";function h(o){return decodeURIComponent(atob(o).replace(/(.)/g,(e,t)=>{let n=t.charCodeAt(0).toString(16).toUpperCase();return n.length<2&&(n="0"+n),"%"+n}))}function k(o){let e=o.replace(/-/g,"+").replace(/_/g,"/");switch(e.length%4){case 0:break;case 2:e+="==";break;case 3:e+="=";break;default:throw new Error("base64 string is not of the correct length")}try{return h(e)}catch{return atob(e)}}function d(o,e){if(typeof o!="string")throw new r("Invalid token specified: must be a string");e||(e={});let t=e.header===!0?0:1,n=o.split(".")[t];if(typeof n!="string")throw new r(`Invalid token specified: missing part #${t+1}`);let s;try{s=k(n)}catch(i){throw new r(`Invalid token specified: invalid base64 for part #${t+1} (${i.message})`)}try{return JSON.parse(s)}catch(i){throw new r(`Invalid token specified: invalid json for part #${t+1} (${i.message})`)}}var u=class o{localStorage=a(l);jwtToken=null;decodedToken;constructor(){this.loadToken()}loadToken(){let e=localStorage.getItem("currentuser");e&&this.setToken(e)}setToken(e){e?(this.jwtToken=e,this.decodeToken()):(this.jwtToken=null,this.decodedToken=null)}decodeToken(){this.jwtToken&&(this.decodedToken=d(this.jwtToken))}getDecodeToken(){return this.jwtToken?d(this.jwtToken):null}getId(){return this.decodeToken(),this.decodedToken?this.decodedToken.nameid:null}getUser(){return this.decodeToken(),this.decodedToken?this.decodedToken.displayname:null}getRole(){return this.decodeToken(),this.decodedToken?this.decodedToken.role:null}getExpiryTime(){return this.decodeToken(),this.decodedToken?this.decodedToken.exp:null}isTokenExpired(){let e=localStorage.getItem("currentuser");if(!e)return!0;this.setToken(e);let t=this.getExpiryTime();return t?1e3*t-new Date().getTime()<5e3:!0}static \u0275fac=function(t){return new(t||o)};static \u0275prov=c({token:o,factory:o.\u0275fac,providedIn:"root"})};export{u as a};
