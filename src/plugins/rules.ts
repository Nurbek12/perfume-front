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

export const phoneRules = [
    (v: any) => !!v || 'Field is required.',
    (v: string) => checkTextPhone(v) || 'Invalid phone number format'
]

export const checkTextPhone = (str: string) => /^(\+\d{12})$/.test(str)