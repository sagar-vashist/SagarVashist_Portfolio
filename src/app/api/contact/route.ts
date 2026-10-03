import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validators";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    // 1. IP extraction for rate limiting
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

    // 2. Check rate limit (5 requests per 10 minutes)
    const { allowed } = checkRateLimit(ip, 5, 10 * 60 * 1000);
    if (!allowed) {
      return NextResponse.json(
        {
          error:
            "Too many requests sent from this IP. Please wait a few minutes before trying again.",
        },
        { status: 429 }
      );
    }

    // 3. Parse and validate JSON payload
    const body = await req.json();
    const parseResult = contactSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: "Invalid input. Please verify your submission.",
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, message, honeypot } = parseResult.data;

    // 4. Honeypot check (silently drop bot submissions)
    if (honeypot && honeypot.length > 0) {
      return NextResponse.json({ success: true, message: "Message received." });
    }

    // 5. Check Resend configuration
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || "sagarvashist02@gmail.com";
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

    if (!apiKey) {
      // Graceful degradation when Resend credentials are not set in the environment
      return NextResponse.json(
        {
          error:
            "Contact service is currently not configured with an API key. Please send an email directly.",
          fallbackMailto: true,
        },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);

    const { error: sendError } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `Portfolio Contact: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (sendError) {
      console.error("Resend API error:", sendError);
      return NextResponse.json(
        {
          error:
            "Email provider encountered an error. Please contact directly via email.",
          fallbackMailto: true,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message delivered successfully.",
    });
  } catch (error) {
    console.error("Contact API route exception:", error);
    return NextResponse.json(
      {
        error: "An unexpected server error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
