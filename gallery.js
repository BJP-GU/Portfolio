// ==========================================================================
// GALLERY
//
// Every piece of case-study media on one pannable, zoomable canvas,
// clustered around the theme it belongs to. Groups are assigned by hand
// below; the lines between media are decoration and carry no meaning.
//
// Clicking a piece opens its case study in a modal, framed from the index
// page with ?embed and landed on the section the piece came from.
// ==========================================================================

(function() {
    'use strict';

    // ---------------------------------------------------------------------
    // CONTENT
    // ---------------------------------------------------------------------

    // The index rows each case study lives under, with the tags shown on the
    // row. Tags drive the focus chips along the bottom.
    var CASES = {
        'glean-composer': { num: '#2', company: 'Glean', title: 'Composer redesign', tags: ['Case Study', 'Enterprise AI'] },
        'glean-agents': { num: '#3', company: 'Glean', title: 'Agents in assistant', tags: ['Case Study', 'Enterprise AI'] },
        'anchor': { num: '#4', company: 'Anchor', title: 'BLV wayfinding for autonomous rideshare', tags: ['Case Study', 'Autonomous Vehicles', 'Accessibility'] },
        'onlook': { num: '#5', company: 'Onlook (YC)', title: 'Growth & interaction design for a visual AI IDE', tags: ['Creativity Support Tool', 'AI Design Tool'] },
        'archetype': { num: '#6', company: 'Archetype', title: 'Simulated user testing with synthetic users', tags: [] }
    };

    // Each item names its case study and the section it appears in. The
    // section ids are the ones the index builds for its side nav: the case
    // study's id, then the section's eyebrow slugged.
    //   kind: 'image' (cropped to fill), 'diagram' (kept whole on white),
    //         'video' (poster at rest, plays under the pointer), 'vimeo'
    //   size: scale on the default footprint; overview shots run larger.
    var GROUPS = [
        {
            id: 'enterprise-ai',
            label: 'Enterprise AI',
            anchor: [0, 0],
            items: [
                { cs: 'glean-composer', section: 'overview', caption: 'Composer redesign', kind: 'video', src: 'Glean/Glean%20Composer%20Thumbnail%20Video.mp4?v=composer-thumb', poster: 'Glean/composer-thumbnail-poster.jpg?v=composer-thumb', w: 840, h: 560, size: 1.35 },
                { cs: 'glean-agents', section: 'overview', caption: 'Agents in assistant', kind: 'image', src: 'Glean/agents-case-preview.png?v=hover-card', w: 2560, h: 1824, size: 1.35 },
                { cs: 'glean-composer', section: 'exploration-ideation-and-insights', caption: 'Composer layout', kind: 'diagram', src: 'Glean/composer-layout.svg?v=composer-layout-3', w: 1307, h: 502 },
                { cs: 'glean-composer', section: 'ui-design', caption: 'New chip design', kind: 'diagram', src: 'Glean/chip-spacing.svg?v=3', w: 1227, h: 603 },
                { cs: 'glean-composer', section: 'ui-design', caption: 'Chips in context', kind: 'diagram', src: 'Glean/chip-in-context.svg?v=3', w: 4448, h: 776, size: 0.85 },
                { cs: 'glean-composer', section: 'ui-design', caption: 'Chip states', kind: 'diagram', src: 'Glean/chip-states.svg?v=3', w: 1663, h: 629 },
                { cs: 'glean-composer', section: 'results', caption: 'Composer demo', kind: 'video', src: 'Glean/Glean_Composer_demo_video.mp4?v=composer-hover', poster: 'Glean/composer-demo-poster.jpg?v=composer-hover', w: 1280, h: 720, size: 1.15 },
                { cs: 'glean-agents', section: 'problem', caption: 'The current agent builder', kind: 'image', src: 'Glean/Agents%20Problem%20Overview.png', w: 3448, h: 2162 },
                { cs: 'glean-agents', section: 'discovery-and-insights', caption: 'Claude Scheduled Tasks', kind: 'image', src: 'Glean/competitors/claude-scheduled-tasks.webp', w: 2000, h: 1253, size: 0.9 },
                { cs: 'glean-agents', section: 'discovery-and-insights', caption: 'Cursor Automations', kind: 'image', src: 'Glean/competitors/cursor-agents.webp', w: 2000, h: 1253, size: 0.9 },
                { cs: 'glean-agents', section: 'discovery-and-insights', caption: 'ChatGPT Work Scheduled Tasks', kind: 'image', src: 'Glean/competitors/chatgpt-scheduled-tasks.webp', w: 2000, h: 1253, size: 0.9 },
                { cs: 'glean-agents', section: 'discovery-and-insights', caption: 'Perplexity Computer Automations', kind: 'image', src: 'Glean/competitors/perplexity-automations.webp', w: 2000, h: 1253, size: 0.9 },
                { cs: 'glean-agents', section: 'solution', caption: 'Agents conceptual model', kind: 'diagram', src: 'Glean/agents-conceptual-model.svg', w: 1761, h: 451 },
                { cs: 'glean-agents', section: 'solution', caption: 'The unified agent builder', kind: 'diagram', src: 'Glean/unified-builder-model.svg?v=2', w: 1965, h: 871 }
            ]
        },
        {
            id: 'physical-ai',
            label: 'Physical AI',
            anchor: [1.1, 0.3],
            items: [
                { cs: 'anchor', section: 'solution', caption: 'Final product demo', kind: 'video', src: 'Anchor/anchor-final-demo.mp4?v=1', poster: 'Anchor/anchor-final-demo-poster.jpg?v=1', w: 1920, h: 1080, size: 1.35 },
                { cs: 'anchor', section: 'prototyping-and-testing', caption: 'Ambient spatial audio guides the user', kind: 'video', src: 'Anchor/spatial-audio-experiment.mp4?v=1', poster: 'Anchor/spatial-audio-experiment-poster.jpg?v=1', w: 720, h: 1280 },
                { cs: 'anchor', section: 'prototyping-and-testing', caption: 'Directions by tactile perception', kind: 'video', src: 'Anchor/tactile-wayfinding-experiment.mp4?v=1', poster: 'Anchor/tactile-wayfinding-experiment-poster.jpg?v=1', w: 720, h: 1280 },
                { cs: 'anchor', section: 'prototyping-and-testing', caption: 'Spatial audio in VR', kind: 'video', src: 'Anchor/vr-spatial-audio-exploration.mp4?v=1', poster: 'Anchor/vr-spatial-audio-exploration-poster.jpg?v=1', w: 1280, h: 720 },
                { cs: 'anchor', section: 'prototyping-and-testing', caption: 'Lidar experiment', kind: 'video', src: 'Anchor/lidar-exploration.mp4?v=1', poster: 'Anchor/lidar-exploration-poster.jpg?v=1', w: 720, h: 1560 },
                { cs: 'anchor', section: 'prototyping-and-testing', caption: 'Gemini vision language model experiment', kind: 'video', src: 'Anchor/vlm-exploration.mp4?v=1', poster: 'Anchor/vlm-exploration-poster.jpg?v=1', w: 1180, h: 2556 },
                { cs: 'anchor', section: 'solution', caption: 'Solution conceptual model', kind: 'diagram', src: 'Anchor/solution-conceptual-model.svg?v=2', w: 1924, h: 1736 },
                { cs: 'anchor', section: 'solution', caption: 'Waypoint spatial audio', kind: 'video', src: 'Anchor/waypoint-spatial-audio-example.mp4?v=anchor-hover', poster: 'Anchor/waypoint-spatial-audio-example-poster.jpg?v=anchor-hover', w: 1280, h: 720 },
                { cs: 'anchor', section: 'solution', caption: 'White cane button', kind: 'video', src: 'Anchor/white-cane-button.mp4?v=1', poster: 'Anchor/white-cane-button-poster.jpg?v=1', w: 1280, h: 720 }
            ]
        },
        {
            id: 'creativity-support-tools',
            label: 'Creativity Support Tools',
            anchor: [-1.05, 0.5],
            items: [
                { cs: 'onlook', section: 'about-onlook', caption: 'Onlook', kind: 'image', src: 'Onlook/onlook-case-preview.png?v=onlook-hover', w: 3456, h: 2234, size: 1.35 },
                { cs: 'onlook', section: 'my-work-at-onlook', caption: 'Composer shortcuts', kind: 'vimeo', vimeo: '1120704633', w: 1000, h: 553 },
                { cs: 'onlook', section: 'my-work-at-onlook', caption: 'Publishing and sharing', kind: 'vimeo', vimeo: '1120687921', w: 1000, h: 637 }
            ]
        },
        {
            id: 'side-explorations',
            label: 'Side Explorations',
            anchor: [-0.8, -0.65],
            items: [
                { cs: 'archetype', section: 'overview', caption: 'Archetype', kind: 'image', src: 'Archetype/archetype-case-preview.webp?v=archetype-hover', w: 2000, h: 1255, size: 1.35 },
                { cs: 'archetype', section: 'about', caption: 'Synthetic Archetype web app', kind: 'image', src: 'Archetype/archetype-web-app-home.webp', w: 2000, h: 1206 }
            ]
        },
        {
            id: 'design-school',
            label: 'Design School Projects',
            anchor: [0.8, -0.8],
            note: 'Coming soon',
            items: []
        }
    ];

    // ---------------------------------------------------------------------
    // LAYOUT CONSTANTS (world pixels)
    // ---------------------------------------------------------------------

    var ITEM_BASE = 190;      // sqrt(area) of a size-1 item
    var ITEM_GAP = 18;        // clear space between neighbouring media
    var LABEL_CLEAR = 22;     // clear space around a theme label
    var GROUP_GAP = 120;      // clear space between clusters
    var SPREAD = 700;         // how far apart the hand-set anchors start
    var FIT_PAD = 48;         // screen pixels kept clear around a fit
    var MAX_ZOOM = 3;
    var FLY_MS = 760;

    var stage = document.getElementById('gallery-stage');
    var world = document.getElementById('gallery-world');
    var linesSvg = document.getElementById('gallery-lines');
    var chipsEl = document.getElementById('gallery-chips');
    var zoomEl = document.getElementById('gallery-zoom');
    var fitBtn = document.getElementById('gallery-fit');
    var tooltip = document.getElementById('gallery-tooltip');
    var SVG_NS = 'http://www.w3.org/2000/svg';

    function prefersReducedMotion() {
        try {
            return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
        } catch (e) {
            return false;
        }
    }

    // Seeded, so the decorative lines land in the same place on every visit.
    function rng(seed) {
        return function() {
            seed |= 0;
            seed = (seed + 0x6D2B79F5) | 0;
            var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
            t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
    }

    function sectionId(item) {
        return item.cs + '-' + item.section;
    }

    // ---------------------------------------------------------------------
    // BUILD THE WORLD
    // ---------------------------------------------------------------------

    var allItems = [];

    GROUPS.forEach(function(group) {
        var label = document.createElement('button');
        label.type = 'button';
        label.className = 'gallery-label';
        label.textContent = group.label;
        if (group.items.length) {
            var count = document.createElement('span');
            count.className = 'gallery-label__count';
            count.textContent = group.items.length;
            label.appendChild(count);
        }
        if (group.note) {
            var note = document.createElement('span');
            note.className = 'gallery-label__note';
            note.textContent = group.note;
            label.appendChild(note);
        }
        label.setAttribute('aria-label', group.label + (group.note ? ' (' + group.note.toLowerCase() + ')' : ', ' + group.items.length + ' pieces') + '. Zoom to this theme.');
        world.appendChild(label);
        group.labelEl = label;

        group.items.forEach(function(item) {
            var ar = item.w / item.h;
            var base = ITEM_BASE * (item.size || 1);
            item.ww = Math.round(base * Math.sqrt(ar));
            item.wh = Math.round(base / Math.sqrt(ar));
            item.group = group;
            item.tags = CASES[item.cs].tags;

            var el = document.createElement('button');
            el.type = 'button';
            el.className = 'gallery-item' + (item.kind === 'diagram' ? ' gallery-item--diagram' : '');
            el.style.width = item.ww + 'px';
            el.style.height = item.wh + 'px';
            el.setAttribute('aria-label', CASES[item.cs].company + ': ' + item.caption + '. Open the case study.');

            if (item.kind !== 'vimeo') {
                var img = document.createElement('img');
                img.src = item.poster || item.src;
                img.alt = '';
                img.decoding = 'async';
                img.draggable = false;
                el.appendChild(img);
            }

            item.el = el;
            el._item = item;
            world.appendChild(el);
            allItems.push(item);
        });
    });

    // Vimeo serves its own thumbnails; ask for them once the page is up.
    // Without one the piece leaves the canvas rather than sit there blank.
    allItems.forEach(function(item) {
        if (item.kind !== 'vimeo') return;
        var url = 'https://vimeo.com/api/oembed.json?url=' + encodeURIComponent('https://vimeo.com/' + item.vimeo) + '&width=960';
        fetch(url).then(function(res) {
            if (!res.ok) throw new Error('oembed ' + res.status);
            return res.json();
        }).then(function(data) {
            if (!data || !data.thumbnail_url) throw new Error('no thumbnail');
            var img = document.createElement('img');
            img.src = data.thumbnail_url;
            img.alt = '';
            img.decoding = 'async';
            img.draggable = false;
            item.el.appendChild(img);
        }).catch(function() {
            item.el.hidden = true;
            if (item.spoke) item.spoke.remove();
            (item.links || []).forEach(function(line) { line.remove(); });
        });
    });

    // ---------------------------------------------------------------------
    // PACK EACH CLUSTER
    // Media spiral out from the theme label, each taking the first spot on
    // the spiral that clears the label and everything already placed. The
    // spiral is stretched sideways so clusters read as wide blobs.
    // ---------------------------------------------------------------------

    // On a tall screen (a phone held upright) the whole layout turns on its
    // side, so the clusters stack down the screen instead of across it.
    var portrait = stage.clientHeight > stage.clientWidth * 1.1;
    var STRETCH_X = portrait ? 0.85 : 1.35;
    var STRETCH_Y = portrait ? 1.35 : 0.85;

    function overlaps(a, b, gap) {
        return Math.abs(a.x - b.x) * 2 < a.w + b.w + gap * 2
            && Math.abs(a.y - b.y) * 2 < a.h + b.h + gap * 2;
    }

    GROUPS.forEach(function(group, gi) {
        var lw = group.labelEl.offsetWidth;
        var lh = group.labelEl.offsetHeight;
        var placed = [{ x: 0, y: 0, w: lw + LABEL_CLEAR * 2 - ITEM_GAP * 2, h: lh + LABEL_CLEAR * 2 - ITEM_GAP * 2 }];
        var startAngle = gi * 1.7;
        var radius = Math.max(lw, lh) / 2 + 40;

        group.items.forEach(function(item) {
            var rect = { x: 0, y: 0, w: item.ww, h: item.wh };
            for (var t = 0; t < 6000; t++) {
                var theta = startAngle + t * 0.09;
                var r = 4 + t * 0.55;
                rect.x = Math.cos(theta) * r * STRETCH_X;
                rect.y = Math.sin(theta) * r * STRETCH_Y;
                var clear = true;
                for (var i = 0; i < placed.length; i++) {
                    if (overlaps(rect, placed[i], ITEM_GAP)) { clear = false; break; }
                }
                if (clear) break;
            }
            item.lx = rect.x;
            item.ly = rect.y;
            placed.push({ x: rect.x, y: rect.y, w: rect.w, h: rect.h });
            var far = Math.hypot(Math.abs(rect.x) + rect.w / 2, Math.abs(rect.y) + rect.h / 2);
            radius = Math.max(radius, far);
        });

        group.radius = radius;
    });

    // ---------------------------------------------------------------------
    // PLACE THE CLUSTERS
    // Start from the hand-set anchors, then push apart any pair that would
    // overlap, nudging the biggest cluster least.
    // ---------------------------------------------------------------------

    GROUPS.forEach(function(group) {
        group.x = (portrait ? group.anchor[1] : group.anchor[0]) * SPREAD;
        group.y = (portrait ? group.anchor[0] : group.anchor[1]) * SPREAD;
    });

    for (var pass = 0; pass < 300; pass++) {
        var moved = false;
        for (var a = 0; a < GROUPS.length; a++) {
            for (var b = a + 1; b < GROUPS.length; b++) {
                var A = GROUPS[a];
                var B = GROUPS[b];
                var dx = B.x - A.x;
                var dy = B.y - A.y;
                var dist = Math.hypot(dx, dy) || 1;
                var need = A.radius + B.radius + GROUP_GAP;
                if (dist >= need) continue;
                var push = (need - dist) / 2;
                var wa = B.radius / (A.radius + B.radius);
                var wb = 1 - wa;
                A.x -= dx / dist * push * wa * 2;
                A.y -= dy / dist * push * wa * 2;
                B.x += dx / dist * push * wb * 2;
                B.y += dy / dist * push * wb * 2;
                moved = true;
            }
        }
        if (!moved) break;
    }

    GROUPS.forEach(function(group) {
        group.labelEl.style.left = group.x + 'px';
        group.labelEl.style.top = group.y + 'px';
        group.items.forEach(function(item) {
            item.x = group.x + item.lx;
            item.y = group.y + item.ly;
            item.el.style.left = (item.x - item.ww / 2) + 'px';
            item.el.style.top = (item.y - item.wh / 2) + 'px';
        });
    });

    // ---------------------------------------------------------------------
    // LINES
    // Spokes from each label to its media, and a loose web of threads
    // between clusters. Purely decorative.
    // ---------------------------------------------------------------------

    function addLine(x1, y1, x2, y2, className) {
        var line = document.createElementNS(SVG_NS, 'line');
        line.setAttribute('x1', x1.toFixed(1));
        line.setAttribute('y1', y1.toFixed(1));
        line.setAttribute('x2', x2.toFixed(1));
        line.setAttribute('y2', y2.toFixed(1));
        line.setAttribute('class', className);
        linesSvg.appendChild(line);
        return line;
    }

    allItems.forEach(function(item) {
        item.links = [];
        item.spoke = addLine(item.group.x, item.group.y, item.x, item.y, 'gallery-spoke');
        item.spoke._ends = [item];
    });

    (function() {
        var random = rng(38);
        var linkLines = [];
        for (var a = 0; a < GROUPS.length; a++) {
            for (var b = a + 1; b < GROUPS.length; b++) {
                var A = GROUPS[a];
                var B = GROUPS[b];
                // An empty cluster takes a single thread, so its label is
                // not the hub of a fan.
                var threads = (A.items.length && B.items.length) ? 2 + Math.floor(random() * 2) : 1;
                for (var t = 0; t < threads; t++) {
                    // Either end can be a piece of media or, now and then, the
                    // other cluster's label.
                    var from = A.items.length && random() > 0.15 ? A.items[Math.floor(random() * A.items.length)] : null;
                    var to = B.items.length && random() > 0.15 ? B.items[Math.floor(random() * B.items.length)] : null;
                    var x1 = from ? from.x : A.x;
                    var y1 = from ? from.y : A.y;
                    var x2 = to ? to.x : B.x;
                    var y2 = to ? to.y : B.y;
                    var line = addLine(x1, y1, x2, y2, 'gallery-link');
                    line._ends = [from, to].filter(Boolean);
                    line._groups = [A, B];
                    if (from) from.links.push(line);
                    if (to) to.links.push(line);
                    linkLines.push(line);
                }
            }
        }
        // A few threads inside the bigger clusters, so the spokes are not
        // the only lines there.
        GROUPS.forEach(function(group) {
            var n = Math.floor(group.items.length / 3);
            for (var i = 0; i < n; i++) {
                var p = group.items[Math.floor(random() * group.items.length)];
                var q = group.items[Math.floor(random() * group.items.length)];
                if (p === q) continue;
                var line = addLine(p.x, p.y, q.x, q.y, 'gallery-link');
                line._ends = [p, q];
                p.links.push(line);
                q.links.push(line);
            }
        });
    })();

    // World bounds, for fitting everything in view.
    function boundsOf(items, groups) {
        var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        items.forEach(function(item) {
            if (item.el.hidden) return;
            minX = Math.min(minX, item.x - item.ww / 2);
            maxX = Math.max(maxX, item.x + item.ww / 2);
            minY = Math.min(minY, item.y - item.wh / 2);
            maxY = Math.max(maxY, item.y + item.wh / 2);
        });
        (groups || []).forEach(function(group) {
            var hw = group.labelEl.offsetWidth / 2;
            var hh = group.labelEl.offsetHeight / 2;
            minX = Math.min(minX, group.x - hw);
            maxX = Math.max(maxX, group.x + hw);
            minY = Math.min(minY, group.y - hh);
            maxY = Math.max(maxY, group.y + hh);
        });
        return { minX: minX, minY: minY, maxX: maxX, maxY: maxY };
    }

    // ---------------------------------------------------------------------
    // CAMERA
    // screen = world * k + (x, y), in the stage's own pixels.
    // ---------------------------------------------------------------------

    var cam = { x: 0, y: 0, k: 1 };
    var minZoom = 0.1;
    var flight = null;

    function stageSize() {
        return { w: stage.clientWidth, h: stage.clientHeight };
    }

    function apply() {
        world.style.transform = 'translate(' + cam.x + 'px,' + cam.y + 'px) scale(' + cam.k + ')';
        var g = 40 * cam.k;
        while (g < 14) g *= 2;
        while (g > 80) g /= 2;
        stage.style.setProperty('--grid-size', g + 'px');
        stage.style.setProperty('--grid-x', (((cam.x % g) + g) % g) + 'px');
        stage.style.setProperty('--grid-y', (((cam.y % g) + g) % g) + 'px');
        zoomEl.textContent = Math.round(cam.k * 100) + '%';
    }

    function clampZoom(k) {
        return Math.min(MAX_ZOOM, Math.max(minZoom, k));
    }

    function cameraFor(b, maxK) {
        var s = stageSize();
        var bw = Math.max(1, b.maxX - b.minX);
        var bh = Math.max(1, b.maxY - b.minY);
        var k = Math.min((s.w - FIT_PAD * 2) / bw, (s.h - FIT_PAD * 2) / bh);
        k = Math.min(k, maxK || 1.2);
        k = clampZoom(k);
        var cx = (b.minX + b.maxX) / 2;
        var cy = (b.minY + b.maxY) / 2;
        return { x: s.w / 2 - cx * k, y: s.h / 2 - cy * k, k: k };
    }

    function cancelFlight() {
        if (flight) cancelAnimationFrame(flight);
        flight = null;
    }

    // Flies in centre-and-log-zoom space, so a long zoom out and back in
    // moves at an even pace rather than rushing the close end.
    function flyTo(target, instant) {
        cancelFlight();
        if (instant || prefersReducedMotion()) {
            cam.x = target.x;
            cam.y = target.y;
            cam.k = target.k;
            apply();
            return;
        }
        var s = stageSize();
        var from = { cx: (s.w / 2 - cam.x) / cam.k, cy: (s.h / 2 - cam.y) / cam.k, lk: Math.log(cam.k) };
        var to = { cx: (s.w / 2 - target.x) / target.k, cy: (s.h / 2 - target.y) / target.k, lk: Math.log(target.k) };
        var start = performance.now();

        function ease(t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        function frame(now) {
            var t = Math.min(1, (now - start) / FLY_MS);
            var e = ease(t);
            var k = Math.exp(from.lk + (to.lk - from.lk) * e);
            var cx = from.cx + (to.cx - from.cx) * e;
            var cy = from.cy + (to.cy - from.cy) * e;
            cam.k = k;
            cam.x = s.w / 2 - cx * k;
            cam.y = s.h / 2 - cy * k;
            apply();
            flight = t < 1 ? requestAnimationFrame(frame) : null;
        }

        flight = requestAnimationFrame(frame);
    }

    function zoomAt(px, py, factor) {
        var k = clampZoom(cam.k * factor);
        var f = k / cam.k;
        cam.x = px - (px - cam.x) * f;
        cam.y = py - (py - cam.y) * f;
        cam.k = k;
        apply();
    }

    function visibleItems() {
        return allItems.filter(function(item) {
            return !item.el.hidden && (!activeTag || item.tags.indexOf(activeTag) !== -1);
        });
    }

    function fitAll(instant) {
        var b = boundsOf(allItems, GROUPS);
        var target = cameraFor(b, 1);
        minZoom = Math.min(0.1, target.k * 0.5);
        flyTo(target, instant);
    }

    function flyToGroup(group) {
        var b = group.items.length
            ? boundsOf(group.items, [group])
            : boundsOf([], [group]);
        if (!group.items.length) {
            b.minX -= 200; b.maxX += 200; b.minY -= 120; b.maxY += 120;
        }
        flyTo(cameraFor(b, 1.6));
    }

    // ---------------------------------------------------------------------
    // FOCUS CHIPS
    // ---------------------------------------------------------------------

    var activeTag = null;

    // Topic tags first, in the order they appear down the index; the
    // catch-all "Case Study" last.
    var tagOrder = [];
    Object.keys(CASES).forEach(function(key) {
        CASES[key].tags.forEach(function(tag) {
            if (tag !== 'Case Study' && tagOrder.indexOf(tag) === -1) tagOrder.push(tag);
        });
    });
    if (allItems.some(function(item) { return item.tags.indexOf('Case Study') !== -1; })) {
        tagOrder.push('Case Study');
    }

    var chipEls = tagOrder.map(function(tag) {
        var chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'gallery-chip';
        chip.textContent = tag;
        chip.setAttribute('aria-pressed', 'false');
        chip.addEventListener('click', function() {
            setFocus(activeTag === tag ? null : tag);
        });
        chipsEl.appendChild(chip);
        return chip;
    });

    function setFocus(tag) {
        activeTag = tag;
        setActiveGroup(null);
        chipEls.forEach(function(chip) {
            chip.setAttribute('aria-pressed', chip.textContent === tag ? 'true' : 'false');
        });
        stage.classList.toggle('is-focused', !!tag);

        var matches = visibleItems();
        allItems.forEach(function(item) {
            var on = !!tag && matches.indexOf(item) !== -1;
            item.el.classList.toggle('is-match', on);
            item.el.tabIndex = !tag || on ? 0 : -1;
        });
        var matchGroups = GROUPS.filter(function(group) {
            return group.items.some(function(item) { return item.el.classList.contains('is-match'); });
        });
        GROUPS.forEach(function(group) {
            group.labelEl.classList.toggle('is-match', matchGroups.indexOf(group) !== -1);
        });
        Array.prototype.forEach.call(linesSvg.childNodes, function(line) {
            var ends = line._ends || [];
            var on = !!tag && ends.length > 0 && ends.every(function(item) { return item.el.classList.contains('is-match'); });
            line.classList.toggle('is-match', on);
        });

        if (tag && matches.length) {
            flyTo(cameraFor(boundsOf(matches, matchGroups), 1.4));
        } else {
            fitAll();
        }
    }

    // ---------------------------------------------------------------------
    // TOOLTIP + HOVER
    // ---------------------------------------------------------------------

    var hovered = null;
    var dragging = false;

    function showTooltip(item, e) {
        tooltip.textContent = '';
        var company = document.createElement('span');
        company.className = 'gallery-tooltip__company';
        company.textContent = CASES[item.cs].company;
        tooltip.appendChild(company);
        tooltip.appendChild(document.createTextNode(' — ' + item.caption));
        tooltip.hidden = false;
        tooltip.classList.add('is-visible');
        moveTooltip(e);
    }

    function moveTooltip(e) {
        if (tooltip.hidden || !e) return;
        var pad = 12;
        var w = tooltip.offsetWidth;
        var h = tooltip.offsetHeight;
        var x = e.clientX + 14;
        var y = e.clientY + 18;
        if (x + w > window.innerWidth - pad) x = e.clientX - w - 14;
        if (y + h > window.innerHeight - pad) y = e.clientY - h - 14;
        tooltip.style.transform = 'translate(' + Math.max(pad, x) + 'px,' + Math.max(pad, y) + 'px)';
    }

    function hideTooltip() {
        tooltip.hidden = true;
        tooltip.classList.remove('is-visible');
    }

    function playPreview(item) {
        if (item.kind !== 'video' || prefersReducedMotion()) return;
        if (!item.video) {
            var video = document.createElement('video');
            video.muted = true;
            video.loop = true;
            video.playsInline = true;
            video.setAttribute('playsinline', '');
            video.preload = 'auto';
            video.src = item.src;
            video.style.position = 'absolute';
            video.style.inset = '0';
            item.el.appendChild(video);
            item.video = video;
        }
        var p = item.video.play();
        if (p && p.catch) p.catch(function() {});
    }

    function stopPreview(item) {
        if (item.video) item.video.pause();
    }

    function setHovered(item, e) {
        if (hovered === item) return;
        if (hovered) {
            hovered.el.classList.remove('is-hovered');
            stopPreview(hovered);
        }
        hovered = item;
        if (item) {
            item.el.classList.add('is-hovered');
            playPreview(item);
            showTooltip(item, e);
        } else {
            hideTooltip();
        }
    }

    stage.addEventListener('pointermove', function(e) {
        if (e.pointerType !== 'mouse' || dragging) return;
        var el = e.target.closest && e.target.closest('.gallery-item');
        setHovered(el ? el._item : null, e);
        moveTooltip(e);
        var label = e.target.closest && e.target.closest('.gallery-label');
        setHoverGroup(label ? groupOfLabel(label) : null);
    });

    stage.addEventListener('pointerleave', function() {
        setHovered(null);
        setHoverGroup(null);
    });

    // ---------------------------------------------------------------------
    // THEME HIGHLIGHT
    // Pointing at a label lights its cluster in colour and washes out the
    // rest. Clicking the label keeps it lit until the canvas, Fit, a chip or
    // Escape lets it go.
    // ---------------------------------------------------------------------

    var activeGroup = null;
    var hoverGroup = null;

    function groupOfLabel(el) {
        return GROUPS.filter(function(g) { return g.labelEl === el; })[0] || null;
    }

    function renderTheme() {
        var group = hoverGroup || activeGroup;
        stage.classList.toggle('is-theme', !!group);
        GROUPS.forEach(function(g) {
            g.labelEl.classList.toggle('is-theme-label', g === group);
        });
        allItems.forEach(function(item) {
            item.el.classList.toggle('is-theme-item', !!group && item.group === group);
        });
        Array.prototype.forEach.call(linesSvg.childNodes, function(line) {
            var ends = line._ends || [];
            var on = !!group && ends.length > 0 && ends.every(function(item) { return item.group === group; });
            line.classList.toggle('is-theme-line', on);
        });
    }

    function setHoverGroup(group) {
        if (hoverGroup === group) return;
        hoverGroup = group;
        renderTheme();
    }

    function setActiveGroup(group) {
        activeGroup = group;
        renderTheme();
    }

    stage.addEventListener('focusin', function(e) {
        var label = e.target.closest && e.target.closest('.gallery-label');
        if (label) setHoverGroup(groupOfLabel(label));
    });

    stage.addEventListener('focusout', function(e) {
        if (e.target.closest && e.target.closest('.gallery-label')) setHoverGroup(null);
    });

    // ---------------------------------------------------------------------
    // PAN / ZOOM INPUT
    // One pointer drags; two pinch. A press that barely moves is a click on
    // whatever it started on.
    // ---------------------------------------------------------------------

    var pointers = {};
    var press = null;
    var pinch = null;
    var TAP_SLOP = 5;

    function stagePoint(e) {
        var r = stage.getBoundingClientRect();
        return { x: e.clientX - r.left, y: e.clientY - r.top };
    }

    function pointerList() {
        return Object.keys(pointers).map(function(id) { return pointers[id]; });
    }

    stage.addEventListener('pointerdown', function(e) {
        if (e.button !== 0 && e.pointerType === 'mouse') return;
        cancelFlight();
        try { stage.setPointerCapture(e.pointerId); } catch (err) {}
        pointers[e.pointerId] = stagePoint(e);
        var list = pointerList();

        if (list.length === 1) {
            press = {
                id: e.pointerId,
                start: list[0],
                cam: { x: cam.x, y: cam.y },
                target: e.target.closest ? e.target.closest('.gallery-item, .gallery-label') : null,
                moved: false
            };
        } else if (list.length === 2) {
            var p = list[0];
            var q = list[1];
            pinch = {
                dist: Math.hypot(q.x - p.x, q.y - p.y) || 1,
                mid: { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 },
                cam: { x: cam.x, y: cam.y, k: cam.k }
            };
            if (press) press.moved = true;
        }
    });

    stage.addEventListener('pointermove', function(e) {
        if (!pointers[e.pointerId]) return;
        pointers[e.pointerId] = stagePoint(e);
        var list = pointerList();

        if (pinch && list.length >= 2) {
            var p = list[0];
            var q = list[1];
            var dist = Math.hypot(q.x - p.x, q.y - p.y) || 1;
            var mid = { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 };
            var k = clampZoom(pinch.cam.k * dist / pinch.dist);
            var wx = (pinch.mid.x - pinch.cam.x) / pinch.cam.k;
            var wy = (pinch.mid.y - pinch.cam.y) / pinch.cam.k;
            cam.k = k;
            cam.x = mid.x - wx * k;
            cam.y = mid.y - wy * k;
            apply();
            return;
        }

        if (press && e.pointerId === press.id) {
            var pt = pointers[e.pointerId];
            var dx = pt.x - press.start.x;
            var dy = pt.y - press.start.y;
            if (!press.moved && Math.hypot(dx, dy) > TAP_SLOP) {
                press.moved = true;
                dragging = true;
                stage.classList.add('is-dragging');
                setHovered(null);
            }
            if (press.moved) {
                cam.x = press.cam.x + dx;
                cam.y = press.cam.y + dy;
                apply();
            }
        }
    });

    function endPointer(e) {
        if (!pointers[e.pointerId]) return;
        delete pointers[e.pointerId];
        var list = pointerList();

        if (pinch && list.length < 2) {
            pinch = null;
            // Carry on dragging with the finger that stayed down.
            if (list.length === 1) {
                var id = Object.keys(pointers)[0];
                press = { id: +id, start: list[0], cam: { x: cam.x, y: cam.y }, target: null, moved: true };
            } else {
                press = null;
            }
        } else if (press && e.pointerId === press.id) {
            var wasTap = !press.moved && e.type === 'pointerup';
            var target = press.target;
            press = null;
            if (wasTap && target) activate(target);
            else if (wasTap && activeGroup) setActiveGroup(null);
        }

        if (!list.length) {
            dragging = false;
            stage.classList.remove('is-dragging');
        }
    }

    stage.addEventListener('pointerup', endPointer);
    stage.addEventListener('pointercancel', endPointer);

    stage.addEventListener('wheel', function(e) {
        e.preventDefault();
        cancelFlight();
        var dy = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 400 : 1);
        // Pinching a trackpad arrives as a wheel with ctrl held, in much
        // smaller steps than a scroll.
        var factor = Math.exp(-dy * (e.ctrlKey ? 0.01 : 0.0016));
        var pt = stagePoint(e);
        zoomAt(pt.x, pt.y, factor);
    }, { passive: false });

    // Safari's own pinch gesture would zoom the whole page.
    ['gesturestart', 'gesturechange'].forEach(function(type) {
        document.addEventListener(type, function(e) { e.preventDefault(); }, { passive: false });
    });

    // Pointer taps are handled above; this catches Enter and Space on a
    // focused label or piece (a keyboard click has no pointer detail).
    stage.addEventListener('click', function(e) {
        if (e.detail !== 0) return;
        var target = e.target.closest && e.target.closest('.gallery-item, .gallery-label');
        if (target) activate(target);
    });

    // Tabbing to a piece out of view brings it in.
    stage.addEventListener('focusin', function(e) {
        var el = e.target.closest && e.target.closest('.gallery-item, .gallery-label');
        if (!el || stage.classList.contains('is-dragging')) return;
        var r = el.getBoundingClientRect();
        var s = stage.getBoundingClientRect();
        if (r.left >= s.left && r.right <= s.right && r.top >= s.top && r.bottom <= s.bottom) return;
        var item = el._item;
        var cx = item ? item.x : parseFloat(el.style.left);
        var cy = item ? item.y : parseFloat(el.style.top);
        var k = Math.max(cam.k, 0.5);
        var size = stageSize();
        flyTo({ x: size.w / 2 - cx * k, y: size.h / 2 - cy * k, k: k });
    });

    document.addEventListener('keydown', function(e) {
        if (modal.open || e.metaKey || e.ctrlKey || e.altKey) return;
        if (e.target && /^(INPUT|TEXTAREA)$/.test(e.target.tagName)) return;
        var s = stageSize();
        if (e.key === '+' || e.key === '=') {
            zoomAt(s.w / 2, s.h / 2, 1.25);
        } else if (e.key === '-' || e.key === '_') {
            zoomAt(s.w / 2, s.h / 2, 0.8);
        } else if (e.key === 'Escape' && activeGroup) {
            setActiveGroup(null);
        } else if (e.key === 'Escape' && activeTag) {
            setFocus(null);
        }
    });

    fitBtn.addEventListener('click', function() {
        if (activeTag) setFocus(null);
        else {
            setActiveGroup(null);
            fitAll();
        }
    });

    function activate(el) {
        if (el.classList.contains('gallery-label')) {
            var group = groupOfLabel(el);
            if (group) {
                setActiveGroup(group);
                flyToGroup(group);
            }
            return;
        }
        if (el._item) openCase(el._item);
    }

    // ---------------------------------------------------------------------
    // CASE STUDY MODAL
    // The frame loads the index once with ?embed. Later opens only change
    // its hash, which the index already answers by opening that case study
    // and scrolling to the section, so the frame never reloads.
    // ---------------------------------------------------------------------

    var modal = document.getElementById('gallery-modal');
    var frame = modal.querySelector('.gallery-modal__iframe');
    var closeBtn = modal.querySelector('.gallery-modal__close');
    var openLink = modal.querySelector('.gallery-modal__open');
    var titleNum = modal.querySelector('.gallery-modal__num');
    var titleCompany = modal.querySelector('.gallery-modal__company');
    var titleCase = modal.querySelector('.gallery-modal__case');
    var frameReady = false;
    var revealTimer = null;
    var returnFocus = null;
    var REVEAL_GIVE_UP_MS = 6000;

    // The frame stays faded out until the index has opened the case study
    // and scrolled the section to the top, so the reader never watches the
    // accordion open or the page jump. It is shown once the section sits at
    // the top and has held still for a beat, or after a few seconds anyway.
    function revealWhenLanded(id) {
        clearTimeout(revealTimer);
        var started = performance.now();
        var last = null;

        function check() {
            var top = null;
            try {
                var el = frame.contentDocument.getElementById(id);
                if (el) top = Math.round(el.getBoundingClientRect().top);
            } catch (e) {}
            var landed = top !== null && Math.abs(top) < 80 && top === last;
            if (landed || performance.now() - started > REVEAL_GIVE_UP_MS) {
                frame.classList.remove('is-loading');
                return;
            }
            last = top;
            revealTimer = setTimeout(check, 120);
        }

        revealTimer = setTimeout(check, 120);
    }

    function frameWindow() {
        try {
            return frame.contentWindow;
        } catch (e) {
            return null;
        }
    }

    frame.addEventListener('load', function() {
        frameReady = true;
        var win = frameWindow();
        if (win) {
            // Escape inside the frame never reaches this page on its own.
            try {
                win.addEventListener('keydown', function(e) {
                    if (e.key === 'Escape') closeCase();
                });
            } catch (e) {}
        }
    });

    function openCase(item) {
        var info = CASES[item.cs];
        var id = sectionId(item);
        setHovered(null);

        titleNum.textContent = info.num;
        titleCompany.textContent = info.company;
        titleCase.textContent = info.title;
        openLink.href = 'index.html#' + id;
        frame.title = info.company + ' case study: ' + info.title;

        frame.classList.add('is-loading');
        if (!frameReady || !frameWindow()) {
            frame.src = 'index.html?embed=1#' + id;
        } else {
            var win = frameWindow();
            try {
                // Clear the hash first, so landing on the section it already
                // holds still fires a hashchange. The URLs are absolute: a
                // relative one would resolve against this page, not the frame.
                var base = win.location.href.split('#')[0];
                win.location.replace(base + '#gallery');
                win.location.replace(base + '#' + id);
            } catch (e) {
                frame.src = 'index.html?embed=1#' + id;
            }
        }
        revealWhenLanded(id);

        returnFocus = item.el;
        if (typeof modal.showModal === 'function') {
            modal.showModal();
        } else {
            modal.setAttribute('open', '');
        }
        closeBtn.focus({ preventScroll: true });
    }

    function closeCase() {
        if (!modal.open) return;
        var win = frameWindow();
        try {
            Array.prototype.forEach.call(win.document.querySelectorAll('video, audio'), function(media) {
                media.pause();
            });
        } catch (e) {}
        if (typeof modal.close === 'function') modal.close();
        else modal.removeAttribute('open');
    }

    modal.addEventListener('close', function() {
        if (returnFocus) {
            try { returnFocus.focus({ preventScroll: true }); } catch (e) {}
        }
    });

    closeBtn.addEventListener('click', closeCase);

    // A click on the dimmed margin around the frame closes it.
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeCase();
    });

    // ---------------------------------------------------------------------
    // START
    // ---------------------------------------------------------------------

    apply();
    fitAll(true);

    var resizeTimer = null;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (activeTag) setFocus(activeTag);
            else fitAll(true);
        }, 120);
    });
})();
