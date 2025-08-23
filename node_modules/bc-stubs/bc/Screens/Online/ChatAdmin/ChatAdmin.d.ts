/**
 * Show the room editor screen in creation mode
 */
declare function ChatAdminShowCreate(): void;
/**
 * Show the room editor screen in update mode
 * @param {ChatRoom} roomData
 */
declare function ChatAdminShowEdit(roomData: ChatRoom): void;
/**
 * Sets up the chat room editor screen and switches to it
 *
 * This should not be called directly; use {@link ChatAdminShowCreate} or {@link ChatAdminShowEdit}
 *
 * @param {"create" | "update"} mode
 * @param {ChatRoomSettings | undefined} roomData
 */
declare function ChatAdminStart(mode: "create" | "update", roomData?: ChatRoomSettings | undefined): void;
/**
 * Return whether the editor can actually modify the data
 * @returns {boolean}
 */
declare function ChatAdminCanEdit(): boolean;
declare function ChatAdminLoad(): Promise<void>;
declare function ChatAdminUnload(): void;
/**
 * Handles drawing the editor screen
 */
declare function ChatAdminRun(): void;
/**
 * Handles the click events on the editor screen. Is called from CommonClick()
 * @returns {void} - Nothing
 */
declare function ChatAdminClick(): void;
/**
 * Handles accepting the room editor
 */
declare function ChatAdminCommit(): void;
declare function ChatAdminKeyDown(event: KeyboardEvent): boolean;
declare function ChatAdminExit(): void;
/**
 * Sends the chat room data packet to the server. The response will be handled by ChatAdminResponse once it is received
 * @returns {void} - Nothing
 */
declare function ChatEditorUpdateRoom(): void;
/**
 * Handles the reception of the server response after attempting to update a chatroom
 * @param {ServerChatRoomUpdateResponse} data - Response from the server ("Updated" or error message)
 * @returns {void} - Nothing
 */
declare function ChatAdminResponse(data: ServerChatRoomUpdateResponse): void;
/**
 * Sends the chat room data packet to the server and prepares the player to join a room. The response will be handled by ChatCreateResponse once it is received
 * @returns {void} - Nothing
 */
declare function ChatEditorCreateRoom(): void;
/**
 * Handles the reception of the server response after attempting to create a chatroom: shows the error message, if applicable
 * @param {ServerChatRoomCreateResponse} data - Response from the server
 * @returns {void} - Nothing
 */
declare function ChatCreateResponse(data: ServerChatRoomCreateResponse): void;
declare var ChatAdminBackground: string;
declare var ChatAdminMessage: string;
declare var ChatAdminBackgroundIndex: number;
declare var ChatAdminPreviewBackgroundMode: boolean;
/** @type {ServerChatRoomGame[]} */
declare var ChatAdminGameList: ServerChatRoomGame[];
/** @type {ServerChatRoomLanguage[]} */
declare var ChatAdminLanguageList: ServerChatRoomLanguage[];
/** @type {null | string[]} */
declare var ChatAdminBackgroundList: null | string[];
/** @type {ServerChatRoomLanguage} */
declare var ChatAdminDefaultLanguage: ServerChatRoomLanguage;
declare var ChatAdminVisibilityModeLabels: ChatRoomVisibilityModeLabel[];
declare var ChatAdminVisibilityModeValues: ServerChatRoomRole[][];
declare var ChatAdminVisibilityModeIndex: number;
declare var ChatAdminAccessModeLabels: ChatRoomAccessModeLabel[];
declare var ChatAdminAccessModeValues: ServerChatRoomRole[][];
declare var ChatAdminAccessModeIndex: number;
/** @type {ChatRoomSettings | null} */
declare var ChatAdminData: ChatRoomSettings | null;
/** @type {"create" | "update" | null} */
declare var ChatAdminMode: "create" | "update" | null;
