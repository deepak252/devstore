import { Storage } from '@google-cloud/storage'
import {
  GC_BUCKET_NAME,
  GC_CLIENT_EMAIL,
  GC_CLIENT_ID,
  GC_PRIVATE_KEY,
  GC_PRIVATE_KEY_ID,
  GC_PROJECT_ID
} from './env'

const storage = new Storage({
  projectId: GC_PROJECT_ID,
  credentials: {
    type: 'service_account',
    project_id: GC_PROJECT_ID,
    private_key_id: GC_PRIVATE_KEY_ID,
    private_key: GC_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: GC_CLIENT_EMAIL,
    client_id: GC_CLIENT_ID
    // auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    // token_uri: 'https://oauth2.googleapis.com/token',
    // auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    // client_x509_cert_url: GC_CLIENT_X509_CERT_URL
  }
})

const bucket = storage.bucket(GC_BUCKET_NAME)

export { storage, bucket }

// import admin from 'firebase-admin';
// import { getStorage, getDownloadURL } from 'firebase-admin/storage';
// import {
//   PROJECT_ID,
//   PRIVATE_KEY_ID,
//   PRIVATE_KEY,
//   CLIENT_EMAIL,
//   CLIENT_ID,
//   CLIENT_X509_CERT_URL
// } from './environment.js';

// let serviceAccount = {
//   type: 'service_account',
//   project_id: PROJECT_ID,
//   private_key_id: PRIVATE_KEY_ID,
//   private_key: PRIVATE_KEY?.replace(/\\n/g, '\n'),
//   client_email: CLIENT_EMAIL,
//   client_id: CLIENT_ID,
//   client_x509_cert_url: CLIENT_X509_CERT_URL,
//   auth_uri: 'https://accounts.google.com/o/oauth2/auth',
//   token_uri: 'https://oauth2.googleapis.com/token',
//   auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
//   universe_domain: 'googleapis.com'
// };

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   storageBucket: `${PROJECT_ID}.appspot.com`
// });

// const bucket = getStorage().bucket();

// export { bucket, getDownloadURL };
// export default admin;
