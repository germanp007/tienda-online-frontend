import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSizes = searchParams.get("sizes")?.split(",") || [];

  const sizes = [
    { id: "xs", label: "XS" },
    { id: "s", label: "S" },
    { id: "m", label: "M" },
    { id: "l", label: "L" },
    { id: "xl", label: "XL" },
    { id: "xxl", label: "XXL" },
  ];

  const radioValue = [
    { value: "any", label: "Cualquier precio", id: "priceAny" },
    { value: "0-50", label: "$0 - $50", id: "price1" },
    { value: "50-100", label: "$50 - $100", id: "price2" },
    { value: "100-200", label: "$100 - $200", id: "price3" },
    { value: "200+", label: "$200+", id: "price4" },
  ];
  const handleSizeChange = (size: string) => {
    const newSize = currentSizes.includes(size)
      ? currentSizes.filter((s) => s !== size)
      : [...currentSizes, size];

    searchParams.set("sizes", newSize.join(","));
    setSearchParams(searchParams);
  };

  const handleRadioValueChange = (value: string) => {
    searchParams.set("range", value);
    setSearchParams(searchParams);
  };

  return (
    <div className="w-64 space-y-6">
      <div>
        <h3 className="font-semibold text-lg mb-4">Filtros</h3>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h4 className="font-medium">Tallas</h4>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((size) => (
            <Button
              key={size.id}
              variant={currentSizes.includes(size.id) ? "default" : "outline"}
              size="sm"
              className="h-8"
              onClick={() => handleSizeChange(size.id)}
            >
              {size.label}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-4">
        <h4 className="font-medium">Precio</h4>
        <RadioGroup defaultValue="any" className="space-y-3">
          {radioValue.map((element) => {
            return (
              <div
                className="flex items-center space-x-2"
                onClick={() => handleRadioValueChange(element.value)}
              >
                <RadioGroupItem value={element.value} id={element.id} />
                <Label htmlFor={element.id} className="text-sm cursor-pointer">
                  {element.label}
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </div>
    </div>
  );
};

export default FilterSidebar;
