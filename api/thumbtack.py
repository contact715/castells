"""
Castells.studio — Thumbtack OAuth & Webhooks

Routes (via vercel.json rewrites):
  GET  /auth/thumbtack/callback  → OAuth code exchange
  POST /webhook/thumbtack/leads  → Lead notifications
  POST /webhook/thumbtack/messages → Message notifications
"""

import json
import os
import urllib.request
import urllib.parse
import urllib.error
from http.server import BaseHTTPRequestHandler
from datetime import datetime


class handler(BaseHTTPRequestHandler):

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        params = dict(urllib.parse.parse_qsl(parsed.query))

        # ── OAuth Callback ──
        if parsed.path == "/auth/thumbtack/callback":
            code = params.get("code")
            error = params.get("error")

            if error:
                self._html(400, _error_page("Thumbtack", error))
                return

            if not code:
                self._html(400, _error_page("Thumbtack", "Missing authorization code"))
                return

            client_id = os.environ.get("THUMBTACK_CLIENT_ID")
            client_secret = os.environ.get("THUMBTACK_CLIENT_SECRET")
            redirect_uri = os.environ.get("THUMBTACK_REDIRECT_URI",
                                          "https://castells.studio/auth/thumbtack/callback")

            token_data = _exchange_code(code, client_id, client_secret, redirect_uri)

            if token_data:
                business_id = token_data.get("business_pk", "unknown")
                _notify_telegram(
                    f"\u2705 <b>Thumbtack Connected</b>\n"
                    f"Business: {business_id}\n"
                    f"<code>{json.dumps(token_data, indent=2)}</code>"
                )
                self._html(200, _success_page("Thumbtack", business_id))
            else:
                self._html(500, _error_page("Thumbtack", "Token exchange failed"))
            return

        self._html(404, _error_page("404", "Page not found"))

    def do_POST(self):
        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length).decode() if content_length > 0 else ""
        parsed = urllib.parse.urlparse(self.path)

        try:
            data = json.loads(body) if body else {}
        except json.JSONDecodeError:
            self._json(400, {"error": "invalid JSON"})
            return

        # ── Leads Webhook ──
        if parsed.path == "/webhook/thumbtack/leads":
            customer = data.get("customer", {})
            request_info = data.get("request", {})
            business = data.get("business", {})

            _notify_telegram(
                f"\U0001f514 <b>New Thumbtack Lead</b>\n"
                f"Business: {business.get('name', '?')}\n"
                f"Customer: {customer.get('name', '?')}\n"
                f"Category: {request_info.get('category', {}).get('name', '?')}\n"
                f"Details: {request_info.get('description', '')[:150]}\n"
                f"Time: {datetime.now().strftime('%d.%m.%Y %H:%M')}"
            )
            self._json(200, {"status": "received"})
            return

        # ── Messages Webhook ──
        if parsed.path == "/webhook/thumbtack/messages":
            self._json(200, {"status": "received"})
            return

        self._json(404, {"error": "not found"})

    def _json(self, status, data):
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())

    def _html(self, status, body):
        self.send_response(status)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.end_headers()
        self.wfile.write(body.encode())


# ── Helpers ──

def _exchange_code(code, client_id, client_secret, redirect_uri):
    url = "https://api.thumbtack.com/v2/oauth/token"
    payload = urllib.parse.urlencode({
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": redirect_uri,
        "client_id": client_id,
        "client_secret": client_secret,
    }).encode()

    req = urllib.request.Request(url, data=payload, method="POST")
    req.add_header("Content-Type", "application/x-www-form-urlencoded")

    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read().decode())
    except Exception:
        return None


def _notify_telegram(text):
    bot_token = os.environ.get("TELEGRAM_BOT_TOKEN")
    chat_id = os.environ.get("TELEGRAM_CHAT_ID")
    if not bot_token or not chat_id:
        return

    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    payload = json.dumps({
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "HTML",
    }).encode()

    req = urllib.request.Request(url, data=payload, method="POST")
    req.add_header("Content-Type", "application/json")

    try:
        with urllib.request.urlopen(req, timeout=15):
            pass
    except Exception:
        pass


def _success_page(service, detail=""):
    return f"""<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Connected — Castells</title>
<style>
body {{ font-family: -apple-system, sans-serif; display: flex; justify-content: center; align-items: center;
       min-height: 100vh; margin: 0; background: #0a0a0a; color: #fff; }}
.card {{ background: #1a1a1a; border-radius: 16px; padding: 48px; text-align: center; max-width: 400px;
         border: 1px solid #333; }}
.icon {{ font-size: 64px; margin-bottom: 16px; }}
h1 {{ margin: 0 0 8px; font-size: 24px; }}
p {{ color: #888; margin: 4px 0; }}
.detail {{ color: #666; font-size: 13px; margin-top: 16px; }}
</style></head><body>
<div class="card">
<div class="icon">\u2705</div>
<h1>{service} Connected</h1>
<p>Authorization successful</p>
<p>You can close this window.</p>
<p class="detail">{detail}</p>
</div></body></html>"""


def _error_page(service, error):
    return f"""<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Error — Castells</title>
<style>
body {{ font-family: -apple-system, sans-serif; display: flex; justify-content: center; align-items: center;
       min-height: 100vh; margin: 0; background: #0a0a0a; color: #fff; }}
.card {{ background: #1a1a1a; border-radius: 16px; padding: 48px; text-align: center; max-width: 400px;
         border: 1px solid #333; }}
.icon {{ font-size: 64px; margin-bottom: 16px; }}
h1 {{ margin: 0 0 8px; font-size: 24px; color: #ff4444; }}
p {{ color: #888; margin: 4px 0; }}
</style></head><body>
<div class="card">
<div class="icon">\u274c</div>
<h1>{service} Error</h1>
<p>{error}</p>
</div></body></html>"""
