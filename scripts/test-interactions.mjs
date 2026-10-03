import puppeteer from "puppeteer-core";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function testContactSection() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });

  // Wait 1.6s for IntroSplash to complete
  await new Promise((r) => setTimeout(r, 1600));

  // Scroll smoothly down to contact section
  await page.evaluate(() => {
    const contact = document.getElementById("contact");
    if (contact) contact.scrollIntoView();
  });

  await new Promise((r) => setTimeout(r, 1000));

  // Check phone text before
  const textBefore = await page.evaluate(() => document.getElementById("contact")?.innerText || "");
  console.log("Contact text includes phone before:", textBefore.includes("8595407590"));

  // Click the reveal phone button
  const clicked = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll("#contact button"));
    const phoneBtn = buttons.find((b) => b.textContent.includes("Reveal phone"));
    if (phoneBtn) {
      phoneBtn.click();
      return true;
    }
    return false;
  });
  console.log("Clicked Reveal Phone button:", clicked);

  await new Promise((r) => setTimeout(r, 400));

  const textAfter = await page.evaluate(() => document.getElementById("contact")?.innerText || "");
  console.log("Contact text includes phone after:", textAfter.includes("8595407590"));

  // Also test Copy Email button
  const copyBtnClicked = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll("#contact button"));
    const copyBtn = buttons.find((b) => b.textContent.includes("COPY"));
    if (copyBtn) {
      copyBtn.click();
      return true;
    }
    return false;
  });
  console.log("Clicked Copy Email button:", copyBtnClicked);

  await new Promise((r) => setTimeout(r, 400));
  const hasCopiedStatus = await page.evaluate(() => {
    const text = document.getElementById("contact")?.innerText || "";
    return text.includes("COPIED");
  });
  console.log("Shows COPIED status:", hasCopiedStatus);

  await browser.close();
}

testContactSection().catch(console.error);
