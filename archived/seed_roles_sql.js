const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');

const db = new Database('dev.db');

async function seed() {
    console.log('Seeding roles manually with better-sqlite3...');

    const passwordHash = await bcrypt.hash('Rescape2026!', 10);
    const now = new Date().toISOString();

    const insertUser = db.prepare(`
        INSERT INTO User (id, email, password, name, role, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(email) DO UPDATE SET role=excluded.role, password=excluded.password, name=excluded.name
    `);

    const usersToCreate = [
        { id: 'c1', email: 'superadmin@rescape.fr', name: 'Super Admin', role: 'SUPER_ADMIN' },
        { id: 'c2', email: 'direction@rescape.fr', name: 'Direction', role: 'DIRECTION' },
        { id: 'c3', email: 'partenaire@rescape.fr', name: 'Entreprise Partenaire', role: 'PARTENAIRE' },
        { id: 'c4', email: 'benevole@rescape.fr', name: 'Jean Bénévole', role: 'BENEVOLE' },
        { id: 'c5', email: 'delaruevanessa48@gmail.com', name: 'Vanessa Delarue', role: 'SUPER_ADMIN' }
    ];

    for (const u of usersToCreate) {
        insertUser.run(u.id, u.email, passwordHash, u.name, u.role, now, now);
    }

    console.log('Users seeded with roles.');

    const insertPartner = db.prepare(`
        INSERT INTO Partner (id, name, isHighlighted, userId, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT(userId) DO UPDATE SET isHighlighted=excluded.isHighlighted
    `);

    // Add partner link
    insertPartner.run('p1', 'Entreprise Partenaire', 1, 'c3', now, now);

    console.log('Partner profile connected.');

}

seed();
