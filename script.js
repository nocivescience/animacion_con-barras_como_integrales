function fitElementToParent(el, padding) {
    var timeout = null;
    function resize() {
      if (timeout) clearTimeout(timeout);
      anime.set(el, {scale: 1});
      var pad = padding || 0;
      var parentEl = el.parentNode;
      var elOffsetWidth = el.offsetWidth - pad;
      var parentOffsetWidth = parentEl.offsetWidth;
      var ratio = parentOffsetWidth / elOffsetWidth;
      timeout = setTimeout(anime.set(el, {scale: ratio}), 10);
    }
    resize();
    window.addEventListener('resize', resize);
  }
  
  var easingsAnimation = (function() {
  
    var easingVisualizerEl = document.querySelector('.easing-visualizer');
    var barsWrapperEl = easingVisualizerEl.querySelector('.bars-wrapper');
    var dotsWrapperEl = easingVisualizerEl.querySelector('.dots-wrapper');
    var barsFragment = document.createDocumentFragment();
    var dotsFragment = document.createDocumentFragment();
    var numberOfBars = 91;
    var duration = 450;
    var animation;
    
    const colors = [
        'red',
        'orange',
        'yellow',
        'green',
        'blue',
        'purple',
        'pink',  
    ];

    fitElementToParent(easingVisualizerEl, 0);
  
    for (var i = 0; i < numberOfBars; i++) {
      var barEl = document.createElement('div');
      var dotEl = document.createElement('div');
      barEl.classList.add('bar');
      dotEl.classList.add('dot');
      barEl.style.borderRadius = `5px`;
      barEl.style.filter = `blur(1px)`;
      barEl.style.backgroundImage= `linear-gradient(180deg, ${colors[i%colors.length]} 10%, #242423 52%, ${colors[i%colors.length]} 100%)`;
      dotEl.style.backgroundColor = `#ff${i<10&&`0${i}`||i}00`;
      dotEl.classList.add('color-red');
      barsFragment.appendChild(barEl);
      dotsFragment.appendChild(dotEl);
    }
  
    barsWrapperEl.appendChild(barsFragment);
    dotsWrapperEl.appendChild(dotsFragment);
    
    function play() {
      
      var easings = [];
      for (let ease in anime.penner) easings.push(ease);
      easings.push('steps('+anime.random(5, 20)+')');
      easings.push('steps('+anime.random(5, 20)+')');
      easings.push('cubicBezier(0.545, 0.475, 0.145, 1)');
      var ease = easings[anime.random(0, easings.length - 1)];
  
      animation = anime.timeline({
        duration: duration,
        easing: ease,
        complete: play
      })
      .add({
        targets: '.easing-visualizer .bar',
        scaleY: anime.stagger([1, 64], {easing: ease, from: 'center', direction: 'reverse'}),
        delay: anime.stagger(7, {from: 'center'})
      })
      .add({
        targets: '.easing-visualizer .dot',
        translateY: anime.stagger(['-160px', '160px'], {easing: ease, from: 'last'}),
        delay: anime.stagger(1, {from: 'center'})
      }, 0);
  
    }
    
    play();
    
  })();