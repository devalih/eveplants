const quiz = document.querySelector('[data-plant-quiz]');

if (quiz) {
  const questions = [...quiz.querySelectorAll('[data-question]')];
  const previous = quiz.querySelector('[data-previous]');
  const next = quiz.querySelector('[data-next]');
  const error = quiz.querySelector('[data-quiz-error]');
  const progress = quiz.querySelector('[data-progress-bar]');
  const progressText = quiz.querySelector('[data-progress-text]');
  const results = document.querySelector('[data-quiz-results]');
  const grid = document.querySelector('[data-result-grid]');
  const resultsIntro = document.querySelector('[data-results-intro]');
  let current = 0;

  const profiles = [
    { name: 'Snake plant', href: '../plants/snake-plant-care-netherlands.html', blurb: 'A durable, sculptural choice that is comfortable with a slower watering rhythm.', matches: { light: ['bright', 'medium', 'low'], space: ['small', 'medium'], time: ['minimal', 'regular'], watering: ['forget', 'balanced'], pets: ['no'], style: ['sculptural'], humidity: ['dry', 'normal'], goal: ['easy'] } },
    { name: 'ZZ plant', href: '../plants/zz-plant-care-netherlands.html', blurb: 'A calm, architectural plant for busy routines and lower-light rooms.', matches: { light: ['medium', 'low'], space: ['small', 'medium'], time: ['minimal'], watering: ['forget'], pets: ['no'], style: ['sculptural'], humidity: ['dry', 'normal'], goal: ['easy'] } },
    { name: 'Spider plant', href: '../plants/spider-plant-care-netherlands.html', blurb: 'A lively, pet-aware classic with arching leaves and easy-to-share plantlets.', matches: { light: ['bright', 'medium'], space: ['small', 'medium'], time: ['regular'], watering: ['balanced', 'routine'], pets: ['yes', 'no'], style: ['trailing', 'leafy'], humidity: ['normal'], goal: ['easy', 'learn'] } },
    { name: 'Pothos', href: '../plants/pothos-care-netherlands.html', blurb: 'A forgiving trailing plant that adapts well to everyday home conditions.', matches: { light: ['bright', 'medium', 'low'], space: ['small', 'medium'], time: ['minimal', 'regular'], watering: ['forget', 'balanced'], pets: ['no'], style: ['trailing'], humidity: ['dry', 'normal'], goal: ['easy', 'learn'] } },
    { name: 'Money tree', href: '../plants/money-tree-care-netherlands.html', blurb: 'A pet-aware small tree with a braided trunk and a friendly weekly care rhythm.', matches: { light: ['bright', 'medium'], space: ['medium', 'large'], time: ['regular'], watering: ['balanced', 'routine'], pets: ['yes', 'no'], style: ['sculptural'], humidity: ['normal'], goal: ['easy', 'statement'] } },
    { name: 'Monstera', href: '../plants/monstera-care-netherlands.html', blurb: 'A bold leafy feature plant for a brighter home with room to grow.', matches: { light: ['bright', 'medium'], space: ['medium', 'large'], time: ['regular'], watering: ['balanced'], pets: ['no'], style: ['leafy'], humidity: ['normal', 'humid'], goal: ['statement', 'learn'] } },
    { name: 'Bird of paradise', href: '../plants/bird-of-paradise-care-netherlands.html', blurb: 'A dramatic statement plant for a spacious, bright room and an attentive owner.', matches: { light: ['bright'], space: ['large'], time: ['regular', 'keen'], watering: ['balanced', 'routine'], pets: ['no'], style: ['sculptural', 'leafy'], humidity: ['normal', 'humid'], goal: ['statement'] } },
    { name: 'Calathea', href: '../plants/calathea-care-netherlands.html', blurb: 'A rewarding foliage plant for someone happy to learn its light, moisture and humidity cues.', matches: { light: ['medium'], space: ['small', 'medium'], time: ['keen'], watering: ['routine'], pets: ['yes', 'no'], style: ['leafy'], humidity: ['humid'], goal: ['learn'] } },
    { name: 'Moth orchid', href: '../plants/phalaenopsis-orchid-care-netherlands.html', blurb: 'A flowering option for bright filtered light and a deliberate care routine.', matches: { light: ['bright'], space: ['small'], time: ['regular', 'keen'], watering: ['balanced', 'routine'], pets: ['yes', 'no'], style: ['flowering'], humidity: ['normal', 'humid'], goal: ['learn'] } }
  ];

  function renderQuestion() {
    questions.forEach((question, index) => question.classList.toggle('is-active', index === current));
    previous.hidden = current === 0;
    next.innerHTML = current === questions.length - 1 ? 'See my matches <span>→</span>' : 'Next <span>→</span>';
    progress.style.width = `${((current + 1) / questions.length) * 100}%`;
    progressText.textContent = `Question ${current + 1} of ${questions.length}`;
    error.hidden = true;
  }

  function answers() {
    return Object.fromEntries(new FormData(quiz).entries());
  }

  function score(profile, answers) {
    return Object.entries(answers).reduce((total, [key, value]) => total + (profile.matches[key]?.includes(value) ? 2 : 0), 0);
  }

  function showResults() {
    const selected = answers();
    const ranked = [...profiles].sort((a, b) => score(b, selected) - score(a, selected)).slice(0, 3);
    const note = selected.light === 'low' ? 'Because you described lower light, start close to the brightest suitable spot you have, then watch new growth before moving deeper into the room.' : selected.pets === 'yes' ? 'Because pets are part of the home, these suggestions favour plants commonly treated as pet-aware. Still discourage chewing and check species-specific veterinary guidance.' : 'These suggestions balance the conditions you described with a realistic care rhythm.';
    resultsIntro.textContent = note;
    grid.innerHTML = ranked.map((plant, index) => `<article class="quiz-result-card"><span>0${index + 1}</span><h3>${plant.name}</h3><p>${plant.blurb}</p><a class="text-arrow" href="${plant.href}">Read the care profile <span>↗</span></a></article>`).join('');
    quiz.hidden = true;
    results.hidden = false;
    results.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  next.addEventListener('click', () => {
    const selected = questions[current].querySelector('input:checked');
    if (!selected) { error.hidden = false; return; }
    if (current === questions.length - 1) { showResults(); return; }
    current += 1;
    renderQuestion();
  });
  previous.addEventListener('click', () => { current -= 1; renderQuestion(); });
  document.querySelector('[data-restart]')?.addEventListener('click', () => { quiz.reset(); current = 0; results.hidden = true; quiz.hidden = false; renderQuestion(); quiz.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  renderQuestion();
}
