import * as fs from "fs";
import path from "path";

const generateCustomId = (): string => {
  const timeStamp = Date.now();
  const randomPart = Math.floor(Math.random() * 10000);
  return `${timeStamp}-${randomPart}`;
};

const imageAddProcess = (
  imgBase64: string
): Promise<string | NodeJS.ErrnoException> => {
  return new Promise((resolve, reject) => {
    const imgBase64Data = imgBase64.replace(/^data:image\/\w+;base64,/, "");
    const imgBuffer = Buffer.from(imgBase64Data, "base64");
    const uniqueName = `${generateCustomId()}.jpg`;
    const filePath = path.join(__dirname, "..", "..", "uploads", uniqueName);

    fs.writeFile(filePath, imgBuffer, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(uniqueName);
      }
    });
  });
};

const imageDeleteProcess = (
  img: string
): Promise<string | NodeJS.ErrnoException> => {
  return new Promise((resolve) => {
    const imgPath = path.join(__dirname, "..", "..", "uploads", img);
    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath);
      resolve("Image deleted successfully");
    }
  });
};

const imageEditProcess = (
  imgBase64: string,
  oldImg: string
): Promise<string | NodeJS.ErrnoException> => {
  return new Promise((resolve, reject) => {
    imageDeleteProcess(oldImg)
      .then(() => {
        imageAddProcess(imgBase64)
          .then((newImgName) => {
            resolve(newImgName);
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export {
  imageAddProcess,
  imageDeleteProcess,
  imageEditProcess,
  generateCustomId,
};