export const downloadOss = (url, filename) => {
  const link = document.createElement("a");
  link.style.display = "none";
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
