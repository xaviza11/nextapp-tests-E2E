const { host } = require('../../scrape.config')
const url = 'api/users/deleteUser'
const axios = require('axios')

describe('Delete User', () => {
    test('authenticate user work correctly', async () => {
        await axios.post(host + 'api/auth/signup', {
            email: "test@test.com",
            password: "A1aAAAAAAAAAAAAA",
            fullname: "fasdfa",
            language: "en"
        });

        const res = await axios.post(host + 'api/auth/authenticate', {
            email: "test@test.com",
            password: "A1aAAAAAAAAAAAAA",
            language: 'en'
        })

        const token = res.data.token
        const tokenName = "token"

        await axios.post(host + url, {
            password: "A1aAAAAAAAAAAAAA",
            language: "en"
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `${tokenName}=${token}`
            },
        });

        expect(typeof res.data.token).toBe('string')
        expect(res.status).toBe(200)
        expect(res.data.res).toBe('success')
    })
    test('authenticate it throw error when password has spaces', async () => {
        try {
            const res = await axios.post(host + 'api/auth/authenticate', {
                email: "test1@1test.com",
                password: "A1aAAAAA AAAAAAAA",
                language: 'en'
            })
        } catch (error) {
            expect(error.toString()).toBe('AxiosError: Request failed with status code 400')
            expect(error.response.data.message).toBe("The password can not contain spaces")
        }
    })
    test('authenticate it throw error when password length is less than 8', async () => {
        try {
            const res = await axios.post(host + 'api/auth/authenticate', {
                email: "test1@1test.com",
                password: "A1aA",
                language: 'en'
            })
        } catch (error) {
            expect(error.toString()).toBe('AxiosError: Request failed with status code 400')
            expect(error.response.data.message).toBe("Password must be at least 8 characters long.")
        }
    })
    test('authenticate it throw error when password not contain at least one lower case', async () => {
        try {
            const res = await axios.post(host + 'api/auth/authenticate', {
                email: "test1@1test.com",
                password: "A1AA",
                language: 'en'
            })
        } catch (error) {
            expect(error.toString()).toBe('AxiosError: Request failed with status code 400')
            expect(error.response.data.message).toBe("Password must be at least 8 characters long.")
        }
    })
    test('authenticate it throw error when password not contain at least one upper case', async () => {
        try {
            const res = await axios.post(host + 'api/auth/authenticate', {
                email: "test1@1test.com",
                password: "a1aa",
                language: 'en'
            })
        } catch (error) {
            expect(error.toString()).toBe('AxiosError: Request failed with status code 400')
            expect(error.response.data.message).toBe("Password must be at least 8 characters long.")
        }
    })
    test('authenticate it throw error when password not contain at least one number', async () => {
        try {
            const res = await axios.post(host + 'api/auth/authenticate', {
                email: "test1@1test.com",
                password: "aAaaasdasdasd",
                language: 'en'
            })
        } catch (error) {
            expect(error.toString()).toBe('AxiosError: Request failed with status code 400')
            expect(error.response.data.message).toBe( "Password must contain at least one digit.")
        }
    })
    test('authenticate it throw error when password not contain at least one special character', async () => {
        try {
            const res = await axios.post(host + 'api/auth/authenticate', {
                email: "test1@1test.com",
                password: "aAaa1asdasd>",
                language: 'en'
            })
        } catch (error) {
            expect(error.toString()).toBe('AxiosError: Request failed with status code 400')
            expect(error.response.data.message).toBe("Password can not contain special characters")
        }
    })
    test('authenticate it throw error when email is invalid', async () => {
        try {
            const res = await axios.post(host + 'api/auth/authenticate', {
                email: "test1@1test",
                password: "aAaaA1aaaaaa",
                language: 'en'
            })
        } catch (error) {
            expect(error.toString()).toBe('AxiosError: Request failed with status code 400')
            expect(error.response.data.message).toBe( "Invalid email format. Please enter a valid email address.")
        }
    })
})
