import { NextResponse } from 'next/server';
/* import { jwtVerify } from 'jose'; */

export /* async */ function middleware(request){
    const jwt = request.cookies.get("ciceToken");
    
    //Verify that there is a token to enter the Dashboard
    if( request.nextUrl.pathname.includes("/dashboard")){
        if (jwt === undefined){
            return NextResponse.redirect(new URL("/",request.url));
        }
    }
    if( request.nextUrl.pathname.includes("/api/users")){
        if (jwt === undefined){
            return NextResponse.redirect(new URL("/",request.url));
        }
    }
        /* try{
            //TODO : se desea verificar CONTENIDO del token, no solo su existencia
            //no funciona el jwtVerify de jose.
            const { payload } = await jwtVerify(jwt, new TextEncoder().encode(process.env.JWT_SECRET));            
            return NextResponse.next();
        }catch(error){
            console.log(error);
            return NextResponse.redirect(new URL("/", request.url));
        } */

    else{
        return NextResponse.next();
    }
}


/* export const config = {
    // list of paths to protect. In cases where you want to protect the subpaths, add :path*
    matcher: ["/dashboard/:path*", "/api/:path*"],
  };
 */
  