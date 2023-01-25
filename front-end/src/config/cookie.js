import Cookies from 'universal-cookie'
import jwtDecode from 'jwt-decode'

const cookie = new Cookies()
const cookiesName = 'accessToken'

export default {
    getCookies: () => cookie.get(cookiesName),
    createCookie: (value) => cookie.set(cookiesName, value, { sameSite: 'strict' }),
    // deleteCookie: () => cookie.remove(cookiesName),
    getDecodedCookie: () => jwtDecode(cookie.get(cookiesName))
}