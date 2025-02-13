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

  const validate = schema.safeParse({
    username,
    password,
  });

  // Returnerer fejl hvis validering fejler
  if (!validate.success) {
    return {
      formData: {
        username,
        password,
      },
      errors: validate.error.format(),
    };
  }

  try {
    // Sender login request til API
    const response = await fetch("http://localhost:4000/auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
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

    // Hvis "Husk mig" er valgt, gem i 24 timer (maxAge)
    // Ellers gem som session cookie der slettes når browseren lukkes
    const cookieStore = await cookies();
    const cookieOptions = {
      // Hvis remember er false, udelades maxAge så cookien bliver en session cookie
      ...(remember ? { maxAge: 60 * 60 * 24 } : {}),
    };

    cookieStore.set("landrupDans_token", data.token, cookieOptions);
    cookieStore.set("LandrupDans_uid", data.userId, cookieOptions);
  } catch (error) {
    throw new Error(error);
  }
}
