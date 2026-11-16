// FastMarket — Telegram-бот по продаже доната

const S = (n, p, stock = 5000, id, title) => ({ n, p, c: 'UZS', stock, id, title });
const D = (n, p, stock = 5000, id, title) => ({ n, p, c: 'USD', stock, id, title });

const GAMES = [
  {
    key: 'rb', emoji: '🧱', name: 'Roblox', unit: 'Robux', per: 'Robux',
    ask: 'ваш ник в Roblox',
    items: [
      S('100', 18000), S('200', 26539), S('300', 37150), S('400', 47990), S('500', 60000, 4999),
      S('600', 74399), S('700', 86199), S('800', 91990), S('900', 101099), S('1000', 111340),
      S('1240', 152000), S('1500', 171990), S('1740', 207290), S('2000', 228320), S('2250', 264595),
      S('2500', 289310), S('2700', 325000), S('3000', 350240), S('3600', 412500), S('4000', 460000),
      S('5000', 565000), S('7000', 760000), S('10000', 1100200),
    ],
  },
  {
    key: 'so', emoji: '🔫', name: 'Standoff 2', unit: 'Голда', per: 'голды',
    ask: 'ваш ID в Standoff 2',
    items: [
      S('100', 15550), S('200', 30500), S('300', 45500), S('500', 71330), S('600', 85500), S('700', 98100),
      D('800', 9.70), D('900', 10.67), D('1000', 11.60), D('1250', 14.20), D('1500', 16.70),
      D('1750', 19.10), D('2000', 21.50), D('2500', 27.50), D('3000', 33), D('4000', 40.50),
      D('5000', 50), D('7500', 82), D('10000', 109),
    ],
  },
  {
    key: 'ff', emoji: '🔥', name: 'Free Fire', unit: 'Diamonds', per: 'алмазов',
    ask: 'ваш ID игрока в Free Fire',
    items: [
      D('110', 1), D('341', 2.65), D('572', 4.28), D('1166', 8.36), D('2398', 16.50), D('6160', 65),
    ],
  },
  {
    key: 'pb', emoji: '🪖', name: 'PUBG Mobile', unit: 'UC', per: 'UC',
    ask: 'ваш Player ID в PUBG Mobile',
    items: [
      D('60', 1.09), D('325', 5.15), D('660', 9.87), D('1800', 24.33), D('3850', 47.67), D('8100', 94.59),
      D('Prime · 1 мес', 1.25, 3, 'pb_p1', 'PUBG Mobile: Prime (1 месяц)'),
      D('Prime Plus · 1 мес', 10, 3, 'pb_pp1', 'PUBG Mobile: Prime Plus (1 месяц)'),
      D('Prime · 3 мес', 3.25, 3, 'pb_p3', 'PUBG Mobile: Prime (3 месяца)'),
      D('Prime Plus · 3 мес', 29.70, 3, 'pb_pp3', 'PUBG Mobile: Prime Plus (3 месяца)'),
      D('Prime · 6 мес', 6, 3, 'pb_p6', 'PUBG Mobile: Prime (6 месяцев)'),
      D('Prime Plus · 6 мес', 58.02, 3, 'pb_pp6', 'PUBG Mobile: Prime Plus (6 месяцев)'),
      D('Prime · 12 мес', 11.74, 3, 'pb_p12', 'PUBG Mobile: Prime (12 месяцев)'),
      D('Prime Plus · 12 мес', 116.28, 3, 'pb_pp12', 'PUBG Mobile: Prime Plus (12 месяцев)'),
    ],
  },
  {
    key: 'ml', emoji: '⚔️', name: 'Mobile Legends', unit: 'Diamonds', per: 'алмазов',
    ask: 'ваш ID и Server ID', hint: 'Например: 123456789 (1234)',
    items: [
      D('86', 1.42), D('172', 2.71), D('257', 3.80), D('706', 10), D('2195', 28.64),
      D('3688', 48), D('5532', 72), D('9288', 118),
      D('Weekly Diamond Pass', 1.65, 5000, 'ml_wdp', 'Weekly Diamond Pass (Алмазный пропуск на 7 дней)'),
      D('Twilight Pass', 7.82, 5000, 'ml_tp', 'Twilight Pass (Сумеречный пропуск)'),
    ],
  },
];

const GAME = {};
const ITEMS = {};
for (const g of GAMES) {
  GAME[g.key] = g;
  for (const it of g.items) {
    it.id = it.id || `${g.key}_${it.n}`;
    it.title = it.title || `${it.n} ${g.per}`;
    it.game = g;
    ITEMS[it.id] = it;
  }
}

const LINE = '━━━━━━━━━━━━━━━━━━';

const MENU = {
  cats: '📖 Все категории 📖',
  stock: '📑 Наличие товаров 📑',
  about: '💡 О магазине',
  profile: '👤 Профиль 👤',
  rules: '📜 Правила',
  help: '❤️ Помощь',
  service: '🔰 О сервисе',
};

const KEYBOARD = {
  keyboard: [
    [{ text: MENU.cats }, { text: MENU.stock }],
    [{ text: MENU.about }, { text: MENU.profile }],
    [{ text: MENU.rules }, { text: MENU.help }, { text: MENU.service }],
  ],
  resize_keyboard: true,
  is_persistent: true,
};

const INFO = {
  about: () =>
    `💡 <b>О магазине FastMarket</b>\n${LINE}\n` +
    `FastMarket — магазин игровой валюты и подписок.\n\n` +
    `🎮 Roblox, Standoff 2, Free Fire, PUBG Mobile, Mobile Legends\n` +
    `⚡️ Быстрое выполнение заказов\n` +
    `🔒 Каждая оплата проверяется вручную\n` +
    `💬 Живая поддержка`,
  rules: () =>
    `📜 <b>Правила магазина</b>\n${LINE}\n` +
    `1️⃣ Проверьте ID / ник перед оплатой — донат придёт на указанные данные.\n\n` +
    `2️⃣ Оплачивайте точную сумму из заказа.\n\n` +
    `3️⃣ Чек отправляйте скриншотом прямо в этот бот.\n\n` +
    `4️⃣ Заказы выполняются по очереди после проверки оплаты.\n\n` +
    `5️⃣ Поддельный чек — блокировка без возврата.\n\n` +
    `6️⃣ Возврат возможен, только если заказ ещё не выполнен.`,
  help: (env) =>
    `❤️ <b>Помощь</b>\n${LINE}\n` +
    `Есть вопрос или проблема с заказом?\n\n` +
    `💬 Пишите в поддержку: ${esc(env.SUPPORT)}\n\n` +
    `📌 Сразу укажите <b>номер заказа</b> — так ответим быстрее ⚡️`,
  service: () =>
    `🔰 <b>Как сделать заказ</b>\n${LINE}\n` +
    `1️⃣ Откройте «${MENU.cats}»\n` +
    `2️⃣ Выберите игру и пакет\n` +
    `3️⃣ Нажмите 🛒 <b>Купить</b> и отправьте ID / ник\n` +
    `4️⃣ Оплатите по реквизитам и пришлите скрин чека\n` +
    `5️⃣ Получите донат ✅\n\n` +
    `Статус заказа всегда видно в «${MENU.profile}»`,
};

const STATUS = {
  wait_pay: '💳 ждёт оплаты',
  check: '⏳ на проверке',
  done: '✅ выполнен',
  rejected: '❌ отклонён',
  canceled: '🚫 отменён',
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/setup') return setup(env, url);
    if (url.pathname === '/webhook' && request.method === 'POST') {
      if (request.headers.get('X-Telegram-Bot-Api-Secret-Token') !== (await secret(env))) {
        return new Response('forbidden', { status: 403 });
      }
      const update = await request.json();
      try {
        await handle(env, update);
      } catch (e) {
        console.log('error', e && e.stack ? e.stack : e);
      }
      return new Response('ok');
    }
    return plain('FastMarket bot is running ⚡️');
  },
};

async function setup(env, url) {
  const missing = ['BOT_TOKEN', 'ADMIN_ID', 'CARD', 'SUPPORT'].filter((k) => !env[k]);
  if (!env.DB) missing.push('SUPABASE_URL', 'SUPABASE_KEY');
  if (missing.length) return plain(`❌ Не хватает настроек: ${missing.join(', ')}`);
  const r = await tg(env, 'setWebhook', {
    url: `${url.origin}/webhook`,
    secret_token: await secret(env),
    allowed_updates: ['message', 'callback_query'],
    drop_pending_updates: true,
  });
  if (!r.ok) return plain(`❌ Telegram ответил: ${r.description}`);
  await tg(env, 'setMyCommands', { commands: [{ command: 'start', description: '🏠 Главное меню' }] });
  const me = await tg(env, 'getMe', {});
  return plain(`✅ Готово! Бот @${me.result.username} подключён. Открой его в Telegram и нажми /start`);
}

async function handle(env, u) {
  if (u.callback_query) return onCallback(env, u.callback_query);
  const m = u.message;
  if (!m || m.chat.type !== 'private') return;
  const uid = m.from.id;
  const t = (m.text || '').trim();
  const state = await env.DB.get('st:' + uid, 'json');
  const menuKey = Object.keys(MENU).find((k) => MENU[k] === t);

  if (t.startsWith('/start') || menuKey) {
    if (state && state.step === 'id') await env.DB.delete('st:' + uid);
    if (t.startsWith('/start')) return onStart(env, m);
    return onMenu(env, m, menuKey);
  }
  if (state && state.step === 'id' && t) return onPlayerId(env, m, state, t);
  if (state && state.step === 'pay') {
    if (m.photo || m.document) return onReceipt(env, m, state);
    return send(env, uid, `📸 Отправьте <b>скриншот чека</b> об оплате заказа #${state.oid} — одним фото.`);
  }
  return send(env, uid, '👇 Пользуйтесь меню ниже', { reply_markup: KEYBOARD });
}

async function onStart(env, m) {
  await register(env, m.from);
  const text =
    `⚡️ <b>Добро пожаловать в FastMarket, ${esc(m.from.first_name)}!</b>\n${LINE}\n` +
    `🎮 Донат в любимые игры — быстро и надёжно\n\n` +
    `🧱 Roblox  •  🔫 Standoff 2  •  🔥 Free Fire\n` +
    `🪖 PUBG Mobile  •  ⚔️ Mobile Legends\n\n` +
    `👇 Выберите раздел в меню`;
  return send(env, m.chat.id, text, { reply_markup: KEYBOARD });
}

async function onMenu(env, m, key) {
  const chat = m.chat.id;
  if (key === 'cats') return send(env, chat, ...catsView());
  if (key === 'stock') return sendStock(env, chat);
  if (key === 'profile') return sendProfile(env, m);
  return send(env, chat, INFO[key](env));
}

function catsView() {
  const b = GAMES.map((g) => ({ text: `${g.emoji} ${g.name} (${g.unit})`, callback_data: 'cat:' + g.key }));
  return [`🎮 <b>Выберите категорию:</b>`, { reply_markup: { inline_keyboard: [[b[0], b[1]], [b[2], b[3]], [b[4]]] } }];
}

function gameView(g, stock) {
  const rows = [];
  let pair = [];
  for (const it of g.items) {
    const label = `${it.n} • ${money(it)}`;
    const btn = { text: left(stock, it) > 0 ? label : `❌ ${label}`, callback_data: 'p:' + it.id };
    if (label.length > 18) {
      if (pair.length) rows.push(pair);
      pair = [];
      rows.push([btn]);
    } else {
      pair.push(btn);
      if (pair.length === 2) {
        rows.push(pair);
        pair = [];
      }
    }
  }
  if (pair.length) rows.push(pair);
  rows.push([{ text: '⬅️ Назад к категориям', callback_data: 'cats' }]);
  const text =
    `${g.emoji} <b>${g.name} · ${g.unit}</b>\n${LINE}\n` +
    `⚡️ Быстрое пополнение после оплаты\n` +
    `👇 Выберите пакет:`;
  return [text, { reply_markup: { inline_keyboard: rows } }];
}

function cardView(it, stock) {
  const g = it.game;
  const n = left(stock, it);
  const text =
    `${g.emoji} <b>${g.name} · ${g.unit}</b>\n${LINE}\n` +
    `📦 <b>Товар:</b> ${it.title}\n` +
    `💰 <b>Цена:</b> ${money(it)}\n` +
    `📊 <b>В наличии:</b> ${n > 0 ? n + ' шт.' : 'нет'}\n${LINE}\n` +
    (n > 0 ? '👇 Нажмите «Купить», чтобы оформить заказ' : '😔 Товар временно закончился');
  const rows = [];
  if (n > 0) rows.push([{ text: '🛒 Купить', callback_data: 'buy:' + it.id }]);
  rows.push([{ text: '⬅️ Назад', callback_data: 'cat:' + g.key }]);
  return [text, { reply_markup: { inline_keyboard: rows } }];
}

async function onCallback(env, q) {
  const [act, arg] = (q.data || '').split(':');
  const msg = q.message;
  let ans = {};
  if (act === 'cats') await edit(env, msg, ...catsView());
  else if (act === 'cat' && GAME[arg]) await edit(env, msg, ...gameView(GAME[arg], await stockMap(env)));
  else if (act === 'p' && ITEMS[arg]) await edit(env, msg, ...cardView(ITEMS[arg], await stockMap(env)));
  else if (act === 'buy' && ITEMS[arg]) ans = await onBuy(env, q, ITEMS[arg]);
  else if (act === 'cancel') ans = await onCancel(env, q, arg);
  else if (act === 'ok' || act === 'no') ans = await onDecision(env, q, act, arg);
  await tg(env, 'answerCallbackQuery', { callback_query_id: q.id, ...ans });
}

async function onBuy(env, q, it) {
  const uid = q.from.id;
  const st = await env.DB.get('st:' + uid, 'json');
  if (st && st.step === 'pay') {
    return { text: `У вас есть неоплаченный заказ #${st.oid}. Отправьте чек или отмените его.`, show_alert: true };
  }
  if (left(await stockMap(env), it) <= 0) return { text: 'Товар закончился 😔', show_alert: true };
  await env.DB.put('st:' + uid, JSON.stringify({ step: 'id', pid: it.id }), { expirationTtl: 86400 });
  const g = it.game;
  const text =
    `🛒 <b>${g.name} · ${it.title}</b>\n` +
    `💰 ${money(it)}\n${LINE}\n` +
    `✍️ Отправьте <b>${g.ask}</b>` +
    (g.hint ? `\n<i>${g.hint}</i>` : '');
  await send(env, uid, text, { reply_markup: { inline_keyboard: [[{ text: '❌ Отмена', callback_data: 'cancel' }]] } });
  return {};
}

async function onPlayerId(env, m, st, t) {
  const uid = m.from.id;
  const it = ITEMS[st.pid];
  if (!it) return env.DB.delete('st:' + uid);
  if (t.length > 64) return send(env, uid, '⚠️ Слишком длинно. Отправьте только ID / ник.');

  const seq = ((await env.DB.get('seq', 'json')) || 1000) + 1;
  await env.DB.put('seq', String(seq));
  const order = {
    id: seq,
    uid,
    name: m.from.first_name || '',
    username: m.from.username || '',
    pid: it.id,
    title: `${it.game.name} · ${it.title}`,
    price: money(it),
    player: t,
    status: 'wait_pay',
    created: Date.now(),
  };
  await env.DB.put('o:' + seq, JSON.stringify(order));
  const user = (await env.DB.get('u:' + uid, 'json')) || { joined: Date.now(), orders: [] };
  user.orders.push(seq);
  await env.DB.put('u:' + uid, JSON.stringify(user));
  await env.DB.put('st:' + uid, JSON.stringify({ step: 'pay', oid: seq }));

  const text =
    `🧾 <b>Заказ #${seq} создан</b>\n${LINE}\n` +
    `🎮 <b>Товар:</b> ${order.title}\n` +
    `🆔 <b>Данные:</b> <code>${esc(t)}</code>\n` +
    `💰 <b>К оплате:</b> ${order.price}\n${LINE}\n` +
    `💳 Переведите сумму на карту:\n<code>${esc(env.CARD)}</code>\n\n` +
    `📸 После оплаты отправьте сюда <b>скриншот чека</b> — мы проверим и выполним заказ.`;
  return send(env, uid, text, {
    reply_markup: { inline_keyboard: [[{ text: '❌ Отменить заказ', callback_data: 'cancel:' + seq }]] },
  });
}

async function onCancel(env, q, oid) {
  const uid = q.from.id;
  const st = await env.DB.get('st:' + uid, 'json');
  if (oid) {
    const o = await env.DB.get('o:' + oid, 'json');
    if (!o || o.uid !== uid) return {};
    if (o.status !== 'wait_pay') return { text: `Заказ #${oid} уже ${STATUS[o.status].slice(2)}`, show_alert: true };
    o.status = 'canceled';
    await env.DB.put('o:' + oid, JSON.stringify(o));
    if (st && String(st.oid) === String(oid)) await env.DB.delete('st:' + uid);
    await edit(env, q.message, `🚫 <b>Заказ #${oid} отменён.</b>\nВыберите другой товар в «${MENU.cats}»`);
    return {};
  }
  if (st && st.step === 'id') await env.DB.delete('st:' + uid);
  await edit(env, q.message, `🚫 <b>Отменено.</b>\nВыберите другой товар в «${MENU.cats}»`);
  return {};
}

async function onReceipt(env, m, st) {
  const uid = m.from.id;
  const o = await env.DB.get('o:' + st.oid, 'json');
  await env.DB.delete('st:' + uid);
  if (!o || o.status !== 'wait_pay') return;
  o.status = 'check';
  await env.DB.put('o:' + o.id, JSON.stringify(o));

  const extra = {
    chat_id: env.ADMIN_ID,
    caption: adminCaption(o),
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: [[
        { text: '✅ Выполнен', callback_data: 'ok:' + o.id },
        { text: '❌ Отклонить', callback_data: 'no:' + o.id },
      ]],
    },
  };
  if (m.photo) await tg(env, 'sendPhoto', { ...extra, photo: m.photo[m.photo.length - 1].file_id });
  else await tg(env, 'sendDocument', { ...extra, document: m.document.file_id });

  return send(
    env,
    uid,
    `⏳ <b>Чек получен!</b>\n${LINE}\nЗаказ #${o.id} отправлен на проверку.\nМы напишем, как только он будет выполнен ⚡️`,
    { reply_markup: KEYBOARD },
  );
}

function adminCaption(o) {
  return (
    `🆕 <b>Заказ #${o.id}</b>\n${LINE}\n` +
    `👤 <a href="tg://user?id=${o.uid}">${esc(o.name || 'Покупатель')}</a>${o.username ? ' @' + esc(o.username) : ''}\n` +
    `🎮 ${o.title}\n` +
    `🆔 <code>${esc(o.player)}</code>\n` +
    `💰 ${o.price}\n${LINE}`
  );
}

async function onDecision(env, q, act, oid) {
  if (String(q.from.id) !== String(env.ADMIN_ID)) return { text: 'Нет доступа' };
  const o = await env.DB.get('o:' + oid, 'json');
  if (!o) return { text: 'Заказ не найден' };
  if (o.status !== 'check') return { text: `Заказ уже ${STATUS[o.status].slice(2)}` };
  const ok = act === 'ok';
  o.status = ok ? 'done' : 'rejected';
  await env.DB.put('o:' + oid, JSON.stringify(o));

  if (ok) {
    const stock = await stockMap(env);
    const it = ITEMS[o.pid];
    if (it) {
      stock[it.id] = Math.max(0, left(stock, it) - 1);
      await env.DB.put('stock', JSON.stringify(stock));
    }
    const user = await env.DB.get('u:' + o.uid, 'json');
    if (user) {
      user.done = (user.done || 0) + 1;
      await env.DB.put('u:' + o.uid, JSON.stringify(user));
    }
  }

  await tg(env, 'editMessageCaption', {
    chat_id: q.message.chat.id,
    message_id: q.message.message_id,
    caption: adminCaption(o) + '\n' + (ok ? '✅ <b>ВЫПОЛНЕН</b>' : '❌ <b>ОТКЛОНЁН</b>'),
    parse_mode: 'HTML',
  });
  await send(
    env,
    o.uid,
    ok
      ? `✅ <b>Заказ #${o.id} выполнен!</b>\n${LINE}\n🎮 ${o.title}\n\nСпасибо за покупку в FastMarket ⚡️`
      : `❌ <b>Заказ #${o.id} отклонён</b>\n${LINE}\nОплата не подтверждена.\nЕсли это ошибка — напишите в поддержку: ${esc(env.SUPPORT)}`,
  );
  return { text: ok ? 'Готово ✅' : 'Отклонено ❌' };
}

async function sendProfile(env, m) {
  const uid = m.from.id;
  const u = (await env.DB.get('u:' + uid, 'json')) || { joined: Date.now(), orders: [] };
  const last = u.orders.slice(-5).reverse();
  const orders = (await Promise.all(last.map((id) => env.DB.get('o:' + id, 'json')))).filter(Boolean);
  const joined = new Date(u.joined).toLocaleDateString('ru-RU', { timeZone: 'Asia/Tashkent' });
  let text =
    `👤 <b>Профиль</b>\n${LINE}\n` +
    `🆔 <b>ID:</b> <code>${uid}</code>\n` +
    `👋 <b>Имя:</b> ${esc(m.from.first_name || '')}\n` +
    `📅 <b>С нами с:</b> ${joined}\n` +
    `🛒 <b>Покупок:</b> ${u.done || 0}\n${LINE}\n`;
  text += orders.length
    ? `🧾 <b>Последние заказы:</b>\n` +
      orders.map((o) => `<b>#${o.id}</b> · ${o.title} · ${o.price}\n      ${STATUS[o.status]}`).join('\n')
    : `🧾 Заказов пока нет — загляните в «${MENU.cats}»`;
  return send(env, m.chat.id, text);
}

async function sendStock(env, chat) {
  const stock = await stockMap(env);
  const lines = GAMES.map((g) => {
    const have = g.items.filter((it) => left(stock, it) > 0).length;
    const out = g.items.length - have;
    return (
      `${g.emoji} <b>${g.name}</b> · ${g.unit}\n` +
      `      ✅ ${have} ${plural(have, 'товар', 'товара', 'товаров')}` +
      (out ? ` · ❌ ${out} нет` : '') +
      ` · от ${money(g.items[0])}`
    );
  });
  const text = `📑 <b>Наличие товаров</b>\n${LINE}\n${lines.join('\n\n')}\n${LINE}\n👇 Нажмите на игру, чтобы открыть товары`;
  return send(env, chat, text, { reply_markup: catsView()[1].reply_markup });
}

function plural(n, one, few, many) {
  const a = n % 10;
  const b = n % 100;
  if (a === 1 && b !== 11) return one;
  if (a >= 2 && a <= 4 && (b < 12 || b > 14)) return few;
  return many;
}

async function register(env, from) {
  const k = 'u:' + from.id;
  if (!(await env.DB.get(k))) await env.DB.put(k, JSON.stringify({ joined: Date.now(), orders: [] }));
}

async function stockMap(env) {
  return (await env.DB.get('stock', 'json')) || {};
}

function left(stock, it) {
  return stock[it.id] ?? it.stock;
}

function money(it) {
  if (it.c === 'UZS') return String(Math.round(it.p)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' сум';
  return it.p.toFixed(2).replace(/\.00$/, '').replace('.', ',') + ' $';
}

async function secret(env) {
  const h = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(env.BOT_TOKEN || ''));
  return [...new Uint8Array(h)].map((b) => b.toString(16).padStart(2, '0')).join('').slice(0, 48);
}

async function tg(env, method, body) {
  const r = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/${method}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
  const j = await r.json();
  if (!j.ok && !/not modified/.test(j.description || '')) console.log(method, j.description);
  return j;
}

function send(env, chat_id, text, extra = {}) {
  return tg(env, 'sendMessage', { chat_id, text, parse_mode: 'HTML', link_preview_options: { is_disabled: true }, ...extra });
}

function edit(env, msg, text, extra = {}) {
  return tg(env, 'editMessageText', {
    chat_id: msg.chat.id,
    message_id: msg.message_id,
    text,
    parse_mode: 'HTML',
    link_preview_options: { is_disabled: true },
    ...extra,
  });
}

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function plain(s) {
  return new Response(s, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
