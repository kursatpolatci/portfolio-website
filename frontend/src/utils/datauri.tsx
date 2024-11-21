export const datauri = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        resolve(reader.result.toString());
      } else {
        reject(new Error(`File could not be read`));
      }
    };
    reader.onerror = () => {
      reject(new Error(`File reading error`));
    };
    reader.readAsDataURL(file);
  });
};
