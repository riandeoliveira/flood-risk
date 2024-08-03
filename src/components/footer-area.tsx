import Link from "next/link";
import type { ReactElement } from "react";

export const FooterArea = (): ReactElement => {
  return (
    <footer className="bg-[#170C36] p-2">
      <p className="text-white text-center">
        Desenvolvido com 💙 por{" "}
        <Link
          href="https://github.com/riandeoliveira"
          target="_blank"
          className="text-blue-400 underline hover:text-blue-600 transition-colors"
        >
          Rian Oliveira
        </Link>{" "}
        e{" "}
        <Link
          href="https://github.com/brunomdrrosa"
          target="_blank"
          className="text-blue-400 underline hover:text-blue-600 transition-colors"
        >
          Bruno Machado
        </Link>
      </p>
    </footer>
  );
};
