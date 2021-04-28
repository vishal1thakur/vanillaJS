// A) Scroll Animations
// Initialize screen variables
let controller;
let slideScene;
let pageScene;

// Animate function
function animateSlides() {
  // Init Controller
  controller = new ScrollMagic.Controller();
  // Select elements
  const sliders = document.querySelectorAll('.slide');
  const nav = document.querySelector('.nav-header');
  // Loop over each slide
  sliders.forEach((slide, index, slides) => {
    // select children
    const revealImg = slide.querySelector('.reveal-img');
    const img = slide.querySelector('img');
    const revealText = slide.querySelector('.reveal-text');
    // GSAP
    // 1. Timeline for image and text animation
    const slideTl = gsap.timeline({
      defaults: {duration: 1, ease: 'power2.inOut'},
    });
    // Reveal the image div
    slideTl.fromTo(revealImg, {x: '0%'}, {x: '100%'});
    // Scale and reveal the hero image
    slideTl.fromTo(img, {opacity: 0, scale: 2}, {opacity: 1, scale: 1}, '-=1');
    // Reveal the text
    slideTl.fromTo(revealText, {x: '0%'}, {x: '100%'}, '-=0.9');
    // Slide down the Nav
    slideTl.fromTo(nav, {y: '-100%'}, {y: '0%'}), '-=0.5';
    // Create Scene
    // Set trigger areas on the screen
    slideScene = new ScrollMagic.Scene({
      // Set the element for trigger slider context
      triggerElement: slide,
      // Length of the trigger from top the screen
      triggerHook: 0.25,
      // Undo reverse animation on scroll up
      reverse: false,
    })
      // Attach with GSAP timeline animation
      .setTween(slideTl)
      // Add markups for reference
      .addIndicators({
        colorStart: 'white',
        colorTrigger: 'white',
        name: 'slide',
      })
      // Connect to the controller initialized
      .addTo(controller);
    // 2. Timeline for section sliding on scroll
    const pageTl = gsap.timeline();
    // To stop the covering and immediately get the next slide - select the next slide and push it up
    // select the next, if its the last end
    let nextSlide = slides.length - 1 === index ? 'end' : slides[index + 1];
    // push it up
    pageTl.fromTo(nextSlide, {y: '0%'}, {y: '50%'});
    // animation for the slide
    pageTl.fromTo(slide, {opacity: 1, scale: 1}, {opacity: 0, scale: 0});
    // animation for the next slide pushing up
    pageTl.fromTo(nextSlide, {y: '50%'}, {y: '0%'}, '-=0.5');
    // Create scene
    // Trigger for the animation
    pageScene = new ScrollMagic.Scene({
      // attach the animated element
      triggerElement: slide,
      // set with of the screen
      duration: '100%',
      // set trigger location
      triggerHook: 0,
    })
      // indicators for reference
      .addIndicators({
        colorStart: 'white',
        colorTrigger: 'white',
        name: 'page',
        indent: 200,
      })
      // Attach with GSAP & undo effect on scroll up
      .setPin(slide, {pushFollowers: false})
      .setTween(pageTl)
      .addTo(controller);
  });
}

// B) Cursor Animation
// Select the div to display where the mouse moves
let mouse = document.querySelector('.cursor');
// Select the span of the explore to add action - TAP
let mouseTxt = mouse.querySelector('span');

function cursor(e) {
  // attach the circle div to the position of the mouse - e is 'mousemove'
  mouse.style.top = e.pageY + 'px';
  mouse.style.left = e.pageX + 'px';
}

function activeCursor(e) {
  // Get the target of the event
  const item = e.target;
  // Filter out only the link or burger
  if (item.id === 'logo' || item.classList.contains('burger')) {
    // Add styling
    mouse.classList.add('nav-active');
  } else {
    // Remove styling
    mouse.classList.remove('nav-active');
  }
  // Filter out the explore button
  if (item.classList.contains('explore')) {
    mouse.classList.add('explore-active');
    gsap.to('.title-swipe', 1, {y: '0%'});
    mouseTxt.innerText = 'Tap';
  } else {
    mouse.classList.remove('explore-active');
    gsap.to('.title-swipe', 1, {y: '100%'});

    mouseTxt.innerText = '';
  }
}

// For when the mouse moves anywhere
window.addEventListener('mousemove', cursor);
// For when the mouse hovers over links
window.addEventListener('mouseover', activeCursor);

// Call the functions
animateSlides();
