!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},t=e.parcelRequired7c6;null==t&&((t=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var i={id:e,exports:{}};return n[e]=i,t.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,n){o[e]=n},e.parcelRequired7c6=t);var i=t("h6c0i"),r=document.querySelector(".form"),c=document.querySelector('input[name="delay"]'),a=document.querySelector('input[name="step"]'),u=document.querySelector('input[name="amount"]');function l(e,n){return new Promise((function(o,t){var i=Math.random()>.3;setTimeout((function(){i?o({position:e,delay:n}):t({position:e,delay:n})}),n)}))}r.addEventListener("submit",(function(e){e.preventDefault();for(var n=parseInt(c.value),o=parseInt(a.value),t=parseInt(u.value),s=[],d=0;d<t;d++){var f=l(d+1,n+(d+1)*o);f.then((function(e){var n=e.position,o=e.delay;i.Notify.success("Fulfilled promise ".concat(n," in ").concat(o,"ms")),console.log("✅ Fulfilled promise ".concat(n," in ").concat(o,"ms")),r.reset()})).catch((function(e){var n=e.position,o=e.delay;i.Notify.failure("Rejected promise ".concat(n," in ").concat(o,"ms")),console.log("❌ Rejected promise ".concat(n," in ").concat(o,"ms")),r.reset()})),s.push(f)}}))}();
//# sourceMappingURL=03-promises.ac3741e0.js.map