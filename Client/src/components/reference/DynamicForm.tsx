import { DynamicFormComponent } from '@/@types/types1';
import { AuthApi } from '@/utils/axios.config';
import { Button, Flex, Input, Select, Switch, Textarea } from '@chakra-ui/react';
import { FormEvent, useEffect, useState } from 'react';

interface DynamicFormProps {
  components: DynamicFormComponent[];
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
  data?: any;
}

const DynamicForm = ({ components, onSubmit, onClose, data }: DynamicFormProps) => {
  const [formData, setFormData] = useState<any>({
    ...components.reduce(
      (prev, cur) => ({
        ...prev,
        [cur.title]: !!data && data[cur.title] !== undefined ? data[cur.title] : undefined,
      }),
      {},
    ),
  });
  const handleOnChange = (title: string, val: any) => {
    setFormData((prev: any) => ({ ...prev, [title]: val }));
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
      }}
      className={`px-2 py-6 grid grid-cols-1 gap-4 ${
        components.length > 10 ? 'sm:grid-cols-2' : ''
      }`}
    >
      {components.map((el, i) => {
        let Component = <></>;
        switch (el.type) {
          case 'string':
            Component = (
              <Input
                type="text"
                placeholder={el.title}
                {...(!!data && data[el.title] !== undefined ? { value: formData[el.title] } : {})}
                onChange={(e) => handleOnChange(el.title, e.target.value)}
              />
            );
            break;

          case 'date':
            Component = (
              <Input
                type="date"
                {...(!!data && data[el.title] !== undefined
                  ? { value: new Date(formData[el.title]).toISOString().split('T')[0] }
                  : {})}
                onChange={(e) => handleOnChange(el.title, e.target.value)}
              />
            );
            break;

          case 'long_string':
            Component = (
              <Textarea
                placeholder={el.title}
                {...(!!data && data[el.title] !== undefined ? { value: formData[el.title] } : {})}
                onChange={(e) => handleOnChange(el.title, e.target.value)}
              />
            );
            break;

          case 'number':
            Component = (
              <Input
                type="number"
                placeholder={el.title}
                {...(!!data && data[el.title] !== undefined ? { value: formData[el.title] } : {})}
                onChange={(e) => handleOnChange(el.title, e.target.value)}
              />
            );
            break;

          case 'select':
            Component = (
              <CustomSelect
                data={el.data}
                dataFromURL={el.dataFromURL}
                {...(!!data && data[el.title] !== undefined
                  ? { selected: formData[el.title] }
                  : {})}
                onChange={(e: any) => handleOnChange(el.title, e.target.value)}
              />
            );
            break;

          case 'select_no_ref':
            Component = (
              <CustomSelect
                no_ref={true}
                data={el.data}
                dataFromURL={el.dataFromURL}
                {...(!!data && data[el.title] !== undefined
                  ? { selected: formData[el.title] }
                  : {})}
                onChange={(e: any) => handleOnChange(el.title, e.target.value)}
              />
            );
            break;

          case 'boolean':
            Component = (
              <Switch
                {...(!!data && data[el.title] !== undefined ? { value: formData[el.title] } : {})}
                onChange={(e) => handleOnChange(el.title, e.target.checked)}
                isChecked={formData[el.title] ?? false}
              />
            );
            break;

          default:
            Component = (
              <Input
                {...(!!data && data[el.title] !== undefined ? { value: formData[el.title] } : {})}
                onChange={(e) => handleOnChange(el.title, e.target.value)}
              />
            );
        }
        return (
          <Field key={`formComponent-${el.title}-${i}`} title={el.title}>
            {Component}
          </Field>
        );
      })}
      <Button
        type="submit"
        variant={'outline'}
        colorScheme="blue"
        className="grow-0 w-fit px-10 self-end"
      >
        SUBMIT
      </Button>
    </form>
  );
};

export default DynamicForm;

interface FieldProps {
  title: string;
  children: JSX.Element | JSX.Element[];
  inRow?: boolean;
}

const Field = ({ title, children, inRow = false }: FieldProps) => {
  return (
    <Flex flexDirection={inRow ? 'row' : 'column'} gap={2}>
      <label className="capitalize">
        {title
          .replace(/([a-z])([A-Z])/g, '$1 $2')
          .replace(/^([a-z])/, (res: string) => res.toUpperCase())}
      </label>
      {children}
    </Flex>
  );
};

export const CustomSelect = ({
  data = [],
  dataFromURL = '',
  onChange,
  placeholder = 'Select option',
  selected = null,
  no_ref = false,
}: {
  data?: any[];
  dataFromURL?: string;
  placeholder?: string;
  onChange: (e: any) => void;
  selected?: { _id: string } | null;
  no_ref?: boolean;
}) => {
  const [selectData, setSelectData] = useState(data);
  // Check if data is empty and dataFromURL is not empty
  // If so, fetch data from URL
  // If not, use data
  // console.table(selectData);
  useEffect(() => {
    console.log('GOT: ');
    if (data.length == 0 && dataFromURL != '') {
      (async () => {
        try {
          const { data: fetchedData } = await AuthApi.get(dataFromURL);
          setSelectData(fetchedData.data);
          console.log(fetchedData.data);
        } catch (err) {
          console.log(err);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataFromURL]);

  return (
    <Select placeholder={placeholder} onChange={onChange}>
      {(Array.isArray(selectData) ? selectData : []).map((el: any, i) => {
        return (
          <option
            key={`select-${i}`}
            onChange={onChange}
            value={!no_ref ? el?._id : el.name ?? el.toString()}
            selected={selected !== null && selected._id === el._id}
          >
            {el.name ?? el.toString()}
          </option>
        );
        // }
      })}
    </Select>
  );
};
