import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";

export default NextAuth({
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Providers.Credentials({
            name: 'Credentials',
            async authorize(credentials) {
                const res = await axios.post(`${process.env.APP_URL}http://localhost:3000/api/auth/signin`, credentials);
                const user = res.data;

                if (user) {
                    return user;
                } else {
                    throw new Error('/auth/signin?i=1');
                }
            },
        }),
    ],

    session: {
        strategy: "jwt",
    },

    jwt: {
        secret: process.env.JWT_TOKEN,
    },

    database: process.env.MONGODB_URI,
});