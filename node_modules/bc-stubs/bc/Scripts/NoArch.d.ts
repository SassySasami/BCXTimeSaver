/**
 * Registers an extended item.
 * @param {Asset} asset - The asset being registered
 * @param {NoArchItemConfig} config - The item's extended item configuration
 * @param {null | ExtendedItemOption} parentOption - The superscreen's option (if applicable)
 * @returns {NoArchItemData} - The generated extended item data for the asset
 */
declare function NoArchItemRegister(asset: Asset, config: NoArchItemConfig, parentOption?: null | ExtendedItemOption): NoArchItemData;
/**
 * Parse the passed text item draw data as passed via the extended item config
 * @param {NoArchConfigDrawData | undefined} drawData - The to-be parsed draw data
 * @return {ExtendedItemDrawData<ElementMetaData.NoArch>} - The parsed draw data
 */
declare function NoArchGetDrawData(drawData: NoArchConfigDrawData | undefined): ExtendedItemDrawData<ElementMetaData.NoArch>;
/**
 * Generates an asset's typed item data
 * @param {Asset} asset - The asset to generate modular item data for
 * @param {NoArchItemConfig} config - The item's extended item configuration
 * @param {null | ExtendedItemOption} parentOption - The parent extended item option of the super screens (if any)
 * @returns {NoArchItemData} - The generated typed item data for the asset
 */
declare function NoArchCreateNoArchItemData(asset: Asset, { DialogPrefix, ChatTags, Dictionary, ScriptHooks, BaselineProperty, DrawData, AllowEffect, Name, }: NoArchItemConfig, parentOption?: null | ExtendedItemOption): NoArchItemData;
/**
 * A lookup for the text item configurations for each registered text item
 * @const
 * @type {Record<string, NoArchItemData>}
 * @see {@link NoArchItemData}
 */
declare const NoArchItemDataLookup: Record<string, NoArchItemData>;
declare namespace NoArch {
    /**
     * @param {ExtendedItemData<any>} data
     * @param {Character} C — The character that has the item equiped
     * @param {Item} item — The item in question
     * @param {boolean} push - Whether to push to changes to the server
     * @param {boolean} refresh - Whether to refresh the character. This should generally be `true`, with custom script hooks being a potential exception.
     * @returns {boolean} Whether properties were updated or not
     */
    function Init(data: ExtendedItemData<any>, C: Character, item: Item, push?: boolean, refresh?: boolean): boolean;
    /**
     * @param {ExtendedItemData<any>} data
     */
    function Draw(data: ExtendedItemData<any>): void;
    /**
     * @param {ExtendedItemData<any>} data
     * @returns {boolean} Whether a button was clicked or not
     */
    function Click(data: ExtendedItemData<any>): boolean;
}
