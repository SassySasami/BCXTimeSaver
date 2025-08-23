/**
 * Change the current screen to the background selection screen
 * @param {BackgroundTag[]} Tags - The list of possible Background names
 * @param {string} Name - The name of the current background
 * @param {(selection: string, setBackground: boolean) => void} Callback - The function to call when a new background has been selected
 * @returns {void} - Nothing
 */
declare function BackgroundSelectionMake(Tags: BackgroundTag[], Name: string, Callback: (selection: string, setBackground: boolean) => void): void;
/**
 * Comapres two backgrounds by their description
 * @param {string} a - The name of the first background
 * @param {string} b - The name of the second background
 * @returns {number} - Returns -1 if the description of object a is less then that of b, 1 otherwise
 */
declare function BackgroundSelectionSort(a: string, b: string): number;
declare function BackgroundSelectionLoad(): Promise<void>;
declare function BackgroundSelectionUnload(): void;
/**
 * Handles input in the text box in the topmost row of the selection screen
 * and changes the offset of the background selection appropriately
 * @returns {void} - Nothing
 */
declare function BackgroundSelectionInputChanged(): void;
/**
 * When a new value is selected in the tag selection drop-down, we refresh the displayed background
 * @this {HTMLSelectElement}
 * @returns {void} - Nothing
 */
declare function BackgroundSelectionTagChanged(this: HTMLSelectElement): void;
declare function BackgroundSelectionResize(load: boolean): void;
/**
 * Draws the Background selection screen:
 * - draws all the buttons and the text input field on the topmost rows
 * - paints the first (max) 12 possible backgrounds in the lower part of the screen
 * The function is called dynamically
 * @returns {void} - Nothing
 */
declare function BackgroundSelectionRun(): void;
/**
 * Handles clicks in the background selection screen:
 * - Exit: Exit the screen without changes
 * - Accept: Exit the screen with a new background
 * - Prev: Paints the previous 12 backgrounds
 * - Next: Paints the nextt 12 backgrounds
 * - Click on any background: Sets this background for selection
 * This function is called dynamically
 *
 * @returns {void} - Nothing
 */
declare function BackgroundSelectionClick(): void;
declare function BackgroundSelectionKeyDown(event: KeyboardEvent): boolean;
/**
 * Handles the exit of the selection screen. Sets the new background, if necessary, and
 * calls the previously defined callback function. Then exits the screen to the screen, the player was before
 * @satisfies {ScreenExitHandler}
 * @param {boolean} SetBackground - Defines, wether the background must be changed (true) or not (false)
 */
declare function BackgroundSelectionExit(SetBackground?: boolean): void;
declare var BackgroundSelectionBackground: string;
/** @type {string[]} */
declare var BackgroundSelectionList: string[];
/** @type {BackgroundTag[]} */
declare var BackgroundSelectionTagList: BackgroundTag[];
declare var BackgroundSelectionIndex: number;
/** @type {string | null} */
declare var BackgroundSelectionSelect: string | null;
declare var BackgroundSelectionSize: number;
declare var BackgroundSelectionOffset: number;
/** @type {null | ((selection: string, setBackground: boolean) => void)} */
declare var BackgroundSelectionCallback: null | ((selection: string, setBackground: boolean) => void);
/** @type {never} */
declare var BackgroundSelectionReturnScreen: never;
/** @type {never} */
declare var BackgroundSelectionAll: never;
/** @type {string[]} */
declare var BackgroundSelectionView: string[];
declare namespace Background {
    namespace elementID {
        let root: string;
        let searchFilter: string;
        let tagFilter: string;
        let btnPrev: string;
        let btnNext: string;
        let btnCancel: string;
        let btnAccept: string;
    }
}
