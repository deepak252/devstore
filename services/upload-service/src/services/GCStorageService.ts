import { bucket } from '../config/firebase'
import logger from '../utils/logger'

type FileUploadSuccess = {
  message: string
  key: string
  location: string
}

export class GCStorageService {
  static uploadFile = async (
    file: Express.Multer.File,
    dirPath?: string
  ): Promise<FileUploadSuccess | undefined> => {
    try {
      if (!file) throw new Error('File is required!')

      //   const fileStream = fs.createReadStream(file.path)
      const destination = dirPath
        ? `${dirPath}/${file.filename}`
        : `files/${file.filename}`

      await bucket.upload(file.path, {
        destination,
        public: true,
        gzip: true
      })

      return {
        message: 'File uploaded successfully',
        key: destination,
        location: `https://storage.googleapis.com/${bucket.name}/${destination}`
      }
    } catch (e) {
      logger.error('Error uploading file', e)
    }
  }

  static deleteFile = async (fileKey: string) => {
    try {
      await bucket.file(fileKey).delete()
      logger.info(`File deleted from GCStorage: ${fileKey}`)
    } catch (e) {
      logger.error('Error deleting file:', e)
    }
  }
}

// Example usage
// import { bucket, getDownloadURL } from '../config/firebase.js';
// import Logger from '../utils/logger.js';
// const logger = new Logger('firebaseStorage');

// // https://googleapis.dev/nodejs/storage/latest/Bucket.html#upload
// export const uploadFileToStorage = async (localPath, destPath) => {
//   try {
//     const options = {
//       destination: destPath,
//       gzip: true
//     };
//     await bucket.upload(localPath, options);
//     const file = bucket.file(destPath);
//     const downloadUrl = await getDownloadURL(file);
//     // logger.info(downloadUrl, 'uploadFileToStorage' );
//     logger.info(
//       `File ${localPath} uploaded to storage: ${destPath}`,
//       'uploadFileToStorage'
//     );
//     return downloadUrl;
//   } catch (e) {
//     logger.error(e, 'uploadFileToStorage');
//     return new Error('Error while uploading file');
//   }
// };

// export const uploadFilesToStorage = async (localPaths, destPath) => {
//   const urls = [];
//   for (let local of localPaths) {
//     const url = await uploadFileToStorage(local, destPath);
//     urls.push(url);
//   }
//   return urls;
// };

// export const deleteFileFromStorage = async (destPath) => {
//   try {
//     if (!destPath) {
//       return new Error(`Invalid file path: ${destPath}`);
//     }
//     const file = bucket.file(destPath);
//     const result = await file.delete();
//     // logger.info(downloadUrl, 'uploadFileToStorage' );
//     // logger.info(`File ${localPath} uploaded to gs://${bucket.name}/${destPath}`, 'uploadFileToStorage');
//     if (Array.isArray(result) && result.length) {
//       return result[0];
//     }
//     return result;
//   } catch (e) {
//     logger.error(e, 'deleteFileFromStorage');
//     return new Error(`Error while deleting file: ${destPath}`);
//   }
// };

// export const deleteFilesFromStorage = async (destPaths = []) => {
//   try {
//     const result = await Promise.all(
//       destPaths.map(async (path) => {
//         return await deleteFileFromStorage(path);
//       })
//     );
//     return result;
//   } catch (e) {
//     logger.error(e, 'deleteFilesFromStorage');
//     throw new Error('Error while deleting files');
//   }
// };
