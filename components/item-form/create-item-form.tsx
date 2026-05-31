"use client";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
import { useForm, Controller } from "react-hook-form";
import { saveItem } from "@/app/actions";
import { useState } from "react";
import { LacunaItem } from "@/app/types";
// import { Editor } from "./blocknote-editor";

export default function CreateItemForm() {
  const editor = useCreateBlockNote();
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<LacunaItem>({
    defaultValues: {
      title: "",
      description: "",
      // content: "",
    },
  });

  const onSubmit = async (data: LacunaItem) => {
    const content = JSON.stringify(editor.document);
    await saveItem({ ...data, content });
    form.reset();
    setIsOpen(false);
  };

  return (
    <>
      <Button
        variant={isOpen ? "destructive" : "default"}
        className="mb-5"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Cancel" : "Create Item +"}
      </Button>

      {isOpen && (
        <Card className="mb-5">
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <Controller
                  name="title"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Title</FieldLabel>
                      <Input
                        id="title"
                        type="text"
                        placeholder="Your title here"
                        required
                        {...field}
                      />
                      {fieldState.invalid && (
                        <FieldError>{fieldState.error?.message}</FieldError>
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="description"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Description</FieldLabel>
                      <Input
                        id="description"
                        type="text"
                        placeholder="Your description here"
                        {...field}
                      />
                      {fieldState.invalid && (
                        <FieldError>{fieldState.error?.message}</FieldError>
                      )}
                    </Field>
                  )}
                />

                {/* <Controller
                  name="content"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Content</FieldLabel>
                      <Textarea
                        id="content"
                        className="h-75"
                        placeholder="Enter you message here.."
                        required
                        {...field}
                      />
                      {fieldState.invalid && (
                        <FieldError>{fieldState.error?.message}</FieldError>
                      )}
                    </Field>
                  )}
                /> */}

                <Field>
                  <FieldLabel>Content</FieldLabel>
                  <div className="border border-muted rounded-lg h-75 py-4">
                    <BlockNoteView
                      editor={editor}
                      shadCNComponents={
                        {
                          // Pass modified ShadCN components from your project here.
                          // Otherwise, the default ShadCN components will be used.
                        }
                      }
                    />
                  </div>
                  {/* <Textarea
                        id="content"
                        className="h-75"
                        placeholder="Enter you message here.."
                        required
                        {...field}
                      /> */}
                  {/* {fieldState.invalid && (
                        <FieldError>{fieldState.error?.message}</FieldError>
                      )} */}
                </Field>

                <Field>
                  <Button type="submit" variant={"outline"}>
                    Create
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
}
