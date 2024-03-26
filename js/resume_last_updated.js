const resume = document.querySelector('.fa-file-arrow-down');
const resumeLatest = document.querySelector('.resume-last-updated');

resume.addEventListener('mouseenter', function () {
    if (window.innerWidth >= 1024) {
        // Only show the element if the screen width is 1024px or greater
        // console.log('mouseenter');
        resumeLatest.style.display = 'block';
    }
});

resume.addEventListener('mouseleave', function () {
    if (window.innerWidth >= 1024) {
        // Only hide the element if the screen width is 1024px or greater
        // console.log('mouseleave');
        resumeLatest.style.display = 'none';
    }
});
