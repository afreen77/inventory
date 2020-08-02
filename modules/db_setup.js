const { Database } = require('sqlite3')
const sqlite = require('sqlite')
const fs = require('fs')
const path = require('path')

const setup = async () => {
    try {
        const fileName = path.join(process.cwd(), 'data', 'inventory.json')
        const dbFile = path.join(process.cwd(), 'data', 'inventory.sqlite')
        const dbExists = fs.existsSync(dbFile)
        if (dbExists) {
            return;
        } else {
            const content = fs.readFileSync(fileName, 'utf-8')
            const db = await sqlite.open({ filename: dbFile, driver: Database });
            await db.run('CREATE TABLE IF NOT EXISTS Inventory (id TEXT PRIMARY KEY, name TEXT, quantity INTEGER)')
            const initRows = JSON.parse(content)
            initRows.map(async element => {
                await db.run('INSERT INTO Inventory (id, name, quantity) VALUES (?, ? ,?)', element.id, element.name, element.quantity)
            });
            await db.close()
        }
    } catch(err) {
        console.error('Database create failed', err)
    }
}

setup().then(res => console.log(' Initial inventory DB has been setup', res))
