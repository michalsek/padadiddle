import { type DropDownOption } from './types';

export function getSelectedLabel<TValue extends string>(
  options: DropDownOption<TValue>[],
  value: TValue,
  placeholder: string
) {
  return options.find((option) => option.value === value)?.label ?? placeholder;
}
