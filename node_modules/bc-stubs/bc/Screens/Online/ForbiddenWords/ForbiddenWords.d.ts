declare function ForbiddenWordsLoad(): Promise<void>;
/**
 * Starts the forbidden words screen and loads it
 * @returns {void} - Nothing
 */
declare function ForbiddenWordsOpen(RuleType: any): void;
/**
 * Draws the forbidden words text and check boxes
 * @returns {void} - Nothing
 */
declare function ForbiddenWordsRun(): void;
/**
 * Handles the click events.  Called from CommonClick()
 * @returns {void} - Nothing
 */
declare function ForbiddenWordsClick(): void;
declare function ForbiddenWordsExit(): void;
declare var ForbiddenWordsBackground: string;
/** @type {null | Character } */
declare var ForbiddenWordsTarget: null | Character;
/** @type {string[]} */
declare var ForbiddenWordsList: string[];
declare var ForbiddenWordsOffset: number;
declare var ForbiddenWordsConsequence: string;
declare var ForbiddenWordsConsequenceList: string[];
