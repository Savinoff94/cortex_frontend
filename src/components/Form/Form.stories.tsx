import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Form, type FormProps } from "./Form";

const meta: Meta<typeof Form> = {
  title: "Components/Form",
  component: Form,
};

export default meta;

type Story = StoryObj<typeof Form>;

export const Default: Story = {
  render: (args: FormProps) => {
    // Define a React component (capitalized name) inside render
    function FormExample() {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");

      const handleSubmit = () => {
        alert(`Submitted with email: ${email} and password: ${password}`);
      };

      return (
        <Form {...args} onSubmitCallback={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-2 p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 p-2 border rounded"
          />
          <button type="submit" className="bg-blue-600 text-white py-2 rounded">
            Register
          </button>
        </Form>
      );
    }

    return <FormExample />;
  },
};