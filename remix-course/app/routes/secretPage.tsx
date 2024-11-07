import { useLoaderData } from "@remix-run/react";
import { exec } from 'child_process';

export async function loader() {
  return new Promise<string>((resolve) => {
    exec('python3 scripts/coin_flip.py', (error, stdout) => {
      if (error) {
        return resolve("Error flipping coin");
      }
      resolve(stdout?.trim() || "Error");
    });
  });
}

export default function SecretPage() {
  const result  = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>{result}</h1>
    </div>
  );
}