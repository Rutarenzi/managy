export interface FormInfo {
  title: string;
  description: string;
  fields: Field[];
}

export interface Field {
  name: string;
  label?: string;
  type: 'text' | 'number' | 'date' | 'select' | 'textarea' | 'boolean';
  options?: Option[];
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  value?: string | number | Date;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  error?: string;
  helperText?: string;
  multiline?: boolean;
  rows?: number;
  rowsMax?: number;
  InputProps?: any;
  InputLabelProps?: any;
  SelectProps?: any;
  MenuItemProps?: any;
  dataUrl?: string;
  minLen?: number;
  maxLen?: number;
  min?: number;
  max?: number;
}

export interface Option {
  label: string;
  value: string | number;
}

export interface FormProps {
  formInfo: FormInfo;
  onSubmit: (e: any) => void;
  submitButtonLabel?: string;
  submitButtonIcon?: React.ReactNode;
  submitButtonProps?: any;
  cancelButtonLabel?: string;
  cancelButtonIcon?: React.ReactNode;
  cancelButtonProps?: any;
  loading?: boolean;
  error?: string;
  success?: string;
  children?: React.ReactNode;
}
export interface DynamicFormComponent {
  title: string;
  type: 'string' | 'long_string' | 'number' | 'select' | 'select_no_ref' | 'boolean' | 'date';
  data?: any[];
  dataFromURL?: string;
  required?: boolean;
}
export type DynamicLink = {
  [name: string]: {
    icon?: JSX.Element;
    add: string;
    update: string;
    delete: string;
    getAll: string;
    schema: DynamicFormComponent[];
  };
};
