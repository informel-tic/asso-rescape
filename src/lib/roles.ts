/**
 * Centralized role checking for the application.
 * This prevents hardcoded role checking issues when role names vary (e.g., DIRECTRICE, DIRECTION, DIRECTEUR ADJOINT).
 */

export const DIRECTION_ROLES = [
    "DIRECTION",
    "DIRECTRICE",
    "DIRECTEUR",
    "DIRECTEUR ADJOINT",
    "DIRECTRICE ADJOINTE",
    "TRESORIERE",
    "TRESORIER"
];

export const PORTAL_ROLES = [
    "SUPER_ADMIN",
    ...DIRECTION_ROLES,
    "BENEVOLE",
    "PARTENAIRE"
];

/**
 * Check if a given role is considered a Direction role.
 */
export function isDirectionRole(role: string | null | undefined): boolean {
    if (!role) return false;
    return DIRECTION_ROLES.includes(role.toUpperCase());
}

/**
 * Check if the role is a Super Admin.
 */
export function isSuperAdmin(role: string | null | undefined): boolean {
    if (!role) return false;
    return role.toUpperCase() === "SUPER_ADMIN";
}

/**
 * Check if the role has administrative access (Super Admin or any Direction role).
 */
export function hasAdminAccess(role: string | null | undefined): boolean {
    if (!role) return false;
    return isSuperAdmin(role) || isDirectionRole(role);
}

/**
 * Check if a given role can access the portal.
 */
export function isPortalRole(role: string | null | undefined): boolean {
    if (!role) return false;
    return PORTAL_ROLES.includes(role.toUpperCase());
}
