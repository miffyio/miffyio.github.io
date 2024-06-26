const typewriterElement = document.querySelector('.typewriter');
const texts = ["Software Engineer", "Full-Stack Developer", "Technical Program Manager", "AWS Solutions Architect", "AWS Machine Learning Specialist"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function getSpeed(character, isDeleting) {
    let baseSpeed = isDeleting ? 100 : 100;
    if ("aeiouAEIOU".includes(character)) {
        baseSpeed += 80;
    }
    let randomSpeedVariance = Math.floor(Math.random() * 40) - 50;
    return baseSpeed + randomSpeedVariance;
}

function type() {
    typewriterElement.textContent = texts[textIndex].substr(0, charIndex);

    // Set the font size based on the length of the text
    // Set the font size based on screen size
    let charLen = texts[textIndex].length;
    if (charLen <= 20) {
        typewriterElement.style.fontSize = "2rem";
    } else if (charLen <= 25) {
        typewriterElement.style.fontSize = window.innerWidth < 500 ? "1.4rem" : "1.5rem";
    } else if (charLen <= 32) {
        typewriterElement.style.fontSize = window.innerWidth < 500 ? "1.2rem" : "1.3rem";
    } else {
        typewriterElement.style.fontSize = window.innerWidth < 500 ? "1.1rem" : "1.2rem";
    }

    // Get the typing speed based on the character
    let typingSpeed = getSpeed(texts[textIndex][charIndex] || '', isDeleting);

    if (!isDeleting && charIndex === texts[textIndex].length) {
        // Pause for 3 seconds before deleting
        setTimeout(() => {
            isDeleting = true;
            type();
        }, 3000);
        return;
    }

    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        // Move to the next word and pause for 1 second before typing again
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(() => type(), 1000);
        return;
    }

    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    setTimeout(() => type(), typingSpeed);
}

setTimeout(() => type());
// setTimeout(() => type(), 500);
