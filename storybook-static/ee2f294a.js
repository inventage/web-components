System.register(["./c2b9a440.js","./c26f64a3.js"],(function(e){"use strict";var t,n;return{setters:[function(e){t=e.Z},function(e){n=e.r}],execute:function(){e({renderDocs:function(e,t,n,r){return function(e,t,n){return u.apply(this,arguments)}(e,t,n).then(r)},unmountDocs:function(e){n.unmountComponentAtNode(e)}});var r={fontSize:"14px",letterSpacing:"0.2px",margin:"10px 0"},o={margin:"auto",padding:30,borderRadius:10,background:"rgba(0,0,0,0.03)"},a={textAlign:"center"},c=function(){return t.createElement("div",{style:r,className:"sb-nodocs sb-wrapper"},t.createElement("div",{style:o},t.createElement("h1",{style:a},"No Docs"),t.createElement("p",null,"Sorry, but there are no docs for the selected story. To add them, set the story's ",t.createElement("code",null,"docs")," parameter. If you think this is an error:"),t.createElement("ul",null,t.createElement("li",null,"Please check the story definition."),t.createElement("li",null,"Please check the Storybook config."),t.createElement("li",null,"Try reloading the page.")),t.createElement("p",null,"If the problem persists, check the browser console, or the terminal you've run Storybook from.")))};function i(e,t,n,r,o,a,c){try{var i=e[a](c),l=i.value}catch(e){return void n(e)}i.done?t(l):Promise.resolve(l).then(r,o)}function l(e){return function(){var t=this,n=arguments;return new Promise((function(r,o){var a=e.apply(t,n);function c(e){i(a,r,o,c,l,"next",e)}function l(e){i(a,r,o,c,l,"throw",e)}c(void 0)}))}}function u(){return(u=l(regeneratorRuntime.mark((function e(r,o,a){var i,l,u,s,d,m;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(null!=(u=r.parameters.docs)&&u.getPage||null!=u&&u.page)||null!=u&&u.getContainer||null!=u&&u.container){e.next=3;break}throw new Error("No `docs.container` set, did you run `addon-docs/preset`?");case 3:if(e.t1=u.container,e.t1){e.next=8;break}return e.next=7,null===(i=u.getContainer)||void 0===i?void 0:i.call(u);case 7:e.t1=e.sent;case 8:if(e.t0=e.t1,e.t0){e.next=11;break}e.t0=function(e){var n=e.children;return t.createElement(t.Fragment,null,n)};case 11:if(s=e.t0,e.t3=u.page,e.t3){e.next=17;break}return e.next=16,null===(l=u.getPage)||void 0===l?void 0:l.call(u);case 16:e.t3=e.sent;case 17:if(e.t2=e.t3,e.t2){e.next=20;break}e.t2=c;case 20:return d=e.t2,m=t.createElement(s,{key:r.componentId,context:o},t.createElement(d,null)),e.next=24,new Promise((function(e){n.render(m,a,e)}));case 24:case"end":return e.stop()}}),e)})))).apply(this,arguments)}c.displayName="NoDocs"}}}));