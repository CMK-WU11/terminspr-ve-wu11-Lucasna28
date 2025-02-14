"use server";

import { cookies } from "next/headers";
import { z } from "zod";

export default async function Login(prevState, formData) {
  // Henter username, password og remember valg fra form data
  const username = formData.get("username");
  const password = formData.get("password");
  const remember = formData.get("remember") === "on";
  // Validerer input med Zod schema
  const schema = z.object({
    username: z
      .string()
      .min(1, { message: "Du skal udfylde et brugernavn" })
      .min(3, { message: "Brugernavnet skal være mindst 3 tegn" }),
    password: z
      .string()
      .min(1, { message: "Du skal udfylde et password" })
      .min(4, { message: "Password skal være mindst 4 tegn" }),
  });

  try {
    const validate = schema.parse({
      username,
      password,
    });

    // Sender login request til API
    const response = await fetch("http://localhost:4000/auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validate),
    });

    // Håndterer forkert login
    if (response.status === 400) {
      return {
        formData: {
          username,
          password,
        },
        error: "Forkert brugernavn eller password",
      };
    }

    const data = await response.json();

    // Hvis "Husk mig" er valgt, gemmes den i 7 dage (maxAge)
    // Ellers gemmes den som session cookie der slettes når browseren lukkes
    const cookieStore = await cookies();
    const cookieOptions = {
      ...(remember ? { maxAge: 60 * 60 * 24 * 7 } : {}),
    };

    // Gemmer login data i cookies
    cookieStore.set("landrupDans_token", data.token, cookieOptions);
    cookieStore.set("LandrupDans_uid", data.userId, cookieOptions);

    // Returnerer success status
    return { success: true };
  } catch (error) {
    // Håndterer Zod validerings fejl
    if (error instanceof z.ZodError) {
      return {
        formData: { username, password },
        errors: error.flatten().fieldErrors,
      };
    }
    // Håndterer andre fejl
    return { error: "Der skete en fejl ved login" };
  }
}
