import { db } from "./config/db";
import bcrypt from "bcryptjs";

async function fixPasswords() {
    const [users]: any = await db.execute("SELECT id, password FROM users");

    for (const user of users) {
        const current = user.password;

        // Si el hash NO tiene 60 caracteres, significa que está incompleto → volver a encriptar
        const needsRehash = !current || current.length < 60;

        if (needsRehash) {
            const originalPassword = current; // en tu caso es texto plano porque se truncó
            const newHash = await bcrypt.hash(originalPassword, 10);

            await db.execute(
                "UPDATE users SET password = ? WHERE id = ?",
                [newHash, user.id]
            );

            console.log(`User ${user.id} → password reparada`);
        } else {
            console.log(`User ${user.id} → OK (hash válido)`);
        }
    }

    console.log("Proceso finalizado");
    process.exit();
}

fixPasswords();
