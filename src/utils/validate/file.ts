export default function validateFile(files: File[]): boolean | string {
  const fileExtension = files[0].name.split('.')[1];

  if (files[0].size > 1024 * 1024) {
    return 'File size is too large. Maximum size: 1MB';
  }

  if (!(fileExtension === 'png' || fileExtension === 'jpeg')) {
    return 'Invalid file format. Only PNG and JPEG are allowed';
  }

  return true;
}
