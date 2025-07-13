
'use client';

import { useEffect, useRef, useState } from 'react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const editorConfiguration = {
    toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'insertTable', 'uploadImage' ],
};

function MyUploadAdapterPlugin(editor: any) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
    return {
      upload: async () => {
        const file = await loader.readAsDataURL();
        console.log('Simulating upload for:', file.substring(0, 50) + '...');
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Upload complete!');
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
    const editorRef = useRef<{ CKEditor: any, ClassicEditor: any } | null>(null);
    const [isEditorLoaded, setIsEditorLoaded] = useState(false);

    useEffect(() => {
        // Use dynamic import() which returns a promise
        import('@ckeditor/ckeditor5-react').then(ckeditor => {
            import('@ckeditor/ckeditor5-build-classic').then(classicEditor => {
                editorRef.current = {
                    CKEditor: ckeditor.CKEditor,
                    ClassicEditor: classicEditor.default
                };
                setIsEditorLoaded(true);
            });
        });
    }, []);

    const { CKEditor, ClassicEditor } = editorRef.current || {};

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
             {isEditorLoaded && CKEditor && ClassicEditor ? (
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
