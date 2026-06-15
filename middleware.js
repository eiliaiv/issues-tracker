export { default } from "next-auth/middleware"


export const config = {
  matcher: [
    '/issue/newIssues',
    '/issue/:path*/edit:id*'
  ]
}