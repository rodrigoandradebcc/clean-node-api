import { BCryptAdapter } from "./bcrypt-adapter";

const bcrypt = require('bcrypt');

jest.mock('bcrypt', () => ({
    async hash (): Promise<string> {
        return new Promise(resolve => resolve('hash'))
    }

}))

const salt = 12

const makeSut = ():BCryptAdapter => {
 return new BCryptAdapter(salt)
}

describe('Bcrypt Adapter', ()  => {
    test('Should call bcrypt with correct values',async () => {
        const sut = makeSut()
        const haskSpy = jest.spyOn(bcrypt, 'hash')
        await sut.encrypt('any_value')
        expect(haskSpy).toHaveBeenCalledWith('any_value', salt)
    })

    test('Should return a hash success',async () => {
        const sut = makeSut()
        const hash = await sut.encrypt('any_value')
        expect(hash).toBe('hash')
    })

    test('Should return a hash success',async () => {
        const sut = makeSut()
        jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const promise = sut.encrypt('any_value')
        await expect(promise).rejects.toThrow()
    })
})