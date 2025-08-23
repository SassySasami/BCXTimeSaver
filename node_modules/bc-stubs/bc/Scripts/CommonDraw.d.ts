/**
 * Prepares the character's drawing canvases before drawing the character's appearance.
 * @param {Character} C - The character to prepare
 * @returns {void} - Nothing
 */
declare function CommonDrawCanvasPrepare(C: Character): void;
/**
 * @param {Character} C - The character to prepare
 * @param {AssetGroup} group - The asset group
 * @param {AssetGroupName} groupName -  The asset group.
 * @param {AssetPoseName | PoseType} pose - The pose the user is in.
 * @param {AssetLayer} layer - the layer of the asset.
 * @param {string} layerType - CLT layer name, e.g. typed3
 * @param {Asset} asset - target asset
 * @returns {string} baseURL - URL pointing to asset art to load
 */
declare function AssetBaseURL(C: Character, group: AssetGroup, groupName: AssetGroupName, pose: AssetPoseName | PoseType, layer: AssetLayer, layerType: string, asset: Asset): string;
/**
 * @typedef { Map<AssetGroupName, TextureAlphaMask[]> } MaskLayersMap
 * @param {Character} C - The character to prepare
 * @returns { { maskLayers: MaskLayersMap, maskLayersBlink: MaskLayersMap} } - The grouped mask layers for the character's appearance
 */
declare function CommonDrawAppearancePrepareMaskLayers(C: Character): {
    maskLayers: MaskLayersMap;
    maskLayersBlink: MaskLayersMap;
};
/**
 * Draws the given character's appearance using the provided drawing callbacks
 * @param {Character} C - The character whose appearance to draw
 * @param {CommonDrawCallbacks} callbacks - The drawing callbacks to be used
 */
declare function CommonDrawAppearanceBuild(C: Character, { clearRect, clearRectBlink, drawCanvas, drawCanvasBlink, drawImage, drawImageBlink, drawImageColorize, drawImageColorizeBlink, }: CommonDrawCallbacks): void;
/**
 * Get the layer's resolved & validated current expression.
 *
 * Resolution handles mirroring from another group, and validation checks its value against the asset definition.
 *
 * @param {Character} C
 * @param {Item} item
 * @param {AssetLayer} layer
 */
declare function CommonDrawResolveLayerExpression(C: Character, item: Item, layer: AssetLayer): ExpressionName;
/**
 * Get the X and Y drawing coordinates for a layer
 *
 * @param {Character} C
 * @param {Asset} asset
 * @param {AssetLayer} layer
 * @param {AssetGroupName} groupName
 */
declare function CommonDrawComputeDrawingCoordinates(C: Character, asset: Asset, layer: AssetLayer, groupName: AssetGroupName): {
    X: number;
    Y: number;
    fixedYOffset: number;
};
/**
 * Clears out rects based on the layer's alpha masks
 *
 * @param {Character} C
 * @param {AssetLayer} layer
 * @param {number} fixedYOffset
 * @param {ClearRectCallback} clearRect
 * @param {ClearRectCallback} clearRectBlink
 */
declare function CommonDrawApplyLayerAlphaMasks(C: Character, layer: AssetLayer, fixedYOffset: number, clearRect: ClearRectCallback, clearRectBlink: ClearRectCallback): void;
/**
 * Resolve and validates a layer's color, given a character, an item and a layer.
 *
 * This handles grabbing the user-specified color, or the default one, or inherit it from another group, and
 * checks it for validity.
 *
 * @param {Character} C
 * @param {Item} item
 * @param {AssetLayer} layer
 * @param {AssetGroupName} groupName
 * @param {HexColor} [initialColor] Used as the starting value to check that specific color and fully resolve it
 */
declare function CommonDrawResolveLayerColor(C: Character, item: Item, layer: AssetLayer, groupName: AssetGroupName, initialColor?: HexColor): string;
/**
 * Determines whether the provided color is valid
 * @param {string} Color - The color
 * @param {AssetGroup} AssetGroup - The asset group the color is being used fo
 * @returns {boolean} - Whether the color is valid
 */
declare function CommonDrawColorValid(Color: string, AssetGroup: AssetGroup): boolean;
/**
 * Finds the correct pose to draw for drawable layer for the provided character from the provided list of allowed poses
 * @param {Character} C - The character to check for poses against
 * @param {Partial<Record<AssetPoseCategory, readonly AssetPoseName[]>>} AllowedPoses - The list of permitted poses for the current layer
 * @return {AssetPoseName | null} - The name of the pose to draw for the layer, or an empty string if no pose should be drawn
 */
declare function CommonDrawFindPose(C: Character, AllowedPoses: Partial<Record<AssetPoseCategory, readonly AssetPoseName[]>>): AssetPoseName | null;
/**
 * Finds the pose that should be used when a given asset (and optionally layer) is drawn.
 * @param {Character} C - The character whose poses to check
 * @param {AssetLayer} [Layer] - The layer to check (optional)
 * @returns {AssetPoseName | null} - The pose to use when drawing the given asset (or layer)
 */
declare function CommonDrawResolveAssetPose(C: Character, Layer?: AssetLayer): AssetPoseName | null;
type MaskLayersMap = Map<AssetGroupName, TextureAlphaMask[]>;
