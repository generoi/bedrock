const lazyLoadObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const target = entry.target;
      if (target.src || !target.dataset.src) {
        return;
      }
      target.src = target.dataset.src;
      lazyLoadObserver.unobserve(target);
    }
  });
}, {});

export function lazyLoad(element) {
  lazyLoadObserver.observe(element);
}
