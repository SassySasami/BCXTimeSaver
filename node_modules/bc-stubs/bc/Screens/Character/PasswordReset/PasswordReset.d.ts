declare function PasswordResetLoad(): Promise<void>;
/**
 * Runs the password reset screen
 * @returns {void} Nothing
 */
declare function PasswordResetRun(): void;
/**
 * Handles a password reset response
 * @param {ServerPasswordResetResponse} msg - The password reset response message to be displayed to the player
 * @returns {void} Nothing
 */
declare function PasswordResetResponse(msg: ServerPasswordResetResponse): void;
/**
 * Handles player click events on the password reset screen
 * @returns {void} Nothing
 */
declare function PasswordResetClick(): void;
declare function PasswordResetExit(): void;
declare var PasswordResetBackground: string;
declare var PasswordResetMessage: string;
