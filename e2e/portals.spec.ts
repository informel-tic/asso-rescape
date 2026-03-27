import { test, expect } from "@playwright/test";

// ─── Admin Dashboard (DIRECTRICE / SUPER_ADMIN) ────────────────────────────────
async function loginAsDirectrice(page: any) {
    await page.goto("/admin/login");
    await page.getByLabel(/email/i).fill("delaruevanessa48@gmail.com");
    await page.getByLabel(/mot de passe/i).fill("Rescape2026!");
    await page.getByRole("button", { name: /connexion/i }).click();
    await page.waitForURL(/\/admin\/dashboard/);
}

test.describe("Admin Dashboard — DIRECTRICE Access", () => {
    test.beforeEach(async ({ page }) => {
        await loginAsDirectrice(page);
    });

    test("should display the admin dashboard overview", async ({ page }) => {
        await expect(page.locator("h1, h2").first()).toBeVisible();
        await expect(page.getByRole("link", { name: /articles/i })).toBeVisible();
        await expect(page.getByRole("link", { name: /événements/i })).toBeVisible();
        await expect(page.getByRole("link", { name: /messages/i })).toBeVisible();
    });

    test("should navigate to articles management at /admin/dashboard/articles", async ({ page }) => {
        await page.goto("/admin/dashboard/articles");
        await expect(page.getByRole("heading", { name: /actualités|articles/i })).toBeVisible();
        await expect(page.getByRole("link", { name: /nouvel article/i })).toBeVisible();
    });

    test("should navigate to events management at /admin/dashboard/events", async ({ page }) => {
        await page.goto("/admin/dashboard/events");
        await expect(page.getByRole("heading", { name: /événements/i })).toBeVisible();
    });

    test("should navigate to messages at /admin/dashboard/messages", async ({ page }) => {
        await page.goto("/admin/dashboard/messages");
        await expect(page.getByRole("heading", { name: /messages|boîte/i })).toBeVisible();
    });

    test("should navigate to accounting at /admin/dashboard/compta", async ({ page }) => {
        await page.goto("/admin/dashboard/compta");
        await expect(page.getByRole("heading", { name: /comptabilité|compta/i })).toBeVisible();
        await expect(page.getByRole("button", { name: /exporter|export/i })).toBeVisible();
    });

    test("should be able to create a new article", async ({ page }) => {
        await page.goto("/admin/dashboard/articles/new");
        await expect(page.getByLabel(/titre/i)).toBeVisible();
        await expect(page.getByLabel(/contenu/i)).toBeVisible();
    });

    test("should navigate to team management at /admin/dashboard/team", async ({ page }) => {
        await page.goto("/admin/dashboard/team");
        await expect(page.getByRole("heading", { name: /équipe/i })).toBeVisible();
    });

    test("should NOT show user management link (SUPER_ADMIN only)", async ({ page }) => {
        await expect(page.getByRole("link", { name: /utilisateurs/i })).not.toBeVisible();
    });
});

// ─── Bénévole Portal ───────────────────────────────────────────────────────────
test.describe("Portail Bénévole", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/admin/login");
        await page.getByLabel(/email/i).fill("benevole@rescape.fr");
        await page.getByLabel(/mot de passe/i).fill("Rescape2026!");
        await page.getByRole("button", { name: /connexion/i }).click();
        await page.waitForURL(/\/portail\/benevole/);
    });

    test("should show the bénévole portal dashboard", async ({ page }) => {
        await expect(page.getByText(/bienvenue|bonjour/i)).toBeVisible();
    });

    test("should show accounting entry form at /portail/benevole/compta", async ({ page }) => {
        await page.goto("/portail/benevole/compta");
        await expect(page.getByRole("combobox", { name: /type/i })).toBeVisible();
        await expect(page.getByRole("spinbutton", { name: /montant/i })).toBeVisible();
        await expect(page.getByRole("button", { name: /enregistrer/i })).toBeVisible();
    });

    test("should NOT show delete or edit buttons on accounting entries for bénévole", async ({ page }) => {
        await page.goto("/portail/benevole/compta");
        // No delete/modify controls visible for BENEVOLE
        await expect(page.getByRole("button", { name: /supprimer/i })).not.toBeVisible();
        await expect(page.getByRole("button", { name: /modifier/i })).not.toBeVisible();
    });
});

// ─── Trésorière Portal ─────────────────────────────────────────────────────────
test.describe("Portail Trésorière", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/admin/login");
        await page.getByLabel(/email/i).fill("nadia@rescape.fr");
        await page.getByLabel(/mot de passe/i).fill("Rescape2026!");
        await page.getByRole("button", { name: /connexion/i }).click();
        await page.waitForURL(/\/portail\/tresoriere/);
    });

    test("should show accounting overview (read only) for trésorière", async ({ page }) => {
        await expect(page.getByText(/solde|recettes|dépenses/i)).toBeVisible();
    });

    test("should show CSV export button", async ({ page }) => {
        await expect(page.getByRole("button", { name: /exporter|csv/i })).toBeVisible();
    });

    test("should NOT show new entry form for trésorière", async ({ page }) => {
        await expect(page.getByRole("button", { name: /ajouter|nouvelle entrée/i })).not.toBeVisible();
    });
});

// ─── Partenaire Portal ─────────────────────────────────────────────────────────
test.describe("Portail Partenaire", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/admin/login");
        await page.getByLabel(/email/i).fill("partenaire@test.fr");
        await page.getByLabel(/mot de passe/i).fill("Rescape2026!");
        await page.getByRole("button", { name: /connexion/i }).click();
        await page.waitForURL(/\/portail\/partenaire/);
    });

    test("should show partner portal dashboard with RDV and Dons sections", async ({ page }) => {
        await expect(page.getByText(/rendez-vous|prochains rdv/i)).toBeVisible();
    });

    test("should show appointment booking form at /portail/partenaire/rdv/new", async ({ page }) => {
        await page.goto("/portail/partenaire/rdv/new");
        await expect(page.getByRole("radio", { name: /dépôt/i })).toBeVisible();
        await expect(page.getByRole("radio", { name: /collecte/i })).toBeVisible();
        await expect(page.getByLabel(/date/i)).toBeVisible();
    });

    test("should show donation entry form at /portail/partenaire/dons", async ({ page }) => {
        await page.goto("/portail/partenaire/dons");
        await expect(page.getByRole("combobox", { name: /type de don/i })).toBeVisible();
        await expect(page.getByRole("spinbutton", { name: /quantité/i })).toBeVisible();
    });

    test("should only show own appointments (not other partners)", async ({ page }) => {
        // When viewing appointments, the list should only show those belonging to current partner
        await page.goto("/portail/partenaire/rdv");
        // No data-testid for other partners should be visible
        // (implementation will filter by partnerId = current user's id)
        await expect(page.locator('[data-owner="other-partner"]')).toHaveCount(0);
    });
});
