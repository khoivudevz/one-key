import CryptoJS from 'crypto-js'

export const encrypt = (data: string, code: string) => {
	return CryptoJS.AES.encrypt(data, code).toString()
}

export const decrypt = (data: string, code: string) => {
	const bytes = CryptoJS.AES.decrypt(data, code)
	return bytes.toString(CryptoJS.enc.Utf8)
}
