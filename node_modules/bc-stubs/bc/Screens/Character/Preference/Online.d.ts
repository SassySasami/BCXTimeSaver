declare function PreferenceSubscreenOnlineLoad(): void;
/**
 * Sets the online preferences for the player. Redirected to from the main Run function if the player is in the online
 * settings subscreen.
 * @returns {void} - Nothing
 */
declare function PreferenceSubscreenOnlineRun(): void;
/**
 * Handles the click events for the online settings.  Redirected from the main Click function.
 * @returns {void} - Nothing
 */
declare function PreferenceSubscreenOnlineClick(): void;
/** @type {null | string[]} */
declare var PreferenceOnlineDefaultBackgroundList: null | string[];
declare var PreferenceOnlineDefaultBackgroundIndex: number;
declare var PreferenceOnlineDefaultBackground: string;
