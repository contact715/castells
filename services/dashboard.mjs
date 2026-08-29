#!/usr/bin/env node
/*
  Сборка пульта в файл — точка входа командной строки.

    node services/dashboard.mjs                 # в файл по умолчанию
    node services/dashboard.mjs путь/к/файлу.html

  ЗДЕСЬ НАМЕРЕННО НЕТ НИЧЕГО, КРОМЕ СКЛЕЙКИ. Раньше в этом файле жило всё
  разом: чтение профилей с диска, расчёт состояния и рисование HTML. Из-за
  этого сервер, которому нужен был только JSON, тянул за собой рисовалку
  страницы. Теперь каждый слой отвечает за своё:

    store/clients.mjs  читает профили с диска
    app/state.mjs      считает состояние по правилам ядра
    web/render.mjs     рисует страницу

  Файл остаётся на прежнем месте и с прежним именем, потому что на него
  ссылаются README и package.json: точку входа не переименовывают заодно с
  перестановкой слоёв.
*/

import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

import { СТАДИИ } from './core/stages.mjs';
import { собратьПроекты } from './app/state.mjs';
import { страница } from './web/render.mjs';

const КОРЕНЬ = dirname(fileURLToPath(import.meta.url));

async function главная() {
  const куда = process.argv[2] || join(КОРЕНЬ, 'dashboard.html');
  const проекты = await собратьПроекты();
  const html = страница(проекты, new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC');
  await writeFile(resolve(куда), html, 'utf8');
  console.log(`Пульт собран: ${resolve(куда)}`);
  console.log(`  проектов: ${проекты.length}`);
  for (const п of проекты) {
    console.log(
      `  ${п.id}: стадий делаем ${п.стадии.filter(с => с.код === 'сделано').length}/${СТАДИИ.length}, ` +
      `доступов ${п.доступы.открыто}/${п.доступы.всего}, ` +
      `отчёт ${п.отчёт.можноОтправлять ? 'уйдёт' : 'не уйдёт'}`,
    );
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  главная().catch(e => {
    console.error(e);
    process.exit(1);
  });
}
