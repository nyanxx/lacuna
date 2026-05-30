import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { dataObjects } from "./data/items";
import Link from "next/link";
import CreateItemForm from "@/components/create-item-form";

export default function Home() {
  return (
    <div className="max-w-5xl min-w-xs w-full mx-auto px-4 md:px-6 lg:px-8 my-10">
      <CreateItemForm />
      <div className="my-5 grid gap-4 md:grid-cols-2 md:gap-4">
        {dataObjects.map((item) => {
          return (
            <Link href={`/recollect/${item.title}`} key={item.id}>
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
