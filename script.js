const menuToggle = document.querySelector("#menuToggle");
const nav = document.querySelector("#nav");
const menuWord = document.querySelector(".menu-word");

function closeMenu() {
    nav.classList.remove("open");
    document.body.classList.remove("menu-open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");

    if (menuWord) {
        menuWord.textContent = "MENU";
    }
}

menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");

    document.body.classList.toggle("menu-open", isOpen);

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
    );

    if (menuWord) {
        menuWord.textContent = isOpen ? "CLOSE" : "MENU";
    }
});

nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});


const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        });
    },
    {
        threshold: 0.1
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});


const projectCursor = document.querySelector("#projectCursor");
const projectMedia = document.querySelectorAll(".project-media");

if (
    window.matchMedia("(pointer: fine)").matches &&
    projectCursor
) {
    document.addEventListener("mousemove", (event) => {
        projectCursor.style.left = `${event.clientX}px`;
        projectCursor.style.top = `${event.clientY}px`;
    });

    projectMedia.forEach((project) => {
        project.addEventListener("mouseenter", () => {
            projectCursor.classList.add("visible");
        });

        project.addEventListener("mouseleave", () => {
            projectCursor.classList.remove("visible");
        });
    });
}


const parallaxImages = document.querySelectorAll(
    ".image-parallax img"
);

let parallaxTicking = false;

function updateParallax() {
    parallaxImages.forEach((image) => {
        const container = image.parentElement;
        const rect = container.getBoundingClientRect();

        if (
            rect.bottom < 0 ||
            rect.top > window.innerHeight
        ) {
            return;
        }

        const viewportCenter = window.innerHeight / 2;
        const elementCenter = rect.top + rect.height / 2;
        const distance = elementCenter - viewportCenter;

        const movement = distance * -0.025;

        image.style.transform =
            `translateY(${movement}px) scale(1.018)`;
    });

    parallaxTicking = false;
}

function requestParallaxUpdate() {
    if (parallaxTicking) return;

    window.requestAnimationFrame(updateParallax);
    parallaxTicking = true;
}

window.addEventListener(
    "scroll",
    requestParallaxUpdate,
    { passive: true }
);

window.addEventListener(
    "resize",
    requestParallaxUpdate
);

requestParallaxUpdate();