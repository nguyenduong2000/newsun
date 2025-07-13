
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

// Dynamically import client-side components
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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

    if (!isMounted) {
        return (
          <div className="space-y-2">
            {label && <FormLabel>{label}</FormLabel>}
            <div className="w-full rounded-md border border-input bg-background px-3 py-2 min-h-[300px] flex items-center justify-center">
              <p className="text-muted-foreground">Loading Editor...</p>
            </div>
          </div>
        );
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
