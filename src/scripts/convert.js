export function RespToFile(resp) {
  if (resp == undefined) {
    return undefined;
  }
  const contentDisposition = resp.headers['content-disposition'];
  let filename;
  if (contentDisposition != undefined) {
    const parts = contentDisposition.split(';');
    const fnPart = parts.find((part) => part.trim().startsWith('filename'));
    if (fnPart) {
      filename = fnPart.split('=')[1].trim();

      if (filename.startsWith('"') && filename.endsWith('"')) {
        filename = filename.slice(1, -1);
      }
    }
  }
  return new File([resp.data], filename, { type: resp.headers['content-type'] });
}
