/**
 * Loads the Preferences screen.
 * @returns {void} - Nothing
 */
declare function PreferenceSubscreenGeneralLoad(): void;
/**
 * Handles click events in the preference screen that are propagated from CommonClick()
 * @returns {void} - Nothing
 */
declare function PreferenceSubscreenGeneralRun(): void;
/**
 * Handles the click events in the preference screen, general sub-screen, propagated from CommonClick()
 * @returns {void} - Nothing
 */
declare function PreferenceSubscreenGeneralClick(): void;
/**
 * Exits the preference screen. Block exit when the color picker is active.
 * @returns {boolean} - Returns false if the color picker is active and input is not valid
 */
declare function PreferenceSubscreenGeneralExit(): boolean;
/**
 * Cleans up elements that are not needed anymore
 * If the selected color is invalid, the player cannot leave the screen.
 */
declare function PreferenceSubscreenGeneralUnload(): void;
/** @type {boolean} */
declare var PreferenceSubscreenGeneralColorPicker: boolean;
declare var PreferenceSafewordConfirm: boolean;
