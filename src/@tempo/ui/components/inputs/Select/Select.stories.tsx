import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Option, Select, SelectProps } from "./Select";
import { useStateWithOnChangeHandler } from "../../lib/utils";

export default {
  title: "Components/Select",
  component: Select,
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = ({ ...args }: Omit<SelectProps, "onChange">) => {
  const [, setSelectedValue] = useStateWithOnChangeHandler();

  return (
    <div className="w-[440px]">
      <Select {...args} onChange={setSelectedValue} />
    </div>
  );
};

const users = [
  { label: "Durward Reynolds", value: "Durward Reynolds", id: "1" },
  { label: "Kenton Towne", value: "Kenton Towne", id: "2" },
  { label: "Therese Wunsch", value: "Therese Wunsch", id: "3" },
  { label: "Benedict Kessler", value: "Benedict Kessler", id: "4" },
  { label: "Katelyn Rohan", value: "Katelyn Rohan", id: "5" },
];

type StoriesArgs = Omit<SelectProps, "onChange">;

const commonArgs: StoriesArgs = {
  options: users,
  placeholder: "Select option",
};

export const Basic = Template.bind({});

Basic.args = commonArgs;

export const Disabled = Template.bind({});

Disabled.args = {
  ...commonArgs,
  disabled: true,
};

export const Countries = Template.bind({});

const countries: Option[] = [
  { label: "Polska", value: "Polska", icon: "🇵🇱", id: "1" },
  { label: "Niemcy", value: "Niemcy", icon: "🇩🇪", id: "2" },
  { label: "USA", value: "USA", icon: "🇺🇸", id: "3" },
  { label: "Francja", value: "Francja", icon: "🇫🇷", id: "4" },
  { label: "Bangladesz", value: "Bangladesz", icon: "🇧🇩", id: "5" },
];

Countries.args = {
  options: countries,
};
