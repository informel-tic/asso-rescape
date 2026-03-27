/* eslint-disable @typescript-eslint/no-require-imports */
const Database = require('better-sqlite3');
const db = new Database('dev.db');

function updateRoles() {
    console.log('🔄 Updating User Roles for Governance...');

    // 1. rchon@rchon-dev.fr -> SUPER_ADMIN
    const rchonUpdate = db.prepare("UPDATE User SET role = 'SUPER_ADMIN' WHERE email = 'rchon@rchon-dev.fr'").run();
    if (rchonUpdate.changes > 0) {
        console.log('✅ rchon@rchon-dev.fr is now SUPER_ADMIN');
    } else {
        console.log('⚠️ User rchon@rchon-dev.fr not found');
    }

    // 2. Identify Vanessa and Nicolas
    const users = db.prepare('SELECT id, name, email FROM User').all();

    const directionUsers = users.filter(u =>
        (u.name && (u.name.toLowerCase().includes('vanessa') || u.name.toLowerCase().includes('nicolas'))) ||
        (u.email && (u.email.toLowerCase().includes('vanessa') || u.email.toLowerCase().includes('nicolas')))
    );

    directionUsers.forEach(u => {
        db.prepare("UPDATE User SET role = 'DIRECTION' WHERE id = ?").run(u.id);
        console.log(`✅ ${u.name} (${u.email}) is now DIRECTION`);
    });

    if (directionUsers.length === 0) {
        console.log('⚠️ Vanessa or Nicolas not found in DB by name/email.');
        console.log('Available users:', JSON.stringify(users, null, 2));
    }

    console.log('✨ Roles Update Completed.');
}

updateRoles();
