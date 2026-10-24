document.addEventListener('DOMContentLoaded', () => {

    // ==============================
    // AOS Animation
    // ==============================

    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-out-quad'
        });
    }


    // ==============================
    // Theme Toggle
    // ==============================

    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    if (themeToggle) {

        const icon = themeToggle.querySelector('i');

        const savedTheme = localStorage.getItem('theme');

        if (savedTheme === 'light') {
            body.classList.add('light-theme');

            if (icon) {
                icon.className = 'fas fa-sun';
            }
        }

        themeToggle.addEventListener('click', () => {

            body.classList.toggle('light-theme');

            const isLight =
                body.classList.contains('light-theme');

            if (icon) {
                icon.className = isLight
                    ? 'fas fa-sun'
                    : 'fas fa-moon';
            }

            localStorage.setItem(
                'theme',
                isLight ? 'light' : 'dark'
            );

        });
    }


    // ==============================
    // Hamburger Menu
    // ==============================

    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.querySelector('.nav-overlay');

    if (hamburger && navbar) {

        hamburger.addEventListener('click', () => {

            navbar.classList.toggle('active');
            hamburger.classList.toggle('active');

            body.style.overflow =
                navbar.classList.contains('active')
                    ? 'hidden'
                    : '';

        });
    }


    // Close menu using overlay

    if (navOverlay) {

        navOverlay.addEventListener('click', () => {

            navbar.classList.remove('active');
            hamburger.classList.remove('active');

            body.style.overflow = '';

        });

    }


    // Close menu after clicking navigation link

    if (navLinks) {

        navLinks.querySelectorAll('a').forEach(link => {

            link.addEventListener('click', () => {

                navbar.classList.remove('active');
                hamburger.classList.remove('active');

                body.style.overflow = '';

            });

        });

    }


    // ==============================
    // Navbar Scroll Effect
    // ==============================

    window.addEventListener('scroll', () => {

        if (!navbar) return;

        if (window.scrollY > 50) {

            navbar.classList.add('scrolled');

            navbar.style.background =
                'rgba(var(--bg-main), 0.95)';

        } else {

            navbar.classList.remove('scrolled');

            navbar.style.background =
                'rgba(var(--bg-main), 0.8)';

        }

    });


    // ==============================
    // Typing Effect
    // ==============================

    const typedTextSpan =
        document.querySelector('.typed-text');

    const cursorSpan =
        document.querySelector('.cursor');


    // Sirf Data Analyst

    const textArray = ['Data Analyst'];

    const typingDelay = 150;

    let charIndex = 0;


    function type() {

        if (!typedTextSpan) return;

        if (charIndex < textArray[0].length) {

            if (
                cursorSpan &&
                !cursorSpan.classList.contains('typing')
            ) {
                cursorSpan.classList.add('typing');
            }

            typedTextSpan.textContent +=
                textArray[0].charAt(charIndex);

            charIndex++;

            setTimeout(type, typingDelay);

        } else {

            if (cursorSpan) {
                cursorSpan.classList.remove('typing');
            }

        }

    }


    if (typedTextSpan) {
        setTimeout(type, 500);
    }


    // ==============================
    // Smooth Scrolling
    // ==============================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener('click', function (e) {

            const targetId =
                this.getAttribute('href');

            if (!targetId || targetId === '#') {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (target) {

                e.preventDefault();

                const headerOffset = 80;

                const elementPosition =
                    target.getBoundingClientRect().top;

                const offsetPosition =
                    elementPosition +
                    window.pageYOffset -
                    headerOffset;

                window.scrollTo({

                    top: offsetPosition,

                    behavior: 'smooth'

                });

            }

        });

    });


    // ==============================
    // Contact Form
    // ==============================

    const contactForm =
        document.getElementById('contact-form');

    const formStatus =
        document.getElementById('form-status');

    const submitBtn =
        document.getElementById('submit-btn');


    if (contactForm) {

        contactForm.addEventListener('submit', (e) => {

            e.preventDefault();


            const name =
                document.getElementById('user_name')?.value.trim();

            const email =
                document.getElementById('user_email')?.value.trim();

            const message =
                document.getElementById('message')?.value.trim();


            // Empty field validation

            if (!name || !email || !message) {

                showStatus(
                    'Please fill in all fields.',
                    'error'
                );

                return;

            }


            // Email validation

            if (!isValidEmail(email)) {

                showStatus(
                    'Please enter a valid email address.',
                    'error'
                );

                return;

            }


            // Button loading

            if (submitBtn) {

                submitBtn.disabled = true;

                submitBtn.classList.add('loading');

                const btnText =
                    submitBtn.querySelector('.btn-text');

                const btnIcon =
                    submitBtn.querySelector('.fas');


                if (btnText) {
                    btnText.textContent = 'Sending...';
                }

                if (btnIcon) {
                    btnIcon.className =
                        'fas fa-spinner fa-spin';
                }

            }


            /*
                IMPORTANT:

                Abhi EmailJS connect nahi hai.

                EmailJS connect karne ke baad
                yahan actual email send code add hoga.
            */


            setTimeout(() => {

                showStatus(
                    'Your message has been received!',
                    'success'
                );

                contactForm.reset();

                resetSubmitButton();

            }, 1000);

        });

    }


    // ==============================
    // Contact Status
    // ==============================

    function showStatus(message, type) {

        if (!formStatus) return;

        formStatus.textContent = message;

        formStatus.className =
            `form-status ${type}`;

    }


    // ==============================
    // Reset Contact Button
    // ==============================

    function resetSubmitButton() {

        if (!submitBtn) return;

        submitBtn.disabled = false;

        submitBtn.classList.remove('loading');


        const btnText =
            submitBtn.querySelector('.btn-text');

        const btnIcon =
            submitBtn.querySelector('.fas');


        if (btnText) {
            btnText.textContent = 'Send Message';
        }


        if (btnIcon) {
            btnIcon.className =
                'fas fa-paper-plane';
        }

    }


    // ==============================
    // Email Validation
    // ==============================

    function isValidEmail(email) {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailPattern.test(email);

    }


    // ==============================
    // KPI Animation
    // ==============================

    const kpiValues =
        document.querySelectorAll('.kpi-value');


    if (kpiValues.length) {

        const observerOptions = {
            threshold: 0.5
        };


        const kpiObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            const target =
                                entry.target;

                            const text =
                                target.textContent.trim();


                            // Numbers ke liye animation

                            if (!isNaN(text)) {

                                const value =
                                    parseInt(text);

                                animateValue(
                                    target,
                                    0,
                                    value,
                                    1500
                                );

                            }


                            kpiObserver.unobserve(target);

                        }

                    });

                },
                observerOptions
            );


        kpiValues.forEach(kpi => {

            kpiObserver.observe(kpi);

        });

    }


    // ==============================
    // Number Animation
    // ==============================

    function animateValue(
        element,
        start,
        end,
        duration
    ) {

        let startTimestamp = null;


        const step = (timestamp) => {

            if (!startTimestamp) {
                startTimestamp = timestamp;
            }


            const progress =
                Math.min(
                    (timestamp - startTimestamp) /
                    duration,
                    1
                );


            const current =
                Math.floor(
                    progress *
                    (end - start) +
                    start
                );


            element.textContent = current;


            if (progress < 1) {

                window.requestAnimationFrame(step);

            }

        };


        window.requestAnimationFrame(step);

    }

});