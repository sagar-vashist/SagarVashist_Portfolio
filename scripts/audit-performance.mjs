import puppeteer from "puppeteer-core";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function runPerformanceAudit() {
  console.log("=== RUNNING PERFORMANCE & CORE WEB VITALS AUDIT ===");

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // Emulate mobile device (e.g. Pixel 7 / iPhone 14)
  await page.setViewport({
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });

  // Collect PerformanceObserver metrics
  await page.evaluateOnNewDocument(() => {
    window.__metrics = {
      lcp: 0,
      cls: 0,
      fcp: 0,
    };

    // LCP
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (lastEntry) window.__metrics.lcp = lastEntry.startTime;
    }).observe({ type: "largest-contentful-paint", buffered: true });

    // CLS
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          window.__metrics.cls += entry.value;
        }
      }
    }).observe({ type: "layout-shift", buffered: true });

    // FCP
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.name === "first-contentful-paint") {
          window.__metrics.fcp = entry.startTime;
        }
      }
    }).observe({ type: "paint", buffered: true });
  });

  const startTime = Date.now();
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  const loadDuration = Date.now() - startTime;

  await new Promise((r) => setTimeout(r, 1200));

  const metrics = await page.evaluate(() => window.__metrics);

  console.log("\n📊 Core Web Vitals (Mobile 390px):");
  console.log(`- LCP (Largest Contentful Paint): ${Math.round(metrics.lcp)} ms (Target: < 2000 ms)`);
  console.log(`- FCP (First Contentful Paint): ${Math.round(metrics.fcp)} ms`);
  console.log(`- CLS (Cumulative Layout Shift): ${metrics.cls.toFixed(4)} (Target: < 0.05)`);
  console.log(`- Network Idle Load Time: ${loadDuration} ms`);

  // Accessibility checks
  console.log("\n♿ Accessibility & Best Practices Inspection:");
  const a11ySummary = await page.evaluate(() => {
    const imagesWithoutAlt = Array.from(document.querySelectorAll("img")).filter(
      (img) => !img.hasAttribute("alt")
    ).length;

    const buttonsWithoutLabel = Array.from(document.querySelectorAll("button")).filter(
      (btn) => !btn.innerText.trim() && !btn.getAttribute("aria-label")
    ).length;

    const linksWithoutLabel = Array.from(document.querySelectorAll("a")).filter(
      (a) => !a.innerText.trim() && !a.getAttribute("aria-label")
    ).length;

    const h1Count = document.querySelectorAll("h1").length;

    const landmarks = {
      header: !!document.querySelector("header"),
      main: !!document.querySelector("main"),
      footer: !!document.querySelector("footer"),
      nav: !!document.querySelector("nav"),
    };

    return {
      imagesWithoutAlt,
      buttonsWithoutLabel,
      linksWithoutLabel,
      h1Count,
      landmarks,
    };
  });

  console.log(`- Images without alt text: ${a11ySummary.imagesWithoutAlt}`);
  console.log(`- Buttons without label/text: ${a11ySummary.buttonsWithoutLabel}`);
  console.log(`- Links without label/text: ${a11ySummary.linksWithoutLabel}`);
  console.log(`- H1 element count (must be exactly 1): ${a11ySummary.h1Count}`);
  console.log("- Semantic HTML Landmarks:", a11ySummary.landmarks);

  await browser.close();

  const isLcpPass = metrics.lcp < 2000;
  const isClsPass = metrics.cls < 0.05;
  const isA11yPass =
    a11ySummary.imagesWithoutAlt === 0 &&
    a11ySummary.buttonsWithoutLabel === 0 &&
    a11ySummary.linksWithoutLabel === 0 &&
    a11ySummary.h1Count === 1;

  if (isLcpPass && isClsPass && isA11yPass) {
    console.log("\n🎉 ALL CORE WEB VITALS & ACCESSIBILITY TARGETS MET!");
  } else {
    console.warn("\n⚠️ Some metrics need attention.");
  }
}

runPerformanceAudit().catch(console.error);
