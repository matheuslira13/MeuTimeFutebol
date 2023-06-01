export type TextInputProps = {
  value: string;
  onChangeText: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  hint?: boolean;
  onkeyDonw?: any;
};
