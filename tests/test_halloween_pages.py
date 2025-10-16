"""Regression tests for the Halloween theme pages."""

from __future__ import annotations

import pathlib
import unittest


REPO_ROOT = pathlib.Path(__file__).resolve().parent.parent


class HalloweenPageTests(unittest.TestCase):
    """Verify the static Halloween pages stay consistent."""

    def setUp(self) -> None:
        self.halloween_html = REPO_ROOT / "halloween.html"
        self.halloween_index = REPO_ROOT / "halloween" / "index.html"

    def test_pages_exist(self) -> None:
        """Both Halloween entry points should exist for compatibility."""

        self.assertTrue(self.halloween_html.exists(), "Missing halloween.html entry point")
        self.assertTrue(self.halloween_index.exists(), "Missing /halloween/ index page")

    def test_pages_are_identical(self) -> None:
        """The HTML should match so updates stay in sync."""

        html_contents = self.halloween_html.read_text(encoding="utf-8").strip()
        index_contents = self.halloween_index.read_text(encoding="utf-8").strip()
        self.assertEqual(index_contents, html_contents)

    def test_brand_links_to_directory(self) -> None:
        """The branded link should point at the canonical directory URL."""

        html_contents = self.halloween_html.read_text(encoding="utf-8")
        self.assertIn('href="/halloween/"', html_contents)


if __name__ == "__main__":
    unittest.main()
