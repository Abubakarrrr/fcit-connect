import { Client, Account, OAuthProvider, Storage } from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("678facfe000f2b37b63f");

// account.createOAuth2Session(
//   OAuthProvider.Google // provider
//   // "https://example.com", // success (optional)
//   // "https://example.com", // failure (optional)
//   // [] // scopes (optional)
// );

export const storage = new Storage(client);
// export const account = new Account(client);
export { ID } from "appwrite";
