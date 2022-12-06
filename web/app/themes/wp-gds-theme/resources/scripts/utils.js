export function ready(fn) {
  if (document.readyState !== 'loading') {
    return setTimeout(fn, 0)
  }
  document.addEventListener('DOMContentLoaded', fn);
}

export function onLoad(fn) {
  if (document.readyState === 'complete') {
    return setTimeout(fn, 0)
  }
  window.addEventListener('load', fn);
}

export function onIdle(fn) {
  if ('requestIdleCallback' in window) {
    return window.requestIdleCallback(fn, {timeout: 3000});
  }
  return onLoad(fn);
}
