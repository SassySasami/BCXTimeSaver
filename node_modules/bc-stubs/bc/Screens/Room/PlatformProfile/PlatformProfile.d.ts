/**
 * Returns the number of available perks for the current player character
 * @returns {number} - The number of perks
 */
declare function PlatformProfileGetFreePerk(): number;
/**
 * Draws a black arrow that goes down and right
 * @param {number} SX - The source X position on screen
 * @param {number} SY - The source Y position on screen
 * @param {number} TX - The target X position on screen
 * @param {number} TY - The target Y position on screen
 * @returns {void} - Nothing
 */
declare function PlatformProfileDrawArrow(SX: number, SY: number, TX: number, TY: number): void;
declare function PlatformProfileLoad(): Promise<void>;
/**
 * Draws the perk button on the screen, the color changes based on if the perk is available or paid
 * @param {number} X - The X position on screen
 * @param {number} Y - The Y position on screen
 * @param {number} PerkNum - The perk number for the current character
 * @param {Platform.PerkName} [Prerequisite1] - If there's a first prerequisite to validate
 * @param {Platform.PerkName} [Prerequisite2] - If there's a second prerequisite to validate
 * @returns {void} - Nothing
 */
declare function PlatformProfileDrawPerkButton(X: number, Y: number, PerkNum: number, Prerequisite1?: Platform.PerkName, Prerequisite2?: Platform.PerkName): void;
/**
 * Returns the text associated to the bonus given by the owner of the current player
 * @param {Platform.Character} PlatformChar - The platform character to evaluate
 * @returns {string} - The text string linked to the bonus
 */
declare function PlatformGetOwnerBonus(PlatformChar: Platform.Character): string;
/**
 * Returns the text associated to the bonus given by the lover of the current player
 * @param {Platform.Character} PlatformChar - The platform character to evaluate
 * @returns {string} - The text string linked to the bonus
 */
declare function PlatformGetLoverBonus(PlatformChar: Platform.Character): string;
/**
 * Runs and draws the screen.
 * @returns {void} - Nothing
 */
declare function PlatformProfileRun(): void;
/**
 * Adds the perk as an active perk for the current character
 * @param {number} PerkNum - The perk number for the current character
 * @returns {void} - Nothing
 */
declare function PlatformProfileBuyPerk(PerkNum: number): void;
/**
 * Resets all perks allocated for the current character, the "Apprentice" perk cannot reset
 * @returns {void} - Nothing
 */
declare function PlatformProfileResetPerk(): void;
/**
 * Handles clicks in the screen
 * @returns {void} - Nothing
 */
declare function PlatformProfileClick(): void;
declare function PlatformProfileExit(): void;
