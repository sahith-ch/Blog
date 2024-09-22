import { cookies } from 'next/headers';
import { usePathname } from 'next/navigation';
import { NextRequest,NextResponse } from 'next/server';
const authroutes = [
    "/Login",
    "/Signup"   
]
console.log('hi')
export default function middleware (req:any){
    const {nextUrl} = req
    const isLogged  = cookies().get('authToken')
const isAuthroute  = authroutes.includes(nextUrl.pathname)
const isapiroutes = nextUrl.pathname.includes("/api/auth")

if(isapiroutes){
return null
 }
if(isAuthroute){
    if(isLogged){
        
        return NextResponse.redirect(new URL("/Home",nextUrl))
    }
    return null;
}
if(!isLogged&&nextUrl.pathname!=="/"){
return NextResponse.redirect(new URL("/Login",nextUrl))


}

}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  }