/** @type {ExtendedItemCallbacks.Load} */
declare function InventoryItemNeckPetSuitShockCollars1Load(): void;
/** @type {ExtendedItemCallbacks.Draw} */
declare function InventoryItemNeckPetSuitShockCollars1Draw(): void;
/** @type {ExtendedItemCallbacks.Click} */
declare function InventoryItemNeckPetSuitShockCollars1Click(): void;
/** @type {ExtendedItemCallbacks.Exit} */
declare function InventoryItemNeckPetSuitShockCollars1Exit(): void;
declare function InventoryItemNeckPetSuitShockCollarResetCount(): void;
/**
 * @typedef {{ UpdateTime?: number, CheckTime?: number, LastMessageLen?: number, LastTriggerCount?: number, DisplayCount?: number }} PetSuitShockCollarPersistentData
 */
/** @type {ExtendedItemCallbacks.BeforeDraw<PetSuitShockCollarPersistentData>} */
declare function AssetsItemNeckPetSuitShockCollarBeforeDraw(data: DynamicDrawingData<PetSuitShockCollarPersistentData>): DynamicBeforeDrawOverrides;
/**
 * @param {Item} Item
 */
declare function InventoryPetSuitShockCollarCheckPunish(Item: Item): "" | "Struggle" | "Activity" | "StandUp";
/**
 * @param {DynamicScriptCallbackData<FuturisticChastityBeltPersistentData>} data
 * @param {number} LastTime
 */
declare function AssetsItemNeckPetSuitShockCollarUpdate(data: DynamicScriptCallbackData<FuturisticChastityBeltPersistentData>, LastTime: number): void;
/** @type {ExtendedItemCallbacks.ScriptDraw<PetSuitShockCollarPersistentData>} */
declare function AssetsItemNeckPetSuitShockCollarScriptDraw(data: DynamicScriptCallbackData<PetSuitShockCollarPersistentData>): void;
type PetSuitShockCollarPersistentData = {
    UpdateTime?: number;
    CheckTime?: number;
    LastMessageLen?: number;
    LastTriggerCount?: number;
    DisplayCount?: number;
};
