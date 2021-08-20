import { BCryptAdapter } from "./bcrypt-adapter";

const bcrypt = require('bcrypt');


describe('Bcrypt Adapter', ()  => {
    test('Should cal bcrypt with correct values',async () => {
        const salt = 12
        const sut = new BCryptAdapter(salt)
        const haskSpy = jest.spyOn(bcrypt, 'hash')
        await sut.encrypt('any_value')
        expect(haskSpy).toHaveBeenCalledWith('any_value', salt)
    })
})