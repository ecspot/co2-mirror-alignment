const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'..','mirrorline.html'),'utf8');
const core=html.match(/<script id="mirror-math">([\s\S]*?)<\/script>/);
assert.ok(core,'Numerical core must be included in the standalone HTML');
const M=vm.runInNewContext(core[1]+';MirrorMath');
const close=(a,b,t=1e-6)=>assert.ok(Math.abs(a-b)<=t,`${a} != ${b}`);
const solved=(cols,e,g=1,max=100)=>M.solve(cols,e,g,max);
let r=solved([{x:8,y:0},{x:0,y:-12}],{x:2,y:3});close(r.turns[0],.25);close(r.turns[1],-.25);close(r.movement.x,2);close(r.movement.y,3);
r=solved([{x:8,y:3},{x:-2,y:10}],{x:-2,y:3});close(r.movement.x,-2,.001);close(r.movement.y,3,.001);
r=solved([{x:10,y:0},{x:0,y:10},{x:-10,y:-10}],{x:3,y:-2});close(r.turns[0],.2667,.0001);close(r.turns[1],-.2333,.0001);close(r.turns[2],-.0333,.0001);close(r.turns.reduce((a,b)=>a+b),0,.0002);
r=solved([{x:10,y:5}],{x:2,y:-4});assert.equal(r.fullRank,false);close(r.turns[0],0);close(r.unreachable,Math.sqrt(20));
r=solved([{x:10,y:10},{x:-10,y:-10}],{x:4,y:0});assert.equal(r.fullRank,false);close(r.movement.x,2);close(r.movement.y,2);
r=solved([{x:10,y:0},{x:0,y:10}],{x:100,y:50},.7,.125);assert.equal(r.limited,true);close(r.turns[0],.125);close(r.turns[1],.0625);
r=solved([{x:0,y:10},{x:0,y:-20}],{x:3,y:2});assert.equal(r.fullRank,false);close(r.movement.x,0);close(r.movement.y,2);
r=solved([{x:10,y:0},{x:0,y:10}],{x:100,y:50},.7,.03125);assert.ok(r.turns.every(t=>Math.abs(t)<=.03125));
assert.throws(()=>M.vector({x:0,y:0},{x:1,y:1},0));assert.throws(()=>M.vector({x:0,y:0},{x:.001,y:0},.0625));
const v=M.vector({x:1,y:2},{x:0,y:4},-.125);close(v.x,8);close(v.y,-16);
assert.throws(()=>solved([{x:NaN,y:1}],{x:1,y:1}));assert.throws(()=>solved([],{x:1,y:1}));
// Repeated residual corrections converge under a modest calibration mismatch.
let p={x:4,y:-3};const model=[{x:12,y:4},{x:-3,y:9}],real=[{x:11,y:4.5},{x:-2.5,y:10}];
for(let k=0;k<30&&Math.hypot(p.x,p.y)>.1;k++){const s=solved(model,{x:-p.x,y:-p.y},.7,.125);real.forEach((c,i)=>{p.x+=c.x*s.turns[i];p.y+=c.y*s.turns[i];});}
assert.ok(Math.hypot(p.x,p.y)<.1);
// Full-rank solutions reproduce requested directions, with rounding bounded by responses.
let seed=712;const rand=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/2**32);
for(let k=0;k<1000;k++){const cols=Array.from({length:k%2+2},()=>({x:rand()*40-20,y:rand()*40-20}));const e={x:rand()*10-5,y:rand()*10-5};const s=solved(cols,e);if(s.fullRank&&!s.limited){close(s.movement.x,e.x,.004);close(s.movement.y,e.y,.004);}}
console.log('PASS: coupled axes, signed calibration, three-screw minimum norm, one-axis / singular mounts, shared step cap, invalid input, iterative convergence, 1,000 numerical cases.');
