// Confirm before leaving quiz for Home, but exempt results page
window.addEventListener('DOMContentLoaded', () => {
  const homeLinks = document.querySelectorAll('.home-link');
  homeLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const quizPage = document.getElementById('quiz-page');
      const userDetailsPage = document.getElementById('user-details-page');
      const resultsPage = document.getElementById('results-page');
      const quizVisible = quizPage && !quizPage.classList.contains('d-none');
      const userDetailsVisible = userDetailsPage && !userDetailsPage.classList.contains('d-none');
      const resultsVisible = resultsPage && !resultsPage.classList.contains('d-none');
      if ((quizVisible || userDetailsVisible) && !resultsVisible) {
        const confirmLeave = confirm('Are you sure you want to exit this quiz? \nYour answers will be forfeited.');
        if (!confirmLeave) {
          e.preventDefault();
        }
      }
    });
  });
});

function updateCounter() {
  document.getElementById('current-question').textContent = currentQuestion + 1;
  document.getElementById('total-questions').textContent = quizQuestions.length;
}

const quizPage = document.getElementById('quiz-page');
const resultsPage = document.getElementById('results-page');
const userDetailsPage = document.getElementById('user-details-page');

const intelligences = [
  { key: 'linguistic', name: 'Linguistic', color: '#ff8800', description: 'You love words, reading, writing, and storytelling!' },
  { key: 'logical', name: 'Logical-Mathematical', color: '#e67600', description: 'You enjoy solving puzzles, math, and logical problems!' },
  { key: 'spatial', name: 'Spatial', color: '#ffb84d', description: 'You think in pictures and love drawing, building, or designing!' },
  { key: 'bodily', name: 'Bodily-Kinesthetic', color: '#b0b0b0', description: 'You learn best by doing, moving, or using your hands!' },
  { key: 'musical', name: 'Musical', color: '#ffcc80', description: 'You love music, rhythm, and sounds!' },
  { key: 'interpersonal', name: 'Interpersonal', color: '#ff8800', description: 'You enjoy working with others and making friends!' },
  { key: 'intrapersonal', name: 'Intrapersonal', color: '#e0e0e0', description: 'You understand yourself well and like to think deeply!' },
  { key: 'naturalistic', name: 'Naturalistic', color: '#a0a0a0', description: 'You love nature, animals, and the outdoors!' },
  { key: 'existential', name: 'Existential', color: '#ff8800', description: 'You wonder about big questions and the meaning of life!' }
];

let quizQuestions = [];
let currentQuestion = 0;
let scores = {};
let userAnswers = [];
intelligences.forEach(i => scores[i.key] = 0);

const courseLinks = {
  "2D & 3D Animation": "https://techciti.ng/courses/comprehensive-course-in-2d-3d-animation/",
  "Cyber Security": "https://techciti.ng/courses/cyber-security/",
  "Data Analytics": "https://techciti.ng/courses/data-analytics/",
  "Digital Marketing": "https://techciti.ng/courses/digital-marketing/",
  "Full Stack Web Dev": "https://techciti.ng/courses/full-stack-web-development/",
  "JavaScript": "https://techciti.ng/courses/javascript/",
  "Mobile Game Dev": "https://techciti.ng/courses/mastering-mobile-game-development/",
  "WordPress": "https://techciti.ng/mastering-wordpress/",
  "Mobile App Dev": "https://techciti.ng/courses/mobile-app-development/",
  "Python Programming": "https://techciti.ng/courses/python-programming/",
  "Frontend Web Dev": "https://techciti.ng/courses/front-web-development/"
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
    courses: ['Python Programming', 'Data Analytics', 'Cyber Security']
  },
  spatial: {
    path: 'Animation, Game Development, Web Design',
    careers: ['Animator', 'Game Designer', 'UI/UX Designer'],
    courses: ['2D & 3D Animation', 'Mobile Game Dev', 'Frontend Web Dev']
  },
  bodily: {
    path: 'Robotics, Interactive Media, Physical Computing',
    careers: ['Robotics Engineer', 'VR/AR Developer', 'Maker/Inventor'],
    courses: ['Robotics for Beginners', 'VR Basics', 'Physical Computing']
  },
  musical: {
    path: 'Audio Production, Game Sound Design, Multimedia',
    careers: ['Sound Designer', 'Music Producer', 'Multimedia Specialist'],
    courses: ['Audio Editing Basics', 'Music Production', 'Sound Design for Games']
  },
  interpersonal: {
    path: 'Project Management, Community Management, EdTech',
    careers: ['Project Manager', 'Community Manager', 'Tech Educator'],
    courses: ['Leadership Skills', 'Team Collaboration Tools', 'Communication in Tech']
  },
  intrapersonal: {
    path: 'Blogging, App Development, Self-paced Learning',
    careers: ['Blogger', 'App Developer', 'Independent Researcher'],
    courses: ['Mobile App Dev', 'Self-paced Coding', 'Personal Branding']
  },
  naturalistic: {
    path: 'Environmental Tech, Data Science, Nature Apps',
    careers: ['Environmental Data Analyst', 'App Developer (Nature/Science)', 'Science Communicator'],
    courses: ['Data Analytics', 'Environmental Science & Tech', 'Nature App Design']
  },
  existential: {
    path: 'Philosophy in Tech, AI Ethics, Social Impact Tech',
    careers: ['AI Ethicist', 'Social Entrepreneur', 'Tech Philosopher'],
    courses: ['AI & Ethics', 'Social Impact of Technology', 'Philosophy & Innovation']
  }
};

function showQuestion(index) {
  const q = quizQuestions[index];
  let shuffledOptions;
  if (!q._shuffled) {
    shuffledOptions = q.options.slice().sort(() => Math.random() - 0.5);
    q._shuffled = shuffledOptions;
  } else {
    shuffledOptions = q._shuffled;
  }

  let html = `<h2 class="mb-4">${q.question}</h2><form id="quiz-form"><div class="row">`;
  const half = Math.ceil(shuffledOptions.length / 2);
  for (let col = 0; col < 2; col++) {
    html += '<div class="col-md-6">';
    for (let i = col * half; i < (col + 1) * half && i < shuffledOptions.length; i++) {
      const opt = shuffledOptions[i];
      const label = String.fromCharCode(97 + i);
      let checked = userAnswers[index] === opt.intelligence ? 'checked' : '';
      html += `
        <label class="quiz-option-card mb-3 w-100">
          <input type="radio" name="answer" value="${opt.intelligence}" class="quiz-radio" ${checked} />
          <span class="quiz-radio-custom"></span>
          <span class="quiz-option-label"><strong>${label.toUpperCase()}.</strong> ${opt.text}</span>
        </label>
      `;
    }
    html += '</div>';
  }
  html += '</div><div class="d-flex gap-2 mt-3">';
  html += `<button type="button" id="back-btn" class="btn btn-secondary btn-lg w-50" ${index === 0 ? 'disabled' : ''}>Back</button>`;
  html += '<button type="submit" class="btn btn-orange btn-lg w-50">Next</button></div></form>';
  document.getElementById('quiz-container').innerHTML = html;
  updateCounter();

  document.getElementById('quiz-form').onsubmit = function (e) {
    e.preventDefault();
    const selected = document.querySelector('input[name="answer"]:checked');
    if (selected) {
      userAnswers[index] = selected.value;
      selectOption(selected.value, false);
    } else {
      alert('Please select an answer to continue.');
    }
  };
  document.getElementById('back-btn').onclick = function () {
    if (index > 0) {
      currentQuestion--;
      showQuestion(currentQuestion);
    }
  };
}

function validateUserDetailsForm() {
  let isValid = true;
  const form = document.getElementById('user-details-form');
  const name = form.querySelector('#user-name');
  const email = form.querySelector('#user-email');
  const phone = form.querySelector('#user-phone');
  const location = form.querySelector('#user-location');

  // Reset validation states
  [name, email, phone, location].forEach(input => {
    input.classList.remove('is-invalid');
  });

  // Validate Name
  if (name.value.trim() === '') {
    name.classList.add('is-invalid');
    isValid = false;
  }

  // Validate Email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value.trim())) {
    email.classList.add('is-invalid');
    isValid = false;
  }

  // Validate Phone: simple check for at least 7 digits
  const phonePattern = /^\d{7,}$/;
  if (!phonePattern.test(phone.value.replace(/\s/g, ''))) {
    phone.classList.add('is-invalid');
    isValid = false;
  }

  // Validate Location
  if (location.value.trim() === '') {
    location.classList.add('is-invalid');
    isValid = false;
  }

  return isValid;
}

function showUserDetailsForm() {
  quizPage.classList.add('d-none');
  userDetailsPage.classList.remove('d-none');
  const form = document.getElementById('user-details-form');
  form.onsubmit = function (e) {
    e.preventDefault();
    if (validateUserDetailsForm()) {
      const submitButton = form.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.innerHTML;
      submitButton.disabled = true;
      submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting...';

      const data = new FormData(form);
      fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(response => {
        if (response.ok) {
          form.reset();
          userDetailsPage.classList.add('d-none');
          showResults();
        } else {
          response.json().then(data => {
            alert(data.error || 'Oops! There was a problem submitting your details.');
          });
        }
      }).catch(error => {
        alert('Oops! There was a problem submitting your details.');
      }).finally(() => {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
      });
    }
  };
}

window.selectOption = function (intelligence, isBackNav) {
  if (!isBackNav) {
    scores = {};
    intelligences.forEach(i => scores[i.key] = 0);
    for (let i = 0; i < userAnswers.length; i++) {
      if (userAnswers[i]) {
        scores[userAnswers[i]]++;
      }
    }
  }
  currentQuestion++;
  if (currentQuestion < quizQuestions.length) {
    showQuestion(currentQuestion);
  } else {
    showUserDetailsForm();
  }
};

function showResults() {
  quizPage.classList.add('d-none');
  resultsPage.classList.remove('d-none');
  let max = 0, dominant = [];
  for (const key in scores) {
    if (scores[key] > max) {
      max = scores[key];
      dominant = [key];
    } else if (scores[key] === max && max > 0) {
      dominant.push(key);
    }
  }
  let resultHtml = `<div class="mb-4"><h2 class="text-orange fw-bold"><i class="fa-solid fa-award me-2"></i>Your Dominant Intelligence</h2><p class="lead">Congratulations! Here are your top strengths and personalized tech recommendations:</p></div>`;

  let textResult = 'Your Dominant Intelligence\n';

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

    const techCitiCourses = rec.courses.filter(c => courseLinks[c]);
    resultHtml += `
      <div class="my-4 p-4 rounded shadow-sm" style="background:${intel.color}22">
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
        <div class="mt-4">
          <h6 class="mb-2 text-muted">Tech Citi Recommended Courses</h6>
          ${techCitiCourses.length > 0
            ? `<div class="d-flex flex-wrap gap-2">${techCitiCourses.map(c => `<a href="${courseLinks[c]}" target="_blank" rel="noopener noreferrer" class="badge bg-orange text-decoration-none" style="opacity:0.92;">${c}</a>`).join('')}</div>`
            : `<p class="text-muted mb-1" style="font-size:0.9em;">No specific courses to recommend based on your results.</p>`
          }
          <a href="https://techciti.ng/courses/" target="_blank" rel="noopener noreferrer" class="text-muted d-block mt-2" style="font-size:0.9em;">Check other courses...</a>
        </div>
      </div>
    `;

    textResult += `\n${intel.name}\n${intel.description}\n`;
    textResult += `Tech Path: ${rec.path}\n`;
    textResult += `Careers: ${rec.careers.join(', ')}\n`;
    textResult += `Courses: ${rec.courses.join(', ')}\n`;
    if (techCitiCourses.length > 0) {
      textResult += `Tech Citi Recommended: ${techCitiCourses.join(', ')}\n`;
    }
    textResult += `Check all courses at: https://techciti.ng/courses/\n`;
  });

  textResult += '\nKeep exploring, learning, and growing your unique talents!';
  document.getElementById('results-container').innerHTML = resultHtml;

  setTimeout(() => {
    const copyBtn = document.getElementById('copy-results-btn');
    const downloadBtn = document.getElementById('download-results-btn');
    if (copyBtn) {
      copyBtn.onclick = function () {
        navigator.clipboard.writeText(textResult)
          .then(() => {
            copyBtn.innerText = 'Copied!';
            setTimeout(() => copyBtn.innerHTML = '<i class="fa-solid fa-copy me-1"></i>Copy', 1500);
          });
      };
    }
    if (downloadBtn) {
      downloadBtn.onclick = function () {
        const blob = new Blob([textResult], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'techciti-quiz-results.txt';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }, 100);
      };
    }
  }, 100);
}

window.addEventListener('DOMContentLoaded', () => {
  fetch('quiz-questions.json')
    .then(response => response.json())
    .then(data => {
      quizQuestions = data.sort(() => Math.random() - 0.5);
      currentQuestion = 0;
      for (const k in scores) scores[k] = 0;
      userAnswers = [];
      showQuestion(currentQuestion);
    });
});

setTimeout(() => {
  const tryAgainBtn = document.getElementById('try-again-btn');
  if (tryAgainBtn) {
    tryAgainBtn.addEventListener('click', () => {
      resultsPage.classList.add('d-none');
      userDetailsPage.classList.add('d-none');
      quizPage.classList.remove('d-none');
      currentQuestion = 0;
      for (const k in scores) scores[k] = 0;
      userAnswers = [];
      document.getElementById('results-container').innerHTML = '';
      showQuestion(currentQuestion);
    });
  }
}, 100);
