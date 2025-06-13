export const hasPrefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)',
).matches;

export default function init() {
  if (!hasPrefersReducedMotion) {
    return;
  }

  const videos = document.querySelectorAll('video[autoplay]');
  for (const video of videos) {
    video.pause();
    video.removeAttribute('autoplay');
  }
}
