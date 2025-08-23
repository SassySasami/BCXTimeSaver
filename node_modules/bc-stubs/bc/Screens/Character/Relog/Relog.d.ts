declare function RelogLoad(): Promise<void>;
/**
 * Unload the relog screen
 */
declare function RelogUnload(): void;
/**
 * Runs the relog screen
 * @returns {void} Nothing
 */
declare function RelogRun(): void;
/**
 * Handles player click events on the relog screen
 * @returns {void} Nothing
 */
declare function RelogClick(): void;
declare function RelogKeyDown(event: KeyboardEvent): boolean;
declare function RelogExit(): void;
declare function RelogResize(): void;
/** @type {null | RelogData} */
declare var RelogData: null | RelogData;
declare const RelogIDs: Readonly<{
    subscreen: "relog-subscreen";
    passwordLabel: "relog-password-label";
    password: "InputPassword";
    passwordPair: "relog-password-pair";
    status: "relog-status";
    accountName: "relog-account-name";
    enterPasswordHint: "relog-enter-password-hint";
    login: "relog-login";
    leave: "relog-leave";
    buttons: "relog-buttons";
    passwordAndButtons: "relog-password-and-buttons";
}>;
