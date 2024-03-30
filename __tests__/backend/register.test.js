/*const { host } = require('../../scrape.config')
const url = 'api/auth/signup'
const axios = require('axios')

describe('Authentication tests', () => {
    test('register throw 400 when password length is less than 8 chracters', async () => {
        try {
            const response = await axios.post(host + url, {
                email: "test@example.com",
                password: "Ppa1",
                fullname: "fullname",
                language: "en"
            });
            expect(response.status).toBe(400)
        } catch (error) {
            expect(error.toString()).toBe("AxiosError: Request failed with status code 400")
            expect(error.response.data.message).toBe("Password must be at least 8 characters long.")
        }
    })
    test('register throw 400 when password has spaces', async () => {
        try {
            const response = await axios.post(host + url, {
                email: "test@example.com",
                password: "Pp a1asdfasdfasdf",
                fullname: "fullname",
                language: "en"
            });
            expect(response.status).toBe(400)
        } catch (error) {
            expect(error.toString()).toBe("AxiosError: Request failed with status code 400")
            expect(error.response.data.message).toBe("The password can not contain spaces")
        }
    })
    test('register throw 400 when password does not have one uppercase letter', async () => {
        try {
            const response = await axios.post(host + url, {
                email: "test@example.com",
                password: "a1asdfasdfasdf",
                fullname: "fullname",
                language: "en"
            });
            expect(response.status).toBe(400)
        } catch (error) {
            expect(error.toString()).toBe("AxiosError: Request failed with status code 400")
            expect(error.response.data.message).toBe("Password must contain at least one uppercase letter.")
        }
    })
    test('register throw 400 when password does not have one lowercase letter', async () => {
        try {
            const response = await axios.post(host + url, {
                email: "test@example.com",
                password: "A1AAAAAAAAAAAAA",
                fullname: "fullname",
                language: "en"
            });
            expect(response.status).toBe(400)
        } catch (error) {
            expect(error.toString()).toBe("AxiosError: Request failed with status code 400")
            expect(error.response.data.message).toBe("Password must contain at least one lowercase letter.")
        }
    })
    test('register throw 400 when password does not have one digit', async () => {
        try {
            const response = await axios.post(host + url, {
                email: "test@example.com",
                password: "AaAAAAAAAAAAAAA",
                fullname: "fullname",
                language: "en"
            });
            expect(response.status).toBe(400)
        } catch (error) {
            expect(error.toString()).toBe("AxiosError: Request failed with status code 400")
            expect(error.response.data.message).toBe("Password must contain at least one digit.")
        }
    })
    test('register throw 400 when password have specials characters', async () => {
        try {
            const response = await axios.post(host + url, {
                email: "test@example.com",
                password: "A1aAAAAA<AAAAAAAA",
                fullname: "fullname",
                language: "en"
            });
            expect(response.status).toBe(400)
        } catch (error) {
            expect(error.toString()).toBe("AxiosError: Request failed with status code 400")
            expect(error.response.data.message).toBe("Password can not contain special characters")
        }
    })
    test('register throw 400 when email is not valid', async () => {
        try {
            const response = await axios.post(host + url, {
                email: "test@example.",
                password: "A1aAAAAAAAAAAAAA",
                fullname: "fullname",
                language: "en"
            });
            expect(response.status).toBe(400)
        } catch (error) {
            expect(error.toString()).toBe("AxiosError: Request failed with status code 400")
            expect(error.response.data.message).toBe("Invalid email format. Please enter a valid email address.")
        }
    })
    test('register throw 400 when name length is less than 2 characters', async () => {
        try {
            const response = await axios.post(host + url, {
                email: "test@example.",
                password: "A1aAAAAAAAAAAAAA",
                fullname: "f",
                language: "en"
            });
            expect(response.status).toBe(400)
        } catch (error) {
            expect(error.toString()).toBe("AxiosError: Request failed with status code 400")
            expect(error.response.data.message).toBe("Name must have at least two characters")
        }
    })
    test('register throw 409 when user already exists', async () => {
        try {
            await axios.post(host + url, {
                email: "aitor@tilla.com",
                password: "A1aAAAAAAAAAAAAA",
                fullname: "faffgaf",
                language: "en"
            });
            const response = await axios.post(host + url, {
                email: "aitor@tilla.com",
                password: "A1aAAAAAAAAAAAAA",
                fullname: "faffgaf",
                language: "en"
            });
            const res = await axios.post(host + 'api/auth/authenticate', {
                email: "aitor@tilla.com",
                password: "A1aAAAAAAAAAAAAA",
                language: 'en'
              })
          
              const token = res.data.token
              const tokenName = "token"
          
              await axios.post(host + 'api/users/deleteUser', {
                password: "1Aasdfghjklñ",
                language: "en"
              }, {
                headers: {
                  'Content-Type': 'application/json',
                  'Cookie': `${tokenName}=${token}`
                },
              });
            expect(response.status).toBe(409)
        } catch (error) {
            expect(error.toString()).toBe("AxiosError: Request failed with status code 409")
            expect(error.response.data.message).toBe("User already exists")
            const res = await axios.post(host + 'api/auth/authenticate', {
                email: "aitor@tilla.com",
                password: "A1aAAAAAAAAAAAAA",
                language: 'en'
              })
          
              const token = res.data.token
              const tokenName = "token"
          
              await axios.post(host + 'api/users/deleteUser', {
                password: "A1aAAAAAAAAAAAAA",
                language: "en"
              }, {
                headers: {
                  'Content-Type': 'application/json',
                  'Cookie': `${tokenName}=${token}`
                },
              });
        }
    })
    
    test('register throw 201 when succes register', async () => {
        await axios.post(host + url, {
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
      
          await axios.post(host + 'api/users/deleteUser', {
            password: "A1aAAAAAAAAAAAAA",
            language: "en"
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Cookie': `${tokenName}=${token}`
            },
          });

        expect(res.status).toBe(200)
        expect(res.data.res).toBe('success')
    })
});*/
