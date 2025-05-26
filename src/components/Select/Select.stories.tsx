import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";
import type { SelectProps } from "./Select";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    onChange: { action: "changed" },
  },
};

export default meta;

type Story = StoryObj<SelectProps>;

const sampleOptions = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
];

export const Default: Story = {
  args: {
    options: sampleOptions,
    value: "",
    placeholder: "Choose a framework",
    onChange: (val) => {
      console.log("Selected:", val);
    },
  },
};

export const WithInitialValue: Story = {
  args: {
    options: sampleOptions,
    value: "vue",
    onChange: (val) => {
      console.log("Selected:", val);
    },
  },
};

export const Disabled: Story = {
  args: {
    options: sampleOptions,
    value: "",
    placeholder: "Disabled select",
    disabled: true,
    onChange: () => {},
  },
};