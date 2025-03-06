import React, { Children, createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import app from '../Firebase/Firebase.config';
import Axiospublic from '../Pages/Axiospublic/Axiospublic';

export const Authcontext = createContext();
const auth = getAuth(app)

const Authprovider = ({ children }) => {

    const googleProvider = new GoogleAuthProvider()



    const [user, setUser] = useState(null)
    const axiospublic = Axiospublic();

    const [loading, setLoading] = useState(true)
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googlesignIN = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const updateUser = (name, image) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: image
        })
            .then(() => { })
            .catch((error) => console.log(error))

    }

    const Logout = () => {
        setLoading(true)
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentuser => {
            console.log('user observing')
            setUser(currentuser)
            if (currentuser) {
                const userinfo = {
                    email: currentuser.email
                }

                //এখানে থেকেই verify হয় মুলত

                axiospublic.post('/jwt', userinfo)
                    .then(res => {
                        console.log(res)
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token)
                        }
                        else {
                            localStorage.removeItem('access-token')
                        }
                    })
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [axiospublic])
    const authInfo = {
        createUser,
        signInUser,
        user,
        Logout,
        updateUser,
        loading,
        googlesignIN
    }



    return (
        <>
            <Authcontext.Provider value={authInfo}>
                {children}

            </Authcontext.Provider>


        </>
    );
};

export default Authprovider;
