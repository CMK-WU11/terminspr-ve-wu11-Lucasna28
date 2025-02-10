import * as motion from "motion/react-client"
import Image from "next/image";
import Link from "next/link";

export default function Home() {

  return (
    <main className="w-screen h-screen bg-[url(/images/splash-image.jpg)] bg-center bg-cover bg-no-repeat flex flex-col justify-end items-center gap-52"> 
      
      <div className="flex self-start">
          <Image src={"/images/logo.png"} alt="logo" width={"280"} height={"280"}></Image>
      </div>
      <motion.div
              className="mb-10"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                scale: { type: "spring", visualDuration: 0.4, bounce: 0.5, delay: 1.5 },
              }}
      >
        <Link className="bg-background w-10 h-6 text-white px-8 py-4 rounded-md shadow-black" href="/aktiviteter">Kom i Gang</Link>
      </motion.div>
    </main>
  );
}
