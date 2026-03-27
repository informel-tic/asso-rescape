// eslint-disable-next-line @typescript-eslint/no-require-imports
const Database = require('better-sqlite3');
const db = new Database('dev.db');

function seed() {
    console.log('🔄 Manual DB Sync for Timeline (5 Phases)...');

    const now = new Date().toISOString();

    // Clear existing
    db.prepare('DELETE FROM TimelineEntry').run();

    const timelineData = [
        {
            order: 1,
            title: "Phase 1 - \"Du Cœur à la Couture\"",
            icon: "😷",
            content: "Un masque cousu par amour devient le point de départ. La chaîne de masques commence simplement, motivée par la peur de perdre à nouveau. Du tissu élastique arrive sur une palette, le premier pas vers l'aide collective.",
        },
        {
            order: 2,
            title: "Phase 2 - \"Quand l'Aide Frappe à la Porte\"",
            icon: "🍱",
            content: "Un monsieur en difficulté apporte ses soucis de nourriture. L'association s'élargit naturellement au-delà des masques. Un sac de nourriture rejoint la palette : ReScape devient multifonctionnel.",
        },
        {
            order: 3,
            title: "Phase 3 - \"De la Rue à la Légalité\"",
            icon: "⚖️",
            content: "Les armoires débordent du trottoir. Pour continuer sans déranger, ils doivent se structurer. Nait alors la nécessité de transformer une belle action citoyenne en association officielle, inscrite dans les règles.",
        },
        {
            order: 4,
            title: "Phase 4 - \"L'Armoire Grandit, Les Rêves S'Envolent\"",
            icon: "🧺",
            content: "L'association se crée avec une armoire encore plus grande. Les actions se multiplient : événements scolaires, noël, potager partagé. ReScape devient un véritable hub communautaire au cœur d'Aniche.",
        },
        {
            order: 5,
            title: "Phase 5 - \"Trouver Sa Maison\"",
            icon: "🏠",
            content: "Après l'ampleur, vient la responsabilité. L'association se stabilise au local, s'organise contre le gaspillage et cherche des partenaires. ReScape grandit, mais reste accessible et à l'écoute.",
        }
    ];

    const insert = db.prepare(`
        INSERT INTO TimelineEntry (id, title, icon, content, "order", createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    timelineData.forEach((p, i) => {
        const id = `tl${i + 1}`;
        insert.run(id, p.title, p.icon, p.content, p.order, now, now);
    });

    console.log('✅ DB Sync Completed.');
}

seed();
