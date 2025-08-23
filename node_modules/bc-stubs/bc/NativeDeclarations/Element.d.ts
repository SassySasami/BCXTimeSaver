declare namespace ElementHelp {
  type ElementOrId = HTMLElement | string;
  type AnchorY = 'top' | 'bottom';
  type AnchorX = 'left' | 'right';
  type AnchorXY = `${AnchorY}-${AnchorX}`;
}

declare namespace ElementSwipe {
	interface Options {
		/**
		 * The direction one should swipe in.
		 *
		 * Defaults to `right`.
		 */
		direction?: "left" | "right" | "up" | "down";
		/**
		 * The minimum distance one should swipe in pixels.
		 *
		 * Defaults to 2.5% of the browser window's width.
		 */
		minSwipeDistance?: number;
		/**
		 * A callback to-be executed after succesfully swiping.
		 *
		 * Default to dispatching a `click` event.
		 */
		onClose?: (elem: HTMLElement, ev: TouchEvent) => any;
		/**
		 * A custom animation to play after succesfully executing a swipe
		 *
		 * Defaults to a translation + fade-out in the {@link Options.direction} direction.
		 */
		animation?: Animation;
	}
}
