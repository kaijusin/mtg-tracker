(function dartProgram(){function copyProperties(a,b){var s=Object.keys(a)
for(var r=0;r<s.length;r++){var q=s[r]
b[q]=a[q]}}function mixinPropertiesHard(a,b){var s=Object.keys(a)
for(var r=0;r<s.length;r++){var q=s[r]
if(!b.hasOwnProperty(q))b[q]=a[q]}}function mixinPropertiesEasy(a,b){Object.assign(b,a)}var z=function(){var s=function(){}
s.prototype={p:{}}
var r=new s()
if(!(r.__proto__&&r.__proto__.p===s.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var q=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(q))return true}}catch(p){}return false}()
function inherit(a,b){a.prototype.constructor=a
a.prototype["$i"+a.name]=a
if(b!=null){if(z){a.prototype.__proto__=b.prototype
return}var s=Object.create(b.prototype)
copyProperties(a.prototype,s)
a.prototype=s}}function inheritMany(a,b){for(var s=0;s<b.length;s++)inherit(b[s],a)}function mixinEasy(a,b){mixinPropertiesEasy(b.prototype,a.prototype)
a.prototype.constructor=a}function mixinHard(a,b){mixinPropertiesHard(b.prototype,a.prototype)
a.prototype.constructor=a}function lazyOld(a,b,c,d){var s=a
a[b]=s
a[c]=function(){a[c]=function(){A.uD(b)}
var r
var q=d
try{if(a[b]===s){r=a[b]=q
r=a[b]=d()}else r=a[b]}finally{if(r===q)a[b]=null
a[c]=function(){return this[b]}}return r}}function lazy(a,b,c,d){var s=a
a[b]=s
a[c]=function(){if(a[b]===s)a[b]=d()
a[c]=function(){return this[b]}
return a[b]}}function lazyFinal(a,b,c,d){var s=a
a[b]=s
a[c]=function(){if(a[b]===s){var r=d()
if(a[b]!==s)A.uE(b)
a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a){a.immutable$list=Array
a.fixed$length=Array
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s)convertToFastObject(a[s])}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.o6(b)
return new s(c,this)}:function(){if(s===null)s=A.o6(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.o6(a).prototype
return s}}var x=0
function tearOffParameters(a,b,c,d,e,f,g,h,i,j){if(typeof h=="number")h+=x
return{co:a,iS:b,iI:c,rC:d,dV:e,cs:f,fs:g,fT:h,aI:i||0,nDA:j}}function installStaticTearOff(a,b,c,d,e,f,g,h){var s=tearOffParameters(a,true,false,c,d,e,f,g,h,false)
var r=staticTearOffGetter(s)
a[b]=r}function installInstanceTearOff(a,b,c,d,e,f,g,h,i,j){c=!!c
var s=tearOffParameters(a,false,c,d,e,f,g,h,i,!!j)
var r=instanceTearOffGetter(c,s)
a[b]=r}function setOrUpdateInterceptorsByTag(a){var s=v.interceptorsByTag
if(!s){v.interceptorsByTag=a
return}copyProperties(a,s)}function setOrUpdateLeafTags(a){var s=v.leafTags
if(!s){v.leafTags=a
return}copyProperties(a,s)}function updateTypes(a){var s=v.types
var r=s.length
s.push.apply(s,a)
return r}function updateHolder(a,b){copyProperties(b,a)
return a}var hunkHelpers=function(){var s=function(a,b,c,d,e){return function(f,g,h,i){return installInstanceTearOff(f,g,a,b,c,d,[h],i,e,false)}},r=function(a,b,c,d){return function(e,f,g,h){return installStaticTearOff(e,f,a,b,c,[g],h,d)}}
return{inherit:inherit,inheritMany:inheritMany,mixin:mixinEasy,mixinHard:mixinHard,installStaticTearOff:installStaticTearOff,installInstanceTearOff:installInstanceTearOff,_instance_0u:s(0,0,null,["$0"],0),_instance_1u:s(0,1,null,["$1"],0),_instance_2u:s(0,2,null,["$2"],0),_instance_0i:s(1,0,null,["$0"],0),_instance_1i:s(1,1,null,["$1"],0),_instance_2i:s(1,2,null,["$2"],0),_static_0:r(0,null,["$0"],0),_static_1:r(1,null,["$1"],0),_static_2:r(2,null,["$2"],0),makeConstList:makeConstList,lazy:lazy,lazyFinal:lazyFinal,lazyOld:lazyOld,updateHolder:updateHolder,convertToFastObject:convertToFastObject,updateTypes:updateTypes,setOrUpdateInterceptorsByTag:setOrUpdateInterceptorsByTag,setOrUpdateLeafTags:setOrUpdateLeafTags}}()
function initializeDeferredHunk(a){x=v.types.length
a(hunkHelpers,v,w,$)}var A={nx:function nx(){},
cN(a,b,c){if(b.i("A<0>").b(a))return new A.ee(a,b.i("@<0>").A(c).i("ee<1,2>"))
return new A.cf(a,b.i("@<0>").A(c).i("cf<1,2>"))},
i3(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
r1(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
az(a,b,c){return a},
aO(a,b,c,d){A.aN(b,"start")
if(c!=null){A.aN(c,"end")
if(b>c)A.a5(A.ab(b,0,c,"start",null))}return new A.e3(a,b,c,d.i("e3<0>"))},
hP(a,b,c,d){if(t.i.b(a))return new A.du(a,b,c.i("@<0>").A(d).i("du<1,2>"))
return new A.bB(a,b,c.i("@<0>").A(d).i("bB<1,2>"))},
nG(a,b,c){var s="takeCount"
A.eU(b,s,t.S)
A.aN(b,s)
if(t.i.b(a))return new A.dv(a,b,c.i("dv<0>"))
return new A.cw(a,b,c.i("cw<0>"))},
nE(a,b,c){var s="count"
if(t.i.b(a)){A.eU(b,s,t.S)
A.aN(b,s)
return new A.cQ(a,b,c.i("cQ<0>"))}A.eU(b,s,t.S)
A.aN(b,s)
return new A.bC(a,b,c.i("bC<0>"))},
bz(){return new A.cs("No element")},
qK(){return new A.cs("Too many elements")},
oy(){return new A.cs("Too few elements")},
oR(a,b,c){A.fr(a,0,J.W(a)-1,b,c)},
fr(a,b,c,d,e){if(c-b<=32)A.r_(a,b,c,d,e)
else A.qZ(a,b,c,d,e)},
r_(a,b,c,d,e){var s,r,q,p,o,n
for(s=b+1,r=J.j(a);s<=c;++s){q=r.h(a,s)
p=s
while(!0){if(p>b){o=d.$2(r.h(a,p-1),q)
if(typeof o!=="number")return o.S()
o=o>0}else o=!1
if(!o)break
n=p-1
r.k(a,p,r.h(a,n))
p=n}r.k(a,p,q)}},
qZ(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j=B.f.W(a5-a4+1,6),i=a4+j,h=a5-j,g=B.f.W(a4+a5,2),f=g-j,e=g+j,d=J.j(a3),c=d.h(a3,i),b=d.h(a3,f),a=d.h(a3,g),a0=d.h(a3,e),a1=d.h(a3,h),a2=a6.$2(c,b)
if(typeof a2!=="number")return a2.S()
if(a2>0){s=b
b=c
c=s}a2=a6.$2(a0,a1)
if(typeof a2!=="number")return a2.S()
if(a2>0){s=a1
a1=a0
a0=s}a2=a6.$2(c,a)
if(typeof a2!=="number")return a2.S()
if(a2>0){s=a
a=c
c=s}a2=a6.$2(b,a)
if(typeof a2!=="number")return a2.S()
if(a2>0){s=a
a=b
b=s}a2=a6.$2(c,a0)
if(typeof a2!=="number")return a2.S()
if(a2>0){s=a0
a0=c
c=s}a2=a6.$2(a,a0)
if(typeof a2!=="number")return a2.S()
if(a2>0){s=a0
a0=a
a=s}a2=a6.$2(b,a1)
if(typeof a2!=="number")return a2.S()
if(a2>0){s=a1
a1=b
b=s}a2=a6.$2(b,a)
if(typeof a2!=="number")return a2.S()
if(a2>0){s=a
a=b
b=s}a2=a6.$2(a0,a1)
if(typeof a2!=="number")return a2.S()
if(a2>0){s=a1
a1=a0
a0=s}d.k(a3,i,c)
d.k(a3,g,a)
d.k(a3,h,a1)
d.k(a3,f,d.h(a3,a4))
d.k(a3,e,d.h(a3,a5))
r=a4+1
q=a5-1
if(J.q(a6.$2(b,a0),0)){for(p=r;p<=q;++p){o=d.h(a3,p)
n=a6.$2(o,b)
if(n===0)continue
if(n<0){if(p!==r){d.k(a3,p,d.h(a3,r))
d.k(a3,r,o)}++r}else for(;!0;){n=a6.$2(d.h(a3,q),b)
if(n>0){--q
continue}else{m=q-1
if(n<0){d.k(a3,p,d.h(a3,r))
l=r+1
d.k(a3,r,d.h(a3,q))
d.k(a3,q,o)
q=m
r=l
break}else{d.k(a3,p,d.h(a3,q))
d.k(a3,q,o)
q=m
break}}}}k=!0}else{for(p=r;p<=q;++p){o=d.h(a3,p)
if(a6.$2(o,b)<0){if(p!==r){d.k(a3,p,d.h(a3,r))
d.k(a3,r,o)}++r}else if(a6.$2(o,a0)>0)for(;!0;)if(a6.$2(d.h(a3,q),a0)>0){--q
if(q<p)break
continue}else{m=q-1
if(a6.$2(d.h(a3,q),b)<0){d.k(a3,p,d.h(a3,r))
l=r+1
d.k(a3,r,d.h(a3,q))
d.k(a3,q,o)
r=l}else{d.k(a3,p,d.h(a3,q))
d.k(a3,q,o)}q=m
break}}k=!1}a2=r-1
d.k(a3,a4,d.h(a3,a2))
d.k(a3,a2,b)
a2=q+1
d.k(a3,a5,d.h(a3,a2))
d.k(a3,a2,a0)
A.fr(a3,a4,r-2,a6,a7)
A.fr(a3,q+2,a5,a6,a7)
if(k)return
if(r<i&&q>h){for(;J.q(a6.$2(d.h(a3,r),b),0);)++r
for(;J.q(a6.$2(d.h(a3,q),a0),0);)--q
for(p=r;p<=q;++p){o=d.h(a3,p)
if(a6.$2(o,b)===0){if(p!==r){d.k(a3,p,d.h(a3,r))
d.k(a3,r,o)}++r}else if(a6.$2(o,a0)===0)for(;!0;)if(a6.$2(d.h(a3,q),a0)===0){--q
if(q<p)break
continue}else{m=q-1
if(a6.$2(d.h(a3,q),b)<0){d.k(a3,p,d.h(a3,r))
l=r+1
d.k(a3,r,d.h(a3,q))
d.k(a3,q,o)
r=l}else{d.k(a3,p,d.h(a3,q))
d.k(a3,q,o)}q=m
break}}A.fr(a3,r,q,a6,a7)}else A.fr(a3,r,q,a6,a7)},
c_:function c_(){},
dq:function dq(a,b){this.a=a
this.$ti=b},
cf:function cf(a,b){this.a=a
this.$ti=b},
ee:function ee(a,b){this.a=a
this.$ti=b},
ea:function ea(){},
ic:function ic(a,b){this.a=a
this.b=b},
ib:function ib(a,b){this.a=a
this.b=b},
bw:function bw(a,b){this.a=a
this.$ti=b},
fd:function fd(a){this.a=a},
hZ:function hZ(){},
A:function A(){},
Q:function Q(){},
e3:function e3(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
aF:function aF(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
bB:function bB(a,b,c){this.a=a
this.b=b
this.$ti=c},
du:function du(a,b,c){this.a=a
this.b=b
this.$ti=c},
dQ:function dQ(a,b,c){var _=this
_.a=null
_.b=a
_.c=b
_.$ti=c},
R:function R(a,b,c){this.a=a
this.b=b
this.$ti=c},
a_:function a_(a,b,c){this.a=a
this.b=b
this.$ti=c},
cx:function cx(a,b,c){this.a=a
this.b=b
this.$ti=c},
cw:function cw(a,b,c){this.a=a
this.b=b
this.$ti=c},
dv:function dv(a,b,c){this.a=a
this.b=b
this.$ti=c},
e5:function e5(a,b,c){this.a=a
this.b=b
this.$ti=c},
bC:function bC(a,b,c){this.a=a
this.b=b
this.$ti=c},
cQ:function cQ(a,b,c){this.a=a
this.b=b
this.$ti=c},
e_:function e_(a,b,c){this.a=a
this.b=b
this.$ti=c},
dx:function dx(a){this.$ti=a},
dy:function dy(a){this.$ti=a},
cy:function cy(a,b){this.a=a
this.$ti=b},
e8:function e8(a,b){this.a=a
this.$ti=b},
aa:function aa(){},
bk:function bk(a,b){this.a=a
this.$ti=b},
cY:function cY(a){this.a=a},
eB:function eB(){},
no(){throw A.e(A.K("Cannot modify unmodifiable Map"))},
pR(a){var s=v.mangledGlobalNames[a]
if(s!=null)return s
return"minified:"+a},
uk(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.aU.b(a)},
c(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.m(a)
return s},
fp(a){var s,r=$.oI
if(r==null)r=$.oI=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
a4(a,b){var s,r=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(r==null)return null
if(3>=r.length)return A.b(r,3)
s=r[3]
if(s!=null)return parseInt(a,10)
if(r[2]!=null)return parseInt(a,16)
return null},
hW(a){return A.qU(a)},
qU(a){var s,r,q,p,o
if(a instanceof A.B)return A.aV(A.P(a),null)
s=J.ca(a)
if(s===B.ae||s===B.ag||t.bJ.b(a)){r=B.K(a)
q=r!=="Object"&&r!==""
if(q)return r
p=a.constructor
if(typeof p=="function"){o=p.name
if(typeof o=="string")q=o!=="Object"&&o!==""
else q=!1
if(q)return o}}return A.aV(A.P(a),null)},
ap(a){var s
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){s=a-65536
return String.fromCharCode((B.f.bj(s,10)|55296)>>>0,s&1023|56320)}throw A.e(A.ab(a,0,1114111,null,null))},
qW(a,b,c,d,e,f,g,h){var s,r=b-1
if(0<=a&&a<100){a+=400
r-=4800}s=h?Date.UTC(a,r,c,d,e,f,g):new Date(a,r,c,d,e,f,g).valueOf()
if(isNaN(s)||s<-864e13||s>864e13)return null
return s},
aM(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
dX(a){return a.b?A.aM(a).getUTCFullYear()+0:A.aM(a).getFullYear()+0},
nC(a){return a.b?A.aM(a).getUTCMonth()+1:A.aM(a).getMonth()+1},
nB(a){return a.b?A.aM(a).getUTCDate()+0:A.aM(a).getDate()+0},
oJ(a){return a.b?A.aM(a).getUTCHours()+0:A.aM(a).getHours()+0},
oL(a){return a.b?A.aM(a).getUTCMinutes()+0:A.aM(a).getMinutes()+0},
oM(a){return a.b?A.aM(a).getUTCSeconds()+0:A.aM(a).getSeconds()+0},
oK(a){return a.b?A.aM(a).getUTCMilliseconds()+0:A.aM(a).getMilliseconds()+0},
bW(a,b,c){var s,r,q={}
q.a=0
s=[]
r=[]
q.a=b.length
B.a.T(s,b)
q.b=""
if(c!=null&&c.a!==0)c.K(0,new A.hV(q,r,s))
return J.qm(a,new A.f6(B.aB,0,s,r,0))},
qV(a,b,c){var s,r,q
if(Array.isArray(b))s=c==null||c.a===0
else s=!1
if(s){r=b.length
if(r===0){if(!!a.$0)return a.$0()}else if(r===1){if(!!a.$1)return a.$1(b[0])}else if(r===2){if(!!a.$2)return a.$2(b[0],b[1])}else if(r===3){if(!!a.$3)return a.$3(b[0],b[1],b[2])}else if(r===4){if(!!a.$4)return a.$4(b[0],b[1],b[2],b[3])}else if(r===5)if(!!a.$5)return a.$5(b[0],b[1],b[2],b[3],b[4])
q=a[""+"$"+r]
if(q!=null)return q.apply(a,b)}return A.qT(a,b,c)},
qT(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h,g=Array.isArray(b)?b:A.a8(b,!0,t.z),f=g.length,e=a.$R
if(f<e)return A.bW(a,g,c)
s=a.$D
r=s==null
q=!r?s():null
p=J.ca(a)
o=p.$C
if(typeof o=="string")o=p[o]
if(r){if(c!=null&&c.a!==0)return A.bW(a,g,c)
if(f===e)return o.apply(a,g)
return A.bW(a,g,c)}if(Array.isArray(q)){if(c!=null&&c.a!==0)return A.bW(a,g,c)
n=e+q.length
if(f>n)return A.bW(a,g,null)
if(f<n){m=q.slice(f-e)
if(g===b)g=A.a8(g,!0,t.z)
B.a.T(g,m)}return o.apply(a,g)}else{if(f>e)return A.bW(a,g,c)
if(g===b)g=A.a8(g,!0,t.z)
l=Object.keys(q)
if(c==null)for(r=l.length,k=0;k<l.length;l.length===r||(0,A.N)(l),++k){j=q[A.n(l[k])]
if(B.M===j)return A.bW(a,g,c)
B.a.q(g,j)}else{for(r=l.length,i=0,k=0;k<l.length;l.length===r||(0,A.N)(l),++k){h=A.n(l[k])
if(c.M(0,h)){++i
B.a.q(g,c.h(0,h))}else{j=q[h]
if(B.M===j)return A.bW(a,g,c)
B.a.q(g,j)}}if(i!==c.a)return A.bW(a,g,c)}return o.apply(a,g)}},
kX(a){throw A.e(A.pz(a))},
b(a,b){if(a==null)J.W(a)
throw A.e(A.cG(a,b))},
cG(a,b){var s,r="index"
if(!A.d7(b))return new A.b3(!0,b,r,null)
s=A.i(J.W(a))
if(b<0||b>=s)return A.cS(b,a,r,null,s)
return A.hX(b,r)},
u7(a,b,c){if(a>c)return A.ab(a,0,c,"start",null)
if(b!=null)if(b<a||b>c)return A.ab(b,a,c,"end",null)
return new A.b3(!0,b,"end",null)},
pz(a){return new A.b3(!0,a,null,null)},
e(a){var s,r
if(a==null)a=new A.fm()
s=new Error()
s.dartException=a
r=A.uF
if("defineProperty" in Object){Object.defineProperty(s,"message",{get:r})
s.name=""}else s.toString=r
return s},
uF(){return J.m(this.dartException)},
a5(a){throw A.e(a)},
N(a){throw A.e(A.a9(a))},
bD(a){var s,r,q,p,o,n
a=A.pO(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.o([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.i4(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
i5(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
oV(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
ny(a,b){var s=b==null,r=s?null:b.method
return new A.f8(a,r,s?null:b.receiver)},
ag(a){var s
if(a==null)return new A.hT(a)
if(a instanceof A.dz){s=a.a
return A.cb(a,s==null?t.K.a(s):s)}if(typeof a!=="object")return a
if("dartException" in a)return A.cb(a,a.dartException)
return A.tT(a)},
cb(a,b){if(t.bU.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
tT(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=null
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.f.bj(r,16)&8191)===10)switch(q){case 438:return A.cb(a,A.ny(A.c(s)+" (Error "+q+")",e))
case 445:case 5007:p=A.c(s)
return A.cb(a,new A.dU(p+" (Error "+q+")",e))}}if(a instanceof TypeError){o=$.pY()
n=$.pZ()
m=$.q_()
l=$.q0()
k=$.q3()
j=$.q4()
i=$.q2()
$.q1()
h=$.q6()
g=$.q5()
f=o.ac(s)
if(f!=null)return A.cb(a,A.ny(A.n(s),f))
else{f=n.ac(s)
if(f!=null){f.method="call"
return A.cb(a,A.ny(A.n(s),f))}else{f=m.ac(s)
if(f==null){f=l.ac(s)
if(f==null){f=k.ac(s)
if(f==null){f=j.ac(s)
if(f==null){f=i.ac(s)
if(f==null){f=l.ac(s)
if(f==null){f=h.ac(s)
if(f==null){f=g.ac(s)
p=f!=null}else p=!0}else p=!0}else p=!0}else p=!0}else p=!0}else p=!0}else p=!0
if(p){A.n(s)
return A.cb(a,new A.dU(s,f==null?e:f.method))}}}return A.cb(a,new A.fB(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.e0()
s=function(b){try{return String(b)}catch(d){}return null}(a)
return A.cb(a,new A.b3(!1,e,e,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.e0()
return a},
bM(a){var s
if(a instanceof A.dz)return a.b
if(a==null)return new A.et(a)
s=a.$cachedTrace
if(s!=null)return s
return a.$cachedTrace=new A.et(a)},
pL(a){if(a==null||typeof a!="object")return J.eP(a)
else return A.fp(a)},
u9(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.k(0,a[s],a[r])}return b},
uj(a,b,c,d,e,f){t.Y.a(a)
switch(A.i(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.e(new A.ig("Unsupported number of arguments for wrapped closure"))},
df(a,b){var s
if(a==null)return null
s=a.$identity
if(!!s)return s
s=function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.uj)
a.$identity=s
return s},
qD(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.fs().constructor.prototype):Object.create(new A.cM(null,null).constructor.prototype)
s.$initialize=s.constructor
if(h)r=function static_tear_off(){this.$initialize()}
else r=function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.op(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.qz(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.op(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
qz(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.e("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.qx)}throw A.e("Error in functionType of tearoff")},
qA(a,b,c,d){var s=A.oo
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
op(a,b,c,d){var s,r
if(c)return A.qC(a,b,d)
s=b.length
r=A.qA(s,d,a,b)
return r},
qB(a,b,c,d){var s=A.oo,r=A.qy
switch(b?-1:a){case 0:throw A.e(new A.fq("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,r,s)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,r,s)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,r,s)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,r,s)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,r,s)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,r,s)
default:return function(e,f,g){return function(){var q=[g(this)]
Array.prototype.push.apply(q,arguments)
return e.apply(f(this),q)}}(d,r,s)}},
qC(a,b,c){var s,r
if($.om==null)$.om=A.ol("interceptor")
if($.on==null)$.on=A.ol("receiver")
s=b.length
r=A.qB(s,c,a,b)
return r},
o6(a){return A.qD(a)},
qx(a,b){return A.iK(v.typeUniverse,A.P(a.a),b)},
oo(a){return a.a},
qy(a){return a.b},
ol(a){var s,r,q,p=new A.cM("receiver","interceptor"),o=J.hH(Object.getOwnPropertyNames(p),t.O)
for(s=o.length,r=0;r<s;++r){q=o[r]
if(p[q]===a)return q}throw A.e(A.bv("Field name "+a+" not found.",null))},
am(a){if(a==null)A.tX("boolean expression must not be null")
return a},
tX(a){throw A.e(new A.fG(a))},
uD(a){throw A.e(new A.eY(a))},
pD(a){return v.getIsolateTag(a)},
oE(a,b,c){var s=new A.co(a,b,c.i("co<0>"))
s.c=a.e
return s},
vx(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
un(a){var s,r,q,p,o,n=A.n($.pE.$1(a)),m=$.kV[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.l4[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=A.ak($.py.$2(a,n))
if(q!=null){m=$.kV[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.l4[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.l6(s)
$.kV[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.l4[n]=s
return s}if(p==="-"){o=A.l6(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.pM(a,s)
if(p==="*")throw A.e(A.nI(n))
if(v.leafTags[n]===true){o=A.l6(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.pM(a,s)},
pM(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.o9(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
l6(a){return J.o9(a,!1,null,!!a.$iau)},
up(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.l6(s)
else return J.o9(s,c,null,null)},
ug(){if(!0===$.o8)return
$.o8=!0
A.uh()},
uh(){var s,r,q,p,o,n,m,l
$.kV=Object.create(null)
$.l4=Object.create(null)
A.uf()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.pN.$1(o)
if(n!=null){m=A.up(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
uf(){var s,r,q,p,o,n,m=B.X()
m=A.dd(B.Y,A.dd(B.Z,A.dd(B.L,A.dd(B.L,A.dd(B.a_,A.dd(B.a0,A.dd(B.a1(B.K),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(s.constructor==Array)for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.pE=new A.kY(p)
$.py=new A.kZ(o)
$.pN=new A.l_(n)},
dd(a,b){return a(b)||b},
nw(a,b,c,d,e,f){var s=b?"m":"",r=c?"":"i",q=d?"u":"",p=e?"s":"",o=f?"g":"",n=function(g,h){try{return new RegExp(g,h)}catch(m){return m}}(a,s+r+q+p+o)
if(n instanceof RegExp)return n
throw A.e(A.f3("Illegal RegExp pattern ("+String(n)+")",a))},
ay(a,b,c){var s=a.indexOf(b,c)
return s>=0},
u8(a){if(a.indexOf("$",0)>=0)return a.replace(/\$/g,"$$$$")
return a},
pO(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
pQ(a,b,c){var s=A.uC(a,b,c)
return s},
uC(a,b,c){var s,r,q,p
if(b===""){if(a==="")return c
s=a.length
r=""+c
for(q=0;q<s;++q)r=r+a[q]+c
return r.charCodeAt(0)==0?r:r}p=a.indexOf(b,0)
if(p<0)return a
if(a.length<500||c.indexOf("$",0)>=0)return a.split(b).join(c)
return a.replace(new RegExp(A.pO(b),"g"),A.u8(c))},
ds:function ds(a,b){this.a=a
this.$ti=b},
dr:function dr(){},
ht:function ht(a,b,c){this.a=a
this.b=b
this.c=c},
ao:function ao(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
hu:function hu(a){this.a=a},
f6:function f6(a,b,c,d,e){var _=this
_.a=a
_.c=b
_.d=c
_.e=d
_.f=e},
hV:function hV(a,b,c){this.a=a
this.b=b
this.c=c},
i4:function i4(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
dU:function dU(a,b){this.a=a
this.b=b},
f8:function f8(a,b,c){this.a=a
this.b=b
this.c=c},
fB:function fB(a){this.a=a},
hT:function hT(a){this.a=a},
dz:function dz(a,b){this.a=a
this.b=b},
et:function et(a){this.a=a
this.b=null},
cg:function cg(){},
eV:function eV(){},
eW:function eW(){},
fy:function fy(){},
fs:function fs(){},
cM:function cM(a,b){this.a=a
this.b=b},
fq:function fq(a){this.a=a},
fG:function fG(a){this.a=a},
iC:function iC(){},
aL:function aL(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
hJ:function hJ(a){this.a=a},
hK:function hK(a,b){var _=this
_.a=a
_.b=b
_.d=_.c=null},
b6:function b6(a,b){this.a=a
this.$ti=b},
co:function co(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
kY:function kY(a){this.a=a},
kZ:function kZ(a){this.a=a},
l_:function l_(a){this.a=a},
dJ:function dJ(a,b){var _=this
_.a=a
_.b=b
_.d=_.c=null},
el:function el(a){this.b=a},
fF:function fF(a,b,c){this.a=a
this.b=b
this.c=c},
d_:function d_(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.d=null},
fv:function fv(a,b){this.a=a
this.c=b},
h0:function h0(a,b,c){this.a=a
this.b=b
this.c=c},
h1:function h1(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.d=null},
bF(a,b,c){if(a>>>0!==a||a>=c)throw A.e(A.cG(b,a))},
rL(a,b,c){var s
if(!(a>>>0!==a))s=b>>>0!==b||a>b||b>c
else s=!0
if(s)throw A.e(A.u7(a,b,c))
return b},
cp:function cp(){},
aH:function aH(){},
bV:function bV(){},
aS:function aS(){},
ff:function ff(){},
fg:function fg(){},
fh:function fh(){},
fi:function fi(){},
fj:function fj(){},
dR:function dR(){},
fk:function fk(){},
en:function en(){},
eo:function eo(){},
ep:function ep(){},
eq:function eq(){},
oO(a,b){var s=b.c
return s==null?b.c=A.nN(a,b.y,!0):s},
oN(a,b){var s=b.c
return s==null?b.c=A.ew(a,"aD",[b.y]):s},
oP(a){var s=a.x
if(s===6||s===7||s===8)return A.oP(a.y)
return s===11||s===12},
qY(a){return a.at},
dg(a){return A.h7(v.typeUniverse,a,!1)},
c8(a,b,a0,a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=b.x
switch(c){case 5:case 1:case 2:case 3:case 4:return b
case 6:s=b.y
r=A.c8(a,s,a0,a1)
if(r===s)return b
return A.p4(a,r,!0)
case 7:s=b.y
r=A.c8(a,s,a0,a1)
if(r===s)return b
return A.nN(a,r,!0)
case 8:s=b.y
r=A.c8(a,s,a0,a1)
if(r===s)return b
return A.p3(a,r,!0)
case 9:q=b.z
p=A.eI(a,q,a0,a1)
if(p===q)return b
return A.ew(a,b.y,p)
case 10:o=b.y
n=A.c8(a,o,a0,a1)
m=b.z
l=A.eI(a,m,a0,a1)
if(n===o&&l===m)return b
return A.nL(a,n,l)
case 11:k=b.y
j=A.c8(a,k,a0,a1)
i=b.z
h=A.tP(a,i,a0,a1)
if(j===k&&h===i)return b
return A.p2(a,j,h)
case 12:g=b.z
a1+=g.length
f=A.eI(a,g,a0,a1)
o=b.y
n=A.c8(a,o,a0,a1)
if(f===g&&n===o)return b
return A.nM(a,n,f,!0)
case 13:e=b.y
if(e<a1)return b
d=a0[e-a1]
if(d==null)return b
return d
default:throw A.e(A.hr("Attempted to substitute unexpected RTI kind "+c))}},
eI(a,b,c,d){var s,r,q,p,o=b.length,n=A.iM(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.c8(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
tQ(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.iM(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.c8(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
tP(a,b,c,d){var s,r=b.a,q=A.eI(a,r,c,d),p=b.b,o=A.eI(a,p,c,d),n=b.c,m=A.tQ(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.fO()
s.a=q
s.b=o
s.c=m
return s},
o(a,b){a[v.arrayRti]=b
return a},
u1(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.uc(s)
return a.$S()}return null},
pH(a,b){var s
if(A.oP(b))if(a instanceof A.cg){s=A.u1(a)
if(s!=null)return s}return A.P(a)},
P(a){var s
if(a instanceof A.B){s=a.$ti
return s!=null?s:A.nT(a)}if(Array.isArray(a))return A.L(a)
return A.nT(J.ca(a))},
L(a){var s=a[v.arrayRti],r=t.o
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
x(a){var s=a.$ti
return s!=null?s:A.nT(a)},
nT(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.tj(a,s)},
tj(a,b){var s=a instanceof A.cg?a.__proto__.__proto__.constructor:b,r=A.rw(v.typeUniverse,s.name)
b.$ccache=r
return r},
uc(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.h7(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
u6(a){var s,r,q,p=a.w
if(p!=null)return p
s=a.at
r=s.replace(/\*/g,"")
if(r===s)return a.w=new A.h5(a)
q=A.h7(v.typeUniverse,r,!0)
p=q.w
return a.w=p==null?q.w=new A.h5(q):p},
uH(a){return A.u6(A.h7(v.typeUniverse,a,!1))},
ti(a){var s,r,q,p,o=this
if(o===t.K)return A.d6(o,a,A.to)
if(!A.bN(o))if(!(o===t.c))s=!1
else s=!0
else s=!0
if(s)return A.d6(o,a,A.tr)
s=o.x
r=s===6?o.y:o
if(r===t.S)q=A.d7
else if(r===t.gR||r===t.di)q=A.tn
else if(r===t.N)q=A.tp
else q=r===t.y?A.nW:null
if(q!=null)return A.d6(o,a,q)
if(r.x===9){p=r.y
if(r.z.every(A.ul)){o.r="$i"+p
if(p==="I")return A.d6(o,a,A.tm)
return A.d6(o,a,A.tq)}}else if(s===7)return A.d6(o,a,A.tc)
return A.d6(o,a,A.ta)},
d6(a,b,c){a.b=c
return a.b(b)},
th(a){var s,r=this,q=A.t9
if(!A.bN(r))if(!(r===t.c))s=!1
else s=!0
else s=!0
if(s)q=A.rB
else if(r===t.K)q=A.rA
else{s=A.eK(r)
if(s)q=A.tb}r.a=q
return r.a(a)},
jL(a){var s,r=a.x
if(!A.bN(a))if(!(a===t.c))if(!(a===t.aw))if(r!==7)s=r===8&&A.jL(a.y)||a===t.a||a===t.T
else s=!0
else s=!0
else s=!0
else s=!0
return s},
ta(a){var s=this
if(a==null)return A.jL(s)
return A.af(v.typeUniverse,A.pH(a,s),null,s,null)},
tc(a){if(a==null)return!0
return this.y.b(a)},
tq(a){var s,r=this
if(a==null)return A.jL(r)
s=r.r
if(a instanceof A.B)return!!a[s]
return!!J.ca(a)[s]},
tm(a){var s,r=this
if(a==null)return A.jL(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.r
if(a instanceof A.B)return!!a[s]
return!!J.ca(a)[s]},
t9(a){var s,r=this
if(a==null){s=A.eK(r)
if(s)return a}else if(r.b(a))return a
A.pg(a,r)},
tb(a){var s=this
if(a==null)return a
else if(s.b(a))return a
A.pg(a,s)},
pg(a,b){throw A.e(A.rm(A.oX(a,A.pH(a,b),A.aV(b,null))))},
oX(a,b,c){var s=A.bP(a)
return s+": type '"+A.aV(b==null?A.P(a):b,null)+"' is not a subtype of type '"+c+"'"},
rm(a){return new A.ev("TypeError: "+a)},
aI(a,b){return new A.ev("TypeError: "+A.oX(a,null,b))},
to(a){return a!=null},
rA(a){if(a!=null)return a
throw A.e(A.aI(a,"Object"))},
tr(a){return!0},
rB(a){return a},
nW(a){return!0===a||!1===a},
j2(a){if(!0===a)return!0
if(!1===a)return!1
throw A.e(A.aI(a,"bool"))},
vo(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.e(A.aI(a,"bool"))},
vn(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.e(A.aI(a,"bool?"))},
rz(a){if(typeof a=="number")return a
throw A.e(A.aI(a,"double"))},
vq(a){if(typeof a=="number")return a
if(a==null)return a
throw A.e(A.aI(a,"double"))},
vp(a){if(typeof a=="number")return a
if(a==null)return a
throw A.e(A.aI(a,"double?"))},
d7(a){return typeof a=="number"&&Math.floor(a)===a},
i(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.e(A.aI(a,"int"))},
vr(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.e(A.aI(a,"int"))},
aT(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.e(A.aI(a,"int?"))},
tn(a){return typeof a=="number"},
bE(a){if(typeof a=="number")return a
throw A.e(A.aI(a,"num"))},
vs(a){if(typeof a=="number")return a
if(a==null)return a
throw A.e(A.aI(a,"num"))},
cD(a){if(typeof a=="number")return a
if(a==null)return a
throw A.e(A.aI(a,"num?"))},
tp(a){return typeof a=="string"},
n(a){if(typeof a=="string")return a
throw A.e(A.aI(a,"String"))},
vt(a){if(typeof a=="string")return a
if(a==null)return a
throw A.e(A.aI(a,"String"))},
ak(a){if(typeof a=="string")return a
if(a==null)return a
throw A.e(A.aI(a,"String?"))},
tH(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.aV(a[q],b)
return s},
pi(a4,a5,a6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3=", "
if(a6!=null){s=a6.length
if(a5==null){a5=A.o([],t.s)
r=null}else r=a5.length
q=a5.length
for(p=s;p>0;--p)B.a.q(a5,"T"+(q+p))
for(o=t.O,n=t.c,m="<",l="",p=0;p<s;++p,l=a3){k=a5.length
j=k-1-p
if(!(j>=0))return A.b(a5,j)
m=B.b.J(m+l,a5[j])
i=a6[p]
h=i.x
if(!(h===2||h===3||h===4||h===5||i===o))if(!(i===n))k=!1
else k=!0
else k=!0
if(!k)m+=" extends "+A.aV(i,a5)}m+=">"}else{m=""
r=null}o=a4.y
g=a4.z
f=g.a
e=f.length
d=g.b
c=d.length
b=g.c
a=b.length
a0=A.aV(o,a5)
for(a1="",a2="",p=0;p<e;++p,a2=a3)a1+=a2+A.aV(f[p],a5)
if(c>0){a1+=a2+"["
for(a2="",p=0;p<c;++p,a2=a3)a1+=a2+A.aV(d[p],a5)
a1+="]"}if(a>0){a1+=a2+"{"
for(a2="",p=0;p<a;p+=3,a2=a3){a1+=a2
if(b[p+1])a1+="required "
a1+=A.aV(b[p+2],a5)+" "+b[p]}a1+="}"}if(r!=null){a5.toString
a5.length=r}return m+"("+a1+") => "+a0},
aV(a,b){var s,r,q,p,o,n,m,l=a.x
if(l===5)return"erased"
if(l===2)return"dynamic"
if(l===3)return"void"
if(l===1)return"Never"
if(l===4)return"any"
if(l===6){s=A.aV(a.y,b)
return s}if(l===7){r=a.y
s=A.aV(r,b)
q=r.x
return(q===11||q===12?"("+s+")":s)+"?"}if(l===8)return"FutureOr<"+A.aV(a.y,b)+">"
if(l===9){p=A.tS(a.y)
o=a.z
return o.length>0?p+("<"+A.tH(o,b)+">"):p}if(l===11)return A.pi(a,b,null)
if(l===12)return A.pi(a.y,b,a.z)
if(l===13){n=a.y
m=b.length
n=m-1-n
if(!(n>=0&&n<m))return A.b(b,n)
return b[n]}return"?"},
tS(a){var s=v.mangledGlobalNames[a]
if(s!=null)return s
return"minified:"+a},
rx(a,b){var s=a.tR[b]
for(;typeof s=="string";)s=a.tR[s]
return s},
rw(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.h7(a,b,!1)
else if(typeof m=="number"){s=m
r=A.ex(a,5,"#")
q=A.iM(s)
for(p=0;p<s;++p)q[p]=r
o=A.ew(a,b,q)
n[b]=o
return o}else return m},
ru(a,b){return A.p6(a.tR,b)},
rt(a,b){return A.p6(a.eT,b)},
h7(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.p0(A.oZ(a,null,b,c))
r.set(b,s)
return s},
iK(a,b,c){var s,r,q=b.Q
if(q==null)q=b.Q=new Map()
s=q.get(c)
if(s!=null)return s
r=A.p0(A.oZ(a,b,c,!0))
q.set(c,r)
return r},
rv(a,b,c){var s,r,q,p=b.as
if(p==null)p=b.as=new Map()
s=c.at
r=p.get(s)
if(r!=null)return r
q=A.nL(a,b,c.x===10?c.z:[c])
p.set(s,q)
return q},
c1(a,b){b.a=A.th
b.b=A.ti
return b},
ex(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.b9(null,null)
s.x=b
s.at=c
r=A.c1(a,s)
a.eC.set(c,r)
return r},
p4(a,b,c){var s,r=b.at+"*",q=a.eC.get(r)
if(q!=null)return q
s=A.rr(a,b,r,c)
a.eC.set(r,s)
return s},
rr(a,b,c,d){var s,r,q
if(d){s=b.x
if(!A.bN(b))r=b===t.a||b===t.T||s===7||s===6
else r=!0
if(r)return b}q=new A.b9(null,null)
q.x=6
q.y=b
q.at=c
return A.c1(a,q)},
nN(a,b,c){var s,r=b.at+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.rq(a,b,r,c)
a.eC.set(r,s)
return s},
rq(a,b,c,d){var s,r,q,p
if(d){s=b.x
if(!A.bN(b))if(!(b===t.a||b===t.T))if(s!==7)r=s===8&&A.eK(b.y)
else r=!0
else r=!0
else r=!0
if(r)return b
else if(s===1||b===t.aw)return t.a
else if(s===6){q=b.y
if(q.x===8&&A.eK(q.y))return q
else return A.oO(a,b)}}p=new A.b9(null,null)
p.x=7
p.y=b
p.at=c
return A.c1(a,p)},
p3(a,b,c){var s,r=b.at+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.ro(a,b,r,c)
a.eC.set(r,s)
return s},
ro(a,b,c,d){var s,r,q
if(d){s=b.x
if(!A.bN(b))if(!(b===t.c))r=!1
else r=!0
else r=!0
if(r||b===t.K)return b
else if(s===1)return A.ew(a,"aD",[b])
else if(b===t.a||b===t.T)return t.eH}q=new A.b9(null,null)
q.x=8
q.y=b
q.at=c
return A.c1(a,q)},
rs(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.b9(null,null)
s.x=13
s.y=b
s.at=q
r=A.c1(a,s)
a.eC.set(q,r)
return r},
h6(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].at
return s},
rn(a){var s,r,q,p,o,n=a.length
for(s="",r="",q=0;q<n;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
s+=r+p+o+a[q+2].at}return s},
ew(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.h6(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.b9(null,null)
r.x=9
r.y=b
r.z=c
if(c.length>0)r.c=c[0]
r.at=p
q=A.c1(a,r)
a.eC.set(p,q)
return q},
nL(a,b,c){var s,r,q,p,o,n
if(b.x===10){s=b.y
r=b.z.concat(c)}else{r=c
s=b}q=s.at+(";<"+A.h6(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.b9(null,null)
o.x=10
o.y=s
o.z=r
o.at=q
n=A.c1(a,o)
a.eC.set(q,n)
return n},
p2(a,b,c){var s,r,q,p,o,n=b.at,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.h6(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.h6(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.rn(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.b9(null,null)
p.x=11
p.y=b
p.z=c
p.at=r
o=A.c1(a,p)
a.eC.set(r,o)
return o},
nM(a,b,c,d){var s,r=b.at+("<"+A.h6(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.rp(a,b,c,r,d)
a.eC.set(r,s)
return s},
rp(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.iM(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.x===1){r[p]=o;++q}}if(q>0){n=A.c8(a,b,r,0)
m=A.eI(a,c,r,0)
return A.nM(a,n,m,c!==m)}}l=new A.b9(null,null)
l.x=12
l.y=b
l.z=c
l.at=d
return A.c1(a,l)},
oZ(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
p0(a){var s,r,q,p,o,n,m,l,k,j,i,h=a.r,g=a.s
for(s=h.length,r=0;r<s;){q=h.charCodeAt(r)
if(q>=48&&q<=57)r=A.rg(r+1,q,h,g)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36)r=A.p_(a,r,h,g,!1)
else if(q===46)r=A.p_(a,r,h,g,!0)
else{++r
switch(q){case 44:break
case 58:g.push(!1)
break
case 33:g.push(!0)
break
case 59:g.push(A.c0(a.u,a.e,g.pop()))
break
case 94:g.push(A.rs(a.u,g.pop()))
break
case 35:g.push(A.ex(a.u,5,"#"))
break
case 64:g.push(A.ex(a.u,2,"@"))
break
case 126:g.push(A.ex(a.u,3,"~"))
break
case 60:g.push(a.p)
a.p=g.length
break
case 62:p=a.u
o=g.splice(a.p)
A.nK(a.u,a.e,o)
a.p=g.pop()
n=g.pop()
if(typeof n=="string")g.push(A.ew(p,n,o))
else{m=A.c0(p,a.e,n)
switch(m.x){case 11:g.push(A.nM(p,m,o,a.n))
break
default:g.push(A.nL(p,m,o))
break}}break
case 38:A.rh(a,g)
break
case 42:p=a.u
g.push(A.p4(p,A.c0(p,a.e,g.pop()),a.n))
break
case 63:p=a.u
g.push(A.nN(p,A.c0(p,a.e,g.pop()),a.n))
break
case 47:p=a.u
g.push(A.p3(p,A.c0(p,a.e,g.pop()),a.n))
break
case 40:g.push(a.p)
a.p=g.length
break
case 41:p=a.u
l=new A.fO()
k=p.sEA
j=p.sEA
n=g.pop()
if(typeof n=="number")switch(n){case-1:k=g.pop()
break
case-2:j=g.pop()
break
default:g.push(n)
break}else g.push(n)
o=g.splice(a.p)
A.nK(a.u,a.e,o)
a.p=g.pop()
l.a=o
l.b=k
l.c=j
g.push(A.p2(p,A.c0(p,a.e,g.pop()),l))
break
case 91:g.push(a.p)
a.p=g.length
break
case 93:o=g.splice(a.p)
A.nK(a.u,a.e,o)
a.p=g.pop()
g.push(o)
g.push(-1)
break
case 123:g.push(a.p)
a.p=g.length
break
case 125:o=g.splice(a.p)
A.rj(a.u,a.e,o)
a.p=g.pop()
g.push(o)
g.push(-2)
break
default:throw"Bad character "+q}}}i=g.pop()
return A.c0(a.u,a.e,i)},
rg(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
p_(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.x===10)o=o.y
n=A.rx(s,o.y)[p]
if(n==null)A.a5('No "'+p+'" in "'+A.qY(o)+'"')
d.push(A.iK(s,o,n))}else d.push(p)
return m},
rh(a,b){var s=b.pop()
if(0===s){b.push(A.ex(a.u,1,"0&"))
return}if(1===s){b.push(A.ex(a.u,4,"1&"))
return}throw A.e(A.hr("Unexpected extended operation "+A.c(s)))},
c0(a,b,c){if(typeof c=="string")return A.ew(a,c,a.sEA)
else if(typeof c=="number")return A.ri(a,b,c)
else return c},
nK(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.c0(a,b,c[s])},
rj(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.c0(a,b,c[s])},
ri(a,b,c){var s,r,q=b.x
if(q===10){if(c===0)return b.y
s=b.z
r=s.length
if(c<=r)return s[c-1]
c-=r
b=b.y
q=b.x}else if(c===0)return b
if(q!==9)throw A.e(A.hr("Indexed base must be an interface type"))
s=b.z
if(c<=s.length)return s[c-1]
throw A.e(A.hr("Bad index "+c+" for "+b.p(0)))},
af(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j
if(b===d)return!0
if(!A.bN(d))if(!(d===t.c))s=!1
else s=!0
else s=!0
if(s)return!0
r=b.x
if(r===4)return!0
if(A.bN(b))return!1
if(b.x!==1)s=!1
else s=!0
if(s)return!0
q=r===13
if(q)if(A.af(a,c[b.y],c,d,e))return!0
p=d.x
s=b===t.a||b===t.T
if(s){if(p===8)return A.af(a,b,c,d.y,e)
return d===t.a||d===t.T||p===7||p===6}if(d===t.K){if(r===8)return A.af(a,b.y,c,d,e)
if(r===6)return A.af(a,b.y,c,d,e)
return r!==7}if(r===6)return A.af(a,b.y,c,d,e)
if(p===6){s=A.oO(a,d)
return A.af(a,b,c,s,e)}if(r===8){if(!A.af(a,b.y,c,d,e))return!1
return A.af(a,A.oN(a,b),c,d,e)}if(r===7){s=A.af(a,t.a,c,d,e)
return s&&A.af(a,b.y,c,d,e)}if(p===8){if(A.af(a,b,c,d.y,e))return!0
return A.af(a,b,c,A.oN(a,d),e)}if(p===7){s=A.af(a,b,c,t.a,e)
return s||A.af(a,b,c,d.y,e)}if(q)return!1
s=r!==11
if((!s||r===12)&&d===t.Y)return!0
if(p===12){if(b===t.cj)return!0
if(r!==12)return!1
o=b.z
n=d.z
m=o.length
if(m!==n.length)return!1
c=c==null?o:o.concat(c)
e=e==null?n:n.concat(e)
for(l=0;l<m;++l){k=o[l]
j=n[l]
if(!A.af(a,k,c,j,e)||!A.af(a,j,e,k,c))return!1}return A.pl(a,b.y,c,d.y,e)}if(p===11){if(b===t.cj)return!0
if(s)return!1
return A.pl(a,b,c,d,e)}if(r===9){if(p!==9)return!1
return A.tl(a,b,c,d,e)}return!1},
pl(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
if(!A.af(a3,a4.y,a5,a6.y,a7))return!1
s=a4.z
r=a6.z
q=s.a
p=r.a
o=q.length
n=p.length
if(o>n)return!1
m=n-o
l=s.b
k=r.b
j=l.length
i=k.length
if(o+j<n+i)return!1
for(h=0;h<o;++h){g=q[h]
if(!A.af(a3,p[h],a7,g,a5))return!1}for(h=0;h<m;++h){g=l[h]
if(!A.af(a3,p[o+h],a7,g,a5))return!1}for(h=0;h<i;++h){g=l[m+h]
if(!A.af(a3,k[h],a7,g,a5))return!1}f=s.c
e=r.c
d=f.length
c=e.length
for(b=0,a=0;a<c;a+=3){a0=e[a]
for(;!0;){if(b>=d)return!1
a1=f[b]
b+=3
if(a0<a1)return!1
a2=f[b-2]
if(a1<a0){if(a2)return!1
continue}g=e[a+1]
if(a2&&!g)return!1
g=f[b-1]
if(!A.af(a3,e[a+2],a7,g,a5))return!1
break}}for(;b<d;){if(f[b+1])return!1
b+=3}return!0},
tl(a,b,c,d,e){var s,r,q,p,o,n,m,l=b.y,k=d.y
for(;l!==k;){s=a.tR[l]
if(s==null)return!1
if(typeof s=="string"){l=s
continue}r=s[k]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.iK(a,b,r[o])
return A.pa(a,p,null,c,d.z,e)}n=b.z
m=d.z
return A.pa(a,n,null,c,m,e)},
pa(a,b,c,d,e,f){var s,r,q,p=b.length
for(s=0;s<p;++s){r=b[s]
q=e[s]
if(!A.af(a,r,d,q,f))return!1}return!0},
eK(a){var s,r=a.x
if(!(a===t.a||a===t.T))if(!A.bN(a))if(r!==7)if(!(r===6&&A.eK(a.y)))s=r===8&&A.eK(a.y)
else s=!0
else s=!0
else s=!0
else s=!0
return s},
ul(a){var s
if(!A.bN(a))if(!(a===t.c))s=!1
else s=!0
else s=!0
return s},
bN(a){var s=a.x
return s===2||s===3||s===4||s===5||a===t.O},
p6(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
iM(a){return a>0?new Array(a):v.typeUniverse.sEA},
b9:function b9(a,b){var _=this
_.a=a
_.b=b
_.w=_.r=_.c=null
_.x=0
_.at=_.as=_.Q=_.z=_.y=null},
fO:function fO(){this.c=this.b=this.a=null},
h5:function h5(a){this.a=a},
fN:function fN(){},
ev:function ev(a){this.a=a},
r4(){var s,r,q={}
if(self.scheduleImmediate!=null)return A.tY()
if(self.MutationObserver!=null&&self.document!=null){s=self.document.createElement("div")
r=self.document.createElement("span")
q.a=null
new self.MutationObserver(A.df(new A.i8(q),1)).observe(s,{childList:true})
return new A.i7(q,s,r)}else if(self.setImmediate!=null)return A.tZ()
return A.u_()},
r5(a){self.scheduleImmediate(A.df(new A.i9(t.M.a(a)),0))},
r6(a){self.setImmediate(A.df(new A.ia(t.M.a(a)),0))},
r7(a){A.nH(B.a6,t.M.a(a))},
nH(a,b){var s=B.f.W(a.a,1000)
return A.rk(s<0?0:s,b)},
oU(a,b){var s=B.f.W(a.a,1000)
return A.rl(s<0?0:s,b)},
rk(a,b){var s=new A.eu(!0)
s.cF(a,b)
return s},
rl(a,b){var s=new A.eu(!1)
s.cG(a,b)
return s},
c7(a){return new A.fH(new A.ai($.a1,a.i("ai<0>")),a.i("fH<0>"))},
c5(a,b){a.$2(0,null)
b.b=!0
return b.a},
c2(a,b){A.rC(a,b)},
c4(a,b){b.bo(0,a)},
c3(a,b){b.aY(A.ag(a),A.bM(a))},
rC(a,b){var s,r,q=new A.j3(b),p=new A.j4(b)
if(a instanceof A.ai)a.bY(q,p,t.z)
else{s=t.z
if(t.k.b(a))a.bu(q,p,s)
else{r=new A.ai($.a1,t.e)
r.a=8
r.c=a
r.bY(q,p,s)}}},
c9(a){var s=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(r){e=r
d=c}}}(a,1)
return $.a1.ce(new A.kb(s),t.H,t.S,t.z)},
hs(a,b){var s=A.az(a,"error",t.K)
return new A.dp(s,b==null?A.nn(a):b)},
nn(a){var s
if(t.bU.b(a)){s=a.gaQ()
if(s!=null)return s}return B.a4},
cR(a,b,c){var s=new A.ai($.a1,c.i("ai<0>"))
A.oS(a,new A.hE(b,s,c))
return s},
ik(a,b){var s,r,q
for(s=t.e;r=a.a,(r&4)!==0;)a=s.a(a.c)
if((r&24)!==0){q=b.aT()
b.b7(a)
A.d2(b,q)}else{q=t.F.a(b.c)
b.a=b.a&1|4
b.c=a
a.bT(q)}},
d2(a,a0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c={},b=c.a=a
for(s=t.n,r=t.F,q=t.k;!0;){p={}
o=b.a
n=(o&16)===0
m=!n
if(a0==null){if(m&&(o&1)===0){l=s.a(b.c)
A.jT(l.a,l.b)}return}p.a=a0
k=a0.a
for(b=a0;k!=null;b=k,k=j){b.a=null
A.d2(c.a,b)
p.a=k
j=k.a}o=c.a
i=o.c
p.b=m
p.c=i
if(n){h=b.c
h=(h&1)!==0||(h&15)===8}else h=!0
if(h){g=b.b.b
if(m){o=o.b===g
o=!(o||o)}else o=!1
if(o){s.a(i)
A.jT(i.a,i.b)
return}f=$.a1
if(f!==g)$.a1=g
else f=null
b=b.c
if((b&15)===8)new A.it(p,c,m).$0()
else if(n){if((b&1)!==0)new A.is(p,i).$0()}else if((b&2)!==0)new A.ir(c,p).$0()
if(f!=null)$.a1=f
b=p.c
if(q.b(b)){o=p.a.$ti
o=o.i("aD<2>").b(b)||!o.z[1].b(b)}else o=!1
if(o){q.a(b)
e=p.a.b
if((b.a&24)!==0){d=r.a(e.c)
e.c=null
a0=e.aU(d)
e.a=b.a&30|e.a&1
e.c=b.c
c.a=b
continue}else A.ik(b,e)
return}}e=p.a.b
d=r.a(e.c)
e.c=null
a0=e.aU(d)
b=p.b
o=p.c
if(!b){e.$ti.c.a(o)
e.a=8
e.c=o}else{s.a(o)
e.a=e.a&1|16
e.c=o}c.a=e
b=e}},
tD(a,b){var s
if(t.ag.b(a))return b.ce(a,t.z,t.K,t.l)
s=t.bI
if(s.b(a))return s.a(a)
throw A.e(A.ok(a,"onError",u.c))},
tu(){var s,r
for(s=$.d8;s!=null;s=$.d8){$.eH=null
r=s.b
$.d8=r
if(r==null)$.eG=null
s.a.$0()}},
tM(){$.nX=!0
try{A.tu()}finally{$.eH=null
$.nX=!1
if($.d8!=null)$.od().$1(A.pA())}},
pp(a){var s=new A.fI(a),r=$.eG
if(r==null){$.d8=$.eG=s
if(!$.nX)$.od().$1(A.pA())}else $.eG=r.b=s},
tI(a){var s,r,q,p=$.d8
if(p==null){A.pp(a)
$.eH=$.eG
return}s=new A.fI(a)
r=$.eH
if(r==null){s.b=p
$.d8=$.eH=s}else{q=r.b
s.b=q
$.eH=r.b=s
if(q==null)$.eG=s}},
ur(a){var s=null,r=$.a1
if(B.o===r){A.da(s,s,B.o,a)
return}A.da(s,s,r,t.M.a(r.bm(a)))},
v5(a,b){A.az(a,"stream",t.K)
return new A.h_(b.i("h_<0>"))},
oS(a,b){var s=$.a1
if(s===B.o)return A.nH(a,t.M.a(b))
return A.nH(a,t.M.a(s.bm(b)))},
oT(a,b){var s=$.a1
if(s===B.o)return A.oU(a,t.cB.a(b))
return A.oU(a,t.cB.a(s.c0(b,t.x)))},
jT(a,b){A.tI(new A.jU(a,b))},
pn(a,b,c,d,e){var s,r=$.a1
if(r===c)return d.$0()
$.a1=c
s=r
try{r=d.$0()
return r}finally{$.a1=s}},
po(a,b,c,d,e,f,g){var s,r=$.a1
if(r===c)return d.$1(e)
$.a1=c
s=r
try{r=d.$1(e)
return r}finally{$.a1=s}},
tG(a,b,c,d,e,f,g,h,i){var s,r=$.a1
if(r===c)return d.$2(e,f)
$.a1=c
s=r
try{r=d.$2(e,f)
return r}finally{$.a1=s}},
da(a,b,c,d){t.M.a(d)
if(B.o!==c)d=c.bm(d)
A.pp(d)},
i8:function i8(a){this.a=a},
i7:function i7(a,b,c){this.a=a
this.b=b
this.c=c},
i9:function i9(a){this.a=a},
ia:function ia(a){this.a=a},
eu:function eu(a){this.a=a
this.b=null
this.c=0},
iJ:function iJ(a,b){this.a=a
this.b=b},
iI:function iI(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
fH:function fH(a,b){this.a=a
this.b=!1
this.$ti=b},
j3:function j3(a){this.a=a},
j4:function j4(a){this.a=a},
kb:function kb(a){this.a=a},
dp:function dp(a,b){this.a=a
this.b=b},
hE:function hE(a,b,c){this.a=a
this.b=b
this.c=c},
ec:function ec(){},
e9:function e9(a,b){this.a=a
this.$ti=b},
cz:function cz(a,b,c,d,e){var _=this
_.a=null
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
ai:function ai(a,b){var _=this
_.a=0
_.b=a
_.c=null
_.$ti=b},
ih:function ih(a,b){this.a=a
this.b=b},
iq:function iq(a,b){this.a=a
this.b=b},
il:function il(a){this.a=a},
im:function im(a){this.a=a},
io:function io(a,b,c){this.a=a
this.b=b
this.c=c},
ij:function ij(a,b){this.a=a
this.b=b},
ip:function ip(a,b){this.a=a
this.b=b},
ii:function ii(a,b,c){this.a=a
this.b=b
this.c=c},
it:function it(a,b,c){this.a=a
this.b=b
this.c=c},
iu:function iu(a){this.a=a},
is:function is(a,b){this.a=a
this.b=b},
ir:function ir(a,b){this.a=a
this.b=b},
fI:function fI(a){this.a=a
this.b=null},
e2:function e2(){},
i1:function i1(a,b){this.a=a
this.b=b},
i2:function i2(a,b){this.a=a
this.b=b},
ft:function ft(){},
fu:function fu(){},
h_:function h_(a){this.$ti=a},
eA:function eA(){},
jU:function jU(a,b){this.a=a
this.b=b},
fX:function fX(){},
iD:function iD(a,b){this.a=a
this.b=b},
iE:function iE(a,b,c){this.a=a
this.b=b
this.c=c},
qP(a,b,c,d){if(b==null){if(a==null)return new A.aL(c.i("@<0>").A(d).i("aL<1,2>"))}else if(a==null)a=A.u4()
return A.re(A.u3(),a,b,c,d)},
G(a,b,c){return b.i("@<0>").A(c).i("nz<1,2>").a(A.u9(a,new A.aL(b.i("@<0>").A(c).i("aL<1,2>"))))},
Y(a,b){return new A.aL(a.i("@<0>").A(b).i("aL<1,2>"))},
re(a,b,c,d,e){var s=c!=null?c:new A.iB(d)
return new A.eh(a,b,s,d.i("@<0>").A(e).i("eh<1,2>"))},
fe(a){return new A.cB(a.i("cB<0>"))},
qQ(a){return new A.cB(a.i("cB<0>"))},
nJ(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
rf(a,b,c){var s=new A.cC(a,b,c.i("cC<0>"))
s.c=a.e
return s},
rP(a,b){return J.q(a,b)},
rQ(a){return J.eP(a)},
qJ(a,b,c){var s,r
if(A.nY(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.o([],t.s)
B.a.q($.aX,a)
try{A.ts(a,s)}finally{if(0>=$.aX.length)return A.b($.aX,-1)
$.aX.pop()}r=A.nF(b,t.R.a(s),", ")+c
return r.charCodeAt(0)==0?r:r},
nu(a,b,c){var s,r
if(A.nY(a))return b+"..."+c
s=new A.cu(b)
B.a.q($.aX,a)
try{r=s
r.a=A.nF(r.a,a,", ")}finally{if(0>=$.aX.length)return A.b($.aX,-1)
$.aX.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
nY(a){var s,r
for(s=$.aX.length,r=0;r<s;++r)if(a===$.aX[r])return!0
return!1},
ts(a,b){var s,r,q,p,o,n,m,l=a.gv(a),k=0,j=0
while(!0){if(!(k<80||j<3))break
if(!l.n())return
s=A.c(l.gt())
B.a.q(b,s)
k+=s.length+2;++j}if(!l.n()){if(j<=5)return
if(0>=b.length)return A.b(b,-1)
r=b.pop()
if(0>=b.length)return A.b(b,-1)
q=b.pop()}else{p=l.gt();++j
if(!l.n()){if(j<=4){B.a.q(b,A.c(p))
return}r=A.c(p)
if(0>=b.length)return A.b(b,-1)
q=b.pop()
k+=r.length+2}else{o=l.gt();++j
for(;l.n();p=o,o=n){n=l.gt();++j
if(j>100){while(!0){if(!(k>75&&j>3))break
if(0>=b.length)return A.b(b,-1)
k-=b.pop().length+2;--j}B.a.q(b,"...")
return}}q=A.c(p)
r=A.c(o)
k+=r.length+q.length+4}}if(j>b.length+2){k+=5
m="..."}else m=null
while(!0){if(!(k>80&&b.length>3))break
if(0>=b.length)return A.b(b,-1)
k-=b.pop().length+2
if(m==null){k+=5
m="..."}}if(m!=null)B.a.q(b,m)
B.a.q(b,q)
B.a.q(b,r)},
ac(a,b,c){var s=A.qP(null,null,b,c)
J.dl(a,new A.hL(s,b,c))
return s},
nA(a,b){var s,r,q=A.fe(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.N)(a),++r)q.q(0,b.a(a[r]))
return q},
qR(a,b){var s=t.e8
return J.og(s.a(a),s.a(b))},
hM(a){var s,r={}
if(A.nY(a))return"{...}"
s=new A.cu("")
try{B.a.q($.aX,a)
s.a+="{"
r.a=!0
J.dl(a,new A.hN(r,s))
s.a+="}"}finally{if(0>=$.aX.length)return A.b($.aX,-1)
$.aX.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
eh:function eh(a,b,c,d){var _=this
_.w=a
_.x=b
_.y=c
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=d},
iB:function iB(a){this.a=a},
cB:function cB(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
fU:function fU(a){this.a=a
this.c=this.b=null},
cC:function cC(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
dG:function dG(){},
hL:function hL(a,b,c){this.a=a
this.b=b
this.c=c},
dN:function dN(){},
v:function v(){},
dP:function dP(){},
hN:function hN(a,b){this.a=a
this.b=b},
M:function M(){},
hO:function hO(a){this.a=a},
ej:function ej(a,b){this.a=a
this.$ti=b},
ek:function ek(a,b,c){var _=this
_.a=a
_.b=b
_.c=null
_.$ti=c},
ey:function ey(){},
cU:function cU(){},
e7:function e7(){},
bl:function bl(){},
er:function er(){},
ei:function ei(){},
d4:function d4(){},
eC:function eC(){},
ty(a,b){var s,r,q,p=null
try{p=JSON.parse(a)}catch(r){s=A.ag(r)
q=A.f3(String(s),null)
throw A.e(q)}q=A.jq(p)
return q},
jq(a){var s
if(a==null)return null
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new A.fS(a,Object.create(null))
for(s=0;s<a.length;++s)a[s]=A.jq(a[s])
return a},
oD(a,b,c){return new A.dK(a,b)},
rR(a){return a.dO()},
rc(a,b){return new A.iy(a,[],A.u5())},
rd(a,b,c){var s,r=new A.cu(""),q=A.rc(r,b)
q.b0(a)
s=r.a
return s.charCodeAt(0)==0?s:s},
fS:function fS(a,b){this.a=a
this.b=b
this.c=null},
ix:function ix(a){this.a=a},
fT:function fT(a){this.a=a},
bx:function bx(){},
cO:function cO(){},
f_:function f_(){},
dK:function dK(a,b){this.a=a
this.b=b},
fa:function fa(a,b){this.a=a
this.b=b},
f9:function f9(){},
fc:function fc(a){this.b=a},
fb:function fb(a){this.a=a},
iz:function iz(){},
iA:function iA(a,b){this.a=a
this.b=b},
iy:function iy(a,b,c){this.c=a
this.a=b
this.b=c},
fD:function fD(){},
fE:function fE(){},
iL:function iL(a){this.b=0
this.c=a},
ow(a,b){return A.qV(a,b,null)},
dh(a){var s=A.a4(a,null)
if(s!=null)return s
throw A.e(A.f3(a,null))},
qH(a){if(a instanceof A.cg)return a.p(0)
return"Instance of '"+A.hW(a)+"'"},
qI(a,b){a=A.e(a)
if(a==null)a=t.K.a(a)
a.stack=b.p(0)
throw a
throw A.e("unreachable")},
cT(a,b,c,d){var s,r=c?J.nv(a,d):J.oA(a,d)
if(a!==0&&b!=null)for(s=0;s<r.length;++s)r[s]=b
return r},
a7(a,b,c){var s,r=A.o([],c.i("a3<0>"))
for(s=J.T(a);s.n();)B.a.q(r,c.a(s.gt()))
if(b)return r
return J.hH(r,c)},
a8(a,b,c){var s
if(b)return A.oF(a,c)
s=J.hH(A.oF(a,c),c)
return s},
oF(a,b){var s,r
if(Array.isArray(a))return A.o(a.slice(0),b.i("a3<0>"))
s=A.o([],b.i("a3<0>"))
for(r=J.T(a);r.n();)B.a.q(s,r.gt())
return s},
aq(a){return new A.dJ(a,A.nw(a,!1,!0,!1,!1,!1))},
nF(a,b,c){var s=J.T(b)
if(!s.n())return a
if(c.length===0){do a+=A.c(s.gt())
while(s.n())}else{a+=A.c(s.gt())
for(;s.n();)a=a+c+A.c(s.gt())}return a},
oG(a,b,c,d){return new A.fl(a,b,c,d)},
p5(a,b,c,d){var s,r,q,p,o,n,m="0123456789ABCDEF"
if(c===B.G){s=$.q8().b
s=s.test(b)}else s=!1
if(s)return b
A.x(c).i("bx.S").a(b)
r=c.gbp().dg(b)
for(s=r.length,q=0,p="";q<s;++q){o=r[q]
if(o<128){n=o>>>4
if(!(n<8))return A.b(a,n)
n=(a[n]&1<<(o&15))!==0}else n=!1
if(n)p+=A.ap(o)
else p=p+"%"+m[o>>>4&15]+m[o&15]}return p.charCodeAt(0)==0?p:p},
ot(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=$.pT().a6(a)
if(c!=null){s=new A.hw()
r=c.b
if(1>=r.length)return A.b(r,1)
q=r[1]
q.toString
p=A.dh(q)
if(2>=r.length)return A.b(r,2)
q=r[2]
q.toString
o=A.dh(q)
if(3>=r.length)return A.b(r,3)
q=r[3]
q.toString
n=A.dh(q)
if(4>=r.length)return A.b(r,4)
m=s.$1(r[4])
if(5>=r.length)return A.b(r,5)
l=s.$1(r[5])
if(6>=r.length)return A.b(r,6)
k=s.$1(r[6])
if(7>=r.length)return A.b(r,7)
j=new A.hx().$1(r[7])
i=B.f.W(j,1000)
q=r.length
if(8>=q)return A.b(r,8)
if(r[8]!=null){if(9>=q)return A.b(r,9)
h=r[9]
if(h!=null){g=h==="-"?-1:1
if(10>=q)return A.b(r,10)
q=r[10]
q.toString
f=A.dh(q)
if(11>=r.length)return A.b(r,11)
l-=g*(s.$1(r[11])+60*f)}e=!0}else e=!1
d=A.qW(p,o,n,m,l,k,i+B.i.aO(j%1000/1000),e)
if(d==null)throw A.e(A.f3("Time out of range",a))
return A.oq(d,e)}else throw A.e(A.f3("Invalid date format",a))},
qF(a){var s,r
try{s=A.ot(a)
return s}catch(r){if(A.ag(r) instanceof A.f2)return null
else throw r}},
oq(a,b){var s
if(Math.abs(a)<=864e13)s=!1
else s=!0
if(s)A.a5(A.bv("DateTime is outside valid range: "+a,null))
A.az(b,"isUtc",t.y)
return new A.aQ(a,b)},
or(a){var s=Math.abs(a),r=a<0?"-":""
if(s>=1000)return""+a
if(s>=100)return r+"0"+s
if(s>=10)return r+"00"+s
return r+"000"+s},
qE(a){var s=Math.abs(a),r=a<0?"-":"+"
if(s>=1e5)return r+s
return r+"0"+s},
os(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
by(a){if(a>=10)return""+a
return"0"+a},
cj(a){return new A.aC(1000*a)},
bP(a){if(typeof a=="number"||A.nW(a)||a==null)return J.m(a)
if(typeof a=="string")return JSON.stringify(a)
return A.qH(a)},
hr(a){return new A.dn(a)},
bv(a,b){return new A.b3(!1,null,b,a)},
ok(a,b,c){return new A.b3(!0,a,b,c)},
eU(a,b,c){return a},
qX(a){var s=null
return new A.cW(s,s,!1,s,s,a)},
hX(a,b){return new A.cW(null,null,!0,a,b,"Value not in range")},
ab(a,b,c,d,e){return new A.cW(b,c,!0,a,d,"Invalid value")},
hY(a,b,c){if(0>a||a>c)throw A.e(A.ab(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.e(A.ab(b,a,c,"end",null))
return b}return c},
aN(a,b){if(a<0)throw A.e(A.ab(a,0,null,b,null))
return a},
cS(a,b,c,d,e){var s=A.i(e==null?J.W(b):e)
return new A.f4(s,!0,a,c,"Index out of range")},
K(a){return new A.fC(a)},
nI(a){return new A.fA(a)},
ct(a){return new A.cs(a)},
a9(a){return new A.eX(a)},
f3(a,b){return new A.f2(a,b)},
oH(a,b,c,d){var s,r=B.i.gL(a)
b=B.i.gL(b)
c=B.i.gL(c)
d=B.i.gL(d)
s=$.q9()
return A.r1(A.i3(A.i3(A.i3(A.i3(s,r),b),c),d))},
bg(a){A.uq(a)},
hQ:function hQ(a,b){this.a=a
this.b=b},
aQ:function aQ(a,b){this.a=a
this.b=b},
hw:function hw(){},
hx:function hx(){},
aC:function aC(a){this.a=a},
id:function id(){},
V:function V(){},
dn:function dn(a){this.a=a},
bX:function bX(){},
fm:function fm(){},
b3:function b3(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
cW:function cW(a,b,c,d,e,f){var _=this
_.e=a
_.f=b
_.a=c
_.b=d
_.c=e
_.d=f},
f4:function f4(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
fl:function fl(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
fC:function fC(a){this.a=a},
fA:function fA(a){this.a=a},
cs:function cs(a){this.a=a},
eX:function eX(a){this.a=a},
fn:function fn(){},
e0:function e0(){},
eY:function eY(a){this.a=a},
ig:function ig(a){this.a=a},
f2:function f2(a,b){this.a=a
this.b=b},
k:function k(){},
Z:function Z(){},
U:function U(a,b,c){this.a=a
this.b=b
this.$ti=c},
ah:function ah(){},
B:function B(){},
h2:function h2(){},
cu:function cu(a){this.a=a},
r8(a,b){if(t.h.b(b))if(b.parentNode===a){a.removeChild(b)
return!0}return!1},
qG(a,b,c){var s,r=document.body
r.toString
s=t.ac
s=new A.a_(new A.av(B.J.ab(r,a,b,c)),s.i("y(v.E)").a(new A.hA()),s.i("a_<v.E>"))
return t.h.a(s.gap(s))},
dw(a){var s,r,q="element tag unavailable"
try{s=J.aK(a)
s.gcf(a)
q=s.gcf(a)}catch(r){}return q},
ns(a,b,c){var s,r,q,p=new A.ai($.a1,t.ao),o=new A.e9(p,t.bj),n=new XMLHttpRequest()
B.ad.dv(n,b,a,!0)
c.K(0,new A.hF(n))
s=t.gx
r=s.a(new A.hG(n,o))
t.Z.a(null)
q=t.gZ
A.l(n,"load",r,!1,q)
A.l(n,"error",s.a(o.gde()),!1,q)
n.send()
return p},
nt(){var s=document.createElement("img")
return s},
aj(a){var s,r=document.createElement("input"),q=t.gk.a(r)
if(a!=null)try{J.qq(q,a)}catch(s){}return q},
cq(a,b,c,d){var s=new Option(a,b,c,!1)
return s},
l(a,b,c,d,e){var s=A.px(new A.ie(c),t.B),r=s!=null
if(r&&!0){t.bw.a(s)
if(r)J.qc(a,b,s,!1)}return new A.eg(a,b,s,!1,e.i("eg<0>"))},
oY(a){var s=document.createElement("a"),r=new A.fY(s,t.a_.a(window.location))
r=new A.cA(r)
r.cD(a)
return r},
ra(a,b,c,d){t.h.a(a)
A.n(b)
A.n(c)
t.cr.a(d)
return!0},
rb(a,b,c,d){var s,r,q
t.h.a(a)
A.n(b)
A.n(c)
s=t.cr.a(d).a
r=s.a
B.V.sdn(r,c)
q=r.hostname
s=s.b
if(!(q==s.hostname&&r.port===s.port&&r.protocol===s.protocol))if(q==="")if(r.port===""){s=r.protocol
s=s===":"||s===""}else s=!1
else s=!1
else s=!0
return s},
p1(){var s=t.N,r=A.nA(B.Q,s),q=A.o(["TEMPLATE"],t.s),p=t.u.a(new A.iH())
s=new A.h4(r,A.fe(s),A.fe(s),A.fe(s),null)
s.cE(null,new A.R(B.Q,p,t.I),q,null)
return s},
bG(a){var s
if("postMessage" in a){s=A.r9(a)
return s}else return t.ch.a(a)},
r9(a){if(a===window)return t.ci.a(a)
else return new A.fL()},
px(a,b){var s=$.a1
if(s===B.o)return a
return s.c0(a,b)},
r:function r(){},
cK:function cK(){},
eT:function eT(){},
cL:function cL(){},
cc:function cc(){},
cd:function cd(){},
ce:function ce(){},
bi:function bi(){},
cP:function cP(){},
hv:function hv(){},
ch:function ch(){},
ci:function ci(){},
hy:function hy(){},
eZ:function eZ(){},
dt:function dt(){},
hz:function hz(){},
eb:function eb(a,b){this.a=a
this.b=b},
E:function E(){},
hA:function hA(){},
p:function p(){},
O:function O(){},
f1:function f1(){},
dA:function dA(){},
bQ:function bQ(){},
dB:function dB(){},
bR:function bR(){},
hF:function hF(a){this.a=a},
hG:function hG(a,b){this.a=a
this.b=b},
dC:function dC(){},
dD:function dD(){},
dE:function dE(){},
bS:function bS(){},
b5:function b5(){},
dM:function dM(){},
dO:function dO(){},
aG:function aG(){},
av:function av(a){this.a=a},
t:function t(){},
dS:function dS(){},
dV:function dV(){},
dW:function dW(){},
b8:function b8(){},
dZ:function dZ(){},
cr:function cr(){},
e1:function e1(){},
i_:function i_(a){this.a=a},
i0:function i0(a){this.a=a},
e4:function e4(){},
fw:function fw(){},
fx:function fx(){},
cZ:function cZ(){},
e6:function e6(){},
bn:function bn(){},
bZ:function bZ(){},
bo:function bo(){},
d0:function d0(){},
ed:function ed(){},
em:function em(){},
fJ:function fJ(){},
fM:function fM(a){this.a=a},
nr:function nr(a,b){this.a=a
this.$ti=b},
ef:function ef(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
d1:function d1(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
eg:function eg(a,b,c,d,e){var _=this
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
ie:function ie(a){this.a=a},
cA:function cA(a){this.a=a},
as:function as(){},
dT:function dT(a){this.a=a},
hS:function hS(a){this.a=a},
hR:function hR(a,b,c){this.a=a
this.b=b
this.c=c},
es:function es(){},
iF:function iF(){},
iG:function iG(){},
h4:function h4(a,b,c,d,e){var _=this
_.e=a
_.a=b
_.b=c
_.c=d
_.d=e},
iH:function iH(){},
h3:function h3(){},
ck:function ck(a,b,c){var _=this
_.a=a
_.b=b
_.c=-1
_.d=null
_.$ti=c},
fL:function fL(){},
fY:function fY(a,b){this.a=a
this.b=b},
ez:function ez(a){this.a=a
this.b=0},
iN:function iN(a){this.a=a},
fK:function fK(){},
fQ:function fQ(){},
fR:function fR(){},
fV:function fV(){},
fW:function fW(){},
fZ:function fZ(){},
h8:function h8(){},
h9:function h9(){},
np(){return window.navigator.userAgent},
f0:function f0(a,b){this.a=a
this.b=b},
hB:function hB(){},
hC:function hC(){},
hD:function hD(){},
dL:function dL(){},
rI(a,b,c,d){var s,r,q
A.j2(b)
t.j.a(d)
if(b){s=[c]
B.a.T(s,d)
d=s}r=t.z
q=A.a7(J.b2(d,A.um(),r),!0,r)
return A.hc(A.ow(t.Y.a(a),q))},
oC(a){var s=A.o4(new (A.hc(a))())
return s},
rK(a){return a},
nQ(a,b,c){var s
try{if(Object.isExtensible(a)&&!Object.prototype.hasOwnProperty.call(a,b)){Object.defineProperty(a,b,{value:c})
return!0}}catch(s){}return!1},
pk(a,b){if(Object.prototype.hasOwnProperty.call(a,b))return a[b]
return null},
hc(a){if(a==null||typeof a=="string"||typeof a=="number"||A.nW(a))return a
if(a instanceof A.aE)return a.a
if(A.pI(a))return a
if(t.ak.b(a))return a
if(a instanceof A.aQ)return A.aM(a)
if(t.Y.b(a))return A.pj(a,"$dart_jsFunction",new A.js())
return A.pj(a,"_$dart_jsObject",new A.jt($.of()))},
pj(a,b,c){var s=A.pk(a,b)
if(s==null){s=c.$1(a)
A.nQ(a,b,s)}return s},
jr(a){var s,r
if(a==null||typeof a=="string"||typeof a=="number"||typeof a=="boolean")return a
else if(a instanceof Object&&A.pI(a))return a
else if(a instanceof Object&&t.ak.b(a))return a
else if(a instanceof Date){s=A.i(a.getTime())
if(Math.abs(s)<=864e13)r=!1
else r=!0
if(r)A.a5(A.bv("DateTime is outside valid range: "+s,null))
A.az(!1,"isUtc",t.y)
return new A.aQ(s,!1)}else if(a.constructor===$.of())return a.o
else return A.o4(a)},
o4(a){if(typeof a=="function")return A.nS(a,$.hj(),new A.kc())
if(a instanceof Array)return A.nS(a,$.oe(),new A.kd())
return A.nS(a,$.oe(),new A.ke())},
nS(a,b,c){var s=A.pk(a,b)
if(s==null||!(a instanceof Object)){s=c.$1(a)
A.nQ(a,b,s)}return s},
rN(a){var s,r=a.$dart_jsFunction
if(r!=null)return r
s=function(b,c){return function(){return b(c,Array.prototype.slice.apply(arguments))}}(A.rJ,a)
s[$.hj()]=a
a.$dart_jsFunction=s
return s},
rJ(a,b){t.j.a(b)
return A.ow(t.Y.a(a),b)},
kg(a,b){if(typeof a=="function")return a
else return b.a(A.rN(a))},
js:function js(){},
jt:function jt(a){this.a=a},
kc:function kc(){},
kd:function kd(){},
ke:function ke(){},
aE:function aE(a){this.a=a},
bU:function bU(a){this.a=a},
cm:function cm(a,b){this.a=a
this.$ti=b},
d3:function d3(){},
iv:function iv(){},
cX:function cX(){},
u:function u(){},
uo(){A.hh()
if(!A.am(A.tF()))A.o5()
A.tO()
A.pG()},
o0(){switch($.bb){case B.x:A.o5()
break
case B.j:A.de()
break
case B.m:A.cH()
break
case B.C:A.bu()
break
case B.E:A.hi()
break
case B.F:A.oa()
break}},
D(a){var s,r
if(a!=null)$.o_=a
if($.nP)return
$.nP=!0
s=window
r=t.d9.a(new A.jp())
B.t.cQ(s)
r=A.px(r,t.di)
r.toString
B.t.d_(s,r)},
rF(){var s,r,q=$.bb,p=$.ax,o=$.at,n=$.H,m=$.b_,l=$.b0,k=$.aA,j=$.eM,i=$.eN,h=$.aY,g=$.a6,f=$.aB,e=$.cI,d=t.N
e=e.aM(e,new A.jf(),d,d)
s=$.bc
r=$.bh
r=r==null?null:r.cg()
return A.G(["view",q.b,"isCommander",p,"startingLife",o,"currentPlayerIndex",n,"gameStarted",m,"turnCount",l,"currentPhaseIndex",k,"trackEnergy",j,"trackExp",i,"newPlayerMode",h,"trackerPlayerIndex",g,"trackerZone",f,"trackerNotes",e,"effectTarget",s,"turnStartTime",r,"longestTurnSeconds",$.c6,"longestTurnPlayer",$.cE,"firstBloodPlayer",$.bH,"lifeGained",$.aU,"cardsPlayed",$.aw,"poisonDealt",$.d9,"lastLifeValues",$.bI,"lifeHistory",$.bJ,"players",$.d,"gameLog",$.bL,"plainLog",$.bt,"tempEffects",$.db,"combatAttackers",$.a2,"combatLog",$.ad,"combatPhase",$.X,"inCombat",$.ae],d,t.z)},
tR(a){var s
if($.nU)return
s=B.p.aH(a,null)
if($.bd.length!==0&&B.a.gaK($.bd)===s)return
B.a.q($.bd,s)
if($.bd.length>80)B.a.bs($.bd,0)},
tz(){var s,r,q=!0
try{s=A.rF()
window.localStorage.setItem("mtg_operator_state",B.p.aH(s,null))
if(A.am(q))A.tR(s)}catch(r){}},
p9(a,b){var s,r,q,p,o,n,m,l=null,k="effectTarget"
$.ax=J.q(a.h(0,"isCommander"),!0)
s=A.cD(a.h(0,"startingLife"))
s=s==null?l:B.i.R(s)
$.at=s==null?40:s
s=A.cD(a.h(0,"currentPlayerIndex"))
s=s==null?l:B.i.R(s)
$.H=s==null?0:s
$.b_=J.q(a.h(0,"gameStarted"),!0)
s=A.cD(a.h(0,"turnCount"))
s=s==null?l:B.i.R(s)
$.b0=s==null?1:s
s=A.cD(a.h(0,"currentPhaseIndex"))
s=s==null?l:B.i.R(s)
$.aA=s==null?0:s
$.eM=J.q(a.h(0,"trackEnergy"),!0)
$.eN=J.q(a.h(0,"trackExp"),!0)
$.aY=J.q(a.h(0,"newPlayerMode"),!0)
s=A.cD(a.h(0,"trackerPlayerIndex"))
s=s==null?l:B.i.R(s)
$.a6=s==null?0:s
s=A.ak(a.h(0,"trackerZone"))
$.aB=s==null?"battlefield":s
$.bc=a.h(0,k)!=null?A.ac(t.f.a(a.h(0,k)),t.N,t.z):l
s=t.S
r=t.N
$.cI=A.Y(s,r)
q=t.U
p=q.a(a.h(0,"trackerNotes"))
if(p==null)p=B.v
o=t.z
A.ac(p,r,o).K(0,new A.iS())
n=A.ak(a.h(0,"turnStartTime"))
$.bh=n!=null&&n.length!==0?A.qF(n):l
p=A.cD(a.h(0,"longestTurnSeconds"))
p=p==null?l:B.i.R(p)
$.c6=p==null?0:p
p=A.ak(a.h(0,"longestTurnPlayer"))
$.cE=p==null?"":p
p=A.ak(a.h(0,"firstBloodPlayer"))
$.bH=p==null?"":p
p=q.a(a.h(0,"lifeGained"))
if(p==null)p=B.v
$.aU=A.ac(J.dm(p,new A.iT(),o,o),r,s)
p=q.a(a.h(0,"cardsPlayed"))
if(p==null)p=B.v
$.aw=A.ac(J.dm(p,new A.iU(),o,o),r,s)
q=q.a(a.h(0,"poisonDealt"))
if(q==null)q=B.v
$.d9=A.ac(J.dm(q,new A.iV(),o,o),r,s)
q=t.g
p=q.a(a.h(0,"lastLifeValues"))
if(p==null)p=B.n
$.bI=A.a7(J.b2(p,new A.iW(),o),!0,s)
s=q.a(a.h(0,"lifeHistory"))
if(s==null)s=B.n
$.bJ=A.a7(J.b2(s,new A.iX(),o),!0,t.bW)
s=q.a(a.h(0,"players"))
if(s==null)s=B.n
p=t.P
$.d=A.a7(J.b2(s,new A.iY(),o),!0,p)
s=q.a(a.h(0,"gameLog"))
$.bL=A.a7(s==null?B.n:s,!0,r)
s=q.a(a.h(0,"plainLog"))
$.bt=A.a7(s==null?B.n:s,!0,r)
s=q.a(a.h(0,"tempEffects"))
if(s==null)s=B.n
$.db=A.a7(J.b2(s,new A.iZ(),o),!0,p)
p=q.a(a.h(0,"combatLog"))
$.ad=A.a7(p==null?B.n:p,!0,r)
s=A.cD(a.h(0,"combatPhase"))
s=s==null?l:B.i.R(s)
$.X=s==null?0:s
$.ae=J.q(a.h(0,"inCombat"),!0)
s=q.a(a.h(0,"combatAttackers"))
$.a2=A.tE(s==null?B.n:s)
m=A.ak(a.h(0,"view"))
if(m==null)m="game"
s=t.dW
s=A.cN(new A.a_(B.aq,t.bO.a(new A.j_(m)),s),s.i("k.E"),t.dj).an(0,new A.j0(),new A.j1())
s.toString
$.bb=s
if(b)A.o0()},
tF(){var s,r,q,p,o,n
try{s=window.localStorage.getItem("mtg_operator_state")
if(s==null||J.W(s)===0)return!1
r=A.ac(t.f.a(B.p.al(0,s,null)),t.N,t.z)
if(J.q(J.a(r,"gameStarted"),!0)){p=t.g.a(J.a(r,"players"))
o=J.hn(p==null?B.n:p)}else o=!1
q=o
if(!A.am(q))return!1
A.p9(r,!0)
B.a.C($.bd)
B.a.q($.bd,B.p.aH(r,null))
return!0}catch(n){return!1}},
pu(a){var s
if($.bd.length<2)return!1
$.bd.pop()
s=A.ac(t.f.a(B.p.al(0,B.a.gaK($.bd),null)),t.N,t.z)
$.nU=!0
A.p9(s,!1)
if(a!=null)$.bb=a
A.aW()
A.o0()
$.nU=!1
return!0},
tE(a2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=null,a1=A.o([],t.t)
for(s=J.T(a2),r=t.N,q=t.z,p=t.P,o=t.g,n=t.fO,m=t.Q,l=t.f,k=t.U;s.n();){j=A.ac(l.a(s.gt()),r,q)
i=k.a(j.h(0,"card"))
h=A.ac(i==null?B.v:i,r,q)
i=h.h(0,"id")
g=i==null?a0:J.m(i)
if(g==null)g=""
i=h.h(0,"name")
f=i==null?a0:J.m(i)
if(f==null)f=""
for(i=$.d,e=i.length,d=a0,c=0;c<i.length;i.length===e||(0,A.N)(i),++c){b=J.eO(n.a(J.a(i[c],"cards")),m)
d=b.an(b,new A.jO(g,f),new A.jP())
if(d!=null)break}if(d==null)continue
i=o.a(j.h(0,"blockers"))
if(i==null)i=B.n
a=A.a7(J.b2(i,new A.jQ(),q),!0,p)
i=A.cD(j.h(0,"targetIdx"))
i=i==null?a0:B.i.R(i)
B.a.q(a1,A.G(["card",d,"targetIdx",i==null?0:i,"blockers",a],r,q))}return a1},
nZ(b3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0="name",b1="keywords",b2="tempPtBonus"
if($.bh!=null&&$.d.length!==0){s=B.f.W(A.cj(Date.now()-$.bh.a).a,1e6)
r=$.d
q=$.H
if(!(q>=0&&q<r.length))return A.b(r,q)
p=A.n(J.a(r[q],b0))
o=B.f.W(s,60)
n=B.f.az(s,60)
m=o>0?""+o+"m "+B.b.aN(B.f.p(n),2,"0")+"s":""+n+"s"
A.w(p+"'s turn lasted "+m,p+"'s turn took "+m+".")
if(s>$.c6){$.c6=s
$.cE=p}}for(r=$.db,q=r.length,l=t.j,k=t.P,j=t.N,i=t.g,h=0;h<r.length;r.length===q||(0,A.N)(r),++h){g=r[h]
f=J.j(g)
e=i.a(f.h(g,"targetIds"))
if(e==null)e=B.n
d=A.aT(f.h(g,"ptBonus"))
if(d==null)d=0
f=i.a(f.h(g,b1))
c=A.a7(f==null?B.n:f,!0,j)
for(f=$.d,b=f.length,a=d!==0,a0=J.j(e),a1=0;a1<f.length;f.length===b||(0,A.N)(f),++a1)for(a2=J.T(l.a(J.a(f[a1],"cards")));a2.n();){a3=k.a(a2.gt())
a4=J.j(a3)
if(!a0.l(e,a4.h(a3,"id")))continue
if(a&&a4.h(a3,b2)!=null)a4.k(a3,b2,A.i(a4.h(a3,b2))-d)
for(a5=c.length,a6=0;a6<a5;++a6){a7=c[a6]
J.eR(l.a(a4.h(a3,b1)),a7)}}}B.a.C($.db)
for(r=$.d,q=r.length,j=t.g6,h=0;h<r.length;r.length===q||(0,A.N)(r),++h)J.qw(j.a(J.a(r[h],"manaPool")),new A.jJ())
A.eE()
B.a.C($.ad)
$.X=0
$.ae=!1
a8=$.H
do{r=$.H
q=$.d
r=B.f.az(r+1,q.length)
$.H=r}while(J.q(J.a(q[r],"eliminated"),!0)&&B.a.Y($.d,new A.jK()))
r=$.H
if(r<=a8)$.b0=$.b0+1
$.aA=0
q=$.d
if(!(r>=0&&r<q.length))return A.b(q,r)
r=J.T(l.a(J.a(q[r],"cards")))
a9=0
for(;r.n();){a3=k.a(r.gt())
q=J.j(a3)
if(J.q(q.h(a3,"zone"),"battlefield")&&J.q(q.h(a3,"tapped"),!0)){q.k(a3,"tapped",!1);++a9}}if(a9>0){r=$.d
q=$.H
if(!(q>=0&&q<r.length))return A.b(r,q)
q=A.c(J.a(r[q],b0))
r=a9>1?"s":""
l=$.d
k=$.H
if(!(k>=0&&k<l.length))return A.b(l,k)
A.w(q+" untapped "+a9+" card"+r,A.c(J.a(l[k],b0))+"'s cards untapped.")}r=$.H
q=$.bJ
l=q.length
if(r<l){if(!(r>=0))return A.b(q,r)
q=q[r]
l=$.d
if(!(r<l.length))return A.b(l,r)
J.F(q,A.i(J.a(l[r],"life")))}$.bh=new A.aQ(Date.now(),!1)
r=$.d
q=$.H
if(!(q>=0&&q<r.length))return A.b(r,q)
q=A.c(J.a(r[q],b0))
r=$.b0
l=b3?" - voice":""
k=$.d
j=$.H
if(!(j>=0&&j<k.length))return A.b(k,j)
A.w(q+"'s turn (Turn "+r+")"+l,"It is now "+A.c(J.a(k[j],b0))+"'s turn.")
j=$.d
k=$.H
if(!(k>=0&&k<j.length))return A.b(j,k)
k=A.c(J.a(j[k],b0))
j=$.d
l=$.H
if(!(l>=0&&l<j.length))return A.b(j,l)
A.w(k+" enters Draw phase",A.c(J.a(j[l],b0))+" is now in the Draw phase.")},
bu(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5=null,e6="name",e7='</span><span class="combat-player-life">\u2665 ',e8="life",e9="combat-hint",f0="combat-phase-btn",f1="counters",f2="toughness",f3="click"
$.bb=B.C
A.tw()
s=document
r=t._.a(s.querySelector("#game-screen"))
if(r==null)return
B.e.a3(r)
q=s.createElement("button")
B.d.sj(q,"\u2190 Back to Game")
q.className="btn-back"
p=t.C
o=p.i("~(1)?")
n=o.a(new A.lk())
t.Z.a(null)
p=p.c
A.l(q,f3,n,!1,p)
r.appendChild(q)
n=s.createElement("h2")
B.k.sj(n,"\u2694\ufe0f Combat")
n.className="tracker-title"
r.appendChild(n)
m=["Attackers","Blockers","Damage","Results"]
l=s.createElement("div")
l.className="combat-phase-stepper"
for(k=0;k<4;k=i){j=s.createElement("div")
n=$.X
if(k<n)n="combat-phase-dot combat-phase-done"
else n=k===n?"combat-phase-dot combat-phase-active":"combat-phase-dot"
j.className=n
n=s.createElement("span")
i=k+1
B.c.sj(n,""+i)
n.className="combat-phase-num"
j.appendChild(n)
n=s.createElement("span")
B.c.sj(n,m[k])
n.className="combat-phase-label"
j.appendChild(n)
l.appendChild(j)
if(k<3){n=s.createElement("div")
n.className=k<$.X?"combat-phase-line combat-phase-line-done":"combat-phase-line"
l.appendChild(n)}}r.appendChild(l)
n=$.d
h=$.H
if(!(h>=0&&h<n.length))return A.b(n,h)
g=n[h]
f=s.createElement("div")
f.className="combat-player-banner combat-player-atk"
h=J.j(g)
B.e.X(f,'<span class="combat-player-role">\u2694\ufe0f ATTACKING</span><span class="combat-player-name">'+A.c(h.h(g,e6))+e7+A.c(h.h(g,e8))+"</span>")
r.appendChild(f)
r.appendChild(A.rE())
n=$.X
if(n===0){n=s.createElement("p")
B.h.sj(n,"Select creatures to attack with and choose their targets.")
n.className=e9
r.appendChild(n)
h=J.hq(t.j.a(h.h(g,"cards")),new A.ll())
e=A.a8(h,!0,h.$ti.i("k.E"))
n=e.length
if(n===0){n=s.createElement("p")
B.h.sj(n,"No untapped creatures to attack with.")
n.className="zone-empty"
r.appendChild(n)}else{d=s.createElement("div")
d.className="combat-creature-grid"
for(h=t.P,c=0;c<n;++c){b=e[c]
a=B.a.Y($.a2,new A.lm(b))
d.appendChild(A.rD(h.a(b),a))}r.appendChild(d)}if($.a2.length!==0){a0=s.createElement("button")
s=$.a2.length
n=s>1?"s":""
B.d.sj(a0,"Declare "+s+" Attacker"+n+" \u2192")
a0.className=f0
A.l(a0,f3,o.a(new A.lo()),!1,p)
r.appendChild(a0)}}else if(n===1){n=$.a2
h=A.L(n)
a1=new A.R(n,h.i("f(1)").a(new A.lp()),h.i("R<1,f>")).dH(0)
for(n=A.rf(a1,a1.r,A.x(a1).c),h=t.j,a2=t.P,a3=t.g,a4=n.$ti.c;n.n();){a5=n.d
if(a5==null)a5=a4.a(a5)
a6=$.d
if(a5>>>0!==a5||a5>=a6.length)return A.b(a6,a5)
a7=a6[a5]
a8=s.createElement("div")
a8.className="combat-player-banner combat-player-def"
a6=J.j(a7)
B.e.X(a8,'<span class="combat-player-role">\ud83d\udee1 DEFENDING</span><span class="combat-player-name">'+A.c(a6.h(a7,e6))+e7+A.c(a6.h(a7,e8))+"</span>")
r.appendChild(a8)
a9=$.a2
b0=A.L(a9)
b1=b0.i("a_<1>")
b2=A.a8(new A.a_(a9,b0.i("y(1)").a(new A.lq(a5)),b1),!0,b1.i("k.E"))
for(a5=b2.length,c=0;c<b2.length;b2.length===a5||(0,A.N)(b2),++c){b3=b2[c]
a9=J.j(b3)
b4=a2.a(a9.h(b3,"card"))
b0=J.j(b4)
b1=b0.h(b4,"power")
b1=A.i(b1==null?0:b1)
b5=b0.h(b4,f1)
b5=A.i(b5==null?0:b5)
b6=b0.h(b4,f2)
b6=A.i(b6==null?0:b6)
b7=b0.h(b4,f1)
b7=A.i(b7==null?0:b7)
a9=a3.a(a9.h(b3,"blockers"))
b8=A.a7(a9==null?[]:a9,!0,a2)
a9=b0.h(b4,"keywords")
b9=h.a(a9==null?[]:a9)
c0=s.createElement("div")
c0.className="combat-attacker-block"
c1=s.createElement("div")
c1.className="combat-attacker-summary"
c2=s.createElement("div")
c2.className="combat-attacker-info"
a9=s.createElement("span")
B.c.sj(a9,A.ak(b0.h(b4,e6)))
a9.className="combat-card-name"
c2.appendChild(a9)
a9=s.createElement("span")
b5=""+(b1+b5)
B.c.sj(a9,b5+"/"+(b6+b7))
a9.className="combat-card-pt"
c2.appendChild(a9)
a9=J.j(b9)
if(a9.gP(b9)){b0=s.createElement("span")
B.c.sj(b0,a9.a7(b9,4).V(0," \xb7 "))
b0.className="combat-card-kws"
c2.appendChild(b0)}c1.appendChild(c2)
if(b8.length===0){b0=s.createElement("span")
B.c.sj(b0,"\u26a0\ufe0f Unblocked \u2014 deals "+b5+" to "+A.c(a6.h(a7,e6)))
b0.className="combat-unblocked-warning"
c1.appendChild(b0)}c0.appendChild(c1)
c3=a9.l(b9,"Flying")
a9=J.hq(h.a(a6.h(a7,"cards")),new A.lr(b8,c3))
c4=A.a8(a9,!0,a9.$ti.i("k.E"))
if(b8.length!==0){c5=s.createElement("div")
c5.className="combat-blocker-chips"
for(a9=b8.length,c6=0;c6<b8.length;b8.length===a9||(0,A.N)(b8),++c6){c7=b8[c6]
c8=s.createElement("div")
c8.className="combat-blocker-chip"
B.e.sj(c8,"\ud83d\udee1 "+A.c(J.a(c7,e6)))
c9=s.createElement("button")
B.d.sj(c9,"\u2715")
c9.className="combat-chip-remove"
A.l(c9,f3,o.a(new A.ls(b3,c7)),!1,p)
c8.appendChild(c9)
c5.appendChild(c8)}c0.appendChild(c5)}if(c4.length!==0){d0=s.createElement("div")
d0.className="combat-add-blocker-row"
d1=s.createElement("select")
d1.className="tracker-select combat-blocker-sel"
d1.appendChild(A.cq("\u2014 Add blocker \u2014","",e5,!1))
for(a9=c4.length,c6=0;c6<c4.length;c4.length===a9||(0,A.N)(c4),++c6){d2=c4[c6]
b0=J.j(d2)
b1=b0.h(d2,"power")
b1=A.i(b1==null?0:b1)
b5=b0.h(d2,f1)
b5=A.i(b5==null?0:b5)
b6=b0.h(d2,f2)
b6=A.i(b6==null?0:b6)
b7=b0.h(d2,f1)
b7=A.i(b7==null?0:b7)
d3=A.c(b0.h(d2,e6))
d4=b0.h(d2,"id")
d4=d4==null?e5:J.m(d4)
d1.appendChild(A.cq(d3+" ("+(b1+b5)+"/"+(b6+b7)+")",A.n(d4==null?b0.h(d2,e6):d4),e5,!1))}d5=s.createElement("button")
B.d.sj(d5,"+ Block")
d5.className="combat-add-blocker-btn"
A.l(d5,f3,o.a(new A.lt(d1,c4,b3)),!1,p)
d0.appendChild(d1)
d0.appendChild(d5)
c0.appendChild(d0)}r.appendChild(c0)}}d6=s.createElement("div")
d6.className="combat-btn-row"
d7=s.createElement("button")
B.d.sj(d7,"\u2190 Back")
d7.className="combat-phase-btn-secondary"
A.l(d7,f3,o.a(new A.lu()),!1,p)
a0=s.createElement("button")
B.d.sj(a0,"Resolve Damage \u2192")
a0.className=f0
A.l(a0,f3,o.a(new A.lv()),!1,p)
d6.appendChild(d7)
d6.appendChild(a0)
r.appendChild(d6)}else if(n===3){n=s.createElement("p")
B.h.sj(n,"Combat resolved.")
n.className=e9
r.appendChild(n)
d8=s.createElement("div")
d8.className="combat-life-row"
for(n=$.d,h=n.length,c=0;c<n.length;n.length===h||(0,A.N)(n),++c){d9=n[c]
e0=s.createElement("div")
e0.className="combat-life-card"
a2=s.createElement("span")
a3=J.j(d9)
B.c.sj(a2,A.ak(a3.h(d9,e6)))
a2.className="combat-life-name"
e0.appendChild(a2)
a2=s.createElement("span")
B.c.sj(a2,"\u2665 "+A.c(a3.h(d9,e8)))
a2.className="combat-life-val"
e0.appendChild(a2)
d8.appendChild(e0)}r.appendChild(d8)
if($.ad.length!==0){e1=s.createElement("div")
e1.className="combat-inline-log"
for(n=$.ad,h=n.length,c=0;c<n.length;n.length===h||(0,A.N)(n),++c){e2=n[c]
e3=s.createElement("p")
e3.className="combat-result-entry"
B.h.sj(e3,"\u25b8 "+A.c(e2))
a2=J.j(e2)
a3=a2.gm(e2)
if(0>a3)A.a5(A.ab(0,0,a2.gm(e2),e5,e5))
if(!A.ay(e2,"dies",0)){a3=a2.gm(e2)
if(0>a3)A.a5(A.ab(0,0,a2.gm(e2),e5,e5))
a3=A.ay(e2,"graveyard",0)}else a3=!0
if(a3){a2=e3.style
a2.color="#ff8888"}else{a3=a2.gm(e2)
if(0>a3)A.a5(A.ab(0,0,a2.gm(e2),e5,e5))
if(A.ay(e2,"damage",0)){a2=e3.style
a2.color="#ffcc44"}else{a3=a2.gm(e2)
if(0>a3)A.a5(A.ab(0,0,a2.gm(e2),e5,e5))
if(A.ay(e2,"survives",0)){a2=e3.style
a2.color="#88ff99"}}}e1.appendChild(e3)}r.appendChild(e1)}e4=s.createElement("button")
B.d.sj(e4,"Done \u2014 Back to Game")
e4.className="combat-resolve-btn"
A.l(e4,f3,o.a(new A.ln()),!1,p)
r.appendChild(e4)}r.appendChild(A.eD())},
ph(a){var s,r
for(s=0;r=$.d,s<r.length;++s)if(s!==a&&!J.q(J.a(r[s],"eliminated"),!0))return s
return-1},
tw(){var s,r,q,p,o,n,m,l,k,j,i,h="targetIdx"
if($.a2.length===0)return
s=A.ph($.H)
for(r=$.a2,q=r.length,p=s>=0,o=0;o<r.length;r.length===q||(0,A.N)(r),++o){n=r[o]
m=J.j(n)
if(A.d7(m.h(n,h)))l=A.i(m.h(n,h))
else{k=A.a4(A.c(m.h(n,h)),null)
l=k==null?-1:k}if(l>=0){k=$.d
j=k.length
if(l<j){if(l!==$.H){if(!(l>=0&&l<j))return A.b(k,l)
k=J.q(J.a(k[l],"eliminated"),!0)}else k=!0
i=k}else i=!0}else i=!0
if(i&&p)m.k(n,h,s)}},
rD(a,a0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e="counters",d="name",c=J.j(a),b=c.h(a,"power")
b=A.i(b==null?0:b)
s=c.h(a,e)
s=A.i(s==null?0:s)
r=c.h(a,"toughness")
r=A.i(r==null?0:r)
q=c.h(a,e)
q=A.i(q==null?0:q)
p=c.h(a,"keywords")
if(p==null)p=[]
t.j.a(p)
o=document
n=o.createElement("div")
n.className=a0?"combat-selectable-card combat-selectable-selected":"combat-selectable-card"
if(a0){m=o.createElement("span")
B.c.sj(m,"\u2713 Attacking")
m.className="combat-selected-badge"
n.appendChild(m)}m=o.createElement("span")
B.c.sj(m,A.ak(c.h(a,d)))
m.className="combat-card-name"
n.appendChild(m)
m=o.createElement("span")
B.c.sj(m,""+(b+s)+"/"+(r+q))
m.className="combat-card-pt"
n.appendChild(m)
c=J.j(p)
if(c.gP(p)){l=o.createElement("div")
l.className="combat-kw-badges"
for(c=c.a7(p,3),c=c.gv(c);c.n();){k=c.gt()
b=o.createElement("span")
B.c.sj(b,A.ak(k))
b.className="combat-kw-badge"
l.appendChild(b)}n.appendChild(l)}if(!a0){j=o.createElement("select")
j.className="combat-target-sel"
for(i=0;c=$.d,i<c.length;++i){if(i===$.H||J.q(J.a(c[i],"eliminated"),!0))continue
c=$.d
if(!(i<c.length))return A.b(c,i)
j.appendChild(A.cq(A.n(J.a(c[i],d)),""+i,null,!1))}n.appendChild(j)
h=o.createElement("button")
B.d.sj(h,"Attack \u2192")
h.className="combat-declare-btn"
c=t.C
b=c.i("~(1)?").a(new A.j6(j,a))
t.Z.a(null)
A.l(h,"click",b,!1,c.c)
n.appendChild(h)}else{g=A.i(J.a(B.a.dk($.a2,new A.j7(a)),"targetIdx"))
c=o.createElement("span")
b=$.d
if(!(g>=0&&g<b.length))return A.b(b,g)
B.c.sj(c,"\u2192 "+A.c(J.a(b[g],d)))
c.className="combat-target-label"
n.appendChild(c)
f=o.createElement("button")
B.d.sj(f,"Remove")
f.className="combat-remove-btn"
o=t.C
c=o.i("~(1)?").a(new A.j8(a))
t.Z.a(null)
A.l(f,"click",c,!1,o.c)
n.appendChild(f)}return n},
o1(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4="keywords",b5="counters",b6="toughness",b7="life",b8="name",b9="Lifelink",c0="Indestructible",c1="graveyard"
B.a.C($.ad)
$.ae=!0
for(s=$.a2,r=s.length,q=t.j,p=t.P,o=t.g,n=t.S,m=0;m<s.length;s.length===r||(0,A.N)(s),++m){l=s[m]
k=J.j(l)
j=p.a(k.h(l,"card"))
i=J.j(j)
h=i.h(j,b4)
g=q.a(h==null?[]:h)
h=i.h(j,"power")
h=A.i(h==null?0:h)
f=i.h(j,b5)
e=h+A.i(f==null?0:f)
h=i.h(j,b6)
h=A.i(h==null?0:h)
f=i.h(j,b5)
f=A.i(f==null?0:f)
d=A.i(k.h(l,"targetIdx"))
k=o.a(k.h(l,"blockers"))
c=A.a7(k==null?[]:k,!0,p)
k=c.length
if(k===0){k=$.d
if(!(d>=0&&d<k.length))return A.b(k,d)
k=k[d]
h=J.j(k)
h.k(k,b7,J.dj(h.h(k,b7),e))
A.eL(d,-e)
k=$.ad
i=A.c(i.h(j,b8))
h=""+e
f=$.d
if(!(d<f.length))return A.b(f,d)
f=A.c(J.a(f[d],b8))
b=$.d
if(!(d<b.length))return A.b(b,d)
B.a.q(k,i+" deals "+h+" damage to "+f+" \u2665 "+A.c(J.a(b[d],b7)))
if(J.b1(g,b9)){k=$.d
i=$.H
if(!(i>=0&&i<k.length))return A.b(k,i)
i=k[i]
k=J.j(i)
k.k(i,b7,J.aZ(k.h(i,b7),e))
A.eL($.H,e)
i=$.ad
k=$.d
f=$.H
if(!(f>=0&&f<k.length))return A.b(k,f)
B.a.q(i,"Lifelink: "+A.c(J.a(k[f],b8))+" gains "+h+" life")}A.be(d)}else{for(b=J.j(g),a=0,a0=0;a0<c.length;c.length===k||(0,A.N)(c),++a0){a1=c[a0]
a2=J.j(a1)
a3=a2.h(a1,"power")
a3=A.i(a3==null?0:a3)
a4=a2.h(a1,b5)
a4=A.i(a4==null?0:a4)
a5=a2.h(a1,b6)
a5=A.i(a5==null?0:a5)
a6=a2.h(a1,b5)
a6=A.i(a6==null?0:a6)
a7=a2.h(a1,b4)
a+=a3+a4
if(!J.b1(q.a(a7==null?[]:a7),c0))a8=e>=a5+a6||b.l(g,"Deathtouch")
else a8=!1
if(a8){for(a3=$.d,a4=a3.length,a9=0;a9<a3.length;a3.length===a4||(0,A.N)(a3),++a9)for(a5=J.T(q.a(J.a(a3[a9],"cards")));a5.n();){b0=a5.gt()
a6=J.j(b0)
a7=a6.h(b0,"id")
a7=a7==null?null:J.m(a7)
if(a7==null)a7=a6.h(b0,b8)
b1=a2.h(a1,"id")
b1=b1==null?null:J.m(b1)
if(J.q(a7,b1==null?a2.h(a1,b8):b1)){a6.k(b0,"zone",c1)
a6.k(b0,"tapped",!1)
break}}B.a.q($.ad,A.c(a2.h(a1,b8))+" dies \u2192 graveyard")}else B.a.q($.ad,A.c(a2.h(a1,b8))+" survives")}if(!b.l(g,c0))b2=a>=h+f||B.a.Y(c,new A.jR())
else b2=!1
if(b2){i.k(j,"zone",c1)
i.k(j,"tapped",!1)
B.a.q($.ad,A.c(i.h(j,b8))+" dies in combat \u2192 graveyard")}else B.a.q($.ad,A.c(i.h(j,b8))+" survives")
if(b.l(g,"Trample")){b3=B.f.a4(e-B.a.c5(c,0,new A.jS(),n),0,9999)
if(b3>0){k=$.d
if(!(d>=0&&d<k.length))return A.b(k,d)
k=k[d]
h=J.j(k)
h.k(k,b7,J.dj(h.h(k,b7),b3))
A.eL(d,-b3)
k=$.ad
i=A.c(i.h(j,b8))
h=$.d
if(!(d<h.length))return A.b(h,d)
h=A.c(J.a(h[d],b8))
f=$.d
if(!(d<f.length))return A.b(f,d)
B.a.q(k,i+" tramples "+A.c(b3)+" damage to "+h+" \u2665 "+A.c(J.a(f[d],b7)))
A.be(d)}}if(b.l(g,b9)){k=$.d
i=$.H
if(!(i>=0&&i<k.length))return A.b(k,i)
i=k[i]
k=J.j(i)
k.k(i,b7,J.aZ(k.h(i,b7),e))
A.eL($.H,e)
i=$.ad
k=$.d
h=$.H
if(!(h>=0&&h<k.length))return A.b(k,h)
B.a.q(i,"Lifelink: "+A.c(J.a(k[h],b8))+" gains "+e+" life")}}}A.eE()
$.X=0
$.ae=!1
A.bK(3,!0)
A.D(B.j)},
rM(){var s=$.X
if(s===0)return'Try: "attack with [creature]", "declare attackers", or "pass".'
if(s===1)return'Try: "no blockers", "block with [creature]", or "proceed".'
return'Try: "resolve", "damage", or "done".'},
rE(){var s,r,q,p,o,n,m=document,l=m.createElement("div")
l.className="combat-command-panel"
s=m.createElement("span")
s.className="combat-command-title"
B.c.sj(s,"Voice Command History")
l.appendChild(s)
s=m.createElement("p")
s.className="combat-command-hint"
B.h.sj(s,A.rM())
l.appendChild(s)
r=m.createElement("div")
r.className="combat-command-list"
s=$.C
q=A.aO(s,0,A.az(6,"count",t.S),A.L(s).c).a_(0)
s=q.length
if(s===0){m=m.createElement("div")
m.className="combat-command-item combat-command-item-muted"
B.e.sj(m,"No recent commands yet.")
r.appendChild(m)}else for(p=0;p<q.length;q.length===s||(0,A.N)(q),++p){o=q[p]
n=m.createElement("div")
n.className="combat-command-item"
B.e.sj(n,o)
r.appendChild(n)}l.appendChild(r)
return l},
be(a){var s,r,q="eliminated",p="name",o=$.d
if(!(a>=0&&a<o.length))return A.b(o,a)
s=o[a]
o=J.j(s)
if(J.q(o.h(s,q),!0))return
if(J.qb(o.h(s,"life"),0)){o.k(s,q,!0)
if($.bH.length===0)$.bH=A.n(o.h(s,p))
A.w(A.c(o.h(s,p))+" eliminated (0 life)",A.c(o.h(s,p))+" ran out of life and is eliminated.")
A.lM(A.n(o.h(s,p)),"Ran out of life")}if($.ax)for(r=J.T(J.nm(t.W.a(o.h(s,"commanderDamage"))));r.n();)if(r.gt()>=21){o.k(s,q,!0)
if($.bH.length===0)$.bH=A.n(o.h(s,p))
A.w(A.c(o.h(s,p))+" eliminated by commander damage",A.c(o.h(s,p))+" took 21+ commander damage.")
A.lM(A.n(o.h(s,p)),"21 commander damage")
break}if(J.qa(o.h(s,"poison"),10)){o.k(s,q,!0)
if($.bH.length===0)$.bH=A.n(o.h(s,p))
A.w(A.c(o.h(s,p))+" eliminated by poison",A.c(o.h(s,p))+" accumulated 10 poison counters.")
A.lM(A.n(o.h(s,p)),"10 poison counters")}A.pB()},
pB(){var s,r,q,p,o,n,m,l,k,j,i,h,g="name",f={},e=$.d,d=A.L(e),c=d.i("a_<1>"),b=A.a8(new A.a_(e,d.i("y(1)").a(new A.kO()),c),!0,c.i("k.E"))
e=b.length
if(e===1){if(0>=e)return A.b(b,0)
s=A.n(J.a(b[0],g))
A.w(s+" wins!",s+" is the last player standing \u2014 they win!")
for(e=$.d,d=e.length,c=t.j,r="\u2014",q=0,p=0;p<e.length;e.length===d||(0,A.N)(e),++p){o=e[p]
n=J.j(o)
m=J.hq(c.a(n.h(o,"cards")),new A.kP())
l=m.gm(m)
if(l>q){r=A.n(n.h(o,g))
q=l}}f.a="\u2014"
f.b=0
$.aU.K(0,new A.kQ(f))
f.c="\u2014"
f.d=0
$.aw.K(0,new A.kR(f))
f.e="\u2014"
f.f=0
if($.ax){k=A.Y(t.N,t.S)
for(e=$.d,d=e.length,c=t.W,p=0;p<e.length;e.length===d||(0,A.N)(e),++p){o=e[p]
n=J.j(o)
j=A.n(n.h(o,g))
k.k(0,j,0)
J.dl(c.a(n.h(o,"commanderDamage")),new A.kS(k,j))}k.K(0,new A.kT(f))}e=$.d
d=A.L(e)
c=d.i("R<1,h>")
c=A.a8(new A.R(e,d.i("h(1)").a(new A.kU()),c),!0,c.i("Q.E"))
e=$.ax?"Commander":"Normal"
d=$.b0
n=t.N
m=t.z
i=A.G(["gyPlayer",r,"gyVal",q,"longestTurnPlayer",$.cE,"longestTurnSecs",$.c6,"lifeGainedPlayer",f.a,"lifeGainedVal",f.b,"cardsPlayedPlayer",f.c,"cardsPlayedVal",f.d,"cmdPlayer",f.e,"cmdVal",f.f,"firstBloodPlayer",$.bH],n,m)
h=A.pK()
B.a.q(h,A.G(["winner",s,"players",c,"format",e,"date",new A.aQ(Date.now(),!1).cg(),"turns",d,"highlights",i],n,m))
window.localStorage.setItem("mtg_game_history",B.p.aH(h,null))
A.uA(s,$.b0,$.cE,$.c6,f.a,f.b,f.e,f.f,$.bH)}},
lM(a,b){var s,r,q,p,o=document,n=o.createElement("div")
n.className="overlay"
s=o.createElement("div")
s.className="overlay-box overlay-box-elim"
r=o.createElement("h2")
B.k.sj(r,a+" is eliminated")
r.className="overlay-elim-title"
s.appendChild(r)
r=o.createElement("p")
B.h.sj(r,b)
r.className="overlay-sub"
s.appendChild(r)
q=o.createElement("button")
B.d.sj(q,"Continue")
q.className="overlay-continue-btn"
r=t.C
p=r.i("~(1)?").a(new A.lN(n))
t.Z.a(null)
A.l(q,"click",p,!1,r.c)
s.appendChild(q)
n.appendChild(s)
o.body.appendChild(n)},
uA(a,b,a0,a1,a2,a3,a4,a5,a6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=document,c=d.createElement("div")
c.className="overlay overlay-recap"
s=d.createElement("div")
s.className="recap-box"
r=d.createElement("div")
r.className="recap-winner"
q=d.createElement("h1")
B.k.sj(q,"\ud83c\udfc6 VICTORY! \ud83c\udfc6")
q.className="recap-title"
r.appendChild(q)
q=d.createElement("h2")
B.k.sj(q,a)
q.className="recap-winner-name"
r.appendChild(q)
q=d.createElement("p")
B.h.sj(q,"is the champion!")
q.className="recap-subtitle"
r.appendChild(q)
s.appendChild(r)
p=d.createElement("div")
p.className="recap-stats"
q=d.createElement("h3")
B.k.sj(q,"Game Statistics")
q.className="recap-stats-title"
p.appendChild(q)
q=t.N
o=A.G(["label","Total Turns","value",B.f.p(b)],q,q)
n=A.G(["label","Longest Turn","value",a0.length!==0?a0+" ("+B.f.W(a1,60)+":"+B.b.aN(B.f.p(B.f.az(a1,60)),2,"0")+")":"\u2014"],q,q)
m=A.G(["label","Biggest Life Swing","value",a2!=="\u2014"?a2+" (+"+a3+" life)":"\u2014"],q,q)
l=A.G(["label","Most Commander Damage Dealt","value",a4!=="\u2014"?a4+" ("+a5+" dmg)":"\u2014"],q,q)
k=[o,n,m,l,A.G(["label","First Blood","value",a6.length!==0?a6:"\u2014"],q,q)]
for(j=0;j<5;++j){i=k[j]
h=d.createElement("div")
h.className="recap-stat-row"
q=d.createElement("span")
o=i.h(0,"label")
o.toString
B.c.sj(q,o)
q.className="recap-stat-label"
h.appendChild(q)
q=d.createElement("span")
o=i.h(0,"value")
o.toString
B.c.sj(q,o)
q.className="recap-stat-value"
h.appendChild(q)
p.appendChild(h)}s.appendChild(p)
g=d.createElement("div")
g.className="recap-btn-row"
f=d.createElement("button")
B.d.sj(f,"Play Again")
f.className="recap-btn recap-play-again"
q=t.C
o=q.i("~(1)?")
n=o.a(new A.na(c))
t.Z.a(null)
q=q.c
A.l(f,"click",n,!1,q)
e=d.createElement("button")
B.d.sj(e,"New Setup")
e.className="recap-btn recap-new-setup"
A.l(e,"click",o.a(new A.nb(c)),!1,q)
g.appendChild(f)
g.appendChild(e)
s.appendChild(g)
c.appendChild(s)
d.body.appendChild(c)},
pK(){var s,r,q
try{s=window.localStorage.getItem("mtg_game_history")
if(s==null||J.W(s)===0){r=A.o([],t.t)
return r}r=J.b2(t.j.a(B.p.al(0,s,null)),new A.l5(),t.P).a_(0)
return r}catch(q){r=A.o([],t.t)
return r}},
ob(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0
A.hh()
s=document
r=t.G
q=r.a(s.querySelector("#player-count"))
if(q==null)return
p=q.value
o=A.a4(p==null?"2":p,null)
if(o==null)o=2
n=r.a(s.querySelector("#custom-life-input"))
if(n!=null){p=n.value
m=A.a4(p==null?"":p,null)
if(m==null)m=$.at
if(m>0)$.at=m}p=t.s
l=A.o([],p)
k=A.o([],p)
for(j=1;j<=o;++j){i=""+j
h=r.a(s.querySelector("#player-name-"+i))
if(h==null)return
g=h.value
f=B.b.B(g==null?"":g)
if(f.length===0){B.t.aV(window,"Please enter a name for Player "+i)
return}B.a.q(l,f)
if($.ax){e=r.a(s.querySelector("#commander-name-"+i))
i=e==null?null:e.value
B.a.q(k,B.b.B(i==null?"":i))}else B.a.q(k,"")}s=t.N
d=A.qQ(s)
for(j=0;j<o;++j){if(!(j<l.length))return A.b(l,j)
c=l[j].toLowerCase()
if(d.l(0,c)){if(!(j<l.length))return A.b(l,j)
B.a.k(l,j,"Dingus "+l[j])
if(!(j<l.length))return A.b(l,j)
r=l[j]
B.t.aV(window,"Duplicate name! Renamed to "+r)}else d.q(0,c)}B.a.C($.d)
r=t.S
$.aU=A.Y(s,r)
$.aw=A.Y(s,r)
$.d9=A.Y(s,r)
$.c6=0
$.cE=""
$.bJ=A.o([],t.p)
$.db=A.o([],t.t)
$.ad=A.o([],p)
for(p=t.z,i=t.X,j=0;j<o;++j){b=A.Y(r,r)
for(a=0;a<o;++a)if(a!==j)b.k(0,a,0)
g=$.d
if(!(j<l.length))return A.b(l,j)
a0=l[j]
if(!(j<k.length))return A.b(k,j)
B.a.q(g,A.G(["name",a0,"commander",k[j],"colors",[],"life",$.at,"poison",0,"energy",0,"exp",0,"radiation",0,"isMonarch",!1,"hasInitiative",!1,"commanderDamage",b,"cards",[],"eliminated",!1,"manaPool",A.G(["W",0,"U",0,"B",0,"R",0,"G",0,"C",0],s,r)],s,p))
a0=$.aU
if(!(j<l.length))return A.b(l,j)
a0.k(0,l[j],0)
a0=$.aw
if(!(j<l.length))return A.b(l,j)
a0.k(0,l[j],0)
a0=$.d9
if(!(j<l.length))return A.b(l,j)
a0.k(0,l[j],0)
B.a.q($.bJ,A.o([$.at],i))}$.bI=A.cT(o,$.at,!1,r)
A.uz($.d,new A.nk())},
w(a,b){var s
B.a.q($.bL,a)
B.a.q($.bt,b)
s=$.bL
if(s.length>100)B.a.bs(s,0)
s=$.bt
if(s.length>100)B.a.bs(s,0)},
eL(a,b){var s,r,q,p,o,n,m
if(b===0)return
s=document
r=s.querySelector(".player-board:nth-child("+(a+1)+") .life-num")
if(r==null)return
q=s.createElement("div")
p=b>0
q.className="life-change-popup "+(p?"positive":"negative")
B.e.sj(q,p?"+"+A.c(b):B.f.p(b))
o=q.style
o.position="absolute"
n=r.getBoundingClientRect()
p=q.style
o=n.left
o.toString
m=n.width
m.toString
p.left=A.c(o+m/2)+"px"
p=q.style
o=n.top
o.toString
m=n.height
m.toString
p.top=A.c(o+m/2)+"px"
p=q.style
B.y.d4(p,B.y.bJ(p,"transform"),"translate(-50%, -50%)","")
s.body.appendChild(q)
A.cR(A.cj(1200),new A.lU(q),t.a)},
de(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7="btn-main",d8="btn-secondary",d9="name",e0="timer-banner",e1="eliminated",e2="click"
$.bb=B.j
A.bp()
s=document
r=t._.a(s.querySelector("#game-screen"))
if(r==null)return
B.e.a3(r)
q=s.createElement("button")
q.className="btn-back"
B.d.sj(q,"\u2b05 Setup")
p=t.C
o=p.i("~(1)?")
n=o.a(new A.kj())
t.Z.a(null)
p=p.c
A.l(q,e2,n,!1,p)
r.appendChild(q)
m=s.createElement("div")
m.className="top-bar"
l=s.createElement("div")
l.className="top-left"
k=s.createElement("button")
B.d.sj(k,"Reset")
k.className=d7
A.l(k,e2,o.a(new A.kk()),!1,p)
j=s.createElement("button")
B.d.sj(j,"Settings")
j.className=d8
A.l(j,e2,o.a(new A.kl()),!1,p)
i=s.createElement("button")
B.d.sj(i,"Undo Last")
i.className=d8
A.l(i,e2,o.a(new A.ku()),!1,p)
h=s.createElement("button")
B.d.sj(h,$.aY?"Explain: ON":"Explain: OFF")
h.className=$.aY?"btn-secondary btn-npm-on":d8
A.l(h,e2,o.a(new A.kv(h)),!1,p)
l.appendChild(k)
l.appendChild(i)
l.appendChild(j)
l.appendChild(h)
g=$.bh!=null?B.f.W(A.cj(Date.now()-$.bh.a).a,1e6):0
f=B.f.W(g,60)
e=B.f.az(g,60)
if(g>0)d=f>0?"\u23f1 "+f+"m "+B.b.aN(B.f.p(e),2,"0")+"s":"\u23f1 "+e+"s"
else d=""
c=s.createElement("div")
c.className="banner-col"
n=s.createElement("p")
n.id="turn-banner"
b=$.b0
a=$.d
a0=$.H
if(!(a0>=0&&a0<a.length))return A.b(a,a0)
B.h.sj(n,"Turn "+b+" \u2014 "+A.c(J.a(a[a0],d9)))
c.appendChild(n)
n=s.createElement("span")
n.id=e0
n.className=e0
B.c.sj(n,d)
c.appendChild(n)
a1=s.createElement("div")
a1.className="top-right"
a2=s.createElement("button")
B.d.sj(a2,A.ry())
a2.className=d7
A.l(a2,e2,o.a(new A.kw()),!1,p)
a1.appendChild(a2)
m.appendChild(l)
m.appendChild(c)
m.appendChild(a1)
r.appendChild(m)
r.appendChild(A.rH())
r.appendChild(A.rG())
a3=A.o([],t.m)
n=$.d
b=$.H
if(!(b>=0&&b<n.length))return A.b(n,b)
b=J.T(t.j.a(J.a(n[b],"cards")))
n=t.N
a=t.f
a0=t.g
for(;b.n();){a4=b.gt()
a5=J.j(a4)
if(J.q(a5.h(a4,"zone"),"battlefield")){a6=a0.a(a5.h(a4,"triggers"))
for(a7=J.T(a6==null?[]:a6);a7.n();){a8=A.ac(a.a(a7.gt()),n,n)
a9=A.n(a5.h(a4,d9))
b0=a8.h(0,"phase")
if(b0==null)b0=""
b1=a8.h(0,"text")
if(b1==null)b1=""
b2=a8.h(0,"plain")
B.a.q(a3,A.G(["card",a9,"phase",b0,"text",b1,"plain",b2==null?"":b2],n,n))}}}if(a3.length!==0){b3=s.createElement("div")
b3.className="trigger-banner"
n=s.createElement("p")
B.h.sj(n,"TRIGGER REMINDERS")
n.className="trigger-banner-label"
b3.appendChild(n)
for(n=a3.length,b4=0;b4<a3.length;a3.length===n||(0,A.N)(a3),++b4){b5=a3[b4]
b6=s.createElement("div")
b6.className="trigger-row"
b=s.createElement("span")
B.c.sj(b,"["+A.c(b5.h(0,"phase"))+"]")
b.className="trigger-phase"
b6.appendChild(b)
b=s.createElement("span")
B.c.sj(b," "+A.c(b5.h(0,"card"))+": ")
b.className="trigger-card"
b6.appendChild(b)
b=s.createElement("span")
if($.aY){a=b5.h(0,"plain")
if(a==null)a=""}else{a=b5.h(0,"text")
if(a==null)a=""}B.c.sj(b,a)
b.className="trigger-text"
b6.appendChild(b)
b3.appendChild(b6)}r.appendChild(b3)}b7=s.createElement("div")
b7.className="player-grid"
r.appendChild(b7)
for(n=t.W,b8=0;b=$.d,b8<b.length;++b8){b9=b[b8]
c0=b8===$.H&&!J.q(J.a(b9,e1),!0)
b=J.j(b9)
c1=J.q(b.h(b9,e1),!0)
c2=s.createElement("div")
c2.className="player-board"
if(c0)c2.classList.add("active-player")
if(c1){a=c2.style
a0=B.y.bJ(a,"opacity")
a.setProperty(a0,"0.4","")}c3=s.createElement("div")
c3.className="player-header"
c4=s.createElement("div")
a=s.createElement("h3")
B.k.sj(a,A.ak(b.h(b9,d9)))
a.className="player-name"
c4.appendChild(a)
a=b.h(b9,"commander")
c5=A.n(a==null?"":a)
if($.ax&&c5.length!==0){a=s.createElement("span")
B.c.sj(a,c5)
a.className="player-commander-sub"
c4.appendChild(a)}c3.appendChild(c4)
if(c1){a=s.createElement("span")
B.c.sj(a,e1)
a.className="elim-badge"
c3.appendChild(a)}c2.appendChild(c3)
c6=s.createElement("div")
c6.className="status-bubble-row"
c7=s.createElement("div")
c7.className=J.q(b.h(b9,"isMonarch"),!0)?"status-bubble status-bubble-active":"status-bubble"
B.e.X(c7,'<span class="bubble-icon">\ud83d\udc51</span><span class="bubble-label">Monarch</span>')
A.l(c7,e2,o.a(new A.kx(b9)),!1,p)
c6.appendChild(c7)
c8=s.createElement("div")
c8.className=J.q(b.h(b9,"hasInitiative"),!0)?"status-bubble status-bubble-initiative status-bubble-active":"status-bubble status-bubble-initiative"
B.e.X(c8,'<span class="bubble-icon">\u2694\ufe0f</span><span class="bubble-label">Initiative</span>')
A.l(c8,e2,o.a(new A.ky(b9)),!1,p)
c6.appendChild(c8)
c2.appendChild(c6)
c9=s.createElement("div")
c9.className="life-section"
a=s.createElement("h2")
B.k.sj(a,A.c(b.h(b9,"life")))
a.className="life-num"
c9.appendChild(a)
d0=s.createElement("div")
d0.className="life-btns"
for(a=[-5,-1,1,5],b4=0;b4<4;++b4){d1=a[b4]
d2=s.createElement("button")
B.d.sj(d2,d1>0?"+"+d1:"\u2212"+Math.abs(d1))
d2.className=d1<0?"life-btn life-btn-minus":"life-btn life-btn-plus"
A.l(d2,e2,o.a(new A.kz(b8,d1)),!1,p)
d0.appendChild(d2)}i=s.createElement("button")
B.d.sj(i,"\u21a9")
i.className="undo-btn"
A.l(i,e2,o.a(new A.kA(b8)),!1,p)
d0.appendChild(i)
c9.appendChild(d0)
c2.appendChild(c9)
d3=s.createElement("div")
d3.className="stats-row"
d3.appendChild(A.jg("Poison",new A.kB(b9),new A.km(b9,b8),A.i(b.h(b9,"poison")),7))
a=b.h(b9,"radiation")
d3.appendChild(A.jg("Rad",new A.kn(b9),new A.ko(b9),A.i(a==null?0:a),7))
if($.eM){a=b.h(b9,"energy")
d3.appendChild(A.jg("Energy",new A.kp(b9),new A.kq(b9),A.i(a==null?0:a),null))}if($.eN){b=b.h(b9,"exp")
d3.appendChild(A.jg("Exp",new A.kr(b9),new A.ks(b9),A.i(b==null?0:b),null))}c2.appendChild(d3)
if($.ax){d4=s.createElement("div")
d4.className="cmd-section"
b=s.createElement("p")
B.h.sj(b,"Commander Damage")
b.className="cmd-section-label"
d4.appendChild(b)
b=$.d
if(!(b8<b.length))return A.b(b,b8)
d5=n.a(J.a(b[b8],"commanderDamage"))
J.dl(d5,new A.kt(d5,b9,b8,d4))
c2.appendChild(d4)}b7.appendChild(c2)}d6=s.createElement("div")
d6.id="log-container"
d6.className="game-log-box"
A.tC(d6)
r.appendChild(d6)
r.appendChild(A.eD())
A.tN()},
tC(a){var s,r,q,p,o
B.e.a3(a)
s=$.aY?$.bt:$.bL
for(r=A.L(s).i("bk<1>"),r=A.aO(new A.bk(s,r),0,A.az(20,"count",t.S),r.i("Q.E")),q=r.$ti,r=new A.aF(r,r.gm(r),q.i("aF<Q.E>")),q=q.i("Q.E");r.n();){p=r.d
if(p==null)p=q.a(p)
o=document.createElement("p")
B.h.sj(o,"\u25b8 "+p)
o.className="log-entry"
a.appendChild(o)}},
eD(){var s,r,q,p,o,n,m,l,k,j="bottom-btn",i="click",h=document,g=h.createElement("div")
g.className="bottom-bar"
s=h.createElement("button")
s.className=j
B.d.X(s,'<span class="bottom-btn-icon">\ud83d\udcdc</span><span class="bottom-btn-label">Tracker</span>')
r=t.C
q=r.i("~(1)?")
p=q.a(new A.j9())
t.Z.a(null)
r=r.c
A.l(s,i,p,!1,r)
o=h.createElement("button")
o.className=j
B.d.X(o,'<span class="bottom-btn-icon">\ud83c\udccf</span><span class="bottom-btn-label">Library</span>')
A.l(o,i,q.a(new A.ja()),!1,r)
n=h.createElement("button")
n.className=j
B.d.X(n,'<span class="bottom-btn-icon">\u2694\ufe0f</span><span class="bottom-btn-label">Battle</span>')
A.l(n,i,q.a(new A.jb()),!1,r)
m=h.createElement("button")
m.className=j
B.d.X(m,'<span class="bottom-btn-icon">\ufffd</span><span class="bottom-btn-label">Dice</span>')
A.l(m,i,q.a(new A.jc()),!1,r)
l=h.createElement("button")
l.className=j
B.d.X(l,'<span class="bottom-btn-icon">\ud83c\udfc6</span><span class="bottom-btn-label">Records</span>')
A.l(l,i,q.a(new A.jd()),!1,r)
k=h.createElement("button")
k.className="bottom-btn bottom-btn-home"
B.d.X(k,'<span class="bottom-btn-icon">\ud83c\udfe0</span><span class="bottom-btn-label">Game</span>')
A.l(k,i,q.a(new A.je()),!1,r)
g.appendChild(s)
g.appendChild(o)
g.appendChild(k)
g.appendChild(n)
g.appendChild(m)
g.appendChild(l)
return g},
jg(a,b,c,d,e){var s,r,q,p,o,n,m,l="stat-btn",k=e!=null&&d>=e,j=document,i=j.createElement("div")
i.className="stat-pill"
s=j.createElement("button")
B.d.sj(s,"\u2212")
s.className=l
r=t.C
q=r.i("~(1)?")
p=q.a(new A.jh(b))
t.Z.a(null)
r=r.c
A.l(s,"click",p,!1,r)
o=j.createElement("span")
B.c.sj(o,a)
o.className="stat-label"
n=j.createElement("span")
B.c.sj(n,""+d)
n.className=k?"stat-val stat-val-warn":"stat-val"
m=j.createElement("button")
B.d.sj(m,"+")
m.className=l
A.l(m,"click",q.a(new A.ji(c)),!1,r)
i.appendChild(s)
i.appendChild(o)
i.appendChild(n)
i.appendChild(m)
return i},
tN(){var s=$.k7
if(s!=null)s.aG()
$.k7=A.oT(B.a7,new A.k4())},
pe(){return B.a.h(B.z,B.f.a4($.aA,0,3))},
ry(){var s=$.aA
if(s>=3)return"Pass Turn \u2192";++s
if(!(s>=0))return A.b(B.z,s)
return"Next: "+B.z[s]+" \u2192"},
bK(a,b){var s,r,q,p,o=B.f.a4(a,0,3)
if(o===$.aA)return
$.aA=o
if(b&&$.b_&&$.d.length!==0){s=$.d
r=$.H
if(!(r>=0&&r<s.length))return A.b(s,r)
q=A.n(J.a(s[r],"name"))
p=A.pe()
A.w(q+" enters "+p+" phase",q+" is now in the "+p+" phase.")}},
p7(){var s=$.aA
if(s>=3){A.nZ(!1)
A.D(B.j)
return}A.bK(s+1,!0)
A.D(B.j)},
rH(){var s,r,q,p,o,n,m,l,k=document,j=k.createElement("div")
j.className="turn-flow-card"
s=k.createElement("div")
s.className="turn-flow-header"
r=k.createElement("span")
B.c.sj(r,"Turn "+$.b0)
r.className="turn-flow-kicker"
s.appendChild(r)
r=k.createElement("span")
q=$.d
p=$.H
if(!(p>=0&&p<q.length))return A.b(q,p)
B.c.sj(r,A.c(J.a(q[p],"name"))+" \xb7 "+A.pe()+" Phase")
r.className="turn-flow-title"
s.appendChild(r)
j.appendChild(s)
o=k.createElement("div")
o.className="turn-phase-stepper"
for(r=t.C,q=r.i("~(1)?"),p=t.Z,r=r.c,n=0;n<4;++n){m=k.createElement("button")
m.type="button"
l=$.aA
if(n<l)l="turn-phase-chip turn-phase-chip-done"
else l=n===l?"turn-phase-chip turn-phase-chip-active":"turn-phase-chip"
m.className=l
B.d.sj(m,B.z[n])
l=q.a(new A.jm(n))
p.a(null)
A.l(m,"click",l,!1,r)
o.appendChild(m)}j.appendChild(o)
k=k.createElement("p")
k.className="turn-flow-hint"
B.h.sj(k,$.aA>=3?"End step reached. Pass the turn when ready.":"Advance in order so the game state, voice commands, and combat all stay grounded in the current phase.")
j.appendChild(k)
return j},
rG(){var s,r,q,p,o,n,m,l,k,j,i,h,g="target-lock-detail",f="btn-secondary",e=document,d=e.createElement("div")
d.className="target-lock-panel"
s=$.bc
r=s==null
q=!r
s=r?null:s.h(0,"label")
p=J.m(s==null?"No target locked":s)
s=$.bc
s=s==null?null:s.h(0,"source")
o=J.m(s==null?"":s)
s=$.bc
s=s==null?null:s.h(0,"zone")
n=J.m(s==null?"":s)
m=e.createElement("div")
m.className="target-lock-copy"
s=e.createElement("span")
B.c.sj(s,"Effect Target")
s.className="target-lock-kicker"
m.appendChild(s)
s=e.createElement("span")
B.c.sj(s,p)
s.className="target-lock-value"
m.appendChild(s)
if(q)s=o.length!==0||n.length!==0
else s=!1
if(s){s=A.o([],t.s)
if(o.length!==0)s.push(o)
if(n.length!==0)s.push(n)
l=B.a.V(s," \xb7 ")
s=e.createElement("span")
B.c.sj(s,l)
s.className=g
m.appendChild(s)}else if(r){s=e.createElement("span")
B.c.sj(s,"Choose a player, permanent, or graveyard card for your next effect.")
s.className=g
m.appendChild(s)}d.appendChild(m)
k=e.createElement("div")
k.className="target-lock-actions"
j=e.createElement("button")
B.d.sj(j,q?"Change Target":"Select Target")
j.className=f
s=t.C
r=s.i("~(1)?")
i=r.a(new A.jj(o))
t.Z.a(null)
s=s.c
A.l(j,"click",i,!1,s)
k.appendChild(j)
if(q){h=e.createElement("button")
B.d.sj(h,"Clear")
h.className=f
A.l(h,"click",r.a(new A.jk()),!1,s)
k.appendChild(h)}d.appendChild(k)
return d},
bp(){var s=$.k7
if(s!=null)s.aG()
$.k7=null},
pF(){var s,r
A.bp()
$.b_=!1
$.b0=1
$.H=$.aA=0
B.a.C($.d)
B.a.C($.bL)
B.a.C($.bt)
$.cI.C(0)
$.a6=0
$.aB="battlefield"
s=t.N
r=t.S
$.aU=A.Y(s,r)
$.aw=A.Y(s,r)
$.d9=A.Y(s,r)
$.c6=0
$.cE=""
$.bJ=A.o([],t.p)
$.bI=A.o([],t.X)
$.db=A.o([],t.t)
$.ad=A.o([],t.s)
$.X=0
$.ae=!1
$.bh=$.bc=null
$.eN=$.eM=!1
B.B.H(window.localStorage,"mtg_operator_state")
B.B.H(window.localStorage,"mtg_spectator")
B.B.H(window.localStorage,"mtg_spectator_ts")
B.a.C($.bd)
r=document
s=r.querySelector("#game-screen")
if(s!=null){s=s.style
s.display="none"}s=r.querySelector("#setup-screen")
if(s!=null){s=s.style
s.display="block"}A.o5()},
pP(){var s,r,q,p,o,n,m="name"
A.bp()
$.b0=1
$.aA=0
$.cI.C(0)
s=t.N
r=t.S
$.aU=A.Y(s,r)
$.aw=A.Y(s,r)
$.d9=A.Y(s,r)
$.c6=0
$.cE=""
$.bJ=A.o([],t.p)
$.db=A.o([],t.t)
$.ad=A.o([],t.s)
$.X=0
$.ae=!1
$.bc=null
B.a.C($.bd)
for(s=t.X,q=t.f,p=0;o=$.d,n=o.length,p<n;++p){J.S(o[p],"life",$.at)
o=$.d
if(!(p<o.length))return A.b(o,p)
J.S(o[p],"poison",0)
o=$.d
if(!(p<o.length))return A.b(o,p)
J.S(o[p],"energy",0)
o=$.d
if(!(p<o.length))return A.b(o,p)
J.S(o[p],"exp",0)
o=$.d
if(!(p<o.length))return A.b(o,p)
J.S(o[p],"radiation",0)
o=$.d
if(!(p<o.length))return A.b(o,p)
J.S(o[p],"eliminated",!1)
o=$.d
if(!(p<o.length))return A.b(o,p)
J.S(o[p],"cards",[])
o=$.d
if(!(p<o.length))return A.b(o,p)
J.S(o[p],"isMonarch",!1)
o=$.d
if(!(p<o.length))return A.b(o,p)
J.S(o[p],"hasInitiative",!1)
o=$.aU
n=$.d
if(!(p<n.length))return A.b(n,p)
o.k(0,A.n(J.a(n[p],m)),0)
n=$.aw
o=$.d
if(!(p<o.length))return A.b(o,p)
n.k(0,A.n(J.a(o[p],m)),0)
o=$.d9
n=$.d
if(!(p<n.length))return A.b(n,p)
o.k(0,A.n(J.a(n[p],m)),0)
B.a.q($.bJ,A.o([$.at],s))
if($.ax){o=$.d
if(!(p<o.length))return A.b(o,p)
J.dl(q.a(J.a(o[p],"commanderDamage")),new A.l7(p))}}$.bI=A.cT(n,$.at,!1,r)
$.H=B.r.ad($.d.length)
B.a.C($.bL)
B.a.C($.bt)
$.bh=new A.aQ(Date.now(),!1)
A.w("Game reset!","The game has been reset. Everyone starts fresh.")
s=$.d
r=$.H
if(!(r>=0&&r<s.length))return A.b(s,r)
r=A.c(J.a(s[r],m))
s=$.d
q=$.H
if(!(q>=0&&q<s.length))return A.b(s,q)
A.w(r+" goes first!",A.c(J.a(s[q],m))+" will go first.")
q=$.d
s=$.H
if(!(s>=0&&s<q.length))return A.b(q,s)
s=A.c(J.a(q[s],m))
q=$.d
r=$.H
if(!(r>=0&&r<q.length))return A.b(q,r)
A.w(s+" enters Draw phase",A.c(J.a(q[r],m))+" is now in the Draw phase.")
A.D(B.j)},
ui(){var s,r
for(s=0;r=$.d,s<r.length;++s)J.S(r[s],"handSize",7)},
bf(a){var s
if(a<0||a>=$.d.length)return 0
s=$.d
if(!(a>=0&&a<s.length))return A.b(s,a)
s=J.a(s[a],"handSize")
return A.i(s==null?0:s)},
o7(a,b){var s,r,q,p,o,n,m
if(a<0||a>=$.d.length)return
s=A.bf(a)
r=$.d
if(!(a>=0&&a<r.length))return A.b(r,a)
J.S(r[a],"handSize",B.f.a4(s+b,0,999))
r=$.d
if(!(a<r.length))return A.b(r,a)
r=A.c(J.a(r[a],"name"))
q=""+b
p=b>1
o=p?"s":""
n=A.bf(a)
m=$.d
if(!(a<m.length))return A.b(m,a)
m=A.c(J.a(m[a],"name"))
p=p?"s":""
A.w(r+" draws "+q+" card"+o+" (Hand: "+n+")",m+" draws "+q+" card"+p+". Hand size is now "+A.bf(a)+".")
if($.aA===0)A.bK(1,!0)
A.aW()},
di(a,b){var s,r
if(a<0||a>=$.d.length)return
s=B.f.a4(A.bf(a)-b,0,999)
r=$.d
if(!(a>=0&&a<r.length))return A.b(r,a)
J.S(r[a],"handSize",s)
A.aW()},
pC(a,b){var s,r,q,p,o,n
if(a<0||a>=$.d.length)return
A.di(a,b)
s=$.d
if(!(a>=0&&a<s.length))return A.b(s,a)
s=A.c(J.a(s[a],"name"))
r=""+b
q=b>1
p=q?"s":""
o=A.bf(a)
n=$.d
if(!(a<n.length))return A.b(n,a)
n=A.c(J.a(n[a],"name"))
q=q?"s":""
A.w(s+" discards "+r+" card"+p+" (Hand: "+o+")",n+" discards "+r+" card"+q+".")
A.aW()},
t_(a){var s,r,q,p,o,n=A.bq(a)
if(n<0){B.a.u($.C,0,"\u274c Player not found")
A.J()
return}s=A.aq("(\\d+)").a6(a)
if(s!=null){r=s.b
if(1>=r.length)return A.b(r,1)
r=r[1]
r.toString
q=A.a4(r,null)
if(q==null)q=1}else q=1
A.o7(n,q)
r=$.C
p=$.d
if(!(n<p.length))return A.b(p,n)
p=A.c(J.a(p[n],"name"))
o=q>1?"s":""
B.a.u(r,0,"\u2713 "+p+" draws "+q+" card"+o+" \u2022 Hand: "+A.bf(n))
A.D(null)
A.J()},
rZ(a){var s,r,q,p,o,n=A.bq(a)
if(n<0){B.a.u($.C,0,"\u274c Player not found")
A.J()
return}s=A.aq("(\\d+)").a6(a)
if(s!=null){r=s.b
if(1>=r.length)return A.b(r,1)
r=r[1]
r.toString
q=A.a4(r,null)
if(q==null)q=1}else q=1
A.pC(n,q)
r=$.C
p=$.d
if(!(n<p.length))return A.b(p,n)
p=A.c(J.a(p[n],"name"))
o=q>1?"s":""
B.a.u(r,0,"\u2713 "+p+" discards "+q+" card"+o+" \u2022 Hand: "+A.bf(n))
A.D(null)
A.J()},
uv(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6="form-input form-input-xs",a7="dice-control-label",a8="dice-history-label",a9="dice-face-btn",b0="coin-btn",b1="click",b2=document,b3=b2.createElement("div")
b3.className="overlay"
s=b2.createElement("div")
s.className="overlay-box dice-overlay-box"
r=b2.createElement("h2")
B.k.sj(r,"Dice Roller")
r.className="overlay-title"
s.appendChild(r)
q=b2.createElement("div")
q.className="dice-result-area"
p=b2.createElement("span")
B.c.sj(p,"\u2014")
p.className="dice-result-num"
o=b2.createElement("span")
B.c.sj(o,"")
o.className="dice-result-label"
q.appendChild(p)
q.appendChild(o)
s.appendChild(q)
n=b2.createElement("div")
n.className="dice-controls-row"
m=A.aj("number")
B.l.sI(m,"1")
B.l.sdt(m,"1")
B.l.sds(m,"10")
m.className=a6
l=A.aj("number")
B.l.sI(l,"0")
l.className=a6
r=b2.createElement("span")
B.c.sj(r,"Qty")
r.className=a7
n.appendChild(r)
n.appendChild(m)
r=b2.createElement("span")
B.c.sj(r,"Modifier")
r.className=a7
n.appendChild(r)
n.appendChild(l)
s.appendChild(n)
k=b2.createElement("div")
k.className="dice-grid"
j=b2.createElement("div")
j.className="dice-history"
r=b2.createElement("span")
B.c.sj(r,"Roll History")
r.className=a8
j.appendChild(r)
i=new A.lL(j)
for(r=[4,6,8,10,12,20],h=t.C,g=h.i("~(1)?"),f=t.Z,h=h.c,e=0;e<6;++e){d=r[e]
c=b2.createElement("button")
B.d.sj(c,"d"+d)
c.className=a9
b=g.a(new A.lF(m,l,d,p,o,i))
f.a(null)
A.l(c,b1,b,!1,h)
k.appendChild(c)}a=b2.createElement("button")
B.d.sj(a,"d100")
a.className=a9
r=g.a(new A.lG(p,o,i))
f.a(null)
A.l(a,b1,r,!1,h)
k.appendChild(a)
s.appendChild(k)
a0=b2.createElement("div")
a0.className="coin-row"
a1=b2.createElement("span")
B.c.sj(a1,"")
a1.className="coin-result"
a2=b2.createElement("button")
B.d.sj(a2,"Flip Coin")
a2.className=b0
A.l(a2,b1,g.a(new A.lH(a1,i)),!1,h)
a0.appendChild(a1)
a0.appendChild(a2)
s.appendChild(a0)
a3=b2.createElement("div")
a3.className="dice-player-chooser"
r=b2.createElement("span")
B.c.sj(r,"Random Player")
r.className=a8
a3.appendChild(r)
a4=b2.createElement("button")
B.d.sj(a4,"Pick Active Player")
a4.className=b0
A.l(a4,b1,g.a(new A.lI(p,o,i)),!1,h)
a3.appendChild(a4)
s.appendChild(a3)
s.appendChild(j)
a5=b2.createElement("button")
B.d.sj(a5,"Close")
a5.className="overlay-continue-btn"
A.l(a5,b1,g.a(new A.lJ(b3)),!1,h)
s.appendChild(a5)
b3.appendChild(s)
A.l(b3,b1,g.a(new A.lK(b3)),!1,h)
b2.body.appendChild(b3)},
eF(a){var s,r,q,p="counterData",o=J.j(a),n=t.U.a(o.h(a,p))
if(n==null)n=B.v
s=t.z
r=A.ac(J.dm(n,new A.ju(),s,s),t.N,t.S)
s=o.h(a,"counters")
q=A.i(s==null?0:s)
if(q>0)r.k(0,"+1/+1",q)
o.k(a,p,r)
return r},
pt(a){var s=A.eF(a).h(0,"+1/+1")
J.S(a,"counters",s==null?0:s)},
rO(a,b){var s
if(a==="+1/+1"){s=""+b
return"+"+s+"/+"+s}return""+b+" "+a},
jn(a){var s,r="No counters",q=A.eF(a)
if(q.a===0)return r
s=A.o([],t.s)
q.K(0,new A.jo(s))
return s.length===0?r:B.a.V(s," \xb7 ")},
ha(a,b,c){var s,r=A.eF(a),q=r.h(0,b)
if(q==null)q=0
if(typeof q!=="number")return q.J()
s=B.i.a4(q+c,0,999)
if(s<=0)r.H(0,b)
else r.k(0,b,s)
A.pt(a)},
mk(b0,b1,b2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4="stats-section-label",a5="name",a6="target-choice-btn",a7="click",a8=document,a9=a8.createElement("div")
a9.className="overlay"
s=a8.createElement("div")
s.className="overlay-box target-selector-box"
r=a8.createElement("h2")
B.k.sj(r,b2)
r.className="overlay-title"
s.appendChild(r)
if(b1!=null&&b1.length!==0){r=a8.createElement("p")
B.h.sj(r,"Source: "+A.c(b1))
r.className="overlay-sub"
s.appendChild(r)}q=new A.ml(b1,a9)
p=a8.createElement("div")
p.className="target-selector-list"
r=a8.createElement("p")
B.h.sj(r,"Players")
r.className=a4
p.appendChild(r)
for(r=t.C,o=r.i("~(1)?"),n=t.Z,r=r.c,m=0;m<$.d.length;++m){l=a8.createElement("button")
k=$.d
if(!(m<k.length))return A.b(k,m)
k=A.c(J.a(k[m],a5))
j=$.d
if(!(m<j.length))return A.b(j,m)
B.d.sj(l,k+" \xb7 "+A.c(J.a(j[m],"life"))+" life")
l.className=a6
j=o.a(new A.mm(q,m,b1))
n.a(null)
A.l(l,a7,j,!1,r)
p.appendChild(l)}i=["battlefield","graveyard","exile"]
for(k=t.P,j=t.j,h=b0!=null,g=0;g<3;++g){f=i[g]
e=a8.createElement("p")
B.h.sj(e,f.toUpperCase())
e.className=a4
p.appendChild(e)
for(e=f!=="battlefield",d=!1,c=0;b=$.d,c<b.length;++c){if(h&&b0>=0&&e&&c!==b0)continue
for(b=J.T(j.a(J.a(b[c],"cards")));b.n();){a=k.a(b.gt())
a0=J.j(a)
if(!J.q(a0.h(a,"zone"),f))continue
a1=a8.createElement("button")
a0=A.c(a0.h(a,a5))
a2=$.d
if(!(c<a2.length))return A.b(a2,c)
B.d.sj(a1,a0+" \xb7 "+A.c(J.a(a2[c],a5)))
a1.className=a6
a2=o.a(new A.mn(q,a,b1,f,c))
n.a(null)
A.l(a1,a7,a2,!1,r)
p.appendChild(a1)
d=!0}}if(!d){e=a8.createElement("p")
B.h.sj(e,"No valid targets here.")
e.className="zone-empty"
p.appendChild(e)}}s.appendChild(p)
a3=a8.createElement("button")
B.d.sj(a3,"Close")
a3.className="overlay-cancel-btn"
k=o.a(new A.mo(a9))
n.a(null)
A.l(a3,a7,k,!1,r)
s.appendChild(a3)
a9.appendChild(s)
A.l(a9,a7,o.a(new A.mp(a9)),!1,r)
a8.body.appendChild(a9)},
uu(a,b){var s,r,q,p,o,n,m,l,k,j,i="click",h=document,g=h.createElement("div")
g.className="overlay"
s=h.createElement("div")
s.className="overlay-box counter-editor-box"
r=h.createElement("h2")
B.k.sj(r,A.c(J.a(a,"name"))+" Counters")
r.className="overlay-title"
s.appendChild(r)
q=h.createElement("p")
q.className="overlay-sub"
p=h.createElement("div")
p.className="counter-editor-list"
o=A.aj(null)
o.placeholder="Custom counter name"
o.className="form-input"
r=new A.lz(a,q,p)
r.$0()
s.appendChild(q)
s.appendChild(p)
n=h.createElement("div")
n.className="tracker-add-row"
m=h.createElement("button")
B.d.sj(m,"Add Counter Type")
m.className="tracker-add-btn btn-secondary"
l=t.C
k=l.i("~(1)?")
r=k.a(new A.lw(o,a,r))
t.Z.a(null)
l=l.c
A.l(m,i,r,!1,l)
n.appendChild(o)
n.appendChild(m)
s.appendChild(n)
j=h.createElement("button")
B.d.sj(j,"Done")
j.className="overlay-done-btn"
A.l(j,i,k.a(new A.lx(b,a,g)),!1,l)
s.appendChild(j)
g.appendChild(s)
A.l(g,i,k.a(new A.ly(g)),!1,l)
h.body.appendChild(g)},
uB(a0,a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e="tracker-add-btn",d="tracker-add-btn btn-secondary",c="click",b=document,a=b.createElement("div")
a.className="overlay"
s=b.createElement("div")
s.className="overlay-box graveyard-action-box"
r=b.createElement("h2")
q=J.j(a0)
B.k.sj(r,A.ak(q.h(a0,"name")))
r.className="overlay-title"
s.appendChild(r)
r=b.createElement("p")
p=q.h(a0,"zone")
p=J.m(p==null?"":p).toUpperCase()
o=$.d
if(!(a1>=0&&a1<o.length))return A.b(o,a1)
B.h.sj(r,"Zone: "+p+" \xb7 Owner: "+A.c(J.a(o[a1],"name")))
r.className="overlay-sub"
s.appendChild(r)
r=new A.nj(a)
n=b.createElement("div")
n.className="graveyard-action-grid"
m=b.createElement("button")
B.d.sj(m,"Choose Target")
m.className=e
o=t.C
p=o.i("~(1)?")
l=p.a(new A.nc(a,a0,a1))
t.Z.a(null)
o=o.c
A.l(m,c,l,!1,o)
n.appendChild(m)
q=q.h(a0,"zone")
k=J.m(q==null?"":q)
if(k!=="battlefield"){j=b.createElement("button")
B.d.sj(j,"Return to Battlefield")
j.className=e
A.l(j,c,p.a(new A.nd(a0,r,a1)),!1,o)
n.appendChild(j)}if(k!=="exile"){i=b.createElement("button")
B.d.sj(i,"Move to Exile")
i.className=d
A.l(i,c,p.a(new A.ne(a0,r,a1)),!1,o)
n.appendChild(i)}h=b.createElement("button")
B.d.sj(h,"Return to Hand")
h.className=d
A.l(h,c,p.a(new A.nf(a1,a0,r)),!1,o)
n.appendChild(h)
g=b.createElement("button")
B.d.sj(g,"Shuffle Into Library")
g.className=d
A.l(g,c,p.a(new A.ng(a1,a0,r)),!1,o)
n.appendChild(g)
s.appendChild(n)
f=b.createElement("button")
B.d.sj(f,"Close")
f.className="overlay-cancel-btn"
A.l(f,c,p.a(new A.nh(a)),!1,o)
s.appendChild(f)
a.appendChild(s)
A.l(a,c,p.a(new A.ni(a)),!1,o)
b.body.appendChild(a)},
uz(a,b){var s,r,q,p,o,n={},m=document,l=m.createElement("div")
l.className="overlay who-goes-first-overlay"
s=m.createElement("div")
s.className="overlay-box who-goes-first-box"
r=m.createElement("h2")
B.k.sj(r,"Who Goes First?")
r.className="overlay-title"
s.appendChild(r)
q=m.createElement("div")
q.className="roll-area"
p=m.createElement("div")
B.e.sj(p,"Rolling...")
p.className="player-roller"
q.appendChild(p)
s.appendChild(q)
n.a=n.b=0
o=B.r.ad(a.length)
A.cR(A.cj(500),new A.n6(n,p,a,o,l,b,s),t.H)
l.appendChild(s)
n=t.C
r=n.i("~(1)?").a(new A.n9(l))
t.Z.a(null)
A.l(l,"click",r,!1,n.c)
m.body.appendChild(l)},
uy(){var s,r,q,p,o,n=document,m=n.createElement("div")
m.className="overlay"
s=n.createElement("div")
s.className="overlay-box"
r=n.createElement("h2")
B.k.sj(r,"Settings")
r.className="overlay-title"
s.appendChild(r)
r=n.createElement("p")
B.h.sj(r,"Optional counters to show on player cards")
r.className="overlay-sub"
s.appendChild(r)
s.appendChild(A.pc("For decks that generate energy","Energy counters",new A.m0(),$.eM))
s.appendChild(A.pc("For commanders that use Exp","Experience counters",new A.m1(),$.eN))
q=n.createElement("button")
B.d.sj(q,"Done")
q.className="overlay-done-btn"
r=t.C
p=r.i("~(1)?")
o=p.a(new A.m2(m))
t.Z.a(null)
r=r.c
A.l(q,"click",o,!1,r)
s.appendChild(q)
m.appendChild(s)
A.l(m,"click",p.a(new A.m3(m)),!1,r)
n.body.appendChild(m)},
pc(a,b,c,d){var s,r,q,p,o,n={},m=document,l=m.createElement("div")
l.className="toggle-row"
s=m.createElement("div")
r=m.createElement("p")
B.h.sj(r,b)
r.className="toggle-label"
s.appendChild(r)
r=m.createElement("p")
B.h.sj(r,a)
r.className="toggle-desc"
s.appendChild(r)
q=m.createElement("div")
q.className="toggle-switch"
r=q.style
p=d?"#e2b96f":"#2a2d3e"
r.background=p
o=m.createElement("div")
o.className="toggle-thumb"
m=o.style
r=d?"23px":"3px"
m.left=r
q.appendChild(o)
n.a=d
m=t.C
n=m.i("~(1)?").a(new A.jl(n,c,q,o))
t.Z.a(null)
A.l(q,"click",n,!1,m.c)
l.appendChild(s)
l.appendChild(q)
return l},
cH(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,g0,g1,g2,g3,g4,g5,g6,g7=null,g8="tracker-add-row",g9="name",h0="tracker-input",h1="tracker-add-btn",h2="tracker-add-btn btn-secondary",h3="card-edit-btn",h4="type",h5="tapped",h6="counters",h7="counter-btn",h8="type-badge",h9="toughness",i0="zone-btn-gy",i1="zone-btn-exile",i2="click",i3={}
$.bb=B.m
s=document
r=t._.a(s.querySelector("#game-screen"))
if(r==null)return
q=B.f.R(B.t.gbz(window))
B.e.a3(r)
p=s.createElement("button")
B.d.sj(p,"\u2190 Back to Game")
p.className="btn-back"
o=t.C
n=o.i("~(1)?")
m=n.a(new A.mv())
t.Z.a(null)
o=o.c
A.l(p,i2,m,!1,o)
r.appendChild(p)
m=s.createElement("h2")
B.k.sj(m,"Card Tracker")
m.className="tracker-title"
r.appendChild(m)
l=s.createElement("div")
l.className="tracker-add-box"
k=s.createElement("div")
k.className=g8
j=s.createElement("select")
j.className="tracker-select"
for(i=0;m=$.d,i<m.length;++i)j.appendChild(A.cq(A.n(J.a(m[i],g9)),""+i,g7,!1))
B.A.sI(j,""+$.a6)
m=t.E
h=m.i("~(1)?")
m=m.c
A.l(j,"change",h.a(new A.mw(j)),!1,m)
g=A.aj(g7)
g.placeholder="Search card name..."
g.className=h0
f=s.createElement("div")
f.className="scryfall-dropdown"
e=f.style
e.display="none"
i3.a=null
d=new A.mu(i3,g,f,l)
A.l(g,"input",h.a(new A.mx(g,f,d)),!1,m)
e=t.aY
c=e.i("~(1)?")
e=e.c
A.l(g,"keydown",c.a(new A.mI(i3,f,g,d)),!1,e)
b=s.createElement("button")
B.d.sj(b,"+ Add")
b.className=h1
A.l(b,i2,n.a(new A.mT(i3,g,j)),!1,o)
k.appendChild(j)
k.appendChild(g)
k.appendChild(b)
l.appendChild(k)
l.appendChild(f)
a=s.createElement("div")
a.className=g8
a0=s.createElement("button")
B.d.sj(a0,"\ud83d\udcdd Manual Entry")
a0.className=h2
A.l(a0,i2,n.a(new A.n_()),!1,o)
a1=s.createElement("button")
B.d.sj(a1,"\ud83c\udfaf Target Selector")
a1.className=h2
A.l(a1,i2,n.a(new A.n0()),!1,o)
a.appendChild(a0)
a.appendChild(a1)
l.appendChild(a)
if($.bc!=null){a2=s.createElement("div")
a2.className="tracker-target-banner"
a3=s.createElement("span")
B.c.sj(a3,"Target Locked")
a3.className="target-lock-kicker"
a2.appendChild(a3)
a3=s.createElement("span")
a4=$.bc
a4=a4==null?g7:a4.h(0,"label")
B.c.sj(a3,J.m(a4==null?"":a4))
a3.className="target-lock-value"
a2.appendChild(a3)
a5=s.createElement("button")
B.d.sj(a5,"Clear")
a5.className=h3
A.l(a5,i2,n.a(new A.n1()),!1,o)
a2.appendChild(a5)
l.appendChild(a2)}r.appendChild(l)
a6=s.createElement("div")
a6.className="tab-row"
for(i=0;i<$.d.length;++i){a3=$.a6
a7=s.createElement("button")
a4=$.d
if(!(i<a4.length))return A.b(a4,i)
B.d.sj(a7,A.ak(J.a(a4[i],g9)))
a7.className=i===a3?"tab-btn tab-btn-active":"tab-btn"
A.l(a7,i2,n.a(new A.n2(i)),!1,o)
a6.appendChild(a7)}r.appendChild(a6)
a3=$.d
a4=$.a6
if(!(a4>=0&&a4<a3.length))return A.b(a3,a4)
a8=t.j
a9=a8.a(J.a(a3[a4],"cards"))
a4=J.a0(a9)
a3=a4.a8(a9,new A.n3())
b0=a3.gm(a3)
a3=a4.a8(a9,new A.n4())
b1=a3.gm(a3)
a3=a4.a8(a9,new A.my())
b2=a3.gm(a3)
b3=s.createElement("div")
b3.className="zone-row"
for(a3=t.s,b4=[A.o(["battlefield","Battlefield ("+b0+")"],a3),A.o(["graveyard","Graveyard ("+b1+")"],a3),A.o(["exile","Exile ("+b2+")"],a3)],b5=0;b5<3;++b5){b6=b4[b5]
if(0>=b6.length)return A.b(b6,0)
b7=b6[0]
b8=$.aB
b9=s.createElement("button")
if(1>=b6.length)return A.b(b6,1)
B.d.sj(b9,b6[1])
b9.className=b8===b7?"zone-btn zone-btn-active":"zone-btn"
A.l(b9,i2,n.a(new A.mz(b7)),!1,o)
b3.appendChild(b9)}r.appendChild(b3)
a4=a4.a8(a9,new A.mA())
c0=A.a8(a4,!0,a4.$ti.i("k.E"))
a4=c0.length
if(a4===0){a3=s.createElement("p")
B.h.sj(a3,"No cards in this zone.")
a3.className="zone-empty"
r.appendChild(a3)}else{b4=t.N
c1=A.G(["creature","Creatures","land","Lands","artifact","Artifacts","enchantment","Enchantments","planeswalker","Planeswalkers","instant","Instants","sorcery","Sorceries"],b4,b4)
c2=A.Y(b4,a8)
for(b5=0;b5<a4;++b5){c3=c0[b5]
J.F(c2.dw(0,A.n(J.a(c3,h4)),new A.mB()),c3)}c4=A.o([],a3)
for(b5=0;b5<3;++b5){c5=B.P[b5]
if(c2.M(0,c5))B.a.q(c4,c5)}a3=c2.$ti.i("b6<1>")
a4=a3.i("a_<k.E>")
c6=A.a8(new A.a_(new A.b6(c2,a3),a3.i("y(k.E)").a(new A.mC()),a4),!0,a4.i("k.E"))
B.a.cp(c6)
B.a.T(c4,c6)
for(a3=c4.length,a4=t.R,a8=t.P,b5=0;b5<c4.length;c4.length===a3||(0,A.N)(c4),++b5){c5=c4[b5]
c7=c2.h(0,c5)
if(c7==null)c7=[]
b8=J.a0(c7)
b8.a1(c7,new A.mD())
c8=s.createElement("p")
c9=c1.h(0,c5)
if(c9==null)c9=c5
B.h.sj(c8,c9.toUpperCase())
c8.className="card-section-label"
r.appendChild(c8)
for(b8=b8.gv(c7);b8.n();){d0={}
c3=b8.gt()
d1=s.createElement("div")
c8=J.j(c3)
d1.className=J.q(c8.h(c3,h5),!0)?"card-outer card-outer-tapped":"card-outer"
d2=s.createElement("div")
d2.className=J.q(c8.h(c3,h5),!0)?"card-row card-row-tapped":"card-row"
if($.aB==="battlefield"){d3=s.createElement("div")
d3.className=J.q(c8.h(c3,h5),!0)?"tap-dot tap-dot-active":"tap-dot"
A.l(d3,i2,n.a(new A.mE(c3)),!1,o)
d2.appendChild(d3)}d4=s.createElement("div")
d4.className="card-name-col"
c9=c8.h(c3,"supertypes")
d5=A.a7(a4.a(c9==null?[]:c9),!0,b4)
d6=d5.length!==0?B.a.V(d5," ")+" "+A.c(c8.h(c3,g9)):A.n(c8.h(c3,g9))
d7=s.createElement("span")
B.c.sj(d7,d6+(J.q(c8.h(c3,h5),!0)&&$.aB==="battlefield"?" (tapped)":""))
d7.className=J.q(c8.h(c3,h5),!0)?"card-name card-name-tapped":"card-name"
c9=c8.h(c3,"imageUrl")
d8=c9==null?g7:J.m(c9)
if(d8!=null&&d8.length!==0){c9=d7.style
c9.cursor="pointer"
A.l(d7,i2,n.a(new A.mF(d8,c3)),!1,o)
d0.a=null
A.l(d7,"mouseenter",n.a(new A.mG(d0,d8,c3,d7)),!1,o)
A.l(d7,"mouseleave",n.a(new A.mH(d0)),!1,o)}d4.appendChild(d7)
c9=c8.h(c3,"subtype")
d9=J.cJ(J.m(c9==null?"":c9))
if(d9.length!==0){c9=s.createElement("span")
B.c.sj(c9,d9)
c9.className="card-subtype"
d4.appendChild(c9)}d2.appendChild(d4)
c9=c8.h(c3,"manaCost")
e0=J.cJ(J.m(c9==null?"":c9))
if(e0.length!==0)d2.appendChild(A.u0(e0,18))
if($.aB==="battlefield"){a8.a(c3)
c9=A.eF(c3).h(0,"+1/+1")
c8.k(c3,h6,c9==null?0:c9)
c9=c8.h(c3,h6)
e1=A.i(c9==null?0:c9)
e2=s.createElement("div")
e2.className="counter-pill"
e3=s.createElement("button")
B.d.sj(e3,"\u2212")
e3.className=h7
e4=s.createElement("span")
c9=e1>0
if(c9){e5=""+e1
e5="+"+e5+"/+"+e5}else e5="0"
B.c.sj(e4,e5)
e4.className=c9?"counter-val counter-val-active":"counter-val"
e6=s.createElement("button")
B.d.sj(e6,"+")
e6.className=h7
A.l(e3,i2,n.a(new A.mJ(c3,e4)),!1,o)
A.l(e6,i2,n.a(new A.mK(c3,e4)),!1,o)
e2.appendChild(e3)
e2.appendChild(e4)
e2.appendChild(e6)
d2.appendChild(e2)}e7=s.createElement("span")
a8.a(c3)
B.c.sj(e7,A.jn(c3))
e7.className=A.jn(c3)==="No counters"?h8:"counter-summary-badge"
d2.appendChild(e7)
if(J.q(c8.h(c3,h4),"creature"))c9=c8.h(c3,"power")!=null||c8.h(c3,h9)!=null
else c9=!1
if(c9){c9=c8.h(c3,"power")
e8=A.i(c9==null?0:c9)
c9=c8.h(c3,h9)
e9=A.i(c9==null?0:c9)
c9=c8.h(c3,h6)
f0=A.i(c9==null?0:c9)
c9=c8.h(c3,"tempPtBonus")
f1=A.i(c9==null?0:c9)
c9=s.createElement("span")
B.c.sj(c9,""+(e8+f0+f1)+"/"+(e9+f0+f1))
c9.className="pt-badge"
d2.appendChild(c9)}c9=s.createElement("span")
B.c.sj(c9,A.ak(c8.h(c3,h4)))
c9.className=h8
d2.appendChild(c9)
c8=c8.h(c3,"keywords")
f2=A.a7(a4.a(c8==null?[]:c8),!0,b4)
c8=f2.length
if(c8!==0){f3=s.createElement("div")
f3.className="card-kw-row"
for(f4=0;f4<c8;++f4){f5=f2[f4]
f6=s.createElement("span")
B.c.sj(f6,f5)
f6.className="card-kw-badge"
if(B.S.M(0,f5)){c9=f6.style
c9.cursor="pointer"
A.l(f6,i2,n.a(new A.mL(f5)),!1,o)}f3.appendChild(f6)}d1.appendChild(f3)}if($.aB==="battlefield"){A.he("\u2192 GY",i0,new A.mM(c3),d2)
A.he("\u2192 Exile",i1,new A.mN(c3),d2)}else{A.he("\u2192 BF",i0,new A.mO(c3),d2)
if($.aB==="graveyard")A.he("\u2192 Exile",i1,new A.mP(c3),d2)
else A.he("\u2192 GY",i0,new A.mQ(c3),d2)}f7=s.createElement("button")
B.d.sj(f7,"\u2726")
f7.className="fx-btn"
B.d.sbv(f7,$.aB==="battlefield"?"Choose effect target":"Zone interactions")
A.l(f7,i2,n.a(new A.mR(c3)),!1,o)
d2.appendChild(f7)
f8=s.createElement("button")
B.d.sj(f8,"Counters")
f8.className="fx-btn"
A.l(f8,i2,n.a(new A.mS(c3)),!1,o)
d2.appendChild(f8)
f9=s.createElement("button")
B.d.sj(f9,"\u270f")
f9.className=h3
A.l(f9,i2,n.a(new A.mU(c3)),!1,o)
d2.appendChild(f9)
g0=s.createElement("button")
B.d.sj(g0,"\u2715")
g0.className="card-remove-btn"
A.l(g0,i2,n.a(new A.mV(c3)),!1,o)
d2.appendChild(g0)
d1.appendChild(d2)
r.appendChild(d1)}}}A.pq(r,"Token Creator")
g1=s.createElement("div")
g1.className=g8
g2=A.aj(g7)
g2.placeholder="Token name (e.g. Goblin)"
g2.className=h0
g3=A.aj(g7)
g3.placeholder="P/T (e.g. 1/1)"
g3.className="tracker-input tracker-input-sm"
g4=A.aj("number")
g4.placeholder="Qty"
B.l.sI(g4,"1")
g4.className="tracker-input tracker-input-xs"
a3=new A.n5(g2,g3,g4)
A.l(g2,"keydown",c.a(new A.mW(a3)),!1,e)
g5=s.createElement("button")
B.d.sj(g5,"+ Create")
g5.className=h1
A.l(g5,i2,n.a(new A.mX(a3)),!1,o)
g1.appendChild(g2)
g1.appendChild(g3)
g1.appendChild(g4)
g1.appendChild(g5)
r.appendChild(g1)
A.pq(r,"Notes")
g6=s.createElement("textarea")
g6.placeholder="Track effects, triggers, emblems..."
g6.className="tracker-notes"
s=$.cI.h(0,$.a6)
B.aC.sI(g6,s==null?"":s)
A.l(g6,"input",h.a(new A.mY(g6)),!1,m)
r.appendChild(g6)
r.appendChild(A.eD())
A.cR(B.ab,new A.mZ(q),t.a)},
pq(a,b){var s=document.createElement("p")
B.h.sj(s,b.toUpperCase())
s.className="section-divider-label"
a.appendChild(s)},
he(a,b,c,d){var s,r,q=document.createElement("button")
B.d.sj(q,a)
q.className=b
s=t.C
r=s.i("~(1)?").a(new A.kf(c))
t.Z.a(null)
A.l(q,"click",r,!1,s.c)
d.appendChild(q)},
ux(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4=null,a5="form-group",a6="form-label",a7="form-input",a8="form-group form-group-hidden",a9="form-input form-input-sm",b0="click",b1=document,b2=b1.createElement("div")
b2.className="overlay"
s=b1.createElement("div")
s.className="overlay-box manual-card-box"
r=b1.createElement("h2")
B.k.sj(r,"Add Card Manually")
r.className="overlay-title"
s.appendChild(r)
q=b1.createElement("div")
q.className=a5
r=b1.createElement("label")
B.q.sj(r,"Card Name")
r.className=a6
q.appendChild(r)
p=A.aj(a4)
p.placeholder="Enter card name"
p.className=a7
q.appendChild(p)
s.appendChild(q)
o=b1.createElement("div")
o.className=a5
r=b1.createElement("label")
B.q.sj(r,"Card Type")
r.className=a6
o.appendChild(r)
n=b1.createElement("select")
n.className=a7
for(r=["creature","land","artifact","enchantment","planeswalker","instant","sorcery","other"],m=0;m<8;++m){l=r[m]
k=A.cq(l,l,a4,!1)
if(0>=l.length)return A.b(l,0)
B.D.sj(k,l[0].toUpperCase()+B.b.a2(l,1))
n.appendChild(k)}B.A.sI(n,"creature")
o.appendChild(n)
s.appendChild(o)
j=b1.createElement("div")
j.className=a8
j.id="pt-group"
r=b1.createElement("label")
B.q.sj(r,"Power / Toughness")
r.className=a6
j.appendChild(r)
i=b1.createElement("div")
i.className="form-row"
h=A.aj("number")
h.placeholder="0"
h.className=a9
B.l.sI(h,"0")
g=A.aj("number")
g.placeholder="0"
g.className=a9
B.l.sI(g,"0")
i.appendChild(h)
r=b1.createElement("span")
B.c.sj(r," / ")
k=r.style
k.margin="0 8px"
i.appendChild(r)
i.appendChild(g)
j.appendChild(i)
s.appendChild(j)
f=b1.createElement("div")
f.className=a8
f.id="kw-group"
r=b1.createElement("label")
B.q.sj(r,"Keywords (comma-separated)")
r.className=a6
f.appendChild(r)
e=A.aj(a4)
e.placeholder="e.g. Flying, Haste, Vigilance"
e.className=a7
f.appendChild(e)
s.appendChild(f)
d=b1.createElement("div")
d.className=a5
r=b1.createElement("label")
B.q.sj(r,"Mana Cost (optional)")
r.className=a6
d.appendChild(r)
c=A.aj(a4)
c.placeholder="e.g. {2}{R}{R} or 3RR"
c.className=a7
d.appendChild(c)
s.appendChild(d)
b=b1.createElement("div")
b.className=a5
r=b1.createElement("label")
B.q.sj(r,"Zone")
r.className=a6
b.appendChild(r)
a=b1.createElement("select")
a.className=a7
for(r=["battlefield","graveyard","exile"],m=0;m<3;++m){a0=r[m]
k=A.cq(a0,a0,a4,!1)
if(0>=a0.length)return A.b(a0,0)
B.D.sj(k,a0[0].toUpperCase()+B.b.a2(a0,1))
a.appendChild(k)}B.A.sI(a,"battlefield")
b.appendChild(a)
s.appendChild(b)
r=t.E
k=r.i("~(1)?").a(new A.lW(new A.m_(n,j,f)))
t.Z.a(null)
A.l(n,"change",k,!1,r.c)
a1=b1.createElement("div")
a1.className="form-button-row"
a2=b1.createElement("button")
B.d.sj(a2,"Cancel")
a2.className="overlay-cancel-btn"
r=t.C
k=r.i("~(1)?")
r=r.c
A.l(a2,b0,k.a(new A.lX(b2)),!1,r)
a3=b1.createElement("button")
B.d.sj(a3,"Add Card")
a3.className="overlay-done-btn"
A.l(a3,b0,k.a(new A.lY(p,n,h,g,a,c,e,b2)),!1,r)
a1.appendChild(a2)
a1.appendChild(a3)
s.appendChild(a1)
b2.appendChild(s)
A.l(b2,b0,k.a(new A.lZ(b2)),!1,r)
b1.body.appendChild(b2)},
us(c0,c1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2=null,b3="form-group",b4="form-label",b5="form-input",b6="form-input form-input-sm",b7="click",b8=document,b9=b8.createElement("div")
b9.className="overlay"
s=b8.createElement("div")
s.className="overlay-box manual-card-box"
r=b8.createElement("h2")
B.k.sj(r,"Edit Card")
r.className="overlay-title"
s.appendChild(r)
r=J.j(c0)
q=r.h(c0,"name")
p=A.n(q==null?"":q)
q=r.h(c0,"type")
o=A.n(q==null?"creature":q)
q=r.h(c0,"power")
n=A.i(q==null?0:q)
q=r.h(c0,"toughness")
m=A.i(q==null?0:q)
q=r.h(c0,"keywords")
if(q==null)q=[]
l=A.a7(t.R.a(q),!0,t.N)
q=r.h(c0,"manaCost")
k=A.n(q==null?"":q)
r=r.h(c0,"zone")
j=A.n(r==null?"battlefield":r)
i=b8.createElement("div")
i.className=b3
r=b8.createElement("label")
B.q.sj(r,"Card Name")
r.className=b4
i.appendChild(r)
h=A.aj(b2)
h.placeholder="Enter card name"
h.className=b5
B.l.sI(h,p)
i.appendChild(h)
s.appendChild(i)
g=b8.createElement("div")
g.className=b3
r=b8.createElement("label")
B.q.sj(r,"Card Type")
r.className=b4
g.appendChild(r)
f=b8.createElement("select")
f.className=b5
for(r=["creature","land","artifact","enchantment","planeswalker","instant","sorcery","other"],e=0;e<8;++e){d=r[e]
q=A.cq(d,d,b2,!1)
if(0>=d.length)return A.b(d,0)
B.D.sj(q,d[0].toUpperCase()+B.b.a2(d,1))
f.appendChild(q)}B.A.sI(f,o)
g.appendChild(f)
s.appendChild(g)
c=b8.createElement("div")
c.className=b3
r=o!=="creature"
if(r)c.classList.add("form-group-hidden")
c.id="pt-group-edit"
q=b8.createElement("label")
B.q.sj(q,"Power / Toughness")
q.className=b4
c.appendChild(q)
b=b8.createElement("div")
b.className="form-row"
a=A.aj("number")
a.placeholder="0"
a.className=b6
B.l.sI(a,B.f.p(n))
a0=A.aj("number")
a0.placeholder="0"
a0.className=b6
B.l.sI(a0,B.f.p(m))
b.appendChild(a)
q=b8.createElement("span")
B.c.sj(q," / ")
a1=q.style
a1.margin="0 8px"
b.appendChild(q)
b.appendChild(a0)
c.appendChild(b)
s.appendChild(c)
a2=b8.createElement("div")
a2.className=b3
if(r)a2.classList.add("form-group-hidden")
a2.id="kw-group-edit"
r=b8.createElement("label")
B.q.sj(r,"Keywords (comma-separated)")
r.className=b4
a2.appendChild(r)
a3=A.aj(b2)
a3.placeholder="e.g. Flying, Haste, Vigilance"
a3.className=b5
B.l.sI(a3,B.a.V(l,", "))
a2.appendChild(a3)
s.appendChild(a2)
a4=b8.createElement("div")
a4.className=b3
r=b8.createElement("label")
B.q.sj(r,"Mana Cost (optional)")
r.className=b4
a4.appendChild(r)
a5=A.aj(b2)
a5.placeholder="e.g. {2}{R}{R} or 3RR"
a5.className=b5
B.l.sI(a5,k)
a4.appendChild(a5)
s.appendChild(a4)
a6=b8.createElement("div")
a6.className=b3
r=b8.createElement("label")
B.q.sj(r,"Zone")
r.className=b4
a6.appendChild(r)
a7=b8.createElement("select")
a7.className=b5
for(r=["battlefield","graveyard","exile"],e=0;e<3;++e){a8=r[e]
q=A.cq(a8,a8,b2,!1)
if(0>=a8.length)return A.b(a8,0)
B.D.sj(q,a8[0].toUpperCase()+B.b.a2(a8,1))
a7.appendChild(q)}B.A.sI(a7,j)
a6.appendChild(a7)
s.appendChild(a6)
r=t.E
q=r.i("~(1)?").a(new A.l9(new A.ld(f,c,a2)))
t.Z.a(null)
A.l(f,"change",q,!1,r.c)
a9=b8.createElement("div")
a9.className="form-button-row"
b0=b8.createElement("button")
B.d.sj(b0,"Cancel")
b0.className="overlay-cancel-btn"
r=t.C
q=r.i("~(1)?")
r=r.c
A.l(b0,b7,q.a(new A.la(b9)),!1,r)
b1=b8.createElement("button")
B.d.sj(b1,"Save Changes")
b1.className="overlay-done-btn"
A.l(b1,b7,q.a(new A.lb(h,f,a,a0,a7,a5,a3,c0,c1,b9)),!1,r)
a9.appendChild(b0)
a9.appendChild(b1)
s.appendChild(a9)
b9.appendChild(s)
A.l(b9,b7,q.a(new A.lc(b9)),!1,r)
b8.body.appendChild(b9)},
uw(a){var s,r,q,p,o,n,m=document,l=m.createElement("div")
l.className="overlay"
s=m.createElement("div")
s.className="overlay-box glossary-box"
r=m.createElement("h2")
B.k.sj(r,a)
r.className="overlay-title"
s.appendChild(r)
q=B.S.h(0,a)
if(q==null)q="No definition available."
r=m.createElement("p")
B.h.sj(r,q)
r.className="glossary-def"
s.appendChild(r)
p=m.createElement("button")
B.d.sj(p,"Got it")
p.className="overlay-done-btn"
r=t.C
o=r.i("~(1)?")
n=o.a(new A.lS(l))
t.Z.a(null)
r=r.c
A.l(p,"click",n,!1,r)
s.appendChild(p)
l.appendChild(s)
A.l(l,"click",o.a(new A.lT(l)),!1,r)
m.body.appendChild(l)},
ut(a,b){var s,r,q,p,o,n,m=document,l=m.createElement("div")
l.className="overlay"
s=m.createElement("div")
s.className="overlay-box card-image-box"
r=A.nt()
B.w.sb3(r,a)
r.className="card-image-full"
B.w.sbl(r,b)
s.appendChild(r)
q=m.createElement("p")
B.h.sj(q,b)
q.className="card-image-name"
s.appendChild(q)
p=m.createElement("button")
B.d.sj(p,"Close")
p.className="overlay-continue-btn"
q=t.C
o=q.i("~(1)?")
n=o.a(new A.le(l))
t.Z.a(null)
q=q.c
A.l(p,"click",n,!1,q)
s.appendChild(p)
l.appendChild(s)
A.l(l,"click",o.a(new A.lf(l)),!1,q)
m.body.appendChild(l)},
hi(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f="tab-btn tab-btn-active",e="click"
$.bb=B.E
s=document
r=t._.a(s.querySelector("#game-screen"))
if(r==null)return
B.e.a3(r)
q=s.createElement("button")
B.d.sj(q,"\u2190 Back to Game")
q.className="btn-back"
p=t.C
o=p.i("~(1)?")
n=o.a(new A.lO())
t.Z.a(null)
p=p.c
A.l(q,e,n,!1,p)
r.appendChild(q)
n=s.createElement("h2")
B.k.sj(n,"Game Log")
n.className="tracker-title"
r.appendChild(n)
m=s.createElement("div")
m.className="tab-row"
l=s.createElement("button")
B.d.sj(l,"Detailed")
l.className=$.aY?"tab-btn":f
k=s.createElement("button")
B.d.sj(k,"Simple")
k.className=$.aY?f:"tab-btn"
A.l(l,e,o.a(new A.lP()),!1,p)
A.l(k,e,o.a(new A.lQ()),!1,p)
m.appendChild(l)
m.appendChild(k)
r.appendChild(m)
j=s.createElement("div")
j.className="tracker-list"
i=$.aY?$.bt:$.bL
if(i.length===0){n=s.createElement("p")
B.h.sj(n,"No events yet.")
n.className="zone-empty"
j.appendChild(n)}for(h=i.length-1;h>=0;--h){n=s.createElement("p")
if(!(h<i.length))return A.b(i,h)
B.h.sj(n,i[h])
n.className="log-entry"
j.appendChild(n)}r.appendChild(j)
g=s.createElement("button")
B.d.sj(g,"Clear Log")
g.className="tracker-add-btn"
A.l(g,e,o.a(new A.lR()),!1,p)
r.appendChild(g)
r.appendChild(A.eD())},
oa(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9=null,e0="winner",e1="players",e2="stats-section-label",e3="turns"
$.bb=B.F
s=document
r=t._.a(s.querySelector("#game-screen"))
if(r==null)return
B.e.a3(r)
q=s.createElement("button")
B.d.sj(q,"\u2190 Back to Game")
q.className="btn-back"
p=t.C
o=p.i("~(1)?")
n=o.a(new A.m4())
t.Z.a(null)
p=p.c
A.l(q,"click",n,!1,p)
r.appendChild(q)
n=s.createElement("h2")
B.k.sj(n,"Game Stats")
n.className="tracker-title"
r.appendChild(n)
m=A.pK()
n=m.length
if(n===0){s=s.createElement("p")
B.h.sj(s,"No games recorded yet.")
s.className="stats-empty"
r.appendChild(s)
r.appendChild(A.eD())
return}l=t.N
k=t.S
j=A.Y(l,k)
i=A.Y(l,k)
for(h=t.j,g=0;g<m.length;m.length===n||(0,A.N)(m),++g){f=m[g]
e=J.j(f)
d=A.n(e.h(f,e0))
c=j.h(0,d)
if(c==null)c=0
if(typeof c!=="number")return c.J()
j.k(0,d,c+1)
for(e=J.T(h.a(e.h(f,e1)));e.n();){b=A.n(e.gt())
c=i.h(0,b)
if(c==null)c=0
if(typeof c!=="number")return c.J()
i.k(0,b,c+1)}}e=A.L(m)
c=e.i("f(1)")
a=e.i("R<1,f>")
a0=new A.R(m,c.a(new A.m5()),a).Z(0,new A.m6())
a1=m.length
if(typeof a0!=="number")return a0.bx()
a2=j.a===0?"\u2014":j.gbr(j).Z(0,new A.mc()).a
a3=new A.R(m,c.a(new A.md()),a).Z(0,new A.me())
a4=new A.R(m,c.a(new A.mf()),a).Z(0,new A.mg())
c=e.i("y(1)")
a=e.i("a_<1>")
a5=new A.a_(m,c.a(new A.mh(a3)),a)
if(!a5.gE(a5)){a5=new A.a_(m,c.a(new A.mi(a3)),a)
a6=a5.gam(a5)}else a6=d9
a5=new A.a_(m,c.a(new A.mj(a4)),a)
if(!a5.gE(a5)){a5=new A.a_(m,c.a(new A.m7(a4)),a)
a7=a5.gam(a5)}else a7=d9
for(a5=m.length,a8=t.P,a9=t.g,b0=t.t,b1=d9,b2=0,g=0;g<m.length;m.length===a5||(0,A.N)(m),++g){f=m[g]
b3=J.j(f)
b4=a9.a(b3.h(f,"lifeHistory"))
b5=b4==null?d9:J.eO(b4,a8)
if(b5==null)b5=A.o([],b0)
b4=J.j(b5)
if(b4.gP(b5)){b6=$.at
b7=A.n(b3.h(f,e0))
for(b3=b4.gv(b5);b3.n();){b4=b3.gt()
b8=J.aK(b4)
if(b8.M(b4,b7)){b4=A.aT(b8.h(b4,b7))
if(b4==null)b4=$.at
b6=Math.min(b6,b4)}}b9=$.at-b6
if(b9>b2){b2=b9
b1=f}}}c0=A.Y(l,k)
for(l=A.oE(i,i.r,i.$ti.c),e=e.i("bk<1>"),a5=e.i("aF<Q.E>"),a8=e.i("Q.E");l.n();){a9=l.d
for(b0=new A.bk(m,e),b0=new A.aF(b0,b0.gm(b0),a5),c1=0;b0.n();){b3=b0.d
if(b3==null)b3=a8.a(b3)
b4=J.j(b3)
if(J.q(b4.h(b3,e0),a9))++c1
else if(J.b1(h.a(b4.h(b3,e1)),a9))break}if(c1>0)c0.k(0,a9,c1)}c2=c0.a===0?"\u2014":c0.gbr(c0).Z(0,new A.m8()).a
if(c0.a===0)c3=0
else{l=c0.h(0,c2)
c3=l==null?0:l}c4=s.createElement("div")
c4.className="stats-summary-row"
c4.appendChild(A.nO("Total Games",""+n))
c4.appendChild(A.nO("Most Wins",a2))
c4.appendChild(A.nO("Avg Turns",B.i.bw(a0/a1,1)))
r.appendChild(c4)
l=s.createElement("p")
B.h.sj(l,"ACHIEVEMENTS")
l.className=e2
r.appendChild(l)
c5=s.createElement("div")
c5.className="highlight-grid"
l=a6==null
if(!l){a0=J.j(a6)
c5.appendChild(A.hb("\ud83c\udfc6","Longest Game",A.c(a0.h(a6,e3))+" turns",A.c(a0.h(a6,e0))+" vs "+J.ho(h.a(a0.h(a6,e1)),", ")))}if(a7!=null){a0=J.a(a7,e3)
a0=!J.q(a0,l?d9:J.a(a6,e3))
l=a0}else l=!1
if(l){l=J.j(a7)
c5.appendChild(A.hb("\u26a1","Quickest Game",A.c(l.h(a7,e3))+" turns",A.c(l.h(a7,e0))+" vs "+J.ho(h.a(l.h(a7,e1)),", ")))}if(b1!=null&&b2>0)c5.appendChild(A.hb("\ud83d\udd25","Biggest Comeback",""+b2+" life",A.c(J.a(b1,e0))+" from near death"))
if(c3>1)c5.appendChild(A.hb("\ud83d\udd25","Hot Streak",A.c(c3)+" wins",c2+" is on fire!"))
if(n>=3){n=new A.a_(m,c.a(new A.m9()),a)
c6=n.gm(n)
if(c6>0)c5.appendChild(A.hb("\ud83d\udca5","Total Blowouts",""+c6+" games","Decisive victories"))}r.appendChild(c5)
n=s.createElement("p")
B.h.sj(n,"WIN RATES")
n.className=e2
r.appendChild(n)
c7=i.gbr(i).a_(0)
B.a.a1(c7,new A.ma(j))
for(n=c7.length,g=0;g<c7.length;c7.length===n||(0,A.N)(c7),++g){c8=c7[g]
c9=c8.b
l=c8.a
d0=j.h(0,l)
if(d0==null)d0=0
d1=d0/c9*100
d2=s.createElement("div")
d2.className="stats-player-row"
c=s.createElement("span")
B.c.sj(c,l)
c.className="stats-player-name"
d2.appendChild(c)
d3=s.createElement("div")
d3.className="stats-bar-wrap"
c=s.createElement("div")
c.className="stats-bar-fill"
l=c.style
a=B.i.bw(d1,0)
l.width=a+"%"
d3.appendChild(c)
d2.appendChild(d3)
l=s.createElement("span")
B.c.sj(l,B.i.bw(d1,0)+"% ("+A.c(d0)+"/"+A.c(c9)+")")
l.className="stats-rate"
d2.appendChild(l)
r.appendChild(d2)}n=s.createElement("p")
B.h.sj(n,"RECENT GAMES")
n.className=e2
r.appendChild(n)
for(n=A.aO(new A.bk(m,e),0,A.az(10,"count",k),a8),l=n.$ti,n=new A.aF(n,n.gm(n),l.i("aF<Q.E>")),l=l.i("Q.E");n.n();){k=n.d
if(k==null)k=l.a(k)
e=J.j(k)
d4=A.ot(A.n(e.h(k,"date")))
d5=s.createElement("div")
d5.className="stats-game-row"
d6=A.tf(k)
if(d6.length!==0)d5.classList.add(d6)
c=s.createElement("span")
B.c.sj(c,""+A.nC(d4)+"/"+A.nB(d4)+"/"+A.dX(d4))
c.className="stats-game-date"
d5.appendChild(c)
c=s.createElement("span")
B.c.sj(c,"\ud83c\udfc6 "+A.c(e.h(k,e0)))
c.className="stats-game-winner"
d5.appendChild(c)
d7=A.te(k)
if(d7.length!==0){c=s.createElement("span")
B.c.sj(c,d7)
c.className="stats-game-intensity"
d5.appendChild(c)}c=s.createElement("span")
B.c.sj(c,J.ho(h.a(e.h(k,e1))," \xb7 "))
c.className="stats-game-players"
d5.appendChild(c)
c=s.createElement("span")
B.c.sj(c,A.c(e.h(k,e3))+" turns \xb7 "+A.c(e.h(k,"format")))
c.className="stats-game-turns"
d5.appendChild(c)
r.appendChild(d5)}d8=s.createElement("button")
B.d.sj(d8,"Clear All History")
d8.className="stats-clear-btn"
A.l(d8,"click",o.a(new A.mb()),!1,p)
r.appendChild(d8)
r.appendChild(A.eD())},
nO(a,b){var s,r=document,q=r.createElement("div")
q.className="stat-summary-card"
s=r.createElement("span")
B.c.sj(s,a)
s.className="stat-summary-label"
q.appendChild(s)
r=r.createElement("span")
B.c.sj(r,b)
r.className="stat-summary-value"
q.appendChild(r)
return q},
hb(a,b,c,d){var s,r=document,q=r.createElement("div")
q.className="highlight-card"
s=r.createElement("span")
B.c.sj(s,a)
s.className="highlight-icon"
q.appendChild(s)
s=r.createElement("span")
B.c.sj(s,b)
s.className="highlight-label"
q.appendChild(s)
s=r.createElement("span")
B.c.sj(s,c)
s.className="highlight-value"
q.appendChild(s)
r=r.createElement("span")
B.c.sj(r,d)
r.className="highlight-subtitle"
q.appendChild(r)
return q},
nV(a){var s,r,q,p,o,n,m=J.j(a),l=t.g.a(m.h(a,"lifeHistory")),k=l==null?null:J.eO(l,t.P)
if(k==null)k=A.o([],t.t)
l=J.j(k)
if(l.gE(k))return!1
s=l.gaK(k)
r=A.n(m.h(a,"winner"))
l=J.j(s)
q=l.h(s,r)
p=A.i(q==null?0:q)
for(m=J.T(t.j.a(m.h(a,"players")));m.n();){o=m.gt()
if(!J.q(o,r)){q=l.h(s,o)
n=A.i(q==null?0:q)
if(n>0&&p>=n*2)return!0}}return!1},
tf(a){var s,r,q,p,o=J.j(a),n=A.aT(o.h(a,"turns"))
if(n==null)n=0
o=t.g.a(o.h(a,"lifeHistory"))
s=o==null?null:J.eO(o,t.P)
if(s==null)s=A.o([],t.t)
if(A.nV(a))return"game-blowout"
if(n>=50)return"game-marathon"
if(n<=5)return"game-blitz"
o=J.j(s)
if(o.gP(s))for(o=o.gv(s),r=t.S;o.n();){q=J.oj(J.nm(o.gt()),r)
p=A.a8(q,!0,q.$ti.i("k.E"))
if(p.length>=2)if(B.a.Z(p,new A.jG())-B.a.Z(p,new A.jH())<=5)return"game-close"}return""},
te(a){var s,r,q,p,o=J.j(a),n=A.aT(o.h(a,"turns"))
if(n==null)n=0
if(A.nV(a))return"\ud83d\udca5 BLOWOUT"
if(n>=50)return"\ud83c\udfc3 MARATHON"
if(n<=5)return"\u26a1 BLITZ"
o=t.g.a(o.h(a,"lifeHistory"))
s=o==null?null:J.eO(o,t.P)
if(s==null)s=A.o([],t.t)
o=J.j(s)
if(o.gP(s))for(o=o.gv(s),r=t.S;o.n();){q=J.oj(J.nm(o.gt()),r)
p=A.a8(q,!0,q.$ti.i("k.E"))
if(p.length>=2)if(B.a.Z(p,new A.jE())-B.a.Z(p,new A.jF())<=5)return"\ud83c\udfaf CLOSE"}return""},
k1(a){return A.tK(a)},
tK(a){var s=0,r=A.c7(t.fO),q,p=2,o,n=[],m,l,k,j,i,h,g,f,e
var $async$k1=A.c9(function(b,c){if(b===1){o=c
s=p}while(true)switch(s){case 0:if(B.b.B(a).length===0){q=A.o([],t.t)
s=1
break}p=4
m="https://api.scryfall.com/cards/search?q="+A.p5(B.N,a,B.G,!1)+"&limit=5&unique=cards"
i=t.N
s=7
return A.c2(A.ns(m,"GET",A.G(["Accept","application/json"],i,i)),$async$k1)
case 7:l=c
if(l.status!==200){i=A.o([],t.t)
q=i
s=1
break}i=l.responseText
h=t.P
k=h.a(B.p.al(0,i==null?"{}":i,null))
g=t.g.a(J.a(k,"data"))
j=g==null?[]:g
i=J.oi(j,5).aL(0,new A.k2(),h).a_(0)
q=i
s=1
break
p=2
s=6
break
case 4:p=3
e=o
i=A.o([],t.t)
q=i
s=1
break
s=6
break
case 3:s=2
break
case 6:case 1:return A.c4(q,r)
case 2:return A.c3(o,r)}})
return A.c5($async$k1,r)},
cF(a){return A.tJ(a)},
tJ(a){var s=0,r=A.c7(t.Q),q,p=2,o,n=[],m,l,k,j,i,h,g,f
var $async$cF=A.c9(function(b,c){if(b===1){o=c
s=p}while(true)switch(s){case 0:g=B.b.B(a.toLowerCase())
if($.pb.M(0,g)){q=$.pb.h(0,g)
s=1
break}if($.o2.M(0,g)){q=$.o2.h(0,g)
s=1
break}p=4
m="https://api.scryfall.com/cards/named?fuzzy="+A.p5(B.N,a,B.G,!1)
j=t.N
s=7
return A.c2(A.ns(m,"GET",A.G(["Accept","application/json"],j,j)),$async$cF)
case 7:l=c
if(l.status!==200){q=null
s=1
break}i=l.responseText
k=A.ac(t.f.a(B.p.al(0,i==null?"{}":i,null)),j,t.z)
$.o2.k(0,g,k)
q=k
s=1
break
p=2
s=6
break
case 4:p=3
f=o
q=null
s=1
break
s=6
break
case 3:s=2
break
case 6:case 1:return A.c4(q,r)
case 2:return A.c3(o,r)}})
return A.c5($async$cF,r)},
hd(b1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a="type_line",a0=null,a1="planeswalker",a2="artifact",a3="enchantment",a4="keywords",a5="toughness",a6="image_uris",a7="color_identity",a8=J.j(b1),a9=a8.h(b1,a),b0=J.m(a9==null?"":a9).toLowerCase()
a9=a8.h(b1,"oracle_text")
s=J.m(a9==null?"":a9)
if(B.b.l(b0,a1))r=a1
else if(B.b.l(b0,a2))r=a2
else if(B.b.l(b0,a3))r=a3
else if(B.b.l(b0,"land"))r="land"
else if(B.b.l(b0,"instant"))r="instant"
else r=B.b.l(b0,"sorcery")?"sorcery":"creature"
a9=t.s
q=A.o([],a9)
if(B.b.l(b0,"legendary"))B.a.q(q,"Legendary")
if(B.b.l(b0,"basic"))B.a.q(q,"Basic")
p=a8.h(b1,a)
o=J.m(p==null?"":p)
n=B.b.l(o,"\u2014")?J.cJ(B.a.gaK(o.split("\u2014"))):""
m=A.o([],a9)
p=t.j
if(p.b(a8.h(b1,a4)))m=J.b2(p.a(a8.h(b1,a4)),new A.jM(),t.N).a_(0)
l=a8.h(b1,"power")!=null?A.a4(J.m(a8.h(b1,"power")),a0):a0
k=a8.h(b1,a5)!=null?A.a4(J.m(a8.h(b1,a5)),a0):a0
j=a8.h(b1,"loyalty")!=null?A.a4(J.m(a8.h(b1,"loyalty")),a0):a0
i=t.f
if(i.b(a8.h(b1,a6))){i=J.a(i.a(a8.h(b1,a6)),"normal")
h=i==null?a0:J.m(i)}else h=a0
i=a8.h(b1,"mana_cost")
g=J.m(i==null?"":i)
f=A.o([],a9)
if(p.b(a8.h(b1,a7)))f=J.b2(p.a(a8.h(b1,a7)),new A.jN(),t.N).a_(0)
e=A.t8(s)
d=A.t7(s)
if(r==="land"){a8=a8.h(b1,"name")
c=J.m(a8==null?"":a8).toLowerCase()
if(B.b.l(c,"forest"))b="G"
else if(B.b.l(c,"island"))b="U"
else if(B.b.l(c,"plains"))b="W"
else if(B.b.l(c,"swamp"))b="B"
else if(B.b.l(c,"mountain"))b="R"
else b=f.length!==0?B.a.gam(f):"C"}else b="C"
return A.G(["type",r,"subtype",n,"supertypes",q,"keywords",m,"power",l,"toughness",k,"loyalty",j,"imageUrl",h,"oracleText",s,"manaCost",g,"colors",f,"triggers",e,"globalEffect",d,"landColor",b],t.N,t.z)},
t8(a){var s,r,q,p,o,n,m,l,k,j=A.o([],t.m),i=a.toLowerCase()
for(s=t.N,r=0;r<8;++r){q=B.ak[r]
p=q.h(0,"pattern")
p.toString
if(A.ay(i,p,0))for(p=a.split("\n"),o=p.length,n=0;n<o;++n){m=p[n]
l=m.toLowerCase()
k=q.h(0,"pattern")
k.toString
if(A.ay(l,k,0)){p=q.h(0,"phase")
p.toString
o=J.cJ(m)
l=q.h(0,"plain")
l.toString
B.a.q(j,A.G(["phase",p,"text",o,"plain",l],s,s))
break}}}return j},
t7(a){var s,r,q,p,o,n
for(s=a.split("\n"),r=s.length,q=0;q<r;++q){p=s[q]
o=p.toLowerCase()
if(!A.ay(o,"all creatures",0))if(!A.ay(o,"each creature",0))if(!A.ay(o,"creatures you control",0))n=A.ay(o,"creatures your opponents control",0)
else n=!0
else n=!0
else n=!0
if(n)return J.cJ(p)}return""},
hh(){var s=0,r=A.c7(t.H),q,p=2,o,n=[],m,l,k,j,i,h,g,f,e,d,c,b,a,a0
var $async$hh=A.c9(function(a1,a2){if(a1===1){o=a2
s=p}while(true)switch(s){case 0:if($.ps){s=1
break}p=4
f=t.N
s=7
return A.c2(A.ns("https://api.scryfall.com/symbology","GET",A.G(["Accept","application/json"],f,f)),$async$hh)
case 7:m=a2
if(m.status!==200){s=1
break}f=m.responseText
l=t.P.a(B.p.al(0,f==null?"{}":f,null))
e=t.g.a(J.a(l,"data"))
k=e==null?[]:e
for(f=J.T(k);f.n();){j=f.gt()
d=A.ak(J.a(j,"symbol"))
i=d==null?"":d
c=A.pQ(i,"{","")
h=A.pQ(c,"}","").toUpperCase()
b=A.ak(J.a(j,"svg_uri"))
g=b==null?"":b
if(J.W(h)!==0&&J.W(g)!==0)$.pr.k(0,h,g)}$.ps=!0
p=2
s=6
break
case 4:p=3
a0=o
s=6
break
case 3:s=2
break
case 6:case 1:return A.c4(q,r)
case 2:return A.c3(o,r)}})
return A.c5($async$hh,r)},
u0(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=document,e=f.createElement("div")
e.className="mana-pip-row"
if(B.b.B(a).length===0)return e
for(s=A.aq("\\{([^}]+)\\}").aW(0,a.toUpperCase()),s=new A.d_(s.a,s.b,s.c),r=""+b,q="display:inline-flex;align-items:center;justify-content:center;width:"+r+"px;height:"+r+"px;border-radius:50%;background:",p=A.c(b*0.55),o=t.r,r+="px";s.n();){n=s.d
m=(n==null?o.a(n):n).b
if(1>=m.length)return A.b(m,1)
l=m[1]
if(l==null)l=""
k=$.pr.h(0,l)
if(k!=null&&k.length!==0){m=A.nt()
B.w.sb3(m,k)
B.w.sbl(m,l)
B.w.sbv(m,l)
m.className="mana-pip-img"
j=m.style
j.width=r
j=m.style
j.height=r
e.appendChild(m)}else{i=B.az.h(0,l)
if(i==null)i="#aaa"
h=B.aA.h(0,l)
if(h==null)h="#333"
g=f.createElement("span")
B.c.sj(g,l)
B.c.sbv(g,l)
B.y.sc3(g.style,q+h+";color:"+i+";font-size:"+p+"px;font-weight:700;font-family:Georgia,serif;flex-shrink:0;margin-right:1px;")
e.appendChild(g)}}return e},
o5(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3="row-label",a4="count-control",a5="count-side",a6="count-mid",a7="click"
$.bb=B.x
A.bp()
s=document
r=t._.a(s.querySelector("#setup-screen"))
if(r==null)return
B.e.a3(r)
q=s.createElement("div")
q.className="setup-hero"
p=s.createElement("h1")
B.k.sj(p,"\u2694\ufe0f MTG Tracker")
p.className="setup-hero-title"
q.appendChild(p)
p=s.createElement("p")
B.h.sj(p,"AI-POWERED GAME TRACKER")
p.className="setup-hero-sub"
q.appendChild(p)
r.appendChild(q)
o=s.createElement("div")
o.className="setup-content"
p=s.createElement("p")
p.className=a3
B.h.sj(p,"Format")
o.appendChild(p)
n=s.createElement("div")
n.className="format-toggle"
m=s.createElement("button")
m.id="fmt-normal"
m.className="fmt-opt"
B.d.X(m,'<span class="fmt-name">Standard</span><span class="fmt-sub">20 life</span>')
l=s.createElement("button")
l.id="fmt-commander"
l.className="fmt-opt fmt-opt-active"
B.d.X(l,'<span class="fmt-name">Commander</span><span class="fmt-sub">40 life \xb7 cmd damage</span>')
p=new A.kN()
k=t.C
j=k.i("~(1)?")
i=j.a(new A.kH(m,l,p))
t.Z.a(null)
k=k.c
A.l(m,a7,i,!1,k)
A.l(l,a7,j.a(new A.kI(m,l,p)),!1,k)
$.ax=!0
$.at=40
n.appendChild(m)
n.appendChild(l)
o.appendChild(n)
p=s.createElement("p")
p.className=a3
B.h.sj(p,"Starting Life")
o.appendChild(p)
h=s.createElement("div")
h.className=a4
g=A.aj("number")
g.id="custom-life-input"
B.l.sI(g,"40")
g.className="life-number-input"
p=t.E
A.l(g,"input",p.i("~(1)?").a(new A.kJ(g)),!1,p.c)
h.appendChild(g)
o.appendChild(h)
p=s.createElement("p")
p.className=a3
B.h.sj(p,"Players")
o.appendChild(p)
f=s.createElement("div")
f.className=a4
e=s.createElement("button")
B.d.sj(e,"\u2212")
e.className=a5
d=s.createElement("div")
d.id=a6
d.className=a6
B.e.sj(d,"2 players")
c=A.aj("hidden")
c.id="player-count"
B.l.sI(c,"2")
b=s.createElement("button")
B.d.sj(b,"+")
b.className=a5
A.l(e,a7,j.a(new A.kK(c,d)),!1,k)
A.l(b,a7,j.a(new A.kL(c,d)),!1,k)
f.appendChild(e)
f.appendChild(d)
f.appendChild(b)
f.appendChild(c)
o.appendChild(f)
a=s.createElement("div")
a.className="setup-player-list"
a.id="name-inputs-box"
o.appendChild(a)
r.appendChild(o)
A.hf(2)
a0=s.createElement("div")
a0.className="setup-start-area"
a1=s.createElement("button")
a1.id="start-btn"
B.d.sj(a1,"Start Game \u25b6")
A.l(a1,a7,j.a(new A.kM()),!1,k)
a0.appendChild(a1)
r.appendChild(a0)
a2=s.createElement("div")
a2.className="setup-voice-hint"
B.e.X(a2,"\ud83c\udfa4 <strong>Voice-powered:</strong> After starting, tap the microphone to control the game hands-free with AI")
r.appendChild(a2)},
pd(){var s=t.G.a(document.querySelector("#player-count")),r=s==null?null:s.value
r=A.a4(r==null?"2":r,null)
return r==null?2:r},
hf(b0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5="input-group",a6="input-label",a7="styled-input",a8=document,a9=t._.a(a8.querySelector("#name-inputs-box"))
if(a9==null)return
B.e.a3(a9)
for(s=t.C,r=s.i("~(1)?"),q=t.Z,s=s.c,p=t.E,o=p.i("~(1)?"),p=p.c,n=t.aY,m=n.i("~(1)?"),n=n.c,l=0;l<b0;l=e){k={}
j=a8.createElement("div")
i=""+l
j.id="player-card-"+i
j.className="setup-player-card"
h=a8.createElement("div")
h.id="avatar-"+i
h.className="player-avatar"
B.e.sj(h,"?")
g=a8.createElement("div")
g.className="player-info"
f=a8.createElement("span")
f.id="preview-"+i
f.className="player-info-name"
e=l+1
d=""+e
B.c.sj(f,"Player "+d)
c=a8.createElement("span")
c.id="preview-sub-"+i
c.className="player-info-sub"
B.c.sj(c,"tap to fill in")
g.appendChild(f)
g.appendChild(c)
b=a8.createElement("span")
b.id="chevron-"+i
b.className="player-chevron"
B.c.sj(b,"\u25bc")
a=a8.createElement("div")
a.className="setup-player-header"
a.appendChild(h)
a.appendChild(g)
a.appendChild(b)
a0=a8.createElement("div")
a0.id="body-"+i
a0.className="setup-player-body"
a1=a8.createElement("div")
a1.className=a5
i=a8.createElement("span")
i.className=a6
B.c.sj(i,"Your name")
a1.appendChild(i)
a2=A.aj("text")
a2.id="player-name-"+d
a2.placeholder="e.g. Kai"
a2.className=a7
i=o.a(new A.kC(a2,l))
q.a(null)
A.l(a2,"input",i,!1,p)
A.l(a2,"keydown",m.a(new A.kD(l)),!1,n)
a1.appendChild(a2)
a0.appendChild(a1)
if($.ax){a3=a8.createElement("div")
a3.className=a5
i=a8.createElement("span")
i.className=a6
B.c.sj(i,"Commander")
a3.appendChild(i)
a4=A.aj("text")
a4.id="commander-name-"+d
a4.placeholder="e.g. Atraxa, Praetors' Voice"
a4.className=a7
A.l(a4,"input",o.a(new A.kE(a4,l)),!1,p)
A.l(a4,"keydown",m.a(new A.kF(l)),!1,n)
a3.appendChild(a4)
a0.appendChild(a3)}k.a=!0
A.l(a,"click",r.a(new A.kG(k,a0,l)),!1,s)
j.appendChild(a)
j.appendChild(a0)
a9.appendChild(j)}},
aW(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2="name"
A.tz()
if(!$.b_||$.d.length===0)return
try{s="idle"
if($.ae){p=$.X
if(p===0)s="declaring_attackers"
else if(p===1)s="declaring_blockers"
else if(p===2)s="damage_resolution"
else if(p===3)s="results"}p=$.d
o=A.L(p)
n=o.i("R<1,z<h,@>>")
r=A.a8(new A.R(p,o.i("z<h,@>(1)").a(new A.k_()),n),!0,n.i("Q.E"))
n=$.d
o=$.H
if(!(o>=0&&o<n.length))return A.b(n,o)
o=J.a(n[o],a2)
p=o==null?"":o
o=$.b0
n=B.a.h(B.z,B.f.a4($.aA,0,3))
m=$.aA
l=$.ax?"Commander":"Standard"
k=$.bt
j=A.L(k).i("bk<1>")
i=t.S
j=A.aO(new A.bk(k,j),0,A.az(8,"count",i),j.i("Q.E")).a_(0)
k=$.ad
k=A.aO(k,0,A.az(10,"count",i),A.L(k).c).a_(0)
i=$.bJ
h=$.ae
g=s
f=$.d
e=$.H
if(!(e>=0&&e<f.length))return A.b(f,e)
e=J.a(f[e],a2)
f=e==null?"":e
e=$.a2
if(e.length!==0){d=$.d
e=A.i(J.a(B.a.gam(e),"targetIdx"))
if(!(e>=0&&e<d.length))return A.b(d,e)
e=J.a(d[e],a2)
if(e==null)e=""}else e=""
d=$.a2
c=A.L(d)
b=c.i("R<1,z<h,@>>")
a=t.N
a0=t.z
q=A.G(["players",r,"currentPlayer",p,"turn",o,"phase",n,"phaseIndex",m,"format",l,"log",j,"combatLog",k,"lifeHistory",i,"combatState",A.G(["active",h,"phase",g,"attackerPlayer",f,"defenderPlayer",e,"attackers",A.a8(new A.R(d,c.i("z<h,@>(1)").a(new A.k0()),b),!0,b.i("Q.E"))],a,a0)],a,a0)
window.localStorage.setItem("mtg_spectator",B.p.aH(q,null))
window.localStorage.setItem("mtg_spectator_ts",B.f.p(Date.now()))}catch(a1){}},
tg(a){var s,r="landColor",q=J.j(a)
if(!J.q(q.h(a,"type"),"land"))return"C"
if(q.h(a,r)!=null)return A.n(q.h(a,r))
q=q.h(a,"name")
s=J.m(q==null?"":q).toLowerCase()
if(B.b.l(s,"forest"))return"G"
if(B.b.l(s,"island"))return"U"
if(B.b.l(s,"plains"))return"W"
if(B.b.l(s,"swamp"))return"B"
if(B.b.l(s,"mountain"))return"R"
return"C"},
td(a){var s,r=J.j(a),q=r.h(a,"name"),p=J.m(q==null?"":q).toLowerCase()
r=r.h(a,"type")
s=J.m(r==null?"":r)
if(B.b.l(p,"sol ring"))return"\ud83d\udc8d"
if(B.b.l(p,"atraxa"))return"\u2728"
if(B.b.l(p,"dragon"))return"\ud83d\udc09"
if(B.b.l(p,"angel"))return"\ud83d\udc7c"
if(B.b.l(p,"demon"))return"\ud83d\ude08"
if(B.b.l(p,"zombie")||B.b.l(p,"undead"))return"\ud83d\udc80"
if(B.b.l(p,"goblin"))return"\ud83d\udc7a"
if(B.b.l(p,"lightning"))return"\u26a1"
if(B.b.l(p,"wolf")||B.b.l(p,"werewolf"))return"\ud83d\udc3a"
if(B.b.l(p,"elf")||B.b.l(p,"llanowar"))return"\ud83c\udf3f"
if(B.b.l(p,"bird"))return"\ud83e\udd9c"
if(B.b.l(p,"sphinx"))return"\ud83e\udd85"
if(B.b.l(p,"spirit"))return"\ud83d\udc7b"
r=t.N
r=A.G(["creature","\u2694","artifact","\u2699","enchantment","\u2726","planeswalker","\u2605","instant","\ud83d\udcab","sorcery","\ud83c\udf00","land","\ud83c\udfd4"],r,r).h(0,s)
return r==null?"\ud83c\udccf":r},
tO(){var s=$.pw
if(s!=null)s.aG()
$.pw=A.oT(B.a9,new A.k5())},
tB(){var s,r,q,p,o,n,m,l,k,j,i="mtg_voice_cmd"
try{s=window.localStorage.getItem(i)
if(s==null||J.W(s)===0)return
n=t.P
r=n.a(B.p.al(0,s,null))
m=J.a(r,"id")
l=m==null?null:J.m(m)
q=l==null?"":l
if(J.q(q,$.pm))return
$.pm=q
B.B.H(window.localStorage,i)
k=t.g.a(J.a(r,"actions"))
p=k==null?[]:k
for(m=J.T(p);m.n();){o=m.gt()
A.rT(n.a(o))}if($.b_)A.D($.ae?B.C:null)}catch(j){}},
rT(g5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2="player",e3="life",e4="name",e5="cardName",e6="zone",e7="battlefield",e8="cardId",e9="graveyard",f0="cards",f1="tapped",f2="attackerPlayer",f3="defenderPlayer",f4="attacking",f5="card",f6="blockers",f7="counters",f8="poison",f9="commanderDamage",g0="isMonarch",g1="hasInitiative",g2="eliminated",g3=J.j(g5),g4=g3.h(g5,"type")
switch(J.m(g4==null?"":g4)){case"life_change":g4=g3.h(g5,e2)
s=J.m(g4==null?"":g4)
r=A.br(g3.h(g5,"delta"),0)
q=A.al(s)
if(q>=0){g3=$.bI
g4=$.d
if(!(q<g4.length))return A.b(g4,q)
B.a.k(g3,q,A.i(J.a(g4[q],e3)))
g4=$.d
if(!(q<g4.length))return A.b(g4,q)
g4=g4[q]
g3=J.j(g4)
g3.k(g4,e3,A.i(g3.h(g4,e3))+r)
g3=r>0
if(g3){g4=$.aU
p=$.d
if(!(q<p.length))return A.b(p,q)
p=A.n(J.a(p[q],e4))
o=$.aU
n=$.d
if(!(q<n.length))return A.b(n,q)
n=o.h(0,J.a(n[q],e4))
o=n==null?0:n
if(typeof o!=="number")return o.J()
g4.k(0,p,o+r)}g4=$.d
if(!(q<g4.length))return A.b(g4,q)
g4=A.c(J.a(g4[q],e4))
p=g3?"gains":"loses"
o=""+Math.abs(r)
n=$.d
if(!(q<n.length))return A.b(n,q)
n=A.c(J.a(n[q],e3))
m=$.d
if(!(q<m.length))return A.b(m,q)
m=A.c(J.a(m[q],e4))
g3=g3?"gained":"lost"
l=$.d
if(!(q<l.length))return A.b(l,q)
A.w(g4+" "+p+" "+o+" life \u2192 "+n,m+" "+g3+" "+o+" life. Now at "+A.c(J.a(l[q],e3))+".")
A.be(q)}break
case"add_card":g4=g3.h(g5,e2)
s=J.m(g4==null?"":g4)
g4=g3.h(g5,e5)
k=J.m(g4==null?"":g4)
g3=g3.h(g5,e6)
j=J.m(g3==null?e7:g3)
q=A.al(s)
if(q>=0&&k.length!==0)A.jD(q,k,j)
break
case"draw":g4=g3.h(g5,e2)
s=J.m(g4==null?"":g4)
i=A.br(g3.h(g5,"count"),1)
q=A.al(s)
if(q>=0)A.o7(q,i)
break
case"discard":g4=g3.h(g5,e2)
s=J.m(g4==null?"":g4)
i=A.br(g3.h(g5,"count"),1)
q=A.al(s)
if(q>=0)A.pC(q,i)
break
case"move_card":g4=g3.h(g5,e2)
s=J.m(g4==null?"":g4)
g4=g3.h(g5,e5)
k=J.m(g4==null?"":g4)
g4=g3.h(g5,e8)
h=J.m(g4==null?"":g4)
g4=g3.h(g5,"toZone")
g=J.m(g4==null?e9:g4)
g3=g3.h(g5,"fromZone")
f=J.m(g3==null?"":g3)
q=A.al(s)
if(q>=0){g3=$.d
if(!(q<g3.length))return A.b(g3,q)
g3=J.T(t.j.a(J.a(g3[q],f0)))
g4=t.P
while(!0){if(!g3.n()){e=!1
break}p=g4.a(g3.gt())
if(A.d5(p,h,k)){g3=J.j(p)
g4=g3.h(p,e6)
d=J.m(g4==null?"":g4)
g3.k(p,e6,g)
g3.k(p,f1,!1)
g4=$.d
if(!(q<g4.length))return A.b(g4,q)
A.w(A.c(J.a(g4[q],e4))+": "+A.c(g3.h(p,e4))+" \u2192 "+g,A.c(g3.h(p,e4))+" moved to "+g+".")
A.p8(q,d,g)
e=!0
break}}if(!e)g3=f.length!==0||g.length!==0
else g3=!1
if(g3)A.p8(q,f,g)}break
case"tap_card":g4=g3.h(g5,e2)
s=J.m(g4==null?"":g4)
g4=g3.h(g5,e5)
k=J.m(g4==null?"":g4)
g4=g3.h(g5,e8)
h=J.m(g4==null?"":g4)
c=J.q(g3.h(g5,f1),!0)
q=A.al(s)
if(q>=0){g3=$.d
if(!(q<g3.length))return A.b(g3,q)
for(g3=J.T(t.j.a(J.a(g3[q],f0))),g4=t.P;g3.n();){p=g4.a(g3.gt())
if(A.d5(p,h,k)){J.S(p,f1,c)
break}}}break
case"next_turn":if(!$.b_)break
A.nZ(!1)
break
case"next_phase":if(!$.b_)break
A.p7()
break
case"set_phase":if(!$.b_)break
g3=g3.h(g5,"phase")
b=A.tA(J.m(g3==null?"":g3))
if(b>=0)A.bK(b,!0)
break
case"combat":if($.b_)A.bK(2,!1)
g4=t.Q
a=g4.a(g3.h(g5,"attacker"))
if(a==null)a=A.Y(t.N,t.z)
a0=g4.a(g3.h(g5,"defender"))
if(a0==null)a0=A.Y(t.N,t.z)
a1=A.br(g3.h(g5,"damage"),0)
a2=J.q(g3.h(g5,"attackerDies"),!0)
a3=J.q(g3.h(g5,"blockerDies"),!0)
g3=g3.h(g5,"blockerName")
a4=J.m(g3==null?"":g3)
g3=J.a(a0,e2)
a5=A.al(J.m(g3==null?"":g3))
g3=J.j(a)
g4=g3.h(a,e2)
a6=A.al(J.m(g4==null?"":g4))
g3=g3.h(a,e5)
a7=J.m(g3==null?"":g3)
g3=a5>=0
if(g3&&a1>0){g4=$.bI
p=$.d
if(!(a5>=0&&a5<p.length))return A.b(p,a5)
B.a.k(g4,a5,A.i(J.a(p[a5],e3)))
p=$.d
if(!(a5<p.length))return A.b(p,a5)
p=p[a5]
g4=J.j(p)
g4.k(p,e3,A.i(g4.h(p,e3))-a1)
A.be(a5)}if(a2&&a6>=0&&a7.length!==0){g4=$.d
if(!(a6>=0&&a6<g4.length))return A.b(g4,a6)
for(g4=J.T(t.j.a(J.a(g4[a6],f0)));g4.n();){a8=g4.gt()
p=J.j(a8)
o=A.n(p.h(a8,e4))
n=a7.toLowerCase()
if(A.ay(o.toLowerCase(),n,0)){p.k(a8,e6,e9)
p.k(a8,f1,!1)
A.w(a7+" dies in combat \u2192 graveyard",a7+" was destroyed in combat.")
break}}}if(a3&&a4.length!==0&&g3){g4=$.d
if(!(a5>=0&&a5<g4.length))return A.b(g4,a5)
for(g4=J.T(t.j.a(J.a(g4[a5],f0)));g4.n();){a8=g4.gt()
p=J.j(a8)
o=A.n(p.h(a8,e4))
n=a4.toLowerCase()
if(A.ay(o.toLowerCase(),n,0)){p.k(a8,e6,e9)
p.k(a8,f1,!1)
A.w(a4+" dies blocking \u2192 graveyard",a4+" was destroyed while blocking.")
break}}}if(g3){g3=$.d
if(!(a5<g3.length))return A.b(g3,a5)
a9=a7+" attacks "+A.n(J.a(g3[a5],e4))+" for "+a1+" damage"
if(a4.length!==0)a9+=", blocked by "+a4
A.w(a9,a9+".")
B.a.u($.ad,0,a9)
g3=$.ad
if(g3.length>10)g3.pop()}break
case"combat_start":g4=g3.h(g5,f2)
b0=J.m(g4==null?"":g4)
g3=g3.h(g5,f3)
b1=J.m(g3==null?"":g3)
b2=A.al(b0)
if(b2>=0)$.H=b2
A.eE()
$.ae=!0
$.X=0
A.bK(2,!1)
A.w("Combat started: "+b0+" attacks "+b1,"Entering combat. Declare attackers.")
break
case"combat_add_attacker":g4=g3.h(g5,f2)
b0=J.m(g4==null?"":g4)
g4=g3.h(g5,f3)
b1=J.m(g4==null?"":g4)
g4=g3.h(g5,e5)
k=J.m(g4==null?"":g4)
g3=g3.h(g5,e8)
h=J.m(g3==null?"":g3)
b2=A.al(b0)
b3=A.al(b1)
if(b2<0||b3<0)break
b4=A.nR(b2,h,k,e7)
if(b4==null)break
if(!B.a.Y($.a2,new A.jv(b4))){g3=J.a0(b4)
g3.k(b4,f4,!0)
B.a.q($.a2,A.G(["card",b4,"targetIdx",b3,"blockers",A.o([],t.t)],t.N,t.z))
A.w(b0+" sends "+A.c(g3.h(b4,e4))+" into combat",A.c(g3.h(b4,e4))+" is attacking "+b1+".")}$.ae=!0
if($.X<0)$.X=0
break
case"combat_declare_attackers":g3=$.a2
g4=g3.length
if(g4===0)break
for(p=t.R,o=t.N,n=t.P,b5=0;b5<g3.length;g3.length===g4||(0,A.N)(g3),++b5){b6=n.a(J.a(g3[b5],f5))
m=J.j(b6)
l=m.h(b6,"keywords")
if(!B.a.l(A.a7(p.a(l==null?[]:l),!0,o),"Vigilance"))m.k(b6,f1,!0)
m.k(b6,f4,!0)}$.ae=!0
$.X=1
g3=$.d
g4=A.i(J.a(B.a.gam($.a2),"targetIdx"))
if(!(g4>=0&&g4<g3.length))return A.b(g3,g4)
A.w("Attackers declared","Waiting for "+A.n(J.a(g3[g4],e4))+" to declare blockers.")
break
case"combat_add_blocker":g4=g3.h(g5,"attackerCardId")
b7=J.m(g4==null?"":g4)
g4=g3.h(g5,"attackerCardName")
b8=J.m(g4==null?"":g4)
g4=g3.h(g5,"blockerPlayer")
b9=J.m(g4==null?"":g4)
g4=g3.h(g5,"blockerCardId")
c0=J.m(g4==null?"":g4)
g3=g3.h(g5,"blockerCardName")
c1=J.m(g3==null?"":g3)
c2=A.al(b9)
if(c2<0)break
g3=$.a2
g4=g3.length
p=t.P
b5=0
while(!0){if(!(b5<g3.length)){c3=null
break}c4=g3[b5]
if(A.d5(p.a(J.a(c4,f5)),b7,b8)){c3=c4
break}g3.length===g4||(0,A.N)(g3);++b5}if(c3==null)break
c5=A.nR(c2,c0,c1,e7)
if(c5==null)break
g3=J.j(c3)
c6=t.g.a(g3.h(c3,f6))
if(c6==null)c6=[]
g4=J.a0(c6)
if(!g4.Y(c6,new A.jw(c5))){g4.q(c6,A.ac(c5,t.N,t.z))
g3.k(c3,f6,c6)
$.X=1
g4=J.j(c5)
A.w(A.c(g4.h(c5,e4))+" blocks "+A.c(J.a(p.a(g3.h(c3,f5)),e4)),A.c(g4.h(c5,e4))+" is blocking "+A.c(J.a(p.a(g3.h(c3,f5)),e4))+".")}break
case"combat_no_blockers":$.ae=!0
$.X=2
A.w("No blockers declared","No blockers. Combat damage will resolve.")
break
case"combat_resolve":if($.a2.length===0)break
$.X=2
A.o1()
break
case"combat_end":A.eE()
B.a.C($.ad)
$.X=0
$.ae=!1
A.bK(3,!0)
break
case"add_token":g4=g3.h(g5,e2)
s=J.m(g4==null?"":g4)
g4=g3.h(g5,"tokenName")
c7=J.m(g4==null?"Token":g4)
c8=A.br(g3.h(g5,"quantity"),1)
c9=A.br(g3.h(g5,"power"),1)
d0=A.br(g3.h(g5,"toughness"),1)
q=A.al(s)
if(q>=0){for(g3=c7+" Token",g4=t.N,p=t.K,d1=0;d1<c8;++d1){o=$.d
if(!(q<o.length))return A.b(o,q)
J.F(J.a(o[q],f0),A.G(["id","tok_"+Date.now()+"_"+d1,"name",g3,"type","creature","subtype","Token","supertypes",[],"keywords",[],"oracleText","","triggers",[],"globalEffect","","tapped",!1,"zone","battlefield","counters",0,"tempPtBonus",0,"isToken",!0,"power",c9,"toughness",d0],g4,p))}g3=$.d
if(!(q<g3.length))return A.b(g3,q)
g3=A.c(J.a(g3[q],e4))
g4=$.d
if(!(q<g4.length))return A.b(g4,q)
g4=A.c(J.a(g4[q],e4))
p=c8===1?"a":B.f.p(c8)
o=c8>1?"s":""
A.w(g3+" creates "+c8+"x "+c7+" Token ("+c9+"/"+d0+")",g4+" created "+p+" "+c7+" token"+o+".")}break
case"poison":g4=g3.h(g5,e2)
s=J.m(g4==null?"":g4)
r=A.br(g3.h(g5,"delta"),0)
q=A.al(s)
if(q>=0){g3=$.d
if(!(q<g3.length))return A.b(g3,q)
g3=g3[q]
g4=J.j(g3)
p=A.aT(g4.h(g3,f8))
g4.k(g3,f8,B.f.a4((p==null?0:p)+r,0,99))
g3=$.d
if(!(q<g3.length))return A.b(g3,q)
g3=A.c(J.a(g3[q],e4))
g4=$.d
if(!(q<g4.length))return A.b(g4,q)
g4=A.c(J.a(g4[q],f8))
p=$.d
if(!(q<p.length))return A.b(p,q)
p=A.c(J.a(p[q],e4))
o=$.d
if(!(q<o.length))return A.b(o,q)
A.w(g3+" gets "+r+" poison ("+g4+"/10)",p+" now has "+A.c(J.a(o[q],f8))+" poison counters.")
A.be(q)}break
case"commander_damage":g4=g3.h(g5,"from")
d2=J.m(g4==null?"":g4)
g4=g3.h(g5,"to")
d3=J.m(g4==null?"":g4)
a1=A.br(g3.h(g5,"damage"),0)
d4=A.al(d2)
d5=A.al(d3)
if(d4>=0&&d5>=0){g3=$.d
if(!(d5>=0&&d5<g3.length))return A.b(g3,d5)
d6=t.h0.a(J.a(g3[d5],f9))
if(d6==null){g3=t.S
d6=A.Y(g3,g3)}g3=J.j(d6)
g4=g3.h(d6,d4)
if(g4==null)g4=0
if(typeof g4!=="number")return g4.J()
g3.k(d6,d4,g4+a1)
g4=$.d
if(!(d5<g4.length))return A.b(g4,d5)
J.S(g4[d5],f9,d6)
g4=$.d
if(!(d5<g4.length))return A.b(g4,d5)
g4=A.c(J.a(g4[d5],e4))
p=$.d
if(!(d4>=0&&d4<p.length))return A.b(p,d4)
p=A.c(J.a(p[d4],e4))
o=A.c(g3.h(d6,d4))
n=$.d
if(!(d5<n.length))return A.b(n,d5)
n=A.c(J.a(n[d5],e4))
g3=A.c(g3.h(d6,d4))
m=$.d
if(!(d4<m.length))return A.b(m,d4)
A.w(g4+" takes "+a1+" commander damage from "+p+" ("+o+")",n+" has taken "+g3+" total commander damage from "+A.c(J.a(m[d4],e4))+".")
A.be(d5)}break
case"set_monarch":g3=g3.h(g5,e2)
s=J.m(g3==null?"":g3)
for(g3=$.d,g4=g3.length,b5=0;b5<g3.length;g3.length===g4||(0,A.N)(g3),++b5)J.S(g3[b5],g0,!1)
q=A.al(s)
if(q>=0){g3=$.d
if(!(q<g3.length))return A.b(g3,q)
J.S(g3[q],g0,!0)
g3=$.d
if(!(q<g3.length))return A.b(g3,q)
g3=A.c(J.a(g3[q],e4))
g4=$.d
if(!(q<g4.length))return A.b(g4,q)
A.w(g3+" becomes the Monarch",A.c(J.a(g4[q],e4))+" is now the Monarch.")}break
case"add_counter":g4=g3.h(g5,e2)
s=J.m(g4==null?"":g4)
g4=g3.h(g5,e8)
h=J.m(g4==null?"":g4)
g4=g3.h(g5,e5)
k=J.m(g4==null?"":g4)
d7=A.br(g3.h(g5,"amount"),1)
q=A.al(s)
if(q>=0){b6=A.nR(q,h,k,e7)
if(b6!=null){g3=J.j(b6)
g4=A.aT(g3.h(b6,f7))
g3.k(b6,f7,(g4==null?0:g4)+d7)
g4=$.d
if(!(q<g4.length))return A.b(g4,q)
p=""+d7
A.w(A.c(J.a(g4[q],e4))+" adds +"+p+"/+"+p+" counter to "+A.c(g3.h(b6,e4)),A.c(g3.h(b6,e4))+" gets a +"+p+"/+"+p+" counter.")}}break
case"set_active_player":g3=g3.h(g5,e2)
s=J.m(g3==null?"":g3)
q=A.al(s)
if(q>=0){$.H=q
A.w(s+" goes first",s+" will take the next turn.")}break
case"set_format":g4=g3.h(g5,"format")
d8=J.m(g4==null?"":g4).toLowerCase()
d9=A.br(g3.h(g5,e3),40)
g3=d8==="commander"
$.ax=g3
$.at=d9
for(d1=0;g4=$.d,d1<g4.length;++d1)J.S(g4[d1],e3,d9)
A.w("Format set to "+(g3?"Commander":"Normal")+" ("+d9+" life)","Game format updated.")
break
case"set_initiative":g3=g3.h(g5,e2)
s=J.m(g3==null?"":g3)
for(g3=$.d,g4=g3.length,b5=0;b5<g3.length;g3.length===g4||(0,A.N)(g3),++b5)J.S(g3[b5],g1,!1)
q=A.al(s)
if(q>=0){g3=$.d
if(!(q<g3.length))return A.b(g3,q)
J.S(g3[q],g1,!0)
g3=$.d
if(!(q<g3.length))return A.b(g3,q)
g3=A.c(J.a(g3[q],e4))
g4=$.d
if(!(q<g4.length))return A.b(g4,q)
A.w(g3+" takes the Initiative",A.c(J.a(g4[q],e4))+" has the Initiative.")}break
case"eliminate":g4=g3.h(g5,e2)
s=J.m(g4==null?"":g4)
g3=g3.h(g5,"reason")
e0=J.m(g3==null?g2:g3)
q=A.al(s)
if(q>=0){g3=$.d
if(!(q<g3.length))return A.b(g3,q)
g3=!J.q(J.a(g3[q],g2),!0)}else g3=!1
if(g3){g3=$.d
if(!(q>=0&&q<g3.length))return A.b(g3,q)
J.S(g3[q],g2,!0)
g3=$.d
if(!(q<g3.length))return A.b(g3,q)
g3=A.c(J.a(g3[q],e4))
g4=$.d
if(!(q<g4.length))return A.b(g4,q)
A.w(g3+" eliminated ("+e0+")",A.c(J.a(g4[q],e4))+" has been eliminated: "+e0)
g4=$.d
if(!(q<g4.length))return A.b(g4,q)
A.lM(A.n(J.a(g4[q],e4)),e0)
A.pB()}break
case"log":g3=g3.h(g5,"message")
e1=J.m(g3==null?"":g3)
if(e1.length!==0)A.w(e1,e1)
break}},
al(a){var s,r,q=a.toLowerCase()
for(s=0;r=$.d,s<r.length;++s){if(A.n(J.a(r[s],"name")).toLowerCase()===q)return s
r=$.d
if(!(s<r.length))return A.b(r,s)
r=A.n(J.a(r[s],"name"))
if(A.ay(r.toLowerCase(),q,0))return s}return-1},
d5(a,b,c){var s
if(b.length!==0){s=J.a(a,"id")
s=s==null?null:J.m(s)
s=(s==null?"":s)===b}else s=!1
if(s)return!0
if(c.length===0)return!1
s=A.ak(J.a(a,"name"))
if(s==null)s=""
return B.b.l(s.toLowerCase(),c.toLowerCase())},
nR(a,b,c,d){var s,r,q,p,o,n=$.d
if(!(a>=0&&a<n.length))return A.b(n,a)
s=t.g.a(J.a(n[a],"cards"))
for(n=J.T(s==null?[]:s),r=d.length!==0,q=t.P;n.n();){p=q.a(n.gt())
if(r){o=J.a(p,"zone")
o=!J.q(o==null?"":o,d)}else o=!1
if(o)continue
if(A.d5(p,b,c))return p}return null},
eE(){var s,r,q,p,o,n
for(s=$.d,r=s.length,q=t.P,p=t.g,o=0;o<s.length;s.length===r||(0,A.N)(s),++o){n=p.a(J.a(s[o],"cards"))
n=J.T(n==null?[]:n)
for(;n.n();)J.S(q.a(n.gt()),"attacking",!1)}B.a.C($.a2)},
br(a,b){var s
if(a==null)return b
if(A.d7(a))return a
if(typeof a=="number")return B.i.R(a)
s=A.a4(J.m(a),null)
return s==null?b:s},
tA(a){var s=a.toLowerCase()
if(s==="draw")return 0
if(s==="main")return 1
if(s==="combat")return 2
if(s==="end")return 3
return-1},
p8(a,b,c){var s,r=b.toLowerCase(),q=c.toLowerCase()
if(r===q)return
s=r==="hand"
if(s&&q!=="hand")A.di(a,1)
else if(q==="hand"&&!s)A.o7(a,1)},
jD(a,b,c){var s=0,r=A.c7(t.H),q,p,o,n,m,l,k,j
var $async$jD=A.c9(function(d,e){if(d===1)return A.c3(e,r)
while(true)switch(s){case 0:s=3
return A.c2(A.cF(b),$async$jD)
case 3:m=e
l=m==null
k=!l?A.hd(m):A.G(["type","creature","subtype","","supertypes",[],"keywords",[],"oracleText","","triggers",[],"globalEffect","","power",null,"toughness",null],t.N,t.z)
j=Date.now()
k.k(0,"id","voice_"+j+"_"+B.r.ad(9999))
l=l?null:J.a(m,"name")
k.k(0,"name",l==null?b:l)
k.k(0,"tapped",!1)
k.k(0,"zone",c)
k.k(0,"counters",0)
k.k(0,"tempPtBonus",0)
if(k.h(0,"keywords")==null)k.k(0,"keywords",[])
if(k.h(0,"supertypes")==null)k.k(0,"supertypes",[])
if(k.h(0,"triggers")==null)k.k(0,"triggers",[])
l=$.d
if(!(a>=0&&a<l.length)){q=A.b(l,a)
s=1
break}J.F(J.a(l[a],"cards"),k)
l=$.aw
j=$.d
if(!(a<j.length)){q=A.b(j,a)
s=1
break}j=A.n(J.a(j[a],"name"))
p=$.aw
o=$.d
if(!(a<o.length)){q=A.b(o,a)
s=1
break}o=p.h(0,J.a(o[a],"name"))
p=o==null?0:o
if(typeof p!=="number"){q=p.J()
s=1
break}l.k(0,j,p+1)
n=c.toLowerCase()
if(n==="battlefield"||n==="graveyard"||n==="exile"||n==="stack"||n==="command")A.di(a,1)
l=$.d
if(!(a<l.length)){q=A.b(l,a)
s=1
break}l=A.c(J.a(l[a],"name"))
j=A.c(k.h(0,"name"))
p=$.d
if(!(a<p.length)){q=A.b(p,a)
s=1
break}A.w(l+" plays "+j+" \u2192 "+c,A.c(J.a(p[a],"name"))+" played "+A.c(k.h(0,"name"))+" onto the "+c+".")
A.D($.bb===B.x?B.j:null)
case 1:return A.c4(q,r)}})
return A.c5($async$jD,r)},
pG(){var s,r,q,p,o
try{q=$.hk()
p=q.h(0,"webkitSpeechRecognition")
s=p==null?q.h(0,"SpeechRecognition"):p
if(s==null){A.bg("Speech Recognition not supported")
return}q=A.oC(t.a2.a(s))
$.bs=q
q.k(0,"lang","en-US")
$.bs.k(0,"continuous",!0)
$.bs.k(0,"interimResults",!0)
A.tU()
q=t.dC
$.bs.k(0,"onstart",A.kg(new A.l0(),q))
$.bs.k(0,"onend",A.kg(new A.l1(),q))
q=t.he
$.bs.k(0,"onerror",A.kg(new A.l2(),q))
$.bs.k(0,"onresult",A.kg(new A.l3(),q))
A.bg("Voice Recognition initialized successfully")
A.tL()}catch(o){r=A.ag(o)
A.bg("Error initializing voice: "+A.c(r))}},
uG(){var s,r,q,p
if($.bs==null)A.pG()
try{r=$.dc
q=$.bs
if(r)q.bn("stop")
else q.bn("start")}catch(p){s=A.ag(p)
A.bg("Error toggling voice: "+A.c(s))}},
tL(){var s,r,q,p,o,n
try{s=t.a7.a(document.querySelector(".voice-fab"))
if(s!=null){q=t.h.a(s)
p=t.C
o=p.i("~(1)?").a(new A.k3())
t.Z.a(null)
A.l(q,"click",o,!1,p.c)
A.bg("Voice button setup complete")}}catch(n){r=A.ag(n)
A.bg("Error setting up voice button: "+A.c(r))}},
pv(){var s,r,q
try{s=t.dg.a(document.querySelector("#inputModeHint"))
if(s!=null)if($.dc)J.eS(s,"\ud83c\udfa4 Listening for voice commands...")
else J.eS(s,"\u2328\ufe0f Type a command or click mic to speak...")}catch(q){r=A.ag(q)
A.bg("Error updating input hint: "+A.c(r))}},
rS(a){var s,r,q
try{s=t.dg.a(document.querySelector(".voice-transcript"))
if(s!=null)J.eS(s,'"'+a+'"')}catch(q){r=A.ag(q)
A.bg("Error displaying transcript: "+A.c(r))}},
tt(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
a=a.toLowerCase()
b=b.toLowerCase()
s=a.length
if(s===0)return b.length
r=b.length
if(r===0)return s
q=r+1
p=J.oz(q,t.bW)
for(o=s+1,n=t.S,m=0;m<q;++m)p[m]=A.cT(o,0,!1,n)
for(l=0;l<=s;++l){if(0>=p.length)return A.b(p,0)
B.a.k(p[0],l,l)}for(l=0;l<=r;++l){if(!(l<p.length))return A.b(p,l)
B.a.k(p[l],0,l)}for(o=t.X,l=1;l<=r;++l)for(n=l-1,k=1;k<=s;++k){j=k-1
i=a[j]===b[n]?0:1
h=p.length
if(!(l<h))return A.b(p,l)
g=p[l]
if(!(n<h))return A.b(p,n)
h=p[n]
f=h.length
if(!(k<f))return A.b(h,k)
e=h[k]
if(!(j<g.length))return A.b(g,j)
d=g[j]
if(!(j<f))return A.b(h,j)
B.a.k(g,k,B.a.Z(A.o([e+1,d+1,h[j]+i],o),new A.jI()))}if(!(r<p.length))return A.b(p,r)
r=p[r]
if(!(s<r.length))return A.b(r,s)
return r[s]},
k6(a,b){var s=a.length,r=b.length
s=s>r?s:r
if(s===0)return 1
return 1-A.tt(a,b)/s},
tv(a0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=a0.toLowerCase(),b=$.d,a=b.length
if(a===0)return c
for(s=0;s<b.length;b.length===a||(0,A.N)(b),++s){r=A.n(J.a(b[s],"name")).toLowerCase()
q=B.b.aA(c,A.aq("\\s+"))
for(p=r.length,o=p*0.6,n=p>=3,m=p-1,p-=2,l=0;l<q.length;++l){k=A.k6(q[l],r)
if(!(l<q.length))return A.b(q,l)
if(J.W(q[l])>1){if(!(l<q.length))return A.b(q,l)
j=q[l]
i=B.i.dl(o)
if(!(l<q.length))return A.b(q,l)
h=B.b.ai(r,J.qu(j,0,B.f.a4(i,1,J.W(q[l]))))}else h=!1
j=!h
if(j){if(!(l<q.length))return A.b(q,l)
i=J.W(q[l])>=3&&n}else i=!1
if(i){if(!(l<q.length))return A.b(q,l)
g=q[l]
if(B.b.U(g,"ny"))f=B.b.F(g,0,g.length-2)
else if(B.b.U(g,"ie")){i=B.b.F(g,0,g.length-2)
f=i}else{if(B.b.U(g,"y"))i=B.b.F(g,0,g.length-1)
else i=B.b.U(g,"i")?B.b.F(g,0,g.length-1):g
f=i}if(B.b.U(r,"ny"))e=B.b.F(r,0,p)
else if(B.b.U(r,"ie")){i=B.b.F(r,0,p)
e=i}else{if(B.b.U(r,"y"))i=B.b.F(r,0,m)
else i=B.b.U(r,"i")?B.b.F(r,0,m):r
e=i}d=f.length!==0&&e.length!==0&&f===e}else d=!1
if(k>=0.55||!j||d)B.a.k(q,l,r)}c=B.a.V(q," ")}return c},
bq(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
if($.d.length===0)return-1
a=a.toLowerCase()
for(s=0,r=-1,q=0;p=$.d,q<p.length;++q){o=A.n(J.a(p[q],"name")).toLowerCase()
if(A.ay(a,o,0))return q
n=B.b.aA(a,A.aq("\\s+"))
for(p=n.length,m=0;m<n.length;n.length===p||(0,A.N)(n),++m){l=n[m]
k=J.j(l)
j=k.gm(l)<=4?0.55:0.58
i=A.k6(l,o)
if(k.a0(l,o))i=1
if(B.b.ai(o,l)||k.ai(l,o))i=(i+0.95)/2
if(i>j&&i>s){r=q
s=i}}}if(r<0){for(h=0,g=-1,q=0;p=$.d,q<p.length;++q){o=A.n(J.a(p[q],"name")).toLowerCase()
n=B.b.aA(a,A.aq("\\s+"))
for(p=n.length,k=o.length,f=k-1,k-=2,m=0;m<n.length;n.length===p||(0,A.N)(n),++m){l=n[m]
i=A.k6(l,o)
if(B.b.ai(o,l)||J.qt(l,o))i=(i+0.95)/2
e=J.eJ(l)
if(e.U(l,"ny"))d=e.F(l,0,e.gm(l)-2)
else if(e.U(l,"ie")){e=e.F(l,0,e.gm(l)-2)
d=e}else{if(e.U(l,"y"))e=e.F(l,0,e.gm(l)-1)
else e=e.U(l,"i")?e.F(l,0,e.gm(l)-1):l
d=e}if(B.b.U(o,"ny"))c=B.b.F(o,0,k)
else if(B.b.U(o,"ie")){e=B.b.F(o,0,k)
c=e}else{if(B.b.U(o,"y"))e=B.b.F(o,0,f)
else e=B.b.U(o,"i")?B.b.F(o,0,f):o
c=e}if(d.length!==0&&c.length!==0&&d===c)i=(i+0.95)/2
if(i>=0.5&&i>h){g=q
h=i}}}return g}return r},
tU(){var s,r,q,p,o,n,m,l,k,j,i
if($.bs==null||$.d.length===0)return
try{l=$.hk()
k=l.h(0,"webkitSpeechGrammarList")
s=k==null?l.h(0,"SpeechGrammarList"):k
if(s==null)return
r=A.oC(t.a2.a(s))
l=$.d
j=A.L(l)
q=A.a8(new A.R(l,j.i("h(1)").a(new A.k8()),j.i("R<1,h>")),!0,t.N)
J.F(q,"gains")
J.F(q,"loses")
J.F(q,"life")
J.F(q,"draw")
J.F(q,"draws")
J.F(q,"card")
J.F(q,"cards")
J.F(q,"poison")
J.F(q,"poisoned")
J.F(q,"attacks")
J.F(q,"attack")
J.F(q,"cast")
J.F(q,"casts")
J.F(q,"next")
J.F(q,"turn")
J.F(q,"tap")
J.F(q,"tapped")
J.F(q,"untap")
J.F(q,"untapped")
J.F(q,"monarch")
J.F(q,"becomes")
J.F(q,"damage")
J.F(q,"placed")
J.F(q,"battlefield")
J.F(q,"with")
J.F(q,"from")
J.F(q,"counter")
J.F(q,"counters")
J.F(q,"declared")
J.F(q,"pass")
J.F(q,"declare")
J.F(q,"attackers")
J.F(q,"blockers")
J.F(q,"resolve")
J.F(q,"undo")
J.F(q,"last")
J.F(q,"into")
J.F(q,"the")
p=q
q=p
q=A.nA(q,A.P(q).c)
o=A.a8(q,!0,A.x(q).i("bl.E"))
n="#JSGF V1.0;\ngrammar mtg;\npublic <phrase> = "+J.ho(o," | ")+" ;"
r.aF("addFromString",[n,1])
$.bs.k(0,"grammars",r)
A.bg("Voice grammar updated with "+J.W(o)+" terms")}catch(i){m=A.ag(i)
A.bg("Grammar update failed (browser may not support it): "+A.c(m))}},
J(){var s,r,q,p,o,n,m,l,k,j,i,h,g
try{l=document
k=t._
s=k.a(l.querySelector(".voice-panel"))
r=t.a7.a(l.querySelector(".voice-fab"))
if(s!=null)if($.dc||$.C.length!==0)s.classList.add("visible")
else s.classList.remove("visible")
if(r!=null)if($.dc){r.classList.remove("processing")
r.classList.add("listening")}else if($.C.length!==0){r.classList.remove("listening")
r.classList.add("processing")}else{r.classList.remove("listening")
r.classList.remove("processing")}q=t.dg.a(l.querySelector("#voiceFabLabel"))
if(q!=null)if($.dc)J.eS(q,"\ud83d\udd34 Listening...")
else J.eS(q,"Click to toggle mic")
p=k.a(l.querySelector(".voice-action-list"))
if(p!=null){J.hl(p)
for(k=$.C,k=A.aO(k,0,A.az(5,"count",t.S),A.L(k).c),j=k.$ti,k=new A.aF(k,k.gm(k),j.i("aF<Q.E>")),j=j.i("Q.E");k.n();){i=k.d
o=i==null?j.a(i):i
h=l.createElement("div")
h.className="voice-action-item"
B.e.sj(h,o)
n=h
J.qg(p,n)}}}catch(g){m=A.ag(g)
A.bg("Error updating voice panel: "+A.c(m))}},
tx(a){var s,r,q,p,o,n,m,l,k,j,i,h,g="life"
try{s=$.hk().h(0,"processVoiceCommand")
if(s instanceof A.bU){r=[B.b.B(a)]
q=s.a
p=A.hc(null)
o=A.L(r)
o=A.a7(new A.R(r,o.i("@(1)").a(A.pJ()),o.i("R<1,@>")),!0,t.z)
A.jr(q.apply(p,o))
return}}catch(n){}m=A.tv(B.b.B(a))
if(!$.b_||$.d.length===0){B.a.u($.C,0,"\u2753 Game not started yet")
A.J()
return}if((B.b.l(m,"declare")||B.b.l(m,"done")||B.b.l(m,"pass"))&&$.ae&&$.X===0){A.pf(m)
return}if((B.b.l(m,"block")||B.b.l(m,"resolve")||B.b.l(m,"proceed"))&&$.ae&&$.X===1){A.rW(m)
return}if((B.b.l(m,"resolve")||B.b.l(m,"damage")||B.b.l(m,"proceed"))&&$.ae&&$.X===2){m=B.b.B(m.toLowerCase())
l=A.aq("(?:takes?|deals?)\\s+(\\d+)\\s+damage").a6(m)
if(l!=null){r=l.b
if(1>=r.length)return A.b(r,1)
r=r[1]
r.toString
k=A.dh(r)
j=A.aq("\\b(\\w+)\\s+(?:takes?|gets?)\\s+(\\d+)").a6(m)
if(j!=null){r=j.b
if(1>=r.length)return A.b(r,1)
r=r[1]
r.toString
i=A.bq(r)}else i=-1
if(i>=0){r=$.d
if(!(i<r.length))return A.b(r,i)
h=r[i]
r=J.j(h)
r.k(h,g,A.i(r.h(h,g))-k)
B.a.u($.C,0,"\u2713 "+A.c(r.h(h,"name"))+" takes "+k+" damage")}else B.a.u($.C,0,"\u2713 Combat damage applied")}else B.a.u($.C,0,"\u2713 Combat resolved")
A.o1()
return}if(B.b.l(m,"draw")||B.b.l(m,"pulls")||B.b.l(m,"pull"))r=B.b.l(m,"card")||B.b.l(m,"deck")
else r=!1
if(r){A.t_(m)
return}if((B.b.l(m,"discard")||B.b.l(m,"mill"))&&B.b.l(m,"card")){A.rZ(m)
return}if(B.b.l(m,"placed")&&B.b.l(m,"battlefield")){A.t2(m)
return}if(B.b.l(m,"cast")){A.rX(m)
return}if(B.b.l(m,"attack"))r=B.b.l(m,"with")||B.b.l(m,"using")
else r=!1
if(r){A.rV(m)
return}if((B.b.l(m,"gain")||B.b.l(m,"lose"))&&B.b.l(m,g)){A.t0(m)
return}if(B.b.l(m,"tap")){A.t5(m)
return}if(B.b.l(m,"next")&&B.b.l(m,"turn")){A.t1()
return}if(B.b.l(m,"poison")){A.t3(m)
return}if((B.b.l(m,"add")||B.b.l(m,"put"))&&B.b.l(m,"counter")&&B.b.l(m,"to")){A.rU(m)
return}r=!B.b.l(m,"monarch")
if(!r||B.b.l(m,"becomes"))r=!r||B.b.l(m,"becomes")
else r=!1
if(r){A.t4(m)
return}if(B.b.l(m,"commander")&&B.b.l(m,"damage")&&B.b.l(m,"from")){A.rY(m)
return}if(m!=="undo")r=B.b.l(m,"undo")&&B.b.l(m,"last")
else r=!0
if(r){A.t6()
return}B.a.u($.C,0,"\u2753 Unknown command")
A.J()},
t2(a){var s,r,q,p,o,n=A.bq(a)
if(n<0){B.a.u($.C,0,"\u274c Player not found")
A.J()
return}s=B.b.aw(a,"placed")
if(s<0)return
r=B.b.aw(a,"into")
q=s+7
if(r>s)p=B.b.B(B.b.F(a,q,r))
else{o=B.b.aA(B.b.B(B.b.a2(a,q)),A.aq("\\s+"))
q=A.L(o)
p=B.b.B(new A.a_(o,q.i("y(1)").a(new A.jC()),q.i("a_<1>")).V(0," "))}if(p.length===0)return
B.a.u($.C,0,'\ud83d\udd0d Looking up "'+p+'"...')
A.J()
A.ka(n,p)},
ka(a,b){return A.tW(a,b)},
tW(a5,a6){var s=0,r=A.c7(t.H),q,p=2,o,n=[],m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
var $async$ka=A.c9(function(a7,a8){if(a7===1){o=a8
s=p}while(true)switch(s){case 0:p=4
s=7
return A.c2(A.cF(a6),$async$ka)
case 7:m=a8
if(m==null){B.a.u($.C,0,'\u274c "'+a6+'" not found in Scryfall \u2014 use manual entry')
A.J()
s=1
break}l=A.hd(m)
h=J.a(l,"name")
k=A.n(h==null?a6:h)
h=Date.now()
g=B.r.ad(9999)
f=J.a(l,"type")
if(f==null)f="creature"
e=J.a(l,"subtype")
if(e==null)e=""
d=J.a(l,"supertypes")
if(d==null)d=[]
c=J.a(l,"keywords")
if(c==null)c=[]
b=J.a(l,"oracleText")
if(b==null)b=""
a=J.a(l,"triggers")
if(a==null)a=[]
a0=J.a(l,"globalEffect")
if(a0==null)a0=""
a1=J.a(l,"manaCost")
if(a1==null)a1=""
a2=J.a(l,"imageUrl")
if(a2==null)a2=""
j=A.G(["id",""+h+"_"+g,"name",k,"type",f,"zone","battlefield","tapped",!1,"counters",0,"tempPtBonus",0,"subtype",e,"supertypes",d,"keywords",c,"oracleText",b,"triggers",a,"globalEffect",a0,"manaCost",a1,"imageUrl",a2,"isVoiceEntry",!0],t.N,t.z)
a2=$.d
if(!(a5>=0&&a5<a2.length)){q=A.b(a2,a5)
s=1
break}J.F(J.a(a2[a5],"cards"),j)
a2=$.aw
a1=$.d
if(!(a5<a1.length)){q=A.b(a1,a5)
s=1
break}a1=A.n(J.a(a1[a5],"name"))
a0=$.aw
a=$.d
if(!(a5<a.length)){q=A.b(a,a5)
s=1
break}a=a0.h(0,J.a(a[a5],"name"))
h=a==null?0:a
if(typeof h!=="number"){q=h.J()
s=1
break}a2.k(0,a1,h+1)
A.di(a5,1)
h=$.d
if(!(a5<h.length)){q=A.b(h,a5)
s=1
break}h=A.c(J.a(h[a5],"name"))
a1=A.c(k)
a2=A.bf(a5)
g=$.d
if(!(a5<g.length)){q=A.b(g,a5)
s=1
break}A.w(h+" placed "+a1+" onto battlefield (voice) \u2022 Hand: "+a2,A.c(J.a(g[a5],"name"))+" played "+A.c(k)+" via voice command.")
B.a.u($.C,0,"\u2713 Placed "+A.c(k)+" \u2022 Hand: "+A.bf(a5))
A.D(null)
A.J()
p=2
s=6
break
case 4:p=3
a4=o
i=A.ag(a4)
B.a.u($.C,0,"\u274c Error looking up card: "+A.c(i))
A.J()
s=6
break
case 3:s=2
break
case 6:case 1:return A.c4(q,r)
case 2:return A.c3(o,r)}})
return A.c5($async$ka,r)},
rX(a){var s,r,q=A.bq(a)
if(q<0){B.a.u($.C,0,"\u274c Player not found")
A.J()
return}s=B.b.aw(a,"cast")
if(s<0)return
r=B.b.B(B.b.a2(a,s+5))
if(r.length===0)return
A.k9(q,r)},
k9(a,b){return A.tV(a,b)},
tV(a5,a6){var s=0,r=A.c7(t.H),q,p=2,o,n=[],m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
var $async$k9=A.c9(function(a7,a8){if(a7===1){o=a8
s=p}while(true)switch(s){case 0:p=4
s=7
return A.c2(A.cF(a6),$async$k9)
case 7:m=a8
if(m==null){B.a.u($.C,0,'\u274c Card not found: "'+a6+'" (not in Scryfall database)')
A.J()
s=1
break}l=A.hd(m)
h=Date.now()
g=B.r.ad(9999)
f=J.a(l,"name")
if(f==null)f=a6
e=J.a(l,"type")
if(e==null)e="unknown"
d=J.a(l,"subtype")
if(d==null)d=""
c=J.a(l,"supertypes")
if(c==null)c=[]
b=J.a(l,"keywords")
if(b==null)b=[]
a=J.a(l,"oracleText")
if(a==null)a=""
a0=J.a(l,"triggers")
if(a0==null)a0=[]
a1=J.a(l,"globalEffect")
if(a1==null)a1=""
a2=J.a(l,"manaCost")
if(a2==null)a2=""
k=A.G(["id",""+h+"_"+g,"name",f,"type",e,"zone","graveyard","tapped",!1,"counters",0,"tempPtBonus",0,"subtype",d,"supertypes",c,"keywords",b,"oracleText",a,"triggers",a0,"globalEffect",a1,"manaCost",a2,"isVoiceEntry",!0],t.N,t.z)
a2=$.d
if(!(a5>=0&&a5<a2.length)){q=A.b(a2,a5)
s=1
break}J.F(J.a(a2[a5],"cards"),k)
a2=$.aw
a1=$.d
if(!(a5<a1.length)){q=A.b(a1,a5)
s=1
break}a1=A.n(J.a(a1[a5],"name"))
a0=$.aw
a=$.d
if(!(a5<a.length)){q=A.b(a,a5)
s=1
break}a=a0.h(0,J.a(a[a5],"name"))
h=a==null?0:a
if(typeof h!=="number"){q=h.J()
s=1
break}a2.k(0,a1,h+1)
A.di(a5,1)
h=J.a(l,"name")
j=A.n(h==null?a6:h)
h=$.d
if(!(a5<h.length)){q=A.b(h,a5)
s=1
break}h=A.c(J.a(h[a5],"name"))
g=A.c(j)
f=A.bf(a5)
e=$.d
if(!(a5<e.length)){q=A.b(e,a5)
s=1
break}A.w(h+" cast "+g+" (voice) \u2022 Hand: "+f,A.c(J.a(e[a5],"name"))+" cast "+A.c(j)+" via voice command.")
B.a.u($.C,0,"\u2713 Cast "+A.c(j)+" \u2022 Hand: "+A.bf(a5))
A.D(null)
A.J()
p=2
s=6
break
case 4:p=3
a4=o
i=A.ag(a4)
B.a.u($.C,0,"\u274c Error validating card: "+A.c(i))
A.J()
s=6
break
case 3:s=2
break
case 6:case 1:return A.c4(q,r)
case 2:return A.c3(o,r)}})
return A.c5($async$k9,r)},
t0(a){var s,r,q,p,o,n,m,l,k,j,i="life",h="name",g=A.bq(a)
if(g<0){B.a.u($.C,0,"\u274c Player not found")
A.J()
return}s=A.aq("(\\d+)").a6(a)
if(s!=null){r=s.b
if(1>=r.length)return A.b(r,1)
r=r[1]
r.toString
q=A.a4(r,null)
if(q==null)q=1}else q=1
if(B.b.l(a,"lose"))q=-q
r=$.bI
p=$.d
if(!(g<p.length))return A.b(p,g)
B.a.k(r,g,A.i(J.a(p[g],i)))
p=$.d
if(!(g<p.length))return A.b(p,g)
p=p[g]
r=J.j(p)
r.k(p,i,A.i(r.h(p,i))+q)
A.eL(g,q)
r=q>0
if(r){p=$.aU
o=$.d
if(!(g<o.length))return A.b(o,g)
o=A.n(J.a(o[g],h))
n=$.aU
m=$.d
if(!(g<m.length))return A.b(m,g)
m=n.h(0,J.a(m[g],h))
n=m==null?0:m
if(typeof n!=="number")return n.J()
p.k(0,o,n+q)}p=$.d
if(!(g<p.length))return A.b(p,g)
p=A.c(J.a(p[g],h))
o=r?"gains":"loses"
n=""+Math.abs(q)
m=$.d
if(!(g<m.length))return A.b(m,g)
m=A.c(J.a(m[g],i))
l=$.d
if(!(g<l.length))return A.b(l,g)
l=A.c(J.a(l[g],h))
k=r?"gained":"lost"
j=$.d
if(!(g<j.length))return A.b(j,g)
A.w(p+" "+o+" "+n+" life \u2192 "+m+" (voice)",l+" "+k+" "+n+" life via voice. Now at "+A.c(J.a(j[g],i))+".")
A.be(g)
j=$.C
k=$.d
if(!(g<k.length))return A.b(k,g)
k=A.c(J.a(k[g],h))
r=r?"gained":"lost"
B.a.u(j,0,"\u2713 "+k+" "+r+" "+n+" life")
A.D(null)
A.J()},
t5(a){var s,r,q,p,o,n,m="name",l="tapped",k=$.H,j=B.b.aw(a,"tap")
if(j<0)return
s=B.b.B(B.b.a2(a,j+3))
if(s.length===0)return
r=$.d
if(!(k>=0&&k<r.length))return A.b(r,k)
for(r=J.T(t.j.a(J.a(r[k],"cards")));r.n();){q=r.gt()
p=J.j(q)
o=A.n(p.h(q,m))
if(A.ay(o.toLowerCase(),s.toLowerCase(),0)&&J.q(p.h(q,"zone"),"battlefield")){p.k(q,l,!A.j2(p.h(q,l)))
n=J.q(p.h(q,l),!0)?l:"untapped"
r=$.d
if(!(k<r.length))return A.b(r,k)
A.w(A.c(J.a(r[k],m))+": "+A.c(p.h(q,m))+" now "+n+" (voice)",A.c(p.h(q,m))+" is now "+n+".")
B.a.u($.C,0,"\u2713 "+A.c(p.h(q,m))+" is now "+n)
A.D(null)
A.J()
return}}B.a.u($.C,0,"\u274c Card not found on battlefield")
A.J()},
t1(){var s,r,q
if(!$.b_){B.a.u($.C,0,"\u274c Game not started")
A.J()
return}A.nZ(!0)
s=$.C
r=$.d
q=$.H
if(!(q>=0&&q<r.length))return A.b(r,q)
B.a.u(s,0,"\u2713 Next turn: "+A.c(J.a(r[q],"name")))
A.D(null)
A.J()},
t3(a){var s,r,q,p,o,n,m="poison",l="name",k=A.bq(a)
if(k<0){B.a.u($.C,0,"\u274c Player not found")
A.J()
return}s=A.aq("(\\d+)").a6(a)
if(s!=null){r=s.b
if(1>=r.length)return A.b(r,1)
r=r[1]
r.toString
q=A.a4(r,null)
if(q==null)q=1}else q=1
r=$.d
if(!(k<r.length))return A.b(r,k)
r=r[k]
p=J.j(r)
o=p.h(r,m)
p.k(r,m,J.aZ(o==null?0:o,q))
r=$.d
if(!(k<r.length))return A.b(r,k)
r=A.c(J.a(r[k],l))
p=$.d
if(!(k<p.length))return A.b(p,k)
p=A.c(J.a(p[k],m))
o=$.d
if(!(k<o.length))return A.b(o,k)
o=A.c(J.a(o[k],l))
n=$.d
if(!(k<n.length))return A.b(n,k)
A.w(r+" gains "+q+" poison ("+p+"/10) - voice",o+" now has "+A.c(J.a(n[k],m))+" poison counters via voice command.")
A.be(k)
n=$.C
o=$.d
if(!(k<o.length))return A.b(o,k)
o=A.c(J.a(o[k],l))
p=$.d
if(!(k<p.length))return A.b(p,k)
B.a.u(n,0,"\u2713 "+o+" now at "+A.c(J.a(p[k],m))+" poison")
A.D(null)
A.J()},
rV(a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3="name",a4=B.b.B(a5.toLowerCase())
if($.ae&&$.X===0){A.pf(a5)
return}s=$.H
r=A.o([],t.s)
q=A.aq("(?:with|using)\\s+(.+?)(?:\\s+and\\s+|\\s+attacks?|$)").aW(0,a4)
for(p=new A.d_(q.a,q.b,q.c),o=t.r;p.n();){n=p.d
m=(n==null?o.a(n):n).b
if(1>=m.length)return A.b(m,1)
l=m[1]
if(l==null)l=""
B.a.K(B.b.aA(l,A.aq("\\s+and\\s+|\\s*,\\s*")),new A.jx(r))}if(r.length===0){B.a.u($.C,0,'\u2139\ufe0f Which creatures attack? (e.g., "spiderman and goblin")')
A.J()
return}p=$.d
if(!(s>=0&&s<p.length))return A.b(p,s)
p=J.hq(t.j.a(J.a(p[s],"cards")),new A.jy())
p=A.cN(p,p.$ti.i("k.E"),t.P)
k=A.a8(p,!0,A.x(p).i("k.E"))
p=t.t
j=A.o([],p)
for(o=r.length,i=0;i<r.length;r.length===o||(0,A.N)(r),++i){h={}
g=r[i]
h.a=null
for(m=k.length,f=0.75,e=0;e<m;++e){d=k[e]
c=A.n(J.a(d,a3)).toLowerCase()
b=A.k6(g,c)
if(A.ay(c,g,0)||B.b.ai(g,c))b=(b+0.95)/2
if(b>f){h.a=d
f=b}}if(h.a!=null&&!B.a.Y(j,new A.jz(h)))B.a.q(j,h.a)}if(j.length===0){B.a.u($.C,0,"\u274c No creatures found matching: "+B.a.V(r,", "))
A.J()
return}a=A.aq("attack(?:s?)?\\s+(?:player\\s+)?(.+?)(?:\\s+with|\\s+using|$)").a6(a4)
if(a!=null){o=a.b
if(1>=o.length)return A.b(o,1)
o=o[1]
a0=A.bq(B.b.B(o==null?"":o))}else a0=-1
if(a0<0||a0===s)a0=A.ph(s)
if(a0<0||a0===s){B.a.u($.C,0,"\u274c No valid defender found.")
A.J()
return}$.ae=!0
$.X=0
B.a.C($.a2)
for(o=j.length,m=t.N,a1=t.z,i=0;i<j.length;j.length===o||(0,A.N)(j),++i){d=j[i]
B.a.q($.a2,A.G(["card",d,"targetIdx",a0,"blockers",A.o([],p)],m,a1))}a2=new A.R(j,t.dY.a(new A.jA()),t.gh).V(0,", ")
if(a0>=0){p=$.d
if(!(a0<p.length))return A.b(p,a0)
p=J.a(p[a0],a3)}else p="unknown"
A.n(p)
B.a.u($.C,0,"\u2713 Combat initiated: "+a2+" attacking "+p)
o=$.d
if(!(s<o.length))return A.b(o,s)
A.w(A.c(J.a(o[s],a3))+" initiates combat with: "+a2+" (attacking "+p+") (voice)","Combat started: "+a2+" attacking "+p+" via voice command.")
A.aW()
A.bu()
A.J()},
pf(a){var s,r,q,p,o,n,m,l,k,j=B.b.B(a.toLowerCase()),i=A.aq("(?:use|attack|cast)\\s+(\\w+)").a6(j)
if(i!=null&&$.a2.length===0){s=i.b
if(1>=s.length)return A.b(s,1)
s=s[1]
s.toString
B.a.u($.C,0,"\u2139\ufe0f Manually select attacker: "+s+" (then continue)")
A.J()
return}s=$.a2
r=s.length
if(r===0&&!B.b.l(j,"pass")&&!B.b.l(j,"done")){B.a.u($.C,0,'\u274c Please select attackers first using the UI or "attack [creature]"')
A.J()
return}for(q=t.R,p=t.N,o=0;o<s.length;s.length===r||(0,A.N)(s),++o){n=s[o]
m=J.j(n)
l=J.a(m.h(n,"card"),"keywords")
if(!B.a.l(A.a7(q.a(l==null?[]:l),!0,p),"Vigilance"))J.S(m.h(n,"card"),"tapped",!0)}s=$.a2
r=A.L(s)
k=new A.R(s,r.i("h(1)").a(new A.jB()),r.i("R<1,h>")).V(0,", ")
B.a.u($.C,0,"\u2713 Attackers: "+k+". Waiting for blockers...")
$.X=1
A.aW()
A.bu()
A.J()},
rW(a){var s,r,q=B.b.B(a.toLowerCase()),p=A.aq("blocks?(?:\\s+using)?\\s+(\\w+)"),o=A.aq("(?:no|doesn't?|don't)\\s+blocks?")
if(p.b.test(q)){s=p.a6(q).b
if(1>=s.length)return A.b(s,1)
s=s[1]
s.toString
B.a.u($.C,0,"\u2139\ufe0f Manually assign blocker: "+s+" (then continue)")
A.J()
return}if(o.b.test(q)||B.b.l(q,"pass")||B.b.l(q,"no block")||B.b.l(q,"unblocked")){B.a.u($.C,0,"\u2713 No blockers. Combat damage on the stack...")
$.X=2}else{s=B.b.l(q,"proceed")||B.b.l(q,"resolve")||B.b.l(q,"damage")
r=$.C
if(s){B.a.u(r,0,"\u2713 Combat damage resolving...")
$.X=2}else B.a.u(r,0,'\ud83d\udcac Assign blockers, then say "proceed", "damage", or "no blockers"')}A.aW()
A.bu()
A.J()},
rU(a){var s,r,q,p,o,n,m,l,k,j,i="name",h="counters",g=B.b.B(a.toLowerCase()),f=B.b.aw(g,"to")
if(f<0){B.a.u($.C,0,"\u274c Please specify which card to add counter to")
A.J()
return}s=B.b.B(B.b.a2(g,f+2))
if(s.length===0){B.a.u($.C,0,"\u274c Please specify a card name")
A.J()
return}for(r=t.j,q=t.P,p=null,o=-1,n=0;m=$.d,n<m.length;++n){for(m=J.T(r.a(J.a(m[n],"cards")));m.n();){l=m.gt()
k=J.j(l)
if(J.q(k.h(l,"zone"),"battlefield")){k=A.n(k.h(l,i))
k=A.ay(k.toLowerCase(),s.toLowerCase(),0)}else k=!1
if(k){q.a(l)
o=n
p=l
break}}if(p!=null)break}if(p==null){B.a.u($.C,0,'\u274c Card "'+s+'" not found on battlefield')
A.J()
return}r=J.j(p)
q=r.h(p,h)
r.k(p,h,A.i(q==null?0:q)+1)
q=$.d
if(!(o>=0&&o<q.length))return A.b(q,o)
q=A.c(J.a(q[o],i))
m=A.c(r.h(p,i))
k=A.c(r.h(p,h))
j=$.d
if(!(o<j.length))return A.b(j,o)
A.w(q+" adds +1/+1 counter to "+m+" ("+k+")",A.c(J.a(j[o],i))+" added a +1/+1 counter to "+A.c(r.h(p,i))+".")
B.a.u($.C,0,"\u2713 Added counter to "+A.c(r.h(p,i))+" ("+A.c(r.h(p,h))+" total)")
A.D(null)
A.J()},
t4(a){var s,r,q,p="isMonarch",o="name",n=A.bq(a)
if(n<0){B.a.u($.C,0,"\u274c Player not found")
A.J()
return}for(s=$.d,r=s.length,q=0;q<s.length;s.length===r||(0,A.N)(s),++q)J.S(s[q],p,!1)
s=$.d
if(!(n<s.length))return A.b(s,n)
J.S(s[n],p,!0)
s=$.d
if(!(n<s.length))return A.b(s,n)
s=A.c(J.a(s[n],o))
r=$.d
if(!(n<r.length))return A.b(r,n)
A.w(s+" becomes the Monarch",A.c(J.a(r[n],o))+" is now the Monarch.")
r=$.C
s=$.d
if(!(n<s.length))return A.b(s,n)
B.a.u(r,0,"\u2713 "+A.c(J.a(s[n],o))+" is now the Monarch \ud83d\udc51")
A.D(null)
A.J()},
rY(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f="commanderDamage",e="name",d=" commander damage from ",c=B.b.B(a.toLowerCase()),b=A.aq("takes?\\s+(\\d+)\\s+commander\\s+damage").a6(c)
if(b==null){B.a.u($.C,0,'\u274c Please specify damage amount (e.g., "takes 3 commander damage")')
A.J()
return}s=b.b
if(1>=s.length)return A.b(s,1)
s=s[1]
s.toString
r=A.dh(s)
q=A.bq(a)
if(q<0){B.a.u($.C,0,"\u274c Target player not found")
A.J()
return}p=B.b.aw(c,"from")
o=p>=0?A.bq(B.b.B(B.b.a2(c,p+4))):-1
if(o<0){B.a.u($.C,0,'\u274c Source player not found (use "from [player]")')
A.J()
return}s=$.d
if(!(q<s.length))return A.b(s,q)
n=t.h0.a(J.a(s[q],f))
if(n==null){s=t.S
n=A.Y(s,s)}s=J.j(n)
m=s.h(n,o)
if(m==null)m=0
if(typeof m!=="number")return m.J()
s.k(n,o,m+r)
m=$.d
if(!(q<m.length))return A.b(m,q)
J.S(m[q],f,n)
m=$.d
if(!(q<m.length))return A.b(m,q)
m=A.c(J.a(m[q],e))
l=""+r
k=$.d
if(!(o<k.length))return A.b(k,o)
k=A.c(J.a(k[o],e))
j=A.c(s.h(n,o))
i=$.d
if(!(q<i.length))return A.b(i,q)
i=A.c(J.a(i[q],e))
h=A.c(s.h(n,o))
g=$.d
if(!(o<g.length))return A.b(g,o)
A.w(m+" takes "+l+d+k+" ("+j+")",i+" has taken "+h+" total commander damage from "+A.c(J.a(g[o],e))+".")
A.be(q)
g=$.C
h=$.d
if(!(q<h.length))return A.b(h,q)
h=A.c(J.a(h[q],e))
i=$.d
if(!(o<i.length))return A.b(i,o)
B.a.u(g,0,"\u2713 "+h+" takes "+l+d+A.c(J.a(i[o],e))+" ("+A.c(s.h(n,o))+" total)")
A.D(null)
A.J()},
t6(){if(!A.pu(null)){B.a.u($.C,0,"\u274c No recent action to undo")
A.J()
return}B.a.u($.C,0,"\u2713 Undid last action")
A.J()},
an:function an(a){this.b=a},
jp:function jp(){},
jf:function jf(){},
iS:function iS(){},
iT:function iT(){},
iU:function iU(){},
iV:function iV(){},
iW:function iW(){},
iX:function iX(){},
iR:function iR(){},
iY:function iY(){},
iO:function iO(){},
iP:function iP(){},
iQ:function iQ(){},
iZ:function iZ(){},
j_:function j_(a){this.a=a},
j0:function j0(){},
j1:function j1(){},
jO:function jO(a,b){this.a=a
this.b=b},
jP:function jP(){},
jQ:function jQ(){},
jJ:function jJ(){},
jK:function jK(){},
lk:function lk(){},
ll:function ll(){},
lm:function lm(a){this.a=a},
lo:function lo(){},
lp:function lp(){},
lq:function lq(a){this.a=a},
lr:function lr(a,b){this.a=a
this.b=b},
lj:function lj(a){this.a=a},
ls:function ls(a,b){this.a=a
this.b=b},
li:function li(a){this.a=a},
lt:function lt(a,b,c){this.a=a
this.b=b
this.c=c},
lg:function lg(a){this.a=a},
lh:function lh(a){this.a=a},
lu:function lu(){},
lv:function lv(){},
ln:function ln(){},
j6:function j6(a,b){this.a=a
this.b=b},
j7:function j7(a){this.a=a},
j8:function j8(a){this.a=a},
j5:function j5(a){this.a=a},
jR:function jR(){},
jS:function jS(){},
kO:function kO(){},
kP:function kP(){},
kQ:function kQ(a){this.a=a},
kR:function kR(a){this.a=a},
kS:function kS(a,b){this.a=a
this.b=b},
kT:function kT(a){this.a=a},
kU:function kU(){},
lN:function lN(a){this.a=a},
na:function na(a){this.a=a},
nb:function nb(a){this.a=a},
l5:function l5(){},
nk:function nk(){},
lU:function lU(a){this.a=a},
kj:function kj(){},
kk:function kk(){},
kl:function kl(){},
ku:function ku(){},
kv:function kv(a){this.a=a},
kw:function kw(){},
kx:function kx(a){this.a=a},
ky:function ky(a){this.a=a},
kz:function kz(a,b){this.a=a
this.b=b},
kA:function kA(a){this.a=a},
kB:function kB(a){this.a=a},
km:function km(a,b){this.a=a
this.b=b},
kn:function kn(a){this.a=a},
ko:function ko(a){this.a=a},
kp:function kp(a){this.a=a},
kq:function kq(a){this.a=a},
kr:function kr(a){this.a=a},
ks:function ks(a){this.a=a},
kt:function kt(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
kh:function kh(a,b){this.a=a
this.b=b},
ki:function ki(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
j9:function j9(){},
ja:function ja(){},
jb:function jb(){},
jc:function jc(){},
jd:function jd(){},
je:function je(){},
jh:function jh(a){this.a=a},
ji:function ji(a){this.a=a},
k4:function k4(){},
jm:function jm(a){this.a=a},
jj:function jj(a){this.a=a},
jk:function jk(){},
l7:function l7(a){this.a=a},
lL:function lL(a){this.a=a},
lF:function lF(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
lC:function lC(){},
lD:function lD(a){this.a=a},
lE:function lE(){},
lG:function lG(a,b,c){this.a=a
this.b=b
this.c=c},
lH:function lH(a,b){this.a=a
this.b=b},
lI:function lI(a,b,c){this.a=a
this.b=b
this.c=c},
lJ:function lJ(a){this.a=a},
lK:function lK(a){this.a=a},
ju:function ju(){},
jo:function jo(a){this.a=a},
ml:function ml(a,b){this.a=a
this.b=b},
mm:function mm(a,b,c){this.a=a
this.b=b
this.c=c},
mn:function mn(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
mo:function mo(a){this.a=a},
mp:function mp(a){this.a=a},
lz:function lz(a,b,c){this.a=a
this.b=b
this.c=c},
lA:function lA(a,b,c){this.a=a
this.b=b
this.c=c},
lB:function lB(a,b,c){this.a=a
this.b=b
this.c=c},
lw:function lw(a,b,c){this.a=a
this.b=b
this.c=c},
lx:function lx(a,b,c){this.a=a
this.b=b
this.c=c},
ly:function ly(a){this.a=a},
nj:function nj(a){this.a=a},
nc:function nc(a,b,c){this.a=a
this.b=b
this.c=c},
nd:function nd(a,b,c){this.a=a
this.b=b
this.c=c},
ne:function ne(a,b,c){this.a=a
this.b=b
this.c=c},
nf:function nf(a,b,c){this.a=a
this.b=b
this.c=c},
ng:function ng(a,b,c){this.a=a
this.b=b
this.c=c},
nh:function nh(a){this.a=a},
ni:function ni(a){this.a=a},
n6:function n6(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
n8:function n8(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
n7:function n7(a,b,c){this.a=a
this.b=b
this.c=c},
n9:function n9(a){this.a=a},
m0:function m0(){},
m1:function m1(){},
m2:function m2(a){this.a=a},
m3:function m3(a){this.a=a},
jl:function jl(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
mv:function mv(){},
mw:function mw(a){this.a=a},
mu:function mu(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
mx:function mx(a,b,c){this.a=a
this.b=b
this.c=c},
mt:function mt(a,b,c){this.a=a
this.b=b
this.c=c},
mq:function mq(a,b){this.a=a
this.b=b},
mI:function mI(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
mT:function mT(a,b,c){this.a=a
this.b=b
this.c=c},
n_:function n_(){},
n0:function n0(){},
n1:function n1(){},
n2:function n2(a){this.a=a},
n3:function n3(){},
n4:function n4(){},
my:function my(){},
mz:function mz(a){this.a=a},
mA:function mA(){},
mB:function mB(){},
mC:function mC(){},
mD:function mD(){},
mE:function mE(a){this.a=a},
mF:function mF(a,b){this.a=a
this.b=b},
mG:function mG(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ms:function ms(a){this.a=a},
mH:function mH(a){this.a=a},
mr:function mr(a){this.a=a},
mJ:function mJ(a,b){this.a=a
this.b=b},
mK:function mK(a,b){this.a=a
this.b=b},
mL:function mL(a){this.a=a},
mM:function mM(a){this.a=a},
mN:function mN(a){this.a=a},
mO:function mO(a){this.a=a},
mP:function mP(a){this.a=a},
mQ:function mQ(a){this.a=a},
mR:function mR(a){this.a=a},
mS:function mS(a){this.a=a},
mU:function mU(a){this.a=a},
mV:function mV(a){this.a=a},
n5:function n5(a,b,c){this.a=a
this.b=b
this.c=c},
mW:function mW(a){this.a=a},
mX:function mX(a){this.a=a},
mY:function mY(a){this.a=a},
mZ:function mZ(a){this.a=a},
kf:function kf(a){this.a=a},
m_:function m_(a,b,c){this.a=a
this.b=b
this.c=c},
lW:function lW(a){this.a=a},
lX:function lX(a){this.a=a},
lY:function lY(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
lV:function lV(){},
lZ:function lZ(a){this.a=a},
ld:function ld(a,b,c){this.a=a
this.b=b
this.c=c},
l9:function l9(a){this.a=a},
la:function la(a){this.a=a},
lb:function lb(a,b,c,d,e,f,g,h,i,j){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i
_.y=j},
l8:function l8(){},
lc:function lc(a){this.a=a},
lS:function lS(a){this.a=a},
lT:function lT(a){this.a=a},
le:function le(a){this.a=a},
lf:function lf(a){this.a=a},
lO:function lO(){},
lP:function lP(){},
lQ:function lQ(){},
lR:function lR(){},
m4:function m4(){},
m5:function m5(){},
m6:function m6(){},
mc:function mc(){},
md:function md(){},
me:function me(){},
mf:function mf(){},
mg:function mg(){},
mh:function mh(a){this.a=a},
mi:function mi(a){this.a=a},
mj:function mj(a){this.a=a},
m7:function m7(a){this.a=a},
m8:function m8(){},
m9:function m9(){},
ma:function ma(a){this.a=a},
mb:function mb(){},
jG:function jG(){},
jH:function jH(){},
jE:function jE(){},
jF:function jF(){},
k2:function k2(){},
jM:function jM(){},
jN:function jN(){},
kN:function kN(){},
kH:function kH(a,b,c){this.a=a
this.b=b
this.c=c},
kI:function kI(a,b,c){this.a=a
this.b=b
this.c=c},
kJ:function kJ(a){this.a=a},
kK:function kK(a,b){this.a=a
this.b=b},
kL:function kL(a,b){this.a=a
this.b=b},
kM:function kM(){},
kC:function kC(a,b){this.a=a
this.b=b},
kD:function kD(a){this.a=a},
kE:function kE(a,b){this.a=a
this.b=b},
kF:function kF(a){this.a=a},
kG:function kG(a,b,c){this.a=a
this.b=b
this.c=c},
k_:function k_(){},
jZ:function jZ(a){this.a=a},
k0:function k0(){},
jY:function jY(){},
jW:function jW(a){this.a=a},
jV:function jV(a){this.a=a},
jX:function jX(){},
k5:function k5(){},
jv:function jv(a){this.a=a},
jw:function jw(a){this.a=a},
l0:function l0(){},
l1:function l1(){},
l2:function l2(){},
l3:function l3(){},
k3:function k3(){},
jI:function jI(){},
k8:function k8(){},
jC:function jC(){},
jx:function jx(a){this.a=a},
jy:function jy(){},
jz:function jz(a){this.a=a},
jA:function jA(){},
jB:function jB(){},
pI(a){return t.fK.b(a)||t.B.b(a)||t.dz.b(a)||t.gb.b(a)||t.A.b(a)||t.g4.b(a)||t.g2.b(a)},
uq(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)},
uE(a){return A.a5(new A.fd("Field '"+a+"' has been assigned during initialization."))}},J={
o9(a,b,c,d){return{i:a,p:b,e:c,x:d}},
hg(a){var s,r,q,p,o,n=a[v.dispatchPropertyName]
if(n==null)if($.o8==null){A.ug()
n=a[v.dispatchPropertyName]}if(n!=null){s=n.p
if(!1===s)return n.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return n.i
if(n.e===r)throw A.e(A.nI("Return interceptor for "+A.c(s(a,n))))}q=a.constructor
if(q==null)p=null
else{o=$.iw
if(o==null)o=$.iw=v.getIsolateTag("_$dart_js")
p=q[o]}if(p!=null)return p
p=A.un(a)
if(p!=null)return p
if(typeof a=="function")return B.af
s=Object.getPrototypeOf(a)
if(s==null)return B.T
if(s===Object.prototype)return B.T
if(typeof q=="function"){o=$.iw
if(o==null)o=$.iw=v.getIsolateTag("_$dart_js")
Object.defineProperty(q,o,{value:B.I,enumerable:false,writable:true,configurable:true})
return B.I}return B.I},
oA(a,b){if(a<0||a>4294967295)throw A.e(A.ab(a,0,4294967295,"length",null))
return J.qL(new Array(a),b)},
nv(a,b){if(a<0)throw A.e(A.bv("Length must be a non-negative integer: "+a,null))
return A.o(new Array(a),b.i("a3<0>"))},
oz(a,b){if(a<0)throw A.e(A.bv("Length must be a non-negative integer: "+A.c(a),null))
return A.o(new Array(a),b.i("a3<0>"))},
qL(a,b){return J.hH(A.o(a,b.i("a3<0>")),b)},
hH(a,b){a.fixed$length=Array
return a},
qM(a,b){var s=t.e8
return J.og(s.a(a),s.a(b))},
oB(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
qN(a,b){var s,r
for(s=a.length;b<s;){r=B.b.aj(a,b)
if(r!==32&&r!==13&&!J.oB(r))break;++b}return b},
qO(a,b){var s,r
for(;b>0;b=s){s=b-1
r=B.b.ak(a,s)
if(r!==32&&r!==13&&!J.oB(r))break}return b},
ca(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.dH.prototype
return J.f7.prototype}if(typeof a=="string")return J.bA.prototype
if(a==null)return J.dI.prototype
if(typeof a=="boolean")return J.f5.prototype
if(a.constructor==Array)return J.a3.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bj.prototype
return a}if(a instanceof A.B)return a
return J.hg(a)},
ua(a){if(typeof a=="number")return J.bT.prototype
if(typeof a=="string")return J.bA.prototype
if(a==null)return a
if(a.constructor==Array)return J.a3.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bj.prototype
return a}if(a instanceof A.B)return a
return J.hg(a)},
j(a){if(typeof a=="string")return J.bA.prototype
if(a==null)return a
if(a.constructor==Array)return J.a3.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bj.prototype
return a}if(a instanceof A.B)return a
return J.hg(a)},
a0(a){if(a==null)return a
if(a.constructor==Array)return J.a3.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bj.prototype
return a}if(a instanceof A.B)return a
return J.hg(a)},
kW(a){if(typeof a=="number")return J.bT.prototype
if(a==null)return a
if(!(a instanceof A.B))return J.bY.prototype
return a},
ub(a){if(typeof a=="number")return J.bT.prototype
if(typeof a=="string")return J.bA.prototype
if(a==null)return a
if(!(a instanceof A.B))return J.bY.prototype
return a},
eJ(a){if(typeof a=="string")return J.bA.prototype
if(a==null)return a
if(!(a instanceof A.B))return J.bY.prototype
return a},
aK(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.bj.prototype
return a}if(a instanceof A.B)return a
return J.hg(a)},
aZ(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.ua(a).J(a,b)},
q(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.ca(a).a0(a,b)},
qa(a,b){if(typeof a=="number"&&typeof b=="number")return a>=b
return J.kW(a).b1(a,b)},
nl(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.kW(a).S(a,b)},
qb(a,b){if(typeof a=="number"&&typeof b=="number")return a<=b
return J.kW(a).b2(a,b)},
dj(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.kW(a).aB(a,b)},
a(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||A.uk(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.j(a).h(a,b)},
S(a,b,c){return J.a0(a).k(a,b,c)},
qc(a,b,c,d){return J.aK(a).cJ(a,b,c,d)},
hl(a){return J.aK(a).a3(a)},
qd(a,b,c){return J.aK(a).cZ(a,b,c)},
F(a,b){return J.a0(a).q(a,b)},
qe(a,b){return J.eJ(a).aW(a,b)},
qf(a,b){return J.a0(a).Y(a,b)},
qg(a,b){return J.aK(a).da(a,b)},
eO(a,b){return J.a0(a).aX(a,b)},
qh(a){return J.a0(a).C(a)},
og(a,b){return J.ub(a).a5(a,b)},
b1(a,b){return J.j(a).l(a,b)},
dk(a,b){return J.a0(a).G(a,b)},
dl(a,b){return J.a0(a).K(a,b)},
qi(a){return J.aK(a).gdc(a)},
qj(a){return J.aK(a).gc1(a)},
eP(a){return J.ca(a).gL(a)},
hm(a){return J.j(a).gE(a)},
hn(a){return J.j(a).gP(a)},
T(a){return J.a0(a).gv(a)},
qk(a){return J.aK(a).gO(a)},
W(a){return J.j(a).gm(a)},
nm(a){return J.aK(a).gaf(a)},
ql(a,b,c){return J.aK(a).dq(a,b,c)},
ho(a,b){return J.a0(a).V(a,b)},
b2(a,b,c){return J.a0(a).aL(a,b,c)},
dm(a,b,c,d){return J.a0(a).aM(a,b,c,d)},
qm(a,b){return J.ca(a).cc(a,b)},
eQ(a){return J.a0(a).D(a)},
eR(a,b){return J.a0(a).H(a,b)},
oh(a,b){return J.a0(a).ao(a,b)},
qn(a,b){return J.aK(a).dA(a,b)},
qo(a,b){return J.aK(a).scT(a,b)},
qp(a,b){return J.j(a).sm(a,b)},
eS(a,b){return J.aK(a).sj(a,b)},
qq(a,b){return J.aK(a).sdI(a,b)},
qr(a,b,c,d,e){return J.a0(a).N(a,b,c,d,e)},
hp(a,b){return J.a0(a).a9(a,b)},
qs(a,b){return J.a0(a).a1(a,b)},
qt(a,b){return J.eJ(a).ai(a,b)},
qu(a,b,c){return J.eJ(a).F(a,b,c)},
oi(a,b){return J.a0(a).a7(a,b)},
qv(a){return J.eJ(a).dG(a)},
m(a){return J.ca(a).p(a)},
cJ(a){return J.eJ(a).B(a)},
qw(a,b){return J.aK(a).aP(a,b)},
hq(a,b){return J.a0(a).a8(a,b)},
oj(a,b){return J.a0(a).ci(a,b)},
dF:function dF(){},
f5:function f5(){},
dI:function dI(){},
aR:function aR(){},
cn:function cn(){},
fo:function fo(){},
bY:function bY(){},
bj:function bj(){},
a3:function a3(a){this.$ti=a},
hI:function hI(a){this.$ti=a},
b4:function b4(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
bT:function bT(){},
dH:function dH(){},
f7:function f7(){},
bA:function bA(){}},B={}
var w=[A,J,B]
var $={}
A.nx.prototype={}
J.dF.prototype={
a0(a,b){return a===b},
gL(a){return A.fp(a)},
p(a){return"Instance of '"+A.hW(a)+"'"},
cc(a,b){t.c4.a(b)
throw A.e(A.oG(a,b.gca(),b.gcd(),b.gcb()))}}
J.f5.prototype={
p(a){return String(a)},
gL(a){return a?519018:218159},
$iy:1}
J.dI.prototype={
a0(a,b){return null==b},
p(a){return"null"},
gL(a){return 0},
$iah:1}
J.aR.prototype={}
J.cn.prototype={
gL(a){return 0},
p(a){return String(a)}}
J.fo.prototype={}
J.bY.prototype={}
J.bj.prototype={
p(a){var s=a[$.hj()]
if(s==null)return this.cz(a)
return"JavaScript function for "+A.c(J.m(s))},
$icl:1}
J.a3.prototype={
aX(a,b){return new A.bw(a,A.L(a).i("@<1>").A(b).i("bw<1,2>"))},
q(a,b){A.L(a).c.a(b)
if(!!a.fixed$length)A.a5(A.K("add"))
a.push(b)},
bs(a,b){var s
if(!!a.fixed$length)A.a5(A.K("removeAt"))
s=a.length
if(b>=s)throw A.e(A.hX(b,null))
return a.splice(b,1)[0]},
u(a,b,c){var s
A.L(a).c.a(c)
if(!!a.fixed$length)A.a5(A.K("insert"))
s=a.length
if(b>s)throw A.e(A.hX(b,null))
a.splice(b,0,c)},
H(a,b){var s
if(!!a.fixed$length)A.a5(A.K("remove"))
for(s=0;s<a.length;++s)if(J.q(a[s],b)){a.splice(s,1)
return!0}return!1},
ao(a,b){A.L(a).i("y(1)").a(b)
if(!!a.fixed$length)A.a5(A.K("removeWhere"))
this.bV(a,b,!0)},
bV(a,b,c){var s,r,q,p,o
A.L(a).i("y(1)").a(b)
s=[]
r=a.length
for(q=0;q<r;++q){p=a[q]
if(!A.am(b.$1(p)))s.push(p)
if(a.length!==r)throw A.e(A.a9(a))}o=s.length
if(o===r)return
this.sm(a,o)
for(q=0;q<s.length;++q)a[q]=s[q]},
a8(a,b){var s=A.L(a)
return new A.a_(a,s.i("y(1)").a(b),s.i("a_<1>"))},
T(a,b){var s
A.L(a).i("k<1>").a(b)
if(!!a.fixed$length)A.a5(A.K("addAll"))
if(Array.isArray(b)){this.cI(a,b)
return}for(s=J.T(b);s.n();)a.push(s.gt())},
cI(a,b){var s,r
t.o.a(b)
s=b.length
if(s===0)return
if(a===b)throw A.e(A.a9(a))
for(r=0;r<s;++r)a.push(b[r])},
C(a){if(!!a.fixed$length)A.a5(A.K("clear"))
a.length=0},
K(a,b){var s,r
A.L(a).i("~(1)").a(b)
s=a.length
for(r=0;r<s;++r){b.$1(a[r])
if(a.length!==s)throw A.e(A.a9(a))}},
aL(a,b,c){var s=A.L(a)
return new A.R(a,s.A(c).i("1(2)").a(b),s.i("@<1>").A(c).i("R<1,2>"))},
V(a,b){var s,r=A.cT(a.length,"",!1,t.N)
for(s=0;s<a.length;++s)this.k(r,s,A.c(a[s]))
return r.join(b)},
a7(a,b){return A.aO(a,0,A.az(b,"count",t.S),A.L(a).c)},
a9(a,b){return A.aO(a,b,null,A.L(a).c)},
Z(a,b){var s,r,q
A.L(a).i("1(1,1)").a(b)
s=a.length
if(s===0)throw A.e(A.bz())
if(0>=s)return A.b(a,0)
r=a[0]
for(q=1;q<s;++q){r=b.$2(r,a[q])
if(s!==a.length)throw A.e(A.a9(a))}return r},
c5(a,b,c,d){var s,r,q
d.a(b)
A.L(a).A(d).i("1(1,2)").a(c)
s=a.length
for(r=b,q=0;q<s;++q){r=c.$2(r,a[q])
if(a.length!==s)throw A.e(A.a9(a))}return r},
an(a,b,c){var s,r,q,p=A.L(a)
p.i("y(1)").a(b)
p.i("1()?").a(c)
s=a.length
for(r=0;r<s;++r){q=a[r]
if(A.am(b.$1(q)))return q
if(a.length!==s)throw A.e(A.a9(a))}if(c!=null)return c.$0()
throw A.e(A.bz())},
dk(a,b){return this.an(a,b,null)},
G(a,b){if(!(b>=0&&b<a.length))return A.b(a,b)
return a[b]},
gam(a){if(a.length>0)return a[0]
throw A.e(A.bz())},
gaK(a){var s=a.length
if(s>0)return a[s-1]
throw A.e(A.bz())},
N(a,b,c,d,e){var s,r,q,p
A.L(a).i("k<1>").a(d)
if(!!a.immutable$list)A.a5(A.K("setRange"))
A.hY(b,c,a.length)
s=c-b
if(s===0)return
A.aN(e,"skipCount")
r=A.x(d)
r=A.cN(J.hp(d.a,e),r.c,r.z[1])
q=A.a8(r,!1,A.x(r).i("k.E"))
if(s>q.length)throw A.e(A.oy())
if(0<b)for(p=s-1;p>=0;--p){if(!(p>=0&&p<q.length))return A.b(q,p)
a[b+p]=q[p]}else for(p=0;p<s;++p){if(!(p>=0&&p<q.length))return A.b(q,p)
a[b+p]=q[p]}},
Y(a,b){var s,r
A.L(a).i("y(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(A.am(b.$1(a[r])))return!0
if(a.length!==s)throw A.e(A.a9(a))}return!1},
c4(a,b){var s,r
A.L(a).i("y(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(!A.am(b.$1(a[r])))return!1
if(a.length!==s)throw A.e(A.a9(a))}return!0},
a1(a,b){var s,r=A.L(a)
r.i("f(1,1)?").a(b)
if(!!a.immutable$list)A.a5(A.K("sort"))
s=b==null?J.tk():b
A.oR(a,s,r.c)},
cp(a){return this.a1(a,null)},
l(a,b){var s
for(s=0;s<a.length;++s)if(J.q(a[s],b))return!0
return!1},
gE(a){return a.length===0},
gP(a){return a.length!==0},
p(a){return A.nu(a,"[","]")},
gv(a){return new J.b4(a,a.length,A.L(a).i("b4<1>"))},
gL(a){return A.fp(a)},
gm(a){return a.length},
sm(a,b){if(!!a.fixed$length)A.a5(A.K("set length"))
if(b<0)throw A.e(A.ab(b,0,null,"newLength",null))
if(b>a.length)A.L(a).c.a(null)
a.length=b},
h(a,b){A.i(b)
if(!(b>=0&&b<a.length))throw A.e(A.cG(a,b))
return a[b]},
k(a,b,c){A.i(b)
A.L(a).c.a(c)
if(!!a.immutable$list)A.a5(A.K("indexed set"))
if(!(b>=0&&b<a.length))throw A.e(A.cG(a,b))
a[b]=c},
ci(a,b){return new A.cy(a,b.i("cy<0>"))},
J(a,b){var s=A.L(a)
s.i("I<1>").a(b)
s=A.a8(a,!0,s.c)
this.T(s,b)
return s},
$iA:1,
$ik:1,
$iI:1}
J.hI.prototype={}
J.b4.prototype={
gt(){var s=this.d
return s==null?this.$ti.c.a(s):s},
n(){var s,r=this,q=r.a,p=q.length
if(r.b!==p)throw A.e(A.N(q))
s=r.c
if(s>=p){r.sbQ(null)
return!1}r.sbQ(q[s]);++r.c
return!0},
sbQ(a){this.d=this.$ti.i("1?").a(a)},
$iZ:1}
J.bT.prototype={
a5(a,b){var s
A.bE(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=this.gb_(b)
if(this.gb_(a)===s)return 0
if(this.gb_(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gb_(a){return a===0?1/a<0:a<0},
R(a){var s
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){s=a<0?Math.ceil(a):Math.floor(a)
return s+0}throw A.e(A.K(""+a+".toInt()"))},
dl(a){var s,r
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){s=a|0
return a===s?s:s-1}r=Math.floor(a)
if(isFinite(r))return r
throw A.e(A.K(""+a+".floor()"))},
aO(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw A.e(A.K(""+a+".round()"))},
a4(a,b,c){if(B.f.a5(b,c)>0)throw A.e(A.pz(b))
if(this.a5(a,b)<0)return b
if(this.a5(a,c)>0)return c
return a},
bw(a,b){var s
if(b>20)throw A.e(A.ab(b,0,20,"fractionDigits",null))
s=a.toFixed(b)
if(a===0&&this.gb_(a))return"-"+s
return s},
p(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gL(a){var s,r,q,p,o=a|0
if(a===o)return o&536870911
s=Math.abs(a)
r=Math.log(s)/0.6931471805599453|0
q=Math.pow(2,r)
p=s<1?s/q:q/s
return((p*9007199254740992|0)+(p*3542243181176521|0))*599197+r*1259&536870911},
J(a,b){return a+b},
aB(a,b){return a-b},
az(a,b){var s=a%b
if(s===0)return 0
if(s>0)return s
return s+b},
cC(a,b){if((a|0)===a)if(b>=1||b<-1)return a/b|0
return this.bX(a,b)},
W(a,b){return(a|0)===a?a/b|0:this.bX(a,b)},
bX(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.e(A.K("Result of truncating division is "+A.c(s)+": "+A.c(a)+" ~/ "+b))},
bj(a,b){var s
if(a>0)s=this.d5(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
d5(a,b){return b>31?0:a>>>b},
S(a,b){return a>b},
b2(a,b){return a<=b},
b1(a,b){return a>=b},
$iaP:1,
$iaJ:1,
$iar:1}
J.dH.prototype={$if:1}
J.f7.prototype={}
J.bA.prototype={
ak(a,b){if(b<0)throw A.e(A.cG(a,b))
if(b>=a.length)A.a5(A.cG(a,b))
return a.charCodeAt(b)},
aj(a,b){if(b>=a.length)throw A.e(A.cG(a,b))
return a.charCodeAt(b)},
aW(a,b){return new A.h0(b,a,0)},
J(a,b){A.n(b)
return a+b},
U(a,b){var s=b.length,r=a.length
if(s>r)return!1
return b===this.a2(a,r-s)},
aA(a,b){if(typeof b=="string")return A.o(a.split(b),t.s)
else if(b instanceof A.dJ&&b.gcV().exec("").length-2===0)return A.o(a.split(b.b),t.s)
else return this.cO(a,b)},
cO(a,b){var s,r,q,p,o,n,m=A.o([],t.s)
for(s=J.qe(b,a),s=s.gv(s),r=0,q=1;s.n();){p=s.gt()
o=p.gbA(p)
n=p.gbq()
q=n-o
if(q===0&&r===o)continue
B.a.q(m,this.F(a,r,o))
r=n}if(r<a.length||q>0)B.a.q(m,this.a2(a,r))
return m},
ai(a,b){var s=b.length
if(s>a.length)return!1
return b===a.substring(0,s)},
F(a,b,c){A.aT(c)
return a.substring(b,A.hY(b,c,a.length))},
a2(a,b){return this.F(a,b,null)},
dG(a){return a.toLowerCase()},
B(a){var s,r,q,p=a.trim(),o=p.length
if(o===0)return p
if(this.aj(p,0)===133){s=J.qN(p,1)
if(s===o)return""}else s=0
r=o-1
q=this.ak(p,r)===133?J.qO(p,r):o
if(s===0&&q===o)return p
return p.substring(s,q)},
cn(a,b){var s,r
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw A.e(B.a2)
for(s=a,r="";!0;){if((b&1)===1)r=s+r
b=b>>>1
if(b===0)break
s+=s}return r},
aN(a,b,c){var s=b-a.length
if(s<=0)return a
return this.cn(c,s)+a},
aw(a,b){var s=a.indexOf(b,0)
return s},
aZ(a,b,c){var s=a.length
if(c>s)throw A.e(A.ab(c,0,s,null,null))
return A.ay(a,b,c)},
l(a,b){return this.aZ(a,b,0)},
a5(a,b){var s
A.n(b)
if(a===b)s=0
else s=a<b?-1:1
return s},
p(a){return a},
gL(a){var s,r,q
for(s=a.length,r=0,q=0;q<s;++q){r=r+a.charCodeAt(q)&536870911
r=r+((r&524287)<<10)&536870911
r^=r>>6}r=r+((r&67108863)<<3)&536870911
r^=r>>11
return r+((r&16383)<<15)&536870911},
gm(a){return a.length},
h(a,b){A.i(b)
if(!(b>=0&&b<a.length))throw A.e(A.cG(a,b))
return a[b]},
$iaP:1,
$ihU:1,
$ih:1}
A.c_.prototype={
gv(a){var s=A.x(this)
return new A.dq(J.T(this.gaa()),s.i("@<1>").A(s.z[1]).i("dq<1,2>"))},
gm(a){return J.W(this.gaa())},
gE(a){return J.hm(this.gaa())},
gP(a){return J.hn(this.gaa())},
a9(a,b){var s=A.x(this)
return A.cN(J.hp(this.gaa(),b),s.c,s.z[1])},
a7(a,b){var s=A.x(this)
return A.cN(J.oi(this.gaa(),b),s.c,s.z[1])},
G(a,b){return A.x(this).z[1].a(J.dk(this.gaa(),b))},
l(a,b){return J.b1(this.gaa(),b)},
p(a){return J.m(this.gaa())}}
A.dq.prototype={
n(){return this.a.n()},
gt(){return this.$ti.z[1].a(this.a.gt())},
$iZ:1}
A.cf.prototype={
gaa(){return this.a}}
A.ee.prototype={$iA:1}
A.ea.prototype={
h(a,b){return this.$ti.z[1].a(J.a(this.a,A.i(b)))},
k(a,b,c){var s=this.$ti
J.S(this.a,A.i(b),s.c.a(s.z[1].a(c)))},
sm(a,b){J.qp(this.a,b)},
q(a,b){var s=this.$ti
J.F(this.a,s.c.a(s.z[1].a(b)))},
a1(a,b){var s
this.$ti.i("f(2,2)?").a(b)
s=b==null?null:new A.ic(this,b)
J.qs(this.a,s)},
H(a,b){return J.eR(this.a,b)},
ao(a,b){J.oh(this.a,new A.ib(this,this.$ti.i("y(2)").a(b)))},
N(a,b,c,d,e){var s=this.$ti
J.qr(this.a,b,c,A.cN(s.i("k<2>").a(d),s.z[1],s.c),e)},
ae(a,b,c,d){return this.N(a,b,c,d,0)},
$iA:1,
$iI:1}
A.ic.prototype={
$2(a,b){var s=this.a.$ti,r=s.c
r.a(a)
r.a(b)
s=s.z[1]
return this.b.$2(s.a(a),s.a(b))},
$S(){return this.a.$ti.i("f(1,1)")}}
A.ib.prototype={
$1(a){var s=this.a.$ti
return this.b.$1(s.z[1].a(s.c.a(a)))},
$S(){return this.a.$ti.i("y(1)")}}
A.bw.prototype={
aX(a,b){return new A.bw(this.a,this.$ti.i("@<1>").A(b).i("bw<1,2>"))},
gaa(){return this.a}}
A.fd.prototype={
p(a){return"LateInitializationError: "+this.a}}
A.hZ.prototype={}
A.A.prototype={}
A.Q.prototype={
gv(a){var s=this
return new A.aF(s,s.gm(s),A.x(s).i("aF<Q.E>"))},
gE(a){return this.gm(this)===0},
l(a,b){var s,r=this,q=r.gm(r)
for(s=0;s<q;++s){if(J.q(r.G(0,s),b))return!0
if(q!==r.gm(r))throw A.e(A.a9(r))}return!1},
V(a,b){var s,r,q,p=this,o=p.gm(p)
if(b.length!==0){if(o===0)return""
s=A.c(p.G(0,0))
if(o!==p.gm(p))throw A.e(A.a9(p))
for(r=s,q=1;q<o;++q){r=r+b+A.c(p.G(0,q))
if(o!==p.gm(p))throw A.e(A.a9(p))}return r.charCodeAt(0)==0?r:r}else{for(q=0,r="";q<o;++q){r+=A.c(p.G(0,q))
if(o!==p.gm(p))throw A.e(A.a9(p))}return r.charCodeAt(0)==0?r:r}},
a8(a,b){return this.cr(0,A.x(this).i("y(Q.E)").a(b))},
aL(a,b,c){var s=A.x(this)
return new A.R(this,s.A(c).i("1(Q.E)").a(b),s.i("@<Q.E>").A(c).i("R<1,2>"))},
Z(a,b){var s,r,q,p=this
A.x(p).i("Q.E(Q.E,Q.E)").a(b)
s=p.gm(p)
if(s===0)throw A.e(A.bz())
r=p.G(0,0)
for(q=1;q<s;++q){r=b.$2(r,p.G(0,q))
if(s!==p.gm(p))throw A.e(A.a9(p))}return r},
a9(a,b){return A.aO(this,b,null,A.x(this).i("Q.E"))},
a7(a,b){return A.aO(this,0,A.az(b,"count",t.S),A.x(this).i("Q.E"))},
ah(a,b){return A.a8(this,!0,A.x(this).i("Q.E"))},
a_(a){return this.ah(a,!0)},
dH(a){var s,r=this,q=A.fe(A.x(r).i("Q.E"))
for(s=0;s<r.gm(r);++s)q.q(0,r.G(0,s))
return q}}
A.e3.prototype={
gcP(){var s=J.W(this.a),r=this.c
if(r==null||r>s)return s
return r},
gd6(){var s=J.W(this.a),r=this.b
if(r>s)return s
return r},
gm(a){var s,r=J.W(this.a),q=this.b
if(q>=r)return 0
s=this.c
if(s==null||s>=r)return r-q
if(typeof s!=="number")return s.aB()
return s-q},
G(a,b){var s=this,r=s.gd6()+b
if(b<0||r>=s.gcP())throw A.e(A.cS(b,s,"index",null,null))
return J.dk(s.a,r)},
a9(a,b){var s,r,q=this
A.aN(b,"count")
s=q.b+b
r=q.c
if(r!=null&&s>=r)return new A.dx(q.$ti.i("dx<1>"))
return A.aO(q.a,s,r,q.$ti.c)},
a7(a,b){var s,r,q,p=this
A.aN(b,"count")
s=p.c
r=p.b
q=r+b
if(s==null)return A.aO(p.a,r,q,p.$ti.c)
else{if(s<q)return p
return A.aO(p.a,r,q,p.$ti.c)}},
ah(a,b){var s,r,q,p=this,o=p.b,n=p.a,m=J.j(n),l=m.gm(n),k=p.c
if(k!=null&&k<l)l=k
s=l-o
if(s<=0){n=p.$ti.c
return b?J.nv(0,n):J.oA(0,n)}r=A.cT(s,m.G(n,o),b,p.$ti.c)
for(q=1;q<s;++q){B.a.k(r,q,m.G(n,o+q))
if(m.gm(n)<l)throw A.e(A.a9(p))}return r},
a_(a){return this.ah(a,!0)}}
A.aF.prototype={
gt(){var s=this.d
return s==null?this.$ti.c.a(s):s},
n(){var s,r=this,q=r.a,p=J.j(q),o=p.gm(q)
if(r.b!==o)throw A.e(A.a9(q))
s=r.c
if(s>=o){r.saC(null)
return!1}r.saC(p.G(q,s));++r.c
return!0},
saC(a){this.d=this.$ti.i("1?").a(a)},
$iZ:1}
A.bB.prototype={
gv(a){var s=A.x(this)
return new A.dQ(J.T(this.a),this.b,s.i("@<1>").A(s.z[1]).i("dQ<1,2>"))},
gm(a){return J.W(this.a)},
gE(a){return J.hm(this.a)},
G(a,b){return this.b.$1(J.dk(this.a,b))}}
A.du.prototype={$iA:1}
A.dQ.prototype={
n(){var s=this,r=s.b
if(r.n()){s.saC(s.c.$1(r.gt()))
return!0}s.saC(null)
return!1},
gt(){var s=this.a
return s==null?this.$ti.z[1].a(s):s},
saC(a){this.a=this.$ti.i("2?").a(a)}}
A.R.prototype={
gm(a){return J.W(this.a)},
G(a,b){return this.b.$1(J.dk(this.a,b))}}
A.a_.prototype={
gv(a){return new A.cx(J.T(this.a),this.b,this.$ti.i("cx<1>"))}}
A.cx.prototype={
n(){var s,r
for(s=this.a,r=this.b;s.n();)if(A.am(r.$1(s.gt())))return!0
return!1},
gt(){return this.a.gt()}}
A.cw.prototype={
gv(a){return new A.e5(J.T(this.a),this.b,A.x(this).i("e5<1>"))}}
A.dv.prototype={
gm(a){var s=J.W(this.a),r=this.b
if(s>r)return r
return s},
$iA:1}
A.e5.prototype={
n(){if(--this.b>=0)return this.a.n()
this.b=-1
return!1},
gt(){if(this.b<0){this.$ti.c.a(null)
return null}return this.a.gt()}}
A.bC.prototype={
a9(a,b){A.eU(b,"count",t.S)
A.aN(b,"count")
return new A.bC(this.a,this.b+b,A.x(this).i("bC<1>"))},
gv(a){return new A.e_(J.T(this.a),this.b,A.x(this).i("e_<1>"))}}
A.cQ.prototype={
gm(a){var s=J.W(this.a)-this.b
if(s>=0)return s
return 0},
a9(a,b){A.eU(b,"count",t.S)
A.aN(b,"count")
return new A.cQ(this.a,this.b+b,this.$ti)},
$iA:1}
A.e_.prototype={
n(){var s,r
for(s=this.a,r=0;r<this.b;++r)s.n()
this.b=0
return s.n()},
gt(){return this.a.gt()}}
A.dx.prototype={
gv(a){return B.W},
gE(a){return!0},
gm(a){return 0},
G(a,b){throw A.e(A.ab(b,0,0,"index",null))},
l(a,b){return!1},
a9(a,b){A.aN(b,"count")
return this},
a7(a,b){A.aN(b,"count")
return this}}
A.dy.prototype={
n(){return!1},
gt(){throw A.e(A.bz())},
$iZ:1}
A.cy.prototype={
gv(a){return new A.e8(J.T(this.a),this.$ti.i("e8<1>"))}}
A.e8.prototype={
n(){var s,r
for(s=this.a,r=this.$ti.c;s.n();)if(r.b(s.gt()))return!0
return!1},
gt(){return this.$ti.c.a(this.a.gt())},
$iZ:1}
A.aa.prototype={
sm(a,b){throw A.e(A.K("Cannot change the length of a fixed-length list"))},
q(a,b){A.P(a).i("aa.E").a(b)
throw A.e(A.K("Cannot add to a fixed-length list"))},
H(a,b){throw A.e(A.K("Cannot remove from a fixed-length list"))},
ao(a,b){A.P(a).i("y(aa.E)").a(b)
throw A.e(A.K("Cannot remove from a fixed-length list"))},
C(a){throw A.e(A.K("Cannot clear a fixed-length list"))}}
A.bk.prototype={
gm(a){return J.W(this.a)},
G(a,b){var s=this.a,r=J.j(s)
return r.G(s,r.gm(s)-1-b)}}
A.cY.prototype={
gL(a){var s=this._hashCode
if(s!=null)return s
s=664597*J.eP(this.a)&536870911
this._hashCode=s
return s},
p(a){return'Symbol("'+A.c(this.a)+'")'},
a0(a,b){if(b==null)return!1
return b instanceof A.cY&&this.a==b.a},
$icv:1}
A.eB.prototype={}
A.ds.prototype={}
A.dr.prototype={
gE(a){return this.gm(this)===0},
p(a){return A.hM(this)},
k(a,b,c){var s=A.x(this)
s.c.a(b)
s.z[1].a(c)
A.no()},
H(a,b){A.no()},
aM(a,b,c,d){var s=A.Y(c,d)
this.K(0,new A.ht(this,A.x(this).A(c).A(d).i("U<1,2>(3,4)").a(b),s))
return s},
aP(a,b){A.x(this).i("2(1,2)").a(b)
A.no()},
$iz:1}
A.ht.prototype={
$2(a,b){var s=A.x(this.a),r=this.b.$2(s.c.a(a),s.z[1].a(b))
this.c.k(0,r.a,r.b)},
$S(){return A.x(this.a).i("~(1,2)")}}
A.ao.prototype={
gm(a){return this.a},
M(a,b){if(typeof b!="string")return!1
if("__proto__"===b)return!1
return this.b.hasOwnProperty(b)},
h(a,b){if(!this.M(0,b))return null
return this.b[A.n(b)]},
K(a,b){var s,r,q,p,o,n=this.$ti
n.i("~(1,2)").a(b)
s=this.c
for(r=s.length,q=this.b,n=n.z[1],p=0;p<r;++p){o=A.n(s[p])
b.$2(o,n.a(q[o]))}},
gaf(a){var s=this.$ti
return A.hP(this.c,new A.hu(this),s.c,s.z[1])}}
A.hu.prototype={
$1(a){var s=this.a,r=s.$ti
return r.z[1].a(s.b[A.n(r.c.a(a))])},
$S(){return this.a.$ti.i("2(1)")}}
A.f6.prototype={
gca(){var s=this.a
return s},
gcd(){var s,r,q,p,o=this
if(o.c===1)return B.n
s=o.d
r=s.length-o.e.length-o.f
if(r===0)return B.n
q=[]
for(p=0;p<r;++p){if(!(p<s.length))return A.b(s,p)
q.push(s[p])}q.fixed$length=Array
q.immutable$list=Array
return q},
gcb(){var s,r,q,p,o,n,m,l,k=this
if(k.c!==0)return B.R
s=k.e
r=s.length
q=k.d
p=q.length-r-k.f
if(r===0)return B.R
o=new A.aL(t.eo)
for(n=0;n<r;++n){if(!(n<s.length))return A.b(s,n)
m=s[n]
l=p+n
if(!(l>=0&&l<q.length))return A.b(q,l)
o.k(0,new A.cY(m),q[l])}return new A.ds(o,t.gF)},
$iox:1}
A.hV.prototype={
$2(a,b){var s
A.n(a)
s=this.a
s.b=s.b+"$"+a
B.a.q(this.b,a)
B.a.q(this.c,b);++s.a},
$S:25}
A.i4.prototype={
ac(a){var s,r,q=this,p=new RegExp(q.a).exec(a)
if(p==null)return null
s=Object.create(null)
r=q.b
if(r!==-1)s.arguments=p[r+1]
r=q.c
if(r!==-1)s.argumentsExpr=p[r+1]
r=q.d
if(r!==-1)s.expr=p[r+1]
r=q.e
if(r!==-1)s.method=p[r+1]
r=q.f
if(r!==-1)s.receiver=p[r+1]
return s}}
A.dU.prototype={
p(a){var s=this.b
if(s==null)return"NoSuchMethodError: "+this.a
return"NoSuchMethodError: method not found: '"+s+"' on null"}}
A.f8.prototype={
p(a){var s,r=this,q="NoSuchMethodError: method not found: '",p=r.b
if(p==null)return"NoSuchMethodError: "+r.a
s=r.c
if(s==null)return q+p+"' ("+r.a+")"
return q+p+"' on '"+s+"' ("+r.a+")"}}
A.fB.prototype={
p(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.hT.prototype={
p(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.dz.prototype={}
A.et.prototype={
p(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$ibm:1}
A.cg.prototype={
p(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.pR(r==null?"unknown":r)+"'"},
$icl:1,
gdL(){return this},
$C:"$1",
$R:1,
$D:null}
A.eV.prototype={$C:"$0",$R:0}
A.eW.prototype={$C:"$2",$R:2}
A.fy.prototype={}
A.fs.prototype={
p(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.pR(s)+"'"}}
A.cM.prototype={
a0(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.cM))return!1
return this.$_target===b.$_target&&this.a===b.a},
gL(a){return(A.pL(this.a)^A.fp(this.$_target))>>>0},
p(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.hW(this.a)+"'")}}
A.fq.prototype={
p(a){return"RuntimeError: "+this.a}}
A.fG.prototype={
p(a){return"Assertion failed: "+A.bP(this.a)}}
A.iC.prototype={}
A.aL.prototype={
gm(a){return this.a},
gE(a){return this.a===0},
gP(a){return this.a!==0},
gO(a){return new A.b6(this,A.x(this).i("b6<1>"))},
gaf(a){var s=A.x(this)
return A.hP(new A.b6(this,s.i("b6<1>")),new A.hJ(this),s.c,s.z[1])},
M(a,b){var s,r
if(typeof b=="string"){s=this.b
if(s==null)return!1
return s[b]!=null}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=this.c
if(r==null)return!1
return r[b]!=null}else return this.c6(b)},
c6(a){var s=this.d
if(s==null)return!1
return this.aJ(s[this.aI(a)],a)>=0},
h(a,b){var s,r,q,p,o=null
if(typeof b=="string"){s=this.b
if(s==null)return o
r=s[b]
q=r==null?o:r.b
return q}else if(typeof b=="number"&&(b&0x3fffffff)===b){p=this.c
if(p==null)return o
r=p[b]
q=r==null?o:r.b
return q}else return this.c7(b)},
c7(a){var s,r,q=this.d
if(q==null)return null
s=q[this.aI(a)]
r=this.aJ(s,a)
if(r<0)return null
return s[r].b},
k(a,b,c){var s,r,q=this,p=A.x(q)
p.c.a(b)
p.z[1].a(c)
if(typeof b=="string"){s=q.b
q.bG(s==null?q.b=q.bh():s,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=q.c
q.bG(r==null?q.c=q.bh():r,b,c)}else q.c9(b,c)},
c9(a,b){var s,r,q,p,o=this,n=A.x(o)
n.c.a(a)
n.z[1].a(b)
s=o.d
if(s==null)s=o.d=o.bh()
r=o.aI(a)
q=s[r]
if(q==null)s[r]=[o.bi(a,b)]
else{p=o.aJ(q,a)
if(p>=0)q[p].b=b
else q.push(o.bi(a,b))}},
dw(a,b,c){var s,r,q=this,p=A.x(q)
p.c.a(b)
p.i("2()").a(c)
if(q.M(0,b)){s=q.h(0,b)
return s==null?p.z[1].a(s):s}r=c.$0()
q.k(0,b,r)
return r},
H(a,b){var s=this
if(typeof b=="string")return s.bE(s.b,b)
else if(typeof b=="number"&&(b&0x3fffffff)===b)return s.bE(s.c,b)
else return s.c8(b)},
c8(a){var s,r,q,p,o=this,n=o.d
if(n==null)return null
s=o.aI(a)
r=n[s]
q=o.aJ(r,a)
if(q<0)return null
p=r.splice(q,1)[0]
o.bF(p)
if(r.length===0)delete n[s]
return p.b},
C(a){var s=this
if(s.a>0){s.b=s.c=s.d=s.e=s.f=null
s.a=0
s.bg()}},
K(a,b){var s,r,q=this
A.x(q).i("~(1,2)").a(b)
s=q.e
r=q.r
for(;s!=null;){b.$2(s.a,s.b)
if(r!==q.r)throw A.e(A.a9(q))
s=s.c}},
bG(a,b,c){var s,r=A.x(this)
r.c.a(b)
r.z[1].a(c)
s=a[b]
if(s==null)a[b]=this.bi(b,c)
else s.b=c},
bE(a,b){var s
if(a==null)return null
s=a[b]
if(s==null)return null
this.bF(s)
delete a[b]
return s.b},
bg(){this.r=this.r+1&1073741823},
bi(a,b){var s=this,r=A.x(s),q=new A.hK(r.c.a(a),r.z[1].a(b))
if(s.e==null)s.e=s.f=q
else{r=s.f
r.toString
q.d=r
s.f=r.c=q}++s.a
s.bg()
return q},
bF(a){var s=this,r=a.d,q=a.c
if(r==null)s.e=q
else r.c=q
if(q==null)s.f=r
else q.d=r;--s.a
s.bg()},
aI(a){return J.eP(a)&0x3fffffff},
aJ(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.q(a[r].a,b))return r
return-1},
p(a){return A.hM(this)},
bh(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
$inz:1}
A.hJ.prototype={
$1(a){var s=this.a,r=A.x(s)
s=s.h(0,r.c.a(a))
return s==null?r.z[1].a(s):s},
$S(){return A.x(this.a).i("2(1)")}}
A.hK.prototype={}
A.b6.prototype={
gm(a){return this.a.a},
gE(a){return this.a.a===0},
gv(a){var s=this.a,r=new A.co(s,s.r,this.$ti.i("co<1>"))
r.c=s.e
return r},
l(a,b){return this.a.M(0,b)}}
A.co.prototype={
gt(){return this.d},
n(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.e(A.a9(q))
s=r.c
if(s==null){r.sbD(null)
return!1}else{r.sbD(s.a)
r.c=s.c
return!0}},
sbD(a){this.d=this.$ti.i("1?").a(a)},
$iZ:1}
A.kY.prototype={
$1(a){return this.a(a)},
$S:10}
A.kZ.prototype={
$2(a,b){return this.a(a,b)},
$S:48}
A.l_.prototype={
$1(a){return this.a(A.n(a))},
$S:72}
A.dJ.prototype={
p(a){return"RegExp/"+this.a+"/"+this.b.flags},
gcW(){var s=this,r=s.c
if(r!=null)return r
r=s.b
return s.c=A.nw(s.a,r.multiline,!r.ignoreCase,r.unicode,r.dotAll,!0)},
gcV(){var s=this,r=s.d
if(r!=null)return r
r=s.b
return s.d=A.nw(s.a+"|()",r.multiline,!r.ignoreCase,r.unicode,r.dotAll,!0)},
a6(a){var s=this.b.exec(a)
if(s==null)return null
return new A.el(s)},
aW(a,b){return new A.fF(this,b,0)},
cR(a,b){var s,r=this.gcW()
if(r==null)r=t.K.a(r)
r.lastIndex=b
s=r.exec(a)
if(s==null)return null
return new A.el(s)},
$ihU:1}
A.el.prototype={
gbA(a){return this.b.index},
gbq(){var s=this.b
return s.index+s[0].length},
h(a,b){var s
A.i(b)
s=this.b
if(!(b<s.length))return A.b(s,b)
return s[b]},
$icV:1,
$idY:1}
A.fF.prototype={
gv(a){return new A.d_(this.a,this.b,this.c)}}
A.d_.prototype={
gt(){var s=this.d
return s==null?t.r.a(s):s},
n(){var s,r,q,p,o,n=this,m=n.b
if(m==null)return!1
s=n.c
r=m.length
if(s<=r){q=n.a
p=q.cR(m,s)
if(p!=null){n.d=p
o=p.gbq()
if(p.b.index===o){if(q.b.unicode){s=n.c
q=s+1
if(q<r){s=B.b.ak(m,s)
if(s>=55296&&s<=56319){s=B.b.ak(m,q)
s=s>=56320&&s<=57343}else s=!1}else s=!1}else s=!1
o=(s?o+1:o)+1}n.c=o
return!0}}n.b=n.d=null
return!1},
$iZ:1}
A.fv.prototype={
gbq(){return this.a+this.c.length},
h(a,b){A.i(b)
if(b!==0)A.a5(A.hX(b,null))
return this.c},
$icV:1,
gbA(a){return this.a}}
A.h0.prototype={
gv(a){return new A.h1(this.a,this.b,this.c)}}
A.h1.prototype={
n(){var s,r,q=this,p=q.c,o=q.b,n=o.length,m=q.a,l=m.length
if(p+n>l){q.d=null
return!1}s=m.indexOf(o,p)
if(s<0){q.c=l+1
q.d=null
return!1}r=s+n
q.d=new A.fv(s,o)
q.c=r===q.c?r+1:r
return!0},
gt(){var s=this.d
s.toString
return s},
$iZ:1}
A.cp.prototype={
cU(a,b,c,d){var s=A.ab(b,0,c,d,null)
throw A.e(s)},
bN(a,b,c,d){if(b>>>0!==b||b>c)this.cU(a,b,c,d)},
$iba:1}
A.aH.prototype={
gm(a){return a.length},
bW(a,b,c,d,e){var s,r,q=a.length
this.bN(a,b,q,"start")
this.bN(a,c,q,"end")
if(b>c)throw A.e(A.ab(b,0,c,null,null))
s=c-b
r=d.length
if(r-e<s)throw A.e(A.ct("Not enough elements"))
if(e!==0||r!==s)d=d.subarray(e,e+s)
a.set(d,b)},
$iau:1}
A.bV.prototype={
h(a,b){A.i(b)
A.bF(b,a,a.length)
return a[b]},
k(a,b,c){A.i(b)
A.rz(c)
A.bF(b,a,a.length)
a[b]=c},
N(a,b,c,d,e){t.bM.a(d)
if(t.d4.b(d)){this.bW(a,b,c,d,e)
return}this.bB(a,b,c,d,e)},
ae(a,b,c,d){return this.N(a,b,c,d,0)},
$iA:1,
$ik:1,
$iI:1}
A.aS.prototype={
k(a,b,c){A.i(b)
A.i(c)
A.bF(b,a,a.length)
a[b]=c},
N(a,b,c,d,e){t.gS.a(d)
if(t.eB.b(d)){this.bW(a,b,c,d,e)
return}this.bB(a,b,c,d,e)},
ae(a,b,c,d){return this.N(a,b,c,d,0)},
$iA:1,
$ik:1,
$iI:1}
A.ff.prototype={
h(a,b){A.i(b)
A.bF(b,a,a.length)
return a[b]}}
A.fg.prototype={
h(a,b){A.i(b)
A.bF(b,a,a.length)
return a[b]}}
A.fh.prototype={
h(a,b){A.i(b)
A.bF(b,a,a.length)
return a[b]}}
A.fi.prototype={
h(a,b){A.i(b)
A.bF(b,a,a.length)
return a[b]}}
A.fj.prototype={
h(a,b){A.i(b)
A.bF(b,a,a.length)
return a[b]}}
A.dR.prototype={
gm(a){return a.length},
h(a,b){A.i(b)
A.bF(b,a,a.length)
return a[b]}}
A.fk.prototype={
gm(a){return a.length},
h(a,b){A.i(b)
A.bF(b,a,a.length)
return a[b]},
$ir2:1}
A.en.prototype={}
A.eo.prototype={}
A.ep.prototype={}
A.eq.prototype={}
A.b9.prototype={
i(a){return A.iK(v.typeUniverse,this,a)},
A(a){return A.rv(v.typeUniverse,this,a)}}
A.fO.prototype={}
A.h5.prototype={
p(a){return A.aV(this.a,null)}}
A.fN.prototype={
p(a){return this.a}}
A.ev.prototype={$ibX:1}
A.i8.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:36}
A.i7.prototype={
$1(a){var s,r
this.a.a=t.M.a(a)
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:45}
A.i9.prototype={
$0(){this.a.$0()},
$S:4}
A.ia.prototype={
$0(){this.a.$0()},
$S:4}
A.eu.prototype={
cF(a,b){if(self.setTimeout!=null)this.b=self.setTimeout(A.df(new A.iJ(this,b),0),a)
else throw A.e(A.K("`setTimeout()` not found."))},
cG(a,b){if(self.setTimeout!=null)this.b=self.setInterval(A.df(new A.iI(this,a,Date.now(),b),0),a)
else throw A.e(A.K("Periodic timer."))},
aG(){if(self.setTimeout!=null){var s=this.b
if(s==null)return
if(this.a)self.clearTimeout(s)
else self.clearInterval(s)
this.b=null}else throw A.e(A.K("Canceling a timer."))},
$ifz:1}
A.iJ.prototype={
$0(){var s=this.a
s.b=null
s.c=1
this.b.$0()},
$S:1}
A.iI.prototype={
$0(){var s,r=this,q=r.a,p=q.c+1,o=r.b
if(o>0){s=Date.now()-r.c
if(s>(p+1)*o)p=B.f.cC(s,o)}q.c=p
r.d.$1(q)},
$S:4}
A.fH.prototype={
bo(a,b){var s,r=this,q=r.$ti
q.i("1/?").a(b)
if(b==null)q.c.a(b)
if(!r.b)r.a.bH(b)
else{s=r.a
if(q.i("aD<1>").b(b))s.bL(b)
else s.ba(q.c.a(b))}},
aY(a,b){var s=this.a
if(this.b)s.aq(a,b)
else s.bI(a,b)}}
A.j3.prototype={
$1(a){return this.a.$2(0,a)},
$S:23}
A.j4.prototype={
$2(a,b){this.a.$2(1,new A.dz(a,t.l.a(b)))},
$S:75}
A.kb.prototype={
$2(a,b){this.a(A.i(a),b)},
$S:50}
A.dp.prototype={
p(a){return A.c(this.a)},
$iV:1,
gaQ(){return this.b}}
A.hE.prototype={
$0(){var s,r,q,p,o=this,n=o.a
if(n==null){o.c.a(null)
o.b.b9(null)}else try{o.b.b9(n.$0())}catch(q){s=A.ag(q)
r=A.bM(q)
n=s
p=r
if(p==null)p=A.nn(n)
o.b.aq(n,p)}},
$S:1}
A.ec.prototype={
aY(a,b){var s
A.az(a,"error",t.K)
s=this.a
if((s.a&30)!==0)throw A.e(A.ct("Future already completed"))
if(b==null)b=A.nn(a)
s.bI(a,b)},
c2(a){return this.aY(a,null)}}
A.e9.prototype={
bo(a,b){var s,r=this.$ti
r.i("1/?").a(b)
s=this.a
if((s.a&30)!==0)throw A.e(A.ct("Future already completed"))
s.bH(r.i("1/").a(b))}}
A.cz.prototype={
dr(a){if((this.c&15)!==6)return!0
return this.b.b.bt(t.al.a(this.d),a.a,t.y,t.K)},
dm(a){var s,r=this,q=r.e,p=null,o=t.z,n=t.K,m=a.a,l=r.b.b
if(t.ag.b(q))p=l.dC(q,m,a.b,o,n,t.l)
else p=l.bt(t.bI.a(q),m,o,n)
try{o=r.$ti.i("2/").a(p)
return o}catch(s){if(t.eK.b(A.ag(s))){if((r.c&1)!==0)throw A.e(A.bv("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.e(A.bv("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.ai.prototype={
bu(a,b,c){var s,r,q,p=this.$ti
p.A(c).i("1/(2)").a(a)
s=$.a1
if(s===B.o){if(b!=null&&!t.ag.b(b)&&!t.bI.b(b))throw A.e(A.ok(b,"onError",u.c))}else{c.i("@<0/>").A(p.c).i("1(2)").a(a)
if(b!=null)b=A.tD(b,s)}r=new A.ai(s,c.i("ai<0>"))
q=b==null?1:3
this.b5(new A.cz(r,q,a,b,p.i("@<1>").A(c).i("cz<1,2>")))
return r},
dF(a,b){return this.bu(a,null,b)},
bY(a,b,c){var s,r=this.$ti
r.A(c).i("1/(2)").a(a)
s=new A.ai($.a1,c.i("ai<0>"))
this.b5(new A.cz(s,3,a,b,r.i("@<1>").A(c).i("cz<1,2>")))
return s},
d3(a){this.a=this.a&1|16
this.c=a},
b7(a){this.a=a.a&30|this.a&1
this.c=a.c},
b5(a){var s,r=this,q=r.a
if(q<=3){a.a=t.F.a(r.c)
r.c=a}else{if((q&4)!==0){s=t.e.a(r.c)
if((s.a&24)===0){s.b5(a)
return}r.b7(s)}A.da(null,null,r.b,t.M.a(new A.ih(r,a)))}},
bT(a){var s,r,q,p,o,n,m=this,l={}
l.a=a
if(a==null)return
s=m.a
if(s<=3){r=t.F.a(m.c)
m.c=a
if(r!=null){q=a.a
for(p=a;q!=null;p=q,q=o)o=q.a
p.a=r}}else{if((s&4)!==0){n=t.e.a(m.c)
if((n.a&24)===0){n.bT(a)
return}m.b7(n)}l.a=m.aU(a)
A.da(null,null,m.b,t.M.a(new A.iq(l,m)))}},
aT(){var s=t.F.a(this.c)
this.c=null
return this.aU(s)},
aU(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
bK(a){var s,r,q,p=this
p.a^=2
try{a.bu(new A.il(p),new A.im(p),t.a)}catch(q){s=A.ag(q)
r=A.bM(q)
A.ur(new A.io(p,s,r))}},
b9(a){var s,r=this,q=r.$ti
q.i("1/").a(a)
if(q.i("aD<1>").b(a))if(q.b(a))A.ik(a,r)
else r.bK(a)
else{s=r.aT()
q.c.a(a)
r.a=8
r.c=a
A.d2(r,s)}},
ba(a){var s,r=this
r.$ti.c.a(a)
s=r.aT()
r.a=8
r.c=a
A.d2(r,s)},
aq(a,b){var s
t.l.a(b)
s=this.aT()
this.d3(A.hs(a,b))
A.d2(this,s)},
bH(a){var s=this.$ti
s.i("1/").a(a)
if(s.i("aD<1>").b(a)){this.bL(a)
return}this.cK(s.c.a(a))},
cK(a){var s=this
s.$ti.c.a(a)
s.a^=2
A.da(null,null,s.b,t.M.a(new A.ij(s,a)))},
bL(a){var s=this,r=s.$ti
r.i("aD<1>").a(a)
if(r.b(a)){if((a.a&16)!==0){s.a^=2
A.da(null,null,s.b,t.M.a(new A.ip(s,a)))}else A.ik(a,s)
return}s.bK(a)},
bI(a,b){this.a^=2
A.da(null,null,this.b,t.M.a(new A.ii(this,a,b)))},
$iaD:1}
A.ih.prototype={
$0(){A.d2(this.a,this.b)},
$S:1}
A.iq.prototype={
$0(){A.d2(this.b,this.a.a)},
$S:1}
A.il.prototype={
$1(a){var s,r,q,p=this.a
p.a^=2
try{p.ba(p.$ti.c.a(a))}catch(q){s=A.ag(q)
r=A.bM(q)
p.aq(s,r)}},
$S:36}
A.im.prototype={
$2(a,b){this.a.aq(t.K.a(a),t.l.a(b))},
$S:43}
A.io.prototype={
$0(){this.a.aq(this.b,this.c)},
$S:1}
A.ij.prototype={
$0(){this.a.ba(this.b)},
$S:1}
A.ip.prototype={
$0(){A.ik(this.b,this.a)},
$S:1}
A.ii.prototype={
$0(){this.a.aq(this.b,this.c)},
$S:1}
A.it.prototype={
$0(){var s,r,q,p,o,n,m=this,l=null
try{q=m.a.a
l=q.b.b.dB(t.hf.a(q.d),t.z)}catch(p){s=A.ag(p)
r=A.bM(p)
q=m.c&&t.n.a(m.b.a.c).a===s
o=m.a
if(q)o.c=t.n.a(m.b.a.c)
else o.c=A.hs(s,r)
o.b=!0
return}if(l instanceof A.ai&&(l.a&24)!==0){if((l.a&16)!==0){q=m.a
q.c=t.n.a(l.c)
q.b=!0}return}if(t.k.b(l)){n=m.b.a
q=m.a
q.c=l.dF(new A.iu(n),t.z)
q.b=!1}},
$S:1}
A.iu.prototype={
$1(a){return this.a},
$S:38}
A.is.prototype={
$0(){var s,r,q,p,o,n,m,l
try{q=this.a
p=q.a
o=p.$ti
n=o.c
m=n.a(this.b)
q.c=p.b.b.bt(o.i("2/(1)").a(p.d),m,o.i("2/"),n)}catch(l){s=A.ag(l)
r=A.bM(l)
q=this.a
q.c=A.hs(s,r)
q.b=!0}},
$S:1}
A.ir.prototype={
$0(){var s,r,q,p,o,n,m=this
try{s=t.n.a(m.a.a.c)
p=m.b
if(p.a.dr(s)&&p.a.e!=null){p.c=p.a.dm(s)
p.b=!1}}catch(o){r=A.ag(o)
q=A.bM(o)
p=t.n.a(m.a.a.c)
n=m.b
if(p.a===r)n.c=p
else n.c=A.hs(r,q)
n.b=!0}},
$S:1}
A.fI.prototype={}
A.e2.prototype={
gm(a){var s,r,q=this,p={},o=new A.ai($.a1,t.fJ)
p.a=0
s=A.x(q)
r=s.i("~(1)?").a(new A.i1(p,q))
t.Z.a(new A.i2(p,o))
A.l(q.a,q.b,r,!1,s.c)
return o}}
A.i1.prototype={
$1(a){A.x(this.b).c.a(a);++this.a.a},
$S(){return A.x(this.b).i("~(1)")}}
A.i2.prototype={
$0(){this.b.b9(this.a.a)},
$S:1}
A.ft.prototype={}
A.fu.prototype={}
A.h_.prototype={}
A.eA.prototype={$ioW:1}
A.jU.prototype={
$0(){var s=this.a,r=this.b
A.az(s,"error",t.K)
A.az(r,"stackTrace",t.l)
A.qI(s,r)},
$S:1}
A.fX.prototype={
dD(a){var s,r,q
t.M.a(a)
try{if(B.o===$.a1){a.$0()
return}A.pn(null,null,this,a,t.H)}catch(q){s=A.ag(q)
r=A.bM(q)
A.jT(t.K.a(s),t.l.a(r))}},
dE(a,b,c){var s,r,q
c.i("~(0)").a(a)
c.a(b)
try{if(B.o===$.a1){a.$1(b)
return}A.po(null,null,this,a,b,t.H,c)}catch(q){s=A.ag(q)
r=A.bM(q)
A.jT(t.K.a(s),t.l.a(r))}},
bm(a){return new A.iD(this,t.M.a(a))},
c0(a,b){return new A.iE(this,b.i("~(0)").a(a),b)},
h(a,b){return null},
dB(a,b){b.i("0()").a(a)
if($.a1===B.o)return a.$0()
return A.pn(null,null,this,a,b)},
bt(a,b,c,d){c.i("@<0>").A(d).i("1(2)").a(a)
d.a(b)
if($.a1===B.o)return a.$1(b)
return A.po(null,null,this,a,b,c,d)},
dC(a,b,c,d,e,f){d.i("@<0>").A(e).A(f).i("1(2,3)").a(a)
e.a(b)
f.a(c)
if($.a1===B.o)return a.$2(b,c)
return A.tG(null,null,this,a,b,c,d,e,f)},
ce(a,b,c,d){return b.i("@<0>").A(c).A(d).i("1(2,3)").a(a)}}
A.iD.prototype={
$0(){return this.a.dD(this.b)},
$S:1}
A.iE.prototype={
$1(a){var s=this.c
return this.a.dE(this.b,s.a(a),s)},
$S(){return this.c.i("~(0)")}}
A.eh.prototype={
h(a,b){if(!A.am(this.y.$1(b)))return null
return this.ct(b)},
k(a,b,c){var s=this.$ti
this.cv(s.c.a(b),s.z[1].a(c))},
M(a,b){if(!A.am(this.y.$1(b)))return!1
return this.cs(b)},
H(a,b){if(!A.am(this.y.$1(b)))return null
return this.cu(b)},
aI(a){return this.x.$1(this.$ti.c.a(a))&1073741823},
aJ(a,b){var s,r,q,p
if(a==null)return-1
s=a.length
for(r=this.$ti.c,q=this.w,p=0;p<s;++p)if(A.am(q.$2(r.a(a[p].a),r.a(b))))return p
return-1}}
A.iB.prototype={
$1(a){return this.a.b(a)},
$S:3}
A.cB.prototype={
gv(a){var s=this,r=new A.cC(s,s.r,A.x(s).i("cC<1>"))
r.c=s.e
return r},
gm(a){return this.a},
gE(a){return this.a===0},
gP(a){return this.a!==0},
l(a,b){var s,r
if(typeof b=="string"&&b!=="__proto__"){s=this.b
if(s==null)return!1
return t.L.a(s[b])!=null}else if(typeof b=="number"&&(b&1073741823)===b){r=this.c
if(r==null)return!1
return t.L.a(r[b])!=null}else return this.cN(b)},
cN(a){var s=this.d
if(s==null)return!1
return this.bf(s[this.bb(a)],a)>=0},
q(a,b){var s,r,q=this
A.x(q).c.a(b)
if(typeof b=="string"&&b!=="__proto__"){s=q.b
return q.bO(s==null?q.b=A.nJ():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.bO(r==null?q.c=A.nJ():r,b)}else return q.cH(b)},
cH(a){var s,r,q,p=this
A.x(p).c.a(a)
s=p.d
if(s==null)s=p.d=A.nJ()
r=p.bb(a)
q=s[r]
if(q==null)s[r]=[p.b8(a)]
else{if(p.bf(q,a)>=0)return!1
q.push(p.b8(a))}return!0},
H(a,b){var s=this
if(typeof b=="string"&&b!=="__proto__")return s.bU(s.b,b)
else if(typeof b=="number"&&(b&1073741823)===b)return s.bU(s.c,b)
else return s.cY(b)},
cY(a){var s,r,q,p,o=this,n=o.d
if(n==null)return!1
s=o.bb(a)
r=n[s]
q=o.bf(r,a)
if(q<0)return!1
p=r.splice(q,1)[0]
if(0===r.length)delete n[s]
o.bZ(p)
return!0},
bO(a,b){A.x(this).c.a(b)
if(t.L.a(a[b])!=null)return!1
a[b]=this.b8(b)
return!0},
bU(a,b){var s
if(a==null)return!1
s=t.L.a(a[b])
if(s==null)return!1
this.bZ(s)
delete a[b]
return!0},
bP(){this.r=this.r+1&1073741823},
b8(a){var s,r=this,q=new A.fU(A.x(r).c.a(a))
if(r.e==null)r.e=r.f=q
else{s=r.f
s.toString
q.c=s
r.f=s.b=q}++r.a
r.bP()
return q},
bZ(a){var s=this,r=a.c,q=a.b
if(r==null)s.e=q
else r.b=q
if(q==null)s.f=r
else q.c=r;--s.a
s.bP()},
bb(a){return J.eP(a)&1073741823},
bf(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.q(a[r].a,b))return r
return-1}}
A.fU.prototype={}
A.cC.prototype={
gt(){var s=this.d
return s==null?this.$ti.c.a(s):s},
n(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.e(A.a9(q))
else if(r==null){s.saD(null)
return!1}else{s.saD(s.$ti.i("1?").a(r.a))
s.c=r.b
return!0}},
saD(a){this.d=this.$ti.i("1?").a(a)},
$iZ:1}
A.dG.prototype={}
A.hL.prototype={
$2(a,b){this.a.k(0,this.b.a(a),this.c.a(b))},
$S:15}
A.dN.prototype={$iA:1,$ik:1,$iI:1}
A.v.prototype={
gv(a){return new A.aF(a,this.gm(a),A.P(a).i("aF<v.E>"))},
G(a,b){return this.h(a,b)},
gE(a){return this.gm(a)===0},
gP(a){return!this.gE(a)},
gaK(a){if(this.gm(a)===0)throw A.e(A.bz())
return this.h(a,this.gm(a)-1)},
l(a,b){var s,r=this.gm(a)
for(s=0;s<r;++s){if(J.q(this.h(a,s),b))return!0
if(r!==this.gm(a))throw A.e(A.a9(a))}return!1},
Y(a,b){var s,r
A.P(a).i("y(v.E)").a(b)
s=this.gm(a)
for(r=0;r<s;++r){if(A.am(b.$1(this.h(a,r))))return!0
if(s!==this.gm(a))throw A.e(A.a9(a))}return!1},
an(a,b,c){var s,r,q,p=A.P(a)
p.i("y(v.E)").a(b)
p.i("v.E()?").a(c)
s=this.gm(a)
for(r=0;r<s;++r){q=this.h(a,r)
if(A.am(b.$1(q)))return q
if(s!==this.gm(a))throw A.e(A.a9(a))}return c.$0()},
V(a,b){var s
if(this.gm(a)===0)return""
s=A.nF("",a,b)
return s.charCodeAt(0)==0?s:s},
a8(a,b){var s=A.P(a)
return new A.a_(a,s.i("y(v.E)").a(b),s.i("a_<v.E>"))},
aL(a,b,c){var s=A.P(a)
return new A.R(a,s.A(c).i("1(v.E)").a(b),s.i("@<v.E>").A(c).i("R<1,2>"))},
a9(a,b){return A.aO(a,b,null,A.P(a).i("v.E"))},
a7(a,b){return A.aO(a,0,A.az(b,"count",t.S),A.P(a).i("v.E"))},
ah(a,b){var s,r,q,p,o=this
if(o.gE(a)){s=J.nv(0,A.P(a).i("v.E"))
return s}r=o.h(a,0)
q=A.cT(o.gm(a),r,!0,A.P(a).i("v.E"))
for(p=1;p<o.gm(a);++p)B.a.k(q,p,o.h(a,p))
return q},
a_(a){return this.ah(a,!0)},
q(a,b){var s
A.P(a).i("v.E").a(b)
s=this.gm(a)
this.sm(a,s+1)
this.k(a,s,b)},
H(a,b){var s
for(s=0;s<this.gm(a);++s)if(J.q(this.h(a,s),b)){this.cL(a,s,s+1)
return!0}return!1},
cL(a,b,c){var s,r=this,q=r.gm(a),p=c-b
for(s=c;s<q;++s)r.k(a,s-p,r.h(a,s))
r.sm(a,q-p)},
ao(a,b){this.cM(a,A.P(a).i("y(v.E)").a(b),!1)},
cM(a,b,c){var s,r,q,p,o=this,n=A.P(a)
n.i("y(v.E)").a(b)
s=A.o([],n.i("a3<v.E>"))
r=o.gm(a)
for(q=0;q<r;++q){p=o.h(a,q)
if(J.q(b.$1(p),!1))B.a.q(s,p)
if(r!==o.gm(a))throw A.e(A.a9(a))}if(s.length!==o.gm(a)){o.ae(a,0,s.length,s)
o.sm(a,s.length)}},
C(a){this.sm(a,0)},
aX(a,b){return new A.bw(a,A.P(a).i("@<v.E>").A(b).i("bw<1,2>"))},
a1(a,b){var s,r=A.P(a)
r.i("f(v.E,v.E)?").a(b)
s=b==null?A.u2():b
A.oR(a,s,r.i("v.E"))},
J(a,b){var s=A.P(a)
s.i("I<v.E>").a(b)
s=A.a8(a,!0,s.i("v.E"))
B.a.T(s,b)
return s},
N(a,b,c,d,e){var s,r,q,p,o=A.P(a)
o.i("k<v.E>").a(d)
A.hY(b,c,this.gm(a))
s=c-b
if(s===0)return
A.aN(e,"skipCount")
if(o.i("I<v.E>").b(d)){r=e
q=d}else{q=J.hp(d,e).ah(0,!1)
r=0}o=J.j(q)
if(r+s>o.gm(q))throw A.e(A.oy())
if(r<b)for(p=s-1;p>=0;--p)this.k(a,b+p,o.h(q,r+p))
else for(p=0;p<s;++p)this.k(a,b+p,o.h(q,r+p))},
ae(a,b,c,d){return this.N(a,b,c,d,0)},
p(a){return A.nu(a,"[","]")}}
A.dP.prototype={}
A.hN.prototype={
$2(a,b){var s,r=this.a
if(!r.a)this.b.a+=", "
r.a=!1
r=this.b
s=r.a+=A.c(a)
r.a=s+": "
r.a+=A.c(b)},
$S:34}
A.M.prototype={
K(a,b){var s,r,q,p=A.P(a)
p.i("~(M.K,M.V)").a(b)
for(s=J.T(this.gO(a)),p=p.i("M.V");s.n();){r=s.gt()
q=this.h(a,r)
b.$2(r,q==null?p.a(q):q)}},
aP(a,b){var s,r,q,p=A.P(a)
p.i("M.V(M.K,M.V)").a(b)
for(s=J.T(this.gO(a)),p=p.i("M.V");s.n();){r=s.gt()
q=this.h(a,r)
this.k(a,r,b.$2(r,q==null?p.a(q):q))}},
gbr(a){return J.b2(this.gO(a),new A.hO(a),A.P(a).i("U<M.K,M.V>"))},
aM(a,b,c,d){var s,r,q,p,o,n=A.P(a)
n.A(c).A(d).i("U<1,2>(M.K,M.V)").a(b)
s=A.Y(c,d)
for(r=J.T(this.gO(a)),n=n.i("M.V");r.n();){q=r.gt()
p=this.h(a,q)
o=b.$2(q,p==null?n.a(p):p)
s.k(0,o.a,o.b)}return s},
M(a,b){return J.b1(this.gO(a),b)},
gm(a){return J.W(this.gO(a))},
gE(a){return J.hm(this.gO(a))},
gP(a){return J.hn(this.gO(a))},
gaf(a){var s=A.P(a)
return new A.ej(a,s.i("@<M.K>").A(s.i("M.V")).i("ej<1,2>"))},
p(a){return A.hM(a)},
$iz:1}
A.hO.prototype={
$1(a){var s=this.a,r=A.P(s)
r.i("M.K").a(a)
s=J.a(s,a)
if(s==null)s=r.i("M.V").a(s)
return new A.U(a,s,r.i("@<M.K>").A(r.i("M.V")).i("U<1,2>"))},
$S(){return A.P(this.a).i("U<M.K,M.V>(M.K)")}}
A.ej.prototype={
gm(a){return J.W(this.a)},
gE(a){return J.hm(this.a)},
gP(a){return J.hn(this.a)},
gv(a){var s=this.a,r=this.$ti
return new A.ek(J.T(J.qk(s)),s,r.i("@<1>").A(r.z[1]).i("ek<1,2>"))}}
A.ek.prototype={
n(){var s=this,r=s.a
if(r.n()){s.saD(J.a(s.b,r.gt()))
return!0}s.saD(null)
return!1},
gt(){var s=this.c
return s==null?this.$ti.z[1].a(s):s},
saD(a){this.c=this.$ti.i("2?").a(a)},
$iZ:1}
A.ey.prototype={
k(a,b,c){var s=this.$ti
s.c.a(b)
s.z[1].a(c)
throw A.e(A.K("Cannot modify unmodifiable map"))},
H(a,b){throw A.e(A.K("Cannot modify unmodifiable map"))},
aP(a,b){this.$ti.i("2(1,2)").a(b)
throw A.e(A.K("Cannot modify unmodifiable map"))}}
A.cU.prototype={
h(a,b){return this.a.h(0,b)},
k(a,b,c){var s=this.$ti
this.a.k(0,s.c.a(b),s.z[1].a(c))},
M(a,b){return this.a.M(0,b)},
K(a,b){this.a.K(0,this.$ti.i("~(1,2)").a(b))},
gE(a){return this.a.a===0},
gm(a){return this.a.a},
H(a,b){return this.a.H(0,b)},
p(a){return A.hM(this.a)},
gaf(a){var s=this.a
return s.gaf(s)},
aM(a,b,c,d){var s=this.a
return s.aM(s,this.$ti.A(c).A(d).i("U<1,2>(3,4)").a(b),c,d)},
aP(a,b){var s=this.a
s.aP(s,this.$ti.i("2(1,2)").a(b))},
$iz:1}
A.e7.prototype={}
A.bl.prototype={
gE(a){return this.gm(this)===0},
gP(a){return this.gm(this)!==0},
T(a,b){var s
for(s=J.T(A.x(this).i("k<bl.E>").a(b));s.n();)this.q(0,s.gt())},
p(a){return A.nu(this,"{","}")},
a7(a,b){return A.nG(this,b,A.x(this).i("bl.E"))},
a9(a,b){return A.nE(this,b,A.x(this).i("bl.E"))},
G(a,b){var s,r,q,p,o="index"
A.az(b,o,t.S)
A.aN(b,o)
for(s=this.gv(this),r=s.$ti.c,q=0;s.n();){p=s.d
if(p==null)p=r.a(p)
if(b===q)return p;++q}throw A.e(A.cS(b,this,o,null,q))}}
A.er.prototype={$iA:1,$ik:1,$ioQ:1}
A.ei.prototype={}
A.d4.prototype={}
A.eC.prototype={}
A.fS.prototype={
h(a,b){var s,r=this.b
if(r==null)return this.c.h(0,b)
else if(typeof b!="string")return null
else{s=r[b]
return typeof s=="undefined"?this.cX(b):s}},
gm(a){return this.b==null?this.c.a:this.ar().length},
gE(a){return this.gm(this)===0},
gP(a){return this.gm(this)>0},
gO(a){var s
if(this.b==null){s=this.c
return new A.b6(s,A.x(s).i("b6<1>"))}return new A.fT(this)},
gaf(a){var s,r=this
if(r.b==null){s=r.c
return s.gaf(s)}return A.hP(r.ar(),new A.ix(r),t.N,t.z)},
k(a,b,c){var s,r,q=this
A.n(b)
if(q.b==null)q.c.k(0,b,c)
else if(q.M(0,b)){s=q.b
s[b]=c
r=q.a
if(r==null?s!=null:r!==s)r[b]=null}else q.c_().k(0,b,c)},
M(a,b){if(this.b==null)return this.c.M(0,b)
if(typeof b!="string")return!1
return Object.prototype.hasOwnProperty.call(this.a,b)},
H(a,b){if(this.b!=null&&!this.M(0,b))return null
return this.c_().H(0,b)},
K(a,b){var s,r,q,p,o=this
t.cA.a(b)
if(o.b==null)return o.c.K(0,b)
s=o.ar()
for(r=0;r<s.length;++r){q=s[r]
p=o.b[q]
if(typeof p=="undefined"){p=A.jq(o.a[q])
o.b[q]=p}b.$2(q,p)
if(s!==o.c)throw A.e(A.a9(o))}},
ar(){var s=t.g.a(this.c)
if(s==null)s=this.c=A.o(Object.keys(this.a),t.s)
return s},
c_(){var s,r,q,p,o,n=this
if(n.b==null)return n.c
s=A.Y(t.N,t.z)
r=n.ar()
for(q=0;p=r.length,q<p;++q){o=r[q]
s.k(0,o,n.h(0,o))}if(p===0)B.a.q(r,"")
else B.a.C(r)
n.a=n.b=null
return n.c=s},
cX(a){var s
if(!Object.prototype.hasOwnProperty.call(this.a,a))return null
s=A.jq(this.a[a])
return this.b[a]=s}}
A.ix.prototype={
$1(a){return this.a.h(0,a)},
$S:53}
A.fT.prototype={
gm(a){var s=this.a
return s.gm(s)},
G(a,b){var s=this.a
if(s.b==null)s=s.gO(s).G(0,b)
else{s=s.ar()
if(!(b>=0&&b<s.length))return A.b(s,b)
s=s[b]}return s},
gv(a){var s=this.a
if(s.b==null){s=s.gO(s)
s=s.gv(s)}else{s=s.ar()
s=new J.b4(s,s.length,A.L(s).i("b4<1>"))}return s},
l(a,b){return this.a.M(0,b)}}
A.bx.prototype={}
A.cO.prototype={}
A.f_.prototype={}
A.dK.prototype={
p(a){var s=A.bP(this.a)
return(this.b!=null?"Converting object to an encodable object failed:":"Converting object did not return an encodable object:")+" "+s}}
A.fa.prototype={
p(a){return"Cyclic error in JSON stringify"}}
A.f9.prototype={
al(a,b,c){var s
t.fV.a(c)
s=A.ty(b,this.gdj().a)
return s},
aH(a,b){var s
t.dA.a(b)
s=A.rd(a,this.gbp().b,null)
return s},
gbp(){return B.ai},
gdj(){return B.ah}}
A.fc.prototype={}
A.fb.prototype={}
A.iz.prototype={
ck(a){var s,r,q,p,o,n,m=a.length
for(s=this.c,r=0,q=0;q<m;++q){p=B.b.aj(a,q)
if(p>92){if(p>=55296){o=p&64512
if(o===55296){n=q+1
n=!(n<m&&(B.b.aj(a,n)&64512)===56320)}else n=!1
if(!n)if(o===56320){o=q-1
o=!(o>=0&&(B.b.ak(a,o)&64512)===55296)}else o=!1
else o=!0
if(o){if(q>r)s.a+=B.b.F(a,r,q)
r=q+1
o=s.a+=A.ap(92)
o+=A.ap(117)
s.a=o
o+=A.ap(100)
s.a=o
n=p>>>8&15
o+=A.ap(n<10?48+n:87+n)
s.a=o
n=p>>>4&15
o+=A.ap(n<10?48+n:87+n)
s.a=o
n=p&15
s.a=o+A.ap(n<10?48+n:87+n)}}continue}if(p<32){if(q>r)s.a+=B.b.F(a,r,q)
r=q+1
o=s.a+=A.ap(92)
switch(p){case 8:s.a=o+A.ap(98)
break
case 9:s.a=o+A.ap(116)
break
case 10:s.a=o+A.ap(110)
break
case 12:s.a=o+A.ap(102)
break
case 13:s.a=o+A.ap(114)
break
default:o+=A.ap(117)
s.a=o
o+=A.ap(48)
s.a=o
o+=A.ap(48)
s.a=o
n=p>>>4&15
o+=A.ap(n<10?48+n:87+n)
s.a=o
n=p&15
s.a=o+A.ap(n<10?48+n:87+n)
break}}else if(p===34||p===92){if(q>r)s.a+=B.b.F(a,r,q)
r=q+1
o=s.a+=A.ap(92)
s.a=o+A.ap(p)}}if(r===0)s.a+=a
else if(r<m)s.a+=B.b.F(a,r,m)},
b6(a){var s,r,q,p
for(s=this.a,r=s.length,q=0;q<r;++q){p=s[q]
if(a==null?p==null:a===p)throw A.e(new A.fa(a,null))}B.a.q(s,a)},
b0(a){var s,r,q,p,o=this
if(o.cj(a))return
o.b6(a)
try{s=o.b.$1(a)
if(!o.cj(s)){q=A.oD(a,null,o.gbS())
throw A.e(q)}q=o.a
if(0>=q.length)return A.b(q,-1)
q.pop()}catch(p){r=A.ag(p)
q=A.oD(a,r,o.gbS())
throw A.e(q)}},
cj(a){var s,r,q=this
if(typeof a=="number"){if(!isFinite(a))return!1
q.c.a+=B.i.p(a)
return!0}else if(a===!0){q.c.a+="true"
return!0}else if(a===!1){q.c.a+="false"
return!0}else if(a==null){q.c.a+="null"
return!0}else if(typeof a=="string"){s=q.c
s.a+='"'
q.ck(a)
s.a+='"'
return!0}else if(t.j.b(a)){q.b6(a)
q.dJ(a)
s=q.a
if(0>=s.length)return A.b(s,-1)
s.pop()
return!0}else if(t.f.b(a)){q.b6(a)
r=q.dK(a)
s=q.a
if(0>=s.length)return A.b(s,-1)
s.pop()
return r}else return!1},
dJ(a){var s,r,q=this.c
q.a+="["
s=J.j(a)
if(s.gP(a)){this.b0(s.h(a,0))
for(r=1;r<s.gm(a);++r){q.a+=","
this.b0(s.h(a,r))}}q.a+="]"},
dK(a){var s,r,q,p,o,n=this,m={},l=J.j(a)
if(l.gE(a)){n.c.a+="{}"
return!0}s=l.gm(a)*2
r=A.cT(s,null,!1,t.O)
q=m.a=0
m.b=!0
l.K(a,new A.iA(m,r))
if(!m.b)return!1
l=n.c
l.a+="{"
for(p='"';q<s;q+=2,p=',"'){l.a+=p
n.ck(A.n(r[q]))
l.a+='":'
o=q+1
if(!(o<s))return A.b(r,o)
n.b0(r[o])}l.a+="}"
return!0}}
A.iA.prototype={
$2(a,b){var s,r
if(typeof a!="string")this.a.b=!1
s=this.b
r=this.a
B.a.k(s,r.a++,a)
B.a.k(s,r.a++,b)},
$S:34}
A.iy.prototype={
gbS(){var s=this.c.a
return s.charCodeAt(0)==0?s:s}}
A.fD.prototype={
gbp(){return B.a3}}
A.fE.prototype={
dg(a){var s,r,q,p=A.hY(0,null,a.length),o=p-0
if(o===0)return new Uint8Array(0)
s=o*3
r=new Uint8Array(s)
q=new A.iL(r)
if(q.cS(a,0,p)!==p){B.b.ak(a,p-1)
q.bk()}return new Uint8Array(r.subarray(0,A.rL(0,q.b,s)))}}
A.iL.prototype={
bk(){var s=this,r=s.c,q=s.b,p=s.b=q+1,o=r.length
if(!(q<o))return A.b(r,q)
r[q]=239
q=s.b=p+1
if(!(p<o))return A.b(r,p)
r[p]=191
s.b=q+1
if(!(q<o))return A.b(r,q)
r[q]=189},
d8(a,b){var s,r,q,p,o,n=this
if((b&64512)===56320){s=65536+((a&1023)<<10)|b&1023
r=n.c
q=n.b
p=n.b=q+1
o=r.length
if(!(q<o))return A.b(r,q)
r[q]=s>>>18|240
q=n.b=p+1
if(!(p<o))return A.b(r,p)
r[p]=s>>>12&63|128
p=n.b=q+1
if(!(q<o))return A.b(r,q)
r[q]=s>>>6&63|128
n.b=p+1
if(!(p<o))return A.b(r,p)
r[p]=s&63|128
return!0}else{n.bk()
return!1}},
cS(a,b,c){var s,r,q,p,o,n,m,l=this
if(b!==c&&(B.b.ak(a,c-1)&64512)===55296)--c
for(s=l.c,r=s.length,q=b;q<c;++q){p=B.b.aj(a,q)
if(p<=127){o=l.b
if(o>=r)break
l.b=o+1
s[o]=p}else{o=p&64512
if(o===55296){if(l.b+4>r)break
n=q+1
if(l.d8(p,B.b.aj(a,n)))q=n}else if(o===56320){if(l.b+3>r)break
l.bk()}else if(p<=2047){o=l.b
m=o+1
if(m>=r)break
l.b=m
if(!(o<r))return A.b(s,o)
s[o]=p>>>6|192
l.b=m+1
s[m]=p&63|128}else{o=l.b
if(o+2>=r)break
m=l.b=o+1
if(!(o<r))return A.b(s,o)
s[o]=p>>>12|224
o=l.b=m+1
if(!(m<r))return A.b(s,m)
s[m]=p>>>6&63|128
l.b=o+1
if(!(o<r))return A.b(s,o)
s[o]=p&63|128}}}return q}}
A.hQ.prototype={
$2(a,b){var s,r,q
t.fo.a(a)
s=this.b
r=this.a
q=s.a+=r.a
q+=a.a
s.a=q
s.a=q+": "
s.a+=A.bP(b)
r.a=", "},
$S:62}
A.aQ.prototype={
q(a,b){return A.oq(B.f.J(this.a,t.d.a(b).gdN()),this.b)},
a0(a,b){if(b==null)return!1
return b instanceof A.aQ&&this.a===b.a&&this.b===b.b},
a5(a,b){return B.f.a5(this.a,t.dy.a(b).a)},
gL(a){var s=this.a
return(s^B.f.bj(s,30))&1073741823},
p(a){var s=this,r=A.or(A.dX(s)),q=A.by(A.nC(s)),p=A.by(A.nB(s)),o=A.by(A.oJ(s)),n=A.by(A.oL(s)),m=A.by(A.oM(s)),l=A.os(A.oK(s)),k=r+"-"+q
if(s.b)return k+"-"+p+" "+o+":"+n+":"+m+"."+l+"Z"
else return k+"-"+p+" "+o+":"+n+":"+m+"."+l},
cg(){var s=this,r=A.dX(s)>=-9999&&A.dX(s)<=9999?A.or(A.dX(s)):A.qE(A.dX(s)),q=A.by(A.nC(s)),p=A.by(A.nB(s)),o=A.by(A.oJ(s)),n=A.by(A.oL(s)),m=A.by(A.oM(s)),l=A.os(A.oK(s)),k=r+"-"+q
if(s.b)return k+"-"+p+"T"+o+":"+n+":"+m+"."+l+"Z"
else return k+"-"+p+"T"+o+":"+n+":"+m+"."+l},
$iaP:1}
A.hw.prototype={
$1(a){if(a==null)return 0
return A.dh(a)},
$S:29}
A.hx.prototype={
$1(a){var s,r,q
if(a==null)return 0
for(s=a.length,r=0,q=0;q<6;++q){r*=10
if(q<s)r+=B.b.aj(a,q)^48}return r},
$S:29}
A.aC.prototype={
J(a,b){return new A.aC(B.f.J(this.a,t.d.a(b).gaS()))},
aB(a,b){return new A.aC(B.f.aB(this.a,t.d.a(b).gaS()))},
S(a,b){return B.f.S(this.a,t.d.a(b).gaS())},
b2(a,b){return B.f.b2(this.a,t.d.a(b).gaS())},
b1(a,b){return B.f.b1(this.a,t.d.a(b).gaS())},
a0(a,b){if(b==null)return!1
return b instanceof A.aC&&this.a===b.a},
gL(a){return B.f.gL(this.a)},
a5(a,b){return B.f.a5(this.a,t.d.a(b).a)},
p(a){var s,r,q,p,o=this.a,n=o<0?"-":"",m=B.f.W(o,36e8)
o%=36e8
if(o<0)o=-o
s=B.f.W(o,6e7)
o%=6e7
r=s<10?"0":""
q=B.f.W(o,1e6)
p=q<10?"0":""
return n+Math.abs(m)+":"+r+s+":"+p+q+"."+B.b.aN(B.f.p(o%1e6),6,"0")},
$iaP:1}
A.id.prototype={}
A.V.prototype={
gaQ(){return A.bM(this.$thrownJsError)}}
A.dn.prototype={
p(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.bP(s)
return"Assertion failed"}}
A.bX.prototype={}
A.fm.prototype={
p(a){return"Throw of null."}}
A.b3.prototype={
gbd(){return"Invalid argument"+(!this.a?"(s)":"")},
gbc(){return""},
p(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+A.c(p),n=s.gbd()+q+o
if(!s.a)return n
return n+s.gbc()+": "+A.bP(s.b)}}
A.cW.prototype={
gbd(){return"RangeError"},
gbc(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.c(q):""
else if(q==null)s=": Not greater than or equal to "+A.c(r)
else if(q>r)s=": Not in inclusive range "+A.c(r)+".."+A.c(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.c(r)
return s}}
A.f4.prototype={
gbd(){return"RangeError"},
gbc(){if(A.i(this.b)<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gm(a){return this.f}}
A.fl.prototype={
p(a){var s,r,q,p,o,n,m,l,k=this,j={},i=new A.cu("")
j.a=""
s=k.c
for(r=s.length,q=0,p="",o="";q<r;++q,o=", "){n=s[q]
i.a=p+o
p=i.a+=A.bP(n)
j.a=", "}k.d.K(0,new A.hQ(j,i))
m=A.bP(k.a)
l=i.p(0)
return"NoSuchMethodError: method not found: '"+k.b.a+"'\nReceiver: "+m+"\nArguments: ["+l+"]"}}
A.fC.prototype={
p(a){return"Unsupported operation: "+this.a}}
A.fA.prototype={
p(a){var s=this.a
return s!=null?"UnimplementedError: "+s:"UnimplementedError"}}
A.cs.prototype={
p(a){return"Bad state: "+this.a}}
A.eX.prototype={
p(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.bP(s)+"."}}
A.fn.prototype={
p(a){return"Out of Memory"},
gaQ(){return null},
$iV:1}
A.e0.prototype={
p(a){return"Stack Overflow"},
gaQ(){return null},
$iV:1}
A.eY.prototype={
p(a){return"Reading static variable '"+this.a+"' during its initialization"}}
A.ig.prototype={
p(a){return"Exception: "+this.a}}
A.f2.prototype={
p(a){var s=this.a,r=""!==s?"FormatException: "+s:"FormatException",q=this.b
if(typeof q=="string"){if(q.length>78)q=B.b.F(q,0,75)+"..."
return r+"\n"+q}else return r}}
A.k.prototype={
aX(a,b){return A.cN(this,A.x(this).i("k.E"),b)},
aL(a,b,c){var s=A.x(this)
return A.hP(this,s.A(c).i("1(k.E)").a(b),s.i("k.E"),c)},
a8(a,b){var s=A.x(this)
return new A.a_(this,s.i("y(k.E)").a(b),s.i("a_<k.E>"))},
ci(a,b){return new A.cy(this,b.i("cy<0>"))},
l(a,b){var s
for(s=this.gv(this);s.n();)if(J.q(s.gt(),b))return!0
return!1},
Z(a,b){var s,r
A.x(this).i("k.E(k.E,k.E)").a(b)
s=this.gv(this)
if(!s.n())throw A.e(A.bz())
r=s.gt()
for(;s.n();)r=b.$2(r,s.gt())
return r},
V(a,b){var s,r=this.gv(this)
if(!r.n())return""
if(b===""){s=""
do s+=A.c(J.m(r.gt()))
while(r.n())}else{s=""+A.c(J.m(r.gt()))
for(;r.n();)s=s+b+A.c(J.m(r.gt()))}return s.charCodeAt(0)==0?s:s},
Y(a,b){var s
A.x(this).i("y(k.E)").a(b)
for(s=this.gv(this);s.n();)if(A.am(b.$1(s.gt())))return!0
return!1},
ah(a,b){return A.a8(this,b,A.x(this).i("k.E"))},
a_(a){return this.ah(a,!0)},
gm(a){var s,r=this.gv(this)
for(s=0;r.n();)++s
return s},
gE(a){return!this.gv(this).n()},
gP(a){return!this.gE(this)},
a7(a,b){return A.nG(this,b,A.x(this).i("k.E"))},
a9(a,b){return A.nE(this,b,A.x(this).i("k.E"))},
gam(a){var s=this.gv(this)
if(!s.n())throw A.e(A.bz())
return s.gt()},
gap(a){var s,r=this.gv(this)
if(!r.n())throw A.e(A.bz())
s=r.gt()
if(r.n())throw A.e(A.qK())
return s},
an(a,b,c){var s,r=A.x(this)
r.i("y(k.E)").a(b)
r.i("k.E()?").a(c)
for(r=this.gv(this);r.n();){s=r.gt()
if(A.am(b.$1(s)))return s}return c.$0()},
G(a,b){var s,r,q
A.aN(b,"index")
for(s=this.gv(this),r=0;s.n();){q=s.gt()
if(b===r)return q;++r}throw A.e(A.cS(b,this,"index",null,r))},
p(a){return A.qJ(this,"(",")")}}
A.Z.prototype={}
A.U.prototype={
p(a){return"MapEntry("+A.c(this.a)+": "+A.c(this.b)+")"}}
A.ah.prototype={
gL(a){return A.B.prototype.gL.call(this,this)},
p(a){return"null"}}
A.B.prototype={$iB:1,
a0(a,b){return this===b},
gL(a){return A.fp(this)},
p(a){return"Instance of '"+A.hW(this)+"'"},
cc(a,b){t.c4.a(b)
throw A.e(A.oG(this,b.gca(),b.gcd(),b.gcb()))},
toString(){return this.p(this)}}
A.h2.prototype={
p(a){return""},
$ibm:1}
A.cu.prototype={
gm(a){return this.a.length},
p(a){var s=this.a
return s.charCodeAt(0)==0?s:s},
$ir0:1}
A.r.prototype={$ir:1}
A.cK.prototype={
sdn(a,b){a.href=b},
p(a){return String(a)},
$icK:1}
A.eT.prototype={
p(a){return String(a)}}
A.cL.prototype={$icL:1}
A.cc.prototype={$icc:1}
A.cd.prototype={$icd:1}
A.ce.prototype={$ice:1}
A.bi.prototype={
gm(a){return a.length}}
A.cP.prototype={
bJ(a,b){var s=$.pS(),r=s[b]
if(typeof r=="string")return r
r=this.d7(a,b)
s[b]=r
return r},
d7(a,b){var s
if(b.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,function(c,d){return d.toUpperCase()}) in a)return b
s=$.pU()+b
if(s in a)return s
return b},
d4(a,b,c,d){a.setProperty(b,c,d)},
sc3(a,b){a.cssText=b},
gm(a){return a.length}}
A.hv.prototype={}
A.ch.prototype={$ich:1}
A.ci.prototype={}
A.hy.prototype={
p(a){return String(a)}}
A.eZ.prototype={
di(a,b){return a.createHTMLDocument(b)}}
A.dt.prototype={
p(a){var s,r,q,p=a.left
p.toString
s=a.top
s.toString
r=a.width
r.toString
q=a.height
q.toString
return"Rectangle ("+A.c(p)+", "+A.c(s)+") "+A.c(r)+" x "+A.c(q)},
a0(a,b){var s,r
if(b==null)return!1
if(t.eU.b(b)){s=a.left
s.toString
r=b.left
r.toString
if(s===r){s=a.top
s.toString
r=b.top
r.toString
if(s===r){s=a.width
s.toString
r=b.width
r.toString
if(s===r){s=a.height
s.toString
r=b.height
r.toString
r=s===r
s=r}else s=!1}else s=!1}else s=!1}else s=!1
return s},
gL(a){var s,r,q,p=a.left
p.toString
s=a.top
s.toString
r=a.width
r.toString
q=a.height
q.toString
return A.oH(p,s,r,q)},
$inD:1}
A.hz.prototype={
gm(a){return a.length},
q(a,b){return a.add(A.n(b))},
H(a,b){return a.remove(A.n(b))}}
A.eb.prototype={
l(a,b){return J.b1(this.b,b)},
gE(a){return this.a.firstElementChild==null},
gm(a){return this.b.length},
h(a,b){var s
A.i(b)
s=this.b
if(!(b>=0&&b<s.length))return A.b(s,b)
return t.h.a(s[b])},
k(a,b,c){var s
A.i(b)
t.h.a(c)
s=this.b
if(!(b>=0&&b<s.length))return A.b(s,b)
this.a.replaceChild(c,s[b])},
sm(a,b){throw A.e(A.K("Cannot resize element lists"))},
q(a,b){t.h.a(b)
this.a.appendChild(b)
return b},
gv(a){var s=this.a_(this)
return new J.b4(s,s.length,A.L(s).i("b4<1>"))},
a1(a,b){t.g0.a(b)
throw A.e(A.K("Cannot sort element lists"))},
ao(a,b){this.be(0,t.dB.a(b),!1)},
be(a,b,c){var s,r
t.dB.a(b)
s=J.qj(this.a)
r=A.x(s)
r.i("y(v.E)").a(b)
for(s=s.gv(s),r=new A.cx(s,b,r.i("cx<v.E>"));r.n();)J.eQ(s.gt())},
N(a,b,c,d,e){t.bq.a(d)
throw A.e(A.nI(null))},
ae(a,b,c,d){return this.N(a,b,c,d,0)},
H(a,b){return A.r8(this.a,b)},
u(a,b,c){var s,r=this,q=r.b,p=q.length
if(b>p)throw A.e(A.ab(b,0,r.gm(r),null,null))
s=r.a
if(b===p)s.appendChild(c)
else{if(!(b<p))return A.b(q,b)
J.ql(s,c,t.h.a(q[b]))}},
C(a){J.hl(this.a)}}
A.E.prototype={
gdc(a){return new A.fM(a)},
gc1(a){return new A.eb(a,a.children)},
p(a){return a.localName},
ab(a,b,c,d){var s,r,q,p
if(c==null){s=$.ov
if(s==null){s=A.o([],t.eO)
r=new A.dT(s)
B.a.q(s,A.oY(null))
B.a.q(s,A.p1())
$.ov=r
d=r}else d=s
s=$.ou
if(s==null){s=new A.ez(d)
$.ou=s
c=s}else{s.a=d
c=s}}if($.bO==null){s=document
r=s.implementation
r.toString
r=B.a5.di(r,"")
$.bO=r
$.nq=r.createRange()
r=$.bO.createElement("base")
t.cR.a(r)
s=s.baseURI
s.toString
r.href=s
$.bO.head.appendChild(r)}s=$.bO
if(s.body==null){r=s.createElement("body")
B.ac.sdd(s,t.a4.a(r))}s=$.bO
if(t.a4.b(a)){s=s.body
s.toString
q=s}else{s.toString
q=s.createElement(a.tagName)
$.bO.body.appendChild(q)}if("createContextualFragment" in window.Range.prototype&&!B.a.l(B.am,a.tagName)){$.nq.selectNodeContents(q)
s=$.nq
p=s.createContextualFragment(b)}else{J.qo(q,b)
p=$.bO.createDocumentFragment()
for(;s=q.firstChild,s!=null;)p.appendChild(s)}if(q!==$.bO.body)J.eQ(q)
c.by(p)
document.adoptNode(p)
return p},
dh(a,b,c){return this.ab(a,b,c,null)},
X(a,b){this.sj(a,null)
a.appendChild(this.ab(a,b,null,null))},
sbv(a,b){a.title=b},
scT(a,b){a.innerHTML=b},
gcf(a){return a.tagName},
$iE:1}
A.hA.prototype={
$1(a){return t.h.b(t.A.a(a))},
$S:22}
A.p.prototype={$ip:1}
A.O.prototype={
cJ(a,b,c,d){return a.addEventListener(b,A.df(t.bw.a(c),1),!1)},
$iO:1}
A.f1.prototype={
gm(a){return a.length}}
A.dA.prototype={}
A.bQ.prototype={
gm(a){return a.length},
h(a,b){A.i(b)
if(b>>>0!==b||b>=a.length)throw A.e(A.cS(b,a,null,null,null))
return a[b]},
k(a,b,c){A.i(b)
t.A.a(c)
throw A.e(A.K("Cannot assign element of immutable List."))},
sm(a,b){throw A.e(A.K("Cannot resize immutable List."))},
G(a,b){if(!(b>=0&&b<a.length))return A.b(a,b)
return a[b]},
$iA:1,
$iau:1,
$ik:1,
$iI:1,
$ibQ:1}
A.dB.prototype={
sdd(a,b){a.body=b}}
A.bR.prototype={
dv(a,b,c,d){return a.open(b,c,!0)},
$ibR:1}
A.hF.prototype={
$2(a,b){this.a.setRequestHeader(A.n(a),A.n(b))},
$S:9}
A.hG.prototype={
$1(a){var s,r,q,p,o
t.gZ.a(a)
s=this.a
r=s.status
r.toString
q=r>=200&&r<300
p=r>307&&r<400
r=q||r===0||r===304||p
o=this.b
if(r)o.bo(0,s)
else o.c2(a)},
$S:40}
A.dC.prototype={}
A.dD.prototype={$idD:1}
A.dE.prototype={
sbl(a,b){a.alt=b},
sb3(a,b){a.src=b}}
A.bS.prototype={
sds(a,b){a.max=b},
sdt(a,b){a.min=b},
sdI(a,b){a.type=b},
sI(a,b){a.value=b},
$ibS:1}
A.b5.prototype={$ib5:1}
A.dM.prototype={}
A.dO.prototype={
p(a){return String(a)},
$idO:1}
A.aG.prototype={$iaG:1}
A.av.prototype={
gap(a){var s=this.a,r=s.childNodes.length
if(r===0)throw A.e(A.ct("No elements"))
if(r>1)throw A.e(A.ct("More than one element"))
s=s.firstChild
s.toString
return s},
q(a,b){this.a.appendChild(t.A.a(b))},
T(a,b){var s,r,q,p,o
t.eh.a(b)
if(b instanceof A.av){s=b.a
r=this.a
if(s!==r)for(q=s.childNodes.length,p=0;p<q;++p){o=s.firstChild
o.toString
r.appendChild(o)}return}for(s=b.gv(b),r=this.a;s.n();)r.appendChild(s.gt())},
H(a,b){var s
if(!t.A.b(b))return!1
s=this.a
if(s!==b.parentNode)return!1
s.removeChild(b)
return!0},
be(a,b,c){var s,r,q
t.ae.a(b)
s=this.a
r=s.firstChild
for(;r!=null;r=q){q=r.nextSibling
if(J.q(b.$1(r),!0))s.removeChild(r)}},
ao(a,b){this.be(0,t.ae.a(b),!0)},
C(a){J.hl(this.a)},
k(a,b,c){var s,r
A.i(b)
t.A.a(c)
s=this.a
r=s.childNodes
if(!(b>=0&&b<r.length))return A.b(r,b)
s.replaceChild(c,r[b])},
gv(a){var s=this.a.childNodes
return new A.ck(s,s.length,A.P(s).i("ck<as.E>"))},
a1(a,b){t.b6.a(b)
throw A.e(A.K("Cannot sort Node list"))},
N(a,b,c,d,e){t.eh.a(d)
throw A.e(A.K("Cannot setRange on Node list"))},
ae(a,b,c,d){return this.N(a,b,c,d,0)},
gm(a){return this.a.childNodes.length},
sm(a,b){throw A.e(A.K("Cannot set length on immutable List."))},
h(a,b){var s
A.i(b)
s=this.a.childNodes
if(!(b>=0&&b<s.length))return A.b(s,b)
return s[b]}}
A.t.prototype={
D(a){var s=a.parentNode
if(s!=null)s.removeChild(a)},
dA(a,b){var s,r,q
try{r=a.parentNode
r.toString
s=r
J.qd(s,b,a)}catch(q){}return a},
a3(a){var s
for(;s=a.firstChild,s!=null;)a.removeChild(s)},
p(a){var s=a.nodeValue
return s==null?this.cq(a):s},
sj(a,b){a.textContent=b},
da(a,b){return a.appendChild(b)},
dq(a,b,c){return a.insertBefore(b,c)},
cZ(a,b,c){return a.replaceChild(b,c)},
$it:1}
A.dS.prototype={
gm(a){return a.length},
h(a,b){A.i(b)
if(b>>>0!==b||b>=a.length)throw A.e(A.cS(b,a,null,null,null))
return a[b]},
k(a,b,c){A.i(b)
t.A.a(c)
throw A.e(A.K("Cannot assign element of immutable List."))},
sm(a,b){throw A.e(A.K("Cannot resize immutable List."))},
G(a,b){if(!(b>=0&&b<a.length))return A.b(a,b)
return a[b]},
$iA:1,
$iau:1,
$ik:1,
$iI:1}
A.dV.prototype={}
A.dW.prototype={}
A.b8.prototype={$ib8:1}
A.dZ.prototype={
gm(a){return a.length},
sI(a,b){a.value=b}}
A.cr.prototype={$icr:1}
A.e1.prototype={
M(a,b){return a.getItem(b)!=null},
h(a,b){return a.getItem(A.n(b))},
k(a,b,c){a.setItem(A.n(b),A.n(c))},
H(a,b){var s
A.n(b)
s=a.getItem(b)
a.removeItem(b)
return s},
K(a,b){var s,r,q
t.eA.a(b)
for(s=0;!0;++s){r=a.key(s)
if(r==null)return
q=a.getItem(r)
q.toString
b.$2(r,q)}},
gO(a){var s=A.o([],t.s)
this.K(a,new A.i_(s))
return s},
gaf(a){var s=A.o([],t.s)
this.K(a,new A.i0(s))
return s},
gm(a){return a.length},
gE(a){return a.key(0)==null},
gP(a){return a.key(0)!=null},
$iz:1}
A.i_.prototype={
$2(a,b){return B.a.q(this.a,a)},
$S:9}
A.i0.prototype={
$2(a,b){return B.a.q(this.a,b)},
$S:9}
A.e4.prototype={
ab(a,b,c,d){var s,r
if("createContextualFragment" in window.Range.prototype)return this.b4(a,b,c,d)
s=A.qG("<table>"+b+"</table>",c,d)
r=document.createDocumentFragment()
new A.av(r).T(0,new A.av(s))
return r}}
A.fw.prototype={
ab(a,b,c,d){var s,r
if("createContextualFragment" in window.Range.prototype)return this.b4(a,b,c,d)
s=document
r=s.createDocumentFragment()
s=new A.av(B.U.ab(s.createElement("table"),b,c,d))
s=new A.av(s.gap(s))
new A.av(r).T(0,new A.av(s.gap(s)))
return r}}
A.fx.prototype={
ab(a,b,c,d){var s,r
if("createContextualFragment" in window.Range.prototype)return this.b4(a,b,c,d)
s=document
r=s.createDocumentFragment()
s=new A.av(B.U.ab(s.createElement("table"),b,c,d))
new A.av(r).T(0,new A.av(s.gap(s)))
return r}}
A.cZ.prototype={$icZ:1}
A.e6.prototype={
sI(a,b){a.value=b}}
A.bn.prototype={}
A.bZ.prototype={
d_(a,b){return a.requestAnimationFrame(A.df(t.d9.a(b),1))},
cQ(a){if(!!(a.requestAnimationFrame&&a.cancelAnimationFrame))return;(function(b){var s=["ms","moz","webkit","o"]
for(var r=0;r<s.length&&!b.requestAnimationFrame;++r){b.requestAnimationFrame=b[s[r]+"RequestAnimationFrame"]
b.cancelAnimationFrame=b[s[r]+"CancelAnimationFrame"]||b[s[r]+"CancelRequestAnimationFrame"]}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)},
aV(a,b){return a.alert(b)},
df(a,b){return a.confirm(b)},
co(a,b,c){this.d2(a,b,c)
return},
d2(a,b,c){return a.scrollTo(b,c)},
gbz(a){return"scrollY" in a?B.i.aO(a.scrollY):B.i.aO(a.document.documentElement.scrollTop)},
$ibZ:1,
$ii6:1}
A.bo.prototype={$ibo:1}
A.d0.prototype={$id0:1}
A.ed.prototype={
p(a){var s,r,q,p=a.left
p.toString
s=a.top
s.toString
r=a.width
r.toString
q=a.height
q.toString
return"Rectangle ("+A.c(p)+", "+A.c(s)+") "+A.c(r)+" x "+A.c(q)},
a0(a,b){var s,r
if(b==null)return!1
if(t.eU.b(b)){s=a.left
s.toString
r=b.left
r.toString
if(s===r){s=a.top
s.toString
r=b.top
r.toString
if(s===r){s=a.width
s.toString
r=b.width
r.toString
if(s===r){s=a.height
s.toString
r=b.height
r.toString
r=s===r
s=r}else s=!1}else s=!1}else s=!1}else s=!1
return s},
gL(a){var s,r,q,p=a.left
p.toString
s=a.top
s.toString
r=a.width
r.toString
q=a.height
q.toString
return A.oH(p,s,r,q)}}
A.em.prototype={
gm(a){return a.length},
h(a,b){A.i(b)
if(b>>>0!==b||b>=a.length)throw A.e(A.cS(b,a,null,null,null))
return a[b]},
k(a,b,c){A.i(b)
t.A.a(c)
throw A.e(A.K("Cannot assign element of immutable List."))},
sm(a,b){throw A.e(A.K("Cannot resize immutable List."))},
G(a,b){if(!(b>=0&&b<a.length))return A.b(a,b)
return a[b]},
$iA:1,
$iau:1,
$ik:1,
$iI:1}
A.fJ.prototype={
K(a,b){var s,r,q,p,o,n
t.eA.a(b)
for(s=this.gO(this),r=s.length,q=this.a,p=0;p<s.length;s.length===r||(0,A.N)(s),++p){o=s[p]
n=q.getAttribute(o)
b.$2(o,n==null?A.n(n):n)}},
gO(a){var s,r,q,p,o,n,m=this.a.attributes
m.toString
s=A.o([],t.s)
for(r=m.length,q=t.h9,p=0;p<r;++p){if(!(p<m.length))return A.b(m,p)
o=q.a(m[p])
if(o.namespaceURI==null){n=o.name
n.toString
B.a.q(s,n)}}return s},
gaf(a){var s,r,q,p,o,n,m=this.a.attributes
m.toString
s=A.o([],t.s)
for(r=m.length,q=t.h9,p=0;p<r;++p){if(!(p<m.length))return A.b(m,p)
o=q.a(m[p])
if(o.namespaceURI==null){n=o.value
n.toString
B.a.q(s,n)}}return s},
gE(a){return this.gO(this).length===0},
gP(a){return this.gO(this).length!==0}}
A.fM.prototype={
M(a,b){var s=this.a.hasAttribute(b)
return s},
h(a,b){return this.a.getAttribute(A.n(b))},
k(a,b,c){this.a.setAttribute(A.n(b),A.n(c))},
H(a,b){var s,r
if(typeof b=="string"){s=this.a
r=s.getAttribute(b)
s.removeAttribute(b)
s=r}else s=null
return s},
gm(a){return this.gO(this).length}}
A.nr.prototype={}
A.ef.prototype={}
A.d1.prototype={}
A.eg.prototype={}
A.ie.prototype={
$1(a){return this.a.$1(t.B.a(a))},
$S:5}
A.cA.prototype={
cD(a){var s
if($.fP.a===0){for(s=0;s<262;++s)$.fP.k(0,B.aj[s],A.ud())
for(s=0;s<12;++s)$.fP.k(0,B.H[s],A.ue())}},
av(a){return $.q7().l(0,A.dw(a))},
ag(a,b,c){var s=$.fP.h(0,A.dw(a)+"::"+b)
if(s==null)s=$.fP.h(0,"*::"+b)
if(s==null)return!1
return A.j2(s.$4(a,b,c,this))},
$ib7:1}
A.as.prototype={
gv(a){return new A.ck(a,this.gm(a),A.P(a).i("ck<as.E>"))},
q(a,b){A.P(a).i("as.E").a(b)
throw A.e(A.K("Cannot add to immutable List."))},
a1(a,b){A.P(a).i("f(as.E,as.E)?").a(b)
throw A.e(A.K("Cannot sort immutable List."))},
H(a,b){throw A.e(A.K("Cannot remove from immutable List."))},
ao(a,b){A.P(a).i("y(as.E)").a(b)
throw A.e(A.K("Cannot remove from immutable List."))},
N(a,b,c,d,e){A.P(a).i("k<as.E>").a(d)
throw A.e(A.K("Cannot setRange on immutable List."))},
ae(a,b,c,d){return this.N(a,b,c,d,0)}}
A.dT.prototype={
q(a,b){B.a.q(this.a,t.J.a(b))},
av(a){return B.a.Y(this.a,new A.hS(a))},
ag(a,b,c){return B.a.Y(this.a,new A.hR(a,b,c))},
$ib7:1}
A.hS.prototype={
$1(a){return t.J.a(a).av(this.a)},
$S:24}
A.hR.prototype={
$1(a){return t.J.a(a).ag(this.a,this.b,this.c)},
$S:24}
A.es.prototype={
cE(a,b,c,d){var s,r,q
this.a.T(0,c)
s=b.a8(0,new A.iF())
r=b.a8(0,new A.iG())
this.b.T(0,s)
q=this.c
q.T(0,B.an)
q.T(0,r)},
av(a){return this.a.l(0,A.dw(a))},
ag(a,b,c){var s,r=this,q=A.dw(a),p=r.c,o=q+"::"+b
if(p.l(0,o))return r.d.d9(c)
else{s="*::"+b
if(p.l(0,s))return r.d.d9(c)
else{p=r.b
if(p.l(0,o))return!0
else if(p.l(0,s))return!0
else if(p.l(0,q+"::*"))return!0
else if(p.l(0,"*::*"))return!0}}return!1},
$ib7:1}
A.iF.prototype={
$1(a){return!B.a.l(B.H,A.n(a))},
$S:11}
A.iG.prototype={
$1(a){return B.a.l(B.H,A.n(a))},
$S:11}
A.h4.prototype={
ag(a,b,c){if(this.cB(a,b,c))return!0
if(b==="template"&&c==="")return!0
if(a.getAttribute("template")==="")return this.e.l(0,b)
return!1}}
A.iH.prototype={
$1(a){return"TEMPLATE::"+A.n(a)},
$S:16}
A.h3.prototype={
av(a){var s
if(t.ew.b(a))return!1
s=t.g7.b(a)
if(s&&A.dw(a)==="foreignObject")return!1
if(s)return!0
return!1},
ag(a,b,c){if(b==="is"||B.b.ai(b,"on"))return!1
return this.av(a)},
$ib7:1}
A.ck.prototype={
n(){var s=this,r=s.c+1,q=s.b
if(r<q){s.sbR(J.a(s.a,r))
s.c=r
return!0}s.sbR(null)
s.c=q
return!1},
gt(){var s=this.d
return s==null?this.$ti.c.a(s):s},
sbR(a){this.d=this.$ti.i("1?").a(a)},
$iZ:1}
A.fL.prototype={$iO:1,$ii6:1}
A.fY.prototype={$ir3:1}
A.ez.prototype={
by(a){var s,r=new A.iN(this)
do{s=this.b
r.$2(a,null)}while(s!==this.b)},
aE(a,b){++this.b
if(b==null||b!==a.parentNode)J.eQ(a)
else b.removeChild(a)},
d1(a,b){var s,r,q,p,o,n=!0,m=null,l=null
try{m=J.qi(a)
l=m.a.getAttribute("is")
t.h.a(a)
s=function(c){if(!(c.attributes instanceof NamedNodeMap))return true
if(c.id=="lastChild"||c.name=="lastChild"||c.id=="previousSibling"||c.name=="previousSibling"||c.id=="children"||c.name=="children")return true
var k=c.childNodes
if(c.lastChild&&c.lastChild!==k[k.length-1])return true
if(c.children)if(!(c.children instanceof HTMLCollection||c.children instanceof NodeList))return true
var j=0
if(c.children)j=c.children.length
for(var i=0;i<j;i++){var h=c.children[i]
if(h.id=="attributes"||h.name=="attributes"||h.id=="lastChild"||h.name=="lastChild"||h.id=="previousSibling"||h.name=="previousSibling"||h.id=="children"||h.name=="children")return true}return false}(a)
n=A.am(s)?!0:!(a.attributes instanceof NamedNodeMap)}catch(p){}r="element unprintable"
try{r=J.m(a)}catch(p){}try{q=A.dw(a)
this.d0(t.h.a(a),b,n,r,q,t.f.a(m),A.ak(l))}catch(p){if(A.ag(p) instanceof A.b3)throw p
else{this.aE(a,b)
window
o=A.c(r)
if(typeof console!="undefined")window.console.warn("Removing corrupted element "+o)}}},
d0(a,b,c,d,e,f,g){var s,r,q,p,o,n,m,l=this
if(c){l.aE(a,b)
window
if(typeof console!="undefined")window.console.warn("Removing element due to corrupted attributes on <"+d+">")
return}if(!l.a.av(a)){l.aE(a,b)
window
s=A.c(b)
if(typeof console!="undefined")window.console.warn("Removing disallowed element <"+e+"> from "+s)
return}if(g!=null)if(!l.a.ag(a,"is",g)){l.aE(a,b)
window
if(typeof console!="undefined")window.console.warn("Removing disallowed type extension <"+e+' is="'+g+'">')
return}s=f.gO(f)
r=A.o(s.slice(0),A.L(s))
for(q=f.gO(f).length-1,s=f.a,p="Removing disallowed attribute <"+e+" ";q>=0;--q){if(!(q<r.length))return A.b(r,q)
o=r[q]
n=l.a
m=J.qv(o)
A.n(o)
if(!n.ag(a,m,A.n(s.getAttribute(o)))){window
n=s.getAttribute(o)
if(typeof console!="undefined")window.console.warn(p+o+'="'+A.c(n)+'">')
s.removeAttribute(o)}}if(t.aW.b(a)){s=a.content
s.toString
l.by(s)}},
$iqS:1}
A.iN.prototype={
$2(a,b){var s,r,q,p,o,n,m=this.a
switch(a.nodeType){case 1:m.d1(a,b)
break
case 8:case 11:case 3:case 4:break
default:m.aE(a,b)}s=a.lastChild
for(q=t.A;s!=null;){r=null
try{r=s.previousSibling
if(r!=null){p=r.nextSibling
o=s
o=p==null?o!=null:p!==o
p=o}else p=!1
if(p){p=A.ct("Corrupt HTML")
throw A.e(p)}}catch(n){p=q.a(s);++m.b
o=p.parentNode
if(a!==o){if(o!=null)o.removeChild(p)}else a.removeChild(p)
s=null
r=a.lastChild}if(s!=null)this.$2(s,a)
s=r}},
$S:69}
A.fK.prototype={}
A.fQ.prototype={}
A.fR.prototype={}
A.fV.prototype={}
A.fW.prototype={}
A.fZ.prototype={}
A.h8.prototype={}
A.h9.prototype={}
A.f0.prototype={
gau(){var s=this.b,r=A.x(s)
return new A.bB(new A.a_(s,r.i("y(v.E)").a(new A.hB()),r.i("a_<v.E>")),r.i("E(v.E)").a(new A.hC()),r.i("bB<v.E,E>"))},
k(a,b,c){var s
A.i(b)
t.h.a(c)
s=this.gau()
J.qn(s.b.$1(J.dk(s.a,b)),c)},
sm(a,b){var s=J.W(this.gau().a)
if(b>=s)return
else if(b<0)throw A.e(A.bv("Invalid list length",null))
this.dz(0,b,s)},
q(a,b){this.b.a.appendChild(t.h.a(b))},
l(a,b){if(!t.h.b(b))return!1
return b.parentNode===this.a},
a1(a,b){t.g0.a(b)
throw A.e(A.K("Cannot sort filtered list"))},
N(a,b,c,d,e){t.bq.a(d)
throw A.e(A.K("Cannot setRange on filtered list"))},
ae(a,b,c,d){return this.N(a,b,c,d,0)},
dz(a,b,c){var s=this.gau()
s=A.nE(s,b,s.$ti.i("k.E"))
B.a.K(A.a7(A.nG(s,c-b,A.x(s).i("k.E")),!0,t.z),new A.hD())},
C(a){J.hl(this.b.a)},
H(a,b){if(!t.h.b(b))return!1
if(this.l(0,b)){J.eQ(b)
return!0}else return!1},
gm(a){return J.W(this.gau().a)},
h(a,b){var s
A.i(b)
s=this.gau()
return s.b.$1(J.dk(s.a,b))},
gv(a){var s=A.a7(this.gau(),!1,t.h)
return new J.b4(s,s.length,A.L(s).i("b4<1>"))}}
A.hB.prototype={
$1(a){return t.h.b(t.A.a(a))},
$S:22}
A.hC.prototype={
$1(a){return t.h.a(t.A.a(a))},
$S:66}
A.hD.prototype={
$1(a){return J.eQ(a)},
$S:23}
A.dL.prototype={$idL:1}
A.js.prototype={
$1(a){var s
t.Y.a(a)
s=function(b,c,d){return function(){return b(c,d,this,Array.prototype.slice.apply(arguments))}}(A.rI,a,!1)
A.nQ(s,$.hj(),a)
return s},
$S:10}
A.jt.prototype={
$1(a){return new this.a(a)},
$S:10}
A.kc.prototype={
$1(a){return new A.bU(a==null?t.K.a(a):a)},
$S:63}
A.kd.prototype={
$1(a){var s=a==null?t.K.a(a):a
return new A.cm(s,t.am)},
$S:56}
A.ke.prototype={
$1(a){return new A.aE(a==null?t.K.a(a):a)},
$S:76}
A.aE.prototype={
h(a,b){if(typeof b!="string"&&typeof b!="number")throw A.e(A.bv("property is not a String or num",null))
return A.jr(this.a[b])},
k(a,b,c){t.K.a(b)
if(typeof b!="string"&&typeof b!="number")throw A.e(A.bv("property is not a String or num",null))
this.a[b]=A.hc(c)},
a0(a,b){if(b==null)return!1
return b instanceof A.aE&&this.a===b.a},
p(a){var s,r
try{s=String(this.a)
return s}catch(r){s=this.cA(0)
return s}},
aF(a,b){var s,r=this.a
if(b==null)s=null
else{s=A.L(b)
s=A.a7(new A.R(b,s.i("@(1)").a(A.pJ()),s.i("R<1,@>")),!0,t.z)}return A.jr(r[a].apply(r,s))},
bn(a){return this.aF(a,null)},
gL(a){return 0}}
A.bU.prototype={}
A.cm.prototype={
bM(a){var s=this,r=a<0||a>=s.gm(s)
if(r)throw A.e(A.ab(a,0,s.gm(s),null,null))},
h(a,b){if(A.d7(b))this.bM(b)
return this.$ti.c.a(this.aR(0,b))},
k(a,b,c){t.K.a(b)
if(A.d7(b))this.bM(b)
this.bC(0,b,c)},
gm(a){var s=this.a.length
if(typeof s==="number"&&s>>>0===s)return s
throw A.e(A.ct("Bad JsArray length"))},
sm(a,b){this.bC(0,"length",b)},
q(a,b){this.aF("push",[this.$ti.c.a(b)])},
N(a,b,c,d,e){var s,r,q,p=this,o=null
p.$ti.i("k<1>").a(d)
s=p.gm(p)
if(b>s)A.a5(A.ab(b,0,s,o,o))
if(c<b||c>s)A.a5(A.ab(c,b,s,o,o))
r=c-b
if(r===0)return
q=[b,r]
B.a.T(q,J.hp(d,e).a7(0,r))
p.aF("splice",q)},
ae(a,b,c,d){return this.N(a,b,c,d,0)},
a1(a,b){this.$ti.i("f(1,1)?").a(b)
this.aF("sort",b==null?[]:[b])},
$iA:1,
$ik:1,
$iI:1}
A.d3.prototype={
k(a,b,c){return this.cw(0,t.K.a(b),c)}}
A.iv.prototype={
ad(a){if(a<=0||a>4294967296)throw A.e(A.qX("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
du(){return Math.random()<0.5}}
A.cX.prototype={$icX:1}
A.u.prototype={
gc1(a){return new A.f0(a,new A.av(a))},
ab(a,b,c,d){var s,r,q,p,o=A.o([],t.eO)
B.a.q(o,A.oY(null))
B.a.q(o,A.p1())
B.a.q(o,new A.h3())
c=new A.ez(new A.dT(o))
o=document
s=o.body
s.toString
r=B.J.dh(s,'<svg version="1.1">'+b+"</svg>",c)
q=o.createDocumentFragment()
o=new A.av(r)
p=o.gap(o)
for(;o=p.firstChild,o!=null;)q.appendChild(o)
return q},
$iu:1}
A.an.prototype={
p(a){return"AppView."+this.b}}
A.jp.prototype={
$1(a){var s
A.bE(a)
$.nP=!1
s=$.o_
if(s!=null){$.bb=s
$.o_=null}A.aW()
A.o0()},
$S:54}
A.jf.prototype={
$2(a,b){A.i(a)
A.n(b)
return new A.U(B.f.p(a),b,t.gV)},
$S:52}
A.iS.prototype={
$2(a,b){var s,r,q=A.a4(A.n(a),null)
if(q!=null){s=$.cI
r=b==null?null:J.m(b)
s.k(0,q,r==null?"":r)}},
$S:25}
A.iT.prototype={
$2(a,b){return new A.U(J.m(a),B.i.R(A.bE(b)),t.b)},
$S:7}
A.iU.prototype={
$2(a,b){return new A.U(J.m(a),B.i.R(A.bE(b)),t.b)},
$S:7}
A.iV.prototype={
$2(a,b){return new A.U(J.m(a),B.i.R(A.bE(b)),t.b)},
$S:7}
A.iW.prototype={
$1(a){return B.i.R(A.bE(a))},
$S:27}
A.iX.prototype={
$1(a){return A.a7(J.b2(t.j.a(a),new A.iR(),t.z),!0,t.S)},
$S:44}
A.iR.prototype={
$1(a){return B.i.R(A.bE(a))},
$S:27}
A.iY.prototype={
$1(a){var s,r,q="commanderDamage",p="manaPool",o=t.N,n=t.z,m=A.ac(t.f.a(a),o,n),l=t.g.a(m.h(0,"cards"))
if(l==null)l=B.n
m.k(0,"cards",A.a7(J.b2(l,new A.iO(),n),!0,t.P))
l=t.U
s=l.a(m.h(0,q))
if(s==null)s=B.v
r=t.S
m.k(0,q,A.ac(J.dm(s,new A.iP(),n,n),r,r))
l=l.a(m.h(0,p))
if(l==null)l=B.v
m.k(0,p,A.ac(J.dm(l,new A.iQ(),n,n),o,r))
return m},
$S:8}
A.iO.prototype={
$1(a){return A.ac(t.f.a(a),t.N,t.z)},
$S:8}
A.iP.prototype={
$2(a,b){var s=A.a4(J.m(a),null)
if(s==null)s=0
return new A.U(s,B.i.R(A.bE(b)),t.b)},
$S:7}
A.iQ.prototype={
$2(a,b){return new A.U(J.m(a),B.i.R(A.bE(b)),t.b)},
$S:7}
A.iZ.prototype={
$1(a){return A.ac(t.f.a(a),t.N,t.z)},
$S:8}
A.j_.prototype={
$1(a){return t.e1.a(a).b===this.a},
$S:77}
A.j0.prototype={
$1(a){return t.dj.a(a)!=null},
$S:39}
A.j1.prototype={
$0(){return B.j},
$S:49}
A.jO.prototype={
$1(a){t.Q.a(a)
return a!=null&&A.d5(a,this.a,this.b)},
$S:41}
A.jP.prototype={
$0(){return null},
$S:4}
A.jQ.prototype={
$1(a){return A.ac(t.f.a(a),t.N,t.z)},
$S:8}
A.jJ.prototype={
$2(a,b){A.n(a)
A.i(b)
return 0},
$S:42}
A.jK.prototype={
$1(a){return!J.q(J.a(t.P.a(a),"eliminated"),!0)},
$S:2}
A.lk.prototype={
$1(a){t.V.a(a)
A.eE()
B.a.C($.ad)
$.X=0
$.ae=!1
A.D(B.j)},
$S:0}
A.ll.prototype={
$1(a){var s=J.j(a)
return J.q(s.h(a,"zone"),"battlefield")&&J.q(s.h(a,"type"),"creature")&&!J.q(s.h(a,"tapped"),!0)},
$S:3}
A.lm.prototype={
$1(a){return J.q(J.a(J.a(t.P.a(a),"card"),"id"),J.a(this.a,"id"))},
$S:2}
A.lo.prototype={
$1(a){var s,r,q,p,o,n,m,l
t.V.a(a)
for(s=$.a2,r=s.length,q=t.R,p=t.N,o=0;o<s.length;s.length===r||(0,A.N)(s),++o){n=s[o]
m=J.j(n)
l=J.a(m.h(n,"card"),"keywords")
if(!B.a.l(A.a7(q.a(l==null?[]:l),!0,p),"Vigilance"))J.S(m.h(n,"card"),"tapped",!0)}$.X=1
A.bu()},
$S:0}
A.lp.prototype={
$1(a){return A.i(J.a(t.P.a(a),"targetIdx"))},
$S:12}
A.lq.prototype={
$1(a){return J.q(J.a(t.P.a(a),"targetIdx"),this.a)},
$S:2}
A.lr.prototype={
$1(a){var s,r=J.j(a)
if(!J.q(r.h(a,"zone"),"battlefield")||!J.q(r.h(a,"type"),"creature")||J.q(r.h(a,"tapped"),!0))return!1
if(B.a.Y(this.a,new A.lj(a)))return!1
if(this.b){r=r.h(a,"keywords")
if(r==null)r=[]
s=A.a7(t.R.a(r),!0,t.N)
if(!B.a.l(s,"Flying")&&!B.a.l(s,"Reach"))return!1}return!0},
$S:3}
A.lj.prototype={
$1(a){return J.q(J.a(t.P.a(a),"id"),J.a(this.a,"id"))},
$S:2}
A.ls.prototype={
$1(a){t.V.a(a)
J.oh(t.j.a(J.a(this.a,"blockers")),new A.li(this.b))
A.bu()},
$S:0}
A.li.prototype={
$1(a){return J.q(J.a(a,"id"),J.a(this.a,"id"))},
$S:3}
A.lt.prototype={
$1(a){var s,r,q
t.V.a(a)
s=this.a.value
if(s==null)s=""
if(s.length===0)return
r=this.b
q=B.a.an(r,new A.lg(s),new A.lh(r))
J.F(t.j.a(J.a(this.c,"blockers")),A.ac(t.f.a(q),t.N,t.z))
A.bu()},
$S:0}
A.lg.prototype={
$1(a){var s=J.j(a),r=s.h(a,"id")
r=r==null?null:J.m(r)
s=r==null?s.h(a,"name"):r
return J.q(s,this.a)},
$S:3}
A.lh.prototype={
$0(){return B.a.gam(this.a)},
$S:46}
A.lu.prototype={
$1(a){var s,r,q,p,o,n
t.V.a(a)
for(s=$.a2,r=s.length,q=t.j,p=0;p<s.length;s.length===r||(0,A.N)(s),++p){o=s[p]
n=J.j(o)
J.S(n.h(o,"card"),"tapped",!1)
J.qh(q.a(n.h(o,"blockers")))}A.eE()
$.X=0
A.bu()},
$S:0}
A.lv.prototype={
$1(a){t.V.a(a)
A.o1()},
$S:0}
A.ln.prototype={
$1(a){t.V.a(a)
B.a.C($.ad)
$.X=0
$.ae=!1
A.bK(3,!0)
A.D(B.j)},
$S:0}
A.j6.prototype={
$1(a){var s,r
t.V.a(a)
s=this.a.value
r=A.a4(s==null?"":s,null)
if(r==null)r=-1
if(r<0)return
B.a.q($.a2,A.G(["card",this.b,"targetIdx",r,"blockers",A.o([],t.t)],t.N,t.z))
A.bu()},
$S:0}
A.j7.prototype={
$1(a){return J.q(J.a(J.a(t.P.a(a),"card"),"id"),J.a(this.a,"id"))},
$S:2}
A.j8.prototype={
$1(a){var s,r,q
t.V.a(a)
s=$.a2
r=this.a
q=A.L(s).i("y(1)").a(new A.j5(r))
if(!!s.fixed$length)A.a5(A.K("removeWhere"))
B.a.bV(s,q,!0)
J.S(r,"tapped",!1)
A.bu()},
$S:0}
A.j5.prototype={
$1(a){return J.q(J.a(J.a(t.P.a(a),"card"),"id"),J.a(this.a,"id"))},
$S:2}
A.jR.prototype={
$1(a){var s=t.g.a(J.a(t.P.a(a),"keywords"))
return J.b1(s==null?[]:s,"Deathtouch")},
$S:2}
A.jS.prototype={
$2(a,b){var s,r
A.i(a)
t.P.a(b)
s=J.j(b)
r=s.h(b,"toughness")
r=A.i(r==null?0:r)
s=s.h(b,"counters")
return a+r+A.i(s==null?0:s)},
$S:47}
A.kO.prototype={
$1(a){return!J.q(J.a(t.P.a(a),"eliminated"),!0)},
$S:2}
A.kP.prototype={
$1(a){return J.q(J.a(a,"zone"),"graveyard")},
$S:3}
A.kQ.prototype={
$2(a,b){var s
A.n(a)
A.i(b)
s=this.a
if(b>s.b){s.b=b
s.a=a}},
$S:13}
A.kR.prototype={
$2(a,b){var s
A.n(a)
A.i(b)
s=this.a
if(b>s.d){s.d=b
s.c=a}},
$S:13}
A.kS.prototype={
$2(a,b){var s,r,q
A.i(a)
A.i(b)
s=this.a
r=this.b
q=s.h(0,r)
s.k(0,r,(q==null?0:q)+b)},
$S:26}
A.kT.prototype={
$2(a,b){var s
A.n(a)
A.i(b)
s=this.a
if(b>s.f){s.f=b
s.e=a}},
$S:13}
A.kU.prototype={
$1(a){return A.n(J.a(t.P.a(a),"name"))},
$S:17}
A.lN.prototype={
$1(a){t.V.a(a)
B.e.D(this.a)
A.de()},
$S:0}
A.na.prototype={
$1(a){t.V.a(a)
B.e.D(this.a)
A.pP()},
$S:0}
A.nb.prototype={
$1(a){t.V.a(a)
B.e.D(this.a)
A.pF()},
$S:0}
A.l5.prototype={
$1(a){return A.ac(t.f.a(a),t.N,t.z)},
$S:8}
A.nk.prototype={
$1(a){var s,r,q,p="name"
$.H=a
$.b_=!0
$.b0=1
$.aA=0
B.a.C($.bL)
B.a.C($.bt)
$.cI.C(0)
$.bh=new A.aQ(Date.now(),!1)
s=$.d
r=$.H
if(!(r>=0&&r<s.length))return A.b(s,r)
r=A.c(J.a(s[r],p))
s=$.d
q=$.H
if(!(q>=0&&q<s.length))return A.b(s,q)
A.w(r+" goes first!",A.c(J.a(s[q],p))+" will take the first turn.")
s=$.ax
r=$.at
q=""+r
q=s?"Commander ("+q+" life)":"Normal ("+q+" life)"
s=s?"Commander":"Normal"
A.w("Format: "+q,"The game is starting in "+s+" format with "+r+" life each.")
A.ui()
r=document
s=r.querySelector("#setup-screen")
if(s!=null){s=s.style
s.display="none"}s=r.querySelector("#game-screen")
if(s!=null){s=s.style
s.display="block"}s=$.d
r=$.H
if(!(r>=0&&r<s.length))return A.b(s,r)
r=A.c(J.a(s[r],p))
s=$.d
q=$.H
if(!(q>=0&&q<s.length))return A.b(s,q)
A.w(r+" enters Draw phase",A.c(J.a(s[q],p))+" is now in the Draw phase.")
A.D(B.j)},
$S:64}
A.lU.prototype={
$0(){B.e.D(this.a)},
$S:4}
A.kj.prototype={
$1(a){t.V.a(a)
A.bp()
A.pF()},
$S:0}
A.kk.prototype={
$1(a){t.V.a(a)
A.bp()
A.pP()},
$S:0}
A.kl.prototype={
$1(a){t.V.a(a)
return A.uy()},
$S:0}
A.ku.prototype={
$1(a){t.V.a(a)
if(!A.pu(B.j)){A.w("No action to undo","There is no earlier game state to restore yet.")
A.D(B.j)}},
$S:0}
A.kv.prototype={
$1(a){var s,r
t.V.a(a)
s=!$.aY
$.aY=s
r=this.a
B.d.sj(r,s?"Explain: ON":"Explain: OFF")
r.className=$.aY?"btn-secondary btn-npm-on":"btn-secondary"},
$S:0}
A.kw.prototype={
$1(a){t.V.a(a)
return A.p7()},
$S:0}
A.kx.prototype={
$1(a){var s,r,q,p,o,n="isMonarch",m="name"
t.V.a(a)
s=this.a
r=J.j(s)
if(J.q(r.h(s,n),!0)){r.k(s,n,!1)
A.w(A.c(r.h(s,m))+" loses the Monarch",A.c(r.h(s,m))+" is no longer the Monarch.")}else{for(q=$.d,p=q.length,o=0;o<q.length;q.length===p||(0,A.N)(q),++o)J.S(q[o],n,!1)
r.k(s,n,!0)
A.w(A.c(r.h(s,m))+" becomes the Monarch",A.c(r.h(s,m))+" is now the Monarch.")}A.D(B.j)},
$S:0}
A.ky.prototype={
$1(a){var s,r,q,p,o,n="hasInitiative",m="name"
t.V.a(a)
s=this.a
r=J.j(s)
if(J.q(r.h(s,n),!0)){r.k(s,n,!1)
A.w(A.c(r.h(s,m))+" loses the Initiative",A.c(r.h(s,m))+" no longer has the Initiative.")}else{for(q=$.d,p=q.length,o=0;o<q.length;q.length===p||(0,A.N)(q),++o)J.S(q[o],n,!1)
r.k(s,n,!0)
A.w(A.c(r.h(s,m))+" takes the Initiative",A.c(r.h(s,m))+" now has the Initiative.")}A.D(B.j)},
$S:0}
A.kz.prototype={
$1(a){var s,r,q,p,o,n,m,l,k="life",j="name"
t.V.a(a)
s=$.bI
r=this.a
q=$.d
if(!(r<q.length))return A.b(q,r)
B.a.k(s,r,A.i(J.a(q[r],k)))
q=$.d
if(!(r<q.length))return A.b(q,r)
q=q[r]
s=J.j(q)
p=this.b
s.k(q,k,J.aZ(s.h(q,k),p))
A.eL(r,p)
s=p>0
if(s){q=$.aU
o=$.d
if(!(r<o.length))return A.b(o,r)
o=A.n(J.a(o[r],j))
n=$.aU
m=$.d
if(!(r<m.length))return A.b(m,r)
m=n.h(0,J.a(m[r],j))
n=m==null?0:m
if(typeof n!=="number")return n.J()
q.k(0,o,n+p)}q=$.bJ
if(r<q.length){q=q[r]
o=$.d
if(!(r<o.length))return A.b(o,r)
J.F(q,A.i(J.a(o[r],k)))}q=$.d
if(!(r<q.length))return A.b(q,r)
q=A.c(J.a(q[r],j))
o=s?"gains":"loses"
p=""+Math.abs(p)
n=$.d
if(!(r<n.length))return A.b(n,r)
n=A.c(J.a(n[r],k))
m=$.d
if(!(r<m.length))return A.b(m,r)
m=A.c(J.a(m[r],j))
s=s?"gained":"lost"
l=$.d
if(!(r<l.length))return A.b(l,r)
A.w(q+" "+o+" "+p+" life \u2192 "+n,m+" "+s+" "+p+" life. Now at "+A.c(J.a(l[r],k))+".")
A.be(r)
A.D(B.j)},
$S:0}
A.kA.prototype={
$1(a){var s,r,q,p,o
t.V.a(a)
s=$.bI
r=this.a
if(!(r<s.length))return A.b(s,r)
q=s[r]
p=$.d
if(!(r<p.length))return A.b(p,r)
B.a.k(s,r,A.i(J.a(p[r],"life")))
p=$.d
if(!(r<p.length))return A.b(p,r)
J.S(p[r],"life",q)
p=$.d
if(!(r<p.length))return A.b(p,r)
p=A.c(J.a(p[r],"name"))
s=A.c(q)
o=$.d
if(!(r<o.length))return A.b(o,r)
A.w(p+" life undone \u2192 "+s,A.c(J.a(o[r],"name"))+"'s life was undone to "+s+".")
A.D(B.j)},
$S:0}
A.kB.prototype={
$0(){var s="poison",r=this.a,q=J.j(r)
if(A.i(q.h(r,s))>0){q.k(r,s,J.dj(q.h(r,s),1))
A.D(B.j)}},
$S:1}
A.km.prototype={
$0(){var s="poison",r=this.a,q=J.j(r)
q.k(r,s,J.aZ(q.h(r,s),1))
A.w(A.c(q.h(r,"name"))+" gains 1 poison ("+A.c(q.h(r,s))+"/10)",A.c(q.h(r,"name"))+" now has "+A.c(q.h(r,s))+" poison counters. At 10 they lose.")
A.be(this.b)
A.D(B.j)},
$S:1}
A.kn.prototype={
$0(){var s="radiation",r=this.a,q=J.j(r),p=q.h(r,s)
if(J.nl(p==null?0:p,0)){q.k(r,s,J.dj(q.h(r,s),1))
A.D(B.j)}},
$S:1}
A.ko.prototype={
$0(){var s="radiation",r=this.a,q=J.j(r),p=q.h(r,s)
q.k(r,s,J.aZ(p==null?0:p,1))
A.D(B.j)},
$S:1}
A.kp.prototype={
$0(){var s="energy",r=this.a,q=J.j(r),p=q.h(r,s)
if(J.nl(p==null?0:p,0)){q.k(r,s,J.dj(q.h(r,s),1))
A.D(B.j)}},
$S:1}
A.kq.prototype={
$0(){var s=this.a,r=J.j(s),q=r.h(s,"energy")
r.k(s,"energy",J.aZ(q==null?0:q,1))
A.D(B.j)},
$S:1}
A.kr.prototype={
$0(){var s=this.a,r=J.j(s),q=r.h(s,"exp")
if(J.nl(q==null?0:q,0)){r.k(s,"exp",J.dj(r.h(s,"exp"),1))
A.D(B.j)}},
$S:1}
A.ks.prototype={
$0(){var s=this.a,r=J.j(s),q=r.h(s,"exp")
r.k(s,"exp",J.aZ(q==null?0:q,1))
A.D(B.j)},
$S:1}
A.kt.prototype={
$2(a,b){var s,r,q,p,o,n,m,l,k,j=this
A.i(a)
A.i(b)
s=document
r=s.createElement("div")
r.className="cmd-row"
q=s.createElement("span")
p=$.d
if(!(a>=0&&a<p.length))return A.b(p,a)
B.c.sj(q,"From "+A.c(J.a(p[a],"name")))
q.className="cmd-from"
r.appendChild(q)
q=s.createElement("span")
B.c.sj(q,""+b)
q.className="cmd-val"
r.appendChild(q)
o=s.createElement("div")
o.className="cmd-btns"
n=s.createElement("button")
B.d.sj(n,"\u2212")
n.className="cmd-btn"
q=t.C
p=j.a
m=q.i("~(1)?")
l=m.a(new A.kh(p,a))
t.Z.a(null)
q=q.c
A.l(n,"click",l,!1,q)
k=s.createElement("button")
B.d.sj(k,"+")
k.className="cmd-btn"
A.l(k,"click",m.a(new A.ki(p,a,j.b,j.c)),!1,q)
o.appendChild(n)
o.appendChild(k)
r.appendChild(o)
j.d.appendChild(r)},
$S:26}
A.kh.prototype={
$1(a){var s,r,q,p
t.V.a(a)
s=this.a
r=this.b
q=J.j(s)
p=q.h(s,r)
if(p==null)p=0
if(typeof p!=="number")return p.aB()
q.k(s,r,B.i.a4(p-1,0,999))
A.D(B.j)},
$S:0}
A.ki.prototype={
$1(a){var s,r,q,p,o,n,m,l,k=this,j="name"
t.V.a(a)
s=k.a
r=k.b
q=J.j(s)
p=q.h(s,r)
if(p==null)p=0
if(typeof p!=="number")return p.J()
q.k(s,r,p+1)
p=k.c
o=J.j(p)
n=A.c(o.h(p,j))
m=$.d
if(!(r>=0&&r<m.length))return A.b(m,r)
m=A.c(J.a(m[r],j))
l=A.c(q.h(s,r))
p=A.c(o.h(p,j))
s=A.c(q.h(s,r))
q=$.d
if(!(r<q.length))return A.b(q,r)
A.w(n+" takes cmd dmg from "+m+" ("+l+")",p+" has taken "+s+" total commander damage from "+A.c(J.a(q[r],j))+". At 21 they lose.")
A.be(k.d)
A.D(B.j)},
$S:0}
A.j9.prototype={
$1(a){t.V.a(a)
A.bp()
A.hi()},
$S:0}
A.ja.prototype={
$1(a){t.V.a(a)
A.bp()
A.cH()},
$S:0}
A.jb.prototype={
$1(a){t.V.a(a)
A.bp()
A.bK(2,!1)
A.bu()},
$S:0}
A.jc.prototype={
$1(a){t.V.a(a)
return A.uv()},
$S:0}
A.jd.prototype={
$1(a){t.V.a(a)
A.bp()
A.oa()},
$S:0}
A.je.prototype={
$1(a){t.V.a(a)
A.bp()
A.D(B.j)},
$S:0}
A.jh.prototype={
$1(a){t.V.a(a)
return this.a.$0()},
$S:0}
A.ji.prototype={
$1(a){t.V.a(a)
return this.a.$0()},
$S:0}
A.k4.prototype={
$1(a){var s,r,q,p,o
t.x.a(a)
s=t.D.a(document.querySelector("#timer-banner"))
if(s==null||$.bh==null)return
r=B.f.W(A.cj(Date.now()-$.bh.a).a,1e6)
q=B.f.W(r,60)
p=B.f.az(r,60)
o=q>0?"\u23f1 "+q+"m "+B.b.aN(B.f.p(p),2,"0")+"s":"\u23f1 "+p+"s";(s&&B.c).sj(s,o)},
$S:33}
A.jm.prototype={
$1(a){t.V.a(a)
A.bK(this.a,!0)
A.D(B.j)},
$S:0}
A.jj.prototype={
$1(a){var s
t.V.a(a)
s=this.a
return A.mk(null,s.length!==0?s:null,"Choose Effect Target")},
$S:0}
A.jk.prototype={
$1(a){t.V.a(a)
$.bc=null
A.D(B.j)},
$S:0}
A.l7.prototype={
$2(a,b){var s=$.d,r=this.a
if(!(r<s.length))return A.b(s,r)
J.S(J.a(s[r],"commanderDamage"),a,0)},
$S:15}
A.lL.prototype={
$2(a,b){var s,r,q=document,p=q.createElement("div")
p.className="dice-history-entry"
s=q.createElement("span")
B.c.sj(s,a)
s.className="dice-history-roll"
p.appendChild(s)
q=q.createElement("span")
B.c.sj(q,b)
q.className="dice-history-result"
p.appendChild(q)
q=this.a
s=q.children
new A.eb(q,s).u(0,1,p)
for(;s.length>7;){r=q.lastElementChild
if(r==null)A.a5(A.ct("No elements"))
q.removeChild(r)}},
$S:9}
A.lF.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j,i,h,g=this
t.V.a(a)
s=g.a.value
s=A.a4(s==null?"1":s,null)
r=B.f.a4(s==null?1:s,1,10)
s=g.b.value
q=A.a4(s==null?"0":s,null)
if(q==null)q=0
s=t.S
p=J.oz(r,s)
for(o=g.c,n=0;n<r;++n)p[n]=B.r.ad(o)+1
s=B.a.c5(p,0,new A.lC(),s)
if(typeof s!=="number")return s.J()
m=g.d
s=A.c(s+q)
B.c.sj(m,s)
l=r===1&&q===0
k=""+o
if(l)l="d"+k
else{l=q>=0?"+":"-"
l=A.c(r)+"d"+k+" "+l+" "+Math.abs(q)}B.c.sj(g.e,l)
j=B.a.c4(p,new A.lD(o))
i=B.a.c4(p,new A.lE())
m=m.style
if(j)o="#88ff88"
else o=i?"#ff6666":"#e2b96f"
m.color=o
o=q===0
if(o)h=B.a.V(p,", ")
else{m=B.a.V(p,", ")
l=q>=0?"+":"-"
h=m+" "+l+" "+Math.abs(q)}m=A.c(r)
g.f.$2(m+"d"+k,h+" = "+s)
k="Rolled "+m+"d"+k
if(o)m=""
else{m=""+q
if(q>=0)m="+"+m}if(o)o=""
else o=q>=0?" plus "+q:" minus "+Math.abs(q)
A.w(k+" "+m+" \u2192 "+s,k+o+" for a total of "+s+".")
A.aW()},
$S:0}
A.lC.prototype={
$2(a,b){return A.i(a)+A.i(b)},
$S:6}
A.lD.prototype={
$1(a){return A.i(a)===this.a},
$S:32}
A.lE.prototype={
$1(a){return A.i(a)===1},
$S:32}
A.lG.prototype={
$1(a){var s,r,q,p
t.V.a(a)
s=B.r.ad(100)+1
r=this.a
q=""+s
B.c.sj(r,q)
B.c.sj(this.b,"d100")
r=r.style
if(s>=95)p="#88ff88"
else p=s<=5?"#ff6666":"#e2b96f"
r.color=p
this.c.$2("d100",q)
A.w("Rolled d100 \u2192 "+q,"A d100 was rolled and landed on "+q+".")
A.aW()},
$S:0}
A.lH.prototype={
$1(a){var s,r,q,p="Heads",o="Tails"
t.V.a(a)
s=B.r.du()
r=this.a
B.c.sj(r,s?p:o)
r=r.style
q=s?"#e2b96f":"#aaaaff"
r.color=q
r=s?p:o
q=s?p:o
A.w("Coin flip \u2192 "+r,"The coin landed on "+q+".")
r=s?p:o
this.b.$2("Coin",r)
A.aW()},
$S:0}
A.lI.prototype={
$1(a){var s,r,q,p,o,n="name"
t.V.a(a)
s=A.o([],t.X)
for(r=0;q=$.d,r<q.length;++r)if(!J.q(J.a(q[r],"eliminated"),!0))B.a.q(s,r)
q=s.length
if(q===0)return
q=B.r.ad(q)
if(!(q>=0&&q<s.length))return A.b(s,q)
p=$.H=s[q]
$.aA=0
q=this.a
o=$.d
if(!(p<o.length))return A.b(o,p)
B.c.sj(q,A.ak(J.a(o[p],n)))
B.c.sj(this.b,"Active Player")
q=q.style
q.color="#c9a84c"
q=$.d
if(!(p<q.length))return A.b(q,p)
q=A.c(J.a(q[p],n))
o=$.d
if(!(p<o.length))return A.b(o,p)
A.w("Random player selected \u2192 "+q,A.c(J.a(o[p],n))+" was randomly chosen to act next.")
o=$.d
if(!(p<o.length))return A.b(o,p)
this.c.$2("Player",A.n(J.a(o[p],n)))
A.D(null)},
$S:0}
A.lJ.prototype={
$1(a){t.V.a(a)
return B.e.D(this.a)},
$S:0}
A.lK.prototype={
$1(a){var s=this.a
if(A.bG(t.V.a(a).target)===s)B.e.D(s)},
$S:0}
A.ju.prototype={
$2(a,b){return new A.U(J.m(a),B.i.R(A.bE(b)),t.b)},
$S:7}
A.jo.prototype={
$2(a,b){A.n(a)
A.i(b)
if(b>0)B.a.q(this.a,A.rO(a,b))},
$S:13}
A.ml.prototype={
$1(a){var s,r,q
t.P.a(a)
$.bc=a
s=A.c(a.h(0,"label"))
r=A.c(a.h(0,"label"))
q=this.a
q=q!=null&&q.length!==0?" for "+A.c(q):""
A.w("Target selected \u2192 "+s,r+" is now the active target"+q+".")
B.e.D(this.b)
A.D(null)},
$S:55}
A.mm.prototype={
$1(a){var s,r,q
t.V.a(a)
s=$.d
r=this.b
if(!(r<s.length))return A.b(s,r)
s=J.a(s[r],"name")
q=this.c
if(q==null)q=""
return this.a.$1(A.G(["kind","player","label",s,"source",q,"zone","Player","playerIndex",""+r],t.N,t.z))},
$S:0}
A.mn.prototype={
$1(a){var s,r,q,p,o,n=this
t.V.a(a)
s=n.b
r=J.j(s)
q=r.h(s,"name")
p=n.c
if(p==null)p=""
o=r.h(s,"id")
o=o==null?null:J.m(o)
s=o==null?r.h(s,"name"):o
return n.a.$1(A.G(["kind","card","label",q,"source",p,"zone",n.d,"playerIndex",""+n.e,"cardId",s],t.N,t.z))},
$S:0}
A.mo.prototype={
$1(a){t.V.a(a)
return B.e.D(this.a)},
$S:0}
A.mp.prototype={
$1(a){var s=this.a
if(A.bG(t.V.a(a).target)===s)B.e.D(s)},
$S:0}
A.lz.prototype={
$0(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b=this,a="counter-btn",a0=b.a
A.pt(a0)
B.h.sj(b.b,A.jn(a0))
s=b.c
B.e.a3(s)
r=A.eF(a0)
q=A.a8(B.al,!0,t.N)
for(p=A.oE(r,r.r,A.x(r).c);p.n();){o=p.d
if(!B.a.l(q,o))B.a.q(q,o)}for(p=q.length,o=t.C,n=o.i("~(1)?"),m=t.Z,o=o.c,l=0;l<q.length;q.length===p||(0,A.N)(q),++l){k=q[l]
j=r.h(0,k)
if(j==null)j=0
i=document
h=i.createElement("div")
h.className="counter-editor-row"
g=i.createElement("span")
B.c.sj(g,k)
g.className="counter-editor-type"
h.appendChild(g)
f=i.createElement("div")
f.className="counter-editor-controls"
e=i.createElement("button")
B.d.sj(e,"\u2212")
e.className=a
d=i.createElement("span")
B.c.sj(d,A.c(j))
d.className=j>0?"counter-val counter-val-active":"counter-val"
c=i.createElement("button")
B.d.sj(c,"+")
c.className=a
i=n.a(new A.lA(a0,k,b))
m.a(null)
A.l(e,"click",i,!1,o)
A.l(c,"click",n.a(new A.lB(a0,k,b)),!1,o)
f.appendChild(e)
f.appendChild(d)
f.appendChild(c)
h.appendChild(f)
s.appendChild(h)}},
$S:1}
A.lA.prototype={
$1(a){t.V.a(a)
A.ha(this.a,this.b,-1)
this.c.$0()},
$S:0}
A.lB.prototype={
$1(a){t.V.a(a)
A.ha(this.a,this.b,1)
this.c.$0()},
$S:0}
A.lw.prototype={
$1(a){var s,r,q
t.V.a(a)
s=this.a
r=s.value
q=B.b.B(r==null?"":r)
if(q.length===0)return
A.ha(this.b,q,1)
B.l.sI(s,"")
this.c.$0()},
$S:0}
A.lx.prototype={
$1(a){var s,r,q,p,o="name"
t.V.a(a)
s=$.d
r=this.a
if(!(r>=0&&r<s.length))return A.b(s,r)
q=this.b
p=J.j(q)
A.w(A.c(J.a(s[r],o))+" updated counters on "+A.c(p.h(q,o)),A.c(p.h(q,o))+" counters are now "+A.jn(q)+".")
B.e.D(this.c)
A.D(B.m)},
$S:0}
A.ly.prototype={
$1(a){var s=this.a
if(A.bG(t.V.a(a).target)===s)B.e.D(s)},
$S:0}
A.nj.prototype={
$2(a,b){A.w(a,b)
B.e.D(this.a)
A.D(B.m)},
$S:9}
A.nc.prototype={
$1(a){var s,r,q
t.V.a(a)
B.e.D(this.a)
s=this.b
r=J.j(s)
q=A.c(r.h(s,"name"))
s=r.h(s,"name")
s=s==null?null:J.m(s)
A.mk(this.c,s,"Choose Target for "+q)},
$S:0}
A.nd.prototype={
$1(a){var s,r,q,p,o="name"
t.V.a(a)
s=this.a
r=J.a0(s)
r.k(s,"zone","battlefield")
q=$.d
p=this.c
if(!(p>=0&&p<q.length))return A.b(q,p)
this.b.$2(A.c(J.a(q[p],o))+": "+A.c(r.h(s,o))+" returns to battlefield",A.c(r.h(s,o))+" returned to the battlefield.")},
$S:0}
A.ne.prototype={
$1(a){var s,r,q,p,o="name"
t.V.a(a)
s=this.a
r=J.a0(s)
r.k(s,"zone","exile")
r.k(s,"tapped",!1)
q=$.d
p=this.c
if(!(p>=0&&p<q.length))return A.b(q,p)
this.b.$2(A.c(J.a(q[p],o))+": "+A.c(r.h(s,o))+" \u2192 exile",A.c(r.h(s,o))+" was exiled.")},
$S:0}
A.nf.prototype={
$1(a){var s,r,q,p,o,n="name"
t.V.a(a)
s=$.d
r=this.a
if(!(r>=0&&r<s.length))return A.b(s,r)
q=this.b
J.eR(t.j.a(J.a(s[r],"cards")),q)
s=$.d
if(!(r<s.length))return A.b(s,r)
J.S(s[r],"handSize",A.bf(r)+1)
s=$.d
if(!(r<s.length))return A.b(s,r)
s=A.c(J.a(s[r],n))
p=J.j(q)
o=A.c(p.h(q,n))
q=A.c(p.h(q,n))
p=$.d
if(!(r<p.length))return A.b(p,r)
this.c.$2(s+": "+o+" returns to hand",q+" returned to "+A.c(J.a(p[r],n))+"'s hand.")},
$S:0}
A.ng.prototype={
$1(a){var s,r,q,p,o="name"
t.V.a(a)
s=$.d
r=this.a
if(!(r>=0&&r<s.length))return A.b(s,r)
q=this.b
J.eR(t.j.a(J.a(s[r],"cards")),q)
s=$.d
if(!(r<s.length))return A.b(s,r)
p=J.j(q)
this.c.$2(A.c(J.a(s[r],o))+": "+A.c(p.h(q,o))+" shuffled into library",A.c(p.h(q,o))+" was shuffled back into the library.")},
$S:0}
A.nh.prototype={
$1(a){t.V.a(a)
return B.e.D(this.a)},
$S:0}
A.ni.prototype={
$1(a){var s=this.a
if(A.bG(t.V.a(a).target)===s)B.e.D(s)},
$S:0}
A.n6.prototype={
$0(){var s,r=this,q=r.b,p=r.c,o=r.a,n=o.b
if(!(n<p.length))return A.b(p,n)
B.e.sj(q,A.ak(J.a(p[n],"name")))
q.classList.remove("highlight")
if(o.a>=17)q.classList.add("highlight")
n=o.b
s=p.length
o.b=(n+1)%s
if(++o.a<20)A.cR(B.a8,r,t.H)
else{o=r.d
if(!(o>=0&&o<s))return A.b(p,o)
B.e.sj(q,A.ak(J.a(p[o],"name")))
q.classList.add("winner")
A.cR(A.cj(800),new A.n8(r.e,r.f,o,r.r),t.a)}},
$S:1}
A.n8.prototype={
$0(){var s,r,q=this,p=document.createElement("button")
B.d.sj(p,"Start Game \u2192")
p.className="overlay-continue-btn"
s=t.C
r=s.i("~(1)?").a(new A.n7(q.a,q.b,q.c))
t.Z.a(null)
A.l(p,"click",r,!1,s.c)
q.d.appendChild(p)},
$S:4}
A.n7.prototype={
$1(a){t.V.a(a)
B.e.D(this.a)
this.b.$1(this.c)},
$S:0}
A.n9.prototype={
$1(a){var s=this.a
if(A.bG(t.V.a(a).target)===s)B.e.D(s)},
$S:0}
A.m0.prototype={
$1(a){$.eM=a},
$S:30}
A.m1.prototype={
$1(a){$.eN=a},
$S:30}
A.m2.prototype={
$1(a){t.V.a(a)
B.e.D(this.a)
A.de()},
$S:0}
A.m3.prototype={
$1(a){var s=this.a
if(A.bG(t.V.a(a).target)===s){B.e.D(s)
A.de()}},
$S:0}
A.jl.prototype={
$1(a){var s,r,q,p,o=this
t.V.a(a)
s=o.a
r=!s.a
s.a=r
o.b.$1(r)
q=o.c.style
p=s.a?"#e2b96f":"#2a2d3e"
q.background=p
q=o.d.style
s=s.a?"23px":"3px"
q.left=s},
$S:0}
A.mv.prototype={
$1(a){t.V.a(a)
return A.de()},
$S:0}
A.mw.prototype={
$1(a){var s=this.a.value
s=A.a4(s==null?"0":s,null)
$.a6=s==null?0:s
$.aB="battlefield"
A.cH()},
$S:5}
A.mu.prototype={
$2(a,b){var s,r,q,p=this,o="scryfall-preview"
t.P.a(a)
B.l.sI(p.b,b)
s=p.c.style
s.display="none"
p.a.a=a
a.k(0,"name",b)
s=document
r=t._.a(s.querySelector("#scryfall-preview"))
if(r!=null)B.e.D(r)
q=s.createElement("div")
q.id=o
q.className=o
s=s.createElement("span")
B.c.sj(s,"\u2713 Found: "+b)
B.y.sc3(s.style,"color:#88ff88;")
q.appendChild(s)
p.d.appendChild(q)},
$S:57}
A.mx.prototype={
$1(a){var s,r=this,q=$.o3
if(q!=null)q.aG()
q=r.a.value
s=q==null?null:B.b.B(q)
if(s==null)s=""
if(s.length<2){q=r.b.style
q.display="none"
return}$.o3=A.oS(B.aa,new A.mt(s,r.b,r.c))},
$S:5}
A.mt.prototype={
$0(){var s=0,r=A.c7(t.H),q,p=this,o,n,m,l,k,j,i,h,g,f,e,d,c
var $async$$0=A.c9(function(a,b){if(a===1)return A.c3(b,r)
while(true)switch(s){case 0:s=3
return A.c2(A.k1(p.a),$async$$0)
case 3:d=b
c=p.b
B.e.a3(c)
o=J.j(d)
if(o.gE(d)){c=c.style
c.display="none"
s=1
break}for(o=o.gv(d),n=t.C,m=p.c,l=n.i("~(1)?"),k=t.Z,n=n.c;o.n();){j=o.gt()
i=J.j(j)
h=i.h(j,"name")
g=h==null?null:J.m(h)
if(g==null)g=""
j=i.h(j,"type_line")
f=j==null?null:J.m(j)
if(f==null)f=""
j=document
e=j.createElement("div")
e.className="dropdown-item"
i=j.createElement("span")
B.c.sj(i,g)
i.className="dropdown-item-name"
e.appendChild(i)
j=j.createElement("span")
B.c.sj(j,f)
j.className="dropdown-item-type"
e.appendChild(j)
j=l.a(new A.mq(g,m))
k.a(null)
A.l(e,"click",j,!1,n)
c.appendChild(e)}c=c.style
c.display="block"
case 1:return A.c4(q,r)}})
return A.c5($async$$0,r)},
$S:67}
A.mq.prototype={
$1(a){return this.cl(t.V.a(a))},
cl(a){var s=0,r=A.c7(t.H),q=this,p,o,n
var $async$$1=A.c9(function(b,c){if(b===1)return A.c3(c,r)
while(true)switch(s){case 0:o=q.a
s=2
return A.c2(A.cF(o),$async$$1)
case 2:n=c
if(n!=null){p=A.hd(n)
p.k(0,"name",o)
q.b.$2(p,o)}return A.c4(null,r)}})
return A.c5($async$$1,r)},
$S:59}
A.mI.prototype={
$1(a){return this.cm(t.v.a(a))},
cm(a){var s=0,r=A.c7(t.H),q,p=this,o,n,m,l,k
var $async$$1=A.c9(function(b,c){if(b===1)return A.c3(c,r)
while(true)switch(s){case 0:s=a.keyCode===13?3:4
break
case 3:o=$.o3
if(o!=null)o.aG()
o=p.b.style
o.display="none"
o=p.c.value
n=o==null?null:B.b.B(o)
if(n==null)n=""
if(n.length===0){s=1
break}o=p.a
m=o.a
s=!(m!=null&&J.q(m.h(0,"name"),n))?5:6
break
case 5:s=7
return A.c2(A.cF(n),$async$$1)
case 7:l=c
if(l!=null){k=A.hd(l)
m=J.a(l,"name")
k.k(0,"name",m==null?n:m)
p.d.$2(k,A.n(k.h(0,"name")))
o.a=k}case 6:case 4:case 1:return A.c4(q,r)}})
return A.c5($async$$1,r)},
$S:60}
A.mT.prototype={
$1(a){var s,r,q,p,o,n,m,l,k="name",j="supertypes",i="keywords",h="triggers"
t.V.a(a)
s=this.b.value
r=s==null?null:B.b.B(s)
if(r==null)r=""
if(r.length===0)return
s=this.c.value
q=A.a4(s==null?"0":s,null)
if(q==null)q=0
$.a6=q
s=this.a
p=s.a
if(p!=null)p=J.q(p.h(0,k),r)||B.b.l(r.toLowerCase(),A.n(s.a.h(0,k)).toLowerCase())
else p=!1
o=t.N
n=t.z
if(p){p=s.a
p.toString
m=A.ac(p,o,n)}else m=A.G(["type","creature","subtype","","supertypes",[],"keywords",[],"oracleText","","triggers",[],"globalEffect",""],o,n)
p=Date.now()
m.k(0,"id",""+p+"_"+B.r.ad(9999))
p=m.h(0,k)
m.k(0,k,p==null?r:p)
m.k(0,"tapped",!1)
m.k(0,"zone","battlefield")
m.k(0,"counters",0)
m.k(0,"tempPtBonus",0)
if(m.h(0,i)==null)m.k(0,i,[])
if(m.h(0,j)==null)m.k(0,j,[])
if(m.h(0,h)==null)m.k(0,h,[])
p=$.d
if(!(q>=0&&q<p.length))return A.b(p,q)
J.F(J.a(p[q],"cards"),m)
p=$.aw
o=$.d
if(!(q<o.length))return A.b(o,q)
o=A.n(J.a(o[q],k))
n=$.aw
l=$.d
if(!(q<l.length))return A.b(l,q)
l=n.h(0,J.a(l[q],k))
n=l==null?0:l
if(typeof n!=="number")return n.J()
p.k(0,o,n+1)
A.di(q,1)
n=$.d
if(!(q<n.length))return A.b(n,q)
n=A.c(J.a(n[q],k))
o=A.c(m.h(0,k))
p=$.d
if(!(q<p.length))return A.b(p,q)
A.w(n+" played "+o,A.c(J.a(p[q],k))+" played "+A.c(m.h(0,k))+" onto the battlefield.")
s.a=null
$.aB="battlefield"
A.aW()
A.cH()},
$S:0}
A.n_.prototype={
$1(a){t.V.a(a)
return A.ux()},
$S:0}
A.n0.prototype={
$1(a){t.V.a(a)
return A.mk(null,null,"Choose Effect Target")},
$S:0}
A.n1.prototype={
$1(a){t.V.a(a)
$.bc=null
A.D(B.m)},
$S:0}
A.n2.prototype={
$1(a){t.V.a(a)
$.a6=this.a
$.aB="battlefield"
A.cH()},
$S:0}
A.n3.prototype={
$1(a){return J.q(J.a(a,"zone"),"battlefield")},
$S:3}
A.n4.prototype={
$1(a){return J.q(J.a(a,"zone"),"graveyard")},
$S:3}
A.my.prototype={
$1(a){return J.q(J.a(a,"zone"),"exile")},
$S:3}
A.mz.prototype={
$1(a){t.V.a(a)
$.aB=this.a
A.cH()},
$S:0}
A.mA.prototype={
$1(a){return J.q(J.a(a,"zone"),$.aB)},
$S:3}
A.mB.prototype={
$0(){return[]},
$S:61}
A.mC.prototype={
$1(a){return!B.a.l(B.P,A.n(a))},
$S:11}
A.mD.prototype={
$2(a,b){var s,r=J.a(a,"name")
r=J.m(r==null?"":r).toLowerCase()
s=J.a(b,"name")
return B.b.a5(r,J.m(s==null?"":s).toLowerCase())},
$S:18}
A.mE.prototype={
$1(a){var s,r
t.V.a(a)
s=this.a
r=J.j(s)
r.k(s,"tapped",!A.j2(r.h(s,"tapped")))
A.D(B.m)},
$S:0}
A.mF.prototype={
$1(a){t.V.a(a)
return A.ut(this.a,A.n(J.a(this.b,"name")))},
$S:0}
A.mG.prototype={
$1(a){var s,r,q,p,o,n,m,l,k=this
t.V.a(a)
s=document
r=s.createElement("div")
r.className="card-preview-tooltip"
q=k.a
q.a=r
p=A.nt()
B.w.sb3(p,k.b)
p.className="card-preview-image"
B.w.sbl(p,A.n(J.a(k.c,"name")))
q.a.appendChild(p)
s=s.body
s.toString
o=q.a
o.toString
s.appendChild(o)
n=k.d.getBoundingClientRect()
o=q.a.style
s=n.left
s.toString
m=window
m="scrollX" in m?B.i.aO(m.scrollX):B.i.aO(m.document.documentElement.scrollLeft)
l=n.width
l.toString
o.left=A.c(s+m+l/2-100)+"px"
s=q.a.style
o=n.top
o.toString
m=B.t.gbz(window)
s.top=A.c(o+m-220)+"px"
A.cR(A.cj(50),new A.ms(q),t.a)},
$S:0}
A.ms.prototype={
$0(){this.a.a.classList.add("show")},
$S:4}
A.mH.prototype={
$1(a){var s,r
t.V.a(a)
s=this.a
r=s.a
if(r!=null){r.classList.remove("show")
A.cR(A.cj(200),new A.mr(s),t.a)}},
$S:0}
A.mr.prototype={
$0(){var s=this.a.a
s.toString
B.e.D(s)},
$S:4}
A.mJ.prototype={
$1(a){var s,r,q,p
t.V.a(a)
s=t.P.a(this.a)
r=A.eF(s).h(0,"+1/+1")
if(r==null)r=0
if(typeof r!=="number")return r.S()
if(r>0){A.ha(s,"+1/+1",-1)
s=J.a(s,"counters")
q=A.i(s==null?0:s)
s=this.b
r=q>0
if(r){p=""+q
p="+"+p+"/+"+p}else p="0"
B.c.sj(s,p)
s.className=r?"counter-val counter-val-active":"counter-val"
A.D(B.m)}},
$S:0}
A.mK.prototype={
$1(a){var s,r
t.V.a(a)
s=t.P.a(this.a)
A.ha(s,"+1/+1",1)
r=this.b
s=""+A.i(J.a(s,"counters"))
B.c.sj(r,"+"+s+"/+"+s)
r.className="counter-val counter-val-active"
A.D(B.m)},
$S:0}
A.mL.prototype={
$1(a){t.V.a(a)
return A.uw(this.a)},
$S:0}
A.mM.prototype={
$0(){var s,r,q="name",p=this.a,o=J.a0(p)
o.k(p,"zone","graveyard")
o.k(p,"tapped",!1)
s=$.d
r=$.a6
if(!(r>=0&&r<s.length))return A.b(s,r)
A.w(A.c(J.a(s[r],q))+": "+A.c(o.h(p,q))+" \u2192 graveyard",A.c(o.h(p,q))+" was moved to the graveyard.")
A.D(B.m)},
$S:1}
A.mN.prototype={
$0(){var s,r,q="name",p=this.a,o=J.a0(p)
o.k(p,"zone","exile")
o.k(p,"tapped",!1)
s=$.d
r=$.a6
if(!(r>=0&&r<s.length))return A.b(s,r)
A.w(A.c(J.a(s[r],q))+": "+A.c(o.h(p,q))+" \u2192 exile",A.c(o.h(p,q))+" was exiled.")
A.D(B.m)},
$S:1}
A.mO.prototype={
$0(){var s,r,q="name",p=this.a,o=J.a0(p)
o.k(p,"zone","battlefield")
s=$.d
r=$.a6
if(!(r>=0&&r<s.length))return A.b(s,r)
A.w(A.c(J.a(s[r],q))+": "+A.c(o.h(p,q))+" returns",A.c(o.h(p,q))+" returned to the battlefield.")
A.D(B.m)},
$S:1}
A.mP.prototype={
$0(){J.S(this.a,"zone","exile")
A.D(B.m)},
$S:1}
A.mQ.prototype={
$0(){J.S(this.a,"zone","graveyard")
A.D(B.m)},
$S:1}
A.mR.prototype={
$1(a){var s,r,q
t.V.a(a)
s=this.a
if($.aB==="battlefield"){r=J.j(s)
q=A.c(r.h(s,"name"))
s=r.h(s,"name")
s=s==null?null:J.m(s)
A.mk($.a6,s,"Choose Target for "+q)}else A.uB(t.P.a(s),$.a6)},
$S:0}
A.mS.prototype={
$1(a){t.V.a(a)
return A.uu(t.P.a(this.a),$.a6)},
$S:0}
A.mU.prototype={
$1(a){t.V.a(a)
return A.us(t.P.a(this.a),$.a6)},
$S:0}
A.mV.prototype={
$1(a){var s,r
t.V.a(a)
s=$.d
r=$.a6
if(!(r>=0&&r<s.length))return A.b(s,r)
J.eR(J.a(s[r],"cards"),this.a)
A.D(B.m)},
$S:0}
A.n5.prototype={
$0(){var s,r,q,p,o,n=this.a.value,m=n==null?null:B.b.B(n)
if(m==null)m=""
n=this.b.value
s=n==null?null:B.b.B(n)
if(s==null)s=""
n=this.c.value
r=A.a4(n==null?"1":n,null)
if(r==null)r=1
if(m.length===0)return
if(r>1){n=s.length!==0?s+" ":""
q=""+r+"\xd7 "+n+m}else q=(s.length!==0?s+" ":"")+m
n=$.d
p=$.a6
if(!(p>=0&&p<n.length))return A.b(n,p)
J.F(J.a(n[p],"cards"),A.G(["id","token_"+Date.now(),"name",q,"type","creature","subtype","Token","supertypes",[],"keywords",[],"oracleText","","triggers",[],"globalEffect","","tapped",!1,"zone","battlefield","counters",0,"tempPtBonus",0,"isToken",!0],t.N,t.K))
p=$.d
n=$.a6
if(!(n>=0&&n<p.length))return A.b(p,n)
n=A.c(J.a(p[n],"name"))
p=$.d
o=$.a6
if(!(o>=0&&o<p.length))return A.b(p,o)
A.w(n+" creates "+q+" token",A.c(J.a(p[o],"name"))+" created a "+q+" token.")
$.aB="battlefield"
A.D(B.m)},
$S:1}
A.mW.prototype={
$1(a){if(t.v.a(a).keyCode===13)this.a.$0()},
$S:19}
A.mX.prototype={
$1(a){t.V.a(a)
return this.a.$0()},
$S:0}
A.mY.prototype={
$1(a){var s=$.cI,r=$.a6,q=this.a.value
s.k(0,r,q==null?"":q)},
$S:5}
A.mZ.prototype={
$0(){B.t.co(window,0,this.a)},
$S:4}
A.kf.prototype={
$1(a){t.V.a(a)
return this.a.$0()},
$S:0}
A.m_.prototype={
$0(){var s,r=this,q=r.a.value
if(q==null)q="creature"
s=r.b
if(q==="creature"){s.classList.remove("form-group-hidden")
r.c.classList.remove("form-group-hidden")}else{s.classList.add("form-group-hidden")
r.c.classList.add("form-group-hidden")}},
$S:1}
A.lW.prototype={
$1(a){return this.a.$0()},
$S:5}
A.lX.prototype={
$1(a){t.V.a(a)
return B.e.D(this.a)},
$S:0}
A.lY.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this,d=null,c="name"
t.V.a(a)
s=e.a.value
r=s==null?d:B.b.B(s)
if(r==null)r=""
if(r.length===0){B.t.aV(window,"Please enter a card name")
return}q=e.b.value
if(q==null)q="creature"
s=e.c.value
p=A.a4(s==null?"0":s,d)
if(p==null)p=0
s=e.d.value
o=A.a4(s==null?"0":s,d)
if(o==null)o=0
n=e.e.value
if(n==null)n="battlefield"
s=e.f.value
m=s==null?d:B.b.B(s)
if(m==null)m=""
s=t.s
l=A.o([],s)
k=e.r.value
j=k==null?d:B.b.B(k)
if(j==null)j=""
if(j.length!==0){k=t.I
l=A.a8(new A.R(A.o(j.split(","),s),t.u.a(new A.lV()),k),!0,k.i("Q.E"))}s=Date.now()
i=A.G(["id",""+s+"_"+B.r.ad(9999),"name",r,"type",q,"zone",n,"tapped",!1,"counters",0,"tempPtBonus",0,"subtype","","supertypes",[],"keywords",l,"oracleText","","triggers",[],"globalEffect","","manaCost",m,"isManualEntry",!0],t.N,t.K)
if(q==="creature"){i.k(0,"power",p)
i.k(0,"toughness",o)}s=$.d
k=$.a6
if(!(k>=0&&k<s.length))return A.b(s,k)
J.F(J.a(s[k],"cards"),i)
k=$.aw
s=$.d
h=$.a6
if(!(h>=0&&h<s.length))return A.b(s,h)
h=A.n(J.a(s[h],c))
s=$.aw
g=$.d
f=$.a6
if(!(f>=0&&f<g.length))return A.b(g,f)
f=s.h(0,J.a(g[f],c))
s=f==null?0:f
if(typeof s!=="number")return s.J()
k.k(0,h,s+1)
if(n==="battlefield"||n==="graveyard"||n==="exile"||n==="stack"||n==="command")A.di($.a6,1)
s=$.d
k=$.a6
if(!(k>=0&&k<s.length))return A.b(s,k)
k=A.c(J.a(s[k],c))
s=A.c(i.h(0,c))
h=$.d
g=$.a6
if(!(g>=0&&g<h.length))return A.b(h,g)
A.w(k+" manually added "+s,A.c(J.a(h[g],c))+" added "+A.c(i.h(0,c))+" to "+n+".")
A.aW()
B.e.D(e.w)
A.cH()},
$S:0}
A.lV.prototype={
$1(a){return B.b.B(A.n(a))},
$S:16}
A.lZ.prototype={
$1(a){var s=this.a
if(A.bG(t.V.a(a).target)===s)B.e.D(s)},
$S:0}
A.ld.prototype={
$0(){var s,r=this,q=r.a.value
if(q==null)q="creature"
s=r.b
if(q==="creature"){s.classList.remove("form-group-hidden")
r.c.classList.remove("form-group-hidden")}else{s.classList.add("form-group-hidden")
r.c.classList.add("form-group-hidden")}},
$S:1}
A.l9.prototype={
$1(a){return this.a.$0()},
$S:5}
A.la.prototype={
$1(a){t.V.a(a)
return B.e.D(this.a)},
$S:0}
A.lb.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j,i,h,g=this,f=null,e="name"
t.V.a(a)
s=g.a.value
r=s==null?f:B.b.B(s)
if(r==null)r=""
if(r.length===0){B.t.aV(window,"Please enter a card name")
return}q=g.b.value
if(q==null)q="creature"
s=g.c.value
p=A.a4(s==null?"0":s,f)
if(p==null)p=0
s=g.d.value
o=A.a4(s==null?"0":s,f)
if(o==null)o=0
n=g.e.value
if(n==null)n="battlefield"
s=g.f.value
m=s==null?f:B.b.B(s)
if(m==null)m=""
s=t.s
l=A.o([],s)
k=g.r.value
j=k==null?f:B.b.B(k)
if(j==null)j=""
if(j.length!==0){k=t.I
l=A.a8(new A.R(A.o(j.split(","),s),t.u.a(new A.l8()),k),!0,k.i("Q.E"))}s=g.w
k=J.a0(s)
k.k(s,e,r)
k.k(s,"type",q)
k.k(s,"zone",n)
k.k(s,"manaCost",m)
k.k(s,"keywords",l)
if(q==="creature"){k.k(s,"power",p)
k.k(s,"toughness",o)}i=$.d
h=g.x
if(!(h>=0&&h<i.length))return A.b(i,h)
A.w(A.c(J.a(i[h],e))+": "+A.c(k.h(s,e))+" edited","Card properties updated.")
A.aW()
B.e.D(g.y)
A.cH()},
$S:0}
A.l8.prototype={
$1(a){return B.b.B(A.n(a))},
$S:16}
A.lc.prototype={
$1(a){var s=this.a
if(A.bG(t.V.a(a).target)===s)B.e.D(s)},
$S:0}
A.lS.prototype={
$1(a){t.V.a(a)
return B.e.D(this.a)},
$S:0}
A.lT.prototype={
$1(a){var s=this.a
if(A.bG(t.V.a(a).target)===s)B.e.D(s)},
$S:0}
A.le.prototype={
$1(a){t.V.a(a)
return B.e.D(this.a)},
$S:0}
A.lf.prototype={
$1(a){var s=this.a
if(A.bG(t.V.a(a).target)===s)B.e.D(s)},
$S:0}
A.lO.prototype={
$1(a){t.V.a(a)
return A.de()},
$S:0}
A.lP.prototype={
$1(a){t.V.a(a)
$.aY=!1
A.hi()},
$S:0}
A.lQ.prototype={
$1(a){t.V.a(a)
$.aY=!0
A.hi()},
$S:0}
A.lR.prototype={
$1(a){t.V.a(a)
B.a.C($.bL)
B.a.C($.bt)
A.hi()},
$S:0}
A.m4.prototype={
$1(a){t.V.a(a)
return A.de()},
$S:0}
A.m5.prototype={
$1(a){var s=A.aT(J.a(t.P.a(a),"turns"))
return s==null?0:s},
$S:12}
A.m6.prototype={
$2(a,b){return A.i(a)+A.i(b)},
$S:6}
A.mc.prototype={
$2(a,b){var s,r=t.q
r.a(a)
r.a(b)
r=a.b
s=b.b
if(typeof r!=="number")return r.S()
if(typeof s!=="number")return A.kX(s)
return r>s?a:b},
$S:21}
A.md.prototype={
$1(a){var s=A.aT(J.a(t.P.a(a),"turns"))
return s==null?0:s},
$S:12}
A.me.prototype={
$2(a,b){A.i(a)
A.i(b)
return a>b?a:b},
$S:6}
A.mf.prototype={
$1(a){var s=A.aT(J.a(t.P.a(a),"turns"))
return s==null?0:s},
$S:12}
A.mg.prototype={
$2(a,b){A.i(a)
A.i(b)
return a<b?a:b},
$S:6}
A.mh.prototype={
$1(a){return A.aT(J.a(t.P.a(a),"turns"))===this.a},
$S:2}
A.mi.prototype={
$1(a){return A.aT(J.a(t.P.a(a),"turns"))===this.a},
$S:2}
A.mj.prototype={
$1(a){return A.aT(J.a(t.P.a(a),"turns"))===this.a},
$S:2}
A.m7.prototype={
$1(a){return A.aT(J.a(t.P.a(a),"turns"))===this.a},
$S:2}
A.m8.prototype={
$2(a,b){var s,r=t.q
r.a(a)
r.a(b)
r=a.b
s=b.b
if(typeof r!=="number")return r.S()
if(typeof s!=="number")return A.kX(s)
return r>s?a:b},
$S:21}
A.m9.prototype={
$1(a){return A.nV(t.P.a(a))},
$S:2}
A.ma.prototype={
$2(a,b){var s,r,q,p=t.q
p.a(a)
p.a(b)
p=this.a
s=p.h(0,a.a)
if(s==null)s=0
r=a.b
if(typeof s!=="number")return s.bx()
if(typeof r!=="number")return A.kX(r)
p=p.h(0,b.a)
if(p==null)p=0
q=b.b
if(typeof p!=="number")return p.bx()
if(typeof q!=="number")return A.kX(q)
return B.i.a5(p/q,s/r)},
$S:65}
A.mb.prototype={
$1(a){t.V.a(a)
if(B.t.df(window,"Clear all game history?")){B.B.H(window.localStorage,"mtg_game_history")
A.oa()}},
$S:0}
A.jG.prototype={
$2(a,b){A.i(a)
A.i(b)
return a>b?a:b},
$S:6}
A.jH.prototype={
$2(a,b){A.i(a)
A.i(b)
return a<b?a:b},
$S:6}
A.jE.prototype={
$2(a,b){A.i(a)
A.i(b)
return a>b?a:b},
$S:6}
A.jF.prototype={
$2(a,b){A.i(a)
A.i(b)
return a<b?a:b},
$S:6}
A.k2.prototype={
$1(a){return A.ac(t.f.a(a),t.N,t.z)},
$S:8}
A.jM.prototype={
$1(a){return J.m(a)},
$S:28}
A.jN.prototype={
$1(a){return J.m(a)},
$S:28}
A.kN.prototype={
$0(){var s=t.G.a(document.querySelector("#custom-life-input"))
if(s!=null)B.l.sI(s,$.ax?"40":"20")},
$S:1}
A.kH.prototype={
$1(a){t.V.a(a)
$.ax=!1
$.at=20
this.a.className="fmt-opt fmt-opt-active"
this.b.className="fmt-opt"
this.c.$0()
A.hf(A.pd())},
$S:0}
A.kI.prototype={
$1(a){t.V.a(a)
$.ax=!0
$.at=40
this.a.className="fmt-opt"
this.b.className="fmt-opt fmt-opt-active"
this.c.$0()
A.hf(A.pd())},
$S:0}
A.kJ.prototype={
$1(a){var s=this.a.value,r=A.a4(s==null?"40":s,null)
if(r==null)r=40
if(r>0)$.at=r},
$S:5}
A.kK.prototype={
$1(a){var s,r,q
t.V.a(a)
s=this.a
r=s.value
q=A.a4(r==null?"2":r,null)
if(q==null)q=2
if(q>2){--q
r=""+q
B.l.sI(s,r)
B.e.sj(this.b,r+" players")
A.hf(q)}},
$S:0}
A.kL.prototype={
$1(a){var s,r,q
t.V.a(a)
s=this.a
r=s.value
q=A.a4(r==null?"2":r,null)
if(q==null)q=2
if(q<6){++q
r=""+q
B.l.sI(s,r)
B.e.sj(this.b,r+" players")
A.hf(q)}},
$S:0}
A.kM.prototype={
$1(a){t.V.a(a)
return A.ob()},
$S:0}
A.kC.prototype={
$1(a){var s,r,q,p,o=this.a.value,n=o==null?null:B.b.B(o)
if(n==null)n=""
o=this.b
s=""+o
r=document
q=t.D.a(r.querySelector("#preview-"+s))
if(q!=null)B.c.sj(q,n.length===0?"Player "+(o+1):n)
p=t._.a(r.querySelector("#avatar-"+s))
if(p!=null)B.e.sj(p,n.length===0?"?":B.b.F(n,0,1).toUpperCase())},
$S:5}
A.kD.prototype={
$1(a){var s,r,q
if(t.v.a(a).keyCode===13){s=this.a
r=t.G
if($.ax){s=r.a(document.querySelector("#commander-name-"+(s+1)))
if(s!=null)s.focus()}else{q=r.a(document.querySelector("#player-name-"+(s+2)))
if(q!=null)q.focus()
else A.ob()}}},
$S:19}
A.kE.prototype={
$1(a){var s=this.a.value,r=s==null?null:B.b.B(s)
if(r==null)r=""
s=t.D.a(document.querySelector("#preview-sub-"+this.b))
if(s!=null)B.c.sj(s,r.length===0?"tap to edit":r)},
$S:5}
A.kF.prototype={
$1(a){var s
if(t.v.a(a).keyCode===13){s=t.G.a(document.querySelector("#player-name-"+(this.a+2)))
if(s!=null)s.focus()
else A.ob()}},
$S:19}
A.kG.prototype={
$1(a){var s,r,q,p
t.V.a(a)
s=this.a
r=!s.a
s.a=r
q=this.b.style
p=r?"flex":"none"
q.display=p
q=t.D.a(document.querySelector("#chevron-"+this.c))
if(q!=null)B.c.sj(q,s.a?"\u25bc":"\u25b6")},
$S:0}
A.k_.prototype={
$1(b2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8="keywords",a9="name",b0="commanderDamage",b1=t.P
b1.a(b2)
s=A.o([],t.t)
for(l=J.j(b2),k=t.j,j=J.T(k.a(l.h(b2,"cards"))),i=t.N,h=t.z;j.n();){r=j.gt()
q=A.tg(b1.a(r))
p=A.td(b1.a(r))
o=null
g=J.a(r,a8)
n=k.a(g==null?[]:g)
if(J.b1(n,"Lifelink")||J.b1(n,"Vigilance"))o="rgba(201,168,76,0.4)"
else if(J.b1(n,"Flying")||J.b1(n,"Reach"))o="rgba(100,140,255,0.35)"
else if(J.b1(n,"Deathtouch"))o="rgba(160,80,255,0.35)"
g=J.a(r,"id")
if(g==null)g=J.a(r,a9)
f=J.a(r,a9)
if(f==null)f=""
e=J.a(r,"type")
if(e==null)e="creature"
d=J.a(r,"zone")
if(d==null)d="battlefield"
c=J.a(r,"tapped")
if(c==null)c=!1
b=J.a(r,"damage")
if(b==null)b=0
a=J.a(r,"power")
a0=J.a(r,"toughness")
a1=J.a(r,a8)
if(a1==null)a1=[]
a2=J.a(r,"counters")
if(a2==null)a2=0
a3=J.a(r,"imageUrl")
if(a3==null)a3=""
a4=J.a(r,"manaCost")
if(a4==null)a4=""
a5=J.a(r,"oracleText")
if(a5==null)a5=""
a6=o
a7=J.a(r,"attacking")
if(a7==null)a7=!1
J.F(s,A.G(["id",g,"name",f,"type",e,"zone",d,"tapped",c,"damage",b,"power",a,"toughness",a0,"keywords",a1,"counters",a2,"imageUrl",a3,"manaCost",a4,"oracleText",a5,"landColor",q,"art",p,"glowColor",a6,"attacking",a7],i,h))}m=A.Y(i,h)
if(l.h(b2,b0)!=null)J.dl(t.f.a(l.h(b2,b0)),new A.jZ(m))
b1=l.h(b2,a9)
if(b1==null)b1=""
k=l.h(b2,"commander")
if(k==null)k=""
j=l.h(b2,"life")
if(j==null)j=20
g=l.h(b2,"handSize")
if(g==null)g=7
f=l.h(b2,"poison")
if(f==null)f=0
e=l.h(b2,"eliminated")
if(e==null)e=!1
d=l.h(b2,"isMonarch")
if(d==null)d=!1
l=l.h(b2,"hasInitiative")
if(l==null)l=!1
return A.G(["name",b1,"commander",k,"life",j,"handSize",g,"poison",f,"eliminated",e,"isMonarch",d,"hasInitiative",l,"commanderDamage",m,"cards",s],i,h)},
$S:20}
A.jZ.prototype={
$2(a,b){this.a.k(0,J.m(a),b)},
$S:15}
A.k0.prototype={
$1(a){var s,r,q,p,o,n,m,l,k="name",j=t.P
j.a(a)
q=J.j(a)
s=j.a(q.h(a,"card"))
p=t.g.a(q.h(a,"blockers"))
r=A.a7(p==null?[]:p,!0,j)
j=$.d
p=$.H
if(!(p>=0&&p<j.length))return A.b(j,p)
p=J.a(j[p],k)
j=p==null?"":p
p=J.a(s,"id")
if(p==null)p=J.a(s,k)
o=J.a(s,k)
if(o==null)o=""
n=$.d
q=A.i(q.h(a,"targetIdx"))
if(!(q>=0&&q<n.length))return A.b(n,q)
q=J.a(n[q],k)
if(q==null)q=""
n=r
m=A.P(n)
l=m.i("R<1,z<h,@>>")
return A.G(["player",j,"cardId",p,"cardName",o,"defenderPlayer",q,"blockers",A.a8(new A.R(n,m.i("z<h,@>(1)").a(new A.jY()),l),!0,l.i("Q.E"))],t.N,t.z)},
$S:20}
A.jY.prototype={
$1(a){var s,r,q,p="name"
t.P.a(a)
s=J.a(B.a.an($.d,new A.jW(a),new A.jX()),p)
if(s==null)s=""
r=J.j(a)
q=r.h(a,"id")
if(q==null)q=r.h(a,p)
r=r.h(a,p)
return A.G(["player",s,"cardId",q,"cardName",r==null?"":r],t.N,t.z)},
$S:20}
A.jW.prototype={
$1(a){return J.qf(t.j.a(J.a(t.P.a(a),"cards")),new A.jV(this.a))},
$S:2}
A.jV.prototype={
$1(a){var s,r,q=J.j(a),p=q.h(a,"id")
p=p==null?null:J.m(p)
q=p==null?q.h(a,"name"):p
p=this.a
s=J.j(p)
r=s.h(p,"id")
r=r==null?null:J.m(r)
return J.q(q,r==null?s.h(p,"name"):r)},
$S:3}
A.jX.prototype={
$0(){return A.G(["name",""],t.N,t.z)},
$S:68}
A.k5.prototype={
$1(a){t.x.a(a)
A.tB()},
$S:33}
A.jv.prototype={
$1(a){var s,r,q,p=t.P
p=p.a(J.a(p.a(a),"card"))
s=this.a
r=J.j(s)
q=r.h(s,"id")
q=q==null?null:J.m(q)
if(q==null)q=""
s=r.h(s,"name")
s=s==null?null:J.m(s)
return A.d5(p,q,s==null?"":s)},
$S:2}
A.jw.prototype={
$1(a){var s,r,q
t.P.a(a)
s=this.a
r=J.j(s)
q=r.h(s,"id")
q=q==null?null:J.m(q)
if(q==null)q=""
s=r.h(s,"name")
s=s==null?null:J.m(s)
return A.d5(a,q,s==null?"":s)},
$S:3}
A.l0.prototype={
$0(){var s,r
$.dc=!0
A.pv()
s="\ud83c\udfa4 Listening..."
if($.ae){r=$.X
if(r===0)s=J.aZ(s,' Say "pass" when ready to declare attackers')
else if(r===1)s=J.aZ(s,' Say "pass blockers" or "proceed" to advance')
else if(r===2)s=J.aZ(s,' Say "resolve" to resolve combat')}else s=J.aZ(s,' Try: "Kai loses 5 life" or "attack for 3"')
B.a.u($.C,0,s)
A.J()},
$S:4}
A.l1.prototype={
$0(){$.dc=!1
A.pv()
A.J()},
$S:4}
A.l2.prototype={
$1(a){var s=t.hb.a(a).h(0,"error"),r=s==null?null:J.m(s),q=r==null?"unknown":r
B.a.u($.C,0,"\u274c Error: "+A.c(q))
A.J()},
$S:35}
A.l3.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=null
t.hb.a(a)
s=""
r=!1
q=A.i(a.h(0,"resultIndex"))
l=t.am
p=l.a(a.h(0,"results"))
o=q
k=t.K
while(!0){j=o
i=J.W(p)
if(typeof j!=="number")return j.dM()
if(!(j<i))break
j=p
i=k.a(o)
if(A.d7(i)){h=i<0||i>=J.W(j)
if(h)A.a5(A.ab(i,0,J.W(j),f,f))}n=l.a(A.P(j).c.a(J.j(j).aR(j,i)))
j=n
i=0>=J.W(j)
if(i)A.a5(A.ab(0,0,J.W(j),f,f))
j=J.a(A.P(j).c.a(J.j(j).aR(j,0)),"transcript")
g=j==null?f:J.m(j)
m=g==null?"":g
s=J.aZ(s,m)
j=n
if(J.q(A.P(j).c.a(J.j(j).aR(j,"isFinal")),!0))r=!0
j=o
if(typeof j!=="number")return j.J()
o=j+1}if(J.W(s)!==0){A.rS(J.cJ(s))
if(A.am(r))A.tx(J.cJ(s))}},
$S:35}
A.k3.prototype={
$1(a){t.V.a(a)
A.bg("Voice button clicked")
$.hk().bn("toggleInputPanel")
A.uG()},
$S:0}
A.jI.prototype={
$2(a,b){A.i(a)
A.i(b)
return a<b?a:b},
$S:6}
A.k8.prototype={
$1(a){return A.n(J.a(t.P.a(a),"name")).toLowerCase()},
$S:17}
A.jC.prototype={
$1(a){A.n(a)
return!B.a.l(A.o(["the","a","an","onto","battlefield"],t.s),a)},
$S:11}
A.jx.prototype={
$1(a){A.n(a)
if(a.length!==0)B.a.q(this.a,B.b.B(a))},
$S:70}
A.jy.prototype={
$1(a){var s=J.j(a)
return J.q(s.h(a,"zone"),"battlefield")&&J.q(s.h(a,"type"),"creature")&&!J.q(s.h(a,"tapped"),!0)},
$S:3}
A.jz.prototype={
$1(a){var s=J.a(t.P.a(a),"id"),r=this.a.a
r.toString
return J.q(s,J.a(r,"id"))},
$S:2}
A.jA.prototype={
$1(a){return J.a(t.P.a(a),"name")},
$S:71}
A.jB.prototype={
$1(a){return A.n(J.a(J.a(t.P.a(a),"card"),"name"))},
$S:17};(function aliases(){var s=J.dF.prototype
s.cq=s.p
s=J.cn.prototype
s.cz=s.p
s=A.aL.prototype
s.cs=s.c6
s.ct=s.c7
s.cv=s.c9
s.cu=s.c8
s=A.v.prototype
s.bB=s.N
s=A.k.prototype
s.cr=s.a8
s=A.B.prototype
s.cA=s.p
s=A.E.prototype
s.b4=s.ab
s=A.es.prototype
s.cB=s.ag
s=A.aE.prototype
s.aR=s.h
s.cw=s.k
s=A.d3.prototype
s.bC=s.k})();(function installTearOffs(){var s=hunkHelpers._static_2,r=hunkHelpers._static_1,q=hunkHelpers._static_0,p=hunkHelpers.installInstanceTearOff,o=hunkHelpers.installStaticTearOff
s(J,"tk","qM",18)
r(A,"tY","r5",14)
r(A,"tZ","r6",14)
r(A,"u_","r7",14)
q(A,"pA","tM",1)
p(A.ec.prototype,"gde",0,1,null,["$2","$1"],["aY","c2"],37,0,0)
s(A,"u3","rP",73)
r(A,"u4","rQ",74)
s(A,"u2","qR",18)
r(A,"u5","rR",10)
o(A,"ud",4,null,["$4"],["ra"],31,0)
o(A,"ue",4,null,["$4"],["rb"],31,0)
r(A,"pJ","hc",58)
r(A,"um","jr",51)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.mixinHard,q=hunkHelpers.inherit,p=hunkHelpers.inheritMany
q(A.B,null)
p(A.B,[A.nx,J.dF,J.b4,A.k,A.dq,A.cg,A.V,A.hZ,A.aF,A.Z,A.dy,A.e8,A.aa,A.cY,A.cU,A.dr,A.f6,A.i4,A.hT,A.dz,A.et,A.iC,A.M,A.hK,A.co,A.dJ,A.el,A.d_,A.fv,A.h1,A.b9,A.fO,A.h5,A.eu,A.fH,A.dp,A.ec,A.cz,A.ai,A.fI,A.e2,A.ft,A.fu,A.h_,A.eA,A.eC,A.fU,A.cC,A.ei,A.v,A.ek,A.ey,A.bl,A.bx,A.iz,A.iL,A.aQ,A.aC,A.id,A.fn,A.e0,A.ig,A.f2,A.U,A.ah,A.h2,A.cu,A.hv,A.nr,A.cA,A.as,A.dT,A.es,A.h3,A.ck,A.fL,A.fY,A.ez,A.aE,A.iv])
p(J.dF,[J.f5,J.dI,J.aR,J.a3,J.bT,J.bA,A.cp])
p(J.aR,[J.cn,A.O,A.cc,A.fK,A.hy,A.eZ,A.dt,A.hz,A.p,A.fQ,A.dD,A.dO,A.fV,A.fZ,A.h8,A.dL])
p(J.cn,[J.fo,J.bY,J.bj])
q(J.hI,J.a3)
p(J.bT,[J.dH,J.f7])
p(A.k,[A.c_,A.A,A.bB,A.a_,A.cw,A.bC,A.cy,A.dG,A.h0])
p(A.c_,[A.cf,A.eB])
q(A.ee,A.cf)
q(A.ea,A.eB)
p(A.cg,[A.eW,A.ib,A.hu,A.eV,A.fy,A.hJ,A.kY,A.l_,A.i8,A.i7,A.j3,A.il,A.iu,A.i1,A.iE,A.iB,A.hO,A.ix,A.hw,A.hx,A.hA,A.hG,A.ie,A.hS,A.hR,A.iF,A.iG,A.iH,A.hB,A.hC,A.hD,A.js,A.jt,A.kc,A.kd,A.ke,A.jp,A.iW,A.iX,A.iR,A.iY,A.iO,A.iZ,A.j_,A.j0,A.jO,A.jQ,A.jK,A.lk,A.ll,A.lm,A.lo,A.lp,A.lq,A.lr,A.lj,A.ls,A.li,A.lt,A.lg,A.lu,A.lv,A.ln,A.j6,A.j7,A.j8,A.j5,A.jR,A.kO,A.kP,A.kU,A.lN,A.na,A.nb,A.l5,A.nk,A.kj,A.kk,A.kl,A.ku,A.kv,A.kw,A.kx,A.ky,A.kz,A.kA,A.kh,A.ki,A.j9,A.ja,A.jb,A.jc,A.jd,A.je,A.jh,A.ji,A.k4,A.jm,A.jj,A.jk,A.lF,A.lD,A.lE,A.lG,A.lH,A.lI,A.lJ,A.lK,A.ml,A.mm,A.mn,A.mo,A.mp,A.lA,A.lB,A.lw,A.lx,A.ly,A.nc,A.nd,A.ne,A.nf,A.ng,A.nh,A.ni,A.n7,A.n9,A.m0,A.m1,A.m2,A.m3,A.jl,A.mv,A.mw,A.mx,A.mq,A.mI,A.mT,A.n_,A.n0,A.n1,A.n2,A.n3,A.n4,A.my,A.mz,A.mA,A.mC,A.mE,A.mF,A.mG,A.mH,A.mJ,A.mK,A.mL,A.mR,A.mS,A.mU,A.mV,A.mW,A.mX,A.mY,A.kf,A.lW,A.lX,A.lY,A.lV,A.lZ,A.l9,A.la,A.lb,A.l8,A.lc,A.lS,A.lT,A.le,A.lf,A.lO,A.lP,A.lQ,A.lR,A.m4,A.m5,A.md,A.mf,A.mh,A.mi,A.mj,A.m7,A.m9,A.mb,A.k2,A.jM,A.jN,A.kH,A.kI,A.kJ,A.kK,A.kL,A.kM,A.kC,A.kD,A.kE,A.kF,A.kG,A.k_,A.k0,A.jY,A.jW,A.jV,A.k5,A.jv,A.jw,A.l2,A.l3,A.k3,A.k8,A.jC,A.jx,A.jy,A.jz,A.jA,A.jB])
p(A.eW,[A.ic,A.ht,A.hV,A.kZ,A.j4,A.kb,A.im,A.hL,A.hN,A.iA,A.hQ,A.hF,A.i_,A.i0,A.iN,A.jf,A.iS,A.iT,A.iU,A.iV,A.iP,A.iQ,A.jJ,A.jS,A.kQ,A.kR,A.kS,A.kT,A.kt,A.l7,A.lL,A.lC,A.ju,A.jo,A.nj,A.mu,A.mD,A.m6,A.mc,A.me,A.mg,A.m8,A.ma,A.jG,A.jH,A.jE,A.jF,A.jZ,A.jI])
q(A.bw,A.ea)
p(A.V,[A.fd,A.bX,A.f8,A.fB,A.fq,A.dn,A.fN,A.dK,A.fm,A.b3,A.fl,A.fC,A.fA,A.cs,A.eX,A.eY])
p(A.A,[A.Q,A.dx,A.b6,A.ej])
p(A.Q,[A.e3,A.R,A.bk,A.fT])
q(A.du,A.bB)
p(A.Z,[A.dQ,A.cx,A.e5,A.e_])
q(A.dv,A.cw)
q(A.cQ,A.bC)
q(A.d4,A.cU)
q(A.e7,A.d4)
q(A.ds,A.e7)
q(A.ao,A.dr)
q(A.dU,A.bX)
p(A.fy,[A.fs,A.cM])
q(A.fG,A.dn)
q(A.dP,A.M)
p(A.dP,[A.aL,A.fS,A.fJ])
q(A.fF,A.dG)
q(A.aH,A.cp)
p(A.aH,[A.en,A.ep])
q(A.eo,A.en)
q(A.bV,A.eo)
q(A.eq,A.ep)
q(A.aS,A.eq)
p(A.aS,[A.ff,A.fg,A.fh,A.fi,A.fj,A.dR,A.fk])
q(A.ev,A.fN)
p(A.eV,[A.i9,A.ia,A.iJ,A.iI,A.hE,A.ih,A.iq,A.io,A.ij,A.ip,A.ii,A.it,A.is,A.ir,A.i2,A.jU,A.iD,A.j1,A.jP,A.lh,A.lU,A.kB,A.km,A.kn,A.ko,A.kp,A.kq,A.kr,A.ks,A.lz,A.n6,A.n8,A.mt,A.mB,A.ms,A.mr,A.mM,A.mN,A.mO,A.mP,A.mQ,A.n5,A.mZ,A.m_,A.ld,A.kN,A.jX,A.l0,A.l1])
q(A.e9,A.ec)
q(A.fX,A.eA)
q(A.eh,A.aL)
q(A.er,A.eC)
q(A.cB,A.er)
q(A.dN,A.ei)
q(A.cO,A.fu)
p(A.bx,[A.f_,A.f9])
q(A.fa,A.dK)
p(A.cO,[A.fc,A.fb,A.fE])
q(A.iy,A.iz)
q(A.fD,A.f_)
p(A.b3,[A.cW,A.f4])
p(A.O,[A.t,A.dC,A.bZ,A.bo])
p(A.t,[A.E,A.bi,A.ci,A.d0])
p(A.E,[A.r,A.u])
p(A.r,[A.cK,A.eT,A.cL,A.cd,A.ce,A.ch,A.f1,A.dA,A.dE,A.bS,A.dM,A.dV,A.dW,A.dZ,A.cr,A.e4,A.fw,A.fx,A.cZ,A.e6])
q(A.cP,A.fK)
p(A.dN,[A.eb,A.av,A.f0])
q(A.fR,A.fQ)
q(A.bQ,A.fR)
q(A.dB,A.ci)
q(A.bR,A.dC)
p(A.p,[A.bn,A.b8])
p(A.bn,[A.b5,A.aG])
q(A.fW,A.fV)
q(A.dS,A.fW)
q(A.e1,A.fZ)
q(A.ed,A.dt)
q(A.h9,A.h8)
q(A.em,A.h9)
q(A.fM,A.fJ)
q(A.ef,A.e2)
q(A.d1,A.ef)
q(A.eg,A.ft)
q(A.h4,A.es)
p(A.aE,[A.bU,A.d3])
q(A.cm,A.d3)
q(A.cX,A.u)
q(A.an,A.id)
s(A.eB,A.v)
s(A.en,A.v)
s(A.eo,A.aa)
s(A.ep,A.v)
s(A.eq,A.aa)
s(A.ei,A.v)
s(A.d4,A.ey)
s(A.eC,A.bl)
s(A.fK,A.hv)
s(A.fQ,A.v)
s(A.fR,A.as)
s(A.fV,A.v)
s(A.fW,A.as)
s(A.fZ,A.M)
s(A.h8,A.v)
s(A.h9,A.as)
r(A.d3,A.v)})()
var v={typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{f:"int",aJ:"double",ar:"num",h:"String",y:"bool",ah:"Null",I:"List"},mangledNames:{},types:["~(aG)","~()","y(z<h,@>)","y(@)","ah()","~(p)","f(f,f)","U<@,@>(@,@)","z<h,@>(@)","~(h,h)","@(@)","y(h)","f(z<h,@>)","~(h,f)","~(~())","~(@,@)","h(h)","h(z<h,@>)","f(@,@)","~(b5)","z<h,@>(z<h,@>)","U<h,f>(U<h,f>,U<h,f>)","y(t)","~(@)","y(b7)","~(h,@)","~(f,f)","f(@)","h(@)","f(h?)","~(y)","y(E,h,h,cA)","y(f)","~(fz)","~(B?,B?)","ah(aE)","ah(@)","~(B[bm?])","ai<@>(@)","y(an?)","~(b8)","y(z<h,@>?)","f(h,f)","ah(B,bm)","I<f>(@)","ah(~())","@()","f(f,z<h,@>)","@(@,h)","an()","~(f,@)","B?(@)","U<h,h>(f,h)","@(B?)","~(ar)","~(z<h,@>)","cm<@>(@)","~(z<h,@>,h)","B?(B?)","aD<~>(aG)","aD<~>(b5)","I<@>()","~(cv,@)","bU(@)","~(f)","f(U<h,f>,U<h,f>)","E(t)","aD<~>()","z<h,@>()","~(t,t?)","~(h)","@(z<h,@>)","@(h)","y(B?,B?)","f(B?)","ah(@,bm)","aE(@)","y(an)"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti")}
A.ru(v.typeUniverse,JSON.parse('{"fo":"cn","bY":"cn","bj":"cn","uJ":"p","uX":"p","uI":"u","uZ":"u","vl":"b8","uK":"r","v0":"r","v4":"t","uW":"t","vh":"ci","v3":"aG","uM":"bn","uQ":"bo","uL":"bi","v6":"bi","v_":"bQ","uY":"cc","v2":"bV","v1":"cp","f5":{"y":[]},"dI":{"ah":[]},"a3":{"I":["1"],"A":["1"],"k":["1"]},"hI":{"a3":["1"],"I":["1"],"A":["1"],"k":["1"]},"b4":{"Z":["1"]},"bT":{"aJ":[],"ar":[],"aP":["ar"]},"dH":{"aJ":[],"f":[],"ar":[],"aP":["ar"]},"f7":{"aJ":[],"ar":[],"aP":["ar"]},"bA":{"h":[],"aP":["h"],"hU":[]},"c_":{"k":["2"]},"dq":{"Z":["2"]},"cf":{"c_":["1","2"],"k":["2"],"k.E":"2"},"ee":{"cf":["1","2"],"c_":["1","2"],"A":["2"],"k":["2"],"k.E":"2"},"ea":{"v":["2"],"I":["2"],"c_":["1","2"],"A":["2"],"k":["2"]},"bw":{"ea":["1","2"],"v":["2"],"I":["2"],"c_":["1","2"],"A":["2"],"k":["2"],"v.E":"2","k.E":"2"},"fd":{"V":[]},"A":{"k":["1"]},"Q":{"A":["1"],"k":["1"]},"e3":{"Q":["1"],"A":["1"],"k":["1"],"Q.E":"1","k.E":"1"},"aF":{"Z":["1"]},"bB":{"k":["2"],"k.E":"2"},"du":{"bB":["1","2"],"A":["2"],"k":["2"],"k.E":"2"},"dQ":{"Z":["2"]},"R":{"Q":["2"],"A":["2"],"k":["2"],"Q.E":"2","k.E":"2"},"a_":{"k":["1"],"k.E":"1"},"cx":{"Z":["1"]},"cw":{"k":["1"],"k.E":"1"},"dv":{"cw":["1"],"A":["1"],"k":["1"],"k.E":"1"},"e5":{"Z":["1"]},"bC":{"k":["1"],"k.E":"1"},"cQ":{"bC":["1"],"A":["1"],"k":["1"],"k.E":"1"},"e_":{"Z":["1"]},"dx":{"A":["1"],"k":["1"],"k.E":"1"},"dy":{"Z":["1"]},"cy":{"k":["1"],"k.E":"1"},"e8":{"Z":["1"]},"bk":{"Q":["1"],"A":["1"],"k":["1"],"Q.E":"1","k.E":"1"},"cY":{"cv":[]},"ds":{"e7":["1","2"],"d4":["1","2"],"cU":["1","2"],"ey":["1","2"],"z":["1","2"]},"dr":{"z":["1","2"]},"ao":{"dr":["1","2"],"z":["1","2"]},"f6":{"ox":[]},"dU":{"bX":[],"V":[]},"f8":{"V":[]},"fB":{"V":[]},"et":{"bm":[]},"cg":{"cl":[]},"eV":{"cl":[]},"eW":{"cl":[]},"fy":{"cl":[]},"fs":{"cl":[]},"cM":{"cl":[]},"fq":{"V":[]},"fG":{"V":[]},"aL":{"M":["1","2"],"nz":["1","2"],"z":["1","2"],"M.K":"1","M.V":"2"},"b6":{"A":["1"],"k":["1"],"k.E":"1"},"co":{"Z":["1"]},"dJ":{"hU":[]},"el":{"dY":[],"cV":[]},"fF":{"k":["dY"],"k.E":"dY"},"d_":{"Z":["dY"]},"fv":{"cV":[]},"h0":{"k":["cV"],"k.E":"cV"},"h1":{"Z":["cV"]},"cp":{"ba":[]},"aH":{"au":["1"],"ba":[]},"bV":{"aH":["aJ"],"v":["aJ"],"au":["aJ"],"I":["aJ"],"A":["aJ"],"ba":[],"k":["aJ"],"aa":["aJ"],"v.E":"aJ","aa.E":"aJ"},"aS":{"aH":["f"],"v":["f"],"au":["f"],"I":["f"],"A":["f"],"ba":[],"k":["f"],"aa":["f"]},"ff":{"aS":[],"aH":["f"],"v":["f"],"au":["f"],"I":["f"],"A":["f"],"ba":[],"k":["f"],"aa":["f"],"v.E":"f","aa.E":"f"},"fg":{"aS":[],"aH":["f"],"v":["f"],"au":["f"],"I":["f"],"A":["f"],"ba":[],"k":["f"],"aa":["f"],"v.E":"f","aa.E":"f"},"fh":{"aS":[],"aH":["f"],"v":["f"],"au":["f"],"I":["f"],"A":["f"],"ba":[],"k":["f"],"aa":["f"],"v.E":"f","aa.E":"f"},"fi":{"aS":[],"aH":["f"],"v":["f"],"au":["f"],"I":["f"],"A":["f"],"ba":[],"k":["f"],"aa":["f"],"v.E":"f","aa.E":"f"},"fj":{"aS":[],"aH":["f"],"v":["f"],"au":["f"],"I":["f"],"A":["f"],"ba":[],"k":["f"],"aa":["f"],"v.E":"f","aa.E":"f"},"dR":{"aS":[],"aH":["f"],"v":["f"],"au":["f"],"I":["f"],"A":["f"],"ba":[],"k":["f"],"aa":["f"],"v.E":"f","aa.E":"f"},"fk":{"aS":[],"aH":["f"],"v":["f"],"r2":[],"au":["f"],"I":["f"],"A":["f"],"ba":[],"k":["f"],"aa":["f"],"v.E":"f","aa.E":"f"},"fN":{"V":[]},"ev":{"bX":[],"V":[]},"ai":{"aD":["1"]},"eu":{"fz":[]},"dp":{"V":[]},"e9":{"ec":["1"]},"eA":{"oW":[]},"fX":{"eA":[],"oW":[]},"eh":{"aL":["1","2"],"M":["1","2"],"nz":["1","2"],"z":["1","2"],"M.K":"1","M.V":"2"},"cB":{"er":["1"],"bl":["1"],"oQ":["1"],"A":["1"],"k":["1"],"bl.E":"1"},"cC":{"Z":["1"]},"dG":{"k":["1"]},"dN":{"v":["1"],"I":["1"],"A":["1"],"k":["1"]},"dP":{"M":["1","2"],"z":["1","2"]},"M":{"z":["1","2"]},"ej":{"A":["2"],"k":["2"],"k.E":"2"},"ek":{"Z":["2"]},"cU":{"z":["1","2"]},"e7":{"d4":["1","2"],"cU":["1","2"],"ey":["1","2"],"z":["1","2"]},"er":{"bl":["1"],"oQ":["1"],"A":["1"],"k":["1"]},"fS":{"M":["h","@"],"z":["h","@"],"M.K":"h","M.V":"@"},"fT":{"Q":["h"],"A":["h"],"k":["h"],"Q.E":"h","k.E":"h"},"f_":{"bx":["h","I<f>"]},"dK":{"V":[]},"fa":{"V":[]},"f9":{"bx":["B?","h"],"bx.S":"B?"},"fc":{"cO":["B?","h"]},"fb":{"cO":["h","B?"]},"fD":{"bx":["h","I<f>"],"bx.S":"h"},"fE":{"cO":["h","I<f>"]},"aQ":{"aP":["aQ"]},"aJ":{"ar":[],"aP":["ar"]},"aC":{"aP":["aC"]},"f":{"ar":[],"aP":["ar"]},"I":{"A":["1"],"k":["1"]},"ar":{"aP":["ar"]},"dY":{"cV":[]},"h":{"aP":["h"],"hU":[]},"dn":{"V":[]},"bX":{"V":[]},"fm":{"V":[]},"b3":{"V":[]},"cW":{"V":[]},"f4":{"V":[]},"fl":{"V":[]},"fC":{"V":[]},"fA":{"V":[]},"cs":{"V":[]},"eX":{"V":[]},"fn":{"V":[]},"e0":{"V":[]},"eY":{"V":[]},"h2":{"bm":[]},"cu":{"r0":[]},"E":{"t":[],"O":[]},"bR":{"O":[]},"b5":{"p":[]},"aG":{"p":[]},"t":{"O":[]},"b8":{"p":[]},"cA":{"b7":[]},"r":{"E":[],"t":[],"O":[]},"cK":{"r":[],"E":[],"t":[],"O":[]},"eT":{"r":[],"E":[],"t":[],"O":[]},"cL":{"r":[],"E":[],"t":[],"O":[]},"cd":{"r":[],"E":[],"t":[],"O":[]},"ce":{"r":[],"E":[],"t":[],"O":[]},"bi":{"t":[],"O":[]},"ch":{"r":[],"E":[],"t":[],"O":[]},"ci":{"t":[],"O":[]},"dt":{"nD":["ar"]},"eb":{"v":["E"],"I":["E"],"A":["E"],"k":["E"],"v.E":"E"},"f1":{"r":[],"E":[],"t":[],"O":[]},"dA":{"r":[],"E":[],"t":[],"O":[]},"bQ":{"v":["t"],"as":["t"],"I":["t"],"au":["t"],"A":["t"],"k":["t"],"as.E":"t","v.E":"t"},"dB":{"t":[],"O":[]},"dC":{"O":[]},"dE":{"r":[],"E":[],"t":[],"O":[]},"bS":{"r":[],"E":[],"t":[],"O":[]},"dM":{"r":[],"E":[],"t":[],"O":[]},"av":{"v":["t"],"I":["t"],"A":["t"],"k":["t"],"v.E":"t"},"dS":{"v":["t"],"as":["t"],"I":["t"],"au":["t"],"A":["t"],"k":["t"],"as.E":"t","v.E":"t"},"dV":{"r":[],"E":[],"t":[],"O":[]},"dW":{"r":[],"E":[],"t":[],"O":[]},"dZ":{"r":[],"E":[],"t":[],"O":[]},"cr":{"r":[],"E":[],"t":[],"O":[]},"e1":{"M":["h","h"],"z":["h","h"],"M.K":"h","M.V":"h"},"e4":{"r":[],"E":[],"t":[],"O":[]},"fw":{"r":[],"E":[],"t":[],"O":[]},"fx":{"r":[],"E":[],"t":[],"O":[]},"cZ":{"r":[],"E":[],"t":[],"O":[]},"e6":{"r":[],"E":[],"t":[],"O":[]},"bn":{"p":[]},"bZ":{"i6":[],"O":[]},"bo":{"O":[]},"d0":{"t":[],"O":[]},"ed":{"nD":["ar"]},"em":{"v":["t"],"as":["t"],"I":["t"],"au":["t"],"A":["t"],"k":["t"],"as.E":"t","v.E":"t"},"fJ":{"M":["h","h"],"z":["h","h"]},"fM":{"M":["h","h"],"z":["h","h"],"M.K":"h","M.V":"h"},"ef":{"e2":["1"]},"d1":{"ef":["1"],"e2":["1"]},"eg":{"ft":["1"]},"dT":{"b7":[]},"es":{"b7":[]},"h4":{"b7":[]},"h3":{"b7":[]},"ck":{"Z":["1"]},"fL":{"i6":[],"O":[]},"fY":{"r3":[]},"ez":{"qS":[]},"f0":{"v":["E"],"I":["E"],"A":["E"],"k":["E"],"v.E":"E"},"bU":{"aE":[]},"cm":{"v":["1"],"I":["1"],"A":["1"],"aE":[],"k":["1"],"v.E":"1"},"cX":{"u":[],"E":[],"t":[],"O":[]},"u":{"E":[],"t":[],"O":[]}}'))
A.rt(v.typeUniverse,JSON.parse('{"eB":2,"aH":1,"fu":2,"dG":1,"dN":1,"dP":2,"ei":1,"eC":1,"d3":1}'))
var u={c:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type"}
var t=(function rtii(){var s=A.dg
return{e1:s("an"),n:s("dp"),cR:s("cL"),fK:s("cc"),a4:s("cd"),e8:s("aP<@>"),gF:s("ds<cv,@>"),w:s("ao<h,h>"),dy:s("aQ"),d:s("aC"),i:s("A<@>"),h:s("E"),bU:s("V"),B:s("p"),Y:s("cl"),k:s("aD<@>"),gb:s("dD"),gk:s("bS"),c4:s("ox"),bq:s("k<E>"),eh:s("k<t>"),bM:s("k<aJ>"),R:s("k<@>"),gS:s("k<f>"),p:s("a3<I<f>>"),m:s("a3<z<h,h>>"),t:s("a3<z<h,@>>"),eO:s("a3<b7>"),s:s("a3<h>"),o:s("a3<@>"),X:s("a3<f>"),T:s("dI"),cj:s("bj"),aU:s("au<@>"),am:s("cm<@>"),a2:s("bU"),eo:s("aL<cv,@>"),hb:s("aE"),dz:s("dL"),v:s("b5"),fO:s("I<z<h,@>>"),j:s("I<@>"),bW:s("I<f>"),a_:s("dO"),gV:s("U<h,h>"),q:s("U<h,f>"),b:s("U<@,@>"),P:s("z<h,@>"),g6:s("z<h,f>"),f:s("z<@,@>"),W:s("z<f,f>"),I:s("R<h,h>"),gh:s("R<z<h,@>,@>"),V:s("aG"),d4:s("bV"),eB:s("aS"),A:s("t"),J:s("b7"),a:s("ah"),dC:s("ah()"),he:s("ah(aE)"),K:s("B"),gZ:s("b8"),eU:s("nD<ar>"),r:s("dY"),ew:s("cX"),l:s("bm"),N:s("h"),u:s("h(h)"),g7:s("u"),fo:s("cv"),aW:s("cZ"),x:s("fz"),eK:s("bX"),ak:s("ba"),bJ:s("bY"),dW:s("a_<an>"),g4:s("bZ"),ci:s("i6"),g2:s("bo"),bj:s("e9<bR>"),h9:s("d0"),ac:s("av"),E:s("d1<p>"),aY:s("d1<b5>"),C:s("d1<aG>"),ao:s("ai<bR>"),e:s("ai<@>"),fJ:s("ai<f>"),cr:s("cA"),y:s("y"),bO:s("y(an)"),dB:s("y(E)"),ae:s("y(t)"),al:s("y(B)"),gR:s("aJ"),z:s("@"),hf:s("@()"),dY:s("@(z<h,@>)"),bI:s("@(B)"),ag:s("@(B,bm)"),S:s("f"),aw:s("0&*"),c:s("B*"),dj:s("an?"),a7:s("ce?"),_:s("ch?"),ch:s("O?"),eH:s("aD<ah>?"),dg:s("r?"),G:s("bS?"),g:s("I<@>?"),Q:s("z<h,@>?"),U:s("z<@,@>?"),h0:s("z<f,f>?"),O:s("B?"),D:s("cr?"),F:s("cz<@,@>?"),L:s("fU?"),bw:s("@(p)?"),g0:s("f(E,E)?"),b6:s("f(t,t)?"),fV:s("B?(B?,B?)?"),dA:s("B?(@)?"),Z:s("~()?"),gx:s("~(b8)?"),di:s("ar"),H:s("~"),M:s("~()"),eA:s("~(h,h)"),cA:s("~(h,@)"),cB:s("~(fz)"),d9:s("~(ar)")}})();(function constants(){var s=hunkHelpers.makeConstList
B.V=A.cK.prototype
B.J=A.cd.prototype
B.d=A.ce.prototype
B.y=A.cP.prototype
B.e=A.ch.prototype
B.a5=A.eZ.prototype
B.k=A.dA.prototype
B.ac=A.dB.prototype
B.ad=A.bR.prototype
B.w=A.dE.prototype
B.l=A.bS.prototype
B.ae=J.dF.prototype
B.a=J.a3.prototype
B.f=J.dH.prototype
B.i=J.bT.prototype
B.b=J.bA.prototype
B.af=J.bj.prototype
B.ag=J.aR.prototype
B.q=A.dM.prototype
B.D=A.dV.prototype
B.h=A.dW.prototype
B.T=J.fo.prototype
B.A=A.dZ.prototype
B.c=A.cr.prototype
B.B=A.e1.prototype
B.U=A.e4.prototype
B.aC=A.e6.prototype
B.I=J.bY.prototype
B.t=A.bZ.prototype
B.x=new A.an("setup")
B.j=new A.an("game")
B.m=new A.an("tracker")
B.C=new A.an("combat")
B.E=new A.an("history")
B.F=new A.an("stats")
B.W=new A.dy(A.dg("dy<0&>"))
B.K=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
B.X=function() {
  var toStringFunction = Object.prototype.toString;
  function getTag(o) {
    var s = toStringFunction.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = toStringFunction.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof navigator == "object";
  return {
    getTag: getTag,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
B.a1=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var ua = navigator.userAgent;
    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;
    if (ua.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
B.Y=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
B.Z=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
B.a0=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
B.a_=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
B.L=function(hooks) { return hooks; }

B.p=new A.f9()
B.a2=new A.fn()
B.aE=new A.hZ()
B.G=new A.fD()
B.a3=new A.fE()
B.r=new A.iv()
B.M=new A.iC()
B.o=new A.fX()
B.a4=new A.h2()
B.a6=new A.aC(0)
B.a7=new A.aC(1e6)
B.a8=new A.aC(15e4)
B.a9=new A.aC(3e5)
B.aa=new A.aC(4e5)
B.ab=new A.aC(5e4)
B.ah=new A.fb(null)
B.ai=new A.fc(null)
B.aj=A.o(s(["*::class","*::dir","*::draggable","*::hidden","*::id","*::inert","*::itemprop","*::itemref","*::itemscope","*::lang","*::spellcheck","*::title","*::translate","A::accesskey","A::coords","A::hreflang","A::name","A::shape","A::tabindex","A::target","A::type","AREA::accesskey","AREA::alt","AREA::coords","AREA::nohref","AREA::shape","AREA::tabindex","AREA::target","AUDIO::controls","AUDIO::loop","AUDIO::mediagroup","AUDIO::muted","AUDIO::preload","BDO::dir","BODY::alink","BODY::bgcolor","BODY::link","BODY::text","BODY::vlink","BR::clear","BUTTON::accesskey","BUTTON::disabled","BUTTON::name","BUTTON::tabindex","BUTTON::type","BUTTON::value","CANVAS::height","CANVAS::width","CAPTION::align","COL::align","COL::char","COL::charoff","COL::span","COL::valign","COL::width","COLGROUP::align","COLGROUP::char","COLGROUP::charoff","COLGROUP::span","COLGROUP::valign","COLGROUP::width","COMMAND::checked","COMMAND::command","COMMAND::disabled","COMMAND::label","COMMAND::radiogroup","COMMAND::type","DATA::value","DEL::datetime","DETAILS::open","DIR::compact","DIV::align","DL::compact","FIELDSET::disabled","FONT::color","FONT::face","FONT::size","FORM::accept","FORM::autocomplete","FORM::enctype","FORM::method","FORM::name","FORM::novalidate","FORM::target","FRAME::name","H1::align","H2::align","H3::align","H4::align","H5::align","H6::align","HR::align","HR::noshade","HR::size","HR::width","HTML::version","IFRAME::align","IFRAME::frameborder","IFRAME::height","IFRAME::marginheight","IFRAME::marginwidth","IFRAME::width","IMG::align","IMG::alt","IMG::border","IMG::height","IMG::hspace","IMG::ismap","IMG::name","IMG::usemap","IMG::vspace","IMG::width","INPUT::accept","INPUT::accesskey","INPUT::align","INPUT::alt","INPUT::autocomplete","INPUT::autofocus","INPUT::checked","INPUT::disabled","INPUT::inputmode","INPUT::ismap","INPUT::list","INPUT::max","INPUT::maxlength","INPUT::min","INPUT::multiple","INPUT::name","INPUT::placeholder","INPUT::readonly","INPUT::required","INPUT::size","INPUT::step","INPUT::tabindex","INPUT::type","INPUT::usemap","INPUT::value","INS::datetime","KEYGEN::disabled","KEYGEN::keytype","KEYGEN::name","LABEL::accesskey","LABEL::for","LEGEND::accesskey","LEGEND::align","LI::type","LI::value","LINK::sizes","MAP::name","MENU::compact","MENU::label","MENU::type","METER::high","METER::low","METER::max","METER::min","METER::value","OBJECT::typemustmatch","OL::compact","OL::reversed","OL::start","OL::type","OPTGROUP::disabled","OPTGROUP::label","OPTION::disabled","OPTION::label","OPTION::selected","OPTION::value","OUTPUT::for","OUTPUT::name","P::align","PRE::width","PROGRESS::max","PROGRESS::min","PROGRESS::value","SELECT::autocomplete","SELECT::disabled","SELECT::multiple","SELECT::name","SELECT::required","SELECT::size","SELECT::tabindex","SOURCE::type","TABLE::align","TABLE::bgcolor","TABLE::border","TABLE::cellpadding","TABLE::cellspacing","TABLE::frame","TABLE::rules","TABLE::summary","TABLE::width","TBODY::align","TBODY::char","TBODY::charoff","TBODY::valign","TD::abbr","TD::align","TD::axis","TD::bgcolor","TD::char","TD::charoff","TD::colspan","TD::headers","TD::height","TD::nowrap","TD::rowspan","TD::scope","TD::valign","TD::width","TEXTAREA::accesskey","TEXTAREA::autocomplete","TEXTAREA::cols","TEXTAREA::disabled","TEXTAREA::inputmode","TEXTAREA::name","TEXTAREA::placeholder","TEXTAREA::readonly","TEXTAREA::required","TEXTAREA::rows","TEXTAREA::tabindex","TEXTAREA::wrap","TFOOT::align","TFOOT::char","TFOOT::charoff","TFOOT::valign","TH::abbr","TH::align","TH::axis","TH::bgcolor","TH::char","TH::charoff","TH::colspan","TH::headers","TH::height","TH::nowrap","TH::rowspan","TH::scope","TH::valign","TH::width","THEAD::align","THEAD::char","THEAD::charoff","THEAD::valign","TR::align","TR::bgcolor","TR::char","TR::charoff","TR::valign","TRACK::default","TRACK::kind","TRACK::label","TRACK::srclang","UL::compact","UL::type","VIDEO::controls","VIDEO::height","VIDEO::loop","VIDEO::mediagroup","VIDEO::muted","VIDEO::preload","VIDEO::width"]),t.s)
B.u=A.o(s(["pattern","phase","plain"]),t.s)
B.au=new A.ao(3,{pattern:"at the beginning of your upkeep",phase:"Upkeep",plain:"triggers at the start of your upkeep"},B.u,t.w)
B.as=new A.ao(3,{pattern:"at the beginning of each upkeep",phase:"Upkeep",plain:"triggers at the start of every upkeep"},B.u,t.w)
B.ax=new A.ao(3,{pattern:"at the beginning of combat",phase:"Combat",plain:"triggers at the start of combat"},B.u,t.w)
B.at=new A.ao(3,{pattern:"at the beginning of your end step",phase:"End Step",plain:"triggers at end of your turn"},B.u,t.w)
B.ar=new A.ao(3,{pattern:"whenever you attack",phase:"Combat",plain:"triggers when you declare attackers"},B.u,t.w)
B.av=new A.ao(3,{pattern:"whenever ~ attacks",phase:"Combat",plain:"triggers when this creature attacks"},B.u,t.w)
B.ay=new A.ao(3,{pattern:"whenever a creature dies",phase:"Any",plain:"triggers when any creature dies"},B.u,t.w)
B.aw=new A.ao(3,{pattern:"whenever you cast",phase:"Any",plain:"triggers when you cast a spell"},B.u,t.w)
B.ak=A.o(s([B.au,B.as,B.ax,B.at,B.ar,B.av,B.ay,B.aw]),t.m)
B.z=A.o(s(["Draw","Main","Combat","End"]),t.s)
B.N=A.o(s([0,0,26498,1023,65534,34815,65534,18431]),t.X)
B.P=A.o(s(["creature","land","artifact"]),t.s)
B.al=A.o(s(["+1/+1","Charge","Shield","Stun","Lore","Loyalty"]),t.s)
B.am=A.o(s(["HEAD","AREA","BASE","BASEFONT","BR","COL","COLGROUP","EMBED","FRAME","FRAMESET","HR","IMAGE","IMG","INPUT","ISINDEX","LINK","META","PARAM","SOURCE","STYLE","TITLE","WBR"]),t.s)
B.an=A.o(s([]),t.s)
B.n=A.o(s([]),t.o)
B.aq=A.o(s([B.x,B.j,B.m,B.C,B.E,B.F]),A.dg("a3<an>"))
B.Q=A.o(s(["bind","if","ref","repeat","syntax"]),t.s)
B.H=A.o(s(["A::href","AREA::href","BLOCKQUOTE::cite","BODY::background","COMMAND::icon","DEL::cite","FORM::action","IMG::src","INPUT::src","INS::cite","Q::cite","VIDEO::poster"]),t.s)
B.O=A.o(s(["W","U","B","R","G","C","X"]),t.s)
B.az=new A.ao(7,{W:"#7a7020",U:"#1a4060",B:"#ccaaff",R:"#fff0e0",G:"#88ffaa",C:"#eee",X:"#4a3810"},B.O,t.w)
B.aA=new A.ao(7,{W:"#f9f6d5",U:"#b8d8f0",B:"#3a2a4a",R:"#e87040",G:"#2a6030",C:"#888",X:"#c8b880"},B.O,t.w)
B.ao=A.o(s([]),A.dg("a3<cv>"))
B.R=new A.ao(0,{},B.ao,A.dg("ao<cv,@>"))
B.v=new A.ao(0,{},B.n,A.dg("ao<@,@>"))
B.ap=A.o(s(["Flying","First Strike","Double Strike","Deathtouch","Haste","Hexproof","Indestructible","Lifelink","Menace","Protection","Reach","Shroud","Trample","Vigilance","Ward"]),t.s)
B.S=new A.ao(15,{Flying:"Can only be blocked by creatures with Flying or Reach.","First Strike":"Deals combat damage before creatures without First Strike.","Double Strike":"Deals both first strike and regular combat damage.",Deathtouch:"Any damage dealt by this creature destroys the target.",Haste:"Can attack and use tap abilities the turn it enters.",Hexproof:"Cannot be targeted by opponents' spells or abilities.",Indestructible:'Cannot be destroyed by damage or "destroy" effects.',Lifelink:"Damage dealt also causes you to gain that much life.",Menace:"Can only be blocked by two or more creatures.",Protection:"Cannot be blocked, targeted, damaged, enchanted, or equipped by the stated quality.",Reach:"Can block creatures with Flying.",Shroud:"Cannot be targeted by any spells or abilities (including yours).",Trample:"Excess damage beyond blocking creature's toughness goes to the player.",Vigilance:"Does not tap when it attacks.",Ward:"When targeted by an opponent, they must pay a cost or the effect is countered."},B.ap,t.w)
B.aB=new A.cY("call")
B.aD=A.uH("B")})();(function staticFields(){$.iw=null
$.oI=null
$.on=null
$.om=null
$.pE=null
$.py=null
$.pN=null
$.kV=null
$.l4=null
$.o8=null
$.d8=null
$.eG=null
$.eH=null
$.nX=!1
$.a1=B.o
$.aX=A.o([],A.dg("a3<B>"))
$.bO=null
$.nq=null
$.ov=null
$.ou=null
$.fP=A.Y(t.N,t.Y)
$.ax=!1
$.at=40
$.H=0
$.b_=!1
$.b0=1
$.aA=0
$.eM=!1
$.eN=!1
$.aY=!1
$.a6=0
$.aB="battlefield"
$.cI=A.Y(t.S,t.N)
$.bc=null
$.k7=null
$.o3=null
$.pw=null
$.bh=null
$.c6=0
$.cE=""
$.bH=""
$.aU=A.Y(t.N,t.S)
$.aw=A.Y(t.N,t.S)
$.d9=A.Y(t.N,t.S)
$.bI=A.o([],t.X)
$.bJ=A.o([],t.p)
$.d=A.o([],t.t)
$.bL=A.o([],t.s)
$.bt=A.o([],t.s)
$.pr=function(){var s=t.N
return A.Y(s,s)}()
$.ps=!1
$.db=A.o([],t.t)
$.a2=A.o([],t.t)
$.ad=A.o([],t.s)
$.X=0
$.ae=!1
$.pm=""
$.bb=B.x
$.o_=null
$.nP=!1
$.nU=!1
$.bd=A.o([],t.s)
$.pb=function(){var s=t.s,r=t.N,q=t.z
return A.G(["plains",A.G(["name","Plains","type_line","Basic Land \u2014 Plains","color_identity",A.o(["W"],s),"image_uris",A.G(["normal","https://cards.scryfall.io/normal/front/b/c/bc71ebdb-0b90-4dcd-82a5-7c1bf0e9e5b0.jpg"],r,r),"keywords",[],"mana_cost",""],r,q),"island",A.G(["name","Island","type_line","Basic Land \u2014 Island","color_identity",A.o(["U"],s),"image_uris",A.G(["normal","https://cards.scryfall.io/normal/front/8/8/88b99c03-6f9c-4f37-a933-b8b5571c04ae.jpg"],r,r),"keywords",[],"mana_cost",""],r,q),"swamp",A.G(["name","Swamp","type_line","Basic Land \u2014 Swamp","color_identity",A.o(["B"],s),"image_uris",A.G(["normal","https://cards.scryfall.io/normal/front/f/6/f6601bbe-88bc-4f71-8d0b-44f2e7d8e6e2.jpg"],r,r),"keywords",[],"mana_cost",""],r,q),"mountain",A.G(["name","Mountain","type_line","Basic Land \u2014 Mountain","color_identity",A.o(["R"],s),"image_uris",A.G(["normal","https://cards.scryfall.io/normal/front/5/e/5e5e3ae7-e0b1-4c7c-a7d0-c11448fe3b8e.jpg"],r,r),"keywords",[],"mana_cost",""],r,q),"forest",A.G(["name","Forest","type_line","Basic Land \u2014 Forest","color_identity",A.o(["G"],s),"image_uris",A.G(["normal","https://cards.scryfall.io/normal/front/6/5/65f5d7b7-8b50-4913-b11c-2543dbf20e38.jpg"],r,r),"keywords",[],"mana_cost",""],r,q)],r,t.P)}()
$.o2=A.Y(t.N,t.P)
$.bs=null
$.dc=!1
$.C=A.o([],t.s)})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal
s($,"uO","hj",()=>A.pD("_$dart_dartClosure"))
s($,"v7","pY",()=>A.bD(A.i5({
toString:function(){return"$receiver$"}})))
s($,"v8","pZ",()=>A.bD(A.i5({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"v9","q_",()=>A.bD(A.i5(null)))
s($,"va","q0",()=>A.bD(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"vd","q3",()=>A.bD(A.i5(void 0)))
s($,"ve","q4",()=>A.bD(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"vc","q2",()=>A.bD(A.oV(null)))
s($,"vb","q1",()=>A.bD(function(){try{null.$method$}catch(r){return r.message}}()))
s($,"vg","q6",()=>A.bD(A.oV(void 0)))
s($,"vf","q5",()=>A.bD(function(){try{(void 0).$method$}catch(r){return r.message}}()))
s($,"vi","od",()=>A.r4())
s($,"vm","q8",()=>A.aq("^[\\-\\.0-9A-Z_a-z~]*$"))
s($,"uP","pT",()=>A.aq("^([+-]?\\d{4,6})-?(\\d\\d)-?(\\d\\d)(?:[ T](\\d\\d)(?::?(\\d\\d)(?::?(\\d\\d)(?:[.,](\\d+))?)?)?( ?[zZ]| ?([-+])(\\d\\d)(?::?(\\d\\d))?)?)?$"))
s($,"vw","q9",()=>A.pL(B.aD))
s($,"uN","pS",()=>({}))
s($,"vk","q7",()=>A.nA(["A","ABBR","ACRONYM","ADDRESS","AREA","ARTICLE","ASIDE","AUDIO","B","BDI","BDO","BIG","BLOCKQUOTE","BR","BUTTON","CANVAS","CAPTION","CENTER","CITE","CODE","COL","COLGROUP","COMMAND","DATA","DATALIST","DD","DEL","DETAILS","DFN","DIR","DIV","DL","DT","EM","FIELDSET","FIGCAPTION","FIGURE","FONT","FOOTER","FORM","H1","H2","H3","H4","H5","H6","HEADER","HGROUP","HR","I","IFRAME","IMG","INPUT","INS","KBD","LABEL","LEGEND","LI","MAP","MARK","MENU","METER","NAV","NOBR","OL","OPTGROUP","OPTION","OUTPUT","P","PRE","PROGRESS","Q","S","SAMP","SECTION","SELECT","SMALL","SOURCE","SPAN","STRIKE","STRONG","SUB","SUMMARY","SUP","TABLE","TBODY","TD","TEXTAREA","TFOOT","TH","THEAD","TIME","TR","TRACK","TT","U","UL","VAR","VIDEO","WBR"],t.N))
s($,"uU","oc",()=>B.b.aZ(A.np(),"Opera",0))
s($,"uT","pW",()=>!A.am($.oc())&&B.b.aZ(A.np(),"Trident/",0))
s($,"uS","pV",()=>B.b.aZ(A.np(),"Firefox",0))
s($,"uR","pU",()=>"-"+$.pX()+"-")
s($,"uV","pX",()=>{if(A.am($.pV()))var r="moz"
else if($.pW())r="ms"
else r=A.am($.oc())?"o":"webkit"
return r})
s($,"vu","hk",()=>A.rK(A.o4(self)))
s($,"vj","oe",()=>A.pD("_$dart_dartObject"))
s($,"vv","of",()=>function DartObject(a){this.o=a})})();(function nativeSupport(){!function(){var s=function(a){var m={}
m[a]=1
return Object.keys(hunkHelpers.convertToFastObject(m))[0]}
v.getIsolateTag=function(a){return s("___dart_"+a+v.isolateTag)}
var r="___dart_isolate_tags_"
var q=Object[r]||(Object[r]=Object.create(null))
var p="_ZxYxX"
for(var o=0;;o++){var n=s(p+"_"+o+"_")
if(!(n in q)){q[n]=1
v.isolateTag=n
break}}v.dispatchPropertyName=v.getIsolateTag("dispatch_record")}()
hunkHelpers.setOrUpdateInterceptorsByTag({DOMError:J.aR,MediaError:J.aR,Navigator:J.aR,NavigatorConcurrentHardware:J.aR,NavigatorUserMediaError:J.aR,OverconstrainedError:J.aR,PositionError:J.aR,GeolocationPositionError:J.aR,Range:J.aR,DataView:A.cp,ArrayBufferView:A.cp,Float32Array:A.bV,Float64Array:A.bV,Int16Array:A.ff,Int32Array:A.fg,Int8Array:A.fh,Uint16Array:A.fi,Uint32Array:A.fj,Uint8ClampedArray:A.dR,CanvasPixelArray:A.dR,Uint8Array:A.fk,HTMLAudioElement:A.r,HTMLBRElement:A.r,HTMLCanvasElement:A.r,HTMLContentElement:A.r,HTMLDListElement:A.r,HTMLDataElement:A.r,HTMLDataListElement:A.r,HTMLDetailsElement:A.r,HTMLDialogElement:A.r,HTMLEmbedElement:A.r,HTMLFieldSetElement:A.r,HTMLHRElement:A.r,HTMLHeadElement:A.r,HTMLHtmlElement:A.r,HTMLIFrameElement:A.r,HTMLLIElement:A.r,HTMLLegendElement:A.r,HTMLLinkElement:A.r,HTMLMapElement:A.r,HTMLMediaElement:A.r,HTMLMenuElement:A.r,HTMLMetaElement:A.r,HTMLMeterElement:A.r,HTMLModElement:A.r,HTMLOListElement:A.r,HTMLObjectElement:A.r,HTMLOptGroupElement:A.r,HTMLOutputElement:A.r,HTMLParamElement:A.r,HTMLPictureElement:A.r,HTMLPreElement:A.r,HTMLProgressElement:A.r,HTMLQuoteElement:A.r,HTMLScriptElement:A.r,HTMLShadowElement:A.r,HTMLSlotElement:A.r,HTMLSourceElement:A.r,HTMLStyleElement:A.r,HTMLTableCaptionElement:A.r,HTMLTableCellElement:A.r,HTMLTableDataCellElement:A.r,HTMLTableHeaderCellElement:A.r,HTMLTableColElement:A.r,HTMLTimeElement:A.r,HTMLTitleElement:A.r,HTMLTrackElement:A.r,HTMLUListElement:A.r,HTMLUnknownElement:A.r,HTMLVideoElement:A.r,HTMLDirectoryElement:A.r,HTMLFontElement:A.r,HTMLFrameElement:A.r,HTMLFrameSetElement:A.r,HTMLMarqueeElement:A.r,HTMLElement:A.r,HTMLAnchorElement:A.cK,HTMLAreaElement:A.eT,HTMLBaseElement:A.cL,Blob:A.cc,File:A.cc,HTMLBodyElement:A.cd,HTMLButtonElement:A.ce,CDATASection:A.bi,CharacterData:A.bi,Comment:A.bi,ProcessingInstruction:A.bi,Text:A.bi,CSSStyleDeclaration:A.cP,MSStyleCSSProperties:A.cP,CSS2Properties:A.cP,HTMLDivElement:A.ch,XMLDocument:A.ci,Document:A.ci,DOMException:A.hy,DOMImplementation:A.eZ,DOMRectReadOnly:A.dt,DOMTokenList:A.hz,Element:A.E,AbortPaymentEvent:A.p,AnimationEvent:A.p,AnimationPlaybackEvent:A.p,ApplicationCacheErrorEvent:A.p,BackgroundFetchClickEvent:A.p,BackgroundFetchEvent:A.p,BackgroundFetchFailEvent:A.p,BackgroundFetchedEvent:A.p,BeforeInstallPromptEvent:A.p,BeforeUnloadEvent:A.p,BlobEvent:A.p,CanMakePaymentEvent:A.p,ClipboardEvent:A.p,CloseEvent:A.p,CustomEvent:A.p,DeviceMotionEvent:A.p,DeviceOrientationEvent:A.p,ErrorEvent:A.p,ExtendableEvent:A.p,ExtendableMessageEvent:A.p,FetchEvent:A.p,FontFaceSetLoadEvent:A.p,ForeignFetchEvent:A.p,GamepadEvent:A.p,HashChangeEvent:A.p,InstallEvent:A.p,MediaEncryptedEvent:A.p,MediaKeyMessageEvent:A.p,MediaQueryListEvent:A.p,MediaStreamEvent:A.p,MediaStreamTrackEvent:A.p,MessageEvent:A.p,MIDIConnectionEvent:A.p,MIDIMessageEvent:A.p,MutationEvent:A.p,NotificationEvent:A.p,PageTransitionEvent:A.p,PaymentRequestEvent:A.p,PaymentRequestUpdateEvent:A.p,PopStateEvent:A.p,PresentationConnectionAvailableEvent:A.p,PresentationConnectionCloseEvent:A.p,PromiseRejectionEvent:A.p,PushEvent:A.p,RTCDataChannelEvent:A.p,RTCDTMFToneChangeEvent:A.p,RTCPeerConnectionIceEvent:A.p,RTCTrackEvent:A.p,SecurityPolicyViolationEvent:A.p,SensorErrorEvent:A.p,SpeechRecognitionError:A.p,SpeechRecognitionEvent:A.p,SpeechSynthesisEvent:A.p,StorageEvent:A.p,SyncEvent:A.p,TrackEvent:A.p,TransitionEvent:A.p,WebKitTransitionEvent:A.p,VRDeviceEvent:A.p,VRDisplayEvent:A.p,VRSessionEvent:A.p,MojoInterfaceRequestEvent:A.p,USBConnectionEvent:A.p,IDBVersionChangeEvent:A.p,AudioProcessingEvent:A.p,OfflineAudioCompletionEvent:A.p,WebGLContextEvent:A.p,Event:A.p,InputEvent:A.p,SubmitEvent:A.p,EventTarget:A.O,HTMLFormElement:A.f1,HTMLHeadingElement:A.dA,HTMLCollection:A.bQ,HTMLFormControlsCollection:A.bQ,HTMLOptionsCollection:A.bQ,HTMLDocument:A.dB,XMLHttpRequest:A.bR,XMLHttpRequestEventTarget:A.dC,ImageData:A.dD,HTMLImageElement:A.dE,HTMLInputElement:A.bS,KeyboardEvent:A.b5,HTMLLabelElement:A.dM,Location:A.dO,MouseEvent:A.aG,DragEvent:A.aG,PointerEvent:A.aG,WheelEvent:A.aG,DocumentFragment:A.t,ShadowRoot:A.t,DocumentType:A.t,Node:A.t,NodeList:A.dS,RadioNodeList:A.dS,HTMLOptionElement:A.dV,HTMLParagraphElement:A.dW,ProgressEvent:A.b8,ResourceProgressEvent:A.b8,HTMLSelectElement:A.dZ,HTMLSpanElement:A.cr,Storage:A.e1,HTMLTableElement:A.e4,HTMLTableRowElement:A.fw,HTMLTableSectionElement:A.fx,HTMLTemplateElement:A.cZ,HTMLTextAreaElement:A.e6,CompositionEvent:A.bn,FocusEvent:A.bn,TextEvent:A.bn,TouchEvent:A.bn,UIEvent:A.bn,Window:A.bZ,DOMWindow:A.bZ,DedicatedWorkerGlobalScope:A.bo,ServiceWorkerGlobalScope:A.bo,SharedWorkerGlobalScope:A.bo,WorkerGlobalScope:A.bo,Attr:A.d0,ClientRect:A.ed,DOMRect:A.ed,NamedNodeMap:A.em,MozNamedAttrMap:A.em,IDBKeyRange:A.dL,SVGScriptElement:A.cX,SVGAElement:A.u,SVGAnimateElement:A.u,SVGAnimateMotionElement:A.u,SVGAnimateTransformElement:A.u,SVGAnimationElement:A.u,SVGCircleElement:A.u,SVGClipPathElement:A.u,SVGDefsElement:A.u,SVGDescElement:A.u,SVGDiscardElement:A.u,SVGEllipseElement:A.u,SVGFEBlendElement:A.u,SVGFEColorMatrixElement:A.u,SVGFEComponentTransferElement:A.u,SVGFECompositeElement:A.u,SVGFEConvolveMatrixElement:A.u,SVGFEDiffuseLightingElement:A.u,SVGFEDisplacementMapElement:A.u,SVGFEDistantLightElement:A.u,SVGFEFloodElement:A.u,SVGFEFuncAElement:A.u,SVGFEFuncBElement:A.u,SVGFEFuncGElement:A.u,SVGFEFuncRElement:A.u,SVGFEGaussianBlurElement:A.u,SVGFEImageElement:A.u,SVGFEMergeElement:A.u,SVGFEMergeNodeElement:A.u,SVGFEMorphologyElement:A.u,SVGFEOffsetElement:A.u,SVGFEPointLightElement:A.u,SVGFESpecularLightingElement:A.u,SVGFESpotLightElement:A.u,SVGFETileElement:A.u,SVGFETurbulenceElement:A.u,SVGFilterElement:A.u,SVGForeignObjectElement:A.u,SVGGElement:A.u,SVGGeometryElement:A.u,SVGGraphicsElement:A.u,SVGImageElement:A.u,SVGLineElement:A.u,SVGLinearGradientElement:A.u,SVGMarkerElement:A.u,SVGMaskElement:A.u,SVGMetadataElement:A.u,SVGPathElement:A.u,SVGPatternElement:A.u,SVGPolygonElement:A.u,SVGPolylineElement:A.u,SVGRadialGradientElement:A.u,SVGRectElement:A.u,SVGSetElement:A.u,SVGStopElement:A.u,SVGStyleElement:A.u,SVGSVGElement:A.u,SVGSwitchElement:A.u,SVGSymbolElement:A.u,SVGTSpanElement:A.u,SVGTextContentElement:A.u,SVGTextElement:A.u,SVGTextPathElement:A.u,SVGTextPositioningElement:A.u,SVGTitleElement:A.u,SVGUseElement:A.u,SVGViewElement:A.u,SVGGradientElement:A.u,SVGComponentTransferFunctionElement:A.u,SVGFEDropShadowElement:A.u,SVGMPathElement:A.u,SVGElement:A.u})
hunkHelpers.setOrUpdateLeafTags({DOMError:true,MediaError:true,Navigator:true,NavigatorConcurrentHardware:true,NavigatorUserMediaError:true,OverconstrainedError:true,PositionError:true,GeolocationPositionError:true,Range:true,DataView:true,ArrayBufferView:false,Float32Array:true,Float64Array:true,Int16Array:true,Int32Array:true,Int8Array:true,Uint16Array:true,Uint32Array:true,Uint8ClampedArray:true,CanvasPixelArray:true,Uint8Array:false,HTMLAudioElement:true,HTMLBRElement:true,HTMLCanvasElement:true,HTMLContentElement:true,HTMLDListElement:true,HTMLDataElement:true,HTMLDataListElement:true,HTMLDetailsElement:true,HTMLDialogElement:true,HTMLEmbedElement:true,HTMLFieldSetElement:true,HTMLHRElement:true,HTMLHeadElement:true,HTMLHtmlElement:true,HTMLIFrameElement:true,HTMLLIElement:true,HTMLLegendElement:true,HTMLLinkElement:true,HTMLMapElement:true,HTMLMediaElement:true,HTMLMenuElement:true,HTMLMetaElement:true,HTMLMeterElement:true,HTMLModElement:true,HTMLOListElement:true,HTMLObjectElement:true,HTMLOptGroupElement:true,HTMLOutputElement:true,HTMLParamElement:true,HTMLPictureElement:true,HTMLPreElement:true,HTMLProgressElement:true,HTMLQuoteElement:true,HTMLScriptElement:true,HTMLShadowElement:true,HTMLSlotElement:true,HTMLSourceElement:true,HTMLStyleElement:true,HTMLTableCaptionElement:true,HTMLTableCellElement:true,HTMLTableDataCellElement:true,HTMLTableHeaderCellElement:true,HTMLTableColElement:true,HTMLTimeElement:true,HTMLTitleElement:true,HTMLTrackElement:true,HTMLUListElement:true,HTMLUnknownElement:true,HTMLVideoElement:true,HTMLDirectoryElement:true,HTMLFontElement:true,HTMLFrameElement:true,HTMLFrameSetElement:true,HTMLMarqueeElement:true,HTMLElement:false,HTMLAnchorElement:true,HTMLAreaElement:true,HTMLBaseElement:true,Blob:true,File:true,HTMLBodyElement:true,HTMLButtonElement:true,CDATASection:true,CharacterData:true,Comment:true,ProcessingInstruction:true,Text:true,CSSStyleDeclaration:true,MSStyleCSSProperties:true,CSS2Properties:true,HTMLDivElement:true,XMLDocument:true,Document:false,DOMException:true,DOMImplementation:true,DOMRectReadOnly:false,DOMTokenList:true,Element:false,AbortPaymentEvent:true,AnimationEvent:true,AnimationPlaybackEvent:true,ApplicationCacheErrorEvent:true,BackgroundFetchClickEvent:true,BackgroundFetchEvent:true,BackgroundFetchFailEvent:true,BackgroundFetchedEvent:true,BeforeInstallPromptEvent:true,BeforeUnloadEvent:true,BlobEvent:true,CanMakePaymentEvent:true,ClipboardEvent:true,CloseEvent:true,CustomEvent:true,DeviceMotionEvent:true,DeviceOrientationEvent:true,ErrorEvent:true,ExtendableEvent:true,ExtendableMessageEvent:true,FetchEvent:true,FontFaceSetLoadEvent:true,ForeignFetchEvent:true,GamepadEvent:true,HashChangeEvent:true,InstallEvent:true,MediaEncryptedEvent:true,MediaKeyMessageEvent:true,MediaQueryListEvent:true,MediaStreamEvent:true,MediaStreamTrackEvent:true,MessageEvent:true,MIDIConnectionEvent:true,MIDIMessageEvent:true,MutationEvent:true,NotificationEvent:true,PageTransitionEvent:true,PaymentRequestEvent:true,PaymentRequestUpdateEvent:true,PopStateEvent:true,PresentationConnectionAvailableEvent:true,PresentationConnectionCloseEvent:true,PromiseRejectionEvent:true,PushEvent:true,RTCDataChannelEvent:true,RTCDTMFToneChangeEvent:true,RTCPeerConnectionIceEvent:true,RTCTrackEvent:true,SecurityPolicyViolationEvent:true,SensorErrorEvent:true,SpeechRecognitionError:true,SpeechRecognitionEvent:true,SpeechSynthesisEvent:true,StorageEvent:true,SyncEvent:true,TrackEvent:true,TransitionEvent:true,WebKitTransitionEvent:true,VRDeviceEvent:true,VRDisplayEvent:true,VRSessionEvent:true,MojoInterfaceRequestEvent:true,USBConnectionEvent:true,IDBVersionChangeEvent:true,AudioProcessingEvent:true,OfflineAudioCompletionEvent:true,WebGLContextEvent:true,Event:false,InputEvent:false,SubmitEvent:false,EventTarget:false,HTMLFormElement:true,HTMLHeadingElement:true,HTMLCollection:true,HTMLFormControlsCollection:true,HTMLOptionsCollection:true,HTMLDocument:true,XMLHttpRequest:true,XMLHttpRequestEventTarget:false,ImageData:true,HTMLImageElement:true,HTMLInputElement:true,KeyboardEvent:true,HTMLLabelElement:true,Location:true,MouseEvent:true,DragEvent:true,PointerEvent:true,WheelEvent:true,DocumentFragment:true,ShadowRoot:true,DocumentType:true,Node:false,NodeList:true,RadioNodeList:true,HTMLOptionElement:true,HTMLParagraphElement:true,ProgressEvent:true,ResourceProgressEvent:true,HTMLSelectElement:true,HTMLSpanElement:true,Storage:true,HTMLTableElement:true,HTMLTableRowElement:true,HTMLTableSectionElement:true,HTMLTemplateElement:true,HTMLTextAreaElement:true,CompositionEvent:true,FocusEvent:true,TextEvent:true,TouchEvent:true,UIEvent:false,Window:true,DOMWindow:true,DedicatedWorkerGlobalScope:true,ServiceWorkerGlobalScope:true,SharedWorkerGlobalScope:true,WorkerGlobalScope:true,Attr:true,ClientRect:true,DOMRect:true,NamedNodeMap:true,MozNamedAttrMap:true,IDBKeyRange:true,SVGScriptElement:true,SVGAElement:true,SVGAnimateElement:true,SVGAnimateMotionElement:true,SVGAnimateTransformElement:true,SVGAnimationElement:true,SVGCircleElement:true,SVGClipPathElement:true,SVGDefsElement:true,SVGDescElement:true,SVGDiscardElement:true,SVGEllipseElement:true,SVGFEBlendElement:true,SVGFEColorMatrixElement:true,SVGFEComponentTransferElement:true,SVGFECompositeElement:true,SVGFEConvolveMatrixElement:true,SVGFEDiffuseLightingElement:true,SVGFEDisplacementMapElement:true,SVGFEDistantLightElement:true,SVGFEFloodElement:true,SVGFEFuncAElement:true,SVGFEFuncBElement:true,SVGFEFuncGElement:true,SVGFEFuncRElement:true,SVGFEGaussianBlurElement:true,SVGFEImageElement:true,SVGFEMergeElement:true,SVGFEMergeNodeElement:true,SVGFEMorphologyElement:true,SVGFEOffsetElement:true,SVGFEPointLightElement:true,SVGFESpecularLightingElement:true,SVGFESpotLightElement:true,SVGFETileElement:true,SVGFETurbulenceElement:true,SVGFilterElement:true,SVGForeignObjectElement:true,SVGGElement:true,SVGGeometryElement:true,SVGGraphicsElement:true,SVGImageElement:true,SVGLineElement:true,SVGLinearGradientElement:true,SVGMarkerElement:true,SVGMaskElement:true,SVGMetadataElement:true,SVGPathElement:true,SVGPatternElement:true,SVGPolygonElement:true,SVGPolylineElement:true,SVGRadialGradientElement:true,SVGRectElement:true,SVGSetElement:true,SVGStopElement:true,SVGStyleElement:true,SVGSVGElement:true,SVGSwitchElement:true,SVGSymbolElement:true,SVGTSpanElement:true,SVGTextContentElement:true,SVGTextElement:true,SVGTextPathElement:true,SVGTextPositioningElement:true,SVGTitleElement:true,SVGUseElement:true,SVGViewElement:true,SVGGradientElement:true,SVGComponentTransferFunctionElement:true,SVGFEDropShadowElement:true,SVGMPathElement:true,SVGElement:false})
A.aH.$nativeSuperclassTag="ArrayBufferView"
A.en.$nativeSuperclassTag="ArrayBufferView"
A.eo.$nativeSuperclassTag="ArrayBufferView"
A.bV.$nativeSuperclassTag="ArrayBufferView"
A.ep.$nativeSuperclassTag="ArrayBufferView"
A.eq.$nativeSuperclassTag="ArrayBufferView"
A.aS.$nativeSuperclassTag="ArrayBufferView"})()
convertAllToFastObject(w)
convertToFastObject($);(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!="undefined"){a(document.currentScript)
return}var s=document.scripts
function onLoad(b){for(var q=0;q<s.length;++q)s[q].removeEventListener("load",onLoad,false)
a(b.target)}for(var r=0;r<s.length;++r)s[r].addEventListener("load",onLoad,false)})(function(a){v.currentScript=a
var s=A.uo
if(typeof dartMainRunner==="function")dartMainRunner(s,[])
else s([])})})()
//# sourceMappingURL=main.dart.js.map
