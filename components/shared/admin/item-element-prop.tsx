import { cn } from "@/lib/utils";

type Props = {
    text: string;
    value: string;
    className?: string; 
}

export const ItemElementProp: React.FC<Props> = ({text, value, className}) => {
  return (
    <div className={cn("w-full flex flex-col justify-center items-center gap-2", className)} >
      <p className="font-semibold">{text}</p>
      <p>{value}</p>
    </div>
  );
};
