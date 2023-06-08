import { REG_EXTENSION_FILE, REF_DUPLICATE_INCREMENT } from "../constant/regex";

export const getFileNamePayload = (fileName) => {
  const name = fileName.split(REG_EXTENSION_FILE)[0];
  const extension = fileName.substring(name.length);

  return { name, extension };
};

export const getFileName = (
  existedNames: string[],
  newFileName: string,
  isNewFile?: boolean
) => {
  const newName = getFileNamePayload(newFileName);

  let isDuplicated = false;
  let increment = 0;
  for (let i = 0; i < existedNames.length; i++) {
    const oldName = getFileNamePayload(existedNames[i]);
    if (newName.extension === oldName.extension) {
      // NOTE: Let's Check name
      if (newName.name === oldName.name.replace(REF_DUPLICATE_INCREMENT, "")) {
        isDuplicated = true;
        if (oldName.name.search(REF_DUPLICATE_INCREMENT) !== -1) {
          const tmpIncrement = Number(
            oldName.name
              .substring(oldName.name.search(REF_DUPLICATE_INCREMENT))
              .replace("(", "")
              .replace(")", "")
          );

          // NOTE: This should give us lastest file name
          if (tmpIncrement > increment) {
            increment = tmpIncrement;
          }
        }
      }
    }
  }

  isNewFile ?? increment++;

  // NOTE: Change `increment++` to `increment` to get the latest file not new file
  return {
    isDuplicated,
    name: `${newName.name}(${increment++})${
      newName.extension
    }`,
  };
};
