import {NextApiRequest, NextApiResponse} from 'next'
import {Database, OPEN_READWRITE} from 'sqlite3'
import {open} from 'sqlite'
import path from "path";

const dbFile = path.join(process.cwd(), 'data', 'inventory.sqlite')

const inventory = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const db = await open({filename: dbFile, driver: Database});
    const rows = await db.all('SELECT * from Inventory')
    res.json(rows)
  }

  if (req.method === 'PUT') {
    const { id, quantity } = JSON.parse(req.body)
    const db = await open({filename: dbFile, driver: Database, mode: OPEN_READWRITE })
    const query = await db.prepare('UPDATE Inventory SET quantity = ? WHERE id = ?')
    const response = await query.run(quantity, id)
    const { changes } = response;
    if (changes) {
        res.status(200).send({message: 'Update success !', response })
    } else {
      res.status(500).send({error: 'Update failed'})
    }
  }
}


export default inventory
