import { BCryptAdapter } from "./bcrypt-adapter";

const bcrypt = require('bcrypt');

jest.mock('bcrypt', () => ({
    async hash (): Promise<string> {
        return new Promise(resolve => resolve('hash'))
    }

}))


describe('Bcrypt Adapter', ()  => {
    test('Should call bcrypt with correct values',async () => {
        const salt = 12
        const sut = new BCryptAdapter(salt)
        const haskSpy = jest.spyOn(bcrypt, 'hash')
        await sut.encrypt('any_value')
        expect(haskSpy).toHaveBeenCalledWith('any_value', salt)
    })

    test('Should return a hash success',async () => {
        const salt = 12
        const sut = new BCryptAdapter(salt)
        const hash = await sut.encrypt('any_value')
        expect(hash).toBe('hash')
    })
})