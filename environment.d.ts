declare module '*.svg' {
  import type {IconType} from './src/types';

  const content: IconType;
  export default content;
}

declare module '*.json' {
  const content: Record<string, unknown>;
  export default content;
}

declare module '*.png' {
  const content: number;
  export default content;
}
