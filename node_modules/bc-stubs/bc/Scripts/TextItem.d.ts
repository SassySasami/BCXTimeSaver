/**
 * Registers a typed extended item. This automatically creates the item's load, draw and click functions.
 * @param {Asset} asset - The asset being registered
 * @param {TextItemConfig} config - The item's typed item configuration
 * @param {null | ExtendedItemOption} parentOption
 * @param {boolean} createCallbacks - Whether the archetype-specific callbacks should be created or not
 * @returns {TextItemData} - The generated extended item data for the asset
 */
declare function TextItemRegister(asset: Asset, config: TextItemConfig, parentOption?: null | ExtendedItemOption, createCallbacks?: boolean): TextItemData;
/**
 * Parse the passed text item draw data as passed via the extended item config
 * @param {readonly TextItemNames[]} fieldNames
 * @param {ExtendedItemConfigDrawData<{}> | undefined} drawData - The to-be parsed draw data
 * @return {ExtendedItemDrawData<ElementMetaData.Text>} - The parsed draw data
 */
declare function TextItemGetDrawData(fieldNames: readonly TextItemNames[], drawData: ExtendedItemConfigDrawData<{}> | undefined): ExtendedItemDrawData<ElementMetaData.Text>;
/**
 * Generates an asset's typed item data
 * @param {Asset} asset - The asset to generate modular item data for
 * @param {TextItemConfig} config - The item's extended item configuration
 * @param {null | ExtendedItemOption} parentOption - The parent extended item option of the super screens (if any)
 * @returns {TextItemData} - The generated typed item data for the asset
 */
declare function TextItemCreateTextItemData(asset: Asset, { MaxLength, Font, DialogPrefix, ChatTags, Dictionary, ScriptHooks, BaselineProperty, EventListeners, DrawData, PushOnPublish, AllowEffect, Name, }: TextItemConfig, parentOption?: null | ExtendedItemOption): TextItemData;
/**
 * @param {TextItemData} data - The extended item data
 * @param {Item} item - The item in question
 * @returns {{ newOption: TextItemOption, previousOption: TextItemOption }}
 */
declare function TextItemConstructOptions(data: TextItemData, item: Item): {
    newOption: TextItemOption;
    previousOption: TextItemOption;
};
/**
 * Revert all text item properties back to their previous state prior to opening the extended item menu
 * @param {TextItemData} data - The extended item data
 * @param {Item} item - The item in question
 */
declare function TextItemPropertyRevert({ textNames }: TextItemData, item: Item): void;
/**
 * A lookup for the text item configurations for each registered text item
 * @const
 * @type {Record<string, TextItemData>}
 * @see {@link TextItemData}
 */
declare const TextItemDataLookup: Record<string, TextItemData>;
declare namespace TextItem {
    /**
     * Init function for items with text input fields.
     * @param {TextItemData} data
     * @param {Character} C — The character that has the item equiped
     * @param {Item} item — The item in question
     * @param {boolean} push - Whether to push to changes to the server
     * @param {boolean} refresh - Whether to refresh the character. This should generally be `true`, with custom script hooks being a potential exception.
     * @returns {boolean} Whether properties were updated or not
     */
    function Init({ asset, font, baselineProperty, maxLength }: TextItemData, C: Character, item: Item, push?: boolean, refresh?: boolean): boolean;
    /**
     * Load function for items with text input fields.
     * @param {TextItemData} data
     */
    function Load(data: TextItemData): void;
    /**
     * Draw handler for extended item screens with text input fields.
     * @param {TextItemData} data - The items extended item data
     */
    function Draw(data: TextItemData): void;
    /**
     * Exit function for items with text input fields.
     * @param {TextItemData} data - The items extended item data
     * @param {boolean} publishAction - Whether
     */
    function Exit(data: TextItemData, publishAction?: boolean): void;
    /**
     * PublishAction function for items with text input fields.
     * @param {TextItemData} data - The items extended item data
     * @param {Character} C - The character in question
     * @param {Item} item - The item in question
     * @param {TextItemOption} newOption
     * @param {TextItemOption} previousOption
     */
    function PublishAction(data: TextItemData, C: Character, item: Item, newOption: TextItemOption, previousOption: TextItemOption): void;
    /**
     * Usage AfterDraw: (...args) => TextItem.GenericTextDrawHook(...args, {Width: 128, Height: 128, XOffset: 0, YOffset: 10, drawOptions: { fontSize: 12 }})
     * @param {TextItemData} data
     * @param {((drawData: DynamicDrawingData<Record<string, unknown>>) => void) | null} originalFunction
     * @param {{C: Character; A: Asset; CA: Item; X: number; Y: number; Property: ItemProperties; drawCanvas: DrawCanvasCallback; drawCanvasBlink: DrawCanvasCallback; AlphaMasks: RectTuple[]; L: string; Color: string}} drawArgs
     * @param {{Width?: number; Height?: number; XOffset?: number; YOffset?: number; LayerName?: string; drawOptions?: DynamicDrawOptions;}} options
     */
    function GenericTextDrawHook(data: TextItemData, originalFunction: ((drawData: DynamicDrawingData<Record<string, unknown>>) => void) | null, { C, A, CA, X, Y, Property, drawCanvas, drawCanvasBlink, AlphaMasks, L, Color, }: {
        C: Character;
        A: Asset;
        CA: Item;
        X: number;
        Y: number;
        Property: ItemProperties;
        drawCanvas: DrawCanvasCallback;
        drawCanvasBlink: DrawCanvasCallback;
        AlphaMasks: RectTuple[];
        L: string;
        Color: string;
    }, { Width, Height, XOffset, YOffset, LayerName, drawOptions }: {
        Width?: number;
        Height?: number;
        XOffset?: number;
        YOffset?: number;
        LayerName?: string;
        drawOptions?: DynamicDrawOptions;
    }): void;
}
/**
 * Throttled callback for handling text changes.
 * @type {TextItemEventListener}
 */
declare const TextItemChange: TextItemEventListener;
/**
 * Throttled callback for handling text changes that do not require a canvas.
 * @type {TextItemEventListener}
 */
declare const TextItemChangeNoCanvas: TextItemEventListener;
