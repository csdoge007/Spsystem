import fs from 'fs';
export function update(filePath, jsonData) {
    fs.writeFile(filePath, jsonData, (err) => {
        if (err) {
            console.error('Error writing JSON file:', err);
        } else {
            console.log('JSON file has been saved!');
        }
    });
}
