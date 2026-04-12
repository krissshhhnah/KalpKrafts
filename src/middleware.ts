import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: '/auth/signin',
  },
});

export const config = {
  // Apply middleware protection to these specific routes
  matcher: [
    "/dashboard/:path*",
    "/tracks/:path*",
    "/arena/:path*",
    "/debug/:path*",
    "/upgrade/:path*",
  ],
};
