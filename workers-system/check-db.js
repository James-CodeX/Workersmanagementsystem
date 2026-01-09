const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkConnection() {
    console.log('Testing database connection...\n');
    
    try {
        const startTime = Date.now();
        await prisma.$connect();
        const connectTime = Date.now() - startTime;
        console.log(`✓ Connected to database in ${connectTime}ms`);
        
        const queryStart = Date.now();
        const userCount = await prisma.user.count();
        const queryTime = Date.now() - queryStart;
        console.log(`✓ Query executed in ${queryTime}ms`);
        console.log(`✓ Found ${userCount} users in database`);
        
        await prisma.$disconnect();
        console.log('\n✓ Database connection is healthy!');
        process.exit(0);
    } catch (error) {
        console.error('✗ Database connection failed:');
        console.error(error.message);
        process.exit(1);
    }
}

checkConnection();
