/**
 * Handles the value of a HTML element. It sets the value of the element when the Value parameter is provided or it returns the value when the parameter is omitted
 * @param {string | null} ID - The id of the element for which we want to get/set the value.
 * @param {string} [Value] - The value to give to the element (if applicable)
 * @returns {string} - The value of the element (When no value parameter was passed to the function)
 */
declare function ElementValue(ID: string | null, Value?: string): string;
/**
 * Disable all clickable elements within `root` for the given duration.
 * @param {Element} root - The root element
 * @param {null | string} [query] - The query for identifying all clickable elements within `root`
 * @param {number} [timeout] - The timeout in ms
 * @returns {number} - The timeout ID as returned by {@link setTimeout}
 */
declare function ElementClickTimeout(root: Element, query?: null | string, timeout?: number): number;
/**
 * Handles the content of a HTML element. It sets the content of the element when the Content parameter is provided or it returns the value when the parameter is omitted
 * @param {string | null} ID - The id of the element for which we want to get/set the value.
 * @param {string} [Content] - The content/inner HTML to give to the element (if applicable)
 * @returns {string} - The content of the element (When no Content parameter was passed to the function)
 */
declare function ElementContent(ID: string | null, Content?: string): string;
/**
 * @template {keyof HTMLElementScalarTagNameMap} T
 * @param {HTMLOptions<T>} options - Options for customizing the element
 * @returns {HTMLElementTagNameMap[T]} - The created element
 */
declare function ElementCreate<T extends keyof HTMLElementScalarTagNameMap>(options: HTMLOptions<T>): HTMLElementTagNameMap[T];
/**
 * Creates a new from element in the main document.
 *
 * @param {string | null} ID - The id of the form to create
 * @returns {HTMLFormElement}
 */
declare function ElementCreateForm(ID: string | null): HTMLFormElement;
/**
 * Creates a new text area element in the main document. Does not create a new element if there is already an existing one with the same ID
 * @param {string | null} ID - The id of the text area to create.
 * @param {HTMLElement} [form] - The form the element belongs to
 * @returns {HTMLTextAreaElement}
 */
declare function ElementCreateTextArea(ID: string | null, form?: HTMLElement): HTMLTextAreaElement;
/**
 * Blur event listener for `number`-based `<input>` elements that automatically sanitizes the input value the moment the element is deselected.
 * @this {HTMLInputElement}
 * @param {FocusEvent} event
 */
declare function ElementNumberInputBlur(this: HTMLInputElement, event: FocusEvent): void;
/**
 * Wheel event listener for `number`-based `<input>` elements. Allows one to increment/decrement the value
 * @this {HTMLInputElement}
 * @param {WheelEvent} event
 */
declare function ElementNumberInputWheel(this: HTMLInputElement, event: WheelEvent): void;
/**
 * Creates a new text input element in the main document.Does not create a new element if there is already an existing one with the same ID
 * @param {string | null} ID - The id of the input tag to create.
 * @param {string} Type - Type of the input tag to create.
 * @param {string} Value - Value of the input tag to create.
 * @param {string | number} [MaxLength] - Maximum input tag of the input to create.
 * @param {Node} [form] - The form the element belongs to
 * @returns {HTMLInputElement} - The created HTML input element
 */
declare function ElementCreateInput(ID: string | null, Type: string, Value: string, MaxLength?: string | number, form?: Node): HTMLInputElement;
/**
 * Creates a new range input element in the main document. Does not create a new element if there is already an
 * existing one with the same id
 * @param {string | null} id - The id of the input tag to create
 * @param {number} value - The initial value of the input
 * @param {number} min - The minimum value of the input
 * @param {number} max - The maximum value of the input
 * @param {number} step - The increment size of the input
 * @param {ThumbIcon} [thumbIcon] - The icon to use for the range input's "thumb" (handle). If not set, the slider will
 * have a default appearance with no custom thumb.
 * @param {boolean} [vertical] - Whether this range input is a vertical slider (defaults to false)
 * @returns {HTMLInputElement} - The created HTML input element
 */
declare function ElementCreateRangeInput(id: string | null, value: number, min: number, max: number, step: number, thumbIcon?: ThumbIcon, vertical?: boolean): HTMLInputElement;
/**
 * Construct a `<select>`-based dropdown menu.
 * @param {string | null} id - The name of the select item.
 * @param {readonly (string | Omit<HTMLOptions<"option">, "tag">)[]} optionsList - The list of options for the current select statement. Can be supplied as a simple string or a more extensive `<option>` config.
 * @param {(this: HTMLSelectElement, event: Event) => any} onChange - An event listener to be called, when the value of the drop down box changes
 * @param {null | { required?: boolean, multiple?: boolean, disabled?: boolean, size?: number }} [options] - Additional `<select>`-specific properties
 * @param {null | Partial<Record<"select", Omit<HTMLOptions<"select">, "tag">>>} htmlOptions - Additional {@link ElementCreate} options to-be applied to the respective (child) element
 * @returns {HTMLSelectElement} - The created element
 */
declare function ElementCreateDropdown(id: string | null, optionsList: readonly (string | Omit<HTMLOptions<"option">, "tag">)[], onChange: (this: HTMLSelectElement, event: Event) => any, options?: null | {
    required?: boolean;
    multiple?: boolean;
    disabled?: boolean;
    size?: number;
}, htmlOptions?: null | Partial<Record<"select", Omit<HTMLOptions<"select">, "tag">>>): HTMLSelectElement;
/**
 * Creates a new div element in the main document. Does not create a new element if there is already an existing one with the same ID
 * @param {string | null} ID - The id of the div tag to create.
 * @returns {HTMLDivElement} - The created (or pre-existing) div element
 */
declare function ElementCreateDiv(ID: string | null): HTMLDivElement;
/**
 * Removes an element from the main document
 * @param {ElementHelp.ElementOrId} elementOrId - The id of the tag to remove from the document.
 * @returns {void} - Nothing
 */
declare function ElementRemove(elementOrId: ElementHelp.ElementOrId): void;
/**
 * Draws an existing HTML element at a specific position within the document. The element is "centered" on the given coordinates by dividing its height and width by two.
 * @param {ElementHelp.ElementOrId} ElementOrID - The id of the input tag to (re-)position.
 * @param {number} X - Center point of the element on the X axis.
 * @param {number} Y - Center point of the element on the Y axis.
 * @param {number} W - Width of the element.
 * @param {number} [H] - Height of the element.
 * @returns {void} - Nothing
 */
declare function ElementPosition(ElementOrID: ElementHelp.ElementOrId, X: number, Y: number, W: number, H?: number): void;
/**
 * Draws an existing HTML element at a specific position within the document. The element will not be centered on its given coordinates unlike the ElementPosition function.
 * Not same as ElementPositionFix. Calculates Font size itself.
 * @param {ElementHelp.ElementOrId} ElementOrID - The id of the input tag to (re-)position or the element itself.
 * @param {number} X - Starting point of the element on the X axis.
 * @param {number} Y - Starting point of the element on the Y axis.
 * @param {number} W - Width of the element.
 * @param {number} [H] - Height of the element.
 * @param {ElementHelp.AnchorXY} [anchorPosition]
 * @returns {void} - Nothing
 */
declare function ElementPositionFixed(ElementOrID: ElementHelp.ElementOrId, X: number, Y: number, W: number, H?: number, anchorPosition?: ElementHelp.AnchorXY): void;
/**
 * Draws an existing HTML element at a specific position within the document. The element will not be centered on its given coordinates unlike the ElementPosition function.
 * @param {ElementHelp.ElementOrId} ElementOrID - The id of the input tag to (re-)position.
 * @param {number} Font - The size of the font to use.
 * @param {number} X - Starting point of the element on the X axis.
 * @param {number} Y - Starting point of the element on the Y axis.
 * @param {number} W - Width of the element.
 * @param {number} H - Height of the element.
 * @param {ElementHelp.AnchorXY} [anchorPosition]
 * @returns {void} - Nothing
 */
declare function ElementPositionFix(ElementOrID: ElementHelp.ElementOrId, Font: number, X: number, Y: number, W: number, H: number, anchorPosition?: ElementHelp.AnchorXY): void;
/**
 * Sets a custom data-attribute to a specified value on a specified element
 * @param {ElementHelp.ElementOrId} ElementOrId - The id of the element to create/set the data attribute of.
 * @param {string} Name - Name of the data attribute. ("data-" will be automatically appended to it.)
 * @param {string} Value - Value to give to the attribute.
 * @returns {void} - Nothing
 */
declare function ElementSetDataAttribute(ElementOrId: ElementHelp.ElementOrId, Name: string, Value: string): void;
/**
 * Sets an attribute to a specified value on a specified element
 * @param {ElementHelp.ElementOrId} ElementOrId - The id of the element to create/set the data attribute of.
 * @param {string} Name - Name of the attribute.
 * @param {string} Value - Value to give to the attribute.
 * @returns {void} - Nothing
 */
declare function ElementSetAttribute(ElementOrId: ElementHelp.ElementOrId, Name: string, Value: string): void;
/**
 * Removes an attribute from a specified element.
 * @param {ElementHelp.ElementOrId} ElementOrId - The id of the element from which to remove the attribute.
 * @param {string} Name - Name of the attribute to remove.
 * @returns {void} - Nothing
 */
declare function ElementRemoveAttribute(ElementOrId: ElementHelp.ElementOrId, Name: string): void;
/**
 * Scrolls to the end of a specified element
 * @param {ElementHelp.ElementOrId} ElementOrId - The id of the element to scroll down to the bottom of.
 * @returns {void} - Nothing
 */
declare function ElementScrollToEnd(ElementOrId: ElementHelp.ElementOrId): void;
/**
 * Returns the given element's scroll position as a percentage, with the top of the element being close to 0 depending on scroll bar size, and the bottom being around 1.
 * To clarify, this is the position of the bottom edge of the scroll bar.
 * @param {ElementHelp.ElementOrId} ElementOrId - The id of the element to find the scroll percentage of.
 * @returns {(number|null)} - A float representing the scroll percentage.
 */
declare function ElementGetScrollPercentage(ElementOrId: ElementHelp.ElementOrId): (number | null);
/**
 * Checks if a given HTML element is scrolled to the very bottom.
 * @param {ElementHelp.ElementOrId} ElementOrId - The id of the element to check for scroll height.
 * @returns {boolean} - Returns TRUE if the specified element is scrolled to the very bottom
 */
declare function ElementIsScrolledToEnd(ElementOrId: ElementHelp.ElementOrId): boolean;
/**
 * Sets the scroll position of an element to a specified percentage of its scrollable content.
 * Ideally scroll percentage should be gotten with {@link ElementGetScrollPercentage}
 *
 * @param {ElementHelp.ElementOrId} ElementOrId
 * @param {number} scrollPercentage
 * @param {ScrollBehavior} scrollBehavior
 * @returns {void}
 */
declare function ElementSetScrollPercentage(ElementOrId: ElementHelp.ElementOrId, scrollPercentage: number, scrollBehavior?: ScrollBehavior): void;
/**
 * Gives focus to a specified existing element for non-mobile users.
 * @param {ElementHelp.ElementOrId} ElementOrId - The id of the element to give focus to.
 * @returns {void} - Nothing
 */
declare function ElementFocus(ElementOrId: ElementHelp.ElementOrId): void;
/**
 * Toggles (non-nested) HTML elements that were created by a given screen. When toggled off, they are hidden (not removed)
 * @param {string} Screen - Screen for which to hide the elements generated
 * @param {boolean} ShouldDisplay - TRUE if we are toggling on the elements, FALSE if we are hiding them.
 */
declare function ElementToggleGeneratedElements(Screen: string, ShouldDisplay: boolean): void;
/**
 * Construct a search-based `<input>` element that offers suggestions based on the passed callbacks output.
 *
 * The search suggestions are constructed lazily once the search input is focused.
 * @example
 * <input type="search" id={id} list={`${id}-datalist`}>
 *     <datalist id={`${id}-datalist`}>
 *         <option value="..." />
 *         ...
 *     </datalist>
 * </input>
 * @param {string | null} id - The ID of the to-be created search input; `${id}-datalist` will be assigned the search input's datalist
 * @param {() => Iterable<string>} dataCallback - A callback returning all values that will be converted into a datalist `<option>`
 * @param {Object} [options]
 * @param {null | string} [options.value] - Value of the search input
 * @param {null | Node} [options.parent] - The parent element of the search input; defaults to {@link document.body}
 * @param {null | number} [options.maxLength] - Maximum input length of the search input
 * @returns {HTMLInputElement} - The newly created search input
 */
declare function ElementCreateSearchInput(id: string | null, dataCallback: () => Iterable<string>, options?: {
    value?: null | string;
    parent?: null | Node;
    maxLength?: null | number;
}): HTMLInputElement;
/**
 * Returns the element's document- or shadow-root.
 *
 * If an element is not part of the DOM tree, thus lacking a document- or shadow-root, then {@link document} is returned.
 * @param {Node} elem
 * @returns {Document | ShadowRoot}
 */
declare function ElementGetRoot(elem: Node): Document | ShadowRoot;
/**
 * Return whether an element is visible or not.
 *
 * Approximate polyfill of [`Element.checkVisibility()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/checkVisibility),
 * as its browser support is still somewhat limited (~88% at the time of writing).
 * @param {Element} el - The element in question
 * @param {CheckVisibilityOptions} [options] - Additional options to-be passed to `Element.checkVisibility()`
 * @returns {boolean} - Whether the passed element is visible or not
 */
declare function ElementCheckVisibility(el: Element, options?: CheckVisibilityOptions): boolean;
/**
 * Get an element by its ID or DOM element reference, returning null if it does not exist.
 * @param {ElementHelp.ElementOrId} elementOrId
 * @returns { HTMLElement | null }
 */
declare function ElementWrap(elementOrId: ElementHelp.ElementOrId): HTMLElement | null;
/**
 * Scales a given height value relative to the current canvas height.
 * @param {number} height
 * @returns {number}
 */
declare function ElementCanvasScaledHeight(height: number): number;
/**
 * Scales a given width value relative to the current canvas width.
 * @param {number} width
 * @returns {number}
 */
declare function ElementCanvasScaledWidth(width: number): number;
/**
 * Calculates the Y position on the canvas in pixels, accounting for anchor alignment.
 * @param {number} yPos
 * @param {ElementHelp.AnchorY} anchorPosition
 * @returns {number}
 */
declare function ElementCanvasScaledY(yPos: number, anchorPosition?: ElementHelp.AnchorY): number;
/**
 * Calculates the X position on the canvas in pixels, accounting for anchor alignment.
 * @param {number} xPos
 * @param {ElementHelp.AnchorX} anchorPosition
 * @returns {number}
 */
declare function ElementCanvasScaledX(xPos: number, anchorPosition?: ElementHelp.AnchorX): number;
/**
 * Positions an HTML element on the canvas relative to a specified anchor.
 * @param {ElementHelp.ElementOrId} elementOrId
 * @param {number} xPos
 * @param {number} yPos
 * @param {ElementHelp.AnchorXY} [anchorPosition]
 */
declare function ElementSetPosition(elementOrId: ElementHelp.ElementOrId, xPos?: number, yPos?: number, anchorPosition?: ElementHelp.AnchorXY): void;
/**
 * Sets the width and/or height of an element relative to the canvas scale.
 * @param {ElementHelp.ElementOrId} elementOrId
 * @param {number | null} width
 * @param {number | null} height
 */
declare function ElementSetSize(elementOrId: ElementHelp.ElementOrId, width?: number | null, height?: number | null): void;
/**
 * Sets the font size of an element scaled relative to the smaller canvas dimension.
 * @param {ElementHelp.ElementOrId} elementOrId
 * @param {number | 'auto'} targetFontSize
 */
declare function ElementSetFontSize(elementOrId: ElementHelp.ElementOrId, targetFontSize?: number | "auto"): void;
declare function ElementGenerateID(): string;
/** @satisfies {ElementNoParent} */
declare const ElementNoParent: 0;
declare namespace ElementCheckboxDropdown {
    /**
     * @param {string} idPrefix
     * @param {string} idSuffix
     * @param {string} spanText
     * @param {(this: HTMLInputElement, event: Event) => void} listener
     * @param {boolean} checked
     * @returns {HTMLOptions<"label">}
     */
    function _CreateCheckboxPair(idPrefix: string, idSuffix: string, spanText: string, listener: (this: HTMLInputElement, event: Event) => void, checked?: boolean): HTMLOptions<"label">;
    /**
     * Construct a dropdown menu with labeled checkboxes
     * @param {string | null} id - The ID of the element
     * @param {readonly string[]} checkboxList - The checkbox labels
     * @param {(this: HTMLInputElement, event: Event) => void} eventListener - The event listener to-be attached to all checkboxes
     * @param {Object} [options]
     * @param {HTMLElement} [options.parent] - The parent element of the dropdown menu; defaults to {@link document.body}
     * @param {boolean} [options.checked] - Whether all checkboxes should be initially checked
     * @returns {HTMLDivElement} - The created dropdown menu
     */
    function FromList(id: string | null, checkboxList: readonly string[], eventListener: (this: HTMLInputElement, event: Event) => void, options?: {
        parent?: HTMLElement;
        checked?: boolean;
    }): HTMLDivElement;
    /**
     * Construct a dropdown menu with labeled checkboxes, each group of checkboxes having a header associated with them
     * @param {string | null} id - The ID of the element
     * @param {Record<string, readonly string[]>} checkboxRecord - The checkbox labels
     * @param {(this: HTMLInputElement, event: Event) => void} eventListener - The event listener to-be attached to all checkboxes
     * @param {Object} [options]
     * @param {HTMLElement} [options.parent] - The parent element of the dropdown menu; defaults to {@link document.body}
     * @param {boolean} [options.checked] - Whether all checkboxes should be initially checked
     * @returns {HTMLDivElement} - The created dropdown menu
     */
    function FromRecord(id: string | null, checkboxRecord: Record<string, readonly string[]>, eventListener: (this: HTMLInputElement, event: Event) => void, options?: {
        parent?: HTMLElement;
        checked?: boolean;
    }): HTMLDivElement;
}
declare namespace ElementButton {
    let _TooltipPositions: Readonly<{
        left: "button-tooltip-left";
        right: "button-tooltip-right";
        top: "button-tooltip-top";
        bottom: "button-tooltip-bottom";
    }>;
    let _LabelPositions: Readonly<{
        top: "button-label-top";
        center: "button-label-center";
        bottom: "button-label-bottom";
    }>;
    let _KeyDown: (this: HTMLButtonElement, ev: KeyboardEvent) => Promise<void>;
    let _KeyUp: (this: HTMLButtonElement, ev: KeyboardEvent) => Promise<void>;
    function _MouseDown(this: HTMLButtonElement, ev: MouseEvent): void;
    function _MouseUp(this: Document | ShadowRoot, ev: MouseEvent): void;
    function _GetClickTouchListeners(): {
        click: (this: HTMLButtonElement, ev: MouseEvent | PointerEvent) => void;
        touchend: (this: HTMLButtonElement, ev: TouchEvent) => void;
        touchmove: (this: HTMLButtonElement, ev: TouchEvent) => void;
        touchstart: (this: HTMLButtonElement, ev: TouchEvent) => void;
        blur: (this: HTMLButtonElement, ev: FocusEvent) => void;
        bcTouchHold: (this: HTMLButtonElement, ev: MouseEvent | PointerEvent) => void;
        touchcancel: (this: HTMLButtonElement, ev: TouchEvent) => void;
    };
    function _QueryDFS(root: Element, query: string, filter: (el: Element) => boolean): Generator<Element, void>;
    function _ClickRadio(this: HTMLButtonElement, ev: Event): void;
    function _ClickSpin(this: HTMLButtonElement, ev: MouseEvent): void;
    function _KeyDownSpin(this: HTMLButtonElement, ev: KeyboardEvent): void;
    /**
     * @this {HTMLElement}
     * @param {KeyboardEvent} ev
     */
    function _KeyDownRadio(this: HTMLElement, ev: KeyboardEvent): void;
    function _ClickCheckbox(this: HTMLButtonElement, ev: Event): void;
    /**
     * @private
     * @param {string} id
     * @param {string} [img]
     * @param {Omit<HTMLOptions<"img">, "tag">} [options]
     * @returns {HTMLImageElement}
     */
    function _ParseImage(id: string, img?: string, options?: Omit<HTMLOptions<"img">, "tag">): HTMLImageElement;
    /**
     * @private
     * @param {string} id
     * @param {ElementButton.StaticNode} [label]
     * @param {"top" | "center" | "bottom"} [position]
     * @param {Omit<HTMLOptions<"span">, "tag">} [options]
     * @returns {HTMLSpanElement}
     */
    function _ParseLabel(id: string, label?: ElementButton.StaticNode, position?: "top" | "center" | "bottom", options?: Omit<HTMLOptions<"span">, "tag">): HTMLSpanElement;
    /**
     * Parse the passed icon list, returning its corresponding `<img>` grid and tooltip if non-empty
     * @param {string} id - The ID of the parent element
     * @param {readonly (InventoryIcon | ElementButton.CustomIcon)[]} [icons] - The (optional) list of icons
     * @returns {null | { iconGrid: HTMLDivElement, tooltip: [string, HTMLElement] }} - `null` if the provided icon list is empty and otherwise an object containing the icon grid and a icon-specific tooltip
     */
    function _ParseIcons(id: string, icons?: readonly (InventoryIcon | ElementButton.CustomIcon)[]): null | {
        iconGrid: HTMLDivElement;
        tooltip: [string, HTMLElement];
    };
    /**
     * @private
     * @param {string} id
     * @param {"left" | "right" | "top" | "bottom"} [position]
     * @param {readonly (null | string | Node | HTMLOptions<any>)[]} [children]
     * @param {Omit<HTMLOptions<"div">, "tag">} [options]
     * @returns {null | HTMLDivElement}
     */
    function _ParseTooltip(id: string, position?: "left" | "right" | "top" | "bottom", children?: readonly (null | string | Node | HTMLOptions<any>)[], options?: Omit<HTMLOptions<"div">, "tag">): null | HTMLDivElement;
    /**
     * Create a generic button.
     * @param {null | string} id - The ID of the to-be created search button
     * @param {(this: HTMLButtonElement, ev: MouseEvent | TouchEvent) => any} onClick - The click event listener to-be attached to the tooltip
     * @param {null | ElementButton.Options} [options] - High level options for the to-be created button
     * @param {null | Partial<Record<"button" | "tooltip" | "img" | "label", Omit<HTMLOptions<any>, "tag">>>} htmlOptions - Additional low-level {@link ElementCreate} options to-be applied to the either the button or tooltip
     * @returns {HTMLButtonElement} - The created button
     */
    function Create(id: null | string, onClick: (this: HTMLButtonElement, ev: MouseEvent | TouchEvent) => any, options?: null | ElementButton.Options, htmlOptions?: null | Partial<Record<"button" | "tooltip" | "img" | "label", Omit<HTMLOptions<any>, "tag">>>): HTMLButtonElement;
    /**
     * Create a button for an asset or item, including image, label and icons.
     * @param {string | null} idPrefix - The ID of the to-be created search button
     * @param {Asset | Item} asset - The asset (or item) for which to create a button
     * @param {null | Character} C - The character wearing the asset/item (if any)
     * @param {(this: HTMLButtonElement, ev: MouseEvent | TouchEvent) => any} onClick - The click event listener to-be attached to the tooltip
     * @param {null | ElementButton.Options} [options] - High level options for the to-be created button
     * @param {null | Partial<Record<"button" | "tooltip" | "img" | "label", Omit<HTMLOptions<any>, "tag">>>} htmlOptions - Additional low-level {@link ElementCreate} options to-be applied to the either the button or tooltip
     * @returns {HTMLButtonElement} - The created button
     */
    function CreateForAsset(idPrefix: string | null, asset: Asset | Item, C: null | Character, onClick: (this: HTMLButtonElement, ev: MouseEvent | TouchEvent) => any, options?: null | ElementButton.Options, htmlOptions?: null | Partial<Record<"button" | "tooltip" | "img" | "label", Omit<HTMLOptions<any>, "tag">>>): HTMLButtonElement;
    /**
     * @param {CraftingItem} craft
     * @returns {HTMLElement[]}
     */
    function CreateCraftTooltipContent(craft: CraftingItem): HTMLElement[];
    /**
     * Create a button for an activity, including image, label and icons.
     * @param {string | null} idPrefix - The ID of the to-be created search button
     * @param {ItemActivity} activity - The activity for which to create a button
     * @param {Character} C - The target character of the activity
     * @param {(this: HTMLButtonElement, ev: MouseEvent | TouchEvent) => any} onClick - The click event listener to-be attached to the tooltip
     * @param {null | ElementButton.Options} [options] - High level options for the to-be created button
     * @param {null | Partial<Record<"button" | "tooltip" | "img" | "label", Omit<HTMLOptions<any>, "tag">>>} htmlOptions - Additional low-level {@link ElementCreate} options to-be applied to the either the button or tooltip
     * @returns {HTMLButtonElement} - The created button
     */
    function CreateForActivity(idPrefix: string | null, activity: ItemActivity, C: Character, onClick: (this: HTMLButtonElement, ev: MouseEvent | TouchEvent) => any, options?: null | ElementButton.Options, htmlOptions?: null | Partial<Record<"button" | "tooltip" | "img" | "label", Omit<HTMLOptions<any>, "tag">>>): HTMLButtonElement;
    /**
     * Reload the icons of the passed {@link ElementButton.CreateForAsset} button based on the items & characters current state.
     * @param {HTMLButtonElement} button - The button in question
     * @param {Asset | Item} asset - The asset (or item) for linked to the button
     * @param {null | Character} C - The character wearing the asset/item (if any)
     * @returns {boolean} - Whether the icons were updated or not
     */
    function ReloadAssetIcons(button: HTMLButtonElement, asset: Asset | Item, C: null | Character): boolean;
}
declare namespace ElementMenu {
    export function _KeyDown_1(this: HTMLElement, ev: KeyboardEvent): Promise<void>;
    export { _KeyDown_1 as _KeyDown };
    /**
     * Construct a menubar of button elements
     * @example
     * <div id={id} role="menubar">
     *     <button role="menuitem" />
     *     <input role="menuitem" type="text" />
     *     <button role="menuitem" aria-haspopup="menu">
     *         <div style={ display: "none" }>
     *             <button role="menuitem" />
     *             <button role="menuitem" />
     *             ...
     *         </div>
     *     </button>
     *     ...
     * </div>
     * @param {string | null} id - The menu's ID
     * @param {readonly (string | Node | HTMLOptions<keyof HTMLElementTagNameMap>)[]} menuItems - The menu's content.
     * Any `<button>` element without a role (regardless of nesting) will be assigned the `menuitem` role and thus be elligble for menu-style navigation.
     * Buttons that open a sub-menu _must_ have the `aria-haspopup: "menu"` attribute set and must be able to do so via a click action.
     * @param {Object} [options]
     * @param {"ltr" | "rtl"} [options.direction] - The direction of the menu. Should match the value of the CSS `direction` property if provided
     * @param {"menubar" | "menu"} [options.role] - The role of the menu/menubar
     * @param {null | Partial<Record<"menu", Omit<HTMLOptions<any>, "tag">>>} htmlOptions - Additional {@link ElementCreate} options to-be applied to the respective (child) element
     * @returns {HTMLDivElement} - The menu
     */
    export function Create(id: string | null, menuItems: readonly (string | Node | HTMLOptions<keyof HTMLElementTagNameMap>)[], options?: {
        direction?: "ltr" | "rtl";
        role?: "menubar" | "menu";
    }, htmlOptions?: null | Partial<Record<"menu", Omit<HTMLOptions<any>, "tag">>>): HTMLDivElement;
    /**
     * Append a menuitem to the passed menubar
     * @param {HTMLElement} menu - The menubar
     * @param {readonly HTMLElement[]} menuitems - The to-be prepended menuitem
     */
    export function AppendButton(menu: HTMLElement, ...menuitems: readonly HTMLElement[]): void;
    /**
     * Prepend a menuitem to the passed menubar
     * @param {HTMLElement} menu - The menubar
     * @param {readonly HTMLElement[]} menuitems - The to-be prepended menuitem
     */
    export function PrependItem(menu: HTMLElement, ...menuitems: readonly HTMLElement[]): void;
}
declare namespace ElementCheckbox {
    function _pointerdown(this: HTMLInputElement, ev: PointerEvent): void;
    function _pointerup(this: Document | ShadowRoot, ev: PointerEvent): void;
    /**
     * Construct an return a DOM checkbox element (`<input type="checkbox">`)
     * @param {null | string} id - The ID of the element, or `null` if one must be assigned automatically
     * @param {null | ((this: HTMLInputElement, ev: Event) => any)} onChange - The change event listener to-be fired upon checkbox clicks
     * @param {null | ElementCheckbox.Options} options - High level options for the to-be created checkbox
     * @param {null | Partial<Record<"checkbox", Omit<HTMLOptions<any>, "tag">>>} htmlOptions - Additional {@link ElementCreate} options to-be applied to the respective (child) element
     */
    function Create(id?: null | string, onChange?: null | ((this: HTMLInputElement, ev: Event) => any), options?: null | ElementCheckbox.Options, htmlOptions?: null | Partial<Record<"checkbox", Omit<HTMLOptions<any>, "tag">>>): HTMLElement;
}
declare namespace ElementSwipe {
    /**
     * @param {HTMLElement} elem
     * @param {null | ElementSwipe.Options} options
     */
    function setListeners(elem: HTMLElement, options?: null | ElementSwipe.Options): void;
}
declare namespace ElementDOMScreen {
    /**
     * Construct and return a template for a basic DOM screen.
     *
     * Important points:
     * * Screen dimensions of `[x, 0, y, 1000]` are generally recommended
     * * The standard child elements of the to-be returned screen _may_ freely be moved around in the DOM tree as one sees fit
     * * The standard child elements of the to-be returned screen _should_ not be removed; do so at your own risk. They _may_ remain unused however.
     * @example
     * <div id="my-fancy-id" class="screen">
     *     <!--
     *         The first row: a banner containing a menubar,
     *         the latter of which _should_ contain an exit button as its first entry
     *     -->
     *     <header class="screen-header">
     *         <div role="menubar" />
     *     </header>
     *
     *     <!--
     *         The second row: the screen's main heading/label/description
     *         and a dedicated field for anyand all temporary status messages (see `ElementDOMScreen.SetStatus()`)
     *     -->
     *     <hgroup class="screen-hgroup">
     *         <h1 />
     *         <p role="status" />
     *     </hgroup>
     *
     *     <!--
     *         The third and final row: a scrollable section with the main content of the screen.
     *         As a rule of thumb, it is recommended to embed the immediate child elements into some sort of
     *         grouping element like `<fieldset>`, `<section>` and/or `<article>`.
     *     -->
     *     <main class="screen-main" />
     * </div>
     * @param {string} id - The ID of the screen
     * @param {null | ElementDOMScreen.TemplateOptions} options - Further customization options
     * @returns {HTMLDivElement} - The newly created DOM screen
     */
    function getTemplate(id: string, options?: null | ElementDOMScreen.TemplateOptions): HTMLDivElement;
    let _statusIDMap: WeakMap<Element, number>;
    /**
     * Timer handler for {@link ElementDOMScreen.SetStatus}
     * @private
     * @satisfies {TimerHandler}
     * @param {Element} headingElem The screen's `h1` element
     * @param {Element} statusElem The screen's `[role='status']` element
     */
    function _setStatusTimerHandler(headingElem: Element, statusElem: Element): void;
    /**
     * Set a temporary status message for the screen.
     * @param {HTMLElement} root The screen on which the status is the be set; it _must_ contain a single `h1` and `[role='status']` element
     * @param {string} status The to-be displayed status message
     * @param {number} timeout How long the status message should be shown in ms; defaults to 5000 ms
     */
    function setStatus(root: HTMLElement, status: string, timeout?: number): void;
}
