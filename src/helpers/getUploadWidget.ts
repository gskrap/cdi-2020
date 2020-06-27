const CLOUDINARY_CLOUD_NAME = 'dqehbd6wb';
const CLOUDINARY_UPLOAD_PRESET = 'qytqbro0';
const CLOUDINARY_STYLES = '#cloudinary-overlay.modal {background-color: rgb(18, 55, 79, 0.5);} @media (max-width: 768px) {#cloudinary-widget {width: initial !important; left: 10% !important; right: 10% !important; top: 20% !important; max-height: 50%;}}';

export const getUploadWidget = () => {
  // @ts-ignore
  return cloudinary.createUploadWidget(
    {
      cloud_name: CLOUDINARY_CLOUD_NAME,
      upload_preset: CLOUDINARY_UPLOAD_PRESET,
      stylesheet: CLOUDINARY_STYLES,
      multiple: false,
      theme: 'minimal',
    }, (error: any, result: any) => {
      if (!error) {
        console.log('Done! Here is the image info: ', result[0]);
      }
    }
  );
};
