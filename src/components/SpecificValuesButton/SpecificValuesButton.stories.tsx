import { SpecificValuesButton } from "./SpecificValuesButton";
import { type Meta, type StoryObj } from "@storybook/react";

const meta: Meta<typeof SpecificValuesButton> = {
  title: "Components/SpecificValuesButton",
  component: SpecificValuesButton,
};

export default meta;

type Story = StoryObj<typeof SpecificValuesButton>;

export const Default: Story = {
  args: {
    defaultVal: "asc",
    values: ["asc", "desc", "default"] as const,
    onClick: (val) => console.log("Clicked value:", val),
    format: (val) => {
      switch (val) {
        case "asc":
          return "Asc";
        case "desc":
          return "Desc";
        case "default":
          return "Default";
        default:
          return String(val);
      }
    },
  },
};