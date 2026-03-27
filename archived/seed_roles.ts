const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const passwordHash = await bcrypt.hash('Rescape2026!', 10);

    const usersToCreate = [
        { email: 'superadmin@rescape.fr', name: 'Super Admin', role: 'SUPER_ADMIN' },
        { email: 'direction@rescape.fr', name: 'Direction', role: 'DIRECTION' },
        { email: 'partenaire@rescape.fr', name: 'Entreprise Partenaire', role: 'PARTENAIRE' },
        { email: 'benevole@rescape.fr', name: 'Jean Bénévole', role: 'BENEVOLE' },
        { email: 'delaruevanessa48@gmail.com', name: 'Vanessa Delarue', role: 'SUPER_ADMIN' }, // Update Vanessa
    ];

    for (const u of usersToCreate) {
        await prisma.user.upsert({
            where: { email: u.email },
            update: { role: u.role, password: passwordHash, name: u.name },
            create: { email: u.email, password: passwordHash, name: u.name, role: u.role },
        });
    }

    console.log("Users seeded with different roles successfully.");

    // Also create one partner linked to the partenaire user, just in case.
    const partenaireUser = await prisma.user.findUnique({ where: { email: 'partenaire@rescape.fr' } });
    if (partenaireUser) {
        await prisma.partner.upsert({
            where: { userId: partenaireUser.id },
            update: { name: 'Entreprise Partenaire', isHighlighted: true },
            create: { name: 'Entreprise Partenaire', isHighlighted: true, userId: partenaireUser.id },
        });
        console.log("Partner profile created.");
    }

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
