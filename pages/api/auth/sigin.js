import { getProviders, signin } from 'next-auth/client';
import { useRouter } from 'next/router';

const SignIn = ({ providers }) => {
  const {
    query: { callbackUrl },
  } = useRouter();
  return (
    <>
      {Object.values(providers).map((provider) => (
        <p key={provider.name}>
          <a href={provider.signinUrl} onClick={(e) => e.preventDefault()}>
            <button
              type="button"
              onClick={() => signin(provider.id, { callbackUrl })}
            >
              Sign in with {provider.name}
            </button>
          </a>
        </p>
      ))}
    </>
  );
};

export default SignIn;

export async function getServerSideProps() {
  return {
    props: {
      providers: await getProviders(),
    },
  };
}
