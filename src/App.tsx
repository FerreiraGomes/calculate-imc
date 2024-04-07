import { useState } from "react";
import Button from "./components/Button";
import Input from "./components/Input";
import Label from "./components/Label";
import { calculateIMC, imcResult } from "./lib/IMC";

function App() {
  const [IMCData, setIMCData] = useState<null | {
    weight: number;
    height: number;
    IMC: number;
    IMCResult: string;
  }>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as {
      weight: string;
      height: string;
    };

    const { weight, height } = data;
    if (!weight || !height) {
      alert("Ops... você precisa preencher todos os campos");
      return;
    }

    const weightNumber = parseFloat(weight.replace(",", "."));
    const heightNumber = parseFloat(height.replace(",", ".")) / 100;

    if (isNaN(weightNumber) || isNaN(heightNumber)) {
      alert("Ops... você precisa preencher os campos com números válidos");
      return;
    }

    if (weightNumber < 2 || weightNumber > 500) {
      alert("Ops... o peso precisa ser maior que 2kg e menor que 500kg");
    }

    if (heightNumber < 0.5 || heightNumber > 2.5) {
      alert("Ops... a altura precisa ser maior que 50cm e menor que 2,5m");
    }

    const imc = calculateIMC(weightNumber, heightNumber);
    const imcResultstring = imcResult(imc);
    console.log(imc);
    console.log(imcResultstring);

    setIMCData({
      weight: weightNumber,
      height: heightNumber,
      IMC: imc,
      IMCResult: imcResultstring,
    });
  }

  return (
    <main className="bg-white max-w-4xl mx-auto py-24 px-48">
      <section id="form">
        <form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="weight">Peso (kg)</Label>
            <Input name="weight" className="mt-1" type="text" id="weight" />
          </div>
          <div>
            <Label htmlFor="height">Altura (cm)</Label>
            <Input name="height" className="mt-1" type="text" id="height" />
          </div>
          <Button type="submit">Calcular</Button>
        </form>
      </section>
      <section id="result" className="py-10 px-4 h-40">
        {IMCData ? (
          <table className="text-center text-xs md:text*base md:[&>tbody>tr>td]:p-2 
          md:[&>tbody>tr>td]: px-4 [&>tbody>tr>td]: px-2 text-neutral-600 mx-auto">
            <tbody>
              <tr className="font-bold border-b border-b-rose-400">
                <td>Peso</td>
                <td>Altura</td>
                <td>IMC</td>
                <td>Resultado</td>
              </tr>
              <tr>
                <td>{IMCData.weight}</td>
                <td>{IMCData.height}</td>
                <td>{IMCData.IMC}</td>
                <td>{IMCData.IMCResult}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p className="text-center text-neutral-400 text-xl">
            Saiba agora se está no seu peso ideal!
          </p>
        )}
      </section>
    </main>
  );
}

export default App;
