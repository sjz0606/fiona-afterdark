/* fiona — After Dark · concept v2 */
(function () {
  'use strict';

  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FINE = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ------------------------------------------------------------------ i18n */
  var T = {
    ru: {
      skip: 'К витрине', nav_story: 'Путь букета', nav_shop: 'Витрина', nav_special: 'Особые случаи', nav_cal: 'Поводы', nav_contacts: 'Контакты',
      order: 'Заказать', in_tashkent: 'в Ташкенте',
      hero_h: 'Букеты, которые|приезжают|даже в полночь',
      hero_sub: 'Премиальные свежие цветы с доставкой по Ташкенту за 30–60 минут. Каждый день с 9:00 до 01:00.',
      cta_pick: 'Выбрать букет', cta_tg: 'Написать в Telegram',
      open_state: 'Открыто · доставим за 30–60 мин', closed_state: 'Закрыто · принимаем предзаказ на 9:00',
      open_mini: 'Открыто до 01:00', closed_mini: 'Откроемся в 9:00',
      note_open: 'Принимаем заказы до 01:00', note_closing: 'До закрытия {t}', note_closed: 'Откроемся через {t}',
      h: 'ч', m: 'мин',
      story_h: 'Как букет|находит её', story_lead: 'Пять кадров из жизни одного заказа — от сообщения в Direct до момента, когда открывается дверь.', story_hint: 'Листайте вниз',
      ch1_t: 'Заказ', ch1_p: 'Выберите букет на витрине или пришлите пример в Direct или Telegram. Уточним цвета, размер и время доставки.',
      ch2_t: 'Флорист собирает', ch2_p: 'Флорист собирает букет вручную из свежих цветов — по вашему поводу и бюджету.',
      ch3_t: 'Фото перед отправкой', ch3_p: 'Попросите прислать фото готового букета — вы увидите его раньше, чем она.',
      ch4_t: 'Курьер в пути', ch4_p: 'Только по Ташкенту, обычно за 30–60 минут. Даже если вы вспомнили поздно вечером.',
      ch5_t: 'Её улыбка', ch5_p: 'Остальное — её момент.', ch5_cta: 'Начать заказ',
      cor_h: 'Ночная|галерея', cor_lead: 'Листайте — букеты из нашего Instagram проплывают мимо. Нажмите на любой, чтобы заказать такой же.', cor_order: 'Заказать этот букет',
      vit_h: 'Витрина', vit_lead: 'Букеты из нашего Instagram с реальными ценами. Нажмите на любой, чтобы заказать такой же.',
      t_all: 'Все', t0: 'до 1 млн', t1: '1–3 млн', t2: '3–6 млн', t3: 'от 6 млн',
      tg0: 'До 1 млн сум', tg1: 'От 1 до 3 млн сум', tg2: 'От 3 до 6 млн сум', tg3: 'От 6 млн сум',
      n_bouquets: '{n} букетов', show_all: 'Показать все {n}', sum: 'сум', from: 'от', each: 'за корзину', video: 'видео', card_order: 'Заказать',
      vit_note: 'Каждый букет собирается заново: оттенки и количество цветов могут немного отличаться — флорист уточнит перед сборкой.',
      bouquet_alt: 'Букет fiona за {p} сум',
      sp_h: 'Особые|случаи',
      bride_t: 'Букет невесты', bride_p: 'Свадебные букеты, которые мы собирали для наших невест. Напишите — обсудим ваш.', bride_cta: 'Обсудить букет невесты',
      peony_t: 'Пионы', peony_p: 'Сезонный цветок. Цены из нашего последнего прайса, наличие уточняйте у флориста.', pcs: 'шт',
      cal_h: 'Календарь|поводов', cal_lead: 'В праздники заказов особенно много — лучше договориться заранее.',
      cal_next: 'До ближайшего повода', u_d: 'дней', u_h: 'часов', u_m: 'минут', u_s: 'секунд', cal_cta: 'Оформить предзаказ',
      occ_today: 'сегодня', occ_in: 'через {n} дн.', occ_go: 'Предзаказ',
      o_feb14: 'День всех влюблённых', o_mar8: 'Международный женский день', o_sep1: 'День знаний', o_oct1: 'День учителя', o_ny: 'Новый год',
      months: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
      tr_h: 'Отзывы', tr_rating: 'на Яндекс Картах, 82 оценки', tr_read: 'Читать отзывы', tr_cap: 'О чём чаще всего пишут покупатели',
      th1: 'Быстрая доставка — всё как в заказе', th2: 'Свежие, красивые цветы', th3: 'Вежливые и отзывчивые сотрудники', th4: 'Работают допоздна',
      f1: 'минут — доставка по городу', f2: 'каждый день, без выходных', f3t: 'Ташкент', f3: 'доставляем только в пределах города',
      ph_cap: 'Ваши фотографии — из наших сторис', ph_alt: 'Фото покупателя с букетом fiona',
      care_h: 'Чтобы букет жил дольше',
      c1: 'Вымойте вазу с моющим средством.', c2: 'Налейте прохладную, но не ледяную воду.', c3: 'Уберите нижние листья — они не должны касаться воды.',
      c4: 'Подрежьте стебли под углом 45°.', c5: 'Держите букет в прохладе — вдали от батарей, солнца и кондиционера.', c6: 'Меняйте воду каждый день и мойте вазу.',
      ct_h: 'Магазин|открыт до часу ночи', ct_alt: 'Вход в магазин fiona', addr: 'ул. Абдуллы Каххора, 47А, Ташкент', hours: 'Каждый день 9:00–01:00', map: 'Открыть на карте',
      foot_tag: 'Цветы Ташкент · Доставка · Магазин подарков', concept: 'Концепт сайта · Lumagen',
      close: 'Закрыть', see_ig: 'Открыть пост в Instagram', budget: 'Бюджет', when: 'Когда доставить', today: 'Сегодня', tomorrow: 'Завтра', other_date: 'Другая дата',
      asap: 'Как можно скорее · 30–60 мин', no_slots: 'На сегодня свободных интервалов не осталось — выберите завтра.',
      closed_slots: 'Сейчас мы закрыты. Заказ на сегодня соберём после 9:00.',
      recipient: 'Получатель', ph_name: 'Имя получателя', ph_phone: 'Телефон получателя', ph_addr: 'Адрес в Ташкенте', ph_card: 'Текст открытки (необязательно)',
      photo_req: 'Прислать мне фото букета перед отправкой', your_msg: 'Ваше сообщение',
      msg_note: 'Сайт не принимает оплату: отправьте этот текст нам — флорист подтвердит заказ и цену.',
      call: 'Позвонить', copy: 'Скопировать текст', copied: 'Текст скопирован — вставьте его в чат', copied_open: 'Текст скопирован — вставьте его в чат, который сейчас откроется',
      k_bouquet: 'Букет с витрины', k_bride: 'Особый случай', k_peony: 'Пионы', k_occ: 'Предзаказ', k_free: 'Новый заказ',
      t_free: 'Соберём букет для вас', t_bride: 'Букет невесты',
      b_any: 'Подберите сами',
      m_hello: 'Здравствуйте! Хочу заказать букет.', m_bouquet: 'Букет', m_free: 'Букет: подберите, пожалуйста, на ваш вкус', m_budget: 'Бюджет',
      m_occ: 'Повод', m_when: 'Доставка', m_rec: 'Получатель', m_tel: 'тел.', m_addr: 'Адрес', m_card: 'Открытка', m_photo: 'Пришлите, пожалуйста, фото букета перед отправкой.',
      m_bride: 'Букет невесты — хочу обсудить', m_peony: 'Пионы',
      today_l: 'сегодня', tomorrow_l: 'завтра', m_asap: 'как можно скорее', m_nodate: 'дату уточню'
    },
    uz: {
      skip: 'Vitrinaga', nav_story: 'Guldasta yo‘li', nav_shop: 'Vitrina', nav_special: 'Maxsus kunlar', nav_cal: 'Bayramlar', nav_contacts: 'Aloqa',
      order: 'Buyurtma', in_tashkent: 'Toshkentda',
      hero_h: 'Yarim tunda ham|yetib boradigan|guldastalar',
      hero_sub: 'Toshkent bo‘ylab 30–60 daqiqada yetkaziladigan premium yangi gullar. Har kuni 9:00 dan 01:00 gacha.',
      cta_pick: 'Guldasta tanlash', cta_tg: 'Telegramga yozish',
      open_state: 'Ochiq · 30–60 daqiqada yetkazamiz', closed_state: 'Yopiq · soat 9:00 ga oldindan buyurtma olamiz',
      open_mini: '01:00 gacha ochiq', closed_mini: '9:00 da ochilamiz',
      note_open: 'Buyurtmalarni 01:00 gacha qabul qilamiz', note_closing: 'Yopilishiga {t} qoldi', note_closed: '{t} dan keyin ochilamiz',
      h: 'soat', m: 'daq',
      story_h: 'Guldasta uni|qanday topadi', story_lead: 'Bitta buyurtmaning besh kadri — Directdagi xabardan eshik ochilgan lahzagacha.', story_hint: 'Pastga aylantiring',
      ch1_t: 'Buyurtma', ch1_p: 'Vitrinadan guldasta tanlang yoki Direct yoki Telegramga namuna yuboring. Ranglar, o‘lcham va yetkazish vaqtini aniqlashtiramiz.',
      ch2_t: 'Florist yig‘adi', ch2_p: 'Florist guldastani yangi gullardan qo‘lda yig‘adi — sababingiz va byudjetingizga qarab.',
      ch3_t: 'Jo‘natishdan oldin surat', ch3_p: 'Tayyor guldasta suratini so‘rang — siz uni u ko‘rishidan oldin ko‘rasiz.',
      ch4_t: 'Kuryer yo‘lda', ch4_p: 'Faqat Toshkent bo‘ylab, odatda 30–60 daqiqada. Kech kechqurun eslagan bo‘lsangiz ham.',
      ch5_t: 'Uning tabassumi', ch5_p: 'Qolgani — uning lahzasi.', ch5_cta: 'Buyurtmani boshlash',
      cor_h: 'Tungi|galereya', cor_lead: 'Aylantiring — Instagramimizdagi guldastalar yoningizdan suzib o‘tadi. Xuddi shundayini buyurtma qilish uchun ustiga bosing.', cor_order: 'Buyurtma qilish',
      vit_h: 'Vitrina', vit_lead: 'Instagramimizdagi guldastalar haqiqiy narxlari bilan. Xuddi shundayini buyurtma qilish uchun ustiga bosing.',
      t_all: 'Barchasi', t0: '1 mln gacha', t1: '1–3 mln', t2: '3–6 mln', t3: '6 mln dan',
      tg0: '1 mln so‘mgacha', tg1: '1 mln dan 3 mln so‘mgacha', tg2: '3 mln dan 6 mln so‘mgacha', tg3: '6 mln so‘mdan',
      n_bouquets: '{n} ta guldasta', show_all: 'Barcha {n} tasini ko‘rsatish', sum: 'so‘m', from: 'dan', each: 'har biri', video: 'video', card_order: 'Buyurtma',
      vit_note: 'Har bir guldasta qaytadan yig‘iladi: ranglar va gullar soni biroz farq qilishi mumkin — florist yig‘ishdan oldin aniqlashtiradi.',
      bouquet_alt: 'fiona guldastasi, {p} so‘m',
      sp_h: 'Maxsus|kunlar',
      bride_t: 'Kelin guldastasi', bride_p: 'Kelinlarimiz uchun yig‘gan to‘y guldastalarimiz. Yozing — siznikini muhokama qilamiz.', bride_cta: 'Kelin guldastasini muhokama qilish',
      peony_t: 'Pionlar', peony_p: 'Mavsumiy gul. Narxlar so‘nggi narxnomamizdan, mavjudligini floristdan so‘rang.', pcs: 'dona',
      cal_h: 'Bayramlar|taqvimi', cal_lead: 'Bayramlarda buyurtmalar juda ko‘p — oldindan kelishib olgan ma’qul.',
      cal_next: 'Eng yaqin bayramgacha', u_d: 'kun', u_h: 'soat', u_m: 'daqiqa', u_s: 'soniya', cal_cta: 'Oldindan buyurtma berish',
      occ_today: 'bugun', occ_in: '{n} kundan keyin', occ_go: 'Oldindan buyurtma',
      o_feb14: 'Sevishganlar kuni', o_mar8: 'Xalqaro xotin-qizlar kuni', o_sep1: 'Bilimlar kuni', o_oct1: 'O‘qituvchilar kuni', o_ny: 'Yangi yil',
      months: ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr'],
      tr_h: 'Sharhlar', tr_rating: 'Yandex Xaritalarda, 82 ta baho', tr_read: 'Sharhlarni o‘qish', tr_cap: 'Xaridorlar ko‘pincha nima haqida yozadi',
      th1: 'Tez yetkazish — hammasi buyurtmadagidek', th2: 'Yangi, chiroyli gullar', th3: 'Xushmuomala va e’tiborli xodimlar', th4: 'Kechgacha ishlaydi',
      f1: 'daqiqa — shahar bo‘ylab yetkazish', f2: 'har kuni, dam olishsiz', f3t: 'Toshkent', f3: 'faqat shahar hududida yetkazamiz',
      ph_cap: 'Sizning suratlaringiz — storislarimizdan', ph_alt: 'Xaridorning fiona guldastasi bilan surati',
      care_h: 'Guldasta uzoqroq yashashi uchun',
      c1: 'Vazani yuvish vositasi bilan yuving.', c2: 'Salqin, lekin muzdek bo‘lmagan suv quying.', c3: 'Pastki barglarni olib tashlang — ular suvga tegmasin.',
      c4: 'Poyalarni 45° burchak ostida kesing.', c5: 'Guldastani salqin joyda saqlang — isitgich, quyosh va konditsionerdan uzoqda.', c6: 'Suvni har kuni almashtiring va vazani yuving.',
      ct_h: 'Do‘kon|tungi soat birgacha ochiq', ct_alt: 'fiona do‘koniga kirish', addr: 'Abdulla Qahhor ko‘chasi, 47A, Toshkent', hours: 'Har kuni 9:00–01:00', map: 'Xaritada ochish',
      foot_tag: 'Gullar Toshkent · Yetkazib berish · Sovg‘alar do‘koni', concept: 'Sayt konsepti · Lumagen',
      close: 'Yopish', see_ig: 'Postni Instagramda ochish', budget: 'Byudjet', when: 'Qachon yetkazish', today: 'Bugun', tomorrow: 'Ertaga', other_date: 'Boshqa sana',
      asap: 'Imkon qadar tez · 30–60 daq', no_slots: 'Bugun uchun bo‘sh vaqt qolmadi — ertani tanlang.',
      closed_slots: 'Hozir yopiqmiz. Bugungi buyurtmani 9:00 dan keyin yig‘amiz.',
      recipient: 'Qabul qiluvchi', ph_name: 'Qabul qiluvchi ismi', ph_phone: 'Qabul qiluvchi telefoni', ph_addr: 'Toshkentdagi manzil', ph_card: 'Otkritka matni (ixtiyoriy)',
      photo_req: 'Jo‘natishdan oldin guldasta suratini yuboring', your_msg: 'Sizning xabaringiz',
      msg_note: 'Sayt to‘lov qabul qilmaydi: ushbu matnni bizga yuboring — florist buyurtma va narxni tasdiqlaydi.',
      call: 'Qo‘ng‘iroq qilish', copy: 'Matnni nusxalash', copied: 'Matn nusxalandi — uni chatga qo‘ying', copied_open: 'Matn nusxalandi — ochiladigan chatga qo‘ying',
      k_bouquet: 'Vitrinadagi guldasta', k_bride: 'Maxsus kun', k_peony: 'Pionlar', k_occ: 'Oldindan buyurtma', k_free: 'Yangi buyurtma',
      t_free: 'Siz uchun guldasta yig‘amiz', t_bride: 'Kelin guldastasi',
      b_any: 'O‘zingiz tanlang',
      m_hello: 'Assalomu alaykum! Guldasta buyurtma qilmoqchiman.', m_bouquet: 'Guldasta', m_free: 'Guldasta: o‘zingizning didingizga ko‘ra tanlang', m_budget: 'Byudjet',
      m_occ: 'Sabab', m_when: 'Yetkazish', m_rec: 'Qabul qiluvchi', m_tel: 'tel.', m_addr: 'Manzil', m_card: 'Otkritka', m_photo: 'Iltimos, jo‘natishdan oldin guldasta suratini yuboring.',
      m_bride: 'Kelin guldastasi — muhokama qilmoqchiman', m_peony: 'Pionlar',
      today_l: 'bugun', tomorrow_l: 'ertaga', m_asap: 'imkon qadar tez', m_nodate: 'sanani aniqlashtiraman'
    }
  };
  var lang = 'ru';
  try { var saved = localStorage.getItem('fiona_v2_lang'); if (saved === 'uz' || saved === 'ru') lang = saved; } catch (e) {}
  function t(k) { var v = T[lang][k]; if (v === undefined) v = T.ru[k] || k; return typeof v === 'string' ? v.replace(/(\d)–(\d)/g, '$1–⁠$2') : v; }
  function fmt(s, o) { return String(s).replace(/\{(\w+)\}/g, function (_, k) { return o[k]; }); }
  function money(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }

  function splitLines(el, text) {
    el.innerHTML = '';
    text.split('|').forEach(function (line) {
      var o = document.createElement('span'); o.className = 'ln';
      var i = document.createElement('span'); i.textContent = line;
      o.appendChild(i); el.appendChild(o);
    });
  }

  function applyLang() {
    document.documentElement.lang = lang === 'uz' ? 'uz' : 'ru';
    $$('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    $$('[data-i18n-ph]').forEach(function (el) { el.placeholder = t(el.getAttribute('data-i18n-ph')); });
    $$('[data-i18n-alt]').forEach(function (el) { el.alt = t(el.getAttribute('data-i18n-alt')); });
    $$('[data-i18n-aria]').forEach(function (el) { el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria'))); });
    $$('[data-i18n-lines]').forEach(function (el) { splitLines(el, t(el.getAttribute('data-i18n-lines'))); });
    $$('.lang button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === lang)); });
    renderVitrina(); renderReels(); renderOcc(); tick(); if (sheet.open) { renderSheetHead(); renderBudget(); renderSlots(); buildMsg(); }
    try { document.dispatchEvent(new CustomEvent('fiona:lang', { detail: lang })); } catch (e) {}
  }

  /* ------------------------------------------------------------ time (Tashkent, UTC+5, no DST) */
  function tashNow() { var n = new Date(); return new Date(n.getTime() + (n.getTimezoneOffset() + 300) * 60000); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function isOpenAt(min) { return min >= 540 || min < 60; } // 9:00–01:00
  function dur(mins) { var h = Math.floor(mins / 60), m = mins % 60; return (h ? h + ' ' + t('h') + ' ' : '') + m + ' ' + t('m'); }

  function tick() {
    var d = tashNow(), min = d.getHours() * 60 + d.getMinutes(), open = isOpenAt(min);
    document.body.classList.toggle('is-closed', !open);
    $$('.js-clock').forEach(function (e) { e.textContent = pad(d.getHours()) + ':' + pad(d.getMinutes()); });
    $$('.js-state').forEach(function (e) { e.textContent = open ? t('open_state') : t('closed_state'); });
    $$('.js-mini').forEach(function (e) { e.textContent = open ? t('open_mini') : t('closed_mini'); });
    var note;
    if (open) {
      var left = (min < 60 ? 60 - min : 1500 - min);
      note = left <= 120 ? fmt(t('note_closing'), { t: dur(left) }) : t('note_open');
    } else { note = fmt(t('note_closed'), { t: dur(540 - min) }); }
    $$('.js-note').forEach(function (e) { e.textContent = note; });
    tickCountdown(d);
  }

  /* ------------------------------------------------------------ video loading */
  var vio = null;
  function setSrc(v) { if (!v.getAttribute('src') && v.dataset.src) { v.src = v.dataset.src; } }
  function safePlay(v) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
  if ('IntersectionObserver' in window) {
    vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var v = en.target;
        if (en.isIntersecting) {
          setSrc(v);
          if (!REDUCED) safePlay(v);
        } else if (!v.paused) v.pause();
      });
    }, { rootMargin: '150px 0px', threshold: 0.15 });
  }
  function watchVideo(v) {
    v.addEventListener('playing', function () { v.classList.add('ready'); });
    if (vio) vio.observe(v); else { setSrc(v); }
    if (REDUCED) {
      var wrap = v.parentElement;
      wrap.style.cursor = 'pointer';
      wrap.addEventListener('click', function (e) {
        if (wrap.closest('button')) return;
        setSrc(v); if (v.paused) safePlay(v); else v.pause();
      });
    }
  }
  if (REDUCED) $$('video[autoplay]').forEach(function (v) { v.removeAttribute('autoplay'); v.autoplay = false; });
  $$('video.lazyv').forEach(watchVideo);

  /* ------------------------------------------------------------ vitrina */
  var ITEMS = window.FIONA_ITEMS || [];
  var byCode = {};
  ITEMS.forEach(function (it) { byCode[it.c] = it; it.tier = it.p < 1e6 ? 0 : it.p < 3e6 ? 1 : it.p < 6e6 ? 2 : 3; });
  var activeTier = 'all', expanded = {}, PREVIEW = 8;

  function priceLabel(it) {
    if (it.from) return lang === 'uz' ? money(it.p) + ' ' + t('sum') + t('from') : t('from') + ' ' + money(it.p) + ' ' + t('sum');
    return money(it.p) + ' ' + t('sum') + (it.each ? ' ' + (lang === 'uz' ? '(' + t('each') + ')' : t('each')) : '');
  }

  function renderVitrina() {
    var host = $('.js-groups'); if (!host) return;
    host.innerHTML = '';
    var counts = [0, 0, 0, 0];
    ITEMS.forEach(function (it) { counts[it.tier]++; });
    $$('.tiers button').forEach(function (b) {
      var s = b.querySelector('sup'); var k = b.dataset.tier;
      s.textContent = k === 'all' ? ITEMS.length : counts[+k];
    });
    for (var tier = 0; tier < 4; tier++) {
      var g = document.createElement('div'); g.className = 'vit-group'; g.dataset.tier = tier;
      g.hidden = !(activeTier === 'all' || +activeTier === tier);
      g.innerHTML = '<div class="vg-head"><h3>' + t('tg' + tier) + '</h3><span>' + fmt(t('n_bouquets'), { n: counts[tier] }) + '</span></div><div class="vg-grid"></div>';
      var grid = g.querySelector('.vg-grid');
      var list = ITEMS.filter(function (it) { return it.tier === tier; });
      var limit = (activeTier === 'all' && !expanded[tier]) ? PREVIEW : 999;
      list.slice(0, limit).forEach(function (it) {
        var b = document.createElement('button'); b.type = 'button'; b.className = 'card'; b.dataset.code = it.c;
        var pnum = it.from ? (lang === 'uz' ? money(it.p) : t('from') + ' ' + money(it.p)) : money(it.p);
        b.innerHTML =
          '<span class="card-media" style="aspect-ratio:' + it.w + '/' + it.h + '">' +
          '<img loading="lazy" decoding="async" src="media/p/' + it.c + '.jpg" width="' + it.w + '" height="' + it.h + '" alt="' + fmt(t('bouquet_alt'), { p: money(it.p) }) + '">' +
          (it.v ? '<video muted loop playsinline preload="none" data-src="media/v/' + it.c + '.mp4"></video>' : '') +
          '</span><span class="card-meta"><span class="price">' + pnum + '</span><span class="cur">' + t('sum') + (it.from && lang === 'uz' ? t('from') : '') + (it.each ? ' · ' + t('each') : '') + '</span>' +
          (it.v ? '<span class="has-v">' + t('video') + '</span>' : '') +
          '<span class="card-order">' + t('card_order') + '</span></span>';
        grid.appendChild(b);
      });
      if (list.length > limit) {
        var more = document.createElement('button'); more.type = 'button'; more.className = 'btn btn-ghost vg-more'; more.dataset.tier = tier;
        more.textContent = fmt(t('show_all'), { n: list.length });
        g.appendChild(more);
      }
      host.appendChild(g);
    }
    bindCards();
  }

  function bindCards() {
    $$('.vg-more').forEach(function (m) {
      m.addEventListener('click', function () {
        var tier = m.dataset.tier; expanded[tier] = true; renderVitrina();
        var nx = $$('.vit-group[data-tier="' + tier + '"] .card')[PREVIEW]; if (nx) nx.focus({ preventScroll: true });
        if (window.ScrollTrigger) ScrollTrigger.refresh();
      });
    });
    $$('.vit-group .card').forEach(function (card) {
      card.addEventListener('click', function () { openSheet({ type: 'item', item: byCode[card.dataset.code] }); });
      if (FINE && !REDUCED) {
        var media = card.querySelector('.card-media');
        card.addEventListener('pointermove', function (e) {
          var r = media.getBoundingClientRect();
          var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
          media.style.setProperty('--ry', ((x - 0.5) * 14).toFixed(2) + 'deg');
          media.style.setProperty('--rx', ((0.5 - y) * 12).toFixed(2) + 'deg');
          media.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
          media.style.setProperty('--my', (y * 100).toFixed(1) + '%');
          card.classList.add('tilt');
        });
        card.addEventListener('pointerleave', function () {
          media.style.setProperty('--ry', '0deg'); media.style.setProperty('--rx', '0deg'); card.classList.remove('tilt');
        });
      }
      var v = card.querySelector('video');
      if (v && FINE && !REDUCED) {
        card.addEventListener('mouseenter', function () { setSrc(v); safePlay(v); card.classList.add('playing'); });
        card.addEventListener('mouseleave', function () { v.pause(); card.classList.remove('playing'); });
      }
    });
  }

  $$('.tiers button').forEach(function (b) {
    b.addEventListener('click', function () {
      activeTier = b.dataset.tier;
      $$('.tiers button').forEach(function (x) { x.setAttribute('aria-selected', String(x === b)); });
      renderVitrina();
      if (window.gsap && !REDUCED) {
        var cards = $$('.vit-group:not([hidden]) .card').slice(0, 16);
        gsap.fromTo(cards, { z: -420, rotateX: 28, opacity: 0, transformPerspective: 1100, transformOrigin: '50% 100%' },
          { z: 0, rotateX: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: { each: 0.035, from: 'start' }, clearProps: 'transform,opacity' });
      }
      var top = $('#vitrina').getBoundingClientRect().top + window.scrollY + ($('#vitrina .sec-head').offsetHeight) + 20;
      if (window.scrollY > top) window.scrollTo({ top: top, behavior: REDUCED ? 'auto' : 'smooth' });
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    });
  });

  /* ------------------------------------------------------------ special reels */
  var BRIDE = ['00', '03', '05', '06', '11', '12', '13', '16', '17', '20', '21', '27', '28', '33', '02', '23'];
  var PEONY = [[0, 31, 2685000], [1, 21, 1835000], [2, 21, 2299000], [3, 15, 1325000], [4, 51, 4299000], [5, 101, 8450000]];
  var reelsBuilt = false;
  function renderReels() {
    var br = $('.js-reel-bride'), pe = $('.js-reel-peony');
    if (!reelsBuilt) {
      br.innerHTML = BRIDE.map(function (n) {
        return '<figure class="reel-item"><button type="button" class="reel-btn" data-bride="' + n + '"><span class="reel-media"><img loading="lazy" src="media/hl/bride_' + n + '.jpg" alt=""><video class="lazyv" muted loop playsinline preload="none" poster="media/hl/bride_' + n + '.jpg" data-src="media/hl/bride_' + n + '.mp4"></video></span></button></figure>';
      }).join('');
      $$('video', br).forEach(watchVideo);
      $$('[data-bride]', br).forEach(function (b) { b.addEventListener('click', function () { openSheet({ type: 'bride', img: 'media/hl/bride_' + b.dataset.bride + '.jpg', vid: 'media/hl/bride_' + b.dataset.bride + '.mp4' }); }); });
      reelsBuilt = true;
    }
    $$('img', br).forEach(function (im) { im.alt = t('bride_t'); });
    pe.innerHTML = PEONY.map(function (p) {
      return '<figure class="reel-item"><button type="button" class="reel-btn" data-peony="' + p[0] + '"><span class="reel-media"><img loading="lazy" src="media/hl/peony_0' + p[0] + '.jpg" alt="' + t('peony_t') + ', ' + p[1] + ' ' + t('pcs') + '"></span></button><figcaption><span class="price">' + money(p[2]) + '</span>' + t('sum') + ' · ' + p[1] + ' ' + t('pcs') + '</figcaption></figure>';
    }).join('');
    $$('[data-peony]', pe).forEach(function (b) {
      b.addEventListener('click', function () { var p = PEONY[+b.dataset.peony]; openSheet({ type: 'peony', img: 'media/hl/peony_0' + p[0] + '.jpg', pcs: p[1], price: p[2] }); });
    });
  }
  // drag-to-scroll for reels on desktop
  $$('.reel').forEach(function (r) {
    var down = false, sx = 0, sl = 0, moved = false;
    r.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse') return; down = true; moved = false; sx = e.clientX; sl = r.scrollLeft; });
    window.addEventListener('pointermove', function (e) { if (!down) return; var dx = e.clientX - sx; if (Math.abs(dx) > 5) { moved = true; r.style.scrollSnapType = 'none'; } r.scrollLeft = sl - dx; });
    window.addEventListener('pointerup', function () { if (!down) return; down = false; r.style.scrollSnapType = ''; });
    r.addEventListener('click', function (e) { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } }, true);
  });

  /* ------------------------------------------------------------ occasions */
  var OCC = [
    { k: 'o_feb14', m: 1, d: 14, img: 'DeKMBOxt9AQ' },
    { k: 'o_mar8', m: 2, d: 8, img: 'DbQLkwWN62k' },
    { k: 'o_sep1', m: 8, d: 1, img: 'DbRLs1tNV0H' },
    { k: 'o_oct1', m: 9, d: 1, img: 'DaTIfubOc9o' },
    { k: 'o_ny', m: 11, d: 31, img: 'Danu32bOC0n' }
  ];
  function occDates(now) {
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return OCC.map(function (o) {
      var dt = new Date(now.getFullYear(), o.m, o.d);
      if (dt < today) dt = new Date(now.getFullYear() + 1, o.m, o.d);
      var days = Math.round((dt - today) / 864e5);
      return { o: o, date: dt, days: days };
    }).sort(function (a, b) { return a.date - b.date; });
  }
  function dateLabel(dt) { return lang === 'uz' ? dt.getDate() + '-' + t('months')[dt.getMonth()] : dt.getDate() + ' ' + t('months')[dt.getMonth()]; }

  function renderOcc() {
    var ul = $('.js-occ'); if (!ul) return;
    var list = occDates(tashNow());
    ul.innerHTML = list.map(function (x, i) {
      return '<li class="occ' + (i === 0 ? ' next' : '') + '"><button type="button" data-occ="' + x.o.k + '" data-img="media/p/' + x.o.img + '.jpg">' +
        '<img class="occ-thumb" loading="lazy" src="media/p/' + x.o.img + '.jpg" alt="">' +
        '<span class="occ-date">' + dateLabel(x.date) + '</span><span class="occ-name">' + t(x.o.k) + '</span>' +
        '<span class="occ-left">' + (x.days === 0 ? t('occ_today') : fmt(t('occ_in'), { n: x.days })) + '</span><span class="occ-go">' + t('occ_go') + '</span></button></li>';
    }).join('');
    $('.js-cd-name').textContent = t(list[0].o.k) + ', ' + dateLabel(list[0].date);
    $$('[data-occ]', ul).forEach(function (b) {
      b.addEventListener('click', function () { openOcc(b.dataset.occ); });
    });
    bindPreview();
  }
  function openOcc(k) {
    var x = occDates(tashNow()).filter(function (y) { return y.o.k === k; })[0];
    openSheet({ type: 'occ', occ: x, img: 'media/p/' + x.o.img + '.jpg' });
  }
  $('.js-preorder-next').addEventListener('click', function () { openOcc(occDates(tashNow())[0].o.k); });

  function tickCountdown(now) {
    var list = occDates(now); var target = list[0].date;
    var diff = Math.max(0, target - now);
    if (diff === 0) { var nx = list[1]; diff = Math.max(0, nx.date - now); }
    var s = Math.floor(diff / 1000);
    var d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60), ss = s % 60;
    var set = function (sel, v) { var e = $(sel); if (e) e.textContent = v; };
    set('.js-cd-d', d); set('.js-cd-h', pad(h)); set('.js-cd-m', pad(m)); set('.js-cd-s', pad(ss));
  }

  /* cursor-follow preview */
  var prev = $('.cursor-preview'), prevImg = prev && prev.querySelector('img');
  var px = 0, py = 0, cx = 0, cy = 0, raf = 0, prevOn = false;
  function loopPrev() {
    cx += (px - cx) * 0.16; cy += (py - cy) * 0.16;
    prev.style.left = cx + 'px'; prev.style.top = cy + 'px';
    if (prevOn || Math.abs(px - cx) > 0.5) raf = requestAnimationFrame(loopPrev); else raf = 0;
  }
  function bindPreview() {
    if (!FINE || !prev) return;
    $$('.occ button').forEach(function (b) {
      b.addEventListener('mouseenter', function (e) {
        prevImg.src = b.dataset.img; prevOn = true; prev.classList.add('on');
        if (!cx) { cx = e.clientX + 170; cy = e.clientY; }
        if (!raf) raf = requestAnimationFrame(loopPrev);
      });
      b.addEventListener('mousemove', function (e) { px = e.clientX + 170; py = e.clientY; });
      b.addEventListener('mouseleave', function () { prevOn = false; prev.classList.remove('on'); });
    });
  }

  /* ------------------------------------------------------------ customer photos marquee */
  (function () {
    var ids = ['00', '04', '11', '13', '21', '26', '28', '36', '40', '43', '45', '50', '55', '58', '62', '16'];
    var html = ids.map(function (n) { return '<img loading="lazy" src="media/hl/reviews_' + n + '.jpg" alt="" data-ph>'; }).join('');
    var m = $('.js-marquee'); m.innerHTML = html + (REDUCED ? '' : html);
  })();

  /* ------------------------------------------------------------ order sheet */
  var sheet = $('#sheet'), form = $('.sh-form', sheet);
  var ctx = null, day = 'today', slot = null, budget = null;
  var SLOTS = [[540, 660], [660, 780], [780, 900], [900, 1020], [1020, 1140], [1140, 1260], [1260, 1380], [1380, 1500]];
  function hm(x) { x = x % 1440; return pad(Math.floor(x / 60)) + ':' + pad(x % 60); }

  function renderSheetHead() {
    var k = $('.js-sh-kicker'), ti = $('.js-sh-title'), ig = $('.js-sh-ig');
    ig.hidden = true;
    if (ctx.type === 'item') {
      k.textContent = t('k_bouquet'); ti.textContent = priceLabel(ctx.item);
      ig.href = 'https://www.instagram.com/p/' + ctx.item.c + '/'; ig.hidden = false;
    } else if (ctx.type === 'bride') { k.textContent = t('k_bride'); ti.textContent = t('t_bride'); }
    else if (ctx.type === 'peony') { k.textContent = t('k_peony') + ', ' + ctx.pcs + ' ' + t('pcs'); ti.textContent = money(ctx.price) + ' ' + t('sum'); }
    else if (ctx.type === 'occ') { k.textContent = t('k_occ') + ' · ' + dateLabel(ctx.occ.date); ti.textContent = t(ctx.occ.o.k); }
    else { k.textContent = t('k_free'); ti.textContent = t('t_free'); }
  }
  function renderBudget() {
    var fs = $('.js-budget-fs'), host = $('.js-budget');
    var show = ctx.type === 'free' || ctx.type === 'occ';
    fs.hidden = !show; if (!show) return;
    var opts = ['t0', 't1', 't2', 't3', 'b_any'];
    host.innerHTML = opts.map(function (o) { return '<button type="button" data-b="' + o + '" aria-pressed="' + (budget === o) + '">' + t(o) + '</button>'; }).join('');
    $$('button', host).forEach(function (b) { b.addEventListener('click', function () { budget = budget === b.dataset.b ? null : b.dataset.b; renderBudget(); buildMsg(); }); });
  }
  function renderMedia() {
    var host = $('.js-sh-media'); host.innerHTML = '';
    var img, vid;
    if (ctx.type === 'item') { img = 'media/p/' + ctx.item.c + '.jpg'; if (ctx.item.v) vid = 'media/v/' + ctx.item.c + '.mp4'; }
    else if (ctx.img) { img = ctx.img; vid = ctx.vid; }
    if (!img) {
      host.innerHTML = '<div class="ph-empty"><img src="media/p/DbRLC8TtXtA.jpg" alt=""><img src="media/p/DebL9uHNts5.jpg" alt=""></div>';
      return;
    }
    var i = document.createElement('img'); i.src = img; i.alt = ''; host.appendChild(i);
    if (vid) {
      var v = document.createElement('video'); v.muted = true; v.loop = true; v.playsInline = true; v.setAttribute('playsinline', ''); v.poster = img; v.src = vid;
      if (REDUCED) { v.controls = true; } else { v.autoplay = true; }
      host.appendChild(v); if (!REDUCED) safePlay(v);
    }
  }

  function serviceToday() { // date the "today" chip refers to
    var n = tashNow(); return new Date(n.getFullYear(), n.getMonth(), n.getDate());
  }
  function renderDays() {
    $$('.js-days button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.day === day)); });
    var di = $('.js-date'); di.hidden = day !== 'date';
    var tm = serviceToday(); tm.setDate(tm.getDate() + 1);
    di.min = tm.getFullYear() + '-' + pad(tm.getMonth() + 1) + '-' + pad(tm.getDate());
  }
  function renderSlots() {
    var host = $('.js-slots'), note = $('.js-slot-note');
    var n = tashNow(), min = n.getHours() * 60 + n.getMinutes();
    var sm = min < 60 ? min + 1440 : min; var open = isOpenAt(min);
    var opts = [];
    if (day === 'today' && open) opts.push({ id: 'asap', label: t('asap'), ok: true });
    SLOTS.forEach(function (s) {
      var ok = true;
      if (day === 'today') ok = open ? s[1] > sm + 60 && min >= 60 : true;
      if (day === 'today' && open && min < 60) ok = false;
      opts.push({ id: s[0], label: hm(s[0]) + '–' + hm(s[1]), ok: ok });
    });
    if (slot !== null && !opts.some(function (o) { return String(o.id) === String(slot) && o.ok; })) slot = null;
    if (slot === null) { var first = opts.filter(function (o) { return o.ok; })[0]; slot = first ? first.id : null; }
    host.innerHTML = opts.map(function (o) { return '<button type="button" data-slot="' + o.id + '" aria-pressed="' + (String(o.id) === String(slot)) + '"' + (o.ok ? '' : ' disabled') + '>' + o.label + '</button>'; }).join('');
    $$('button', host).forEach(function (b) { b.addEventListener('click', function () { slot = b.dataset.slot === 'asap' ? 'asap' : +b.dataset.slot; renderSlots(); buildMsg(); }); });
    var txt = '';
    if (day === 'today' && !opts.some(function (o) { return o.ok; })) txt = t('no_slots');
    else if (day === 'today' && !open) txt = t('closed_slots');
    note.textContent = txt; note.hidden = !txt;
  }

  function whenText() {
    var s = slot === 'asap' ? t('m_asap') : slot === null ? '' : hm(slot) + '–' + hm(slot + 120);
    var d;
    if (day === 'today') d = t('today_l') + ', ' + dateLabel(serviceToday());
    else if (day === 'tomorrow') { var tm = serviceToday(); tm.setDate(tm.getDate() + 1); d = t('tomorrow_l') + ', ' + dateLabel(tm); }
    else { var v = $('.js-date').value; if (v) { var p = v.split('-'); d = dateLabel(new Date(+p[0], +p[1] - 1, +p[2])); } else d = t('m_nodate'); }
    return d + (s ? ', ' + s : '');
  }
  function buildMsg() {
    if (!ctx) return '';
    var f = form.elements, L = [t('m_hello')];
    if (ctx.type === 'item') L.push(t('m_bouquet') + ': ' + priceLabel(ctx.item) + ' — instagram.com/p/' + ctx.item.c);
    else if (ctx.type === 'bride') L.push(t('m_bride'));
    else if (ctx.type === 'peony') L.push(t('m_bouquet') + ': ' + t('m_peony') + ', ' + ctx.pcs + ' ' + t('pcs') + ' — ' + money(ctx.price) + ' ' + t('sum'));
    else L.push(t('m_free'));
    if (budget && (ctx.type === 'free' || ctx.type === 'occ')) L.push(t('m_budget') + ': ' + t(budget));
    if (ctx.type === 'occ') L.push(t('m_occ') + ': ' + t(ctx.occ.o.k));
    L.push(t('m_when') + ': ' + whenText());
    var nm = f.name.value.trim(), ph = f.phone.value.trim(), ad = f.addr.value.trim(), cd = f.card.value.trim();
    if (nm || ph) L.push(t('m_rec') + ': ' + [nm, ph ? t('m_tel') + ' ' + ph : ''].filter(Boolean).join(', '));
    if (ad) L.push(t('m_addr') + ': ' + ad);
    if (cd) L.push(t('m_card') + ': «' + cd + '»');
    if (f.photo.checked) L.push(t('m_photo'));
    var msg = L.join('\n');
    $('.js-msg').textContent = msg;
    return msg;
  }

  var lastFocus = null;
  function openSheet(c) {
    ctx = c || { type: 'free' }; slot = null; budget = null;
    form.reset(); form.elements.photo.checked = true;
    if (ctx.type === 'occ') {
      var today = serviceToday();
      if (ctx.occ.days === 0) day = 'today';
      else if (ctx.occ.days === 1) day = 'tomorrow';
      else { day = 'date'; var dt = ctx.occ.date; $('.js-date').value = dt.getFullYear() + '-' + pad(dt.getMonth() + 1) + '-' + pad(dt.getDate()); }
    } else { day = isOpenAt(tashNow().getHours() * 60 + tashNow().getMinutes()) ? 'today' : 'today'; $('.js-date').value = ''; }
    renderSheetHead(); renderMedia(); renderBudget(); renderDays(); renderSlots(); buildMsg();
    lastFocus = document.activeElement;
    if (sheet.showModal) sheet.showModal(); else sheet.setAttribute('open', '');
    document.documentElement.style.overflow = 'hidden';
    form.scrollTop = 0;
  }
  function closeSheet() {
    var v = $('.js-sh-media video'); if (v) v.pause();
    if (sheet.close) sheet.close(); else sheet.removeAttribute('open');
  }
  sheet.addEventListener('close', function () {
    document.documentElement.style.overflow = '';
    var v = $('.js-sh-media video'); if (v) { v.pause(); v.removeAttribute('src'); v.load(); }
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  });
  $('.sh-close').addEventListener('click', closeSheet);
  sheet.addEventListener('click', function (e) { if (e.target === sheet) closeSheet(); });
  $$('.js-days button').forEach(function (b) {
    b.addEventListener('click', function () {
      day = b.dataset.day; slot = null; renderDays(); renderSlots(); buildMsg();
      if (day === 'date') { var di = $('.js-date'); if (!di.value) di.value = di.min; try { di.showPicker && di.showPicker(); } catch (e) {} }
      buildMsg();
    });
  });
  $('.js-date').addEventListener('change', buildMsg);
  form.addEventListener('input', buildMsg);
  form.addEventListener('change', buildMsg);
  form.addEventListener('submit', function (e) { e.preventDefault(); });

  function copyText(s) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(s).catch(fallback);
    fallback(); return Promise.resolve();
    function fallback() {
      var ta = document.createElement('textarea'); ta.value = s; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      sheet.appendChild(ta); ta.select(); try { document.execCommand('copy'); } catch (e) {} ta.remove();
    }
  }
  var toastT;
  function toast(s) { var el = $('.toast'); el.textContent = s; el.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(function () { el.classList.remove('on'); }, 3200); }
  $('.js-copy').addEventListener('click', function () { copyText(buildMsg()); toast(t('copied')); });
  $$('.js-tg, .js-ig').forEach(function (a) { a.addEventListener('click', function () { copyText(buildMsg()); toast(t('copied_open')); }); });

  $$('.js-order').forEach(function (b) { b.addEventListener('click', function () { openSheet({ type: 'free' }); }); });
  $('.js-bride').addEventListener('click', function () { openSheet({ type: 'bride', img: 'media/hl/bride_27.jpg', vid: 'media/hl/bride_27.mp4' }); });

  $$('.lang button').forEach(function (b) {
    b.addEventListener('click', function () {
      lang = b.dataset.lang; try { localStorage.setItem('fiona_v2_lang', lang); } catch (e) {}
      applyLang(); if (window.ScrollTrigger) ScrollTrigger.refresh();
    });
  });

  /* header state */
  var top = $('#top');
  function onScroll() { top.classList.toggle('scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  window.FIONA = {
    items: ITEMS, byCode: byCode, reduced: REDUCED, fine: FINE,
    t: function (k) { return t(k); }, label: function (it) { return priceLabel(it); }, money: money,
    open: function (code) { var it = byCode[code]; if (it) openSheet({ type: 'item', item: it }); }
  };

  /* ------------------------------------------------------------ hero: 3D triptych + light-leak shader */
  (function heroDepth() {
    if (REDUCED) return;
    var hero = $('.hero'), cols = $$('.reel-col');
    var tx = 0, ty = 0, cx = 0, cy = 0, visible = true, raf = 0;
    var base = [{ a: -20, z: 0 }, { a: 0, z: 0 }, { a: 20, z: 0 }];
    function frame() {
      cx += (tx - cx) * 0.06; cy += (ty - cy) * 0.06;
      cols.forEach(function (c, i) {
        var b = base[i];
        c.style.transform = 'translate3d(' + (cx * -14 * (i - 1 || 0.6)).toFixed(2) + 'px,' + (cy * -8).toFixed(2) + 'px,' + b.z + 'px) rotateY(' + (b.a + cx * 7).toFixed(3) + 'deg) rotateX(' + (cy * -4.5).toFixed(3) + 'deg)';
      });
      raf = (visible && FINE) ? requestAnimationFrame(frame) : 0;
    }
    if (FINE) {
      hero.addEventListener('pointermove', function (e) { tx = e.clientX / innerWidth * 2 - 1; ty = e.clientY / innerHeight * 2 - 1; });
      hero.addEventListener('pointerleave', function () { tx = 0; ty = 0; });
    }
    if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { visible = en[0].isIntersecting; if (visible && FINE && !raf) raf = requestAnimationFrame(frame); }).observe(hero);
    raf = requestAnimationFrame(frame);
    document.documentElement.classList.add('hero-3d');
  })();

  (function heroLeak() {
    if (REDUCED) return;
    var cv = document.createElement('canvas'); cv.className = 'hero-fx'; cv.setAttribute('aria-hidden', 'true');
    var gl = cv.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'low-power' });
    if (!gl) return;
    var vs = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
    var fs = 'precision mediump float;uniform vec2 r;uniform float t;uniform vec2 m;' +
      'float h(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}' +
      'void main(){vec2 uv=gl_FragCoord.xy/r;float a=r.x/r.y;vec2 q=vec2(uv.x*a,uv.y);' +
      'vec2 c1=vec2((.86+.06*sin(t*.17)+m.x*.04)*a,.82+.08*cos(t*.13)-m.y*.03);' +
      'vec2 c2=vec2((.08+.05*sin(t*.11+1.3))*a,.12+.06*sin(t*.09));' +
      'float l1=pow(max(0.,1.-distance(q,c1)/.75),2.2);float l2=pow(max(0.,1.-distance(q,c2)/.6),2.);' +
      'float band=smoothstep(.0,.9,sin(uv.x*2.2+uv.y*1.4+t*.21)*.5+.5)*.10;' +
      'vec3 col=vec3(1.,.45,.33)*l1*.30+vec3(.98,.78,.52)*l2*.16+vec3(.95,.55,.5)*band*l1;' +
      'float g=h(floor(gl_FragCoord.xy)+fract(t*7.)*91.);col+=vec3(pow(g,8.)*.12);' +
      'gl_FragColor=vec4(col,1.);}';
    function sh(type, src) { var o = gl.createShader(type); gl.shaderSource(o, src); gl.compileShader(o); return o; }
    var pr = gl.createProgram(); gl.attachShader(pr, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return;
    gl.useProgram(pr);
    var b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    var uR = gl.getUniformLocation(pr, 'r'), uT = gl.getUniformLocation(pr, 't'), uM = gl.getUniformLocation(pr, 'm');
    var hero = $('.hero'); hero.appendChild(cv);
    var mx = 0, my = 0, vis = true, last = 0, t0 = performance.now();
    function size() { var s = 0.5; cv.width = Math.max(2, Math.round(hero.clientWidth * s)); cv.height = Math.max(2, Math.round(hero.clientHeight * s)); gl.viewport(0, 0, cv.width, cv.height); }
    size(); window.addEventListener('resize', size);
    hero.addEventListener('pointermove', function (e) { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; });
    function loop(now) {
      if (!vis) return;
      requestAnimationFrame(loop);
      if (now - last < 33) return; last = now;
      gl.uniform2f(uR, cv.width, cv.height); gl.uniform1f(uT, (now - t0) / 1000); gl.uniform2f(uM, mx, my);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { var w = vis; vis = en[0].isIntersecting; if (vis && !w) requestAnimationFrame(loop); }).observe(hero);
    requestAnimationFrame(loop);
  })();

  /* ------------------------------------------------------------ init */
  applyLang();
  setInterval(tick, 1000);

  /* ------------------------------------------------------------ motion (GSAP) */
  var motionDone = false;
  if (window.gsap && window.ScrollTrigger) initMotion(); else document.addEventListener('DOMContentLoaded', initMotion);
  function initMotion() {
  if (motionDone) return; motionDone = true;
  if (!window.gsap || !window.ScrollTrigger || REDUCED) { document.documentElement.classList.add('no-pin'); return; }
  gsap.registerPlugin(ScrollTrigger);

  // hero headline: lines rise once (video and actions are visible immediately)
  if (performance.now() < 1500) gsap.from('.hero-copy .ln > span', { yPercent: 108, duration: 1.1, ease: 'expo.out', stagger: 0.09, delay: 0.05 });
  gsap.to('.reel-col video', { yPercent: 6, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.hero-copy', { y: -60, opacity: 0.2, ease: 'none', scrollTrigger: { trigger: '.hero', start: '30% top', end: 'bottom top', scrub: true } });

  // section headings: line reveal
  $$('.js-lines').forEach(function (h) {
    if (h.closest('.hero') || h.closest('.story') || h.closest('.corridor')) return;
    gsap.from(h.querySelectorAll('.ln > span'), { yPercent: 108, duration: 1, ease: 'expo.out', stagger: 0.08, scrollTrigger: { trigger: h, start: 'top 85%', once: true } });
  });

  var mm = gsap.matchMedia();
  mm.add('(min-width: 900px)', function () {
    var track = $('.story-track');
    var dist = function () { return track.scrollWidth - window.innerWidth; };
    var lis = $$('.timeline li'), fill = $('.tl-fill');
    var tween = gsap.to(track, {
      x: function () { return -dist(); }, ease: 'none',
      scrollTrigger: {
        trigger: '.story', pin: true, scrub: 0.8, start: 'top top', end: function () { return '+=' + dist(); }, invalidateOnRefresh: true,
        onUpdate: function (self) {
          gsap.set(fill, { scaleX: self.progress });
          var idx = Math.min(4, Math.floor(self.progress * 5.2 - 0.2));
          lis.forEach(function (li, i) { li.classList.toggle('on', i <= idx); });
        }
      }
    });
    $$('.chap[data-chap]').forEach(function (ch) {
      var fr = ch.querySelector('.chap-frame'), v = fr.querySelector('video'), tx = ch.querySelector('.chap-text');
      gsap.fromTo(fr, { clipPath: 'inset(16% 24% 16% 24% round 6px)' }, { clipPath: 'inset(0% 0% 0% 0% round 6px)', ease: 'none', scrollTrigger: { trigger: ch, containerAnimation: tween, start: 'left right', end: 'center center', scrub: true } });
      gsap.fromTo(v, { scale: 1.25 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: ch, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } });
      gsap.from(tx.children, { x: 60, opacity: 0, stagger: 0.06, ease: 'power2.out', scrollTrigger: { trigger: ch, containerAnimation: tween, start: 'left 85%', end: 'left 45%', scrub: true } });
    });
    return function () { gsap.set(track, { x: 0 }); };
  });
  mm.add('(max-width: 899px)', function () {
    $$('.chap[data-chap]').forEach(function (ch) {
      var fr = ch.querySelector('.chap-frame');
      gsap.fromTo(fr, { clipPath: 'inset(10% 10% 10% 10% round 6px)' }, { clipPath: 'inset(0% 0% 0% 0% round 6px)', ease: 'none', scrollTrigger: { trigger: ch, start: 'top 95%', end: 'top 40%', scrub: true } });
    });
  });

  // contacts photo slow parallax
  gsap.fromTo('.ct-photo img', { scale: 1.15, yPercent: -4 }, { scale: 1.02, yPercent: 4, ease: 'none', scrollTrigger: { trigger: '.contacts', start: 'top bottom', end: 'bottom top', scrub: true } });

  if (document.readyState === 'complete') ScrollTrigger.refresh(); else window.addEventListener('load', function () { ScrollTrigger.refresh(); });
  }
})();
