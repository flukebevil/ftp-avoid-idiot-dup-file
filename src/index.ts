import { Connector } from "./connector";
import { getFileName } from "./helper/files";
require("dotenv").config();

const INPUT_FILE = "simple.jpg";

const init = async () => {
  const ftp = new Connector();
  const files = await ftp.listFilesName("/input/fluke");
  const lastestFile = getFileName(files, INPUT_FILE, true);

  console.log(
    `Existed File => ${files};\nLastest File Is ${
      lastestFile.isDuplicated ? lastestFile.name : INPUT_FILE
    }`
  );
};

init();
