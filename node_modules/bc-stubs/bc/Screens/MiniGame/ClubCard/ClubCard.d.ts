/**
 * Returns TRUE if the current game is online
 * @returns {boolean} - Nothing
 */
declare function ClubCardIsOnline(): boolean;
/**
 * Returns TRUE if the BC Player is a player in the current Club Card game
 * @returns {boolean} - Nothing
 */
declare function ClubCardIsPlaying(): boolean;
/**
 * In case one of the players disconnects from the server, the other player sends a message about it to the game chat.
 * @param {number} disconnectedMemberNumber
 */
declare function ClubCardCheckDisconnected(disconnectedMemberNumber: number): void;
/**
 * Resets club card game status and synchronizes
 */
declare function ClubCardResetGameStatus(): void;
/**
 * A hidden message to trigger all room members and a normal notification message to the chat room.
 */
declare function ClubCardSendRequestResetGame(): void;
/**
 * Adds a message to the storage for processing later.
 * Sends messages immediately if their type matches the ClubCardImmediateMessageTypes array.
 *
 * @param {string} TextGetKey - Localization key
 * @param {string} MessageType - Message type (constant)
 * @param {Record<string, any>} placeholders - Dynamic data for text replacement
 * @param {ClubCardPlayer|null} TargetPlayer - The source player
 * @param {string} MessageText - if TextGetKey is not used
 */
declare function ClubCardMessageAdd(MessageType: string, TextGetKey: string, placeholders?: Record<string, any>, TargetPlayer?: ClubCardPlayer | null, MessageText?: string): void;
/**
 * Sends a message to the render log and synchronizes it with other players.
 * This method is used for immediate messages and for sending processed messages from storage.
 *
 * @param {ClubCardMessage} message - The message object to be sent
 * @param {boolean} Push - Whether to send the message to other players
 */
declare function ClubCardMessageSend(message: ClubCardMessage, Push?: boolean): void;
/**
 * Processes stored messages, merges similar ones, clears the storage,
 * and sends all messages using the ClubCardSendMessage function.
 */
declare function ClubCardMessageSendAll(): void;
/**
 * Processes and merges specific messages from the storage.
 */
declare function ClubCardMessagePacketProcessing(): void;
/**
 * Merges multiple messages by summing selected placeholders and keeping the last message.
 *
 * @param {Array<{ message: ClubCardMessage, index: number }>} messageArray
 * @param {Array<string>} keysToSum - Placeholder keys to sum (e.g. ["AMOUNT"], ["MONEYAMOUNT", "FAMEAMOUNT"])
 */
declare function ClubCardMessagesMergeByKeys(messageArray: Array<{
    message: ClubCardMessage;
    index: number;
}>, keysToSum: Array<string>): void;
/**
 * Merges "StealMoney" and "StealFame" messages into one.
 *
 * @param {Array<{ message: ClubCardMessage, index: number }>} stealMoneyMessages - Messages related to stealing money.
 * @param {Array<{ message: ClubCardMessage, index: number }>} stealFameMessages - Messages related to stealing fame.
 */
declare function ClubCardMessagesMergeSteal(stealMoneyMessages: Array<{
    message: ClubCardMessage;
    index: number;
}>, stealFameMessages: Array<{
    message: ClubCardMessage;
    index: number;
}>): void;
/**
 * Generates a formatted message text by replacing placeholders with actual values.
 * @param {ClubCardMessage} ClubCardMessage - Message Item
 * @returns {string} MessageText
 */
declare function ClubCardMessageGetText(ClubCardMessage: ClubCardMessage): string;
/**
   * Updated the text by mask, for InnerHTML
   * The function finds the necessary words from the arrays and adds colour labels to them.
   * @param {String} text -Normal Card Text
   * @returns {String} -  Updated for InnerHTML Card Text
   */
declare function ClubCardGetFormatTextForInnerHTML(text: string): string;
/**
 * Creates a copy of a card from the ClubCardList based on its name.
 * Assigns a new UniqueID and makes the card visible.
 * @param {string} cardName - The name of the card to copy.
 * @returns {ClubCard} - A new card object if found, otherwise null.
 */
declare function ClubCardGetCopyCardByName(cardName: string): ClubCard;
/**
 * Creates a copy of a card from the ClubCardList based on its id.
 * Assigns a new UniqueID and makes the card visible.
 * @param {number} cardId - The id of the card to copy.
 * @returns {ClubCard} - A new card object if found, otherwise null.
 */
declare function ClubCardGetCopyCardByID(cardId: number): ClubCard;
/**
 * Generates a globally unique identifier (UniqueID) for a card.
 * The UniqueID is composed of the card's base ID, a high-precision timestamp,
 * and an incrementing counter to ensure uniqueness.
 * @param {number} cardID - The base ID of the card.
 * @returns {string} - A unique string identifier for the card.
 */
declare function ClubCardGenerateUniqueID(cardID: number): string;
/**
 * Creates a popop in the middle of the board that pauses the game
 * @param {string} Mode - The popup mode "DECK", "TEXT" or "YESNO"
 * @param {string|null} Text - The text to display
 * @param {string|null} Button1 - The label of the first button
 * @param {string|null} Button2 - The label of the second button
 * @param {string|null} Function1 - The function of the first button
 * @param {string|null} Function2 - The function of the second button
 * @returns {void} - Nothing
 */
declare function ClubCardCreatePopup(Mode: string, Text?: string | null, Button1?: string | null, Button2?: string | null, Function1?: string | null, Function2?: string | null, CardsPool?: any): void;
/**
 * Destroys the current popup
 * @returns {void} - Nothing
 */
declare function ClubCardDestroyPopup(): void;
/**
 * Returns TRUE if the card is a liability (should be played on the opponent side)
 * @param {ClubCard} Card - The card to evaluate
 * @returns {boolean} - TRUE if the card is a liability
 */
declare function ClubCardIsLiability(Card: ClubCard): boolean;
/**
 * Gets the opponent of the parameter player or the player that's not on it's turn if null
 * @param {ClubCardPlayer|null} CCPlayer - The club card player or null
 * @returns {ClubCardPlayer} - The opponent
 */
declare function ClubCardGetOpponent(CCPlayer?: ClubCardPlayer | null): ClubCardPlayer;
/**
 * Gets the opponent of the parameter player or the player that's not on it's turn if null
 * @param {ClubCardPlayer} CCPlayer - The club card player or null
 * @param {Number} turnCounter
 * @returns {ClubCard[]} - The opponent
 */
declare function ClubCardGetCardsPlayedOnTurn(CCPlayer: ClubCardPlayer, turnCounter: number): ClubCard[];
/**
 * Adds money to the club card player stats
 * @param {ClubCardPlayer} CCPlayer - The club card player
 * @param {Number} Amount - The amount to add
 * @param {null | string} CardName - The card name used for the chat message if needed
 * @returns {void} - Nothing
 */
declare function ClubCardPlayerAddMoney(CCPlayer: ClubCardPlayer, Amount: number, CardName?: null | string): void;
/**
 * Adds fame to the club card player stats, can trigger a victory
 * @param {ClubCardPlayer} CCPlayer - The club card player
 * @param {Number} Amount - The amount to add
 * @param {null | string} CardName - The card name used for the chat message if needed
 * @returns {void} - Nothing
 */
declare function ClubCardPlayerAddFame(CCPlayer: ClubCardPlayer, Amount: number, CardName?: null | string): void;
/**
 * Add fame from a player and remove from the ohter player
 * @param {ClubCardPlayer} CCPlayer - The club card player
 * @param {Number} moneyAmount - The money amount to steal
 * @param {Number} fameAmount - The fame amount to steal
 * @param {boolean} isStickyFingers - Whether Sticky Fingers effect should be ignored.
 * @returns {{ stolenMoney: number, stolenFame: number }} - The amounts of money and fame stolen.
 */
declare function ClubCardPlayerSteal(CCPlayer: ClubCardPlayer, moneyAmount: number, fameAmount: number, isStickyFingers?: boolean): {
    stolenMoney: number;
    stolenFame: number;
};
/**
 * Applies the "Sticky Fingers" effect, stealing extra resources if possible.
 * @param {ClubCardPlayer} CCPlayer - The club card player.
 * @param {ClubCardPlayer} opponent - The opponent player.
 */
declare function ClubCardApplyStickyFingers(CCPlayer: ClubCardPlayer, opponent: ClubCardPlayer): void;
/**
 * Raises the level of player
 * @param {ClubCardPlayer} CCPlayer - The club card player
 * @returns {void} - Nothing
 */
declare function ClubCardUpgradeLevel(CCPlayer: ClubCardPlayer): void;
/**
 * Returns TRUE if a card (by name) is currently present on a board
 * @param {ClubCardPlayer} CCPlayer - The club card player
 * @param {string} CardName - The name of the card
 * @returns {boolean} - TRUE if at least one card with that name is present
 */
declare function ClubCardEventNameIsInEvents(CCPlayer: ClubCardPlayer, CardName: string): boolean;
/**
 * Returns TRUE if a card (by name) is currently present on a board
 * @param {ClubCardPlayer} CCPlayer - The club card player
 * @param {string} CardName - The name of the card
 * @returns {boolean} - TRUE if at least one card with that name is present
 */
declare function ClubCardNameIsOnBoard(CCPlayer: ClubCardPlayer, CardName: string): boolean;
/**
 * Returns the amount of a card (by name) that are currently present on a board
 * @param {ClubCardPlayer} CCPlayer - The club card player
 * @param {string} CardName - The name of the card
 * @returns {number} - the amount of members with that name on board
 */
declare function ClubCardNameCountOnBoard(CCPlayer: ClubCardPlayer, CardName: string): number;
/**
 * Returns TRUE if a card (by group) is currently present on a board
 * @param {ClubCardPlayer} CCPlayer - The club card player
 * @param {string} GroupName - The name of the card group
 * @returns {boolean} - TRUE if at least one card from that group is present
 */
declare function ClubCardGroupIsOnBoard(CCPlayer: ClubCardPlayer, GroupName: string): boolean;
/**
 * @param {ClubCard} card to evaluate group
 * @param {string} GroupName group name to find
 * @returns {boolean} - True if the card has the group
 */
declare function ClubCardCardHasGroup(card: ClubCard, GroupName: string): boolean;
/**
 * @param {ClubCard} card to evaluate type
 * @param {string} TypeName type name to find
 * @returns {boolean} - True if the card has the type
 */
declare function ClubCardCardHasType(card: ClubCard, TypeName: string): boolean;
/**
 * Returns the number of cards of a specific group found on a board
 * @param {ClubCardPlayer} CCPlayer - The club card player
 * @param {string} GroupName - The name of the card group
 * @returns {number} - The number of cards from that group on the board
 */
declare function ClubCardGroupOnBoardCount(CCPlayer: ClubCardPlayer, GroupName: string): number;
/**
 * Returns the number of cards of a specific group found in the discard pile
 * @param {ClubCardPlayer} CCPlayer - The club card player
 * @param {string} GroupName - The name of the card group
 * @returns {number} - The number of cards from that group in the discard pile
 */
declare function ClubCardGroupInDiscardPileCount(CCPlayer: ClubCardPlayer, GroupName: string): number;
/**
 * Removes a card from a player board
 * @param {ClubCardPlayer} CCPlayer - The club card player
 * @param {ClubCard} Card - The card object to remove
 * @param {boolean|null} DontDiscard - If the card dont need to go to the discard pile
 * @param {string} [MessageType=ClubCardMessageType.PLAYERCARDSLEFT]
 * @returns {void} - Nothing
 */
declare function ClubCardRemoveFromBoard(CCPlayer: ClubCardPlayer, Card: ClubCard, DontDiscard?: boolean | null, MessageType?: string): void;
/**
 * Gets the updated cost for a player to level up
 * @param {ClubCardPlayer} CCPlayer - The club card player
 * @returns {number} The cost to level up
 */
declare function ClubCardCalculateLevelCost(CCPlayer: ClubCardPlayer): number;
/**
 * Gets the club level for pets effects
 * @param {ClubCardPlayer} CCPlayer - The club card player
 * @returns {number} club level for pets effects
 */
declare function ClubCardCalculateLevelForPets(CCPlayer: ClubCardPlayer): number;
/**
 * Gets the max effect a card should have depending on its "tier"/required level to play
 * @param {ClubCard} Card
 * @param {number} fame
 * @returns {number} max effect card should have
 */
declare function ClubCardGetMaxEffectFromCard(Card: ClubCard, fame: number): number;
/**
 * Adds a card to a players hand
 * @param {ClubCardPlayer} CCPlayer - The club card player
 * @param {ClubCard} Card - The card object to add
 * @returns {void} - Nothing
 */
declare function ClubCardAddToHand(CCPlayer: ClubCardPlayer, Card: ClubCard): void;
/**
 * Removes several cards from player time events
 * @param {ClubCardPlayer} CCPlayer - The club card player
 * @param {readonly String[]} ListOfCardNames - The names of the cards to remove
 */
declare function ClubCardRemoveCardsFromEventByName(CCPlayer: ClubCardPlayer, ListOfCardNames: readonly string[]): void;
/**
 * Removes a card from a player time events
 * @param {ClubCardPlayer} CCPlayer - The club card player
 * @param {string} CardName - The card object to remove
 * @returns {void} - Nothing
 */
declare function ClubCardRemoveFromEventByName(CCPlayer: ClubCardPlayer, CardName: string): void;
/**
 * Removes all cards that belong to a group (ex: Liability) from a board
 * @param {ClubCardPlayer} CCPlayer - The club card player
 * @param {String} GroupName - The group name to remove
 * @returns {void} - Nothing
 */
declare function ClubCardRemoveGroupFromBoard(CCPlayer: ClubCardPlayer, GroupName: string): void;
/**
 * Shuffles an array of cards
 * @param {ClubCard[]} array - The array of cards to shuffle
 * @returns {ClubCard[]} - The shuffled cards
 */
declare function ClubCardShuffle(array: ClubCard[]): ClubCard[];
/**
 * Sets the glowing border for a card
 * @param {ClubCard} Card - The card that must glow
 * @param {string} Color - The color of the glow
 * @returns {void} - Nothing
 */
declare function ClubCardSetGlow(Card: ClubCard, Color: string): void;
/**
 * Draw cards from the player deck into it's hand
 * @param {ClubCardPlayer} CCPlayer - The club card player that draws the cards
 * @param {number|null} Amount - The amount of cards to draw, 1 if null
 * @returns {void} - Nothing
 */
declare function ClubCardPlayerDrawCard(CCPlayer: ClubCardPlayer, Amount?: number | null): void;
/**
 * Draw cards from the player deck into it's hand
 * @param {ClubCardPlayer} CCPlayer - The club card player that draws the cards
 * @param {readonly string[]} groups - The group to draw from
 * @param {number | undefined} level - The level
 * @returns {boolean} - if cards were drawn or not
 */
declare function ClubCardPlayerDrawGroupCard(CCPlayer: ClubCardPlayer, groups: readonly string[], level: number | undefined): boolean;
/**
 * Draw cards from the player deck into it's hand
 * @param {ClubCardPlayer} CCPlayer - The club card player that draws the cards
 * @param {readonly string[]} types - The type to draw from
 * @param {number | undefined} level - The level
 * @returns {boolean} - if cards were drawn or not
 */
declare function ClubCardPlayerDrawTypeCard(CCPlayer: ClubCardPlayer, types: readonly string[], level: number | undefined): boolean;
/**
 * Summon cards from the player deck into it's board
 * @param {ClubCardPlayer} CCPlayer - The club card player that summons the cards
 * @param {readonly string[]} groups - The group to summon from
 * @param {number} amount - The amount of cards to summon
 * @param {number | undefined} level - The level of the cards if needed
 * @param {string | undefined} type - Event or Member if needed to specify
 * @param {string | undefined} source - null for deck, 'Streets' for streets
 * @returns {boolean} - if cards were summoned or not
 */
declare function ClubCardPlayerSummonGroupCardFromDeck(CCPlayer: ClubCardPlayer, groups: readonly string[], amount: number, level: number | undefined, type?: string | undefined, source?: string | undefined): boolean;
/**
 * Play a card from an effect
 * @param {ClubCardPlayer} CCPlayer - The club card player
 * @param {ClubCard} card - The card to play
 * @returns {void} - Nothing
 */
declare function ClubCardSummonCard(CCPlayer: ClubCardPlayer, card: ClubCard): void;
/**
 * Returns TRUE if a specific card can be summoned by the player
 * @param {ClubCardPlayer} CCPlayer - The club card player
 * @param {ClubCard} Card - The card to play
 * @returns {boolean} - TRUE if the card can be summoned
 */
declare function ClubCardCanSummonCard(CCPlayer: ClubCardPlayer, Card: ClubCard): boolean;
/**
 * When drawing card, checks for various conditions and triggers.
 * @param {ClubCardPlayer} CCPlayer - The club card player that draws the cards
 * @returns {void} - Nothing
 *
 */
declare function ClubCardCheckDraw(CCPlayer: ClubCardPlayer): void;
/**
 * trigger effects when the player is taking the draw action
 * @param {ClubCardPlayer} CCPlayer - The club card player that draws the cards
 * @returns {void} - Nothing
 */
declare function ClubCardOnDrawAction(CCPlayer: ClubCardPlayer): void;
/**
 * Common place to handle Alvins effect on kidnapping and Restrain
 * @param {ClubCardPlayer} CCPlayer
 * @returns {void} - Nothing
 *
 */
declare function ClubCardAlvinCondition(CCPlayer: ClubCardPlayer): void;
/**
 * Removes cards from a player hand
 * @param {ClubCardPlayer} CCPlayer - The club card player that discards
 * @param {number} Amount - The amount of cards to discard
 * @returns {void} - Nothing
 */
declare function ClubCardPlayerDiscardCard(CCPlayer: ClubCardPlayer, Amount: number): void;
/**
 * Builds a deck array of object from a deck array of numbers
 * @param {readonly number[]} InDeck - The array of number deck
 * @returns {ClubCard[]} - The resulting deck
 */
declare function ClubCardLoadDeck(InDeck: readonly number[]): ClubCard[];
/**
 * Returns the index of the player in the ClubCardPlayer array
 * @returns {number} - The array index position
 */
declare function ClubCardGetPlayerIndex(): number;
/**
 * Builds a deck array of object from a deck array of numbers
 * @param {number} DeckNum - The array of number deck
 * @returns {void} - The resulting deck
 */
declare function ClubCardLoadDeckNumber(DeckNum: number): void;
/**
 * Draw the club card player hand on screen, show only sleeves if not controlled by player
 * @param {Character} Char - The character to link to that club card player
 * @param {String} Cont - The control linked to that player
 * @param {readonly number[]} Cards - The cards to build the deck with
 * @returns {void} - Nothing
 */
declare function ClubCardAddPlayer(Char: Character, Cont: string, Cards: readonly number[]): void;
/**
 * The player can get rewarded with a new card if she wins VS a specific opponent
 * @returns {void} - Nothing
 */
declare function ClubCardGetReward(): void;
/**
 * Runs the before/after turn end handlers
 * @param {ClubCardPlayer} CCPlayer - The player whose turn is ending
 * @param {ClubCardPlayer} Opponent - The other player
 * @param {boolean} Before - true to run BeforeTurnEnd handlers, false to run AfterEndTurn handlers
 * @returns {void}
  */
declare function ClubCardRunTurnEndHandlers(CCPlayer: ClubCardPlayer, Opponent: ClubCardPlayer, Before: boolean): void;
/**
 * @param {string} StartType
 * StartType = ClubCardStartTurnType.BUNKRUPT because otherwise the bankruptcy function won't work.
 */
declare function ClubCardStartTurn(StartType?: string): void;
/**
 * When a turn ends, we move to the next player
 * @param {boolean|null} Draw - If the end of turn was triggered by a draw
 * @returns {void} - Nothing
 */
declare function ClubCardEndTurn(Draw?: boolean | null): void;
declare function ClubCardCheckEventAndCardExpired(): void;
/**
 * Checks that the focused card is still in the Player's hand
 * and defocuses it if not.
 */
declare function ClubCardDefocusCardIfDiscarded(): void;
declare function ClubCardCheckVictory(CCPlayer: any): boolean;
declare function ClubCardEndGameSyncAndMessage(CCPlayer: any): void;
/**
 * Returns the number of cards that can be played in one turn by a player
 * @param {ClubCardPlayer} CCPlayer - The club card player
 * @returns {Number} - The number of cards
 */
declare function ClubCardTurnPlayableCardCount(CCPlayer: ClubCardPlayer): number;
/**
 * Returns the number of cards that will be drawn when the player choses to draw instead of playing
 * @param {ClubCardPlayer} CCPlayer - The club card player
 * @returns {Number} - The number of cards to draw
 */
declare function ClubCardDrawCardCount(CCPlayer: ClubCardPlayer): number;
/**
 * Returns the extra time in turns for event over time
 * @param {ClubCardPlayer} CCPlayer - The club card player
 * @returns {Number} - The extra time
 */
declare function ClubCardExtraTime(CCPlayer: ClubCardPlayer): number;
/**
 * Returns the player that will be the target of a card.  Liability cards are played on the other side.
 * @param {ClubCard} Card - The card to play
 * @returns {ClubCardPlayer} - The target player
 */
declare function ClubCardFindTarget(Card: ClubCard): ClubCardPlayer;
/**
 * Returns TRUE if a specific card can be played by the player
 * @param {ClubCardPlayer} CCPlayer - The club card player
 * @param {ClubCard} Card - The card to play
 * @returns {boolean} - TRUE if the card can be played
 */
declare function ClubCardCanPlayCard(CCPlayer: ClubCardPlayer, Card: ClubCard): boolean;
/**
 * Returns TRUE if a specific card can be played by the player
 * @param {ClubCardPlayer} CCPlayer - The club card player
 * @param {ClubCard} Card - The card to play
 */
declare function ClubCardCanPlayEffectsLimitation(CCPlayer: ClubCardPlayer, Card: ClubCard): boolean;
/**
 * Returns TRUE if a specific card can be selected as a prerequisite for another card by the player
 * @param {ClubCardPlayer} CCPlayer - The club card player
 * @param {ClubCard} Card - The card to select
 * @returns {boolean} - TRUE if the card can be selected
 */
declare function ClubCardCanSelectCard(CCPlayer: ClubCardPlayer, Card: ClubCard): boolean;
/**
 * Returns TRUE if a specific card can be selected as a prerequisite for another card by the player
 * @param {ClubCard} Card - The card to select
 * @param {ClubCardPlayer} CCPlayer - The club card player
 * @param {null | ClubCard} AICard - if the function is called by AI playing a card
 * @returns {boolean} - TRUE if the card can be selected
 */
declare function ClubCardCardsSelectConditions(Card: ClubCard, CCPlayer: ClubCardPlayer, AICard?: null | ClubCard): boolean;
/**
 * When a player plays a card
 * @param {ClubCardPlayer} CCPlayer - The club card player
 * @param {ClubCard} Card - The card to play
 * @param {boolean} triggerOnPlay - false for search cards
 * @returns {void} - Nothing
 */
declare function ClubCardPlayCard(CCPlayer: ClubCardPlayer, Card: ClubCard, triggerOnPlay?: boolean): void;
/**
 * When it adds a card to a player's board, check if there is an effect on board that needs to be triggered.
 * @param {ClubCardPlayer} CCPlayer - The target player
 * @param {ClubCard} Card - The card that was played
 * @returns {void} - Nothing
 */
declare function ClubCardOnCardPlayedHandler(CCPlayer: ClubCardPlayer, Card: ClubCard): void;
/**
 * When it adds a card to a player's board, it updates for all index cards.
 * @param {ClubCardPlayer} Target - The target player
 * @returns {void} - Nothing
 */
declare function ClubCardUpdateBoardCardsIndex(Target: ClubCardPlayer): void;
/**
 * When a player selects a card that's a prerequisite for another card
 * @param {ClubCard} Card - The card to play
 * @returns {void} - Nothing
 */
declare function ClubCardSelectCard(Card: ClubCard): void;
/**
 * When the AI plays it's move
 * @returns {void} - Nothing
 */
declare function ClubCardAIPlay(): void;
/**
 * When the opponent (AI) starts it's turn, gives 3 seconds before it's move
 * @returns {void} - Nothing
 */
declare function ClubCardAIStart(): void;
/**
 * When a player concedes the game
 * @returns {void} - Nothing
 */
declare function ClubCardConcede(): void;
/**
 * When the opponent concedes the game and sends us a hidden message about it
 * @param {MemberNumber} ID - The player who conceded
 * @returns {void} - Nothing
 */
declare function ClubCardPlayerConceded(ID: MemberNumber): void;
/**
 * When a player goes bankrupt, she restarts her club from scratch, draws 5 new cards and ends her turn
 * @returns {void} - Nothing
 */
declare function ClubCardBankrupt(): void;
/**
 * When the game ends
 * @param {boolean} Victory - TRUE if the player is victorious
 * @returns {void} - Nothing
 */
declare function ClubCardEndGame(Victory: boolean): void;
declare function ClubCardTextGet(Text: any): string;
/**
 * Prepares the card titles, texts and initialize the log if needed
 * @returns {void} - Nothing
 */
declare function ClubCardLoadCaption(): void;
/**
 * Assigns the club card object if needed and loads the CSV file
 * @returns {void} - Nothing
 */
declare function ClubCardCommonLoad(): void;
declare function ClubCardLoad(): Promise<void>;
/**
 * Draw the club card player hand on screen, show only sleeves if not controlled by player
 * @param {Number} Value - The card to draw
 * @param {number} X - The X on screen position
 * @param {number} Y - The Y on screen position
 * @param {number} W - The width of the card
 * @param {string} Image - The buble
 * @returns {Number} - The next bubble Y position
 */
declare function ClubCardRenderBubble(Value: number, X: number, Y: number, W: number, Image: string): number;
/**
 * Returns the text description of all groups, separated by commas
 * @param {readonly string[]} Group - The card to draw
 * @returns {string} - The
 */
declare function ClubCardGetGroupText(Group: readonly string[]): string;
/**
 * Returns a reference to the original card based on its UniqueID.
 * @param {string} uniqueID - A copy of the card for which the original needs to be found.
 * @param {Map} allMap - an attempt to reduce the waste of resources on calculations
 * @returns {ClubCard|null} - The original card or null if not found.
 */
declare function ClubCardGetOriginalCardByUniqueID(uniqueID: string, allMap?: Map<any, any>): ClubCard | null;
/**
 * Creates a map of all cards in the current game by their UniqueID.
 * Useful for quick lookup by ID.
 * @returns {Map<string, ClubCard>} Map of UniqueID to card
 */
declare function ClubCardCreateMapCurrentGameState(): Map<string, ClubCard>;
/**
 * Updates the positions of all active card animations.
 *
 * This function is called every frame within `ClubCardRun()` to animate cards smoothly.
 * It updates the position of each animated card based on the elapsed time and removes
 * completed animations from the `activeAnimations` array.
 *
 * @param {number} Timestamp - The current timestamp provided by `GameRun()`, ensuring synchronization with the game loop.
 *
 * **How it works:**
 * 1. Loops through all active animations in `activeAnimations`.
 * 2. Calculates the progress (0 to 1) of the animation based on elapsed time.
 * 3. Applies an ease-in-out effect for smoother movement.
 * 4️. Updates the card's position (`CurrentX`, `CurrentY`, `CurrentW`).
 * 5️. Once the animation is complete:
 *     - Restores the card’s visibility and state.
 *     - Restores the original card’s visibility if needed.
 *     - Calls `onComplete()` if provided.
 *     - Removes the animation from `activeAnimations`.
 */
declare function ClubCardUpdateCardAnimations(Timestamp: number): void;
/**
 * Moves a card between predefined positions (Preview, Hand, Pending).
 * Handles both animation of a copy and visibility of the original card.
 * @param {ClubCard} card - The card being moved.
 * @param {number} priority - Animation rendering level priority
 * @param {Object} startPosition - The starting position {x, y, w}.
 * @param {Object} endPosition - The target position {x, y, w}.
 * @param {boolean} hideOriginal - Whether to hide the original card during animation.
 * @param {boolean} keepOriginalHidden - If true, the original card stays hidden after animation.
 * @param {Function|null} [onStart] - Function called before the animation starts.
 * @param {Function|null} [onComplete] - Function called after the animation completes.
 * @param {number} [duration=200] - Animation duration in milliseconds.
 */
declare function ClubCardMoveCard(card: ClubCard, priority: number, startPosition: any, endPosition: any, hideOriginal?: boolean, keepOriginalHidden?: boolean, onStart?: Function | null, onComplete?: Function | null, duration?: number): void;
/**
 * Moves a card to the preview position (original card stays hidden after).
 */
declare function ClubCardMoveCardToPreview(card: any, onStart?: any, onComplete?: any, duration?: number): void;
/**
 * Returns a card from preview back to its original position.
 */
declare function ClubCardReturnCardFromPreview(card: any, onStart?: any, onComplete?: any, duration?: number): void;
/**
 * Returns a card from pending state back to its original position.
 */
declare function ClubCardReturnCardFromPending(card: any, onStart?: any, onComplete?: any, duration?: number): void;
/**
 * Moves a card from preview to pending state.
 * @param {ClubCard} card - The card to be moved.
 * @param {Function|null} [onStart] - A function called before the animation starts.
 * @param {Function|null} [onComplete] - A function called after the animation completes.
 * @param {number} [duration=150] - The animation duration in milliseconds.
 */
declare function ClubCardMoveCardToPending(card: ClubCard, onStart?: Function | null, onComplete?: Function | null, duration?: number): void;
/**
 * Draw the club card player hand on screen, show only sleeves if not controlled by player
 * @param {ClubCard|Number} Card - The card to draw
 * @param {number} X - The X on screen position
 * @param {number} Y - The Y on screen position
 * @param {number} W - The width of the card
 * @param {number|null} Sleeve - The sleeve image to draw instead of the card
 * @param {string|null} Source - The source from where it's called
 * @returns {void} - Nothing
 */
declare function ClubCardRenderCard(Card: ClubCard | number, X: number, Y: number, W: number, Sleeve?: number | null, Source?: string | null, isIgnoreIsVisibility?: boolean): void;
/**
 * Draw the club card player board on screen
 * @param {ClubCardPlayer} CCPlayer - The club card player that draws the cards
 * @param {number} X - The X on screen position
 * @param {number} Y - The Y on screen position
 * @param {number} W - The width of the game board
 * @param {number} H - The height of the game board
 * @param {boolean} Mirror - If the board should be rendered bottom to top
 * @returns {void} - Nothing
 */
declare function ClubCardRenderBoard(CCPlayer: ClubCardPlayer, X: number, Y: number, W: number, H: number, Mirror: boolean): void;
/**
 * Draw the club card player hand on screen, show only sleeves if not controlled by player
 * @param {ClubCardPlayer} CCPlayer - The club card player that draws it's hand
 * @param {number} X - The X on screen position
 * @param {number} Y - The Y on screen position
 * @param {number} W - The width of the game board
 * @param {number} H - The height of the game board
 * @returns {void} - Nothing
 */
declare function ClubCardRenderHand(CCPlayer: ClubCardPlayer, X: number, Y: number, W: number, H: number): void;
/**
 * Draw the discard pile on screen
 * @param {ClubCardPlayer} CCPlayer - The club card player that draws it's discard pile
 * @param {number} X - The X on screen position
 * @param {number} Y - The Y on screen position
 * @param {number} W - The width of the discard pile window
 * @param {number} H - The height of the discard pile window
 * @returns {void} - Nothing
 */
declare function ClubCardRenderDiscardPile(CCPlayer: ClubCardPlayer, X: number, Y: number, W: number, H: number): void;
/**
 * Shows the status text on the bottom right
 * @param {string} Text - The status text to show
 * @returns {void} - Nothing
 */
declare function ClubCardStatusText(Text: string): void;
/**
 * Renders the right side panel
 * @returns {void} - Nothing
 */
declare function ClubCardRenderPanel(): void;
/**
 * Function to display the Card Draw button
 * @returns {void} - Nothing
 */
declare function ClubCardDrawButton(): void;
/**
 * Function to create and add system or player messages to document.getElementById(“CCLog”).
 * @param {ClubCardMessage} MessageItem - Message
 */
declare function ClubCardCreateOneDivContainer(MessageItem: ClubCardMessage): void;
/**
 * Function for creating and filling a container with all objects for a stroke by index.
 * @param {ClubCardMessage} MessageItem - Message
 */
declare function ClubCardCreateTurnDivContainer(MessageItem: ClubCardMessage): void;
/**
 * Renders the popup on the top of the game board
 * @param {number} Timestamp - The current timestamp from GameRun(), used for animation timing.
 * @returns {void} - Nothing
 */
declare function ClubCardRenderPopup(Timestamp: number): void;
/**
 * Draws a text element with a specified font size on the canvas, wrapping within a max width
 * Always aligns text to the left starting from the X coordinate
 * @param {string} Text - Text to draw
 * @param {number} X - X position (left edge of text)
 * @param {number} Y - Y position
 * @param {number} Size - Font size (e.g., 24 for normal, 36 for titles)
 * @param {string} Color - Text color
 * @param {string} [BackColor] - Optional background color for shadow effect
 * @param {number} [MaxWidth] - Optional maximum width before wrapping
 * @returns {number} - Returns new Y position after drawing
 */
declare function ClubCardInfoDrawText(Text: string, X: number, Y: number, Size: number, Color: string, BackColor?: string, MaxWidth?: number): number;
/**
 * Runs the club card game, draws all the controls
 * @param {number} Timestamp - The current timestamp from GameRun(), used for animation timing.
 * @returns {void} - Nothing
 */
declare function ClubCardRun(Timestamp: number): void;
/**
 * Handles clicks during the club card game
 * @returns {void} - Nothing
 */
declare function ClubCardClick(): void;
/**
 * Plays the selected card
 * @param {boolean} isPending - Whether a card requiring a target has already been selected and a second card is being selected.
 */
declare function ClubCardClickPlayCard(isPending: boolean): void;
/**
 * Sets the focus card if nothing else was clicked
 * @returns
 */
declare function ClubCardClickSetFocusCard(): void;
/**
 * Click on an empty space to reset the focus of the selected Card.
 * @param {Function|null} [onComplete] - Function called after the animation completes.
 */
declare function ClubCardClickResetFocusCard(onComplete?: Function | null): void;
/**
 * Cancels the current Pending and Focus cards.
 */
declare function ClubCardClickResetPendingCard(): void;
declare function ClubCardKeyDown(event: KeyboardEvent): boolean;
declare var ClubCardBackground: string;
declare var ClubCardColor: string[];
declare var ClubCardFameTextColor: string;
declare var ClubCardMoneyTextColor: string;
/** @type {null | Character } */
declare var ClubCardOpponent: null | Character;
/** @type {number[]} */
declare var ClubCardOpponentDeck: number[];
/** @type {null | ClubCard} */
declare var ClubCardReward: null | ClubCard;
/** @type {boolean} */
declare var ClubCardInspection: boolean;
/** @type {boolean} */
declare var ClubCardOptionSelection: boolean;
/** @type {boolean} */
declare var ClubCardGameEnded: boolean;
/**
 *  The variable allows to capture the mouse hovering over the card from the handler inside the ClubCardRenderCard function.
 * @type {null | ClubCard}
 * */
declare var ClubCardHover: null | ClubCard;
/**
 * Variable through which the current card selected by the player is rendered as a large card.
 * @type {null | ClubCard}
 * */
declare var ClubCardFocus: null | ClubCard;
declare var ClubCardFocusAI: any;
declare var ClubCardTurnIndex: number;
declare var ClubCardTurnCardPlayed: number;
declare var ClubCardTurnEndDraw: boolean;
declare var ClubCardFameGoal: number;
/** @type {{ Mode: null | string, Text: null | string, Button1: null | string, Button2: null | string, Function1: null | string, Function2: null | string, CardsPool: null | ClubCard[] }} */
declare var ClubCardPopup: {
    Mode: null | string;
    Text: null | string;
    Button1: null | string;
    Button2: null | string;
    Function1: null | string;
    Function2: null | string;
    CardsPool: null | ClubCard[];
};
/** @type {null | ClubCard} */
declare var ClubCardSelection: null | ClubCard;
/** @type {null | ClubCard} */
declare var ClubCardPending: null | ClubCard;
/** @type {null | number} */
declare var ClubCardTierSelection: null | number;
declare var ClubCardLevelLimit: number[];
declare var ClubCardLevelCost: number[];
/** @type {ClubCardPlayer[]} */
declare var ClubCardPlayer: ClubCardPlayer[];
declare var ClubCardOnlinePlayerMemberNumber1: number;
declare var ClubCardOnlinePlayerMemberNumber2: number;
/**
 * Counter to ensure unique ID incrementation.
 * It is used globally to prevent ID duplication.
 */
declare let ClubCardUniqueIDCounter: number;
/**
 * String for a random tier 1 card name. Tier 1 cards have no RequiredLevel or RequiredLevel <= 1
 * @type {string}
 */
declare let ClubCardRandomCardName: string;
/**
 * Variable to check if the code associated with animations will work or if it will be disabled.
 * @type {boolean}
 */
declare let ClubCardIsAnimationOn: boolean;
/**
 * Stores active card animations, updated each frame in ClubCardUpdateCardAnimations().
 * @type {ClubCardActiveAnimation[]}
 */
declare let ClubCardActiveAnimations: ClubCardActiveAnimation[];
declare namespace ClubCardFocusPosition {
    let x: number;
    let y: number;
    let w: number;
}
declare namespace ClubCardPendingPosition {
    let x_1: number;
    export { x_1 as x };
    let y_1: number;
    export { y_1 as y };
    let w_1: number;
    export { w_1 as w };
}
declare namespace ClubCardDiscardPosition {
    let x_2: number;
    export { x_2 as x };
    let y_2: number;
    export { y_2 as y };
    let w_2: number;
    export { w_2 as w };
}
declare var ClubCardLogScroll: boolean;
/**
 * Storage for all processed and displayed log messages
 * @type {ClubCardMessage[]}
 */
declare let ClubCardLog: ClubCardMessage[];
/**
 * Temporary buffer used for rendering messages before final log update
 * @type {ClubCardMessage[]}
 */
declare let ClubCardRenderLog: ClubCardMessage[];
/**
 * Message storage to accumulate messages before processing and sending
 * @type {ClubCardMessage[]}
 */
declare let ClubCardMessageStorage: ClubCardMessage[];
declare const ClubCardMessageType: Readonly<{
    STARTTURNINFO: "StartTurnInfo";
    STARTTURNEVENT: "StartTurnEvent";
    CARDEFFECT: "CardsEffect";
    KNOTEVENT: "KnotEvent";
    TURNENDEFFECT: "TurnEndEffect";
    FAMEMONEYINFO: "FameMoneyInfo";
    VICTORYINFO: "VictoryInfo";
    ACTIONSEPARATOR: "ActionSeparator";
    PREREQUISTITE: "Prerequisite";
    ACTION: "Actions";
    SYSTEM: "SystemMessage";
    PLAYERSMESSAGE: "PlayersMessage";
    PLAYERSDISCONNECTED: "PlayersDisconnected";
}>;
declare const ClubCardImmediateMessageTypes: ("Prerequisite" | "ActionSeparator" | "Actions" | "SystemMessage" | "PlayersMessage" | "PlayersDisconnected")[];
declare const ClubCardStartTurnType: Readonly<{
    PLAYCARD: "PlayCard";
    DRAWENDTURN: "DrawAndEndTurn";
    BANKRUPT: "Bankrupt";
    UPGRADELEVEL: "UpgradeLevel";
    ENDTURN: "EndTurn";
}>;
/**
 * Keys for filling in the function parameters ClubCardMessageAdd
 */
declare const ClubCardPlaceholderKeys: Readonly<{
    AMOUNT: "AMOUNT";
    CARDNAME: "CARDNAME";
    FAMEMONEY: "FAMEMONEY";
    MONEYAMOUNT: "MONEYAMOUNT";
    FAMEAMOUNT: "FAMEAMOUNT";
}>;
/** @type {boolean} Variable to check if the start function of the turn has already been called or not. */
declare let ClubCardIsStartTurn: boolean;
/**
 * The card definitions
 *
 * The BeforeTurnEnd hooks are run before regular fame and money are calculated and
 * are a good place to remove cards so they don't add fame/money that turn. Most
 * cards should prefer this hook instead of AfterTurnEnd (including ones that just
 * add extra money / fame).
 *
 * The AfterTurnEnd hooks run after this, and can be used to adjust the total amount
 * of money / fame gained that turn.
 *
 * @type {ClubCard[]}
 */
declare var ClubCardList: ClubCard[];
