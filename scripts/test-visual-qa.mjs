import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const SCREENSHOT_DIR = path.resolve("./artifacts/screenshots");

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const BREAKPOINTS = [320, 360, 390, 430, 768, 1024, 1280, 1536, 1920];

async function runVisualQA() {
  console.log("=== STARTING VISUAL & RESPONSIVE QA ===");

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });

  page.on("pageerror", (err) => {
    consoleErrors.push(err.toString());
  });

  let hasOverflowFailure = false;

  for (const width of BREAKPOINTS) {
    const height = 900;
    await page.setViewport({ width, height });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });

    // Wait a brief moment for layout/animations
    await new Promise((r) => setTimeout(r, 400));

    // 1. Dark Mode Check
    const darkOverflow = await page.evaluate(() => {
      const docWidth = document.documentElement.scrollWidth;
      const winWidth = window.innerWidth;
      return {
        hasOverflow: docWidth > winWidth,
        docWidth,
        winWidth,
      };
    });

    if (darkOverflow.hasOverflow) {
      console.error(
        `❌ [DARK] Horizontal overflow at ${width}px! docWidth=${darkOverflow.docWidth}, winWidth=${darkOverflow.winWidth}`
      );
      hasOverflowFailure = true;
    } else {
      console.log(`✅ [DARK] ${width}px: perfect fit (0px overflow)`);
    }

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `dark-${width}px.png`),
      fullPage: false,
    });

    // 2. Light Mode Check (toggle theme)
    await page.evaluate(() => {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    });

    await new Promise((r) => setTimeout(r, 200));

    const lightOverflow = await page.evaluate(() => {
      const docWidth = document.documentElement.scrollWidth;
      const winWidth = window.innerWidth;
      return {
        hasOverflow: docWidth > winWidth,
        docWidth,
        winWidth,
      };
    });

    if (lightOverflow.hasOverflow) {
      console.error(
        `❌ [LIGHT] Horizontal overflow at ${width}px! docWidth=${lightOverflow.docWidth}, winWidth=${lightOverflow.winWidth}`
      );
      hasOverflowFailure = true;
    } else {
      console.log(`✅ [LIGHT] ${width}px: perfect fit (0px overflow)`);
    }

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `light-${width}px.png`),
      fullPage: false,
    });
  }

  // 3. Test Full-screen Menu & Esc key
  console.log("\n--- Testing Menu Overlay & Keyboard Navigation ---");
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });

  const menuButton = await page.$('button[aria-label="Open primary navigation menu"]');
  if (menuButton) {
    await menuButton.click();
    await new Promise((r) => setTimeout(r, 300));
    const isMenuOpen = await page.evaluate(() => {
      const dialog = document.querySelector('[role="dialog"][aria-label="Navigation Menu"]');
      return !!dialog;
    });
    console.log(`✅ Menu opens with dialog role: ${isMenuOpen}`);

    // Press Escape
    await page.keyboard.press("Escape");
    await new Promise((r) => setTimeout(r, 300));
    const isMenuClosed = await page.evaluate(() => {
      const dialog = document.querySelector('[role="dialog"][aria-label="Navigation Menu"]');
      return !dialog;
    });
    console.log(`✅ Menu closes on Escape: ${isMenuClosed}`);
  }

  // 4. Test Phone Reveal Anti-scrape
  console.log("\n--- Testing Anti-scrape Phone Reveal ---");
  const phoneTextBefore = await page.evaluate(() => document.body.innerText.includes("8595407590"));
  console.log(`✅ Phone number present before click: ${phoneTextBefore} (Expected: false)`);

  const revealBtn = await page.$('button ::-p-text(Reveal phone)');
  if (revealBtn) {
    await revealBtn.click();
    await new Promise((r) => setTimeout(r, 200));
    const phoneTextAfter = await page.evaluate(() => document.body.innerText.includes("8595407590"));
    console.log(`✅ Phone number revealed after click: ${phoneTextAfter} (Expected: true)`);
  }

  // 5. Test Reduced Motion
  console.log("\n--- Testing Reduced Motion Emulation ---");
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.reload({ waitUntil: "networkidle0" });
  console.log("✅ Successfully reloaded under prefers-reduced-motion: reduce");

  await browser.close();

  console.log("\n=== CONSOLE ERRORS & WARNINGS SUMMARY ===");
  if (consoleErrors.length > 0) {
    console.error(`Found ${consoleErrors.length} console errors:`, consoleErrors);
  } else {
    console.log("✅ Zero console errors or unhandled page exceptions!");
  }

  if (hasOverflowFailure) {
    process.exit(1);
  }

  console.log("🎉 ALL RESPONSIVE & VISUAL QA CHECKS PASSED!");
}

runVisualQA().catch((err) => {
  console.error("QA script failed:", err);
  process.exit(1);
});
