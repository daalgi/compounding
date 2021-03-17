(this.webpackJsonpcompounding=this.webpackJsonpcompounding||[]).push([[0],{263:function(t,e,a){},264:function(t,e,a){},388:function(t,e,a){"use strict";a.r(e);var n=a(0),r=a.n(n),i=a(73),o=a.n(i),s=(a(263),a(16)),c=(a(264),a(110)),l=a(26),m=a(448),u=a(115),d=a(8),h=Object(u.a)({root:{},track:{height:4,backgroundColor:"hsl(220, 56%, 58%)"},rail:{height:2,opacity:.5,backgroundColor:"hsl(0, 0%, 70%)"},mark:{backgroundColor:"hsl(0, 0%, 50%)",height:8,width:2,marginTop:-3},markLabel:{color:"hsl(0, 0%, 70%)"},markActive:{opacity:1,backgroundColor:"currentColor"},thumb:{backgroundColor:"hsl(220, 56%, 78%)","&:focus,&:hover,&$active":{boxShadow:"inherit"}}})(m.a),p=function(t){var e=t.label,a=t.name,n=t.value,r=t.defaultValue,i=void 0===r?0:r,o=t.min,s=void 0===o?0:o,c=t.max,l=void 0===c?100:c,m=t.step,u=void 0===m?1:m,p=t.marks,y=void 0===p?null:p,v=t.factor,b=void 0===v?1:v,f=t.suffix,j=void 0===f?"":f,x=t.onChange,g=void 0===x?null:x;return Object(d.jsxs)("div",{className:"input-item",children:[Object(d.jsx)("p",{className:"input-label",children:e(n)}),Object(d.jsx)(h,{id:a,min:s,max:l,step:u,defaultValue:i,onChangeCommitted:function(t,e){return g(t.target.parentNode.id,e)},marks:null===y||void 0===y?void 0:y.map((function(t){return{label:"".concat(t*b).concat(j),value:t}})),valueLabelDisplay:"auto"})]})},y=function(t){var e=t.children;t.bold;return Object(d.jsx)("p",{className:"subtitle",children:e})},v=a(57),b=1e3,f=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;return Math.round(t*Math.pow(10,e))/Math.pow(10,e)},j=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,a=parseFloat(f(t,e));if(0===e)return parseInt(a).toString();var n=a%1===0?0:a.toString().split(".")[1].length;return 0===n?a.toString()+"."+Array(e-n).fill("0").join(""):n<e?a.toString()+Array(e-n).fill("0").join(""):a.toString()},x=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;return t<1e3?j(t,e):t<1e6?j(t/1e3,e)+"k":j(t/1e6,e)+"M"},g=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return j(100*t,e)+"%"},O=function(t){var e=t.length;if(e>0){var a=t.reduce((function(t,e){return t+e}))/e;return{mean:a,standardDeviation:Math.sqrt(t.map((function(t){return Math.pow(t-a,2)})).reduce((function(t,e){return t+e}))/e)}}return{}},k=function(t){var e=t.accumInvested,a=t.monthlyInvestment,n=t.roiMean,r=t.roiStsdv,i=0===r?n:function(t,e){var a,n,r;do{r=(a=2*Math.random()-1)*a+(n=2*Math.random()-1)*n}while(r>=1||0===r);return t+e*a*Math.sqrt(-2*Math.log(r)/r)}(n,r),o=(e+=a)*i;return{roi:i,interest:o,accumInvested:e+o}},S=function(t){var e=t.year,a=t.yearsToRetire,n=t.initialInvestment,r=t.strategy,i=r.monthlyDeposits,o=r.monthlyWithdrawals,s=r.roiMean,c=r.roiStsdv;if(n<=0)return{year:e,accumInvested:0};var l=n,m=[],u=e<a?i:-o;s/=12,c/=Math.sqrt(12);for(var d=0;d<12;d++){var h=k({accumInvested:l,monthlyInvestment:u,roiMean:s,roiStsdv:c});l=h.accumInvested,m.push(h)}var p={year:e,capitalContributions:12*u,accumInvested:l<0?0:l};return p.interest=l-n-p.capitalContributions,p.roi=(l-12*u)/n-1,p},w=function(t){for(var e=t.yearsToRetire,a=t.initialInvestment,n=t.monthlyDeposits,r=t.monthlyWithdrawals,i=t.roiMean,o=t.roiStsdv,s=t.lastYear,c=1,l=[],m=a,u=null;c<=s;){var d=S({year:c,yearsToRetire:e,initialInvestment:m,strategy:{monthlyDeposits:n,monthlyWithdrawals:r,roiMean:i,roiStsdv:o}});u||0!==m||(u=c),l.push(d),m=d.accumInvested,c++}return{retirementStart:{year:(new Date).getFullYear()+e,accumInvested:l[Math.max(e-1,0)].accumInvested},yearBankrupcy:u,annualRes:l,capital:{deposited:a+12*n*e,withdrawn:12*r*(s-e),lastYear:l[l.length-1].accumInvested},roi:{mean:l.reduce((function(t,e){return t+e.roi}),0)/l.length,minimum:Math.min.apply(Math,Object(v.a)(l.map((function(t){return t.roi})))),maximum:Math.max.apply(Math,Object(v.a)(l.map((function(t){return t.roi}))))}}},Y=[{label:function(t){return"Years to retire: ".concat(t)},name:"yearsToRetire",min:0,max:50,step:1,marks:[0,10,20,30,40,50]},{label:function(t){return"Initial investment: ".concat(t/1e3,"k")},name:"initialInvestment",min:0,max:5e5,step:1e3,marks:[0,1e5,2e5,3e5,4e5,5e5],factor:.001,suffix:"k"},{label:function(t){return"Monthly deposit: ".concat(t)},name:"monthlyDeposits",min:0,max:3e3,step:100,marks:[0,500,1e3,2e3,3e3]},{label:function(t){return"Monthly withdrawal: ".concat(t)},name:"monthlyWithdrawals",min:0,max:3e3,step:100,marks:[0,500,1e3,2e3,3e3]},{label:function(t){return"Years in retirement: ".concat(t)},name:"yearsInRetirement",min:20,max:60,step:5,marks:[20,30,40,50,60]}],I=[{label:function(t){return"Mean: ".concat(t,"%")},name:"roiMean",min:0,max:50,step:1,marks:[0,10,20,30,40,50]},{label:function(t){return"Standard deviation: ".concat(t,"%")},name:"roiStsdv",min:0,max:50,step:1,marks:[0,10,20,30,40,50]}],M={initialInvestment:5e3,monthlyDeposits:500,yearsToRetire:20,monthlyWithdrawals:1200,yearsInRetirement:40,roiMean:7,roiStsdv:19},D=function(t){var e=t.setState,a=Object(n.useState)(M),r=Object(s.a)(a,2),i=r[0],o=r[1];Object(n.useEffect)((function(){u()}),[]);var m=function(t,e){o(Object(l.a)(Object(l.a)({},i),{},Object(c.a)({},t,e)))},u=function(){var t=Object(l.a)(Object(l.a)({},i),{},{roiMean:i.roiMean/100,roiStsdv:i.roiStsdv/100}),a=function(t,e){var a=t.yearsToRetire+t.yearsInRetirement;t.lastYear=a;var n=w(Object(l.a)({},t));e.lastYear=a;for(var r=w(Object(l.a)({},e)),i=[],o=0;o<b;o++)i.push(w(Object(l.a)({},e)).capital.lastYear);var s=(new Date).getFullYear(),c=n.annualRes.map((function(t,e){return{year:t.year+s,constant:t.accumInvested/b,random:r.annualRes[e].accumInvested/b}}));return{scenario:{initialInvestment:t.initialInvestment,monthlyDeposits:t.monthlyDeposits,monthlyWithdrawals:t.monthlyWithdrawals,yearlyWithdrawals:12*t.monthlyWithdrawals},retirementStart:{year:n.retirementStart.year,constant:n.retirementStart.accumInvested,random:r.retirementStart.accumInvested,firstYearGains:c[t.yearsToRetire].constant-c[t.yearsToRetire-1].constant},lastYear:{year:s+t.lastYear,deposited:n.capital.deposited,withdrawn:n.capital.withdrawn,constant:n.capital.lastYear,random:r.capital.lastYear,normalDistribution:O(i)},yearBankrupcy:{constant:n.yearBankrupcy&&s+n.yearBankrupcy,random:r.yearBankrupcy&&s+r.yearBankrupcy},probabilities:{noBankrupcy:i.reduce((function(t,e){return e>0?t+1:t}),0)/i.length,lastYearGEdeposited:i.reduce((function(t,e){return e>=n.capital.deposited?t+1:t}),0)/i.length},plotData:c}}(Object(l.a)(Object(l.a)({},t),{},{roiStsdv:0}),t);e(a)};return Object(d.jsxs)("form",{onSubmit:function(t){t.preventDefault(),u()},className:"input-form",children:[Object(d.jsx)(y,{children:"Scenario parameters"}),Y.map((function(t,e){var a=t.label,n=t.name,r=t.min,o=t.max,s=t.step,c=t.marks,l=t.factor,u=t.suffix;return Object(d.jsx)(p,{label:a,name:n,value:i[n],defaultValue:M[n],onChange:m,min:r,max:o,step:s,marks:c,factor:l,suffix:u},e)})),Object(d.jsx)(y,{children:"Expected annual returns (normal distribution)"}),I.map((function(t,e){var a=t.label,n=t.name,r=t.min,o=t.max,s=t.step,c=t.marks,l=t.factor,u=t.suffix;return Object(d.jsx)(p,{label:a,name:n,value:i[n],defaultValue:M[n],onChange:m,min:r,max:o,step:s,marks:c,factor:l,suffix:u},e)})),Object(d.jsx)("button",{type:"submit",name:"btn",className:"btn",children:"Run simulation"})]})},R=function(t){var e=t.title,a=t.info,r=void 0===a?[]:a;return Object(d.jsxs)("div",{className:"results-card",children:[Object(d.jsx)(y,{children:e}),r.map((function(t,e){return"string"===typeof t?Object(d.jsx)("p",{children:t},e):Object(n.createElement)("p",Object(l.a)(Object(l.a)({},t),{},{key:e}),t.text)}))]})},B=function(t){var e=t.state;return Object(d.jsxs)("div",{className:"cards-container",children:[Object(d.jsx)(R,{title:"1000 random simulations",info:[{variant:"subtitle1",text:"Your investment in ".concat(e.lastYear.year,":")},"- ".concat(g(e.probabilities.noBankrupcy)," probability of still having money"),"- ".concat(g(e.probabilities.lastYearGEdeposited)," probability of having at least ").concat(x(e.lastYear.deposited)," (your deposits)")]}),Object(d.jsx)(R,{title:"Scenario Analysis",info:["Total deposits: ".concat(x(e.lastYear.deposited)),"Total withdrawals: ".concat(x(e.lastYear.withdrawn)),"Withdrawals in the first year of retirement (".concat(e.retirementStart.year,"): ").concat(x(e.scenario.yearlyWithdrawals)),{variant:"subtitle1",text:"Constant returns hypothesis:"},"- Retirement (".concat(e.retirementStart.year,"): \n                    ").concat(x(e.retirementStart.constant)),"- Gains during the first year in retirement: \n                    ".concat(x(1e3*e.retirementStart.firstYearGains)),"- Last year (".concat(e.lastYear.year,"): \n                    ").concat(x(e.lastYear.constant)),e.yearBankrupcy.constant?"- No money left in ".concat(e.yearBankrupcy.constant):"",{variant:"subtitle1",text:"One random simulation:"},"- Retirement (".concat(e.retirementStart.year,"): \n                    ").concat(x(e.retirementStart.random)),"- Last year (".concat(e.lastYear.year,"): \n                    ").concat(x(e.lastYear.random)),e.yearBankrupcy.random?"- No money left in ".concat(e.yearBankrupcy.random):""]})]})},C=a(230),W=function(t){var e=t.index,a=t.data;return e%=a.length,Object(d.jsxs)("div",{className:"tooltip",children:[Object(d.jsxs)("p",{children:["Year ",a[e].year]}),Object(d.jsxs)("p",{children:["Constant returns: ",x(1e3*a[e].constant)]}),Object(d.jsxs)("p",{children:["Random returns: ",x(1e3*a[e].random)]})]})},N=function(t){var e=t.data,a=t.years;return Object(d.jsx)("div",{className:"chart",children:Object(d.jsx)(C.a,{data:[{id:"constant",color:"hsl(18, 13%, 20%)",data:e.map((function(t){return{x:t.year,y:t.constant}}))},{id:"random",color:"hsl(8, 13%, 20%)",data:e.map((function(t){return{x:t.year,y:t.random}}))}],margin:{top:32,right:32,bottom:64,left:40},xScale:{type:"point"},yScale:{type:"linear",min:"auto",max:"auto",stacked:!1,reverse:!1},yFormat:" >-.2f",tooltip:function(t){var a=t.point;return Object(d.jsx)(W,{index:a.index,data:e})},axisTop:null,axisRight:null,axisBottom:{tickValues:[a.this,a.retirement,a.last],legend:"year",legendOffset:30,legendPosition:"middle"},axisLeft:{orient:"left",legendPosition:"middle",color:"white"},theme:{background:"hsl(220, 13%, 18%)",textColor:"white",fontSize:11,axis:{domain:{line:{stroke:"hsl(220, 13%, 80%)",strokeWidth:1}},ticks:{line:{stroke:"hsl(220, 13%, 30%)",strokeWidth:1}}},grid:{line:{stroke:"hsl(220, 13%, 23%)",strokeWidth:1}},crosshair:{line:{stroke:"hsl(220, 13%, 80%)"}},tooltip:{container:{background:"hsl(220, 13%, 23%)",color:"white"}}},pointSize:0,useMesh:!0,legends:[{anchor:"top-left",direction:"row",justify:!1,translateX:100,translateY:0,itemsSpacing:0,itemDirection:"left-to-right",itemWidth:80,itemHeight:20,itemOpacity:.75,symbolSize:12,symbolShape:"circle",symbolBorderColor:"rgba(0, 0, 0, .5)",effects:[{on:"hover",style:{itemBackground:"rgba(0, 0, 0, .03)",itemOpacity:1}}]}]})})},T={scenario:{initialInvestment:0,monthlyDeposits:0,monthlyWithdrawals:0,yearlyWithdrawals:0},retirementStart:{year:0,constant:0,random:0,firstYearGains:0},lastYear:{year:0,deposited:0,withdrawn:0,constant:0,random:0,normalDistribution:{mean:0,standardDeviation:0}},yearBankrupcy:{},probabilities:{noBankrupcy:0,lastYearGEdeposited:0},plotData:[{year:1,constant:0,random:0}]};var E=function(){var t=Object(n.useState)(T),e=Object(s.a)(t,2),a=e[0],r=e[1];return Object(d.jsxs)("div",{className:"",children:[Object(d.jsx)("h1",{className:"title",children:"Investment compounding"}),Object(d.jsxs)("div",{className:"page",children:[Object(d.jsx)(D,{setState:r}),Object(d.jsx)(B,{state:a}),Object(d.jsx)(N,{data:a.plotData,years:{this:(new Date).getFullYear(),retirement:a.retirementStart.year,last:a.lastYear.year}})]})]})};o.a.render(Object(d.jsx)(r.a.StrictMode,{children:Object(d.jsx)(E,{})}),document.getElementById("root"))}},[[388,1,2]]]);
//# sourceMappingURL=main.2425ff54.chunk.js.map