import "@testing-library/jest-dom";
import { vi } from "vitest";
import React from "react";

// Mock framer-motion
vi.mock("framer-motion", () => ({
    motion: {
        div: React.forwardRef(({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>, ref: React.Ref<HTMLDivElement>) =>
            React.createElement("div", { ...props, ref }, children)
        ),
        p: React.forwardRef(({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>, ref: React.Ref<HTMLParagraphElement>) =>
            React.createElement("p", { ...props, ref }, children)
        ),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
}));
// Mock Next.js navigation
vi.mock("next/navigation", () => ({
    useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
        refresh: vi.fn(),
        back: vi.fn(),
        forward: vi.fn(),
        prefetch: vi.fn(),
    }),
    usePathname: () => "/",
    useSearchParams: () => new URLSearchParams(),
    redirect: vi.fn(),
}));

// Mock Next.js cache
vi.mock("next/cache", () => ({
    revalidatePath: vi.fn(),
    revalidateTag: vi.fn(),
}));

// Mock next-auth
vi.mock("next-auth/react", () => ({
    useSession: vi.fn(() => ({ data: null, status: "unauthenticated" })),
    signIn: vi.fn(),
    signOut: vi.fn(),
    SessionProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock Prisma (global mock, override per test as needed)
vi.mock("@/lib/prisma", () => ({
    prisma: {
        user: {
            findUnique: vi.fn(),
            findMany: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
            upsert: vi.fn(),
        },
        article: {
            findUnique: vi.fn(),
            findMany: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
        },
        event: {
            findUnique: vi.fn(),
            findMany: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
        },
        message: {
            findMany: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
        },
        partner: {
            findMany: vi.fn(),
            create: vi.fn(),
            delete: vi.fn(),
        },
        stat: {
            findMany: vi.fn(),
            update: vi.fn(),
        },
        action: {
            findMany: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
        },
        accountingEntry: {
            findMany: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
            aggregate: vi.fn(),
        },
        appointment: {
            findMany: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
        },
        donation: {
            findMany: vi.fn(),
            create: vi.fn(),
            delete: vi.fn(),
        },
        teamMember: {
            findMany: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
        },
        timelineEntry: {
            findMany: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
        },
        socialLink: {
            findMany: vi.fn(),
            update: vi.fn(),
            upsert: vi.fn(),
        },
    },
}));

// Mock auth
vi.mock("@/auth", () => ({
    auth: vi.fn(() => null),
    signIn: vi.fn(),
    signOut: vi.fn(),
}));
