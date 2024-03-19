import upload from 'utils/upload';
// import { isWeb } from 'utils/platform';

export async function uploadImage(files) {
  try {
    const rep = await upload(files);
    // if(isWeb) {
    //   return Object.values(rep);
    // }
    return Object.values(JSON.parse(rep || '{}'));
  } catch (error) {
    console.log(error); // eslint-disable-line
  }
  return undefined;
}
