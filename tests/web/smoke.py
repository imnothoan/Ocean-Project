"""Check the Expo Web entry point and draft editor without submitting user data."""

import argparse
import re

from playwright.sync_api import Route, expect, sync_playwright


LOGO_SEQUENCE = [f"frame-949:{n}" for n in (246, 253, 260, 267, 276)]
HOME = "frame-403:2759"
SIZES = [(320, 690), (393, 852), (430, 932), (768, 1024)]


def check_viewport(browser, url, width, height):
    context = browser.new_context(viewport={"width": width, "height": height})
    page = context.new_page()
    errors = []
    page.on("pageerror", lambda error: errors.append(str(error)))
    page.add_init_script("""
        window.seenOceanFrames = [];
        new MutationObserver(() => {
          const frame = document.querySelector('[data-testid^="frame-"]')?.dataset.testid;
          if (frame && frame !== window.seenOceanFrames.at(-1)) window.seenOceanFrames.push(frame);
        }).observe(document, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-testid'] });
    """)
    try:
        page.goto(url, wait_until="domcontentloaded")
        expect(page.get_by_test_id(HOME)).to_be_visible(timeout=60000)
        assert page.evaluate("window.seenOceanFrames") == LOGO_SEQUENCE + [HOME]
        page.get_by_test_id("403:2843").last.click()
        expect(page.get_by_test_id("frame-101:2769")).to_be_visible()
        page.get_by_test_id("101:2793").last.click()
        expect(page.get_by_test_id("frame-115:422")).to_be_visible()
        draft = page.get_by_test_id("115:451")
        draft.fill("Checking text input on Ocean Project")
        expect(draft).to_have_value("Checking text input on Ocean Project")
        assert page.evaluate("document.documentElement.scrollWidth <= innerWidth")
        assert not errors, errors
    finally:
        context.close()


def check_retry(browser, url):
    page = browser.new_page()
    pattern = "**/rest/v1/impact_metrics?*"

    def unavailable(route: Route):
        route.fulfill(
            status=503,
            headers={"Access-Control-Allow-Origin": "*", "Content-Type": "application/json"},
            body='{"message":"Test connection interrupted"}',
        )

    try:
        page.route(pattern, unavailable)
        page.goto(url, wait_until="domcontentloaded")
        retry = page.get_by_role("button", name=re.compile("Test connection interrupted.*Thử lại"))
        expect(retry).to_be_visible(timeout=60000)
        page.unroute(pattern, unavailable)
        with page.expect_response(lambda r: "/rest/v1/impact_metrics?" in r.url and r.ok):
            retry.click()
        expect(retry).to_have_count(0, timeout=20000)
    finally:
        page.close()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("url", help="URL of the running Expo Web app")
    parser.add_argument("--chromium", help="Optional path to an existing Chromium executable")
    args = parser.parse_args()
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(executable_path=args.chromium)
        try:
            for width, height in SIZES:
                check_viewport(browser, args.url, width, height)
                print(f"Passed startup, navigation and text input at {width} × {height}", flush=True)
            check_retry(browser, args.url)
            print("Passed API error and recovery", flush=True)
        finally:
            browser.close()


if __name__ == "__main__":
    main()
