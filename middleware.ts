import { getToken } from "next-auth/jwt";
import { createI18nMiddleware } from "next-international/middleware";
import { NextRequest, NextResponse } from "next/server";

const I18nMiddleware = createI18nMiddleware({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  urlMappingStrategy: 'rewriteDefault'
})

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const token = await getToken({ req });
  
  
  const dashboardRegex = /^\/(?:[a-z]{2}\/)?dashboard(?:\/.*)?$/;
  if (url.pathname.match(dashboardRegex) && !token) {
    // block access to dashboard pages if user is not logged in
    url.pathname = `/auth/login`;
    return NextResponse.redirect(url);
  } else {
    return I18nMiddleware(req);
  }

  // Example of how to redirect users based on their role
  // if (userRole === 'admin') {
  //   return <AdminDashboard /> // Component for admin users
  // } else if (userRole === 'user') {
  //   return <UserDashboard /> // Component for regular users
  // } else {
  //   return <AccessDenied /> // Component shown for unauthorized access
  // }
}

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)']
}