import { IconType } from 'react-icons';

export interface FloatingLabelProps {
    id: string;
    label: string;
    type: string;
    formik: {
      values: { [key: string]: any };
      handleChange: (e: React.ChangeEvent<any>) => void;
      handleBlur: (e: React.FocusEvent<any>) => void;
      touched: { [key: string]: boolean };
      errors: { [key: string]: string };
    };
    icon: IconType;
  }