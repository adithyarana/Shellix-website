# Shellix AI website

A buildless landing page using HTML, CSS, and vanilla JavaScript. No dependencies,
external assets, analytics, backend, or credential collection. The terminal demo
is entirely scripted; it does not execute commands, read files, or call an AI API.

## Preview

From the `shellix_page` workspace:

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory website
```

Open http://127.0.0.1:4173. Stop the server with Ctrl-C. Clipboard access works on
localhost or HTTPS when allowed by the browser. If copying is blocked, the page
selects the command and displays manual-copy feedback. Opening index.html directly
also displays the site, but browser clipboard restrictions may apply.

## Static hosting

Upload `index.html`, `styles.css`, and `script.js` together to any static host;
use `website/` as the publish directory. No build command or environment variables
are needed. Relative assets support hosting in a subdirectory. Prefer HTTPS for
clipboard support. Nothing has been published, committed, or pushed by this task.

## Content verification — 5 October 2026

Read-only source reviewed in `../Shellix`, commit
`526cbe8e532244e5962ad79999bc8f865bdc699f`: README, pyproject.toml, LICENSE,
CLI commands/UI, configuration manager, safety validator, and fixing workflow/project
implementation. Existing application files and configuration were not changed.

- Python >=3.11 and MIT license verified against project files.
- Live https://pypi.org/pypi/shellix-ai/json reported **0.1.2**. The search/browser
  cache initially showed 0.1.1; the live API and downloaded 0.1.2 wheel supersede it.
- Every Python module in that published wheel matched local source byte for byte,
  including fix mode. Local README still labels that workflow “source version,”
  but the published artifact confirms availability in 0.1.2.
- https://api.github.com/repos/adithyarana/Shellix returned HTTP 200, private=false,
  default_branch=master, has_issues=true. Public issue, license, and release pages
  loaded successfully. New-issue submission naturally requires GitHub sign-in.
- Contribution link follows the existing README Development section; no new
  contribution policy or Discussions URL was invented.
- OpenRouter key and model catalog links checked; no fixed model availability or
  free-model claims. Release/model information should be rechecked before updates.

## Verification

Headless installed Chrome via Playwright Core, using localhost preview:

- Desktop, tablet, and phone widths: 1440, 1024, 768, 390, and 320 pixels.
- Screenshots inspected; horizontal overflow checked and a tablet background overflow fixed.
- All internal anchors, all clipboard contents (including multiline commands),
  clipboard-denied fallback, and JavaScript syntax checked.
- Both demo tabs; command result/reset; context consent/cancel; diff apply/reject/reset.
- Arrow-key tab navigation; mobile menu, Escape, and section navigation; keyboard FAQ toggles.
- Reduced-motion animation suppression; no browser JavaScript errors.

No automated live AI calls, CLI command execution, credential entry, or file editing
occur during the demo. Browser QA covers Chrome; other browsers and a full screen-reader
audit were not run. API pricing and release versions are point-in-time facts.
