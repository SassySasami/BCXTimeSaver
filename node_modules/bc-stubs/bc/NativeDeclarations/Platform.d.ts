declare namespace Platform {

	type Perk = string;

	type CharacterStatus = "Maid" | "Oracle" | "Archer" | "Thief"

	type SoundCategory = string;
	type SoundEffect = string;

	type EffectType = "Teleport" | "Heal";

	type AnimationName = "Petrified" | "Bound" | "HalfBoundWounded" | "Wounded" | "Aim" | "AimReady" | "AimFull" | "Bind" | "Jump" | "HalfBoundJump" | "Crawl" | "Stun" | "HalfBoundStun" | "Walk" | "HalfBoundWalk" | "WalkHit" | "Run" | "HalfBoundRun" | "Crouch" | "Block" | "Idle" | "HalfBoundIdle"
		| "Uppercut" | "StandAttackFast" | "StandAttackSlow" | "CrouchAttackFast" | "CrouchAttackSlow" | "Scream" | "Backflip" | "FireProjectile" | "Left" | "Right";

	type ItemName = "RedRose" | "PoisonApple" | "LeatherWhip" | "AnimalCollar";

	interface AnimationSpec {
		Name: AnimationName;
		Cycle?: number[];
		Speed?: number;
		Audio?: SoundEffect[];
		CycleLeft?: number[];
		OffsetX?: number;
		OffsetY?: number;
		Width?: number;
		Height?: number;
		Image?: number;
		Mirror?: boolean;
	}

	interface DummyTemplate {
		Name: string;
		Status: string;
		Width: number;
		Height: number;
		Animation: AnimationSpec[];

		OnBind?: () => void;

		Loot?: { Name: ItemName, Expire: number; }[];
	}

	interface CharacterTemplate {
		Name: string;
		Status: string;

		Width: number;
		Height: number;

		HitBox: RectTuple;
		JumpHitBox?: RectTuple;

		Health: number;
		HealthPerLevel?: number;
		ExperienceValue?: number;

		Magic?: number;
		MagicPerLevel?: number;

		Projectile?: number;
		ProjectileName?: ProjectileName;
		ProjectileType?: ProjectileType;
		ProjectileTime?: number;
		ProjectileDamage?: number[];
		ProjectileBothSides?: boolean;

		Perk?: string;
		PerkName?: PerkName[];

		WalkSpeed: number;
		RunSpeed?: number;
		CrawlSpeed: number;
		JumpForce?: number;
		CollisionDamage?: number;

		JumpOdds?: number;
		LootOdds?: number;
		RunOdds?: number;
		ProjectileOdds?: number;
		StandAttackSlowOdds?: number;

		DamageBackOdds?: number;
		DamageFaceOdds?: number;
		DamageKnockForce?: number;

		IdleAudio?: SoundEffect[];
		DamageAudio?: SoundEffect[];
		DownAudio?: SoundEffect[];
		BindAudio?: SoundEffect[];
		ProjectileHitAudio?: SoundEffect[];

		RunHeight?: number;
		FlyingHeight?: number;
		IdleTurnToFace?: boolean;
		PetrifyOnWound?: boolean;

		Animation: AnimationSpec[];

		Attack?: {
			Name: string;
			HitBox?: RectTuple;
			HitAnimation?: number[];

			Magic?: number;
			Cooldown?: number;

			StartAudio?: string[];
			HitAudio?: string[];

			Damage?: number[];
			Speed: number;
			JumpForce?: number;
		}[];


		OnBind?: () => void;

		Loot?: { Name: ItemName, Expire: number; }[];
	}

	type ProjectileName = "Barrel" | "Arrow" | "Dagger";
	type ProjectileType = "Wood" | "Iron";

	interface Projectile {
		IsProjectile: true;
		Gravity: number;
		ProjectileForce: number;
		HitAudio: SoundEffect[];
	}

	interface Character extends CharacterTemplate, Projectile {
		ID: number;
		Camera: boolean;
		X: number;
		Y: number;
		ForceX: number;
		ForceY: number;
		Experience: number;
		Level: number;
		BaseHealth: number;
		BaseMagic?: number;
		BaseProjectile?: number;
		BaseProjectileTime?: number;
		BaseWalkSpeed: number;
		BaseRunSpeed: number;

		MaxHealth: number;
		MaxMagic?: number;
		MaxProjectile?: number;

		Fix: boolean;
		Combat: boolean;
		Dialog: string;

		Run: boolean;
		NextJump: number;

		DamageBackOdds: number;
		DamageFaceOdds: number;

		FaceLeft: boolean;

		HalfBound: boolean;
		Bound: boolean;
		Petrified: boolean;

		OnBind?: () => void;

		Immunity: number;
		Damage: { Value: number, Expire: number }[];
		RiseTime: number;
		ProjectileAim: number;

		Action: { Name: AnimationName, Start: number, Expire: number, Target?: number, Done?: boolean };
		Effect?: { Name: EffectType, End: number };

		Anim?: AnimationSpec;
	}

	interface PartyMember {
		Character: string;
		Status: Platform.CharacterStatus;
		Level: number;
		Experience: number;
		Perk: string;
	}

	interface DialogCharacter {
		Name: string;
		Color: HexColor;

		NickName?: string;

		Love?: number;
		LoverName?: string;
		LoverLevel?: number;
		OwnerName?: string;
		OwnerLevel?: number;

		Domination?: number;

		IdlePose?: CharacterStatus[];
	}

	type RoomType = "Up" | "Down" | "Left" | "Right";

	interface Room {
		Name: string;
		Text?: string;
		Background: string;
		AlternateBackground?: string;
		BackgroundFilter?: string;
		Music: string;
		Width?: number;
		Height?: number;
		LimitLeft?: number | null;
		LimitRight?: number | null;
		Heal?: number;
		Door?: {
			Name: string;
			FromX: number;
			FromY: number;
			FromW: number;
			FromH: number;
			FromType: RoomType;
			ToX: number;
			ToFaceLeft?: boolean;
		}[];

		Character?: {
			Name: string;
			Status: string;
			X: number;
			Fix?: boolean;
			Combat?: boolean;
			Battle?: boolean;
			Dialog?: string;
		}[];

		Entry?: () => void;
	}

	interface Item {
		Name: ItemName;
		DisplayName: string;
		Description: string;
		OnGive: (Char: Platform.DialogCharacter) => void;
	}

	type EventType =
		| "ThiefBossIntro" | "ThiefBossDefeat" | "ThiefBossSecondDefeat" | "ThiefBossRetreat"
		| "EdlaranKey" | "EdlaranForestKey" | "EdlaranIntro" | "EdlaranCurseIntro" | "EdlaranUnlock" | "EdlaranBedroomIsabella"
		| "EdlaranCountessBedroomOrgasmDom" | "EdlaranCountessBedroomOrgasmSub" | "EdlaranWineCellar" | "EdlaranJoin"
		| "EdlaranForestIntro"
		| "IntroForestBandit" | "ForestBanditCrate"
		| "ForestCapture" | "ForestCaptureEnd" | "ForestCaptureRescueMelody"
		| "BarnThiefRescueMelody"
		| "CamilleEscape" | "CamilleDefeat"
		| "JealousMaid" | "CursedMaid"
		| "OliviaCollarKey" | "OliviaUnchain" | "OliviaBath" | "OliviaBathOrgasm"
		| "OliviaCurseIntro" | "OliviaCurseRelease"
		| "OliviaTerrace" | "OliviaTerraceKiss"
		| "OliviaCabin" | "EdlaranCabin" | "LynCabin"
		| "OliviaTent" | "EdlaranTent" | "LynTent"
		| "IntroGuard" | "IntroGuardCurse"
		| "DesertEntrance"
		| "Curse"
		| "LynJoin"
		;

	interface Event {
		// Doesn't appear to be used for anything, just saved and loaded
	}

	type PerkName = "Healthy" | "Robust" | "Vigorous" | "Spring" | "Impact" | "Block" | "Deflect" | "Seduction" | "Persuasion" | "Manipulation" | "Apprentice" | "Witch" | "Meditation" | "Scholar" | "Heal" | "Cure" | "Howl" | "Roar" | "Teleport" | "Freedom" | "Fletcher" | "Burglar" | "Athletic" | "Sprint" | "Backflip" | "Acrobat" | "Archery" | "Celerity" | "Capacity" | "Sneak" | "Backstab" | "Kidnapper" | "Rigger" | "Thief" | "Bounce" | "Inventory" | "Duplicate";

	type KeyCode = string;

	type CooldownType = AnimationName | EffectType;
	interface Cooldown {
		Type: CooldownType;
		Time: number;
		Delay: number;
	}
}
