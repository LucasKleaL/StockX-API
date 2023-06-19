import Product from "../models/Product";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../util/firebase";
import { db, firebaseAdmin } from "../util/admin";

class ProductRepository {

    constructor() {
        initializeApp(firebaseConfig);
    }

    async add(product: Product): Promise<string> {
        try {
            const datetime = new Date();
            const created = datetime.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            const newProduct = {
                ...product,
                created: created,
                expired: false,
                deleted: false
            };

            const docRef = await db.collection("Product").add(newProduct);

            return docRef.id;
        } catch(error) {
            console.error("Error adding product to Firestore: ", error);
            throw error;
        }
    }

}

export default ProductRepository;