import { ClientSafeProvider, getProviders, signIn } from "next-auth/react";

type Props = {
    providers: ClientSafeProvider;
};

export default function Login({ providers }: Props) {
    return (
        <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="w-52 mb-5" src="https://links.papareact.com/9xl" alt="logo" />

            {Object.values(providers)?.map((provider) => (
                <div key={provider.name}>
                    <button className="bg-[#18D860] text-white rounded-full p-5" onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
                        Login with {provider.name}
                    </button>
                </div>
            ))}
        </div>
    );
}

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers,
        },
    };
}
