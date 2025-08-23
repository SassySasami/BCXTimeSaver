/**
 * Loads a room and it's parameters
 * @param {string} CharacterName - The character name to load
 * @param {string} StatusName - The status of that character
 * @param {number} X - The X position of the character
 * @param {boolean} [Fix] - TRUE if the character won't move
 * @param {boolean} [Combat] - TRUE if the character will deal and receive combat damage
 * @param {string} [Dialog] - The dialog name to open when talking to that character
 * @param {boolean} [FaceLeft]  - TRUE if the character should be facing left
 * @param {number} [ReplaceAtPos]  - The position in the index to replace the char, if NULL we add it
 * @returns {Platform.Character | undefined} - Returns the platform character
 */
declare function PlatformCreateCharacter(CharacterName: string, StatusName: string, X: number, Fix?: boolean, Combat?: boolean, Dialog?: string, FaceLeft?: boolean, ReplaceAtPos?: number): Platform.Character | undefined;
/**
 * Returns TRUE if a specific event is already done
 * @param {string} Event - The name of the event
 * @returns {boolean} - TRUE if done
 */
declare function PlatformEventDone(Event: string): boolean;
/**
 * Adds an event to the list of events done
 * @param {Platform.EventType} Event - The name of the event
 * @returns {void} - Nothing
 */
declare function PlatformEventSet(Event: Platform.EventType): void;
/**
 * Sets the on screen message for 4 seconds
 * @param {string} Text - The text to show
 * @returns {void} - Nothing
 */
declare function PlatformMessageSet(Text: string): void;
/**
 * Loads a room and it's parameters
 * @param {string} [RoomName] - The name of the room to load, can be null to reload the current room
 * @returns {void} - Nothing
 */
declare function PlatformLoadRoom(RoomName?: string): void;
/**
 * Adds a character to the party
 * @param {Platform.PartyMember} C - The character to add to the roster
 * @returns {void} - Nothing
 */
declare function PlatformPartyAdd(C: Platform.PartyMember): void;
/**
 * Saves the current character stats in the party object
 * @returns {void} - Nothing
 */
declare function PlatformPartySave(): void;
/**
 * Loads the current character stats from the party object
 * @returns {void} - Nothing
 */
declare function PlatformPartyLoad(): void;
/**
 * Activates the next party character
 * @returns {void} - Nothing
 */
declare function PlatformPartyNext(): void;
/**
 * Activates a specific character by name
 * @param {string} CharacterName - The character name to activate
 * @returns {void} - Nothing
 */
declare function PlatformPartyActivate(CharacterName: string): void;
/**
 * Builds the party to switch active characters
 * @returns {void} - Nothing
 */
declare function PlatformPartyBuild(): void;
declare function PlatformLoad(): Promise<void>;
/**
 * Get the proper animation from the cycle to draw
 * @param {Platform.Character} C - The character to evaluate
 * @param {Platform.AnimationName} Pose - The pose we want
 * @param {boolean} Cycle - TRUE if we must use the animation cycle
 * @returns {Platform.AnimationSpec} - An object with the image, width & height to draw
 */
declare function PlatformGetAnim(C: Platform.Character, Pose: Platform.AnimationName, Cycle?: boolean): Platform.AnimationSpec;
/**
 * Returns TRUE if the current action for a character is ActionName
 * @param {Platform.Character} C - The character to validate
 * @param {Platform.AnimationName | "Any"} ActionName - The action to validate (all actions are valid if "Any"
 * @returns {boolean} - TRUE if the character action is that string
 */
declare function PlatformActionIs(C: Platform.Character, ActionName: Platform.AnimationName | "Any"): boolean;
/**
 * Focuses the background camera and draws it
 * @returns {void} - Nothing
 */
declare function PlatformDrawBackground(): void;
/**
 * Draw a specific character on the screen if needed
 * @param {Platform.Character} C - The character to draw
 * @param {number} Time - The current time when the action is done
 * @returns {void} - Nothing
 */
declare function PlatformDrawCharacter(C: Platform.Character, Time: number): void;
/**
 * Sets the max health and current health for the character based on the level and skill
 * @param {Platform.Character} C - The character to evaluate
 * @returns {void} - Nothing
 */
declare function PlatformSetHealth(C: Platform.Character): void;
/**
 * Adds experience points to the player, can also gain a level which heals fully
 * @param {Platform.Character} C - The character that will gain experience
 * @param {number} Value - The exp value to add
 * @returns {void} - Nothing
 */
declare function PlatformAddExperience(C: Platform.Character, Value: number): void;
/**
 * Some perks allow the player to steal items from bound enemies
 * @param {Platform.Character} C - The character that will gain experience
 * @param {number} Value - The experience value to factor the quantity
 * @returns {void} - Nothing
 */
declare function PlatformSteal(C: Platform.Character, Value: number): void;
/**
 * Gives a random inventory to the player
 * @param {Platform.Character | Platform.DummyTemplate} Target - The target that gives the inventory
 * @returns {void} - Nothing
 */
declare function PlatformAddRandomInventory(Target: Platform.Character | Platform.DummyTemplate): void;
/**
 * Random odds of finding inventory on a defeated enemy
 * @param {Platform.Character} Source - The victorious character
 * @param {Platform.Character} Target - The defeated character
 * @returns {void} - Nothing
 */
declare function PlatformFindInventory(Source: Platform.Character, Target: Platform.Character): void;
/**
 * Creates a treasure chest in the current room, tries not to put the chest over the enemy
 * @returns {void} - TRUE if active
 */
declare function PlatformCreateTreasure(): void;
/**
 * Applies damage on a target, can become wounded at 0 health
 * @param {Platform.Character} Source - The character doing the damage
 * @param {Platform.Character} Target - The character getting the damage
 * @param {number} Damage - The number of damage to apply
 * @param {number} Time - The current time when the action is done
 * @param {string} Type - The damage type (Collsion or Action)
 * @param {string} AttackName - The name of the attack that was done
 * @returns {void} - Nothing
 */
declare function PlatformDamage(Source: Platform.Character, Target: Platform.Character, Damage: number, Time: number, Type: string, AttackName?: string): void;
/**
 * Checks if the hitbox of an attack clashes with a hitbox of the target
 * @param {Platform.Character} Source - The character doing the damage
 * @param {Platform.Character} Target - The character getting the damage
 * @param {RectTuple} HitBox - The hitbox of the attack
 * @returns {boolean} - TRUE if there's a clash
 */
declare function PlatformHitBoxClash(Source: Platform.Character, Target: Platform.Character, HitBox: RectTuple): boolean;
/**
 * Plays a sound effect if needed
 * @param {Platform.SoundCategory} Category - The sound effect category
 * @param {Platform.SoundEffect | Platform.SoundEffect[]} Sound - The sound or array of sound to play
 * @param {number} Factor - The volume factor to apply
 * @returns {void} - Nothing
 */
declare function PlatformSoundEffect(Category: Platform.SoundCategory, Sound: Platform.SoundEffect | Platform.SoundEffect[], Factor?: number): void;
/**
 * Checks if the character action can attack someone else
 * @param {Platform.Character} Source - The character doing the action
 * @param {number} Time - The current time when the action is done
 * @returns {void} - Nothing
 */
declare function PlatformProcessAction(Source: Platform.Character, Time: number): void;
/**
 * Calculates the X force to apply based on the time it took until the last frame and the speed of the object
 * @param {number} Speed - The speed of the object
 * @param {number} Frame - The number of milliseconds since the last frame
 * @returns {number} - The force to apply
 */
declare function PlatformWalkFrame(Speed: number, Frame: number): number;
/**
 * Does collision damage for a character
 * @param {Platform.Character} Target - The character that will be damaged
 * @param {number} Time - The current time when the action is done
 * @returns {void} - Nothing
 */
declare function PlatformCollisionDamage(Target: Platform.Character, Time: number): void;
/**
 * Checks if an opponent can bind the player
 * @param {Platform.Character} Source - The opponent that can bind
 * @param {number} Time - The current time when the action is done
 * @returns {void} - Nothing
 */
declare function PlatformBindPlayer(Source: Platform.Character, Time: number): void;
/**
 * Returns TRUE if the player input is valid for a move
 * @param {Platform.AnimationName} Move - The movement type (Crouch, jump, left, right, etc.)
 * @returns {boolean}
 */
declare function PlatformMoveActive(Move: Platform.AnimationName): boolean;
/**
 * Returns TRUE if an animation is available for the character
 * @param {Platform.Character} C - The character to evaluate
 * @param {Platform.AnimationName} AnimationName - The animation name to search
 * @returns {boolean} - TRUE if it's available
 */
declare function PlatformAnimAvailable(C: Platform.Character, AnimationName: Platform.AnimationName): boolean;
/**
 * Creates a projectile that will disappear when it hits the floor or a wall
 * @param {Platform.ProjectileName} Name - The name of the projectile (Arrow, Bullet, etc.)
 * @param {Platform.ProjectileType} Type - The type of the projectile (Wood, Iron, etc.)
 * @param {boolean} FaceLeft - IF the projectile is facing the left direction
 * @param {number} X - The X position
 * @param {number} Y - The Y position
 * @param {number} Force - The speed of the projectile
 * @param {number} Gravity - The Y axis gravity pulling that projectile down (default to 0.25)
 * @param {number} Damage - The damage done by the projectile
 * @param {Platform.SoundEffect[]} [HitAudio] - The damage done by the projectile
 * @returns {void} - Nothing
 */
declare function PlatformCreateProjectile(Name: Platform.ProjectileName, Type: Platform.ProjectileType, FaceLeft: boolean, X: number, Y: number, Force: number, Gravity: number, Damage: number, HitAudio?: Platform.SoundEffect[]): void;
/**
 * Calculates the projectiles
 * @param {number} Time - The current time stamp of the frame
 * @returns {void} - Nothing
 */
declare function PlatformProcessProjectile(Time: number): void;
/**
 * Consume a projectile from the character and creates it on screen
 * @param {Platform.Character} C - The character that generates the projectile
 * @param {boolean} LongShot - TRUE if it's a long shot
 * @returns {void} - Nothing
 */
declare function PlatformProjectile(C: Platform.Character, LongShot: boolean): void;
/**
 * Binds a target character by the source character
 * @param {Platform.Character} Source - The source character that's doing the bondage
 * @param {Platform.Character} Target - The target character that's getting bound
 * @returns {void} - Nothing
 */
declare function PlatformBindTarget(Source: Platform.Character, Target: Platform.Character): void;
/**
 * Draw scenery + all characters, apply X and Y forces
 * @returns {void} - Nothing
 */
declare function PlatformDrawGame(): void;
/**
 * Draws all the buttons on the right side of the screen for extra lovers/Ds interactions
 * @returns {void} - Nothing
 */
declare function PlatformDrawRightButtons(): void;
/**
 * Plays the dialog ambient music
 * @param {string} Music - The URL of the music to play
 * @returns {void} - Nothing
 */
declare function PlatformBackgroundMusic(Music: string): void;
/**
 * Draws the possible gifts on the top of the screen, exit gift mode if too far from target
 * @returns {void} - Nothing
 */
declare function PlatformDrawGiftButtons(): void;
/**
 * Runs and draws the screen
 * @returns {void} - Nothing
 */
declare function PlatformRun(): void;
/**
 * Starts an attack by the source
 * @param {Platform.Character} Source - The character doing the action
 * @param {Platform.AnimationName} Type - The action type (Punch, Kick, Sweep, etc.)
 * @returns {void} - Nothing
 */
declare function PlatformAttack(Source: Platform.Character, Type: Platform.AnimationName): void;
/**
 * Toggles the audio on or off
 * @returns {void} - Nothing
 */
declare function PlatformAudioToggle(): void;
/**
 * Gives an item to the currrent NPC
 * @param {Platform.ItemName} ItemName -
 * @returns {void} - Nothing
 */
declare function PlatformGiveItem(ItemName: Platform.ItemName): void;
/**
 * Handles clicks in the screen
 * @returns {void} - Nothing
 */
declare function PlatformClick(): void;
/**
 * When the screens exits, we unload the listeners
 * @returns {void} - Nothing
 */
declare function PlatformLeave(): void;
/**
 * Enters a new room if the entry conditions are met
 * @param {Platform.RoomType} FromType - The type of room enter (Up, Left, Right)
 * @returns {void} - Nothing
 */
declare function PlatformEnterRoom(FromType: Platform.RoomType): void;
/**
 * Checks if there's a target character to bind and starts the binding process
 * @param {Platform.Character} Source - The source character that does the binding
 * @returns {void} - Nothing
 */
declare function PlatformBindStart(Source: Platform.Character): void;
/**
 * Saves the game on a specific slot
 * @param {number} Slot - The slot to use (from 0 to 9)
 * @returns {void} - Nothing
 */
declare function PlatformSaveGame(Slot: number): void;
/**
 * Adds an item to the player inventory
 * @param {Platform.ItemName} InventoryName - The item name to add
 * @param {number} QuantityToAdd - The quantity to add (1 if null)
 * @returns {void} - Nothing
 */
declare function PlatformInventoryAdd(InventoryName: Platform.ItemName, QuantityToAdd?: number): void;
/**
 * Removes an item from the player inventory
 * @param {Platform.ItemName} InventoryName - The item name to add
 * @param {number} QuantityToRemove - The quantity to add (1 if null)
 * @returns {void} - Nothing
 */
declare function PlatformInventoryRemove(InventoryName: Platform.ItemName, QuantityToRemove?: number): void;
/**
 * Loads the game on a specific slot
 * @param {number} Slot - The slot to use (from 0 to 9)
 * @returns {void} - Nothing
 */
declare function PlatformLoadGame(Slot: number): void;
/**
 * Teleports a character forward
 * @param {Platform.Character} C - The character to teleport
 * @returns {void} - Nothing
 */
declare function PlatformCastTeleport(C: Platform.Character): void;
/**
 * Heals the character for 20% of it's max HP
 * @param {Platform.Character} C - The character to teleport
 * @returns {void} - Nothing
 */
declare function PlatformCastHeal(C: Platform.Character): void;
/**
 * Handles the keys pressed to move, attack or jump
 * @param {Platform.KeyCode} Code - The key code pressed
 * @returns {void} - Nothing
 */
declare function PlatformEventKeyDown(Code: Platform.KeyCode): void;
/**
 * Handles keys pressed
 * @param {KeyboardEvent} e - The key pressed
 * @returns {boolean} - TRUE if we handled the key pressed
 */
declare function PlatformKeyDown(e: KeyboardEvent): boolean;
/**
 * Handles keys released
 * @param {KeyboardEvent} e - The key released
 * @returns {void} - Nothing
 */
declare function PlatformKeyUp(e: KeyboardEvent): void;
/**
 * Handles the controller inputs
 * @param {readonly GamepadButton[]} buttons - The buttons pressed on the controller
 * @returns {boolean} - Always TRUE to indicate that the controller is handled
 */
declare function PlatformController(buttons: readonly GamepadButton[]): boolean;
/**
 * Handles the touched regions for mobile play
 * @returns {void}
 */
declare function PlatformTouch(): void;
/**
 * Returns TRUE if a specific perk is allocated for that character
 * @param {Platform.Character} C - The platform character to evaluate
 * @param {Platform.PerkName} Perk - The perk name to validate
 * @returns {boolean} - TRUE if the perk is paid
 */
declare function PlatformHasPerk(C: Platform.Character, Perk: Platform.PerkName): boolean;
/**
 * Returns TRUE if a specific cooldown is currently active
 * @param {Platform.EffectType | Platform.AnimationName} Name - The name of the cooldown to validate
 * @returns {boolean} - TRUE if active
 */
declare function PlatformCooldownActive(Name: Platform.EffectType | Platform.AnimationName): boolean;
/**
 * Sets Bondage Brawl in standalone mode, not requiring any login from BC
 * @returns {void} - Nothing
 */
declare function PlatformRunStandalone(): void;
declare var PlatformRunStandaloneMode: boolean;
/** @type {Platform.Character[]} */
declare var PlatformChar: Platform.Character[];
/** @type {Platform.DialogCharacter | null} */
declare var PlatformFocusCharacter: Platform.DialogCharacter | null;
declare var PlatformPlayer: any;
/** @type {number | null} */
declare var PlatformLastTime: number | null;
/** @type {Platform.KeyCode[]} */
declare var PlatformKeys: Platform.KeyCode[];
declare var PlatformFloor: number;
declare var PlatformViewX: number;
declare var PlatformViewY: number;
/** @type {Platform.Room | null} */
declare var PlatformRoom: Platform.Room | null;
declare var PlatformMusic: any;
declare var PlatformAllowAudio: boolean;
declare var PlatformGravitySpeed: number;
declare var PlatformLastKeyCode: string;
declare var PlatformLastKeyTime: number;
declare var PlatformExperienceForLevel: number[];
declare var PlatformShowHitBox: boolean;
declare var PlatformMessage: any;
declare var PlatformHeal: any;
/** @type {Platform.Event[]} */
declare var PlatformEvent: Platform.Event[];
declare var PlatformTempEvent: any[];
declare var PlatformPlayerIdleTimer: any;
declare var PlatformPlayerIdleLast: string;
declare var PlatformDrawUpArrow: any[];
/** @type {readonly GamepadButton[]} */
declare var PlatformButtons: readonly GamepadButton[];
declare var PlatformRunDirection: string;
declare var PlatformRunTime: number;
/** @type {null | TouchList} */
declare var PlatformLastTouch: null | TouchList;
declare var PlatformImmunityTime: number;
declare var PlatformSaveMode: boolean;
declare var PlatformGiftMode: boolean;
declare var PlatformJumpPhase: string;
/** @type {Platform.PartyMember[]} */
declare var PlatformParty: Platform.PartyMember[];
declare var PlatformRegen: number;
/** @type {Platform.Cooldown[]} */
declare var PlatformCooldown: Platform.Cooldown[];
declare var PlatformHeartEffect: boolean;
declare namespace PlatformTimedScreenFilter {
    let End: number;
    let Filter: string;
}
declare var PlatformRightButtons: any[];
declare var PlatformInventory: any[];
/** @type {Platform.Item[]} */
declare var PlatformInventoryList: Platform.Item[];
/** @type {(Platform.CharacterTemplate | Platform.DummyTemplate)[]} */
declare var PlatformTemplate: (Platform.CharacterTemplate | Platform.DummyTemplate)[];
/**
 * All available rooms
 * @type {Platform.Room[]}
 */
declare var PlatformRoomList: Platform.Room[];
