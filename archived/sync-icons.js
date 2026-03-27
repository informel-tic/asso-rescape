/* eslint-disable @typescript-eslint/no-require-imports */
const Database = require('better-sqlite3');
const db = new Database('dev.db');

function syncIcons() {
    console.log('🔄 Syncing Action Icons to Lucide keys...');

    const updates = [
        { title: "Armoire solidaire", icon: "warehouse" },
        { title: "Sacs alimentaires d'urgence", icon: "utensils" },
        { title: "Potager jardin du partage", icon: "sprout" },
        { title: "Événements scolaires", icon: "graduation-cap" },
        { title: "Noël solidaire", icon: "gift" },
        { title: "Ateliers et animations", icon: "palette" }
    ];

    const stmt = db.prepare('UPDATE Action SET icon = ? WHERE title = ?');

    updates.forEach(up => {
        const result = stmt.run(up.icon, up.title);
        if (result.changes > 0) {
            console.log(`✅ Updated ${up.title} -> ${up.icon}`);
        } else {
            console.log(`⚠️ No action found with title "${up.title}"`);
        }
    });

    console.log('✨ Icon Sync Completed.');
}

syncIcons();
