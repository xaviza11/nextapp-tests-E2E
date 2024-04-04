const { host } = require('../../scrape.config')
const url = 'api/flightRoutes/newRoute'
const axios = require('axios')

describe('Return FlightRoute', () => {

    test(' fails when cordinates are invalid', async () => {
        try {
            await axios.post(host + 'api/auth/signup', {
                email: "test@test.com",
                password: "A1aAAAAAAAAAAAAA",
                name: "fasdfa",
                language: "en"
            });

            const res = await axios.post(host + 'api/auth/authenticate', {
                email: "test@test.com",
                password: "A1aAAAAAAAAAAAAA",
                language: 'en'
            })

            const token = res.data.token
            const tokenName = "token"

            const result = await axios.post(host + url, {
                "departure": "LERS",
                "arrival": "LIRQ",
                "departureCity": "REUS",
                "arrivalCity": "PRETOLA",
                "distance": 586,
                "fullRoute": "41.147500 1.167222 71, 41.064110 0.975881 2197, 41.041028 0.923133 3048, 41.198035 0.996912 4306, 41.354994 1.071045 5563, 41.410653 1.097425 6066, 41.479118 1.299977 6889, 41.546861 1.501861 7711, 41.469479 1.698809 8262, 41.391761 1.895286 8812, 41.307111 2.107806 9418, 41.377115 2.309101 9829, 41.446767 2.510829 10240, 41.467594 2.571432 10363, 41.536787 2.773722 10363, 41.605624 2.976445 10363, 41.679611 3.196000 10363, 41.733778 3.357889 10363, 41.801582 3.561854 10363, 41.869025 3.766251 10363, 41.923917 3.933750 10363, 41.990685 4.138936 10363, 42.057088 4.344552 10363, 42.079722 4.415000 10363, 42.204038 4.564486 10363, 42.328159 4.714561 10363, 42.452084 4.865228 10363, 42.560222 4.997389 10363, 42.683769 5.149185 10363, 42.807116 5.301586 10363, 42.930259 5.454596 10363, 42.966667 5.500000 10363, 43.089545 5.653804 10363, 43.228556 5.828861 10363, 43.226750 6.023778 10363, 43.224220 6.252326 10363, 43.221236 6.480854 10363, 43.219472 6.601806 10363, 43.317300 6.786927 10363, 43.346111 6.841667 10363, 43.373333 6.893333 10363, 43.470734 7.079349 10363, 43.549167 7.230000 10363, 43.622222 7.371111 10363, 43.718848 7.558663 10363, 43.756861 7.632778 10363, 43.819444 7.755278 10363, 43.915667 7.943845 9875, 44.011579 8.133022 9388, 44.055972 8.221000 9144, 44.087130 8.448725 9144, 44.117836 8.676688 9144, 44.134722 8.803611 9144, 44.194722 9.054722 9144, 44.247020 9.275372 9144, 44.298892 9.496414 9144, 44.321667 9.594167 9144, 44.312597 9.638965 8839, 44.266982 9.862746 7828, 44.224167 10.070556 6919, 44.177716 10.293663 5934, 44.165556 10.351667 5639, 44.088642 10.557479 4623, 44.023600 10.730342 3810, 43.933811 10.792844 3200, 43.819981 10.871781 2408, 43.752433 10.918467 1920, 43.663389 10.979833 1311, 43.707000 11.046917 914, 43.818586 11.218125 624, 43.929916 11.389973 333, 43.808611 11.202778 43",
                "placeMarks": {
                    "abc": "LERS",
                    "0.923133 41.041028": "D239M",
                    "abc": "D347P",
                    "1.501861 41.546861": "VIBOK",
                    "2.107806 41.307111": "BCN",
                    "2.571432 41.467594": "T_O_C",
                    "3.196000 41.679611": "FEVIK",
                    "3.357889 41.733778": "DALIN",
                    "3.933750 41.923917": "PIVUS",
                    "4.415000 42.079722": "DIBER",
                    "4.997389 42.560222": "SOSUR",
                    "5.500000 42.966667": "ROTIS",
                    "5.828861 43.228556": "ADITA",
                    "6.023778 43.226750": "TURIL",
                    "6.601806 43.219472": "STP",
                    "6.841667 43.346111": "TIXIT",
                    "6.893333 43.373333": "RAPED",
                    "7.230000 43.549167": "NARTI",
                    "7.371111 43.622222": "PIGOS",
                    "7.632778 43.756861": "EKSID",
                    "7.755278 43.819444": "NOSTA",
                    "8.221000 44.055972": "ABN",
                    "8.803611 44.134722": "IXITO",
                    "9.054722 44.194722": "OTMUV",
                    "9.594167 44.321667": "KALMO",
                    "9.638965 44.312597": "T_O_D",
                    "10.070556 44.224167": "MIVKI",
                    "10.351667 44.165556": "BEROK",
                    "10.730342 44.023600": "RQ402",
                    "10.792844 43.933811": "RQ403",
                    "10.871781 43.819981": "RQ404",
                    "10.918467 43.752433": "RQ406",
                    "10.979833 43.663389": "UTUVI",
                    "11.046917 43.707000": "NIBTO",
                    "11.202778 43.808611": "LIRQ"
                },
                "owner": "123456789",
                "airCraft": "Boeing 737",
                "isPublic": true,
                "language": "en"
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `${tokenName}=${token}`
                },
            });

            const returnedRoute = await axios.post(host + 'api/flightRoutes/returnRoute', {
                "flightRouteId": result.data.id
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `${tokenName}=${token}`
                },
            });

            await axios.post(host + 'api/flightRoutes/deleteRoute', {
                flightRouteId: result.data.id,
                language: "en"
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `${tokenName}=${token}`
                },
            });
    
            await axios.post(host + 'api/users/deleteUser', {
                password: "A1aAAAAAAAAAAAAA",
                language: "en"
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `${tokenName}=${token}`
                },
            });

            expect(typeof returnedRoute.data.route._id).toBe('string')
        } catch (error) {
            expect(error.toString()).toBe('AxiosError: Request failed with status code 400')
            expect(error.response.data.message).toBe("The coordinates of the points are invalid")
        }
    })

    test('fails when flight route not found', async () => {
        try {
            const res = await axios.post(host + 'api/auth/authenticate', {
                email: "test@test.com",
                password: "A1aAAAAAAAAAAAAA",
                language: 'en'
            })

            const token = res.data.token
            const tokenName = "token"

            const returnedRoute = await axios.post(host + 'api/flightRoutes/returnRoute', {
                "flightRouteId": "507f1f77bcf86cd799439011"
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `${tokenName}=${token}`
                },
            });

            await axios.post(host + 'api/flightRoutes/deleteRoute', {
                flightRouteId: result.data.id,
                language: "en"
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `${tokenName}=${token}`
                },
            });

            expect(typeof returnedRoute.data.route._id).toBe('string')
        } catch (error) {
            expect(error.response.data.message).toBe("The search did not find any routes")
            expect(error.toString()).toBe('AxiosError: Request failed with status code 404')
        }
    })

    test('route has been returned', async () => {
        try {
            const res = await axios.post(host + 'api/auth/authenticate', {
                email: "test@test.com",
                password: "A1aAAAAAAAAAAAAA",
                language: 'en'
            })

            const token = res.data.token
            const tokenName = "token"

            const result = await axios.post(host + url, {
                "departure": "LERS",
                "arrival": "LIRQ",
                "fullRoute": "41.147500 1.167222 71, 41.064110 0.975881 2197, 41.041028 0.923133 3048, 41.198035 0.996912 4306, 41.354994 1.071045 5563, 41.410653 1.097425 6066, 41.479118 1.299977 6889, 41.546861 1.501861 7711, 41.469479 1.698809 8262, 41.391761 1.895286 8812, 41.307111 2.107806 9418, 41.377115 2.309101 9829, 41.446767 2.510829 10240, 41.467594 2.571432 10363, 41.536787 2.773722 10363, 41.605624 2.976445 10363, 41.679611 3.196000 10363, 41.733778 3.357889 10363, 41.801582 3.561854 10363, 41.869025 3.766251 10363, 41.923917 3.933750 10363, 41.990685 4.138936 10363, 42.057088 4.344552 10363, 42.079722 4.415000 10363, 42.204038 4.564486 10363, 42.328159 4.714561 10363, 42.452084 4.865228 10363, 42.560222 4.997389 10363, 42.683769 5.149185 10363, 42.807116 5.301586 10363, 42.930259 5.454596 10363, 42.966667 5.500000 10363, 43.089545 5.653804 10363, 43.228556 5.828861 10363, 43.226750 6.023778 10363, 43.224220 6.252326 10363, 43.221236 6.480854 10363, 43.219472 6.601806 10363, 43.317300 6.786927 10363, 43.346111 6.841667 10363, 43.373333 6.893333 10363, 43.470734 7.079349 10363, 43.549167 7.230000 10363, 43.622222 7.371111 10363, 43.718848 7.558663 10363, 43.756861 7.632778 10363, 43.819444 7.755278 10363, 43.915667 7.943845 9875, 44.011579 8.133022 9388, 44.055972 8.221000 9144, 44.087130 8.448725 9144, 44.117836 8.676688 9144, 44.134722 8.803611 9144, 44.194722 9.054722 9144, 44.247020 9.275372 9144, 44.298892 9.496414 9144, 44.321667 9.594167 9144, 44.312597 9.638965 8839, 44.266982 9.862746 7828, 44.224167 10.070556 6919, 44.177716 10.293663 5934, 44.165556 10.351667 5639, 44.088642 10.557479 4623, 44.023600 10.730342 3810, 43.933811 10.792844 3200, 43.819981 10.871781 2408, 43.752433 10.918467 1920, 43.663389 10.979833 1311, 43.707000 11.046917 914, 43.818586 11.218125 624, 43.929916 11.389973 333, 43.808611 11.202778 43",
                "placeMarks": {
                    "1.167222 41.147500": "LERS",
                    "0.923133 41.041028": "D239M",
                    "1.097425 41.410653": "D347P",
                    "1.501861 41.546861": "VIBOK",
                    "2.107806 41.307111": "BCN",
                    "2.571432 41.467594": "T_O_C",
                    "3.196000 41.679611": "FEVIK",
                    "3.357889 41.733778": "DALIN",
                    "3.933750 41.923917": "PIVUS",
                    "4.415000 42.079722": "DIBER",
                    "4.997389 42.560222": "SOSUR",
                    "5.500000 42.966667": "ROTIS",
                    "5.828861 43.228556": "ADITA",
                    "6.023778 43.226750": "TURIL",
                    "6.601806 43.219472": "STP",
                    "6.841667 43.346111": "TIXIT",
                    "6.893333 43.373333": "RAPED",
                    "7.230000 43.549167": "NARTI",
                    "7.371111 43.622222": "PIGOS",
                    "7.632778 43.756861": "EKSID",
                    "7.755278 43.819444": "NOSTA",
                    "8.221000 44.055972": "ABN",
                    "8.803611 44.134722": "IXITO",
                    "9.054722 44.194722": "OTMUV",
                    "9.594167 44.321667": "KALMO",
                    "9.638965 44.312597": "T_O_D",
                    "10.070556 44.224167": "MIVKI",
                    "10.351667 44.165556": "BEROK",
                    "10.730342 44.023600": "RQ402",
                    "10.792844 43.933811": "RQ403",
                    "10.871781 43.819981": "RQ404",
                    "10.918467 43.752433": "RQ406",
                    "10.979833 43.663389": "UTUVI",
                    "11.046917 43.707000": "NIBTO",
                    "11.202778 43.808611": "LIRQ"
                },
                "owner": "123456789",
                "airCraft": "Boeing 737",
                "isPublic": true,
                "language": "en"
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `${tokenName}=${token}`
                },
            });

            const returnedRoute = await axios.post(host + 'api/flightRoutes/returnRoute', {
                "flightRouteId": result.data.id
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `${tokenName}=${token}`
                },
            });

            await axios.post(host + 'api/flightRoutes/deleteRoute', {
                flightRouteId: result.data.id,
                language: "en"
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `${tokenName}=${token}`
                },
            });
    
            await axios.post(host + 'api/users/deleteUser', {
                password: "A1aAAAAAAAAAAAAA",
                language: "en"
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `${tokenName}=${token}`
                },
            });

            expect(typeof returnedRoute.data.route._id).toBe('string')
            expect(typeof returnedRoute.data.route.airCraft).toBe('string')
            expect(typeof returnedRoute.data.route.arrival).toBe('string')
            expect( typeof returnedRoute.data.route.departure).toBe('string')
            expect(typeof returnedRoute.data.route.fullRoute).toBe('string')
            expect(typeof returnedRoute.data.route.isPublic).toBe('boolean')
            expect(typeof returnedRoute.data.route.owner).toBe('object')
            expect(typeof returnedRoute.data.route.placeMarks).toBe('object')
        } catch (error) {
            expect(error).toBe("a")
        }
    })
})
