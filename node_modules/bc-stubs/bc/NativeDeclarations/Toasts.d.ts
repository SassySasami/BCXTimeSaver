declare namespace Toasts {
	/**
	 * Defines the type and style of a toast notification.
	 * Includes standard types like 'info', 'success', 'warning', 'error',
	 * and allows for custom string-based types.
	 */
	type Type = 'info' | 'success' | 'warning' | 'error' | (string & {});

	/**
	 * Describes why a toast was closed.
	 * Includes predefined reasons like 'timeout', 'manual', 'click', 'external',
	 * and allows for custom string-based reasons.
	 * Used in the {@link Toasts.Options.onClose} callback.
	 */
	type CloseReason = 'timeout' | 'click' | 'external' | (string & {});

  /**
   * Describes the color of an icon. Might help when default icons looks like shit.
   * 'accent' is the same as the accent color of the toast, e.g. text.
   */
  type IconColor = 'black' | 'white' | 'accent' | 'default';

	/** Configuration options for displaying a toast notification. */
	interface Options {
		/** Text content of the toast. */
		message: string;
		/** Title of the toast. */
		title?: string;
		/** Type and style of the toast. */
		type?: Type;
		/** How long (in milliseconds) the toast remains visible. */
		duration?: number;
		/** Whether to show a progress bar. */
		progress?: boolean;
		/** Whether to stop the progress bar animation when the mouse hovers over the toast. */
		stopProgressOnHover?: boolean;
		/** Callback when the toast is clicked. */
		onClick?: (ev: MouseEvent, toast: ToastElement) => void;
		/** Callback when the toast is displayed. */
		onShow?: (toast: ToastElement) => void;
		/** Callback when the toast is closed, with a reason. */
		onClose?: (toast: ToastElement, reason: CloseReason) => void;
		/** Optional icon to display alongside the message. */
		icon?: string;
    /** Optional icon color. */
    iconColor?: IconColor;
		/** Optional array of action buttons to render inside the toast. */
		buttons?: ToastButton[];
	}
	/**
	 * Defines a button to be rendered inside a toast notification.
	 * - label:
	 * - onClick:
	 */
	interface ToastButton {
		/** Text displayed on the button. */
		label: string;
		/** Handler invoked when the button is clicked.
		 *  The `this` context is bound to the actual HTMLButtonElement created for this toast. */
		onClick: (this: HTMLButtonElement, ev: MouseEvent, toast: ToastElement) => void;
	}

	/**
	 * Represents the DOM element for a rendered toast.
	 * Extends HTMLDivElement and may include an internal `_dismiss` method
	 * that can be programmatically called to close the toast with a given reason.
	 */
	interface ToastElement extends HTMLDivElement {
		_dismiss?: (reason: CloseReason) => void;
	}

}

