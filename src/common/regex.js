export const REGEX = {
  pattern: {
    email: (s) => {
      return /.+@[a-zA-Z]+\..+/.test(s)
    },
    username: (s) => {
      return /^[a-zA-Z. ]+$/.test(s)
    }
  }
}
