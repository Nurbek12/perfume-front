export const nameRule = [
    (value: string) => {
        if (value) return true

        return 'Name is required.'
    },
]
export const emailRules = [
    (value: string) => {
        if (value) return true

        return 'E-mail is requred.'
    },
    (value: string) => {
        if (/.+@.+\..+/.test(value)) return true

        return 'E-mail must be valid.'
    },
]