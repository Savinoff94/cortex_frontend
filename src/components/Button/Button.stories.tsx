import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    isPrimary: { control: "boolean" },
    onClick: { action: "clicked" },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    isPrimary: true,
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    isPrimary: false,
    children: "Secondary Button",
  },
};