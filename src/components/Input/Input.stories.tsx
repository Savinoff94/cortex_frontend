import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";
import type { InputProps } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    onChange: { action: "changed" },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Enter your name",
    value: "",
  } satisfies InputProps,
};

export const WithInitialValue: Story = {
  args: {
    placeholder: "Email",
    value: "john@example.com",
  } satisfies InputProps,
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled input",
    disabled: true,
    value: "",
  } satisfies InputProps,
};