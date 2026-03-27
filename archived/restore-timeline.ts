import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🔄 Restoring Timeline with 5 Phases...');

    // Delete existing entries to avoid order conflicts and ensure clean 5 phases
    await prisma.timelineEntry.deleteMany({});

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

    for (const phase of timelineData) {
        await prisma.timelineEntry.create({
            data: phase
        });
    }

    console.log('✅ Timeline restored successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
