import { useEffect, useState } from "react";
import { Button } from "./components";
import { toast } from "sonner";
import { healthCheckApi } from "./service";

export default function App() {
  const [hello, setHello] = useState("");
  const [ping, setPing] = useState("");

  useEffect(() => {
    healthCheckApi
      .hello()
      .then((res) => setHello(res.data.message))
      .catch(console.error);

    healthCheckApi
      .ping()
      .then((res) => setPing(res.data.message))
      .catch(console.error);
  }, []);

  const handlePingPong = () => {
    toast(`The /ping responded ${ping.toUpperCase()}`, {
      position: "top-right",
    });
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="scroll-m-20 text-center text-4xl font-semibold tracking-tight text-balance">
        The /hello responded: "{hello}"
      </h1>
      <Button onClick={handlePingPong} className="mt-5 rounded-full cursor-pointer text-xl py-6 px-10">
        Ping
      </Button>
    </div>
  );
}
