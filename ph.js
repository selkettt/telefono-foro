(function(){
  var $ = function(s){ return document.querySelector(s); };
  var $$ = function(s){ return document.querySelectorAll(s); };
  var lock = $('#lock'), home = $('#home'), music = $('#music');
  var track = $('#track'), clock = $('#clock'), play = $('#play');
  var page = 0, sx = null, moved = false;

  function show(el){ el.classList.add('is-on'); }
  function hide(el){ el.classList.remove('is-on'); }

  function tick(){
    var d = new Date();
    clock.textContent = String(d.getHours()).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0');
  }
  tick(); setInterval(tick, 15000);

  function go(n){
    page = Math.max(0, Math.min(1, n));
    track.classList.toggle('is-p2', page === 1);
    $$('[data-page]').forEach(function(b){ b.classList.toggle('is-on', +b.getAttribute('data-page') === page); });
  }

  lock.addEventListener('click', function(){ hide(lock); show(home); });

  document.addEventListener('click', function(e){
    var t = e.target.closest('[data-open],[data-action],[data-page]');
    if(!t) return;
    if(t.hasAttribute('data-page')){ go(+t.getAttribute('data-page')); return; }
    if(t.getAttribute('data-action') === 'lock'){ hide(home); hide(music); show(lock); go(0); return; }
    var target = t.getAttribute('data-open');
    if(target === 'music'){ hide(home); show(music); }
    if(target === 'home'){ hide(music); show(home); }
  });

  track.addEventListener('pointerdown', function(e){ sx = e.clientX; moved = false; });
  track.addEventListener('pointermove', function(e){ if(sx !== null && Math.abs(e.clientX - sx) > 8) moved = true; });
  track.addEventListener('pointerup', function(e){
    if(sx === null) return;
    var dx = e.clientX - sx;
    if(dx < -40) go(1); else if(dx > 40) go(0);
    sx = null;
  });
  track.addEventListener('click', function(e){
    if(moved){ e.preventDefault(); e.stopPropagation(); moved = false; }
  }, true);

  play.addEventListener('click', function(){ play.textContent = play.textContent === '▶' ? '❚❚' : '▶'; });
})();
