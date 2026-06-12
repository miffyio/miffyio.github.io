// Meta Gradient background: a pure-CSS, 18-layer radial-gradient
// background (6 color blobs x 3 alpha stops). Each blob keeps a fixed
// shape (sized off the window diagonal) so the blooms stay distinct at
// any window size.
(function () {
    const BLOB_COLORS = [
        [160, 51, 255], // purple
        [24, 119, 242], // blue
        [255, 108, 92], // coral
        [245, 206, 51], // yellow
        [37, 211, 102], // green
        [24, 119, 242], // blue
    ];
    const STOPS = ["50%", "75%", "100%"];
    // dark (Nox) gets no gradient at all - flat original black
    const ALPHAS = {
        dim: [0.10, 0.16, 0.22],
        light: [0.04, 0.066, 0.1],
    };

    // Per-blob constants:
    //   d  = size factor on the window DIAGONAL (width = d * diagonal)
    //   a  = intrinsic aspect (width/height), fixed so blobs never distort
    //   cx = center x as fraction of window width
    //   cy = center y as fraction of window height
    const BLOBS = [
        { d: 1.4123, a: 1.5798, cx: 1.1883, cy: 0.2729 }, // purple - off right edge
        { d: 2.0480, a: 1.5598, cx: 0.1373, cy: 2.0402 }, // blue   - bottom-left
        { d: 1.5524, a: 1.5589, cx: 1.0157, cy: -0.2314 }, // coral  - top-right
        { d: 1.1762, a: 1.5589, cx: 0.7750, cy: -1.1931 }, // yellow - far above top
        { d: 1.7874, a: 1.5603, cx: 0.5113, cy: -0.3176 }, // green  - top-center
        { d: 2.7083, a: 1.5625, cx: 0.5113, cy: 1.0166 }, // blue   - bottom-center
    ];

    function layoutFor(width, height) {
        const diag = Math.hypot(width, height);
        return BLOBS.map(function (b) {
            const sw = b.d * diag;
            const sh = sw / b.a;
            const px = b.cx * width - sw / 2;
            const py = b.cy * height - sh / 2;
            return {
                size: sw.toFixed(2) + "px " + sh.toFixed(2) + "px",
                position: px.toFixed(2) + "px " + py.toFixed(2) + "px",
            };
        });
    }

    function buildGradient(blobs, alphas) {
        const images = [], sizes = [], positions = [];
        blobs.forEach(function (blob, b) {
            const c = BLOB_COLORS[b % BLOB_COLORS.length];
            alphas.forEach(function (a, k) {
                const stop = STOPS[k] === "100%" ? "" : " " + STOPS[k];
                images.push("radial-gradient(50% 50%, rgba(" + c[0] + ", " + c[1] + ", " + c[2] + ", " + a + "), rgba(" + c[0] + ", " + c[1] + ", " + c[2] + ", 0)" + stop + ")");
                sizes.push(blob.size);
                positions.push(blob.position);
            });
        });
        return {
            backgroundImage: images.join(", "),
            backgroundSize: sizes.join(", "),
            backgroundPosition: positions.join(", "),
            backgroundRepeat: Array(images.length).fill("no-repeat").join(", "),
        };
    }

    function currentTheme() {
        const classes = document.documentElement.classList;
        if (classes.contains("theme-light")) return "light";
        if (classes.contains("theme-dim")) return "dim";
        return "dark";
    }

    // Sets only the background-image layers; the base color stays owned
    // by --bg-base in CSS so themes can transition it.
    function applyGradient() {
        const theme = currentTheme();
        if (theme === "dark") {
            document.body.style.backgroundImage = "none";
            return;
        }
        const g = buildGradient(layoutFor(window.innerWidth, window.innerHeight), ALPHAS[theme]);
        document.body.style.backgroundImage = g.backgroundImage;
        document.body.style.backgroundSize = g.backgroundSize;
        document.body.style.backgroundPosition = g.backgroundPosition;
        document.body.style.backgroundRepeat = g.backgroundRepeat;
    }

    function setTheme(theme) {
        const root = document.documentElement;
        root.classList.remove("theme-light", "theme-dim", "theme-dark");
        root.classList.add("theme-" + theme);
        try {
            localStorage.setItem("theme", theme);
        } catch (e) {
            // localStorage can throw in private browsing; theme still applies
        }
        applyGradient();
        refreshTooltip();
    }

    window.setTheme = setTheme;

    // Torch toggle, cycling dark -> dim -> light -> dark. The tooltip
    // names the spell that summons the NEXT mode: Lumos kindles the dim
    // glow, Lumos Maxima casts the blindingly bright ball of light, and
    // Nox puts everything out.
    const lightbulb = document.querySelector(".torch");

    const NEXT_THEME = { dark: "dim", dim: "light", light: "dark" };

    const SPELLS = {
        dark: '<span class="lumos">Lumos!</span><span class="lumos-sub">(click for dim mode)</span>',
        dim: '<span class="lumos">Lumos Maxima!</span><span class="lumos-sub">(click for light mode)</span>',
        light: '<span class="lumos">Nox!</span><span class="lumos-sub">(click for dark mode)</span>',
    };

    const tooltip = document.createElement("div");
    tooltip.classList.add("lumos-tooltip");

    function tooltipHTML() {
        return SPELLS[currentTheme()];
    }

    function refreshTooltip() {
        tooltip.innerHTML = tooltipHTML();
    }

    function toggleTheme() {
        setTheme(NEXT_THEME[currentTheme()]);
    }

    lightbulb.addEventListener("click", toggleTheme);
    lightbulb.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleTheme();
        }
    });

    // Hover tooltip only where hover is real; on touch, mouseleave is
    // unreliable and the tooltip would get stuck.
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        lightbulb.addEventListener("mouseenter", function () {
            refreshTooltip();
            document.body.appendChild(tooltip);
            tooltip.style.display = "block";
        });

        lightbulb.addEventListener("mouseleave", function () {
            tooltip.style.display = "none";
        });

        lightbulb.addEventListener("mousemove", function (event) {
            tooltip.style.left = event.clientX - tooltip.offsetWidth - 10 + "px"; // 10px offset from the cursor
            tooltip.style.top = event.clientY + "px";
        });
    }

    window.addEventListener("resize", applyGradient);
    applyGradient();
})();
