declare function CreationLoad(): Promise<void>;
/**
 * Runs the character creation screen. Draws all needed input fields and buttons.
 * If the import of Bondage College data is possible, an appropriate check box is drawn.
 * The function is called dynamically.
 * @returns {void} - Nothing
 */
declare function CreationRun(): void;
/**
 * Handles the server response to a creation request. Creates the character, if possible,
 * initializes the basic data and sends the newborn to the maid in the main hall.
 * @param {ServerAccountCreateResponse} data - The recieved data from the server
 * @returns {void} - Nothing
 */
declare function CreationResponse(data: ServerAccountCreateResponse): void;
/**
 * Handles click events in the creation dialog.
 * Imports data from Bondage College and creates a character.
 * @returns {void} - Nothing
 */
declare function CreationClick(): void;
declare function CreationExit(): void;
declare var CreationBackground: string;
declare var CreationMessage: string;
