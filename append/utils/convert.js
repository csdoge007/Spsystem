export default function convert(points) {
    const obj = {};
    points.forEach(point => {
        let idx = point.type.indexOf(';');
        let type = point.type.substring(0, idx);
        if (obj[type]) {
            obj[type].push(point);
        } else {
            obj[type] = [point];
        }
    })
    return obj;
}
