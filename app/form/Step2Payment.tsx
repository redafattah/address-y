import { Button } from "@/components/ui/button";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { CircleCheck, CpuIcon, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const options = [
  { value: "Wafacash", label: "Wafacash", description: "Disponible" },
  { value: "CMI", label: "CMI", description: "Disponible" },
  { value: "Paiement sur place", label: "Paiement sur place", description: "Disponible" },
];

export default function Step2Payment({ prevStep, nextStep }: any) {
  return (
    <>
      <h2 className="pb-4 text-lg font-semibold">2. Mode de paiement</h2>
      <RadioGroup.Root defaultValue={options[0].value} className="mb-16 w-full grid grid-cols-3 gap-4">
        {options.map((option) => (
          <RadioGroup.Item
            key={option.value}
            value={option.value}
            className={cn(
              "relative group ring-[1px] ring-border rounded py-2 px-3 text-start",
              "data-[state=checked]:ring-2 data-[state=checked]:ring-yellow-500"
            )}
          >
            <CircleCheck className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-6 w-6 text-primary fill-yellow-500 stroke-white group-data-[state=unchecked]:hidden" />
            <CpuIcon className="mb-2.5 text-muted-foreground" />
            <span className="font-semibold tracking-tight">{option.label}</span>
            <p className="text-xs">{option.description}</p>
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>
      <div className="flex justify-between">
        <Button className="p-6 rounded-full" onClick={prevStep} variant="outline">Retour</Button>
        <Button className="p-6 rounded-full" onClick={nextStep}>
          <span>Continue</span>
          <ArrowRight />
        </Button>
      </div>
    </>
  );
}
