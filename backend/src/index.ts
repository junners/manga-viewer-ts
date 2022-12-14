import Pager from "./pager";
import { JSDOM } from "jsdom";
import app from "./express";
import { Request, Response } from "express";

const pager = new Pager(
  "https://flamescans.org/ahhh/1670799661-ex-and-ash-chapter-0/"
);

async function fetchFromWeb() {
  // Get the HTMLData from fetching or from cache
  const HTMLData = await pager.fetchPage();
  const dom = new JSDOM(HTMLData);
  return dom.window.document;
}

function extractData(document: Document): any[] {
  const writingLinks: HTMLImageElement[] = Array.from(
    document.querySelectorAll("img[src]")
  );
  return writingLinks.map((elem) => ({
    src: elem.src,
    attributes: elem.attributes,
    classListValue: elem.classList.value,
    classList: elem.classList.values,
  }));
}
async function getData(): Promise<any[]> {
  const document = await fetchFromWeb();
  const data = extractData(document);
  return data;
}

app.get("/read", async (req: Request, res: Response) => {
  const data = await getData();
  res.send(JSON.stringify(data, null, 2));
});
