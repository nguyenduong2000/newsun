
'use client';

import { useEffect, useRef } from 'react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

// This is a dynamic import. It's important that CKEditor is loaded only on the client side.
const editorConfiguration = {
    toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'insertTable', 'uploadImage' ],
};

// --- Mock Upload Adapter ---
// This is a simplified version. In a real app, you'd want to handle errors, progress, etc.
function MyUploadAdapterPlugin(editor: any) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
    return {
      upload: async () => {
        const file = await loader.readAsDataURL();
        
        // Mocking the upload process
        console.log('Simulating upload for:', file.substring(0, 50) + '...');
        
        // Simulate a delay for the upload
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        console.log('Upload complete!');

        // In a real scenario, you would return the URL from your backend.
        // For this mock, we'll return a placeholder.
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
    const editorRef = useRef<any>(null);
    const { CKEditor, ClassicEditor } = editorRef.current || {};

    useEffect(() => {
        // Load CKEditor modules dynamically on the client side
        editorRef.current = {
            CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
            ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
        };
    }, []);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
             {CKEditor && ClassicEditor ? (
              <CKEditor
                editor={ClassicEditor}
                data={field.value}
                config={{
                    ...editorConfiguration,
                    extraPlugins: [MyUploadAdapterPlugin],
                }}
                onChange={(_event: any, editor: any) => {
                  const data = editor.getData();
                  field.onChange(data);
                }}
              />
            ) : (
              <div>Loading Editor...</div>
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
