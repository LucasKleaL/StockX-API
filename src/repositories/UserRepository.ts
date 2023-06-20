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

    async get(userId: string): Promise<any> {
        try {
            const docRef = db.collection('Users').doc(userId);
            const snapshot = await docRef.get();

            if (snapshot.exists) {
                const userData = snapshot.data();
                if (userData?.deleted != null) {
                    return null;
                } else {
                    const userWithUid = {...userData, uid: snapshot.id};
                    return userWithUid;
                }
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error retrieving user by ID: ", error);
            throw error;
        }
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