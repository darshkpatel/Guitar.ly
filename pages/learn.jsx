import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Card from "../components/Card";

const Learn = () => {
  const router = useRouter();
  const [session, loading] = useSession();

  // Redirect to login page if not logged in 
  if (!session && !loading) router.push("/api/auth/signin?callbackUrl=/learn");

  return (
    <>
      <Layout>
        <Card />
      </Layout>
    </>
  );
};

export default Learn;
