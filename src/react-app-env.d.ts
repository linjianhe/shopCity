/* eslint-disable */
/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare var API_DOMAIN: string;
declare var DOMAIN: string;
declare var COUPON_LIST_CODE: string;
declare var COUPON_DETAIL_CODE: string;
declare var CONFIG_DOMAIN: string;
declare var ORIGIN: string;
declare var NEED_MOCK: boolean;

declare var plupload: any;
declare var RECRUIT_DOMAIN: string;

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
  }
}

declare module 'bizcharts/*' {
  const m: any;
  export default m;
}

declare module '@antv/*' {
  const m: any;
  export default m;
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;

  const src: string;
  export default src;
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { [key: string]: string };
  export default classes;
}

declare global {
  interface Window {
    isCallNativeLogin: boolean;
    AMap: any;
  }
}
declare interface Window {
  AMap: any;
}