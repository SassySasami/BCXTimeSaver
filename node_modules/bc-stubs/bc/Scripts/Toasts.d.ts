/**
 * Manages the display and lifecycle of toast notifications.
 * Maintains a queue of toasts to display and limits the number of
 * concurrently visible toasts.
 */
declare var ToastManager: {
    /**
     * Queue of toast options waiting to be displayed.
     * @type {Required<Toasts.Options>[]}
     */
    queue: Required<Toasts.Options>[];
    /**
     * Tracks the number of active (visible) toasts.
     * @type {number}
     */
    active: number;
    /**
     * Show an info toast, because you need to know stuff.
     *
     * @param {string} msg - Text content of the toast.
     * @param {Omit<Toasts.Options, 'message' | 'type'>} [opts={}] - Other toast options.
     */
    info(msg: string, opts?: Omit<Toasts.Options, "message" | "type">): void;
    /**
     * Show a success toast. It's time to celebrate! 🎉
     *
     * @param {string} msg - Text content of the toast.
     * @param {Omit<Toasts.Options, 'message' | 'type'>} [opts={}] - Other toast options.
     */
    success(msg: string, opts?: Omit<Toasts.Options, "message" | "type">): void;
    /**
     * Show a warning toast. Watch out, things might explode!
     *
     * @param {string} msg - Text content of the toast.
     * @param {Omit<Toasts.Options, 'message' | 'type'>} [opts={}] - Other toast options.
     */
    warning(msg: string, opts?: Omit<Toasts.Options, "message" | "type">): void;
    /**
     * Show an error toast. Oh noes, something broke.
     *
     * @param {string} msg - Text content of the toast.
     * @param {Omit<Toasts.Options, 'message' | 'type'>} [opts={}] - Other toast options.
     */
    error(msg: string, opts?: Omit<Toasts.Options, "message" | "type">): void;
    /**
     * Show a custom toast, because you're special.
     *
     * @param {string} msg - Text content of the toast.
     * @param {Toasts.Type} type - Custom type string or one of the predefined types.
     * @param {Omit<Toasts.Options, 'message' | 'type'>} [opts={}] - Other toast options.
     */
    custom(msg: string, type: Toasts.Type, opts?: Omit<Toasts.Options, "message" | "type">): void;
    /**
     * Kick out every single visible toast regardless of type.
     *
     * @returns {void}
     */
    dismissAll(): void;
    /**
     * Kicks out all toasts of a particular style.
     *
     * @param {Toasts.Type} type - The type of toasts to dismiss (e.g., 'info', 'error').
     * @returns {void}
     */
    dismissByType(type: Toasts.Type): void;
    /**
     * Enqueues a new toast to be displayed with the given options.
     * Fills in any missing option fields with default values, then
     * attempts to process the queue to show toasts if slots are available.
     *
     * @param {Toasts.Options} options - Configuration for the toast.
     * @returns {void}
     */
    _show(options: Toasts.Options): void;
    /**
     * Internal method that iterates through the queue and displays any toast
     * if the active count is not currently at max capacity. Removes displayed toasts
     * from the queue and updates the active count.
     *
     * @returns {void}
     */
    _process(): void;
    /**
     * Builds the toast element, hooks up animations, buttons, and timers,
     * and tracks its lifetime until Void kidnaps it.
     *
     * @param {Required<Toasts.Options>} _ - Fully resolved options for the toast to display.
     * @returns {void}
     */
    _display(_: Required<Toasts.Options>): void;
    /**
     * Retrieves an existing container element for toasts, or creates a new one if none exists.
     *
     * @returns {HTMLDivElement} The container <div> element.
     */
    _getOrCreateContainer(): HTMLDivElement;
    /**
     * Animates the <progress> element from 0 to its max value over the specified duration.
     * Calls onFinish when the progress reaches its maximum. Returns a function that can
     * be called to stop the animation prematurely.
     *
     * @param {HTMLProgressElement} progress - The <progress> element to animate.
     * @param {() => void | undefined} onFinish - Callback invoked when the animation completes.
     * @param {number} durationMs - Total time in milliseconds for the progress to fill.
     * @returns {() => void} Function to call to cancel the progress animation timer.
     */
    _animateProgress(progress: HTMLProgressElement, onFinish: () => void | undefined, durationMs: number): () => void;
};
