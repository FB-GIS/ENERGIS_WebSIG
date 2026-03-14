export function validateCity(label, value, maxLength = 50) {
    const pattern = new RegExp(`^[\\p{L}\\s,'\\-/()]{2,${maxLength}}$`, 'u')
    if (!value || !pattern.test(value)) {
        return `Le champ ${label} contient des caractères invalides (max ${maxLength}).`
    }
    return true
}