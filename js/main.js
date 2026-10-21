(() => {
  const burger = document.getElementById('burger'), menu = document.getElementById('menu');
  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  menu.addEventListener('click', e => { if (e.target.tagName === 'A') { menu.classList.remove('open'); burger.setAttribute('aria-expanded', false); } });

  const swap = document.getElementById('swap');
  const words = ['djunto', 'kultura', 'rikeza'];
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let i = 0;
    setInterval(() => {
      swap.classList.add('out');
      setTimeout(() => { i = (i + 1) % words.length; swap.textContent = words[i]; swap.classList.remove('out'); }, 350);
    }, 2800);
  }

  const btns = document.querySelectorAll('.filters button');
  const cards = document.querySelectorAll('#grid .card');
  const empty = document.getElementById('empty');
  btns.forEach(b => b.addEventListener('click', () => {
    btns.forEach(x => x.classList.toggle('on', x === b));
    const f = b.dataset.f; let n = 0;
    cards.forEach(c => { const show = f === 'all' || c.dataset.cat.split(' ').includes(f); c.hidden = !show; if (show) n++; });
    empty.hidden = n > 0;
  }));

  const form = document.getElementById('form'), note = document.getElementById('note');
  form.addEventListener('submit', e => {
    e.preventDefault();
    form.querySelectorAll('input,textarea').forEach(f => f.classList.add('t'));
    if (!form.checkValidity()) { note.style.color = '#ce1126'; note.textContent = 'Preencha o nome e a mensagem.'; return; }
    const d = new FormData(form);
    note.style.color = ''; note.textContent = 'Mensagem copiada. Cole-a numa mensagem direta nas nossas redes.';
    navigator.clipboard?.writeText(`De: ${d.get('nome')}\n\n${d.get('msg')}`).catch(() => {});
  });

  document.getElementById('y').textContent = new Date().getFullYear();
})();
