let obj = {
    a:1,
}
let handlers = {
    get(target, key, context) {
        // target ===
        console.log("accessing", key);
        return Reflect.get(target, key, context);
    }
}
// var pobj = new Proxy(obj, handlers);
// console.log(obj.a);
// console.log(pobj.a);
let { proxy: pobj, revoke: prevoke } = Proxy.revocable(obj, handlers);
console.log(pobj.a);
prevoke();
console.log(pobj.a); // Cannot perform 'get' on a proxy that has been revoked

