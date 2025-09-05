declare module '@vimeo/player' {
  type EventCallback = (...args: any[]) => void;

  export default class Player {
    constructor(element: HTMLIFrameElement | string, options?: any);
    on(event: string, callback: EventCallback): void;
    off(event: string, callback: EventCallback): void;
    play(): Promise<void>;
    pause(): Promise<void>;
    setMuted(muted: boolean): Promise<void>;
    setLoop(loop: boolean): Promise<void>;
    ready(): Promise<void>;
  }
}
