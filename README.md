# Dokumentation for Din Mægler

Lucas Nordskov Anderson, WU11

Brugere til systemet:

| id  | username    | password | age | role       |
| --- | ----------- | -------- | --- | ---------- |
| 1   | instructor1 | 1234     | 24  | instructor |
| 2   | instructor2 | 1234     | 32  | instructor |
| 3   | instructor3 | 1234     | 27  | instructor |
| 4   | instructor4 | 1234     | 31  | instructor |
| 5   | user1       | 1234     | 14  | default    |
| 6   | user2       | 1234     | 17  | default    |
| 7   | user3       | 1234     | 21  | default    |
| 8   | user4       | 1234     | 24  | default    |
| 9   | user5       | 1234     | 52  | default    |
| 10  | user6       | 1234     | 51  | default    |

## Tech-stack

- [**NextJS**](https://nextjs.org)  
  Jeg har valgt at bruge NextJS, fordi det giver bedre performance ved at rendere komponenter på serveren, routing er gjort nemt med app router, next har optimeret billede loading og optimering,
  Jeg kunne have valgt [svelte](https://svelte.dev/), som er et andet frontend framework, men jeg foretrak Next.js på grund af den stærke performence og fleksibilitet
- [**TailwindCSS**](https://tailwindcss.com/)  
  Jeg bruger Tailwind fordi det gør stylingen hurtigere og nemmere at designe responsivt og det er let at tilpasse

  det dårlige ved tailwind er classname kan blive meget lange og avanceret så koden er sværere at kigge igennem

- [**Luide-React**](https://lucide.dev/guide/packages/lucide-react)  
  jeg bruger luicde react til iconer for at få ensartet iconer gennem hele siden, de er lette at tilpasse og style,

- [**Motion**](https://motion.dev/)
  Jeg bruger motion til animationer da det er nemt at inplementere komplekse animationer, det understøtter exit animations

- [**Zod**](https://zod.dev/)
  Jeg bruger zod til valedering på login fordi det er let at definere valederingsregler,

## Kode-eksempel´

## Kode-eksempel: "Husk mig" Login Funktionalitet

Jeg har implementeret en "Husk mig" funktion der giver brugeren mulighed for at forblive logget ind. Her er hvordan det virker:

### Login Form Component

[Login Form](/src/components/login-form.jsx)

```
<div>
<label className="flex items-center gap-2">
<input
type="checkbox"
name="remember"
className="rounded"
/>
<span className="text-boxColor">Husk mig</span>
</label>
</div>
```

### Server Action

[Login Action](/src/actions/login.js)

```
const remember = formData.get("remember") === "on";
const cookieStore = await cookies();
const cookieOptions = {
// Hvis remember er false, udelades maxAge så cookien bliver en session cookie
   const cookieStore = await cookies();
    const cookieOptions = {
      // Hvis remember er false, udelades maxAge så cookien bliver en session cookie
      ...(remember ? { maxAge: 60 * 60 * 24 * 7 } : {}),
    };

    cookieStore.set("landrupDans_token", data.token, cookieOptions);
    cookieStore.set("LandrupDans_uid", data.userId, cookieOptions);
```

### Forklaring

Login systemet bruger cookies til at huske brugerens login status. Når en bruger logger ind, har de to muligheder:

1. **Uden "Husk mig"**:

   - Cookies gemmes som session cookie
   - Slettes automatisk når browseren lukkes
   - Brugeren skal logge ind igen ved næste besøg

2. **Med "Husk mig"**:
   - Cookies gemmes med en `maxAge` på 7 dage
   - Brugeren forbliver logget ind i 7 dage
   - Login huskes selv efter browseren lukkes

Implementeringen bruger Next.js's built-in cookies API og sikrer cookies
