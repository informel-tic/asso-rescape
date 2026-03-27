/* eslint-disable @typescript-eslint/no-require-imports */
const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const db = new Database('dev.db');

async function finalizeUsers() {
    console.log('🚀 Finalizing User Setup with Timestamps...');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    const now = new Date().toISOString();

    // 1. Create or Update rchon@rchon-dev.fr
    const rchon = db.prepare("SELECT id FROM User WHERE email = 'rchon@rchon-dev.fr'").get();
    if (rchon) {
        db.prepare("UPDATE User SET role = 'SUPER_ADMIN', name = 'R. Chon', updatedAt = ? WHERE email = 'rchon@rchon-dev.fr'").run(now);
        console.log('✅ Updated rchon@rchon-dev.fr to SUPER_ADMIN');
    } else {
        db.prepare("INSERT INTO User (id, name, email, password, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)").run(
            'u-rchon', 'R. Chon', 'rchon@rchon-dev.fr', hashedPassword, 'SUPER_ADMIN', now, now
        );
        console.log('✅ Created rchon@rchon-dev.fr as SUPER_ADMIN');
    }

    // 2. Nicolas Delarue
    const nicolas = db.prepare("SELECT id, name FROM User WHERE name LIKE '%Nicolas%' OR email LIKE '%nicolas%'").get();
    if (nicolas) {
        db.prepare("UPDATE User SET role = 'DIRECTION', updatedAt = ? WHERE id = ?").run(now, nicolas.id);
        console.log(`✅ ${nicolas.name} is now DIRECTION`);
    } else {
        console.log('⚠️ Nicolas Delarue not found. Creating a placeholder account...');
        db.prepare("INSERT INTO User (id, name, email, password, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)").run(
            'u-nicolas', 'Nicolas Delarue', 'nicolas@rescape.fr', hashedPassword, 'DIRECTION', now, now
        );
        console.log('✅ Created nicolas@rescape.fr as DIRECTION');
    }

    console.log('✨ All requested roles are synchronized.');
}

finalizeUsers();
