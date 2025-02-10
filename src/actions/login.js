"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export default async function Login(prevState, formData) {
  const identifier = formData.get("identifier");
  const password = formData.get("password");

  const schema = z.object({
    identifier: z
      .string()
      .min(1, { message: "Du skal udfylde en email" })
      .email({ message: "Ugyldig email" }),
    password: z.string().min(1, { message: "Du skal udfylde et password" }),
  });

  const validate = schema.safeParse({
    identifier,
    password,
  });

  if (!validate.success) {
    return {
      formData: {
        identifier,
        password,
      },
      errors: validate.error.format(),
    };
  }

  try {
    const response = await fetch("https://dinmaegler.onrender.com/auth/local", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    if (response.status === 400) {
      // Bad request
      return {
        formData: {
          identifier,
          password,
        },
        error: "Forkert email eller password",
      };
    }

    const data = await response.json();

    const cookieStore = await cookies();
    cookieStore.set("repe_token", data.jwt, { maxAge: 60 * 60 * 24 });
    cookieStore.set("repe_uid", data.user.id, { maxAge: 60 * 60 * 24 });
  } catch (error) {
    throw new Error(error);
  }
  redirect("/");
}
