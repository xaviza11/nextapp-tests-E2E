const { host } = require('../../scrape.config')
const url = 'api/users/deleteUser'
const axios = require('axios')

describe('Delete User', () => {

    test('delete user throw 400 when password length is less than 8 chracters', async () => {
        try {
            const response = await axios.post(host + url, {
                email: "test@example.com",
                password: "Ppa1",
                language: "en"
            });
            expect(response.status).toBe(400)
        } catch (error) {
            expect(error.toString()).toBe("AxiosError: Request failed with status code 400")
            expect(error.response.data.message).toBe("Password must be at least 8 characters long.")
        }
    })
    test('delete user throw 400 when email is not valid', async () => {
        try {
            const response = await axios.post(host + url, {
                email: "test@example",
                password: "Ppa1aaaaaaaaaaaa",
                language: "en"
            });
            expect(response.status).toBe(400)
        } catch (error) {
            expect(error.toString()).toBe("AxiosError: Request failed with status code 400")
            expect(error.response.data.message).toBe("Invalid email format. Please enter a valid email address.")
        }
    })
    test('delete user throw 400 when password not contain almost one digit.', async () => {
        try {
            const response = await axios.post(host + url, {
                email: "test@exampl.com",
                password: "Ppaaaaaaaaaaaaa",
                language: "en"
            });
            expect(response.status).toBe(400)
        } catch (error) {
            expect(error.toString()).toBe("AxiosError: Request failed with status code 400")
            expect(error.response.data.message).toBe("Password must contain at least one digit.")
        }
    })
    test('delete user throw 400 when password not contain at least one upercase letter', async () => {
        try {
            const response = await axios.post(host + url, {
                email: "test@exampl.com",
                password: "pp1aaaaaaaaaaaaa",
                language: "en"
            });
            expect(response.status).toBe(400)
        } catch (error) {
            expect(error.toString()).toBe("AxiosError: Request failed with status code 400")
            expect(error.response.data.message).toBe("Password must contain at least one uppercase letter.")
        }
    })
    test('delete user throw 400 when password not contain at least one lowecase letter', async () => {
        try {
            const response = await axios.post(host + url, {
                email: "test@exampl.com",
                password: "A1AAAAAAAAAAAAAA",
                language: "en"
            });
            expect(response.status).toBe(400)
        } catch (error) {
            expect(error.toString()).toBe("AxiosError: Request failed with status code 400")
            expect(error.response.data.message).toBe("Password must contain at least one lowercase letter.")
        }
    })
    test('delete user throw 400 when password have one or more spaces', async () => {
        try {
            const response = await axios.post(host + url, {
                email: "test@exampl.com",
                password: "A1AAAvAA AAAAAAAAA",
                language: "en"
            });
            expect(response.status).toBe(400)
        } catch (error) {
            expect(error.toString()).toBe("AxiosError: Request failed with status code 400")
            expect(error.response.data.message).toBe("The password can not contain spaces")
        }
    })
    test('delete user throw 400 when password have one or more special characters', async () => {
        try {
            const response = await axios.post(host + url, {
                email: "test@exampl.com",
                password: "A1AAAvAA>AAAAAAAAA",
                language: "en"
            });
            expect(response.status).toBe(400)
        } catch (error) {
            expect(error.toString()).toBe("AxiosError: Request failed with status code 400")
            expect(error.response.data.message).toBe( "Password can not contain special characters")
        }
    })
    test('delete user return 200 when the user has been deleted', async () => {
        try {

            await axios.post(host + 'api/auth/signup', {
                email: "test@exampl.com",
                password: "A1AAAvAAAAAAAAAAA",
                fullname: '123',
                language: "en"
            });

            const response = await axios.post(host + url, {
                email: "test@exampl.com",
                password: "A1AAAvAAAAAAAAAAA",
                language: "en"
            });
            expect(response.status).toBe(200)
        } catch (error) {
            expect(error.toString()).toBe("a")
            expect(error.response.data.message).toBe( "a")
        }
    })
})
