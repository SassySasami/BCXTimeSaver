declare function PlayerCollaringLoad(): Promise<void>;
/**
 * Runs and draws the player collaring cutscene
 * @returns {void} - Nothing
 */
declare function PlayerCollaringRun(): void;
/**
 * Handles clicks during the player collaring cutscene. Clicking anywhere on the screen advances the cutscene. At the end of the cutscene, the player is sent back to her room with her mistress.
 * @returns {void} - Nothing
 */
declare function PlayerCollaringClick(): void;
declare var PlayerCollaringBackground: string;
/** @type {null | NPCCharacter} */
declare var PlayerCollaringMistress: null | NPCCharacter;
/** @type {null | NPCCharacter} */
declare var PlayerCollaringMistressLeft: null | NPCCharacter;
/** @type {null | NPCCharacter} */
declare var PlayerCollaringMistressRight: null | NPCCharacter;
/** @type {null | NPCCharacter} */
declare var PlayerCollaringGirlLeft: null | NPCCharacter;
/** @type {null | NPCCharacter} */
declare var PlayerCollaringGirlRight: null | NPCCharacter;
