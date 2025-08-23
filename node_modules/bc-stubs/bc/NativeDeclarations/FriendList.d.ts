type FriendListModes = FriendListMode[];
type FriendListMode = "OnlineFriends" | "Beeps" | "AllFriends";
type FriendListSortingMode = 'None' | 'MemberName' | 'MemberNickname' | 'MemberNumber' | 'ChatRoomName' | 'RelationType' | 'ChatRoomType';
type FriendListSortingDirection = 'Asc' | 'Desc';

type FriendListReturn<T extends ModuleType> = { Screen: ModuleScreens[T], Module: T, IsInChatRoom?: boolean, hasScrolledChat?: boolean };

type FriendRawData = {
  memberNumber?: number; /* undefined for NPCs */
  memberName: string;
  memberNickname?: string;
  chatRoom?: FriendRawRoom;
  beep?: FriendRawBeep;
  relationType?: string;
  canDelete?: boolean;
}

type FriendRawRoom = {
  name?: string;
  caption: string;
  canSearchRoom: boolean;
  types: (null | FriendListIcon)[];
};

type FriendRawBeep = {
  beepIndex?: number;
  caption: string;
  hasMessage?: boolean;
  canBeep?: boolean;
};

interface FriendListIcon {
  /** The {@link HTMLImageElement.src} of the icon */
  src: string;
  /** The `Character/FriendList` {@link TextGet} key of the icon's tooltip */
  tooltipKey: string;
  /** A string to-be used for sorting the icon-containing column cells */
  sortKey: string;
}
