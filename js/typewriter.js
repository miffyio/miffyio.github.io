const typewriterElement = document.querySelector('.typewriter');
const texts = ["Software Engineer", "Full-Stack Developer", "Technical Program Manager", "AWS Solutions Architect", "AWS ML Specialist"];
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
    typewriterElement.style.fontSize = texts[textIndex].length > 20 ? "1.5rem" : "2rem";
    typewriterElement.textContent = texts[textIndex].substr(0, charIndex);

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
