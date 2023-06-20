import User from "../models/User";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../util/firebase";
import { db, firebaseAdmin } from "../util/admin";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

class UserRepository {

    constructor() {
        initializeApp(firebaseConfig);
    }

    async add(user: User, callback: any) {
        firebaseAdmin.auth().createUser({
            email: user.email,
            password: user.password,
            displayName: user.name,
        }).then((userRecord) => {
            const datetime = new Date();
            const created = datetime.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            db.collection("Users").doc(userRecord.uid).set({
                email: user.email,
                name: user.name,
                created: created,
                modified: null,
                deleted: null
            }).then(() => {
                const customClaims = { displayName: user.name };
                firebaseAdmin.auth().createCustomToken(userRecord.uid, customClaims).then((customToken) => {
                    console.log("Successfully created a new user.", userRecord.uid);
                    callback(null, userRecord);
                }).catch((error) => {
                    console.error("Error creating a custom token. ", error);
                    callback(error);
                });
            }).catch((error) => {
                console.error("Error adding user to Firestore. ", error);
                callback(error);
            });
        })
            .catch((error) => {
                console.error("Error creating a new user. ", error);
                callback(error);
            })
    }

    async get(uid: string, callback: any) {
        await db.collection("Users")
            .doc(uid)
            .get()
            .then((userDoc) => {
                if (!userDoc.exists) {
                    callback(`User with uid ${uid} does not exist`, null);
                } else {
                    const userData = userDoc.data();
                    callback(null, userData);
                }
            })
            .catch((error) => {
                console.error("Error getting user from Firestore. ", error);
                callback(error, null);
            });
    }

    async login(user: User): Promise<any> {
        try {
            const auth = getAuth();
            const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
            const loggedUser = {
                "uid": userCredential.user.uid,
                "name": userCredential.user.displayName
            };
            
            return loggedUser;
        } catch (error) {
            console.error("Error logging user: ", error);
            throw error;
        }
    }
}

export default UserRepository;