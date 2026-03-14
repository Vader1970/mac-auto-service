import gsap from 'gsap';

export const fadeInUp = (element, delay = 0) => {
  gsap.fromTo(element, 
    { opacity: 0, y: 50 }, 
    { opacity: 1, y: 0, duration: 0.8, delay, ease: 'power3.out' }
  );
};

export const staggerReveal = (elements, delay = 0) => {
  gsap.fromTo(elements,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay, ease: 'power2.out' }
  );
};

export const cardHoverAnimation = (element) => {
  gsap.to(element, { y: -10, boxShadow: '0 10px 20px rgba(0,0,0,0.1)', duration: 0.3 });
};

export const cardHoverExitAnimation = (element) => {
  gsap.to(element, { y: 0, boxShadow: '0 2px 5px rgba(0,0,0,0.05)', duration: 0.3 });
};

export const buttonHoverAnimation = (element) => {
  gsap.to(element, { scale: 1.05, duration: 0.2, ease: 'power1.inOut' });
};

export const buttonHoverExitAnimation = (element) => {
  gsap.to(element, { scale: 1, duration: 0.2, ease: 'power1.inOut' });
};
