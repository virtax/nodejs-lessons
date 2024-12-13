import fs from "fs";

export default class PackageVersionReader {
  fileContent: string;
  version: string;
  constructor() {
    fs.readFile("package.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      this.fileContent = data;
      setImmediate( () => {
        this.readVersion();
        console.log("setImmediate 1: current version", this.version);
      })
      setImmediate( () => {
        const nextMinorVer = this.getNextMinorVersion();
        console.log("setImmediate 2: nextMinorVer", nextMinorVer);
      });
    });
  }

  readVersion() {
    const json = JSON.parse(this.fileContent);
    this.version =  json.version;
  }

  getNextMinorVersion() {
    const [major, minor, patch] = this.version.split(".");
    return  `${major}.${parseInt(minor)+1}.${patch}`;
  }
}