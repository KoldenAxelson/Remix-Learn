import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { exec } from 'child_process';

type LoaderData = {
  result: string;
};

export async function loader() {
  return new Promise<Response>((resolve) => {
    exec('python3 scripts/coin_flip.py', (error, stdout) => {
      if (error) {
        return resolve(json<LoaderData>({ 
          result: "Error flipping coin" 
        }));
      }
      const coinResult = stdout ? stdout.trim() : "Error";
      resolve(json<LoaderData>({ result: coinResult }));
    });
  });
}

export default function SecretPage() {
  const { result } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>{result}</h1>
    </div>
  );
}