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
    const ALPHAS = {
        dark: [0.10, 0.16, 0.22],
        light: [0.024, 0.04, 0.063],
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
        return document.documentElement.classList.contains("theme-light") ? "light" : "dark";
    }

    // Sets only the background-image layers; the base color stays owned
    // by --bg-base in CSS so themes can transition it.
    function applyGradient() {
        const g = buildGradient(layoutFor(window.innerWidth, window.innerHeight), ALPHAS[currentTheme()]);
        document.body.style.backgroundImage = g.backgroundImage;
        document.body.style.backgroundSize = g.backgroundSize;
        document.body.style.backgroundPosition = g.backgroundPosition;
        document.body.style.backgroundRepeat = g.backgroundRepeat;
    }

    window.addEventListener("resize", applyGradient);
    applyGradient();
})();
