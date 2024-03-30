/*const { host } = require('../../scrape.config')
const url = 'api/users/deleteUser'
const axios = require('axios')

describe('Delete User', () => {

    test('delete user throw 400 when password length is less than 8 chracters', async () => {
        try {
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

            const response = await axios.post(host + url, {
                password: "Ppa1",
                language: "en"
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `${tokenName}=${token}`
                },
            });
            expect(response.status).toBe(400)
        } catch (error) {
            expect(error.toString()).toBe("AxiosError: Request failed with status code 400")
            expect(error.response.data.message).toBe("Password must be at least 8 characters long.")
        }
    })
    test('delete user throw 400 when password not contain almost one digit.', async () => {
        try {
            const res = await axios.post(host + 'api/auth/authenticate', {
                email: "test@test.com",
                password: "A1aAAAAAAAAAAAAA",
                language: 'en'
            })

            const token = res.data.token
            const tokenName = "token"

            const response = await axios.post(host + url, {
                password: "Ppaaaaaaaaaaaaa",
                language: "en"
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `${tokenName}=${token}`
                },
            });
            expect(response.status).toBe(400)
        } catch (error) {
            expect(error.toString()).toBe("AxiosError: Request failed with status code 400")
            expect(error.response.data.message).toBe("Password must contain at least one digit.")
        }
    })
    test('delete user throw 400 when password not contain at least one upercase letter', async () => {
        try {
            const res = await axios.post(host + 'api/auth/authenticate', {
                email: "test@test.com",
                password: "A1aAAAAAAAAAAAAA",
                language: 'en'
            })

            const token = res.data.token
            const tokenName = "token"

            const response = await axios.post(host + url, {
                password: "pp1aaaaaaaaaaaaa",
                language: "en"
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `${tokenName}=${token}`
                },
            });

            expect(response.status).toBe(400)
        } catch (error) {
            expect(error.toString()).toBe("AxiosError: Request failed with status code 400")
            expect(error.response.data.message).toBe("Password must contain at least one uppercase letter.")
        }
    })
    test('delete user throw 400 when password not contain at least one lowecase letter', async () => {
        try {
            const res = await axios.post(host + 'api/auth/authenticate', {
                email: "test@test.com",
                password: "A1aAAAAAAAAAAAAA",
                language: 'en'
            })

            const token = res.data.token
            const tokenName = "token"

            const response = await axios.post(host + url, {
                password: "A1AAAAAAAAAAAAAA",
                language: "en"
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `${tokenName}=${token}`
                },
            });
            expect(response.status).toBe(400)
        } catch (error) {
            expect(error.toString()).toBe("AxiosError: Request failed with status code 400")
            expect(error.response.data.message).toBe("Password must contain at least one lowercase letter.")
        }
    })
    test('delete user throw 400 when password have one or more spaces', async () => {
        try {
            const res = await axios.post(host + 'api/auth/authenticate', {
                email: "test@test.com",
                password: "A1aAAAAAAAAAAAAA",
                language: 'en'
            })

            const token = res.data.token
            const tokenName = "token"

            const response = await axios.post(host + url, {
                password: "A1AAAvAA AAAAAAAAA",
                language: "en"
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `${tokenName}=${token}`
                },
            });
            expect(response.status).toBe(400)
        } catch (error) {
            expect(error.toString()).toBe("AxiosError: Request failed with status code 400")
            expect(error.response.data.message).toBe("The password can not contain spaces")
        }
    })
    test('delete user throw 400 when password have one or more special characters', async () => {
        try {
            const res = await axios.post(host + 'api/auth/authenticate', {
                email: "test@test.com",
                password: "A1aAAAAAAAAAAAAA",
                language: 'en'
            })

            const token = res.data.token
            const tokenName = "token"

            const response = await axios.post(host + url, {
                password: "A1AAAvAA>AAAAAAAAA",
                language: "en"
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `${tokenName}=${token}`
                },
            });
            expect(response.status).toBe(400)
        } catch (error) {
            expect(error.toString()).toBe("AxiosError: Request failed with status code 400")
            expect(error.response.data.message).toBe("Password can not contain special characters")
        }
    })
    test('delete user return 200 when the user has been deleted', async () => {
        try {
            const res = await axios.post(host + 'api/auth/authenticate', {
                email: "test@test.com",
                password: "A1aAAAAAAAAAAAAA",
                language: 'en'
            })

            const token = res.data.token
            const tokenName = "token"

            const response = await axios.post(host + url, {
                password: "A1aAAAAAAAAAAAAA",
                language: "en"
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `${tokenName}=${token}`
                },
            });
            expect(response.status).toBe(200)
        } catch (error) {
            expect(error.toString()).toBe("a")
            expect(error.response.data.message).toBe("a")
        }
    })
})*/
