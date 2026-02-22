

import { Container } from "../../../components/Container/Container";
/* import { authService } from "../../../services/auth.service";
import { useRouter } from "next/dist/client/components/navigation";
import { useEffect } from "react"; */

export default function Detalhes() {

/*   const router = useRouter();

  useEffect(() => {
    if (!authService.getToken()) {
      router.replace("/Login?redirect=/Detalhes");
    }
  }, [router]); */

  return (
    <Container>
      <main className="py-6">
        <h1 className="text-2xl font-bold text-gray-900">Detalhes...</h1>
      </main>
    </Container>
  );
}
