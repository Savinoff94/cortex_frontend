import type { Meta, StoryObj } from "@storybook/react";
import { InputField } from "./InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    labelProps: {
      htmlFor: "email",
      children: "Email Address",
    },
    inputProps: {
      id: "email",
      type: "email",
      placeholder: "Enter your email",
    },
  },
};

export const WithPreFilledValue: Story = {
  args: {
    labelProps: {
      htmlFor: "username",
      children: "Username",
    },
    inputProps: {
      id: "username",
      type: "text",
      value: "andrei123",
      onChange: () => {},
    },
  },
};

export const PasswordInput: Story = {
  args: {
    labelProps: {
      htmlFor: "password",
      children: "Password",
    },
    inputProps: {
      id: "password",
      type: "password",
      placeholder: "Enter your password",
    },
  },
};