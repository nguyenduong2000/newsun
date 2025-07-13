
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

// We need to dynamically import CKEditor components as they are client-side only.
// We will create a wrapper that handles this.
let CKEditor: any = null;
let ClassicEditor: any = null;

if (typeof window !== 'undefined') {
  CKEditor = require('@ckeditor/ckeditor5-react').CKEditor;
  ClassicEditor = require('@ckeditor/ckeditor5-build-classic');
}

const editorConfiguration = {
    toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'outdent', 'indent', '|', 'uploadImage', 'blockQuote', 'insertTable', 'undo', 'redo' ],
};

// Custom upload adapter to simulate image uploads
function MyUploadAdapterPlugin(editor: any) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
    return {
      upload: async () => {
        const file = await loader.readAsDataURL();
        console.log('Simulating upload for a file...');
        // Simulate a network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Upload complete!');
        // Return a placeholder image as the result of the upload
        return {
          default: `https://placehold.co/800x450.png`
        };
      },
      abort: () => {
        console.log('Upload aborted');
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

    // Render the editor only on the client-side
    if (!isMounted || !CKEditor || !ClassicEditor) {
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
