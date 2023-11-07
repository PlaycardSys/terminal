const bulkAddEventListener = (
  object: EventTarget,
  events: string[],
  callback: EventListenerOrEventListenerObject,
) => {
  events.forEach(event => {
    object.addEventListener(event, callback);
  });
};

const bulkRemoveEventListener = (
  object: EventTarget,
  events: string[],
  callback: EventListenerOrEventListenerObject,
) => {
  events.forEach(event => {
    object.removeEventListener(event, callback);
  });
};

class IdleDetector {
  private _eventsTarget: EventTarget;
  private _eventsTargetName: string;
  private _events: string[] = [
    'mousemove',
    'keydown',
    'wheel',
    'DOMMouseScroll',
    'mouseWheel',
    'mousedown',
    'touchstart',
    'touchmove',
    'MSPointerDown',
    'MSPointerMove',
  ];
  private _callback: () => void;
  private _timeout: number;
  private _timeoutId: number | null = null;

  constructor(callback: () => void, timeout: number) {
    this._callback = callback;
    this._timeout = timeout;
    this._eventsTarget = window;
    this._eventsTargetName = 'window';
    this._resetTimeout = this._resetTimeout.bind(this);
    this._onUserActivity = this._onUserActivity.bind(this);
  }

  public setEventsTarget(eventsTarget: EventTarget, eventsTargetName: string) {
    this._eventsTarget = eventsTarget;
    this._eventsTargetName = eventsTargetName;
  }

  public start() {
    bulkAddEventListener(this._eventsTarget, this._events, this._onUserActivity);
    this._resetTimeout();
  }

  public stop() {
    bulkRemoveEventListener(this._eventsTarget, this._events, this._onUserActivity);
    this._clearTimeout();
  }

  private _onUserActivity() {
    this._resetTimeout();
  }

  private _resetTimeout() {
    this._clearTimeout();
    this._timeoutId = window.setTimeout(() => {
      this._timeoutCallback();
    }, this._timeout);
  }

  private _clearTimeout() {
    if (this._timeoutId !== null) {
      window.clearTimeout(this._timeoutId);
      this._timeoutId = null;
    }
  }

  private _timeoutCallback() {
    this._callback();
  }
}

export default IdleDetector;
