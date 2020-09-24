import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Card from "../components/Card";

const Learn = () => {
  const router = useRouter();
  const [session, loading] = useSession();

  // Redirect to login page if not logged in 
  if (!session && !loading) router.push("/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Flearn");

  return (
    <>
      <Layout>
        <Card />
      </Layout>
    </>
  );
};

export default Learn;
