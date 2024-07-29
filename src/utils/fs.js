import fs from "fs"

export const readFileCustom = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");

    return data ? JSON.parse(data) : [];
  } catch {
    console.log("File o'qishda xatolik");
  }
};

export const writeFileCustom = (filePath, content) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(content, null, 4));

    return "File yozildi✅";
  } catch {
    console.log("File yozishda xatolik!");
  }
};

