declare function Shop2Load(): Promise<void>;
declare function Shop2Click(event: MouseEvent | TouchEvent): void;
declare function Shop2Draw(): void;
declare function Shop2Run(time: number): void;
declare function Shop2Resize(load: boolean): void;
declare function Shop2Unload(): void;
declare function Shop2MouseWheel(event: WheelEvent): void;
declare function Shop2Exit(): void;
declare var Shop2Background: string;
declare namespace ShopDropdownState {
    let NONE: "None";
    let GROUP: "Group";
    let POSE: "Pose";
}
/**
 * Namespace with shop-specific variables that are expected to mutate over the course of the (sub-)screens lifetime
 * @namespace
 */
declare const Shop2Vars: VariableContainer<{
    /**
     * The item (if any) currently equipped in preview mode
     * @type {null | Item}
     */
    EquippedItem: null | Item;
    /**
     * The current page
     * @type {number}
     */
    Page: number;
    /**
     * Whether any item has been bought or sold, thus requiring a push to the server
     * @type {boolean}
     */
    Push: boolean;
    /**
     * The current shop mode
     * @private
     * @type {ShopMode}
     */
    _Mode: ShopMode;
    /**
     * The current dressing state of the preview character
     * @type {ShopClothesMode}
     */
    ClothesMode: ShopClothesMode;
    /**
     * All (filtered) items that can still be bought
     * @type {ShopItem[]}
     */
    BuyItems: ShopItem[];
    /**
     * All (filtered) items that can still be sold
     * @type {ShopItem[]}
     */
    SellItems: ShopItem[];
    /**
     * All (filtered) items that can be equipped in preview mode
     * @type {ShopItem[]}
     */
    PreviewItems: ShopItem[];
    /**
     * The currently active dropdown menu
     * @type {ShopDropdownState}
     */
    DropdownState: ShopDropdownState;
    /**
     * A record mapping filter ID to filter callbacks.
     * Each callback is expected to return a list denoting for which modes the item is to-be shown.
     * Note that an item will only be shown if the respective mode is included in the output list of every callback.
     * @type {Record<string, (item: ShopItem) => ("Buy" | "Sell" | "Preview")[]>}
     */
    Filters: Record<string, (item: ShopItem) => ("Buy" | "Sell" | "Preview")[]>;
}, {
    /**
     * The current shop mode
     * @type {ShopMode}
     */
    Mode: ShopMode;
    /**
     * Get the maximum number of pages for the current {@link Shop2Vars.Mode}.
     * @type {number}
     */
    readonly PageCount: number;
    /**
     * Get all <=12 assets given the current {@link Shop2Vars.Page} and {@link Shop2Vars.Mode}.
     * @type {readonly ShopItem[]}
     */
    readonly CurrentAssets: readonly ShopItem[];
}>;
/**
 * Namespace with shop-specific variables that are expected to remain constant over the course of the (sub-)screens lifetime.
 * @namespace
 */
declare const Shop2InitVars: VariableContainer<{
    /**
     * The shop background
     * @type {string}
     */
    Background: string;
    /**
     * The shop preview character
     * @type {null | Character}
     */
    Preview: null | Character;
    /**
     * The module- and screen-name of the previous screen (if any)
     * @type {null | ScreenSpecifier}
     */
    PreviousScreen: null | ScreenSpecifier;
    /**
     * Super set of all items that be bought or sold
     * @type {readonly ShopItem[]}
     */
    Items: readonly ShopItem[];
    /**
     * A record mapping group category descriptions, to {@link AssetGroup.Description} to a set with all respective (shop-elligble) group names.
     *
     * Note that keys will vary based on the users active language.
     * @type {Record<string, Record<string, Set<AssetGroupName>>>}
     */
    GroupDescriptions: Record<string, Record<string, Set<AssetGroupName>>>;
}, {
    /** The shop background */
    Background: string;
}>;
declare namespace Shop2Consts {
    namespace Grid {
        let x: number;
        let y: number;
        let width: number;
        let height: number;
        let itemWidth: number;
        let itemHeight: number;
    }
    let ItemColorCoords: RectTuple;
    let BuyModeCycleOrder: readonly ShopMode[];
    let ClothesCycleOrder: readonly {
        Mode: ShopClothesMode;
        Callback: (C: Character, items: Item[]) => void;
    }[];
    let BuyGroups: Record<string, {
        Value: number;
        Assets: readonly ItemBundle[];
    }>;
    let Keys: Set<string>;
    let Remotes: Set<string>;
}
declare namespace Shop2 {
    /**
     * Populate {@link Shop2Consts.BuyGroups} with buy groups.
     * @private
     */
    function _PopulateBuyGroups(): void;
    /**
     * Populate {@link Shop2InitVars.GroupDescriptions} with group descriptions and all corresponding group names
     * @param {readonly ShopItem[]} assets
     * @private
     */
    function _PopulateGroupDescriptions(assets: readonly ShopItem[]): void;
    /**
     * Populate {@link Shop2Consts.Keys} and {@link Shop2Consts.Remote} with the name of all asset keys and remotes.
     * @private
     */
    function _PopulateKeysAndRemotes(): void;
    /**
     * Draw function for a single item in the shop
     * @param {number} x
     * @param {number} y
     * @param {number} w
     * @param {number} h
     * @param {number} assetIndex - The assets index within {@link Shop2Vars.CurrentAssets}
     * @satisfies {ScreenDrawHandler}
     * @private
     */
    function _AssetElementDraw(x: number, y: number, w: number, h: number, assetIndex: number): void;
    /**
     * Click function for a single item in the shop
     * @param {MouseEvent | TouchEvent} event
     * @param {number} assetIndex - The assets index within {@link Shop2Vars.CurrentAssets}
     * @satisfies {MouseEventListener}
     * @private
     */
    function _AssetElementClick(event: MouseEvent | TouchEvent, assetIndex: number): void;
    /**
     * Construct screen functions for the <=12 items displayed in the shop.
     * @returns {Record<string, ShopScreenFunctions>}
     */
    function _GenerateAssetElements(): Record<string, ShopScreenFunctions>;
    /**
     * Filter the buy, sell and preview items in {@link Shop2Vars} based on the {@link Shop2Vars.Filters} settings,
     * clipping the current {@link Shop2Vars.Page} if required.
     * @param {boolean} clearDatalist - Whether the search bars datalist should be cleared (and thus be recomputed on a focus event)
     */
    function ApplyItemFilters(clearDatalist?: boolean): void;
    /** Click handler for the group-selection checkboxes */
    function _SetCheckboxFilters(): void;
    /**
     * Update the state of all pose-buttons, disabling or selecting them if so required.
     */
    function _UpdatePoseButtons(): void;
    /**
     * @param {string} id
     */
    function _ClickDropdown(id: string): void;
    function DrawPriceRibbon(label: string, x: number, y: number, w: number, color?: string): void;
    /**
     * Convert the passed asset list into a list consisting of shop items
     * @param {readonly Asset[]} assets - The assets in question
     * @returns {ShopItem[]} - The shop items constructed from the passed assets
     */
    function ParseAssets(assets: readonly Asset[]): ShopItem[];
    let Elements: Record<string, ShopScreenFunctions>;
    /**
     * Helper function for initializing the `Shop2` screen.
     * @param {null | string} background - The shops background image
     * @param {null | ScreenSpecifier} screen - A 2-tuple containing the module and name of the previous screen
     * @param {null | readonly Asset[]} assets - A list of all assets that should appear in the shop
     */
    function Init(background?: null | string, screen?: null | ScreenSpecifier, assets?: null | readonly Asset[]): void;
}
