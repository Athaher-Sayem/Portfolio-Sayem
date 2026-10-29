"""End-to-end checks against the exported static site (out/)."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread

import pytest
from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "out"


@pytest.fixture(scope="module")
def site():
    assert OUT.exists(), "Run `npm run build` first"
    handler = partial(SimpleHTTPRequestHandler, directory=str(OUT))
    server = ThreadingHTTPServer(("127.0.0.1", 0), handler)
    Thread(target=server.serve_forever, daemon=True).start()
    yield f"http://127.0.0.1:{server.server_port}/"
    server.shutdown()


def test_hero_header_nav_and_skip_link(site):
    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        page = browser.new_page()
        errors = []
        page.on("pageerror", lambda e: errors.append(str(e)))
        page.goto(site, wait_until="networkidle")
        headline = page.locator("h1").evaluate(
            "e => e.textContent.replace(/\\s+/g, '')"
        )
        assert headline == "Thoughtful code, useful software.".replace(" ", "")
        expect(page.get_by_role("link", name="Skip to content")).to_be_visible()
        expect(page.get_by_role("banner")).to_contain_text("Resume")
        assert page.get_by_role("button").count() >= 2  # resume + theme
        assert not errors
        browser.close()


def test_theme_toggle_persists(site):
    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        page = browser.new_page(color_scheme="dark")
        page.goto(site)
        # Start dark (system preference) → button should switch to light.
        assert not page.evaluate('document.documentElement.classList.contains("light")')
        button = page.get_by_role("button", name="Switch to light mode")
        button.click()
        assert page.evaluate('document.documentElement.classList.contains("light")')
        expect(page.get_by_role("button", name="Switch to dark mode")).to_be_visible()
        page.reload()
        expect(page.get_by_role("button", name="Switch to dark mode")).to_be_visible()
        page.get_by_role("button", name="Switch to dark mode").click()
        assert not page.evaluate('document.documentElement.classList.contains("light")')
        browser.close()


def test_projects_fetch_with_snapshot_fallback(site):
    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        page = browser.new_page()
        # Force the live GitHub call to fail -> snapshot fallback must render cards.
        page.route("**/api.github.com/**", lambda route: route.abort())
        page.goto(site, wait_until="networkidle")
        page.locator("article", has_text="Open repo").first.wait_for(timeout=15000)
        count = page.locator("article", has_text="Open repo").count()
        assert count >= 1
        assert page.locator("text=Live GitHub fetch unavailable").count() >= 1
        browser.close()


def test_project_card_meta_and_preview_link(site):
    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        page = browser.new_page()
        page.route("**/api.github.com/**", lambda route: route.abort())
        page.goto(site, wait_until="networkidle")
        card = page.locator("article", has_text="Open repo").first
        card.wait_for()
        # Every card has a language dot source and a time label
        assert card.locator("h3").count() == 1
        assert card.locator("a[href*='github.com']").count() >= 1
        browser.close()


def test_mobile_menu_open_close_and_anchors(site):
    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        page = browser.new_page(viewport={"width": 390, "height": 844})
        page.goto(site)
        page.get_by_role("button", name="Open menu").click()
        expect(page.get_by_role("dialog")).to_be_visible()
        expect(page.get_by_role("dialog")).to_contain_text("Experience")
        page.get_by_role("dialog").get_by_role("link", name="Experience").click()
        expect(page.get_by_role("dialog")).not_to_be_visible()
        assert page.evaluate("document.documentElement.scrollWidth <= innerWidth")
        browser.close()


def test_contact_copy_toast(site):
    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        context = browser.new_context()
        context.grant_permissions(["clipboard-read", "clipboard-write"], origin=site.rstrip("/"))
        page = context.new_page()
        page.goto(site)
        page.get_by_role("button", name="Copy email address").click()
        expect(page.get_by_role("status")).to_contain_text("copied")
        browser.close()


def test_resume_page(site):
    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        page = browser.new_page()
        response = page.goto(site + "resume/")
        assert response.status == 200
        expect(page.locator("h1")).to_contain_text("Md. Athaher Sayem Fahim")
        expect(page.get_by_role("button", name="Print / Save as PDF")).to_be_visible()
        browser.close()


@pytest.mark.parametrize("width", [375, 768, 1024, 1440, 1920])
def test_responsive_layout_no_errors(site, width):
    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        page = browser.new_page(viewport={"width": width, "height": 1000})
        errors, failed = [], []
        page.on("pageerror", lambda e: errors.append(str(e)))
        page.on("response", lambda r: failed.append((r.status, r.url)) if r.status >= 400 else None)
        page.route("**/api.github.com/**", lambda route: route.abort())
        page.goto(site, wait_until="networkidle")
        page.locator("article", has_text="Open repo").first.wait_for(timeout=15000)
        assert page.evaluate("document.documentElement.scrollWidth <= innerWidth"), width
        assert page.locator("img").evaluate_all(
            "xs => xs.every(x => x.complete && x.naturalWidth > 0)"
        )
        assert not errors and not failed, (width, errors, failed)
        browser.close()
