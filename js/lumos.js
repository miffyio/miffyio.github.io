const lightbulb = document.querySelector('.lightbulb');

const tooltip = document.createElement('div');
tooltip.classList.add('lumos-tooltip');
tooltip.textContent = "Lumos!";
document.body.appendChild(tooltip);

lightbulb.addEventListener('mouseenter', function () {
    console.log('mouseenter');
    tooltip.style.display = 'block';
});

lightbulb.addEventListener('mouseleave', function () {
    console.log('mouseleave');
    tooltip.style.display = 'none';
});

lightbulb.addEventListener('mousemove', function (event) {
    console.log('mousemove');
    tooltip.style.left = event.clientX - tooltip.offsetWidth - 10 + 'px'; // 10px offset from the cursor
    tooltip.style.top = event.clientY + 'px';
});

const resume = document.querySelector('.fa-file-arrow-down');
const resumeLatest = document.querySelector('.last-resume');

resume.addEventListener('mouseenter', function () {
    console.log('mouseenter');
    resumeLatest.style.display = 'block';
});

resume.addEventListener('mouseleave', function () {
    console.log('mouseleave');
    resumeLatest.style.display = 'none';
});
