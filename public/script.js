// Confirm before leaving quiz for Home, but exempt results page
window.addEventListener('DOMContentLoaded', () => {
  const homeLinks = document.querySelectorAll('.home-link');

  homeLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const quizPage = document.getElementById('quiz-page');
      const resultsPage = document.getElementById('results-page');
      const quizVisible = quizPage && !quizPage.classList.contains('d-none');
      const resultsVisible = resultsPage && !resultsPage.classList.contains('d-none');

      if (quizVisible && !resultsVisible) {
        const confirmLeave = confirm('Are you sure you want to exit this quiz? \nYour answers will be forfeited.');
        if (!confirmLeave) {
          e.preventDefault(); // stop the link from navigating
        }
      }
    });
  });
});

// Counter update integrated with quiz logic
function updateCounter() {
  document.getElementById('current-question').textContent = currentQuestion + 1;
  document.getElementById('total-questions').textContent = quizQuestions.length;
}
// Page navigation logic
const startBtn = document.getElementById('start-quiz-btn');
const welcomePage = document.getElementById('welcome-page');
const quizPage = document.getElementById('quiz-page');
const resultsPage = document.getElementById('results-page');

// --- Quiz Data ---
const intelligences = [
  {
    key: 'linguistic',
    name: 'Linguistic',
    color: '#ff8800',
    description: 'You love words, reading, writing, and storytelling!'
  },
  {
    key: 'logical',
    name: 'Logical-Mathematical',
    color: '#e67600',
    description: 'You enjoy solving puzzles, math, and logical problems!'
  },
  {
    key: 'spatial',
    name: 'Spatial',
    color: '#ffb84d',
    description: 'You think in pictures and love drawing, building, or designing!'
  },
  {
    key: 'bodily',
    name: 'Bodily-Kinesthetic',
    color: '#b0b0b0',
    description: 'You learn best by doing, moving, or using your hands!'
  },
  {
    key: 'musical',
    name: 'Musical',
    color: '#ffcc80',
    description: 'You love music, rhythm, and sounds!'
  },
  {
    key: 'interpersonal',
    name: 'Interpersonal',
    color: '#ff8800',
    description: 'You enjoy working with others and making friends!'
  },
  {
    key: 'intrapersonal',
    name: 'Intrapersonal',
    color: '#e0e0e0',
    description: 'You understand yourself well and like to think deeply!'
  },
  {
    key: 'naturalistic',
    name: 'Naturalistic',
    color: '#a0a0a0',
    description: 'You love nature, animals, and the outdoors!'
  },
  {
    key: 'existential',
    name: 'Existential',
    color: '#ff8800',
    description: 'You wonder about big questions and the meaning of life!'
  }
];

const quizQuestions = [
  {
    question: 'What do you enjoy most?',
    options: [
      { text: 'Reading stories or writing', intelligence: 'linguistic' },
      { text: 'Solving puzzles or math problems', intelligence: 'logical' },
      { text: 'Drawing or building things', intelligence: 'spatial' },
      { text: 'Playing sports or dancing', intelligence: 'bodily' }
    ]
  },
  {
    question: 'Which activity sounds most fun?',
    options: [
      { text: 'Singing or playing an instrument', intelligence: 'musical' },
      { text: 'Making new friends', intelligence: 'interpersonal' },
      { text: 'Thinking about your feelings', intelligence: 'intrapersonal' },
      { text: 'Exploring nature', intelligence: 'naturalistic' }
    ]
  },
  {
    question: 'What do you think about often?',
    options: [
      { text: 'The meaning of life or big questions', intelligence: 'existential' },
      { text: 'How things work', intelligence: 'logical' },
      { text: 'Your favorite song', intelligence: 'musical' },
      { text: 'Your next adventure outside', intelligence: 'naturalistic' }
    ]
  },
  {
    question: 'How do you like to learn?',
    options: [
      { text: 'By reading or listening to stories', intelligence: 'linguistic' },
      { text: 'By doing experiments', intelligence: 'logical' },
      { text: 'By drawing or using maps', intelligence: 'spatial' },
      { text: 'By moving or acting things out', intelligence: 'bodily' }
    ]
  },
  {
    question: 'Which do you prefer?',
    options: [
      { text: 'Playing music', intelligence: 'musical' },
      { text: 'Helping others', intelligence: 'interpersonal' },
      { text: 'Spending time alone', intelligence: 'intrapersonal' },
      { text: 'Watching animals or plants', intelligence: 'naturalistic' }
    ]
  },
  {
    question: 'What do you do when you have free time?',
    options: [
      { text: 'Read or write', intelligence: 'linguistic' },
      { text: 'Solve riddles', intelligence: 'logical' },
      { text: 'Draw or make crafts', intelligence: 'spatial' },
      { text: 'Play outside', intelligence: 'bodily' }
    ]
  },
  {
    question: 'What makes you happiest?',
    options: [
      { text: 'Listening to music', intelligence: 'musical' },
      { text: 'Being with friends', intelligence: 'interpersonal' },
      { text: 'Thinking about your dreams', intelligence: 'intrapersonal' },
      { text: 'Exploring the world', intelligence: 'existential' }
    ]
  },
  {
    question: 'Which would you choose for a school project?',
    options: [
      { text: 'Write a story or poem', intelligence: 'linguistic' },
      { text: 'Build a robot or gadget', intelligence: 'bodily' },
      { text: 'Design a poster or map', intelligence: 'spatial' },
      { text: 'Make a music video', intelligence: 'musical' }
    ]
  },
  {
    question: 'What do you like to talk about with friends?',
    options: [
      { text: 'Big ideas and life questions', intelligence: 'existential' },
      { text: 'Animals and nature', intelligence: 'naturalistic' },
      { text: 'Games and puzzles', intelligence: 'logical' },
      { text: 'Your feelings and dreams', intelligence: 'intrapersonal' }
    ]
  },
  {
    question: 'How do you prefer to spend a weekend?',
    options: [
      { text: 'Reading or writing', intelligence: 'linguistic' },
      { text: 'Playing music or singing', intelligence: 'musical' },
      { text: 'Exploring outdoors', intelligence: 'naturalistic' },
      { text: 'Doing art or crafts', intelligence: 'spatial' }
    ]
  }
];
// Timer logic
let timerInterval;
let totalTime = 5 * 60; // 5 minutes in seconds
let timeLeft = totalTime;

function startTimer() {
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      // Show alert and offer retry or go home
      setTimeout(() => {
        const quizContainer = document.getElementById('quiz-container');
        quizContainer.innerHTML = `
          <div class="alert alert-warning text-center">
            <strong>Time's up!</strong> You did not answer the question in time.<br>
            <button id="retry-btn" class="btn btn-orange mt-3">Try Again</button>
            <a href="index.html" class="btn btn-secondary mt-3 ms-2">Go to Home</a>
          </div>
        `;
        // Add event listener for retry
        document.getElementById('retry-btn').onclick = function() {
          currentQuestion = 0;
          for (const k in scores) scores[k] = 0;
          document.getElementById('results-container').innerHTML = '';
          timeLeft = totalTime;
          showQuestion(currentQuestion);
          startTimer();
        };
      }, 100);
    }
  }, 1000);
}

function updateTimerDisplay() {
  const min = Math.floor(timeLeft / 60);
  const sec = timeLeft % 60;
  document.getElementById('timer-min').textContent = min.toString().padStart(2, '0');
  document.getElementById('timer-sec').textContent = sec.toString().padStart(2, '0');
}

// --- Quiz Logic ---
let currentQuestion = 0;
let scores = {};
intelligences.forEach(i => scores[i.key] = 0);

function showQuestion(index) {
  const q = quizQuestions[index];
  let html = `<h2 class="mb-4">${q.question}</h2><div class="list-group">`;
  q.options.forEach((opt, i) => {
    html += `<button class="list-group-item list-group-item-action mb-2" onclick="selectOption('${opt.intelligence}')">${opt.text}</button>`;
  });
  html += '</div>';
  document.getElementById('quiz-container').innerHTML = html;
  updateCounter();
}

window.selectOption = function(intelligence) {
  scores[intelligence]++;
  currentQuestion++;
  if (currentQuestion < quizQuestions.length) {
    showQuestion(currentQuestion);
  } else {
    showResults();
  }
};

const recommendations = {
  linguistic: {
    path: 'Digital Marketing, Blogging, Content Creation',
    careers: ['Tech Writer', 'Social Media Manager', 'Digital Marketer'],
    courses: ['Digital Marketing', 'Blogging Basics', 'Creative Writing for Kids']
  },
  logical: {
    path: 'Programming, Data Analytics, Cyber Security',
    careers: ['Software Developer', 'Data Analyst', 'Cybersecurity Specialist'],
    courses: ['Python Programming', 'Data Analytics', 'Cyber Security Basics']
  },
  spatial: {
    path: 'Animation, Game Development, Web Design',
    careers: ['Animator', 'Game Designer', 'UI/UX Designer'],
    courses: ['2D/3D Animation', 'Mastering Mobile Game Development', 'Web Design Basics']
  },
  bodily: {
    path: 'Robotics, Interactive Media, Physical Computing',
    careers: ['Robotics Engineer', 'VR/AR Developer', 'Maker/Inventor'],
    courses: ['Robotics for Kids', 'Introduction to VR/AR', 'Physical Computing']
  },
  musical: {
    path: 'Audio Production, Game Sound Design, Multimedia',
    careers: ['Sound Designer', 'Music Producer', 'Multimedia Specialist'],
    courses: ['Audio Editing Basics', 'Game Sound Design', 'Multimedia Creation']
  },
  interpersonal: {
    path: 'Project Management, Community Management, EdTech',
    careers: ['Project Manager', 'Community Manager', 'Tech Educator'],
    courses: ['Digital Teachers Webinar', 'Project Management Basics', 'EdTech for Kids']
  },
  intrapersonal: {
    path: 'Blogging, App Development, Self-paced Learning',
    careers: ['Blogger', 'App Developer', 'Independent Researcher'],
    courses: ['Blogging Basics', 'Mobile App Development', 'Self-paced Coding']
  },
  naturalistic: {
    path: 'Environmental Tech, Data Science, Nature Apps',
    careers: ['Environmental Data Analyst', 'App Developer (Nature/Science)', 'Science Communicator'],
    courses: ['Data Analytics', 'App Development', 'Science & Nature Apps']
  },
  existential: {
    path: 'Philosophy in Tech, AI Ethics, Social Impact Tech',
    careers: ['AI Ethicist', 'Social Entrepreneur', 'Tech Philosopher'],
    courses: ['AI & Ethics for Kids', 'Social Impact Tech', 'Philosophy & Technology']
  }
};

function showResults() {
  quizPage.classList.add('d-none');
  resultsPage.classList.remove('d-none');
  // Find dominant intelligence
  let max = 0, dominant = [];
  for (const key in scores) {
    if (scores[key] > max) {
      max = scores[key];
      dominant = [key];
    } else if (scores[key] === max && max > 0) {
      dominant.push(key);
    }
  }
  let resultHtml = `<div class="mb-4">
    <h2 class="text-orange fw-bold"><i class="fa-solid fa-award me-2"></i>Your Dominant Intelligence</h2>
    <p class="lead">Congratulations! Here are your top strengths and personalized tech recommendations:</p>
  </div>`;
  dominant.forEach(key => {
    const intel = intelligences.find(i => i.key === key);
    const rec = recommendations[key];
    let icon = '';
    switch (key) {
      case 'linguistic': icon = 'fa-book-open'; break;
      case 'logical': icon = 'fa-brain'; break;
      case 'spatial': icon = 'fa-palette'; break;
      case 'bodily': icon = 'fa-running'; break;
      case 'musical': icon = 'fa-music'; break;
      case 'interpersonal': icon = 'fa-users'; break;
      case 'intrapersonal': icon = 'fa-user'; break;
      case 'naturalistic': icon = 'fa-leaf'; break;
      case 'existential': icon = 'fa-question'; break;
      default: icon = 'fa-star';
    }
    resultHtml += `<div class="my-4 p-4 rounded shadow-sm" style="background:${intel.color}22">
      <div class="mb-3">
        <i class="fa-solid ${icon} fa-2x text-orange"></i>
        <h3 class="d-inline-block ms-2 fw-bold">${intel.name}</h3>
      </div>
      <p class="mb-2">${intel.description}</p>
      <div class="row text-start">
        <div class="col-md-4 mb-2">
          <h5 class='mt-3 text-orange'>Tech Path</h5>
          <p>${rec.path}</p>
        </div>
        <div class="col-md-4 mb-2">
          <h5 class='text-orange'>Careers</h5>
          <ul>${rec.careers.map(c => `<li>${c}</li>`).join('')}</ul>
        </div>
        <div class="col-md-4 mb-2">
          <h5 class='text-orange'>Courses</h5>
          <ul>${rec.courses.map(c => `<li>${c}</li>`).join('')}</ul>
        </div>
      </div>
    </div>`;
  });
  resultHtml += `<div class="mt-4">
    <p class="text-success fw-bold"><i class="fa-solid fa-thumbs-up me-2"></i>Keep exploring, learning, and growing your unique talents!</p>
  </div>`;
  document.getElementById('results-container').innerHTML = resultHtml;
}

// Show first question automatically on page load
window.addEventListener('DOMContentLoaded', () => {
  currentQuestion = 0;
  for (const k in scores) scores[k] = 0;
  timeLeft = totalTime;
  showQuestion(currentQuestion);
  startTimer();
});

// Add event listener for Try Again button
setTimeout(() => {
  const tryAgainBtn = document.getElementById('try-again-btn');
  if (tryAgainBtn) {
    tryAgainBtn.addEventListener('click', () => {
      resultsPage.classList.add('d-none');
      quizPage.classList.remove('d-none');
      currentQuestion = 0;
      for (const k in scores) scores[k] = 0;
      document.getElementById('results-container').innerHTML = '';
      timeLeft = totalTime;
      showQuestion(currentQuestion);
      startTimer();
    });
  }
}, 100);