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
                second: '2-digit',
            });
            const newProduct = {
                ...product,
                created: created,
                modified: null,
                deleted: null,
            };
            const docRef = await db.collection("Products").add(newProduct);

            return docRef.id;
        } catch(error) {
            console.error("Error adding product to Firestore: ", error);
            throw error;
        }
    }
    
    async update(product: Product): Promise<string> {
        try {
            const uid = product.uid ?? '';
            const datetime = new Date();
            const modified = datetime.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            const updatedProduct = {
                ...product,
                modified: modified,
            };

            await db.collection('Products').doc(uid).update(updatedProduct);

            return uid;
        } catch (error) {
            console.error("Error updating product to Firestore: ", error);
            throw error;
        }
    }

    async get(proudctId: string): Promise<any> {
        try {
            const docRef = db.collection('Products').doc(proudctId);
            const snapshot = await docRef.get();

            if (snapshot.exists) {
                const productData = snapshot.data();
                if (productData?.deleted != null) {
                    return null;
                } else {
                    const productWithUid = {...productData, uid: snapshot.id};
                    return productWithUid;
                }
            } else {
                return null
            }
        } catch (error) {
            console.error("Error retrieving product by ID: ", error);
            throw error;
        }
    }

    async getAll(): Promise<any> {
        try {
            const querySnapshot = await db.collection('Products')
                .where('deleted', '==', null)
                .get();
            const products = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return {...data, uid: doc.id};
            });

            return products;
        } catch (error) {
            console.error('Error retrieving all products:', error);
            throw error;
        }
    }

    async delete(productId: string): Promise<string> {
        try {
            const docRef = db.collection('Products').doc(productId);
            const datetime = new Date();
            const deleted = datetime.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });

            await docRef.update({
                deleted: deleted
            });

            return productId;
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    }

}

export default ProductRepository;