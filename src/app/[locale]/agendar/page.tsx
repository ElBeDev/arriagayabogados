import { redirect } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export default async function Agendar(props: PageProps<"/[locale]/agendar">) {
  const locale = (await props.params).locale as Locale;
  redirect({ href: "/contacto#agenda", locale });
}
