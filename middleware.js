import { NextResponse, NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request) {

    let verify = true
    let url = request.url
    console.log(url)

    if (verify && url.includes('/profile')) {
        console.log('squirtssssssssss')
        return NextResponse.redirect(new URL('/profile', request.url))
    }

    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.rewrite(new URL('/profile/', request.url))
    }


}
// import { NextResponse } from 'next/server'

// const middleware = (request) => {
//     console.log('asdasdasds')
//     if (request.nextUrl.pathname === request.nextUrl.pathname.toLocaleLowerCase())
//         return NextResponse.next()
//     return NextResponse.redirect(
//         `${request.nextUrl.origin}${request.nextUrl.pathname.toLocaleLowerCase()}`
//     )
// }

// export { middleware }

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/profile/play/fantasy5s',
}