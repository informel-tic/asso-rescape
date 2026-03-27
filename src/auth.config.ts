import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/admin/login",
    },
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.organizationName = user.organizationName;
            }
            return token;
        },
        session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
                if (token.organizationName) {
                    session.user.organizationName = token.organizationName as string;
                }
            }
            return session;
        },
        authorized() {
            // By default, let the middleware completely handle routing and redirection
            // We return true so NextAuth wrapper doesn't inject automatic redirect loops
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
    secret: process.env.AUTH_SECRET || "changeme_in_production_secret_key_123",
} satisfies NextAuthConfig;
