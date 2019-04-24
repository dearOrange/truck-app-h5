// AUTH常量
enum AUTH {
  UNLOGIN = 1 << 1,

  LOGINING = 1 << 2,
  LOGINED = 1 << 3,

  LOGOUTING = 1 << 4,
  LOGOUTED = 1 << 5,

  FETCHING = 1 << 6,
  FETCHED = 1 << 7,

  ERROR = 1 << 8,
  SUCCESS = 1 << 9,

  FINISH = 1 << 10
}
export default AUTH
