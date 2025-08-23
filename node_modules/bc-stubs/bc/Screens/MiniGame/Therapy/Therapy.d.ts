declare function TherapyLoad(): Promise<void>;
/**
 * Runs the therapy mini game.
 * @returns {void} - Nothing
 */
declare function TherapyRun(): void;
/**
 * Checks if the therapy minigame should end. It ends when the therapy is completed, or when the patient is too stressed out.
 * @returns {void} - Nothing
 */
declare function TherapyVerifyEnd(): void;
/**
 * Handles a given move type and validates it
 * @param {number} MoveType - Move type (Index of the TherapyMoves array)
 * @returns {void} - Nothing
 */
declare function TherapyDoMove(MoveType: number): void;
/**
 * Handles clicks in the therapy mini game
 * @returns {void} - Nothing
 */
declare function TherapyClick(): void;
/**
 * Handles mouse downs in the therapy mini game
 * @returns {void} - Nothing
 */
declare function TherapyMouseDown(): void;
declare function TherapyKeyDown(event: KeyboardEvent): boolean;
declare var TherapyBackground: string;
/** @type {null | NPCCharacter} */
declare var TherapyCharacterLeft: null | NPCCharacter;
/** @type {null | NPCCharacter} */
declare var TherapyCharacterRight: null | NPCCharacter;
declare var TherapyMoves: number[];
declare var TherapyGenerateMoveTimer: number;
declare var TherapyStress: number;
