// AUTH常量
export enum MY_EDIT_STATUS {
  NOT_EDIT = 1 << 1,
  ING_EDIT = 1 << 2,
  EXT_EDIT = 1 << 3
}

export enum MY_LIST_SELECTALL {
  ALL = 1 << 1,
  SOME = 1 << 2,
  NONE = 1 << 3
}

export enum MY_ATTENTION_TYPE {
  EFFECTIVE,
  INVALID
}

export enum MY_RELEASE_TYPE {
  EFFECTIVE,
  NONE,
  INVALID
}
