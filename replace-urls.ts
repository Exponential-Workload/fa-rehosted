import * as fs from 'fs-extra';
import path from 'path';

const prefix = 'exponential-workload.github.io/fa-rehosted/new/';
const replace: Record<string, string> = {
  '32397475': '0',
  'eb936bb355': '',
  // 'https://ka-f.fontawesome.com': `${prefix}/ka-f.fontawesome.com`,
  // 'https://kit.fontawesome.com': `${prefix}/kit.fontawesome.com`,
  'https://': `https://${prefix}`,
  'http://': `http://${prefix}`,
  'https:\\/\\/': `https:\\/\\/${prefix.replace('/', '\\/')}`,
  'http:\\/\\/': `http:\\/\\/${prefix.replace('/', '\\/')}`,
}
const replaceKeys = Object.keys(replace);
const replaceValues = Object.values(replace);
const replaceAll = (str: string) => {
  for (let i = 0; i < replaceKeys.length; i++) {
    const key = replaceKeys[i];
    const value = replaceValues[i];
    str = str.split(key).join(value);
  }
  return str;
}

const recursiveReaddirSync = (dir: string): string[] =>
  fs.readdirSync(dir).flatMap(file => {
    if (fs.statSync(`${dir}/${file}`).isDirectory()) {
      return recursiveReaddirSync(`${dir}/${file}`);
    } else return `${dir}/${file}`
  })

const files = recursiveReaddirSync('files');
for (const file of files) {
  const np = path.resolve('new', file.replace('files', '.'))
  fs.ensureFileSync(np)
  fs.writeFileSync(np, replaceAll(fs.readFileSync(file, 'utf-8')));
}
