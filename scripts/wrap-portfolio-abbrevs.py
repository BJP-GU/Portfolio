#!/usr/bin/env python3
"""Wrap portfolio copy abbreviations in <abbr> for small-caps styling."""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FILES = [ROOT / "index.html", ROOT / "resume.html"]

TIME_MARK_START = "\uE000"
TIME_MARK_END = "\uE001"

SPECIAL_REPLACEMENTS = [
    ("UX/UI", "<abbr>UX</abbr>/<abbr>UI</abbr>"),
    ("YC W25", "<abbr>YC</abbr> <abbr>W25</abbr>"),
    ("Q&amp;A", "<abbr>Q&amp;A</abbr>"),
    ("Design-IDE", "Design-<abbr>IDE</abbr>"),
    ("Gemini Live API", "Gemini Live <abbr>API</abbr>"),
    ("Human-AI", "Human-<abbr>AI</abbr>"),
    ("PM &amp; Engineering", "<abbr>PM</abbr> &amp; Engineering"),
    ("PM & Engineering", "<abbr>PM</abbr> & Engineering"),
    ("(YC)", "(<abbr>YC</abbr>)"),
    ("(CMS)", "(<abbr>CMS</abbr>)"),
    ("(PM)", "(<abbr>PM</abbr>)"),
    ("(Eng)", "(<abbr>Eng</abbr>)"),
    ("(CEO)", "(<abbr>CEO</abbr>)"),
    ("(CTO)", "(<abbr>CTO</abbr>)"),
]

WORD_TOKENS = [
    "BLV",
    "CMS",
    "UX",
    "UI",
    "API",
    "IDE",
    "VR",
    "iOS",
    "AI",
    "YC",
    "W25",
]


def protect_clock_times(text: str) -> str:
    return re.sub(
        r"\b(\d{1,2}(?::\d{2})?\s+(?:AM|PM))\b",
        lambda m: f"{TIME_MARK_START}{m.group(1)}{TIME_MARK_END}",
        text,
    )


def restore_clock_times(text: str) -> str:
    return re.sub(
        rf"{TIME_MARK_START}([^{TIME_MARK_END}]+){TIME_MARK_END}",
        r"\1",
        text,
    )


def split_outside_abbr(text: str) -> list[str]:
    return re.split(r"(<abbr>[^<]*</abbr>)", text)


def wrap_token(text: str, token: str) -> str:
    pattern = re.compile(rf"\b{re.escape(token)}\b")

    def repl_outside(parts: list[str]) -> list[str]:
        for i in range(0, len(parts), 2):
            parts[i] = pattern.sub(f"<abbr>{token}</abbr>", parts[i])
        return parts

    return "".join(repl_outside(split_outside_abbr(text)))


def process_text_segment(text: str) -> str:
    if not text or "<" in text:
        return text
    text = protect_clock_times(text)
    for old, new in SPECIAL_REPLACEMENTS:
        parts = split_outside_abbr(text)
        for i in range(0, len(parts), 2):
            parts[i] = parts[i].replace(old, new)
        text = "".join(parts)
    for token in WORD_TOKENS:
        text = wrap_token(text, token)
    return restore_clock_times(text)


# data-text is mirrored via attr() in CSS — must stay plain text (no markup).
ATTR_VALUE_RE = re.compile(
    r'((?:aria-label|alt)=)(")([^"]*)(")',
    re.IGNORECASE,
)


def process_attr_values(html: str) -> str:
    def repl(match: re.Match[str]) -> str:
        prefix, q1, value, q2 = match.groups()
        return f"{prefix}{q1}{process_text_segment(value)}{q2}"

    return ATTR_VALUE_RE.sub(repl, html)


def process_html(html: str) -> str:
    skip_depth = 0
    skip_tags = {"script", "style", "textarea"}
    parts = re.split(r"(<[^>]+>)", html)
    out: list[str] = []

    for part in parts:
        if part.startswith("<"):
            out.append(part)
            m = re.match(r"</(\w+)", part)
            if m and m.group(1).lower() in skip_tags:
                skip_depth = max(0, skip_depth - 1)
            m = re.match(r"<(\w+)", part)
            if m and m.group(1).lower() in skip_tags and not part.startswith("</"):
                skip_depth += 1
            continue
        if skip_depth > 0:
            out.append(part)
        else:
            out.append(process_text_segment(part))

    html = "".join(out)
    return process_attr_values(html)


def main() -> int:
    for path in FILES:
        original = path.read_text(encoding="utf-8")
        updated = process_html(original)
        if updated != original:
            path.write_text(updated, encoding="utf-8")
            print(f"updated {path.name}")
        else:
            print(f"unchanged {path.name}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
