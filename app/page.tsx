import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
// import CreateItemForm from "@/components/create-item-form";
import { getAllItems } from "./actions";
import { CreateItemForm } from "@/components/item-form";

export default async function Home() {
  const lacunaItems = await getAllItems();
  return (
    <div className="max-w-5xl min-w-xs w-full mx-auto px-4 md:px-6 lg:px-8 my-10">
      <CreateItemForm />
      <div className="my-5 grid gap-4 md:grid-cols-2 md:gap-4">
        {lacunaItems.map((item) => {
          return (
            <Link href={`/recollect/${item.id}`} key={item.id}>
              <Card>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent hidden>{item.content}</CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
