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
