/// <reference types="vite/client" />

import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        src?: string;
        alt?: string;
        'auto-rotate'?: boolean;
        'camera-controls'?: boolean;
        ar?: boolean;
        'ar-modes'?: string;
        'shadow-intensity'?: string;
        'environment-image'?: string;
        'skybox-image'?: string;
        'exposure'?: string;
        'camera-orbit'?: string;
        style?: React.CSSProperties;
      }, HTMLElement>;
    }
  }
}
