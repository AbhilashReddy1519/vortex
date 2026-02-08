import cloudinary from '#config/cloudinary.js';

type UploadResult = {
  url: string;
  publicId: string;
};

export function getImageURL(
  fileBuffer: Buffer,
  fileName?: string
): Promise<UploadResult> {
  if (!fileBuffer) {
    throw new Error('File buffer missing');
  }
  const options = {
    folder: 'onboarding',
    resource_type: 'image' as const,
    ...(fileName ? { public_id: fileName } : {}),
  };


  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        options,
        (error, result) => {
          if (error || !result) {
            return reject(error);
          }

          resolve({
            url: result.secure_url,
            publicId: result.public_id,
          });
        }
      )
      .end(fileBuffer);
  });
}
