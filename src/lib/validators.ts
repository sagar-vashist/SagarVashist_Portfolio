import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(100, { message: "Name cannot exceed 100 characters." }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address." })
    .max(254, { message: "Email cannot exceed 254 characters." }),
  message: z
    .string()
    .trim()
    .min(10, { message: "Message must be at least 10 characters long." })
    .max(2000, { message: "Message cannot exceed 2,000 characters." }),
  // Honeypot field (must remain empty for humans)
  honeypot: z.string().max(0, { message: "Bot activity detected." }).optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
