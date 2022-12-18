const DEFAULT_TICK_SECONDS = 0.1;

export default class Timer {
  private elapsedSeconds: number;
  private tickSeconds: number;
  private handle: number | null = null; // store JavaScript interval handle so we can properly dispose of it later

  /**
   * Timer
   *
   * @param tickSeconds Length (in seconds) of each timer tick.
   */
  constructor(tickSeconds: number = DEFAULT_TICK_SECONDS) {
    this.elapsedSeconds = 0;
    this.tickSeconds = tickSeconds;
  }

  /**
   * Start timer. You cannot call start on a timer that has already been started.
   *
   * @param tickCallback Callback function called on each timer tick. Takes elapsed time, in seconds.
   */
  public start(tickCallback?: (elapsedSeconds: number) => void) {
    if (this.handle) {
      throw new Error("cannot start a timer that has already been started");
    }

    var startTime: number = Date.now();

    this.handle = window.setInterval(() => {
      this.elapsedSeconds = this.toSeconds(Math.floor(Date.now() - startTime));
      if (tickCallback) {
        tickCallback(this.elapsedSeconds);
      }
    }, this.toMillis(this.tickSeconds));
  }

  /**
   * Check if timer is running.
   *
   * @returns Flag indicating whether or not timer is running.
   */
  public isRunning(): boolean {
    return !!this.handle;
  }

  /**
   * Reset timer. Do not restart it.
   */
  public reset(): void {
    this.destroy();
    this.elapsedSeconds = 0;
  }

  /**
   * Reset timer and restart it.
   */
  public restart(): void {
    this.reset();
    this.start();
  }

  /**
   * Get current timer value in seconds.
   */
  public getTime(): number {
    return this.elapsedSeconds;
  }

  /**
   * Delete and clean up timer.
   */
  public destroy(): void {
    if (this.handle) {
      window.clearInterval(this.handle);
    }
  }

  private toMillis(value: number): number {
    return value * 1000;
  }

  private toSeconds(value: number): number {
    return value / 1000;
  }
}
