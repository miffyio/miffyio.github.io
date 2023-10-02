const lightbulb = document.querySelector('.lightbulb');

const tooltip = document.createElement('div');
tooltip.classList.add('lumos-tooltip');

lightbulb.addEventListener('mouseenter', function () {
    // console.log('mouseenter');
    tooltip.innerHTML = window.innerWidth < 500 ? "Check me out on desktop!" : '<span class="lumos">Lumos!</span><span class="lumos-sub">(light mode coming soon)</span>';
    document.body.appendChild(tooltip);
    tooltip.style.display = 'block';
});

lightbulb.addEventListener('mouseleave', function () {
    // console.log('mouseleave');
    tooltip.style.display = 'none';
});

lightbulb.addEventListener('mousemove', function (event) {
    // console.log('mousemove');
    tooltip.style.left = event.clientX - tooltip.offsetWidth - 10 + 'px'; // 10px offset from the cursor
    tooltip.style.top = event.clientY + 'px';
});

const resume = document.querySelector('.fa-file-arrow-down');
const resumeLatest = document.querySelector('.last-resume');

resume.addEventListener('mouseenter', function () {
    // console.log('mouseenter');
    resumeLatest.style.display = 'block';
});

resume.addEventListener('mouseleave', function () {
    // console.log('mouseleave');
    resumeLatest.style.display = 'none';
});
