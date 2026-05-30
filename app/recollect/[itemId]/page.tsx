import { dataObjects } from "@/app/data/items";
import RevealItem, {
  RevealProvider,
  RevealAction,
} from "@/components/reveal-item";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default async function page({
  params,
}: {
  params: Promise<{ itemId: string }>;
}) {
  const itemTitle = decodeURIComponent((await params).itemId);
  const item = dataObjects.find((i) => i.title === itemTitle);
  return (
    <div className="max-w-5xl min-w-xs w-full mx-auto px-4 md:px-6 lg:px-8 my-10 space-y-4">
      <div className="flex justify-between items-baseline">
        <h1 className="text-md font-bold">{item?.title || itemTitle}</h1>
        <Button variant={"ghost"} size={"sm"} asChild>
          <Link href={"/"}> ← Go Back</Link>
        </Button>
      </div>
      <RevealProvider>
        <Card>
          <CardHeader>
            <CardTitle>Try to recollect / Compare</CardTitle>

            <CardAction>
              <RevealAction />
            </CardAction>
          </CardHeader>
          <CardContent>
            {/* <form> */}
            <FieldGroup>
              <Field>
                <Textarea
                  className="h-75"
                  placeholder="Write whatever you can remember, try your best..."
                />
              </Field>
            </FieldGroup>
            {/* </form> */}
          </CardContent>
        </Card>
        <RevealItem content={item?.content || ""} />
      </RevealProvider>
    </div>
  );
}
