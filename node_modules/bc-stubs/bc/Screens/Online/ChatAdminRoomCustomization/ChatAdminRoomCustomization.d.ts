/**
 * Changes a customiation value from a chat room command
 * @param {"Image" | "Filter" | "Music"} Property - The custom property to change (Image, Filter or Music)
 * @param {string} Value - The value to set in that property
 * @returns {void} - Nothing
 */
declare function ChatAdminRoomCustomizationCommand(Property: "Image" | "Filter" | "Music", Value: string): void;
declare function ChatAdminRoomCustomizationLoad(): Promise<void>;
declare function ChatAdminRoomCustomizationUnload(): void;
/**
 * Plays or stop the background music
 * @param {string} Music - The URL of the music to play
 * @returns {void} - Nothing
 */
declare function ChatAdminRoomCustomizationPlayMusic(Music: string): void;
/**
 * Runs the customization on the current screen, can be called from elsewhere
 * @param {ServerChatRoomCustomData} Custom - The customization to apply
 * @param {Rect | null} DrawBGToRect - If non-null draw the background to these coordinates. Online chat rooms will use the tracked values elsewhere
 * @param {boolean} DrawBGEffects - If true and drawing a background then apply blur/dark/tint
 * @returns {void} - Nothing
 */
declare function ChatAdminRoomCustomizationProcess(Custom: ServerChatRoomCustomData, DrawBGToRect: Rect | null, DrawBGEffects: boolean): void;
/**
 * When the chat Admin Custom screen runs, draws the screen
 * @returns {void} - Nothing
 */
declare function ChatAdminRoomCustomizationRun(): void;
/**
 * Handles the click events on the admin custom screen. Is called from CommonClick()
 * @returns {void} - Nothing
 */
declare function ChatAdminRoomCustomizationClick(): void;
declare function ChatAdminRoomCustomizationExit(): void;
declare var ChatAdminRoomCustomizationBackground: string;
/** @type {ServerChatRoomCustomData} */
declare var ChatAdminRoomCustomizationCurrent: ServerChatRoomCustomData;
/** @type {null | HTMLAudioElement} */
declare var ChatAdminRoomCustomizationMusic: null | HTMLAudioElement;
/** @type {null | "MusicLibrary"} */
declare var ChatAdminRoomCustomizationMode: null | "MusicLibrary";
/** @type {number} */
declare var ChatAdminRoomCustomizationSizeMode: number;
declare var ChatAdminRoomCustomizationMusicLibrary: {
    Name: string;
    URL: string;
    Source: string;
}[];
