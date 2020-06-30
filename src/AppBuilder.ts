import JSZip from "jszip";
import ApplicationStubURL from "./template/Contents/MacOS/ApplicationStub.file";
import DocumentWflowURL from "./template/Contents/document.wflow";
import InfoPlistURL from "./template/Contents/Info.plist";

function slugify(name: string) {
  return "slug";
}

async function getApplicationStub() {
  const res = await fetch(ApplicationStubURL);
  return await res.blob();
}

async function getInfoPlist(appName: string) {
  const res = await fetch(InfoPlistURL);
  const template = await res.text();
  return template
    .replace("__CFBundleName__", appName)
    .replace(
      "__CFBundleIdentifier__",
      "de.simonknott.appbuilder." + slugify(appName)
    );
}

async function getDocumentWflow(command: string) {
  const res = await fetch(DocumentWflowURL);
  const template = await res.text();
  return template.replace("__PUT_COMMAND_STRING_HERE__", command);
}

async function createZip(command: string, appName: string) {
  const zip = new JSZip();
  const App = zip.folder(appName + ".app");
  const Contents = App.folder("Contents");
  const [ApplicationStub, DocumentWflow, InfoPlist] = await Promise.all([
    getApplicationStub(),
    getDocumentWflow(command),
    getInfoPlist(appName),
  ]);
  Contents.file("MacOS/Application Stub", ApplicationStub, {
    unixPermissions: "0751",
    binary: true,
    optimizedBinaryString: true,
  });
  Contents.file("document.wflow", DocumentWflow);
  Contents.file("Info.plist", InfoPlist);
  return zip;
}

export async function createApp(command: string, appName: string) {
  const zip = await createZip(command, appName);
  const blob = await zip.generateAsync({ platform: "UNIX", type: "blob" });
  return blob;
}
