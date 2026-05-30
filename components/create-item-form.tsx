"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm, Controller } from "react-hook-form";
import { DataObject } from "@/app/data/items";
import { saveItem } from "@/app/actions";
import { useState } from "react";

export default function CreateItemForm() {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<DataObject>({
    defaultValues: {
      title: "",
      description: "",
      content: "",
    },
  });

  const onSubmit = async (data: DataObject) => {
    await saveItem(data);
    form.reset();
    setIsOpen(false);
  };

  return (
    <>
      <Button className="mb-5" onClick={() => setIsOpen(!isOpen)}>
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

                <Controller
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
                />

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
