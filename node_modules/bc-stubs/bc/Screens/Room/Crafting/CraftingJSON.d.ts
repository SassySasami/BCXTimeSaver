declare namespace CraftingJSON {
    let _craftListCache: null | {
        name: string;
        status: CraftingStatusType;
        craft: null | CraftingItem;
    }[];
    /** Get the event listeners for drag and dropping */
    function getDragListeners(): {
        dragenter: (this: HTMLElement, ev: DragEvent) => void;
        dragleave: (this: HTMLElement, ev: DragEvent) => void;
        dragstart: (this: HTMLElement, ev: DragEvent) => void;
    };
    /**
     * @private
     * @param {Element} fieldset
     * @param {Element} radioContainer
     * @param {Map<{ inputNew: HTMLInputElement, inputOld: HTMLInputElement }, boolean>} checkLog
     */
    function _queueAdvance(fieldset: Element, radioContainer: Element, checkLog: Map<{
        inputNew: HTMLInputElement;
        inputOld: HTMLInputElement;
    }, boolean>): void;
    namespace eventListeners {
        function focusTooltip(this: HTMLElement): void;
        function blurTooltip(this: HTMLElement): void;
        function hoverinTooltip(this: HTMLElement): void;
        function hoveroutTooltip(this: HTMLElement): void;
        function dragover(this: HTMLElement, ev: DragEvent): void;
        function drop(this: HTMLElement, ev: DragEvent): void;
        function dragend(this: HTMLElement, ev: DragEvent): void;
        function clickCancel(this: HTMLElement): void;
        function clickAccept(this: HTMLElement, ev: Event): void;
        let changeFile: (this: HTMLInputElement) => Promise<void>;
        function inputFile(this: HTMLInputElement): void;
        function clickSelectNew(this: HTMLElement): void;
        function clickSelectOld(this: HTMLElement): void;
        function clickError(this: HTMLElement): void;
        function inputSearch(this: HTMLInputElement): void;
        function focusSearch(this: HTMLInputElement): void;
        function keydownDocument(this: Document, ev: KeyboardEvent): void;
        function pasteDocument(this: Document, ev: ClipboardEvent): void;
    }
    /**
     * Encode the passed list of crafting items into a JSON-valid object
     * @param {readonly (null | CraftingItem)[]} crafts - The list of crafting items
     * @returns {CraftingJSON.DataEncoded} The encoded object of JSON-valid crafts
     */
    function encode(crafts: readonly (null | CraftingItem)[]): CraftingJSON.DataEncoded;
    /**
     * Decode the passed stringified object of crafting JSON data
     * @param {string} craftsJSON - The stringified and to-be decoded crafted JSON data
     * @returns {CraftingJSON.ParsingOutput} - The decoded crafted JSON data
     */
    function decode(craftsJSON: string): CraftingJSON.ParsingOutput;
    /**
     * Return a single `<label>`-embedded `<input type="radio">` element
     * @param {null | CraftingItem} craft
     * @param {string} tooltipID
     * @param {{ name: string, checked: boolean, disabled: boolean, value: string }} options
     * @returns {HTMLElement}
     */
    function createRadio(craft: null | CraftingItem, tooltipID: string, options: {
        name: string;
        checked: boolean;
        disabled: boolean;
        value: string;
    }): HTMLElement;
    /**
     * Return a list of `<input type="radio">`-containing `<fieldset>` elements
     * @param {readonly { name: string, status: CraftingStatusType, craft: null | CraftingItem }[]} items
     * @param {Node} tooltipContainer
     */
    function createRadioGroups(items: readonly {
        name: string;
        status: CraftingStatusType;
        craft: null | CraftingItem;
    }[], tooltipContainer: Node): HTMLFieldSetElement[];
    /**
     * Create and return the `<dialog>` and its shadowroot-containing `<div>` parent
     * @param {null | Node} parent The parent node, if any
     */
    function createDialog(parent?: null | Node): {
        root: HTMLDivElement;
        dialog: HTMLDialogElement;
    };
}
