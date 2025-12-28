const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function resetAdminPassword() {
    console.log('🔄 Resetting admin password...\n');

    try {
        // Try to find existing manager accounts
        const managers = await prisma.user.findMany({
            where: { role: 'MANAGER' }
        });

        console.log('Found manager accounts:', managers.map(m => m.username).join(', ') || 'None');

        // Update or create admin user with new password
        const hashedPassword = await bcrypt.hash('admin123', 10);
        
        const admin = await prisma.user.upsert({
            where: { username: 'admin' },
            update: {
                password: hashedPassword,
            },
            create: {
                username: 'admin',
                password: hashedPassword,
                role: 'MANAGER',
            },
        });

        console.log('\n✅ Admin password reset successfully!');
        console.log('\n📋 Login credentials:');
        console.log('   Username: admin');
        console.log('   Password: admin123');
        console.log('\n⚠️  Make sure to change this password after logging in!\n');

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

resetAdminPassword();
