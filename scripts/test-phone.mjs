import puppeteer from "puppeteer-core";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function testPhone() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
  });

  const page = await browser.newPage();
  page.on("console", (m) => console.log("[PAGE LOG]", m.text()));
  page.on("pageerror", (e) => console.log("[PAGE ERROR]", e));

  await page.setViewport({ width: 1280, height: 900 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 1600));

  await page.evaluate(() => {
    document.getElementById("contact")?.scrollIntoView();
  });
  await new Promise((r) => setTimeout(r, 800));

  console.log("Locating reveal phone button...");
  const phoneBtn = await page.evaluateHandle(() => {
    return Array.from(document.querySelectorAll("button")).find((b) =>
      b.textContent.includes("Reveal phone")
    );
  });

  console.log("Clicking phone button via evaluateHandle...");
  await phoneBtn.click();
  await new Promise((r) => setTimeout(r, 600));

  const contactText = await page.evaluate(() => document.getElementById("contact")?.innerText);
  console.log("=== CONTACT TEXT AFTER CLICK ===");
  console.log(contactText);
  console.log("Contains 8595407590:", contactText.includes("8595407590"));

  await browser.close();
}

testPhone().catch(console.error);
