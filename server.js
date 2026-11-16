import http from 'node:http';
import bot from './bot.js';

const port = Number(process.env.PORT) || 3000;
const base = process.env.RENDER_EXTERNAL_URL || `http://localhost:${port}`;
const { SUPABASE_URL, SUPABASE_KEY } = process.env;
const env = { ...process.env, DB: SUPABASE_URL && SUPABASE_KEY ? supabaseKV(SUPABASE_URL.trim(), SUPABASE_KEY.trim()) : undefined };

http
  .createServer(async (req, res) => {
    try {
      const chunks = [];
      for await (const c of req) chunks.push(c);
      const request = new Request(new URL(req.url, base), {
        method: req.method,
        headers: {
          'content-type': req.headers['content-type'] || 'text/plain',
          'x-telegram-bot-api-secret-token': req.headers['x-telegram-bot-api-secret-token'] || '',
        },
        body: req.method === 'GET' || req.method === 'HEAD' ? undefined : Buffer.concat(chunks),
      });
      const response = await bot.fetch(request, env);
      res.writeHead(response.status, Object.fromEntries(response.headers));
      res.end(Buffer.from(await response.arrayBuffer()));
    } catch (e) {
      console.log('server error', e);
      res.writeHead(500);
      res.end('error');
    }
  })
  .listen(port, () => console.log(`FastMarket запущен на порту ${port}`));

// Хранилище "ключ → значение" в таблице fm_kv в Supabase
function supabaseKV(url, key) {
  const api = url.replace(/\/+$/, '') + '/rest/v1/fm_kv';
  const headers = { apikey: key, 'content-type': 'application/json' };
  if (key.startsWith('eyJ')) headers.Authorization = 'Bearer ' + key;
  const call = async (path, opts = {}) => {
    const r = await fetch(api + path, { ...opts, headers: { ...headers, ...opts.headers } });
    if (!r.ok) throw new Error(`Supabase ${r.status}: ${await r.text()}`);
    return r;
  };
  const byKey = (k) => '?k=eq.' + encodeURIComponent(k);
  return {
    async get(k, type) {
      const rows = await (await call(byKey(k) + '&select=v')).json();
      if (!rows.length) return null;
      return type === 'json' ? JSON.parse(rows[0].v) : rows[0].v;
    },
    async put(k, v) {
      await call('', {
        method: 'POST',
        headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
        body: JSON.stringify({ k, v: String(v) }),
      });
    },
    async delete(k) {
      await call(byKey(k), { method: 'DELETE' });
    },
  };
}
