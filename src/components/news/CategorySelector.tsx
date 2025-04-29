import { HStack, Icon, RadioCard } from "@chakra-ui/react";

const items = [
  { value: "e", title: "환경" },
  { value: "s", title: "사회" },
  { value: "g", title: "지배구조" },
];

interface CategorySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const CategorySelector = ({ value, onChange }: CategorySelectorProps) => {
  return (
    <RadioCard.Root
      orientation="horizontal"
      align="center"
      justify="center"
      maxW="lg"
      defaultValue="paypal"
      value={value}
      onValueChange={(e) => onChange(e.value || "")}
    >
      <RadioCard.Label></RadioCard.Label>
      <HStack align="stretch">
        {items.map((item) => (
          <RadioCard.Item key={item.value} value={item.value} padding={2}>
            <RadioCard.ItemHiddenInput />
            <RadioCard.ItemControl>
              <RadioCard.ItemText ms="-4">{item.title}</RadioCard.ItemText>
            </RadioCard.ItemControl>
          </RadioCard.Item>
        ))}
      </HStack>
    </RadioCard.Root>
  );
};

export default CategorySelector;
