export const getFileAsBase64 = (file) => new Promise(((resolve, reject) => {
  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = () => {
    resolve({ name: file.name, body: reader.result.split(',')[1] });
  };

  reader.onerror = (error) => {
    reject(error);
  };
}));

export const test = 123;
