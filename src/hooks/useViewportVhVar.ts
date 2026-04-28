import { useEffect } from 'react';

function shouldUseVisualViewportOnThisDevice() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
}

export function useViewportVhVar(freeze = false) {
  useEffect(() => {
    if (freeze) return;

    const useVisualViewport = shouldUseVisualViewportOnThisDevice();

    const apply = () => {
      const height = useVisualViewport ? (window.visualViewport?.height ?? window.innerHeight) : window.innerHeight;
      const h = height * 0.01;
      document.documentElement.style.setProperty('--app-vh', `${h}px`);
    };

    apply();

    window.addEventListener('resize', apply);

    const vv = useVisualViewport ? window.visualViewport : null;
    vv?.addEventListener('resize', apply);

    return () => {
      window.removeEventListener('resize', apply);
      vv?.removeEventListener('resize', apply);
    };
  }, [freeze]);
}
