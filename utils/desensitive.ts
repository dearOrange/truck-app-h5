import { repeat, partialRight } from 'lodash'

const SING = '*'

// 脱敏
function desensitive(str, sign = SING, prev = 1, suff = 1) {
  return str.replace(
    new RegExp(`^(.{${prev}})(.+)(.{${suff}})$`, 'g'),
    (oStr, r1, r2, r3) => {
      return `${r1}${repeat(sign, r2.length)}${r3}`
    }
  )
}

export let dephone = partialRight(desensitive, SING, 3, 4)
export let dename = partialRight(desensitive, SING, 1, 0)
