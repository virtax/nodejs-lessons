import * as pack from '../package.json';

export default function logPackageName() {
  const name = pack.name;
  console.log("Package name:", name);
}
