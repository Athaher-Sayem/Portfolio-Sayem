from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread

import pytest
from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parents[1]


@pytest.fixture(scope="module")
def site():
    handler = partial(SimpleHTTPRequestHandler, directory=str(ROOT))
    server = ThreadingHTTPServer(("127.0.0.1", 0), handler)
    thread = Thread(target=server.serve_forever, daemon=True)
    thread.start()
    yield f"http://127.0.0.1:{server.server_port}/"
    server.shutdown()


def test_cv_identity_and_showcase_are_accessible_without_javascript(site):
    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        page = browser.new_page(java_script_enabled=False)
        page.goto(site)
        expect(page.locator("h1")).to_contain_text("Useful software")
        expect(page.get_by_text("Md. Athaher Sayem Fahim", exact=True).first).to_be_visible()
        assert page.locator('a[href="mailto:athahersayem336@gmail.com"]').count() >= 1
        expect(page.get_by_role("link", name="Explore the showcase")).to_have_attribute(
            "href", "https://athaher-sayem.github.io/Showcase-Design-Gallery/"
        )
        assert page.locator(".project").count() == 6
        browser.close()


def test_filter_and_case_study_dialog(site):
    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        page = browser.new_page()
        page.goto(site)
        page.get_by_role("button", name="AI & automation", exact=True).click()
        assert page.locator(".project:visible").count() == 3
        page.get_by_role("link", name="Read AI News Scraper case study").click()
        expect(page.get_by_role("dialog")).to_be_visible()
        expect(page.get_by_role("dialog")).to_contain_text("Sentence-BERT")
        page.keyboard.press("Escape")
        expect(page.get_by_role("dialog")).not_to_be_visible()
        expect(page.get_by_role("link", name="Read AI News Scraper case study")).to_be_focused()
        page.get_by_role("button", name="All projects", exact=True).click()
        assert page.locator(".project:visible").count() == 6
        browser.close()


def test_mobile_navigation_and_reduced_motion_rule(site):
    css = (ROOT / "assets/styles.css").read_text(encoding="utf-8")
    assert "@media(prefers-reduced-motion:reduce)" in css
    assert "@media(prefers-reduced-motion:no-preference)" in css
    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        page = browser.new_page(viewport={"width": 390, "height": 844})
        page.goto(site)
        menu = page.locator(".menu-toggle")
        expect(menu).to_have_attribute("aria-expanded", "false")
        menu.click()
        expect(menu).to_have_attribute("aria-expanded", "true")
        page.locator("#navigation").get_by_role("link", name="Experience").click()
        expect(menu).to_have_attribute("aria-expanded", "false")
        assert page.evaluate("document.documentElement.scrollWidth <= innerWidth")
        browser.close()


@pytest.mark.parametrize("width", [320, 390, 768, 1024, 1440])
def test_layout_assets_and_no_browser_errors(site, width):
    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        page = browser.new_page(viewport={"width": width, "height": 900})
        errors, failed = [], []
        page.on("pageerror", lambda error: errors.append(str(error)))
        page.on("response", lambda response: failed.append(response.url) if response.status >= 400 else None)
        page.goto(site, wait_until="networkidle")
        page.locator("img").evaluate_all("xs => xs.forEach(x => x.loading = 'eager')")
        page.wait_for_timeout(250)
        assert page.evaluate("document.documentElement.scrollWidth <= innerWidth")
        assert page.locator("img").evaluate_all("xs => xs.every(x => x.complete && x.naturalWidth > 0)")
        assert page.locator('a[href^="#"]').evaluate_all(
            "xs => xs.every(x => document.getElementById(x.hash.slice(1)))"
        )
        assert not errors and not failed
        browser.close()


def test_static_budgets_and_resume(site):
    assert (ROOT / "index.html").stat().st_size < 60_000
    assert (ROOT / "assets/styles.css").stat().st_size < 40_000
    assert (ROOT / "assets/app.js").stat().st_size < 12_000
    assert sum(p.stat().st_size for p in (ROOT / "assets").rglob("*") if p.is_file()) < 600_000
    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        page = browser.new_page()
        response = page.goto(site + "resume.html")
        assert response.status == 200
        expect(page.locator("h1")).to_have_text("Md. Athaher Sayem Fahim")
        expect(page.locator("body")).to_contain_text("3.83")
        browser.close()
