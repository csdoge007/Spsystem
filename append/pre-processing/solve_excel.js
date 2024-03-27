import xlsx from 'xlsx';
import coordtransform from 'coordtransform';

// 读取 Excel 表格数据
const workbook = xlsx.readFile('../data/popPoi_nj.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(worksheet);

// 处理数据，转换坐标并写入新表
const newData = data.map(item => {
    // 将 GCJ-02 坐标转换为 WGS 84 坐标
    const wgs84 = coordtransform.gcj02towgs84(item.x, item.y);
    
    return {
        ...item,
        x: wgs84[0], // 更新经度
        y: wgs84[1]  // 更新纬度
    };
});

// 将数据写入新的 Excel 表格
const newWorkbook = xlsx.utils.book_new();
const newWorksheet = xlsx.utils.json_to_sheet(newData);
xlsx.utils.book_append_sheet(newWorkbook, newWorksheet, 'newSheet');
xlsx.writeFile(newWorkbook, '../data/popPoi_nj_wgs.xlsx');