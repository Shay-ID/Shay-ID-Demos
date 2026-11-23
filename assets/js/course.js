(()=> {
const bar=document.querySelector('.progressline'), back=document.querySelector('.back-top');
const update=()=>{const max=document.documentElement.scrollHeight-innerHeight;bar.style.width=(max>0?scrollY/max*100:0)+'%';back.classList.toggle('show',scrollY>500)};
addEventListener('scroll',update,{passive:true});update();
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(n=>io.observe(n));
document.querySelectorAll('[data-scenario]').forEach(box=>{
 const feedback=box.querySelector('.feedback');
 box.querySelectorAll('.choice').forEach(btn=>btn.addEventListener('click',()=>{
  box.querySelectorAll('.choice').forEach(b=>b.classList.remove('selected'));btn.classList.add('selected');
  feedback.textContent=Number(btn.dataset.index)===Number(box.dataset.correct)?'✓ '+box.dataset.feedback:'Not quite. '+box.dataset.retry;
  feedback.classList.add('show');
 }));
});
const form=document.querySelector('#knowledge-check');
if(form) form.addEventListener('submit',e=>{
 e.preventDefault();let score=0;const qs=[...form.querySelectorAll('.question')];
 qs.forEach(q=>{const selected=q.querySelector('input:checked'),correct=Number(q.dataset.answer),note=q.querySelector('.q-feedback');
 if(selected&&Number(selected.value)===correct){score++;note.textContent='✓ Correct. '+q.dataset.why}else{note.textContent='Review: '+q.dataset.why}note.hidden=false;});
 const result=document.querySelector('.quiz-result');result.textContent='Your result: '+score+' / '+qs.length+'. '+(score===qs.length?'Excellent work.':score>=3?'Good progress. Review the explanations and revisit any uncertain ideas.':'Use the course sections to revisit the key concepts, then try again.');result.setAttribute('role','status');
});
})();