const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');

const db = new Database('dev.db');

async function seed() {
    console.log('Seeding manually with better-sqlite3...');

    const passwordHash = await bcrypt.hash('Rescape2026!', 10);
    const now = new Date().toISOString();

    // Create Users
    const insertUser = db.prepare(`
    INSERT OR IGNORE INTO User (id, email, password, name, role, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

    insertUser.run('u1', 'admin@rescape.fr', passwordHash, 'Maintainer', 'ADMIN', now, now);
    insertUser.run('u2', 'delaruevanessa48@gmail.com', passwordHash, 'Vanessa Delarue', 'ADMIN', now, now);

    console.log('Users seeded.');

    // Create Stats
    const insertStat = db.prepare(`
    INSERT OR IGNORE INTO Stat (id, label, value, suffix, updatedAt)
    VALUES (?, ?, ?, ?, ?)
  `);

    const stats = [
        { id: 's1', label: "Années d'existence", value: 5, suffix: "+" },
        { id: 's2', label: "Personnes aidées", value: 1200, suffix: "" },
        { id: 's3', label: "Kg anti-gaspi", value: 5000, suffix: "+" },
        { id: 's4', label: "Partenaires", value: 15, suffix: "" },
    ];

    for (const s of stats) {
        // Check duplication by label manually if needed, but ID is primary key.
        // Since we hardcoded ID here for simplicity, OR IGNORE handles it.
        // But if we want to avoid duplicates by label...
        // Let's just try to insert. If conflict on ID, ignore.
        // If conflict on label (no unique constraint on label in schema), we might duplicate rows if re-running without truncate.
        // But schema says ID is unique.
        // For simplicity, delete all stats first? No, truncation is dangerous. Be careful.
        // Just use NOT EXISTS.
        const exists = db.prepare('SELECT 1 FROM Stat WHERE label = ?').get(s.label);
        if (!exists) {
            insertStat.run(s.id, s.label, s.value, s.suffix, now);
        }
    }
    console.log('Stats seeded.');

    // Create Actions
    const insertAction = db.prepare(`
    INSERT OR IGNORE INTO Action (id, title, description, icon, status, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

    const actions = [
        { title: "Armoire solidaire", description: "Une armoire en libre-service...", icon: "🧺", status: "En cours" },
        { title: "Sacs alimentaires d'urgence", description: "Pour les familles en difficulté...", icon: "🤝", status: "En cours" },
        { title: "Potager jardin du partage", description: "Un espace vert collectif...", icon: "🌱", status: "Saisonnier" },
        { title: "Événements scolaires", description: "Interventions dans les écoles...", icon: "🎒", status: "Ponctuel" },
        { title: "Noël solidaire", description: "Collecte de jouets...", icon: "🎄", status: "Saisonnier" },
        { title: "Ateliers et animations", description: "Cuisine zéro déchet...", icon: "🧶", status: "En cours" },
    ];

    let idCounter = 1;
    for (const a of actions) {
        const exists = db.prepare('SELECT 1 FROM Action WHERE title = ?').get(a.title);
        if (!exists) {
            insertAction.run(`a${idCounter++}`, a.title, a.description, a.icon, a.status, now, now);
        }
    }
    console.log('Actions seeded.');
}

seed();
