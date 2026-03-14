## Hero Section Animation

Hero sections should feel **cinematic and premium**.

### Typical animation sequence

1. Background image reveal  
2. Overlay fade  
3. Heading stagger reveal  
4. Paragraph fade-up  
5. CTA button reveal  

### Example motion

- image scale: `1.05 → 1`  
- opacity fade  
- staggered text reveal  
- smooth easing  

Preferred easing:

power3.out


---

## Fade In Up

Used for:

- text blocks  
- paragraphs  
- section introductions  

### Animation pattern

opacity: 0 → 1
y: 30px → 0
duration: 0.8
ease: power3.out


### ScrollTrigger start point
start: "top 85%"


---

## Stagger Reveal

Used for grouped elements such as:

- service cards  
- feature lists  
- statistics  
- icon rows  

### Typical timing
stagger: 0.15 – 0.25
duration: 0.8 – 1
ease: power3.out


---

## Image Reveal

Images may use:

- scale reveal  
- mask reveal  
- clip-path reveal  
- subtle parallax  

Avoid aggressive zoom effects.

### Preferred motion
scale: 1.1 → 1
opacity: 0 → 1


---

## Card Hover Animations

Cards should feel **interactive and modern**.

### On hover

- card lifts slightly  
- shadow deepens  
- image subtly scales  
- overlay darkens slightly  
- optional icon movement  

Typical values:
translateY: -6px
scale: 1.02
transition: 0.3s


---

## Button Hover Animations

Buttons should feel **fast and responsive**.

### Hover interaction

- slight lift  
- smooth colour transition  
- subtle scale  
- highlight or wipe effect  

Example motion:
translateY: -2px
scale: 1.02
Duration: 0.2 – 0.3 seconds


---

## Scroll Animations

Sections should animate into view using **ScrollTrigger**.

### Guidelines

- animations trigger once  
- grouped elements stagger  
- avoid excessive motion  

Example trigger:
start: "top 85%"