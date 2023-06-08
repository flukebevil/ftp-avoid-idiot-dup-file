import { Client } from "basic-ftp";
import { join } from "path";

export class Connector {
  private connection = async () => {
    this.listFilesName = this.listFilesName.bind(this);
    this.removeFile = this.removeFile.bind(this);
    this.renameFile = this.renameFile.bind(this);

    const client = new Client();
    client.ftp.verbose = true;
    await client.access({
      host: process.env.FTP_HOST,
      port: Number(process.env.FTP_PORT) || 2222,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
    });

    return client;
  };

  listFilesName = async (dirPath: string) => {
    const connect = await this.connection();
    const files = await connect.list(dirPath);
    connect.close();

    const result = [];
    for (let file of files) {
      result.push(file.name);
    }

    return result;
  };

  removeFile = async (dirPath: string, fileName: string) => {
    const connect = await this.connection();
    await connect.remove(join(dirPath, fileName));
    connect.close();
    return true;
  };

  renameFile = async (dirPath: string, fileName: string, newName: string) => {
    const connect = await this.connection();
    await connect.rename(join(dirPath, fileName), join(dirPath, newName));
  };
}
