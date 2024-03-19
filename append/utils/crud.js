import fs from 'fs';
export function update(filePath, jsonData) {
    try {
      fs.writeFileSync(filePath, jsonData);
      console.log('JSON file has been saved!');
    } catch (err) {
      console.error('Error writing JSON file:', err);
    }
}
