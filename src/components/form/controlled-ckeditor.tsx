
'use client';

import { useEffect, useState } from 'react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const editorConfiguration = {
    toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'insertTable', 'uploadImage' ],
};

function MyUploadAdapterPlugin(editor: any) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
    return {
      upload: async () => {
        const file = await loader.readAsDataURL();
        console.log('Simulating upload for:', file.substring(0, 50) + '...');
        // Simulate a delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Upload complete!');
        // Return a placeholder image
        return {
          default: `https://placehold.co/800x450.png`
        };
      }
    };
  };
}

interface ControlledCKEditorProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  control: Control<TFieldValues>;
  label?: string;
}

export function ControlledCKEditor<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ control, name, label }: ControlledCKEditorProps<TFieldValues, TName>) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div>Loading Editor...</div>;
    }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
              <CKEditor
                editor={ClassicEditor}
                data={field.value || ''}
                config={{
                    ...editorConfiguration,
                    extraPlugins: [MyUploadAdapterPlugin],
                }}
                onChange={(_event: any, editor: any) => {
                  const data = editor.getData();
                  field.onChange(data);
                }}
              />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
