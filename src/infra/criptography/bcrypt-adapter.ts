import { Encrypter } from '../../data/protocols/encrypter'

const bcrypt = require('bcrypt');


export class BCryptAdapter implements Encrypter {
    private readonly salt: number

    constructor (salt: number) {
        this.salt = salt
    }

    async encrypt (value: string): Promise<string> {
        const hash = await bcrypt.hash(value, 12)
        return hash
    }
}