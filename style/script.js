// ================== ELEMENTOS ==================
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const welcomeScreen = document.getElementById('welcome-screen');
const startButton = document.getElementById('start-button');
const music = document.getElementById('bg-music');

const storyContainer = document.getElementById('story-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// Pregunta elementos
const questionBtnContainer = document.getElementById('question-btn-container');
const questionModal = document.getElementById('question-modal');
const questionContainer = document.getElementById('question-container');
const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const questionResult = document.getElementById('question-result');
const chooseAnotherBtn = document.getElementById('choose-another');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const stars = [];
const meteors = [];

// ================== STORY DATA ==================
const storyData = [
  { label: "ACTO 1", slides: [
      { img: "img/acto11.jpg", time: "08:00 AM", description: "Me desperté y vi que solo leíste mi mensaje, así que supe que todo estaba bien." },
      { img: "img/acto12.jpg", time: "08:30 AM", description: "Desayuné, me lavé los dientes y ordené mi cuarto para empezar bien el día." },
      { img: "img/acto13.jpg", time: "09:00 AM", description: "Todo en calma mientras pensaba en ti y en cómo quería sorprenderte." }
    ]},
  { label: "ACTO 2", slides: [
      { img: "img/acto21.jpg", time: "12:48 PM", description: "Almorcé y luego me lavé los dientes, cuidando cada detalle de mi día." },
      { img: "img/acto22.jpg", time: "01:15 PM", description: "Revisé cosas en mi laptop y empecé a planear la sorpresa para tu sustentación." },
      { img: "img/acto23.jpg", time: "02:00 PM", description: "Estaba nervioso, pensando en cómo hacer que este día sea especial para ti." }
    ]},
  { label: "ACTO 3", slides: [
      { img: "img/acto31.jpg", time: "07:00 PM", description: "Revisé tu foto y pensé en cómo hacer que esta noche sea inolvidable." },
      { img: "img/acto32.jpg", time: "07:30 PM", description: "Salí al balcón, miré las estrellas y dejé que mi imaginación volara hacia ti." },
      { img: "img/acto33.jpg", time: "08:00 PM", description: "Decidí crear esta sorpresa para ti, con calma, estrellas y todo mi cariño." }
    ]}
];

let currentAct = 0;
let currentSlide = 0;

// ================== PANTALLA DE BIENVENIDA ==================
startButton.addEventListener('click', () => {
  music.play().catch(e => console.log('Music blocked:', e));
  welcomeScreen.classList.add('hidden');
  setTimeout(() => {
    welcomeScreen.style.display = 'none';
    storyContainer.classList.add('visible');
    storyContainer.style.pointerEvents = 'auto';
    showAct(currentAct, currentSlide);
    for (let i = 0; i < 10; i++) createMeteor();
  }, 1000);
});

// ================== SHOW ACT ==================
function showAct(actIndex, slideIndex) {
  const act = storyData[actIndex];
  const actLabel = storyContainer.querySelector(".act-label");
  const slideImg = storyContainer.querySelector(".story-slide img");
  const timeDiv = storyContainer.querySelector(".story-slide .time");
  const descDiv = storyContainer.querySelector(".story-slide .description");

  actLabel.textContent = slideIndex === 0 ? act.label : "";
  const slide = act.slides[slideIndex];
  slideImg.src = slide.img;
  timeDiv.textContent = slide.time;
  descDiv.textContent = slide.description;

  prevBtn.style.display = (actIndex === 0 && slideIndex === 0) ? "none" : "inline-block";
  nextBtn.style.display = (actIndex === storyData.length -1 && slideIndex === act.slides.length -1) ? "none" : "inline-block";

  // Mostrar botón de pregunta solo en la última slide del Acto 3
  if(actIndex === storyData.length-1 && slideIndex === act.slides.length-1){
    questionBtnContainer.classList.add('visible');

    const showQuestionBtn = questionBtnContainer.querySelector('button');
    showQuestionBtn.onclick = () => {
      questionModal.classList.add('visible');
      questionContainer.classList.add('visible');
      questionText.textContent = "¿Qué me faltó hacer en el día?";
      answerButtons.innerHTML = "";
      questionResult.innerHTML = "";
      chooseAnotherBtn.classList.add('hidden');

      const answers = [
        { text: "Mandarte un mensaje", img: "img/mensaje.jpg", desc: "Esta mini historia es para ti ❤️" },
        { text: "Bañarme", img: "img/banarme.jpg", desc: "Jaja, si me baño no pienses que no 😜" },
        { text: "Dame una pista más de la sorpresa mejor", img: "img/sorpresa.jpg", desc: "La pista está en tu corazón 💌" }
      ];

      answers.forEach(ans => {
        const btn = document.createElement("button");
        btn.textContent = ans.text;
        btn.onclick = () => {
          // Mostrar solo la respuesta seleccionada
          questionResult.innerHTML = `<img src="${ans.img}" style="width:200px;"><p>${ans.desc}</p>`;
          answerButtons.innerHTML = "";
          chooseAnotherBtn.classList.remove('hidden');
        };
        answerButtons.appendChild(btn);
      });
    };

  } else {
    questionBtnContainer.classList.remove('visible');
    questionModal.classList.remove('visible');
    questionContainer.classList.remove('visible');
  }
}

// ================== BOTONES ==================
prevBtn.addEventListener("click", () => {
  if (currentSlide > 0) {
    currentSlide--;
  } else if (currentAct > 0) {
    currentAct--;
    currentSlide = storyData[currentAct].slides.length - 1;
  }
  showAct(currentAct, currentSlide);
});

nextBtn.addEventListener("click", () => {
  if (currentSlide < storyData[currentAct].slides.length - 1) {
    currentSlide++;
  } else if (currentAct < storyData.length - 1) {
    currentAct++;
    currentSlide = 0;
  }
  showAct(currentAct, currentSlide);
});

// ================== BACKGROUND STARS ==================
function createBackgroundStars(count = 250) {
  stars.length = 0;
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.6,
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.008 + 0.004,
      brightness: Math.random() * 0.4 + 0.2
    });
  }
}

// ================== METEORS ==================
function createMeteor() {
  meteors.push({
    x: Math.random() * width,
    y: -60,
    length: Math.random() * 80 + 50,
    speed: Math.random() * 6 + 5,
    angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
    alpha: 1
  });
}

// ================== ANIMATION ==================
function animate() {
  ctx.clearRect(0, 0, width, height);

  for (const star of stars) {
    star.twinkle += star.twinkleSpeed;
    const opacity = star.brightness * (0.5 + 0.5 * Math.sin(star.twinkle));
    ctx.globalAlpha = opacity;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  for (let i = meteors.length - 1; i >= 0; i--) {
    const m = meteors[i];
    const dx = Math.cos(m.angle) * m.length;
    const dy = Math.sin(m.angle) * m.length;
    ctx.globalAlpha = m.alpha;
    ctx.strokeStyle = 'rgba(255,255,255,0.9)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(m.x, m.y);
    ctx.lineTo(m.x - dx, m.y - dy);
    ctx.stroke();
    m.x += Math.cos(m.angle) * m.speed;
    m.y += Math.sin(m.angle) * m.speed;
    m.alpha -= 0.006;
    if (m.alpha <= 0) meteors.splice(i, 1);
  }

  requestAnimationFrame(animate);
}

// ================== EVENTOS ==================
window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  createBackgroundStars();
});

setInterval(() => {
  if (Math.random() < 0.7) createMeteor();
}, 2000 + Math.random() * 1000);

createBackgroundStars();
animate();

// ================== ELEGIR OTRA RESPUESTA ==================
chooseAnotherBtn.addEventListener('click', () => {
  questionResult.innerHTML = "";
  chooseAnotherBtn.classList.add('hidden');
  questionText.textContent = "¿Qué me faltó hacer en el día?";
  // Re-generar los botones de respuestas
  const answers = [
    { text: "Mandarte un mensaje", img: "img/mensaje.jpg", desc: "Esta mini historia es para ti ❤️" },
    { text: "Bañarme", img: "img/banarme.jpg", desc: "Jaja, si me baño no pienses que no 😜" },
    { text: "Dame una pista más de la sorpresa mejor", img: "img/sorpresa.jpg", desc: "La pista está en tu corazón 💌" }
  ];

  answerButtons.innerHTML = "";
  answers.forEach(ans => {
    const btn = document.createElement("button");
    btn.textContent = ans.text;
    btn.onclick = () => {
      questionResult.innerHTML = `<img src="${ans.img}" style="width:200px;"><p>${ans.desc}</p>`;
      answerButtons.innerHTML = "";
      chooseAnotherBtn.classList.remove('hidden');
    };
    answerButtons.appendChild(btn);
  });
});

// ================== Cerrar modal ==================
questionModal.addEventListener('click', (e) => {
  if (e.target === questionModal) {
    questionModal.classList.remove('visible');
    questionContainer.classList.remove('visible');
  }
});
