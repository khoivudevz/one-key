import {FieldValues, UseFormSetValue} from 'react-hook-form'

interface PasswordOptions {
	length: number
	numbers: boolean
	symbols: boolean
	uppercase: boolean
	lowercase: boolean
}

export const generatePwd = (options: PasswordOptions): string => {
	const {length, numbers, symbols, uppercase, lowercase} = options

	// Define character sets.
	const lowerChars = 'abcdefghijklmnopqrstuvwxyz'
	const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
	const digitChars = '0123456789'
	const symbolChars = '!@#$%^&*()-_=+[]{}|;:,.<>?/'

	// Build the pool of allowed characters based on the provided options.
	let allowedChars = ''
	const requiredChars: string[] = []

	if (lowercase) {
		allowedChars += lowerChars
		// Ensure at least one lowercase is included.
		requiredChars.push(lowerChars[getRandomInt(lowerChars.length)])
	}
	if (uppercase) {
		allowedChars += upperChars
		// Ensure at least one uppercase is included.
		requiredChars.push(upperChars[getRandomInt(upperChars.length)])
	}
	if (numbers) {
		allowedChars += digitChars
		// Ensure at least one digit is included.
		requiredChars.push(digitChars[getRandomInt(digitChars.length)])
	}
	if (symbols) {
		allowedChars += symbolChars
		// Ensure at least one symbol is included.
		requiredChars.push(symbolChars[getRandomInt(symbolChars.length)])
	}

	if (!allowedChars) {
		throw new Error('At least one character type must be selected.')
	}

	// Ensure the length is enough to cover at least one of each selected type.
	if (length < requiredChars.length) {
		throw new Error(
			`Password length should be at least ${requiredChars.length} to include all selected character types.`
		)
	}

	const passwordChars: string[] = [...requiredChars]

	// Fill the remaining characters.
	for (let i = passwordChars.length; i < length; i++) {
		passwordChars.push(allowedChars[getRandomInt(allowedChars.length)])
	}

	// Shuffle the resulting password array.
	for (let i = passwordChars.length - 1; i > 0; i--) {
		const j = getRandomInt(i + 1)
		;[passwordChars[i], passwordChars[j]] = [passwordChars[j], passwordChars[i]]
	}

	return passwordChars.join('')
}

// Helper function for secure random integer generation.
const getRandomInt = (max: number): number => {
	if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
		const array = new Uint32Array(1)
		crypto.getRandomValues(array)
		return array[0] % max
	}
	// Fallback to Math.random (not cryptographically secure)
	return Math.floor(Math.random() * max)
}

export const handleGeneratePwd = (
	setValue: UseFormSetValue<FieldValues>,
	name: string
) => {
	const password = generatePwd({
		length: 15,
		numbers: true,
		symbols: true,
		uppercase: true,
		lowercase: true,
	})
	setValue(name, password)
}
