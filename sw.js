// ベンキョウクエスト アプリ版のサービスワーカー
// いつもは新しいファイルを取りにいき（すぐ新しい版になる）、電波がないときだけ取っておいたものを出す。
// 勉クエはサーバーを使わないので、一度ひらけば電波がなくてもあそべる（声で答えるのは電波が必要）。
const CACHE = 'benkue-mwyy9aul';
const FILES = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png', './strokes.json'].concat(["./art/bg_dungeon.webp","./art/bg_forest.webp","./art/bg_ocean.webp","./art/bg_sky.webp","./art/bg_volcano.webp","./art/hero_dorago.webp","./art/hero_kabuto.webp","./art/hero_keshimaru.webp","./art/hero_kirari.webp","./art/hero_mike.webp","./art/hero_penta.webp","./art/item_chest.webp","./art/item_s01.webp","./art/item_s02.webp","./art/item_s03.webp","./art/item_s04.webp","./art/item_s05.webp","./art/item_s06.webp","./art/item_s07.webp","./art/item_s08.webp","./art/item_s09.webp","./art/item_s10.webp","./art/item_s11.webp","./art/item_s12.webp","./art/item_s13.webp","./art/item_s14.webp","./art/item_s15.webp","./art/item_s16.webp","./art/item_s17.webp","./art/item_s18.webp","./art/item_s19.webp","./art/item_s20.webp","./art/item_s21.webp","./art/item_s22.webp","./art/item_s23.webp","./art/item_s24.webp","./art/mon_boss.webp","./art/mon_chie.webp","./art/mon_clock.webp","./art/mon_english.webp","./art/mon_hira.webp","./art/mon_iro.webp","./art/mon_kanji_read.webp","./art/mon_kanji_write.webp","./art/mon_kata.webp","./art/mon_kazu.webp","./art/mon_kotoba.webp","./art/mon_kuku.webp","./art/mon_math.webp"]);

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('benkue-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match('./index.html')))
  );
});
