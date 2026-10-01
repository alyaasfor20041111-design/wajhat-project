document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll('.counter');
  
  const duration = 2000; 

  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    
    let current = 0;
    
    const stepTime = 15;
    const increment = target / (duration / stepTime);

    const updateCounter = () => {
      current += increment;

      if (current >= target) {
        counter.innerText = target.toLocaleString(); 
      } else {
        counter.innerText = Math.floor(current).toLocaleString();
        setTimeout(updateCounter, stepTime);
      }
    };
    updateCounter();
  });
});
