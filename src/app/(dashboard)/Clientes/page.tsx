import { Container } from "../../../components/Container/Container";
import { authService } from "../../../services/auth.service";
/* import { useRouter } from "next/dist/client/components/navigation";
import { useEffect } from "react"; */

export default function Cliente() {

/*   const router = useRouter();

  useEffect(() => {
    if (!authService.getToken()) {
      router.replace("/Login?redirect=/Clientes");
    }
  }, [router]); */

  return (
    <Container>
      <section className="py-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Clientes Temos que ver esse problema...
        </h1>
      </section>
    </Container>
  );
}
