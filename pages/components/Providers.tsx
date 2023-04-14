import { useRouter } from "next/router";

type Props = {
  providers: Array<Provider>;
  //   children: React.ReactNode;
};

export type Provider = {
  id: number;
  title: string;
  location: object;
};

const Providers = ({ providers }: Props) => {
  const router = useRouter();

  const handleClick = (slug: number) => {
    router.push(`/create/${slug}`);
  };
  return (
    <>
      <h1>Providers</h1>
      <div className="providers-wrapper">
        {providers.map((provider) => {
          return (
            <div key={provider.id} onClick={() => handleClick(provider.id)}>
              {provider.title}: {provider.id}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Providers;
