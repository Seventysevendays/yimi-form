(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{121:function(e,t,r){"use strict";r.d(t,"a",(function(){return p})),r.d(t,"b",(function(){return m}));var n=r(0),a=r.n(n);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var b=a.a.createContext({}),u=function(e){var t=a.a.useContext(b),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},p=function(e){var t=u(e.components);return a.a.createElement(b.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},y=a.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,c=e.parentName,b=i(e,["components","mdxType","originalType","parentName"]),p=u(r),y=n,m=p["".concat(c,".").concat(y)]||p[y]||d[y]||o;return r?a.a.createElement(m,l(l({ref:t},b),{},{components:r})):a.a.createElement(m,l({ref:t},b))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,c=new Array(o);c[0]=y;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l.mdxType="string"==typeof e?e:n,c[1]=l;for(var b=2;b<o;b++)c[b]=r[b];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,r)}y.displayName="MDXCreateElement"},87:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return c})),r.d(t,"metadata",(function(){return l})),r.d(t,"rightToc",(function(){return i})),r.d(t,"default",(function(){return u}));var n=r(2),a=r(6),o=(r(0),r(121)),c={id:"arrayAction",title:"ArrayAction"},l={unversionedId:"api/arrayAction",id:"api/arrayAction",isDocsHomePage:!1,title:"ArrayAction",description:"ArrayAction \u4ecb\u7ecd\uff1a\u9002\u7528\u4e8e ArrayTable \u548c ArrayList \u7684\u64cd\u4f5c\u6309\u94ae\u7ec4\u4ef6",source:"@site/docs/api/arrayAction.mdx",slug:"/api/arrayAction",permalink:"/yimiform/docs/api/arrayAction",version:"current",sidebar:"docs",previous:{title:"ArrayTable",permalink:"/yimiform/docs/api/arrayTable"},next:{title:"Schema Form",permalink:"/yimiform/docs/api/schemaForm"}},i=[{value:"ArrayAction \u4ecb\u7ecd\uff1a\u9002\u7528\u4e8e ArrayTable \u548c ArrayList \u7684\u64cd\u4f5c\u6309\u94ae\u7ec4\u4ef6",id:"arrayaction-\u4ecb\u7ecd\uff1a\u9002\u7528\u4e8e-arraytable-\u548c-arraylist-\u7684\u64cd\u4f5c\u6309\u94ae\u7ec4\u4ef6",children:[{value:"\u65b9\u6cd5",id:"\u65b9\u6cd5",children:[]},{value:"\u4f7f\u7528",id:"\u4f7f\u7528",children:[]}]}],b={rightToc:i};function u(e){var t=e.components,r=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(n.a)({},b,r,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"arrayaction-\u4ecb\u7ecd\uff1a\u9002\u7528\u4e8e-arraytable-\u548c-arraylist-\u7684\u64cd\u4f5c\u6309\u94ae\u7ec4\u4ef6"},"ArrayAction \u4ecb\u7ecd\uff1a\u9002\u7528\u4e8e ArrayTable \u548c ArrayList \u7684\u64cd\u4f5c\u6309\u94ae\u7ec4\u4ef6"),Object(o.b)("h3",{id:"\u65b9\u6cd5"},"\u65b9\u6cd5"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"type ArrayTableCallback = (\n  core: Core,\n  dataSource: any[],\n  coreList: Core[]\n) => void;\n// core \u4e3a\u5bf9\u5e94\u64cd\u4f5c\u4e4b\u540e\u589e\u52a0\u6216\u5220\u9664\u7684\u884c\u7684core\uff0cdataSource\u4e3a\u64cd\u4f5c\u540e\u7684\u5217\u8868\u7684\u503c\uff0ccoreList\u4e3a\u64cd\u4f5c\u540e\u7684coreList\n")),Object(o.b)("table",null,Object(o.b)("thead",{parentName:"table"},Object(o.b)("tr",{parentName:"thead"},Object(o.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"\u540d\u5b57"),Object(o.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"\u8bf4\u660e"))),Object(o.b)("tbody",{parentName:"table"},Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"addBottom: (callback?: ArrayTableCallback) => void"),Object(o.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"\u5e95\u90e8\u6dfb\u52a0\u7684\u65b9\u6cd5")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"addTop: (callback?: ArrayTableCallback) => void"),Object(o.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"\u9876\u90e8\u6dfb\u52a0\u7684\u65b9\u6cd5")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"remove:(id: string, callback?: ArrayTableCallback) => void"),Object(o.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"\u5220\u9664\u7684\u65b9\u6cd5")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"insertAfter: (callback?: ArrayTableCallback) => void"),Object(o.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"\u5728\u5f53\u524d\u9879\u4e4b\u540e\u6dfb\u52a0\u7684\u65b9\u6cd5")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"insertBefore: (callback?: ArrayTableCallback) => void"),Object(o.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"\u5728\u5f53\u524d\u9879\u4e4b\u524d\u6dfb\u52a0\u7684\u65b9\u6cd5")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"dataSource: any[]"),Object(o.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"\u5f53\u524d\u6570\u636e")))),Object(o.b)("h3",{id:"\u4f7f\u7528"},"\u4f7f\u7528"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-jsx"}),"<FormItem\n  view={(core, { $id }) => {\n    // id\u5bf9\u5e94rowKey\u5c5e\u6027\n    return (\n      <ArrayAction>\n        {({ addBottom, addTop, insertAfter, insertBefore, remove }) => {\n          return (\n            <div>\n              <Button\n                onClick={() => {\n                  addBottom((core) => {\n                    console.log(core);\n                  });\n                }}\n              >\n                \u5217\u8868\u5e95\u90e8\u6dfb\u52a0\u9879\n              </Button>\n              <Button\n                onClick={() => {\n                  addTop((core) => {\n                    console.log(core);\n                  });\n                }}\n              >\n                \u5217\u8868\u9876\u90e8\u6dfb\u52a0\u9879\n              </Button>\n              <Button\n                onClick={() => {\n                  insertAfter($id, (core) => {\n                    console.log(core);\n                  });\n                }}\n              >\n                \u5f53\u524d\u884c\u5e95\u90e8\u589e\u52a0\n              </Button>\n              <Button\n                onClick={() => {\n                  insertBefore($id, (core) => {\n                    console.log(core);\n                  });\n                }}\n              >\n                \u5f53\u524d\u884c\u9876\u90e8\u589e\u52a0\n              </Button>\n              <Button\n                onClick={() => {\n                  remove($id, (core) => {\n                    console.log(core);\n                  });\n                }}\n              >\n                \u5220\u9664\n              </Button>\n            </div>\n          );\n        }}\n      </ArrayAction>\n    );\n  }}\n/>\n")))}u.isMDXComponent=!0}}]);