export default function exportImage(content, editorData) {
  if (editorData.image) {
    return `<img src=${editorData.image.src} width="${editorData.width}" height="${editorData.height}"/>`;
  } else {
    return `<img src=${editorData.url} />`;
  }
}
