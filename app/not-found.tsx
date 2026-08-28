import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { brandAssets } from "@/config/site";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <Container className="not-found-inner">
        <Image src={brandAssets.icon} alt="" width={96} height={120} />
        <h1>Parece que esta información tomó otra ruta.</h1>
        <Link href="/">Volver al inicio</Link>
      </Container>
    </main>
  );
}
