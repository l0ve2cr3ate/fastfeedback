import React, { useState, useEffect, useContext, createContext } from "react";
import cookie from "js-cookie";
import firebase from "./firebase";
import "firebase/auth";
import Router from "next/router";
import { createUser } from "./db";

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

const formatUser = async (user) => {
  const token = await user.getIdToken();
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    token,
  };
};

const getProviderForProviderId = (method) => {
  if (method.includes("google")) {
    return new firebase.auth.GoogleAuthProvider();
  }
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser);

      const { token, ...userWithoutToken } = user;

      createUser(user.uid, userWithoutToken);
      setUser(user);

      cookie.set("fast-feedback-auth", true, {
        expires: 1,
      });

      setLoading(false);
      return user;
    } else {
      setUser(false);
      cookie.remove("fast-feedback-auth");
      setLoading(false);
      return false;
    }
  };

  const signinWithEmail = (email, password) => {
    setLoading(true);
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        handleUser(response.user);
        Router.push("/sites");
      });
  };

  const signinWithGithub = () => {
    setLoading(true);
    Router.push("/sites");
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => {
        handleUser(response.user);
      })
      .catch((error) => {
        if (error.code === "auth/account-exists-with-different-credential") {
          // User's email already exists.
          // The pending Google credential.
          const pendingCred = error.credential;
          // The provider account's email address.
          const email = error.email;
          // Get sign-in methods for this email.
          firebase
            .auth()
            .fetchSignInMethodsForEmail(email)
            .then(function (methods) {
              if (methods[0] === "password") {
                throw new Error("Please sign in using your email and password");
                // const password = promptUserForPassword(); // TODO: implement promptUserForPassword.
                // auth.signInWithEmailAndPassword(email, password).then(function(result) {
                //   return result.user.linkWithCredential(pendingCred);
                // }).then(function() {
                //   // Google account successfully linked to the existing Firebase user.

                // });
                // return;
              }
              const provider = getProviderForProviderId(methods[0]);
              // Because browsers usually block async pop-ups, it would be better to ask user for click on continue button here.
              firebase
                .auth()
                .signInWithPopup(provider)
                .then(function (result) {
                  result.user
                    .linkAndRetrieveDataWithCredential(pendingCred)
                    .then(function (usercred) {
                      // Google account successfully linked to the existing Firebase user.
                      console.log("Account linked");
                    });
                });
            });
        }
      });
  };

  const signinWithGoogle = () => {
    Router.push("/sites");
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => {
        handleUser(response.user);
      });
  };

  const signout = () => {
    setLoading(true);
    Router.push("/");
    return firebase
      .auth()
      .signOut()
      .then(() => handleUser(false));
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        handleUser(user);
      } else {
        handleUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    signinWithEmail,
    signinWithGithub,
    signinWithGoogle,
    signout,
  };
}
