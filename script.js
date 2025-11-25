// Smooth scrolling & Active Link Highlight
const sections = document.querySelectorAll("section, header");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
  
  reveal(); // Trigger reveal animation
  scrollFunction(); // Back to top button logic
});

// Mobile Menu
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("show");
  // Toggle icon between bars and times (X)
  const icon = hamburger.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-times");
});

// Scroll Reveal Animation
function reveal() {
  const reveals = document.querySelectorAll(".reveal");
  reveals.forEach(reveal => {
    const windowHeight = window.innerHeight;
    const elementTop = reveal.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveal.classList.add("active");
    }
  });
}

// Contact Form Handling
const contactForm = document.getElementById("contactForm");
if(contactForm){
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const service = document.getElementById('service').value;
      alert(`Thank you, ${name}! Your message regarding "${service}" has been sent. I will get back to you shortly.`);
      contactForm.reset();
    });
}

// Back to Top Button Logic
const backToTopBtn = document.getElementById("backToTop");

function scrollFunction() {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
}

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({top: 0, behavior: 'smooth'});
});

// ==========================================
// Particle Background (With Connections)
// ==========================================
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");
let width, height;
let particlesArray;

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", () => { resize(); initParticles(); });
resize();

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 2; 
    this.speedX = (Math.random() - 0.5) * 0.5; // Slow elegant speed
    this.speedY = (Math.random() - 0.5) * 0.5;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    
    // Wrap around screen
    if (this.x > width) this.x = 0;
    else if (this.x < 0) this.x = width;
    if (this.y > height) this.y = 0;
    else if (this.y < 0) this.y = height;
  }
  draw() {
    ctx.fillStyle = "rgba(56,189,248,0.6)"; // Cyan color
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  const numberOfParticles = (width * height) / 9000; 
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function connectParticles() {
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      const dx = particlesArray[a].x - particlesArray[b].x;
      const dy = particlesArray[a].y - particlesArray[b].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 110) { 
        ctx.strokeStyle = `rgba(56,189,248,${0.4 - distance / 110})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, width, height);
  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });
  connectParticles(); 
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();