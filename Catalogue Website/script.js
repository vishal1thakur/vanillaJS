// A) Scroll Animations
// Initialize screen variables
let controller;
let slideScene;
let pageScene;
let detailScene;

// Animate function
function animateSlides() {
  //Init Controller
  controller = new ScrollMagic.Controller();
  //Select elements
  const sliders = document.querySelectorAll('.slide');
  const nav = document.querySelector('.nav-header');
  //Loop over each slide
  sliders.forEach((slide, index, slides) => {
    // Select children
    const revealImg = slide.querySelector('.reveal-img');
    const img = slide.querySelector('img');
    const revealText = slide.querySelector('.reveal-text');
    //GSAP
    // 1. Timeline for image and text animation
    const slideTl = gsap.timeline({
      defaults: {duration: 1, ease: 'power2.inOut'},
    });
    // Reveal the image div
    slideTl.fromTo(revealImg, {x: '0%'}, {x: '100%'});
    // Scale and reveal the hero image
    slideTl.fromTo(img, {scale: 2}, {scale: 1}, '-=1');
    // Reveal the text
    slideTl.fromTo(revealText, {x: '0%'}, {x: '100%'}, '-=0.75');
    //Create Scene
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
      // .addIndicators({
      //   colorStart: "white",
      //   colorTrigger: "white",
      //   name: "slide"
      // })
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
    pageTl.fromTo(slide, {opacity: 1, scale: 1}, {opacity: 0, scale: 0.5});
    // animation for the next slide pushing up
    pageTl.fromTo(nextSlide, {y: '50%'}, {y: '0%'}, '-=0.5');
    //Create new scene
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
      // .addIndicators({
      //   colorStart: "white",
      //   colorTrigger: "white",
      //   name: "page",
      //   indent: 200
      // })
      // Attach with GSAP & undo effect on scroll up
      .setPin(slide, {pushFollowers: false})
      .setTween(pageTl)
      .addTo(controller);
  });
}

// B) Cursor Animation
// Select the div to display where the mouse moves
const mouse = document.querySelector('.cursor');
// Select the span of the explore to add action - TAP
const mouseTxt = mouse.querySelector('span');
// Select the burger for toggling line on hover
const burger = document.querySelector('.burger');

function cursor(e) {
  // attach the circle div to the position of the mouse - e is 'mousemove'
  mouse.style.top = e.pageY + 'px';
  mouse.style.left = e.pageX + 'px';
}

function activeCursor(e) {
  const item = e.target;
  if (item.id === 'logo' || item.classList.contains('burger')) {
    mouse.classList.add('nav-active');
  } else {
    mouse.classList.remove('nav-active');
  }
  if (item.classList.contains('explore')) {
    mouse.classList.add('explore-active');
    gsap.to('.title-swipe', 1, {y: '0%'});
    mouseTxt.innerText = 'Tap';
  } else {
    mouse.classList.remove('explore-active');
    mouseTxt.innerText = '';
    gsap.to('.title-swipe', 1, {y: '100%'});
  }
}

// Burger toggle
function navToggle(e) {
  if (!e.target.classList.contains('active')) {
    e.target.classList.add('active');
    // Animate lines
    gsap.to('.line1', 0.5, {rotate: '45', y: 5, background: 'black'});
    gsap.to('.line2', 0.5, {rotate: '-45', y: -5, background: 'black'});
    gsap.to('#logo', 1, {color: 'black'});
    gsap.to('.navbar', 1, {clipPath: 'circle(2500px at 100% -10%)'});
    document.body.classList.add('hide');
  } else {
    e.target.classList.remove('active');
    // Animate lines
    gsap.to('.line1', 0.5, {rotate: '0', y: 0, background: 'white'});
    gsap.to('.line2', 0.5, {rotate: '0', y: 0, background: 'white'});
    gsap.to('#logo', 1, {color: 'white'});
    gsap.to('.navbar', 1, {clipPath: 'circle(50px at 100% -10%)'});
    document.body.classList.remove('hide');
  }
}

//Barba Page Transitions
const logo = document.querySelector('#logo');
barba.init({
  views: [
    {
      namespace: 'home',
      beforeEnter() {
        // Call the functions
        animateSlides();
        logo.href = './index.html';
      },
      beforeLeave() {
        // Dont carry the animation on the next page
        slideScene.destroy();
        pageScene.destroy();
        controller.destroy();
      },
    },
    {
      namespace: 'fashion',
      beforeEnter() {
        logo.href = '../index.html';
        detailAnimation();
      },
      beforeLeave() {
        controller.destroy();
        detailScene.destroy();
      },
    },
  ],
  transitions: [
    {
      leave({current, next}) {
        let done = this.async();
        //An Animation
        const tl = gsap.timeline({defaults: {ease: 'power2.inOut'}});
        tl.fromTo(current.container, 1, {opacity: 1}, {opacity: 0});
        tl.fromTo(
          '.swipe',
          0.75,
          {x: '-100%'},
          {x: '0%', onComplete: done},
          '-=0.5'
        );
      },
      enter({current, next}) {
        let done = this.async();
        //Scroll to the top
        window.scrollTo(0, 0);
        //An Animation
        const tl = gsap.timeline({defaults: {ease: 'power2.inOut'}});
        tl.fromTo(
          '.swipe',
          1,
          {x: '0%'},

          {x: '100%', stagger: 0.2, onComplete: done}
        );
        tl.fromTo(next.container, 1, {opacity: 0}, {opacity: 1});
        tl.fromTo(
          '.nav-header',
          1,
          {y: '-100%'},
          {y: '0%', ease: 'power2.inOut'},
          '-=1.5'
        );
      },
    },
  ],
});

function detailAnimation() {
  controller = new ScrollMagic.Controller();
  const slides = document.querySelectorAll('.detail-slide');
  slides.forEach((slide, index, slides) => {
    const slideTl = gsap.timeline({defaults: {duration: 1}});
    let nextSlide = slides.length - 1 === index ? 'end' : slides[index + 1];
    const nextImg = nextSlide.querySelector('img');
    slideTl.fromTo(slide, {opacity: 1}, {opacity: 0});
    slideTl.fromTo(nextSlide, {opacity: 0}, {opacity: 1}, '-=1');
    slideTl.fromTo(nextImg, {x: '50%'}, {x: '0%'});
    //Scene
    detailScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: '100%',
      triggerHook: 0,
    })
      .setPin(slide, {pushFollowers: false})
      .setTween(slideTl)
      // .addIndicators({
      //   colorStart: "white",
      //   colorTrigger: "white",
      //   name: "detailScene"
      // })
      .addTo(controller);
  });
}
//EventListeners
burger.addEventListener('click', navToggle);
window.addEventListener('mousemove', cursor);
window.addEventListener('mouseover', activeCursor);
