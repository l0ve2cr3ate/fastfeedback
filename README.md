
# Fast Feedback

App to easily add reviews and comments to your site.

## Stack

- Next.js / React
- Chakra UI
- SSR
- Firebase Authentication / Firestore
- MDX
- Vercel (deployment)

This app was build following [React2025](https://react2025.com/).

## Run the app in development

Clone the repo. <br>
run the commands: <br>
`cd fastfeedback` <br>
`yarn` <br>
`yarn dev` <br>

## Notes

**`FIRESTORE_PRIVATE_KEY`** <br>
You will need to generate a `FIRESTORE PRIVATE KEY`. In the Firebase console, go to your app, open `Settings > Service Accounts`. Click `Generate New Private Key`, then confirm by clicking `Generate Key`. You will need to add this key to your .env.local file, wrapped in quotes: "<YOUR_KEY>". For the production environment, you will need to add your key to vercel. If you have problems with that, you can look for solutions [here](https://github.com/vercel/vercel/issues/749).

**Authorized domains** <br>
In the firebase console, go to your app. Click on `Authentication`, next click on the `sign-in method` tab. Here you can choose your sign-in methods. When you scroll down, you can add `Authorized domains`, from which you allow users to sign in. Since vercel deploys your preview to a different domain, you will need to add `vercel.app` to the `Authorized domains`.

**Environment variables** <br>
You can find an example of the environment variables in the `.env.example` file. Change the filename to `.env.local` and add your values after the = sign.

**Firestore rules** <br>
Your firestore has rules for who is allowed to read or write to the db. You can find an example of the rules in the `firestore.rules` file. You can change these rules when going to your app in the firebase console. Click on `Firestore Database`. Next click on the `rules` tab, and change the rules.

**Account-exists-with-different-credential Errors** <br>
If you encounter `auth/account-exists-with-different-credential` authentication error, you can find more information it [here](https://firebase.google.com/docs/auth/web/google-signin#expandable-1).


