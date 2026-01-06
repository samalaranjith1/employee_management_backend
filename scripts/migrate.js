const mongoose = require('mongoose');

const LOCAL_URI = 'mongodb://localhost:27017/ems_db';
// Remote URI from user request
const REMOTE_URI = 'mongodb+srv://samalaranjith1:Ranjith1956@cluster0.r3efdtw.mongodb.net/ems_db';

async function migrate() {
    console.log('Starting migration...');

    // 1. Connect to Local
    console.log(`Connecting to Local: ${LOCAL_URI}`);
    const localConn = mongoose.createConnection(LOCAL_URI);
    await new Promise((resolve, reject) => {
        localConn.once('open', () => {
            console.log('Connected to Local DB.');
            resolve();
        });
        localConn.once('error', (err) => {
            console.error('Local Connection Error:', err);
            reject(err);
        });
    });

    // 2. Connect to Remote
    console.log(`Connecting to Remote: ${REMOTE_URI}`);
    const remoteConn = mongoose.createConnection(REMOTE_URI);
    await new Promise((resolve, reject) => {
        remoteConn.once('open', () => {
            console.log('Connected to Remote DB.');
            resolve();
        });
        remoteConn.once('error', (err) => {
            console.error('Remote Connection Error:', err);
            reject(err);
        });
    });

    try {
        // 3. List Collections from Local
        const collections = await localConn.db.listCollections().toArray();
        console.log(`Found ${collections.length} collections to migrate.`);

        for (const colInfo of collections) {
            const colName = colInfo.name;
            if (colName.startsWith('system.')) continue; // Skip system collections

            console.log(`\nProcessing collection: ${colName}`);

            // Fetch data
            const docs = await localConn.db.collection(colName).find().toArray();
            console.log(`  - Found ${docs.length} documents.`);

            if (docs.length === 0) continue;

            // Insert into Remote
            try {
                // Clear remote collection first? User said "move data", implying current state should be replicated.
                // Usually safer to NOT drop, but if we want exact replica, dropping is cleaner.
                // Given "move", I'll assume they want the local state to exist on remote. 
                // Any existing data on remote (if any) might conflict.
                // I'll try insertMany. If it fails due to duplicates, I'll log it.

                // Optional: Delete all in remote to ensure clean slate?
                // console.log(`  - Clearing remote collection...`);
                // await remoteConn.db.collection(colName).deleteMany({});

                const result = await remoteConn.db.collection(colName).insertMany(docs, { ordered: false });
                console.log(`  - Successfully inserted ${result.insertedCount} documents.`);
            } catch (err) {
                if (err.writeErrors) {
                    console.warn(`  - Warning: Some documents failed (likely duplicates). Inserted: ${err.insertedDocs ? err.insertedDocs.length : 'partial'}`);
                } else if (err.code === 11000) {
                    console.warn(`  - Warning: Duplicate key error. Some documents may not have been inserted.`);
                } else {
                    console.error(`  - Error inserting into ${colName}:`, err.message);
                }
            }
        }

        console.log('\nMigration completed successfully.');
    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        await localConn.close();
        await remoteConn.close();
        console.log('Connections closed.');
    }
}

migrate();
