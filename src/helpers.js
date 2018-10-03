export function genMapByArr(arr) {
  const res = {};
  arr.forEach((keyItem) => {
    if (typeof keyItem === 'string') {
      res[keyItem] = keyItem;
    }
  });
}
