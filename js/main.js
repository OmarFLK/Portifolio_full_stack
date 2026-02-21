// literalmente odeio js KKKKKKKKKKKKKK
//nao sei como ta funcionando direito, mas nao mexe KKKKKK
setTimeout(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.15 },
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}, 5000);

// botao de aborgui xdd
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

hamburger.addEventListener("click", () => {
  menu.classList.toggle("active");
  hamburger.classList.toggle("active");
});
// header de vidro tlg ne pai, os sites de design sempre salvando everyone KKKK
const glassHeader = document.querySelector(".glass-header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    glassHeader.classList.add("scrolled");
  } else {
    glassHeader.classList.remove("scrolled");
  }
});
// aqui é o gerador das bolinhas de agua, mes AEStétiqui xd
document.querySelectorAll(".bubbles").forEach(side => {
  for (let i = 0; i < 12; i++) {
    const bubble = document.createElement("span");
    const size = Math.random() * 12 + 6;

    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * 80}px`;
    bubble.style.animationDuration = `${Math.random() * 8 + 6}s`;
    bubble.style.animationDelay = `${Math.random() * 10}s`;

    side.appendChild(bubble);
  }
});
// scroll de agua la
window.addEventListener("scroll", () => {
  const distortion = document.querySelector(".water-distortion");
  const intensity = Math.min(window.scrollY / 300, 2);

  distortion.style.backdropFilter = `blur(${1.2 + intensity}px)`;
});
