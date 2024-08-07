// Import các module từ thư viện Node.js và các module local
import express from 'express';
import { connection } from './database/database.config.js';
import router from './apis/index.js';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/apis', router);


(async () => {
    try {
        await connection.getConnection();
        console.log('Database connected');

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
})();
//Role//alter/admin/account admin