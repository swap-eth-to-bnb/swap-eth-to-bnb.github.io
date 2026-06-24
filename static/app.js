(function () {
'use strict';
var header = document.querySelector('.site-header');
var toggle = document.querySelector('.nav-toggle');
if (toggle && header) {
toggle.addEventListener('click', function () {
var open = header.classList.toggle('nav-open');
toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});
document.querySelectorAll('.site-nav a').forEach(function (a) {
a.addEventListener('click', function () { header.classList.remove('nav-open'); toggle.setAttribute('aria-expanded', 'false'); });
});
}
var widget = document.getElementById('app-widget');
if (!widget) return;
var TOK = {
eth: { tok: 'ETH', net: 'Ethereum', icon: 'eth' },
usdt: { tok: 'USDT', net: 'Multi-chain', icon: 'usdt' },
usdc: { tok: 'USDC', net: 'Multi-chain', icon: 'usdc' },
bnb: { tok: 'BNB', net: 'BNB Chain', icon: 'bnb' },
btc: { tok: 'BTC', net: 'Bitcoin', icon: 'btc' }
};
var LIST = (widget.getAttribute('data-assets') || 'eth,usdt,usdc,bnb,btc').split(',');
var fixed = widget.getAttribute('data-fixed') === '1';
function legEls(side) {
var leg = widget.querySelector('.leg[data-leg="' + side + '"]');
return leg ? { icon: leg.querySelector('.leg-icon'), tok: leg.querySelector('.tok'), net: leg.querySelector('.lnet'), box: leg.querySelector('.leg-tok') } : null;
}
var ff = legEls('from'), tt = legEls('to');
var flip = widget.querySelector('.flip-btn');
function swapDOM() {
if (!ff || !tt) return;
var a = { src: ff.icon.src, tok: ff.tok.textContent, net: ff.net.textContent };
var b = { src: tt.icon.src, tok: tt.tok.textContent, net: tt.net.textContent };
ff.icon.src = b.src; ff.tok.textContent = b.tok; ff.net.textContent = b.net;
tt.icon.src = a.src; tt.tok.textContent = a.tok; tt.net.textContent = a.net;
}
if (fixed) {
if (flip) flip.addEventListener('click', swapDOM);
return;
}
var state = { from: widget.getAttribute('data-from') || LIST[0], to: widget.getAttribute('data-to') || 'usdt' };
function paint(side, key) {
var t = TOK[key]; if (!t) return;
var e = legEls(side); if (!e) return;
if (e.icon) { e.icon.src = 'static/' + t.icon + '.png'; e.icon.alt = t.tok; }
if (e.tok) e.tok.textContent = t.tok;
if (e.net) e.net.textContent = t.net;
}
function render() { paint('from', state.from); paint('to', state.to); }
function cycle(side) {
var i = LIST.indexOf(state[side]); i = (i + 1) % LIST.length;
if (LIST[i] === state[side === 'from' ? 'to' : 'from']) i = (i + 1) % LIST.length;
state[side] = LIST[i]; render();
}
if (ff && ff.box) ff.box.addEventListener('click', function () { cycle('from'); });
if (tt && tt.box) tt.box.addEventListener('click', function () { cycle('to'); });
if (flip) flip.addEventListener('click', function () { var x = state.from; state.from = state.to; state.to = x; render(); });
render();
})();
